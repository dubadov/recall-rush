/* ================================================
   Word Bomb - Defuse the bomb by saying the word
   Timer shrinks each level, 3 lives
   ================================================ */
window.RR = window.RR || {};
RR.GameModes = RR.GameModes || {};

RR.GameModes.WordBomb = (function () {
  const MODE_ID = 'word-bomb';
  const STARTING_TIME = 12;
  const TIME_REDUCTION = 0.5;  // Reduce time each round
  const MIN_TIME = 4;
  const STARTING_LIVES = 3;

  let state = {
    active: false,
    score: 0,
    streak: 0,
    bestStreak: 0,
    lives: STARTING_LIVES,
    wordsCompleted: 0,
    wordsCorrect: 0,
    roundIndex: 0,
    currentWord: null,
    currentTime: STARTING_TIME,
    timerRemaining: STARTING_TIME,
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
      lives: STARTING_LIVES,
      wordsCompleted: 0,
      wordsCorrect: 0,
      roundIndex: 0,
      currentWord: null,
      currentTime: STARTING_TIME,
      timerRemaining: STARTING_TIME,
      timerInterval: null,
      roundStartTime: 0,
      totalResponseTime: 0,
    };

    await RR.Vocabulary.loadWords(settings.difficulty, settings.category);

    $('game-mode-title').textContent = 'Word Bomb';
    $('game-score').textContent = '0';
    $('game-streak').textContent = STARTING_LIVES + ' ❤';

    // Show bomb, hide regular timer
    $('bomb-container').style.display = 'flex';

    _nextRound();
  }

  function stop() {
    state.active = false;
    _clearTimer();
    RR.Speech.stop();
    $('bomb-container').style.display = 'none';
  }

  function _nextRound() {
    if (!state.active) return;

    if (state.lives <= 0) {
      _endGame();
      return;
    }

    state.currentWord = RR.Vocabulary.getNextWord();
    state.roundIndex++;

    // Animate word card
    const wordCard = $('word-card');
    wordCard.classList.remove('anim-word-enter');
    void wordCard.offsetWidth;
    wordCard.classList.add('anim-word-enter');

    // Display word
    $('word-main').textContent = state.currentWord.word.toUpperCase();
    $('word-definition').textContent = state.currentWord.definition;
    $('word-example').textContent = `"${state.currentWord.example}"`;
    $('transcript-text').textContent = 'Listening...';
    $('transcript-text').classList.remove('highlight');

    // Set speech target
    RR.Speech.setTarget(state.currentWord.word);

    // Timer gets shorter each round
    state.currentTime = Math.max(MIN_TIME, STARTING_TIME - (state.roundIndex - 1) * TIME_REDUCTION);
    state.timerRemaining = state.currentTime;
    state.roundStartTime = Date.now();

    // Update bomb display
    _updateBombUI();
    const bombBody = $('bomb-body');
    bombBody.classList.remove('critical', 'anim-bomb-shake', 'anim-bomb-explode');

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
        _onExplode();
      }

      _updateTimerUI();
      _updateBombUI();

      // Critical state
      if (state.timerRemaining <= 3) {
        $('bomb-body').classList.add('critical');
        if (state.timerRemaining <= 2) {
          $('bomb-body').classList.add('anim-bomb-shake');
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
    const pct = (state.timerRemaining / state.currentTime) * 100;

    fill.style.width = pct + '%';
    label.textContent = Math.ceil(state.timerRemaining) + 's';

    fill.classList.remove('warning', 'danger');
    if (pct <= 20) fill.classList.add('danger');
    else if (pct <= 40) fill.classList.add('warning');
  }

  function _updateBombUI() {
    $('bomb-timer').textContent = Math.ceil(state.timerRemaining);

    // Fuse position
    const fuse = $('bomb-fuse');
    const pct = state.timerRemaining / state.currentTime;
    fuse.style.height = Math.max(5, pct * 40) + 'px';
  }

  function onWordDetected(word) {
    if (!state.active || !state.currentWord) return;

    const responseTime = Date.now() - state.roundStartTime;
    _clearTimer();

    state.wordsCorrect++;
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);

    const points = RR.Progress.calculateScore(responseTime, state.streak);
    state.score += points;
    state.totalResponseTime += responseTime;
    state.wordsCompleted++;

    RR.Progress.recordWordAttempt(state.currentWord.word, true, responseTime);

    // Update UI
    $('game-score').textContent = state.score;
    $('transcript-text').textContent = RR.Speech.getTranscript();
    $('transcript-text').classList.add('highlight');

    // Video glow
    const glow = $('video-glow');
    glow.classList.add('success');
    setTimeout(() => glow.classList.remove('success'), 1000);

    // Defuse animation
    _showResult(true, points, responseTime);
    RR.Sounds.success();

    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, 1200);
  }

  function _onExplode() {
    if (!state.active) return;
    _clearTimer();

    state.lives--;
    state.streak = 0;
    state.wordsCompleted++;

    if (state.currentWord) {
      RR.Progress.recordWordAttempt(state.currentWord.word, false, state.currentTime * 1000);
    }

    // Update lives display
    $('game-streak').textContent = state.lives + ' ❤';

    // Bomb explode animation
    $('bomb-body').classList.add('anim-bomb-explode');
    RR.Sounds.bomb();

    // Video glow
    const glow = $('video-glow');
    glow.classList.add('fail');
    setTimeout(() => glow.classList.remove('fail'), 1000);

    _showResult(false, 0);

    setTimeout(() => {
      _hideResult();
      $('bomb-body').classList.remove('anim-bomb-explode');
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
    if (!state.active || !state.currentWord) return;
    const word = state.currentWord.word;
    $('word-example').textContent = `Hint: starts with "${word.substring(0, 3)}..."`;
    $('word-example').style.color = 'var(--warning)';
    setTimeout(() => { if ($('word-example')) $('word-example').style.color = ''; }, 3000);
  }

  function _showResult(success, points, timeMs) {
    const overlay = $('result-overlay');
    const icon = $('result-icon');
    const text = $('result-text');
    const pts = $('result-points');

    if (success) {
      icon.textContent = '✓';
      icon.style.color = 'var(--success)';
      text.textContent = 'Defused!';
      pts.textContent = `+${points}`;
      pts.className = 'result-points';
    } else {
      icon.textContent = '💥';
      icon.style.color = 'var(--danger)';
      text.textContent = state.lives > 0 ? `💣 ${state.lives} lives left` : 'BOOM! Game Over';
      pts.textContent = state.currentWord ? state.currentWord.word : '';
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
    $('bomb-container').style.display = 'none';

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
