/* ================================================
   Definition Match - Click-based game mode
   Word shown -> pick correct definition from 4 options
   ================================================ */
window.RR = window.RR || {};
RR.GameModes = RR.GameModes || {};

RR.GameModes.DefinitionMatch = (function () {
  const MODE_ID = 'definition-match';
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
    answered: false,
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
      answered: false,
    };

    RR.Vocabulary.resetUsedIndices();

    // UI setup - hide transcript (no speech), show answer grid
    $('game-mode-title').textContent = 'Definition Match';
    $('game-score').textContent = '0';
    $('game-streak').textContent = '0';
    $('transcript-bar').style.display = 'none';
    $('answer-grid').style.display = 'grid';
    $('answer-grid').classList.remove('display-only');
    $('bomb-container').style.display = 'none';

    _nextRound();
  }

  function stop() {
    state.active = false;
    _clearTimer();
    // Restore UI
    $('transcript-bar').style.display = '';
    $('answer-grid').style.display = 'none';
    _clearAnswerStyles();
  }

  function _nextRound() {
    if (!state.active) return;

    if (state.roundIndex >= ROUND_COUNT) {
      _endGame();
      return;
    }

    state.currentChallenge = RR.Vocabulary.getDefinitionChallenge();
    state.roundIndex++;
    state.answered = false;

    // Animate word card
    const wordCard = $('word-card');
    wordCard.classList.remove('anim-word-enter');
    void wordCard.offsetWidth;
    wordCard.classList.add('anim-word-enter');

    // Show the word
    $('word-main').textContent = state.currentChallenge.word.toUpperCase();
    $('word-definition').textContent = 'Pick the correct definition:';
    $('word-example').textContent = `Round ${state.roundIndex} of ${ROUND_COUNT}`;

    // Populate answer buttons
    _clearAnswerStyles();
    const options = state.currentChallenge.options;
    for (let i = 0; i < 4; i++) {
      const btn = $('answer-btn-' + i);
      btn.textContent = options[i].text;
      btn.dataset.correct = options[i].correct ? '1' : '0';
    }

    // Animate grid
    const grid = $('answer-grid');
    grid.classList.remove('anim-grid-enter');
    void grid.offsetWidth;
    grid.classList.add('anim-grid-enter');

    // Start timer
    state.timerRemaining = state.timerDuration;
    state.roundStartTime = Date.now();
    _startTimer();
  }

  function onAnswerSelected(index) {
    if (!state.active || state.answered) return;
    state.answered = true;

    const responseTime = Date.now() - state.roundStartTime;
    _clearTimer();

    const btn = $('answer-btn-' + index);
    const isCorrect = btn.dataset.correct === '1';

    if (isCorrect) {
      // Correct!
      btn.classList.add('correct', 'anim-answer-correct');
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

      if (state.streak >= 3) {
        RR.Sounds.streak();
        const streakEl = $('game-streak');
        streakEl.classList.add('anim-streak');
        setTimeout(() => streakEl.classList.remove('anim-streak'), 300);
      }

      const glow = $('video-glow');
      glow.classList.add('success');
      setTimeout(() => glow.classList.remove('success'), 1000);

      _showResult(true, points, responseTime);
      RR.Sounds.success();
    } else {
      // Wrong!
      btn.classList.add('wrong', 'anim-answer-wrong');
      // Highlight the correct one
      for (let i = 0; i < 4; i++) {
        if ($('answer-btn-' + i).dataset.correct === '1') {
          $('answer-btn-' + i).classList.add('correct');
        }
      }

      state.streak = 0;
      state.wordsCompleted++;

      if (state.currentChallenge) {
        RR.Progress.recordWordAttempt(state.currentChallenge.word, false, responseTime);
      }

      $('game-streak').textContent = '0';

      const glow = $('video-glow');
      glow.classList.add('fail');
      setTimeout(() => glow.classList.remove('fail'), 1000);

      _showResult(false, 0);
      RR.Sounds.fail();
    }

    // Disable all buttons
    for (let i = 0; i < 4; i++) {
      $('answer-btn-' + i).classList.add('disabled');
    }

    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, isCorrect ? 1200 : 1800);
  }

  function _clearAnswerStyles() {
    for (let i = 0; i < 4; i++) {
      const btn = $('answer-btn-' + i);
      btn.className = 'answer-btn glass-card';
      btn.textContent = '';
      btn.dataset.correct = '0';
    }
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
    if (!state.active || state.answered) return;
    state.answered = true;
    _clearTimer();

    state.streak = 0;
    state.wordsCompleted++;

    // Show correct answer
    for (let i = 0; i < 4; i++) {
      const btn = $('answer-btn-' + i);
      if (btn.dataset.correct === '1') {
        btn.classList.add('correct');
      }
      btn.classList.add('disabled');
    }

    if (state.currentChallenge) {
      RR.Progress.recordWordAttempt(state.currentChallenge.word, false, state.timerDuration * 1000);
    }

    $('game-streak').textContent = '0';

    const glow = $('video-glow');
    glow.classList.add('fail');
    setTimeout(() => glow.classList.remove('fail'), 1000);

    _showResult(false, 0);
    RR.Sounds.fail();

    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, 1800);
  }

  function skip() {
    if (!state.active || state.answered) return;
    _clearTimer();
    state.streak = 0;
    state.wordsCompleted++;
    $('game-streak').textContent = '0';
    RR.Sounds.skip();
    _nextRound();
  }

  function hint() {
    // No hint for definition match (options are already visible)
  }

  function _showResult(success, points, timeMs) {
    const overlay = $('result-overlay');
    const icon = $('result-icon');
    const text = $('result-text');
    const pts = $('result-points');

    if (success) {
      icon.textContent = '\u2713';
      icon.style.color = 'var(--success)';
      const messages = ['Nice!', 'Correct!', 'Spot on!', 'Nailed it!', 'Sharp!', 'Well done!'];
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
      pts.textContent = 'The answer was: ' + (state.currentChallenge ? state.currentChallenge.correctDefinition : '');
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

    // Restore UI
    $('transcript-bar').style.display = '';
    $('answer-grid').style.display = 'none';

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

  function getState() {
    return { ...state };
  }

  return {
    MODE_ID,
    init,
    start,
    stop,
    skip,
    hint,
    onAnswerSelected,
    onWordDetected: function () {}, // Not used in this mode
    getState,
  };
})();
