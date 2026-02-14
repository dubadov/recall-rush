/* ================================================
   Synonym Sprint - Rapid-fire sophisticated synonyms
   Common word shown -> say a fancy synonym fast
   ================================================ */
window.RR = window.RR || {};
RR.GameModes = RR.GameModes || {};

RR.GameModes.SynonymSprint = (function () {
  const MODE_ID = 'synonym-sprint';
  const ROUND_COUNT = 10;
  const TIME_PER_WORD = 8; // seconds

  let state = {
    active: false,
    score: 0,
    streak: 0,
    bestStreak: 0,
    wordsCompleted: 0,
    wordsCorrect: 0,
    roundIndex: 0,
    currentChallenge: null,
    timerRemaining: TIME_PER_WORD,
    timerInterval: null,
    roundStartTime: 0,
    totalResponseTime: 0,
    usedChallenges: [],
  };

  const $ = (id) => document.getElementById(id);

  function init() {}

  async function start() {
    state = {
      active: true,
      score: 0,
      streak: 0,
      bestStreak: 0,
      wordsCompleted: 0,
      wordsCorrect: 0,
      roundIndex: 0,
      currentChallenge: null,
      timerRemaining: TIME_PER_WORD,
      timerInterval: null,
      roundStartTime: 0,
      totalResponseTime: 0,
      usedChallenges: [],
    };

    $('game-mode-title').textContent = 'Synonym Sprint';
    $('game-score').textContent = '0';
    $('game-streak').textContent = '0';
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

    // Get a synonym challenge
    const bank = RR.Vocabulary.getSynonymBank();
    let challenge;
    let attempts = 0;
    do {
      challenge = bank[Math.floor(Math.random() * bank.length)];
      attempts++;
    } while (state.usedChallenges.includes(challenge.common) && attempts < 30);

    state.currentChallenge = challenge;
    state.usedChallenges.push(challenge.common);
    state.roundIndex++;

    // Animate
    const wordCard = $('word-card');
    wordCard.classList.remove('anim-word-enter');
    void wordCard.offsetWidth;
    wordCard.classList.add('anim-word-enter');

    // Display the common word - player must say a sophisticated synonym
    $('word-main').textContent = challenge.common.toUpperCase();
    $('word-definition').textContent = 'Say a sophisticated synonym!';
    $('word-example').textContent = `Round ${state.roundIndex} of ${ROUND_COUNT}`;
    $('transcript-text').textContent = 'Listening...';
    $('transcript-text').classList.remove('highlight');

    // Set speech targets to all valid synonyms
    RR.Speech.setTarget(null, challenge.synonyms);

    // Timer
    state.timerRemaining = TIME_PER_WORD;
    state.roundStartTime = Date.now();
    _startTimer();
    RR.Speech.start();
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
    const pct = (state.timerRemaining / TIME_PER_WORD) * 100;

    fill.style.width = pct + '%';
    label.textContent = Math.ceil(state.timerRemaining) + 's';

    fill.classList.remove('warning', 'danger');
    if (pct <= 20) fill.classList.add('danger');
    else if (pct <= 40) fill.classList.add('warning');
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

    // Update UI
    $('game-score').textContent = state.score;
    $('game-streak').textContent = state.streak;
    $('transcript-text').textContent = `"${word}" ✓`;
    $('transcript-text').classList.add('highlight');

    // Streak animation
    if (state.streak >= 3) {
      RR.Sounds.streak();
    }

    // Video glow
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

  function _onTimeUp() {
    if (!state.active) return;
    _clearTimer();

    state.streak = 0;
    state.wordsCompleted++;

    $('game-streak').textContent = '0';

    const glow = $('video-glow');
    glow.classList.add('fail');
    setTimeout(() => glow.classList.remove('fail'), 1000);

    const synonymList = state.currentChallenge ? state.currentChallenge.synonyms.slice(0, 3).join(', ') : '';
    _showResult(false, 0, synonymList);
    RR.Sounds.fail();

    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, 1500);
  }

  function skip() {
    if (!state.active) return;
    _clearTimer();
    state.wordsCompleted++;
    RR.Sounds.skip();
    _nextRound();
  }

  function hint() {
    if (!state.active || !state.currentChallenge) return;
    const syns = state.currentChallenge.synonyms;
    // Show first letter of each synonym
    const hints = syns.map(s => s.charAt(0).toUpperCase() + '...').join(', ');
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
      icon.textContent = '✓';
      icon.style.color = 'var(--success)';
      text.textContent = `${extra}!`;
      pts.textContent = `+${points}`;
      pts.className = 'result-points';
    } else {
      icon.textContent = '✗';
      icon.style.color = 'var(--danger)';
      text.textContent = 'Time\'s up!';
      pts.textContent = extra ? `Try: ${extra}` : '';
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
