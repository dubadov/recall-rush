/* ================================================
   Word Upgrade - Speech-based
   Common word shown, say a more elevated synonym
   Multiple correct answers accepted
   ================================================ */
window.RR = window.RR || {};
RR.GameModes = RR.GameModes || {};

RR.GameModes.WordUpgrade = (function () {
  const MODE_ID = 'word-upgrade';
  const ROUND_COUNT = 10;

  let state = {
    active: false,
    score: 0,
    streak: 0,
    bestStreak: 0,
    wordsCompleted: 0,
    wordsCorrect: 0,
    roundIndex: 0,
    currentChallenge: null,
    timerDuration: 10,
    timerRemaining: 10,
    timerInterval: null,
    roundStartTime: 0,
    totalResponseTime: 0,
  };

  const $ = (id) => document.getElementById(id);

  function init() {}

  async function start() {
    const settings = RR.Storage.getSettings();
    state = {
      active: true,
      score: 0,
      streak: 0,
      bestStreak: 0,
      wordsCompleted: 0,
      wordsCorrect: 0,
      roundIndex: 0,
      currentChallenge: null,
      timerDuration: settings.timerDuration,
      timerRemaining: settings.timerDuration,
      timerInterval: null,
      roundStartTime: 0,
      totalResponseTime: 0,
    };

    RR.Vocabulary.resetUsedIndices();

    // UI setup - speech mode, no answer grid
    $('game-mode-title').textContent = 'Word Upgrade';
    $('game-score').textContent = '0';
    $('game-streak').textContent = '0';
    $('transcript-bar').style.display = '';
    $('answer-grid').style.display = 'none';
    $('bomb-container').style.display = 'none';

    _nextRound();
  }

  function stop() {
    state.active = false;
    _clearTimer();
    RR.Speech.stop();
  }

  function _nextRound() {
    if (!state.active) return;

    if (state.roundIndex >= ROUND_COUNT) {
      _endGame();
      return;
    }

    state.currentChallenge = RR.Vocabulary.getUpgradeChallenge();
    state.roundIndex++;

    // Animate word card
    const wordCard = $('word-card');
    wordCard.classList.remove('anim-word-enter');
    void wordCard.offsetWidth;
    wordCard.classList.add('anim-word-enter');

    // Show the common word - player must say an upgraded synonym
    $('word-main').textContent = state.currentChallenge.commonWord.toUpperCase();
    $('word-main').style.fontSize = '';
    $('word-main').style.lineHeight = '';
    $('word-definition').textContent = 'Say a more elevated word!';
    $('word-example').textContent = `Round ${state.roundIndex} of ${ROUND_COUNT}`;
    $('transcript-text').textContent = 'Listening...';
    $('transcript-text').classList.remove('highlight');

    // Set speech targets to all valid upgrades
    RR.Speech.setTarget(null, state.currentChallenge.acceptedUpgrades);

    // Timer
    state.timerRemaining = state.timerDuration;
    state.roundStartTime = Date.now();
    _startTimer();
    RR.Speech.start();
  }

  function onWordDetected(word) {
    if (!state.active || !state.currentChallenge) return;

    const responseTime = Date.now() - state.roundStartTime;
    _clearTimer();

    state.wordsCorrect++;
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);

    const points = RR.Progress.calculateScore(responseTime, state.streak);
    state.score += points;
    state.totalResponseTime += responseTime;
    state.wordsCompleted++;

    $('game-score').textContent = state.score;
    $('game-streak').textContent = state.streak;
    $('transcript-text').textContent = `"${word}" \u2713`;
    $('transcript-text').classList.add('highlight');

    if (state.streak >= 3) {
      RR.Sounds.streak();
      const streakEl = $('game-streak');
      streakEl.classList.add('anim-streak');
      setTimeout(() => streakEl.classList.remove('anim-streak'), 300);
    }

    const glow = $('video-glow');
    glow.classList.add('success');
    setTimeout(() => glow.classList.remove('success'), 1000);

    _showResult(true, points, word);
    RR.Sounds.success();

    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, 1000);
  }

  function _startTimer() {
    _clearTimer();
    _updateTimerUI();

    state.timerInterval = setInterval(() => {
      state.timerRemaining -= 0.1;

      if (state.timerRemaining <= 0) {
        state.timerRemaining = 0;
        _onTimeUp();
      }

      _updateTimerUI();

      if (state.timerRemaining <= 3 && state.timerRemaining > 0) {
        if (Math.abs(state.timerRemaining - Math.round(state.timerRemaining)) < 0.05) {
          RR.Sounds.urgentTick();
        }
      }
    }, 100);
  }

  function _clearTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function _updateTimerUI() {
    const fill = $('timer-fill');
    const label = $('timer-text');
    const pct = (state.timerRemaining / state.timerDuration) * 100;

    fill.style.width = pct + '%';
    label.textContent = Math.ceil(state.timerRemaining) + 's';

    fill.classList.remove('warning', 'danger');
    label.classList.remove('anim-timer-urgent');

    if (pct <= 20) {
      fill.classList.add('danger');
      label.classList.add('anim-timer-urgent');
    } else if (pct <= 40) {
      fill.classList.add('warning');
    }
  }

  function _onTimeUp() {
    if (!state.active) return;
    _clearTimer();

    state.streak = 0;
    state.wordsCompleted++;

    $('game-streak').textContent = '0';

    const glow = $('video-glow');
    glow.classList.add('fail');
    setTimeout(() => glow.classList.remove('fail'), 1000);

    const synonymList = state.currentChallenge ? state.currentChallenge.acceptedUpgrades.slice(0, 3).join(', ') : '';
    _showResult(false, 0, synonymList);
    RR.Sounds.fail();

    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, 1800);
  }

  function skip() {
    if (!state.active) return;
    _clearTimer();
    state.streak = 0;
    state.wordsCompleted++;
    $('game-streak').textContent = '0';
    RR.Sounds.skip();
    _nextRound();
  }

  function hint() {
    if (!state.active || !state.currentChallenge) return;
    const upgrades = state.currentChallenge.acceptedUpgrades;
    // Show first letter of each accepted word
    const hints = upgrades.slice(0, 4).map(s => s.charAt(0).toUpperCase() + '...').join(', ');
    $('word-example').textContent = `Hints: ${hints}`;
    $('word-example').style.color = 'var(--warning)';
    setTimeout(() => { if ($('word-example')) $('word-example').style.color = ''; }, 3000);
  }

  function _showResult(success, points, extra) {
    const overlay = $('result-overlay');
    const icon = $('result-icon');
    const text = $('result-text');
    const pts = $('result-points');

    if (success) {
      icon.textContent = '\u2713';
      icon.style.color = 'var(--success)';
      text.textContent = `"${extra}" \u2014 upgraded!`;
      pts.textContent = '+' + points;
      pts.className = 'result-points';
    } else {
      icon.textContent = '\u2717';
      icon.style.color = 'var(--danger)';
      text.textContent = "Time's up!";
      pts.textContent = extra ? 'Try: ' + extra : '';
      pts.className = 'result-points negative';
    }

    overlay.classList.add('active');
    overlay.querySelector('.result-content').classList.add('anim-scale-pop');
  }

  function _hideResult() {
    const overlay = $('result-overlay');
    overlay.classList.remove('active');
    overlay.querySelector('.result-content').classList.remove('anim-scale-pop');
  }

  function _endGame() {
    state.active = false;
    _clearTimer();
    RR.Speech.stop();

    const xpEarned = Math.round(state.score * 0.5);
    const xpResult = RR.Progress.addXP(xpEarned);

    RR.Progress.recordGameResult({
      wordsCompleted: state.wordsCompleted,
      wordsCorrect: state.wordsCorrect,
      totalTimeMs: state.totalResponseTime,
      bestStreak: state.bestStreak,
      mode: MODE_ID,
      score: state.score,
    });

    RR.Progress.updateStreak();

    if (RR.App && RR.App.showGameOver) {
      RR.App.showGameOver({
        score: state.score,
        wordsCompleted: state.wordsCompleted,
        wordsCorrect: state.wordsCorrect,
        accuracy: state.wordsCompleted > 0 ? Math.round((state.wordsCorrect / state.wordsCompleted) * 100) : 0,
        bestStreak: state.bestStreak,
        xpEarned,
        leveledUp: xpResult.leveledUp,
        newLevel: xpResult.level,
        mode: MODE_ID,
      });
    }
  }

  return {
    MODE_ID,
    init,
    start,
    stop,
    skip,
    hint,
    onWordDetected,
  };
})();
