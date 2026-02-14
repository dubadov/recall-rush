/* ================================================
   Sentence Fill - Speech-based, tight timer
   Sentence with blank + 4 word options displayed
   Player must SAY the correct word
   ================================================ */
window.RR = window.RR || {};
RR.GameModes = RR.GameModes || {};

RR.GameModes.SentenceFill = (function () {
  const MODE_ID = 'sentence-fill';
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
    };

    RR.Vocabulary.resetUsedIndices();

    // UI setup - show answer grid as display-only (words to read), show transcript
    $('game-mode-title').textContent = 'Sentence Fill';
    $('game-score').textContent = '0';
    $('game-streak').textContent = '0';
    $('transcript-bar').style.display = '';
    $('answer-grid').style.display = 'grid';
    $('answer-grid').classList.add('display-only');
    $('bomb-container').style.display = 'none';

    _nextRound();
  }

  function stop() {
    state.active = false;
    _clearTimer();
    RR.Speech.stop();
    $('answer-grid').style.display = 'none';
    $('answer-grid').classList.remove('display-only');
    _clearAnswerStyles();
  }

  function _nextRound() {
    if (!state.active) return;

    if (state.roundIndex >= ROUND_COUNT) {
      _endGame();
      return;
    }

    state.currentChallenge = RR.Vocabulary.getSentenceChallenge(state.difficulty);
    state.roundIndex++;

    // Animate word card
    const wordCard = $('word-card');
    wordCard.classList.remove('anim-word-enter');
    void wordCard.offsetWidth;
    wordCard.classList.add('anim-word-enter');

    // Show sentence in word card
    $('word-main').textContent = '';
    $('word-main').style.fontSize = '1.1rem';
    $('word-main').style.lineHeight = '1.5';
    $('word-main').textContent = state.currentChallenge.sentence;
    $('word-definition').textContent = 'Say the word that fits best!';
    $('word-example').textContent = `Round ${state.roundIndex} of ${ROUND_COUNT}`;
    $('transcript-text').textContent = 'Listening...';
    $('transcript-text').classList.remove('highlight');

    // Show the 4 word options as display-only
    _clearAnswerStyles();
    const options = state.currentChallenge.options;
    for (let i = 0; i < 4; i++) {
      const btn = $('answer-btn-' + i);
      btn.textContent = options[i];
    }

    // Animate grid
    const grid = $('answer-grid');
    grid.classList.remove('anim-grid-enter');
    void grid.offsetWidth;
    grid.classList.add('anim-grid-enter');

    // Set speech target to the correct word
    RR.Speech.setTarget(state.currentChallenge.correctWord);

    // Timer (tight!)
    state.timerRemaining = state.timerDuration;
    state.roundStartTime = Date.now();
    _startTimer();
    RR.Speech.start();
  }

  function onWordDetected(word) {
    if (!state.active || !state.currentChallenge) return;

    const responseTime = Date.now() - state.roundStartTime;
    _clearTimer();

    // Highlight the correct word in the grid
    const options = state.currentChallenge.options;
    for (let i = 0; i < 4; i++) {
      if (options[i] === state.currentChallenge.correctWord) {
        $('answer-btn-' + i).classList.add('correct', 'anim-answer-correct');
      }
    }

    state.wordsCorrect++;
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);

    const points = RR.Progress.calculateScore(responseTime, state.streak);
    state.score += points;
    state.totalResponseTime += responseTime;
    state.wordsCompleted++;

    RR.Progress.recordWordAttempt(state.currentChallenge.correctWord, true, responseTime);

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

  function _clearAnswerStyles() {
    for (let i = 0; i < 4; i++) {
      const btn = $('answer-btn-' + i);
      btn.className = 'answer-btn glass-card';
      btn.textContent = '';
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

    if (pct <= 25) {
      fill.classList.add('danger');
      label.classList.add('anim-timer-urgent');
    } else if (pct <= 45) {
      fill.classList.add('warning');
    }
  }

  function _onTimeUp() {
    if (!state.active) return;
    _clearTimer();

    state.streak = 0;
    state.wordsCompleted++;

    // Highlight correct answer
    if (state.currentChallenge) {
      const options = state.currentChallenge.options;
      for (let i = 0; i < 4; i++) {
        if (options[i] === state.currentChallenge.correctWord) {
          $('answer-btn-' + i).classList.add('highlight-word');
        }
      }
      RR.Progress.recordWordAttempt(state.currentChallenge.correctWord, false, state.timerDuration * 1000);
    }

    $('game-streak').textContent = '0';

    _showResult(false, 0);
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
    const word = state.currentChallenge.correctWord;
    $('word-example').textContent = `Hint: starts with "${word.charAt(0).toUpperCase()}..."`;
    $('word-example').style.color = 'var(--warning)';
    setTimeout(() => { if ($('word-example')) $('word-example').style.color = ''; }, 3000);
  }

  function _showResult(success, points, timeMs) {
    const overlay = $('result-overlay');
    const icon = $('result-icon');
    const text = $('result-text');
    const pts = $('result-points');

    if (success) {
      icon.textContent = '\u2713';
      icon.style.color = 'var(--success)';
      const messages = ['Perfect fit!', 'Right word!', 'Nailed it!', 'Exactly!', 'Spot on!', 'Precise!'];
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
      pts.textContent = 'The word was: ' + (state.currentChallenge ? state.currentChallenge.correctWord : '');
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

    // Restore UI
    $('answer-grid').style.display = 'none';
    $('answer-grid').classList.remove('display-only');
    $('word-main').style.fontSize = '';
    $('word-main').style.lineHeight = '';

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
    onAnswerSelected: function () {}, // Display-only, no clicking
  };
})();
