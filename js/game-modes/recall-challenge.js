/* ================================================
   Recall Challenge - Speech-based
   Definition shown, player must SAY the word
   Pure vocabulary recall from memory
   ================================================ */
window.RR = window.RR || {};
RR.GameModes = RR.GameModes || {};

RR.GameModes.RecallChallenge = (function () {
  const MODE_ID = 'recall-challenge';
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
    difficulty: 3,
    timerDuration: 10,
    timerRemaining: 10,
    timerInterval: null,
    roundStartTime: 0,
    totalResponseTime: 0,
    hintUsed: false,
    usedWords: [],
  };

  const $ = (id) => document.getElementById(id);

  function init() {}

  async function start() {
    const settings = RR.Storage.getSettings();
    const diff = settings.difficulty;
    const timer = RR.Vocabulary.getTimerForDifficulty(diff);
    state = {
      active: true,
      score: 0,
      streak: 0,
      bestStreak: 0,
      wordsCompleted: 0,
      wordsCorrect: 0,
      roundIndex: 0,
      currentChallenge: null,
      difficulty: diff,
      timerDuration: timer,
      timerRemaining: timer,
      timerInterval: null,
      roundStartTime: 0,
      totalResponseTime: 0,
      hintUsed: false,
      usedWords: [],
    };

    // UI setup - speech mode, no answer grid
    $('game-mode-title').textContent = 'Recall Challenge';
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

    // Get a challenge we haven't used yet
    let challenge;
    let attempts = 0;
    do {
      challenge = RR.Vocabulary.getRecallChallenge(state.difficulty);
      attempts++;
    } while (state.usedWords.includes(challenge.word) && attempts < 50);

    state.currentChallenge = challenge;
    state.usedWords.push(challenge.word);
    state.roundIndex++;
    state.hintUsed = false;

    // Animate word card
    const wordCard = $('word-card');
    wordCard.classList.remove('anim-word-enter');
    void wordCard.offsetWidth;
    wordCard.classList.add('anim-word-enter');

    // Show ONLY the definition (not the word!)
    $('word-main').textContent = '???';
    $('word-main').style.fontSize = '';
    $('word-main').style.lineHeight = '';
    $('word-definition').textContent = challenge.definition;
    $('word-example').textContent = `Round ${state.roundIndex} of ${ROUND_COUNT} \u2022 Say the word!`;
    $('transcript-text').textContent = 'Listening...';
    $('transcript-text').classList.remove('highlight');

    // Set speech target
    RR.Speech.setTarget(challenge.word);

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

    // Reveal the word
    $('word-main').textContent = state.currentChallenge.word.toUpperCase();

    state.wordsCorrect++;
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);

    const points = RR.Progress.calculateScore(responseTime, state.streak);
    state.score += points;
    state.totalResponseTime += responseTime;
    state.wordsCompleted++;

    RR.Progress.recordWordAttempt(state.currentChallenge.word, true, responseTime);

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

    _showResult(true, points, responseTime);
    RR.Sounds.success();

    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, 1200);
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

    // Reveal the word
    if (state.currentChallenge) {
      $('word-main').textContent = state.currentChallenge.word.toUpperCase();
      RR.Progress.recordWordAttempt(state.currentChallenge.word, false, state.timerDuration * 1000);
    }

    $('game-streak').textContent = '0';

    _showResult(false, 0);
    RR.Sounds.fail();

    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, 2000);
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
    if (!state.active || !state.currentChallenge || state.hintUsed) return;
    state.hintUsed = true;

    const word = state.currentChallenge.word;
    $('word-main').textContent = word.charAt(0).toUpperCase() + '_ '.repeat(word.length - 1).trim();
    $('word-example').textContent = `Hint: starts with "${word.substring(0, 2).toUpperCase()}..." (${word.length} letters)`;
    $('word-example').style.color = 'var(--warning)';

    setTimeout(() => {
      if ($('word-example')) $('word-example').style.color = '';
    }, 4000);
  }

  function _showResult(success, points, timeMs) {
    const overlay = $('result-overlay');
    const icon = $('result-icon');
    const text = $('result-text');
    const pts = $('result-points');

    if (success) {
      icon.textContent = '\u2713';
      icon.style.color = 'var(--success)';
      const messages = ['Great recall!', 'You knew it!', 'Sharp memory!', 'Impressive!', 'Nailed it!'];
      text.textContent = messages[Math.floor(Math.random() * messages.length)];
      pts.textContent = '+' + points;
      pts.className = 'result-points';
      if (timeMs && timeMs < RR.Progress.SPEED_BONUS_THRESHOLD) {
        pts.textContent += ' (' + (timeMs / 1000).toFixed(1) + 's!)';
      }
    } else {
      icon.textContent = '\u2717';
      icon.style.color = 'var(--danger)';
      text.textContent = "Time's up!";
      pts.textContent = 'The word was: ' + (state.currentChallenge ? state.currentChallenge.word : '');
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
