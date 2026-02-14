/* ================================================
   Speed Recall - Main Game Mode
   Say the target word in a sentence before time runs out
   ================================================ */
window.RR = window.RR || {};
RR.GameModes = RR.GameModes || {};

RR.GameModes.SpeedRecall = (function () {
  const MODE_ID = 'speed-recall';
  const ROUND_COUNT = 15; // Words per game

  let state = {
    active: false,
    score: 0,
    streak: 0,
    bestStreak: 0,
    wordsCompleted: 0,
    wordsCorrect: 0,
    roundIndex: 0,
    currentWord: null,
    timerDuration: 10,
    timerRemaining: 10,
    timerInterval: null,
    roundStartTime: 0,
    totalResponseTime: 0,
    hintUsed: false,
  };

  // DOM refs
  const $ = (id) => document.getElementById(id);

  function init() {
    // Listeners are set up by app.js
  }

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
      currentWord: null,
      timerDuration: settings.timerDuration,
      timerRemaining: settings.timerDuration,
      timerInterval: null,
      roundStartTime: 0,
      totalResponseTime: 0,
      hintUsed: false,
    };

    // Load vocabulary
    await RR.Vocabulary.loadWords(settings.difficulty, settings.category);

    // Update UI
    $('game-mode-title').textContent = 'Speed Recall';
    $('game-score').textContent = '0';
    $('game-streak').textContent = '0';

    // Start first round
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

    // Get next word
    state.currentWord = RR.Vocabulary.getNextWord();
    state.roundIndex++;
    state.hintUsed = false;

    // Animate word card
    const wordCard = $('word-card');
    wordCard.classList.remove('anim-word-enter');
    void wordCard.offsetWidth; // Force reflow
    wordCard.classList.add('anim-word-enter');

    // Display word
    $('word-main').textContent = state.currentWord.word.toUpperCase();
    $('word-definition').textContent = state.currentWord.definition;
    $('word-example').textContent = `"${state.currentWord.example}"`;
    $('transcript-text').textContent = 'Listening...';
    $('transcript-text').classList.remove('highlight');

    // Set speech target
    RR.Speech.setTarget(state.currentWord.word);

    // Reset and start timer
    state.timerRemaining = state.timerDuration;
    state.roundStartTime = Date.now();
    _startTimer();

    // Start listening
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

      // Urgent tick sound in last 3 seconds
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

    // Color changes
    fill.classList.remove('warning', 'danger');
    label.classList.remove('anim-timer-urgent');

    if (pct <= 20) {
      fill.classList.add('danger');
      label.classList.add('anim-timer-urgent');
    } else if (pct <= 40) {
      fill.classList.add('warning');
    }
  }

  function onWordDetected(word) {
    if (!state.active || !state.currentWord) return;

    const responseTime = Date.now() - state.roundStartTime;
    _clearTimer();

    // Success!
    state.wordsCorrect++;
    state.streak++;
    state.bestStreak = Math.max(state.bestStreak, state.streak);

    // Calculate score
    const points = RR.Progress.calculateScore(responseTime, state.streak);
    state.score += points;
    state.totalResponseTime += responseTime;
    state.wordsCompleted++;

    // Record word attempt
    RR.Progress.recordWordAttempt(state.currentWord.word, true, responseTime);

    // Update UI
    $('game-score').textContent = state.score;
    $('game-streak').textContent = state.streak;
    $('transcript-text').textContent = RR.Speech.getTranscript();
    $('transcript-text').classList.add('highlight');

    // Streak animation
    if (state.streak >= 3) {
      RR.Sounds.streak();
      const streakEl = $('game-streak');
      streakEl.classList.add('anim-streak');
      setTimeout(() => streakEl.classList.remove('anim-streak'), 300);
    }

    // Video glow
    const glow = $('video-glow');
    glow.classList.add('success');
    setTimeout(() => glow.classList.remove('success'), 1000);

    // Show result
    _showResult(true, points, responseTime);

    // Sound
    RR.Sounds.success();

    // Next round after brief delay
    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, 1200);
  }

  function _onTimeUp() {
    if (!state.active) return;
    _clearTimer();

    state.streak = 0;
    state.wordsCompleted++;

    // Record failed attempt
    if (state.currentWord) {
      RR.Progress.recordWordAttempt(state.currentWord.word, false, state.timerDuration * 1000);
    }

    // Update UI
    $('game-streak').textContent = '0';

    // Video glow
    const glow = $('video-glow');
    glow.classList.add('fail');
    setTimeout(() => glow.classList.remove('fail'), 1000);

    // Show result
    _showResult(false, 0);

    // Sound
    RR.Sounds.fail();

    // Next round after delay
    setTimeout(() => {
      _hideResult();
      _nextRound();
    }, 1500);
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
    if (!state.active || !state.currentWord || state.hintUsed) return;
    state.hintUsed = true;

    const word = state.currentWord.word;
    // Show first 3 letters + blanks
    const hintText = word.substring(0, 3) + '_ '.repeat(word.length - 3).trim();
    $('word-example').textContent = `Hint: starts with "${word.substring(0, 3)}..."`;
    $('word-example').style.color = 'var(--warning)';

    setTimeout(() => {
      if ($('word-example')) {
        $('word-example').style.color = '';
      }
    }, 3000);
  }

  function _showResult(success, points, timeMs) {
    const overlay = $('result-overlay');
    const icon = $('result-icon');
    const text = $('result-text');
    const pts = $('result-points');

    if (success) {
      icon.textContent = '✓';
      icon.style.color = 'var(--success)';
      const timeSec = (timeMs / 1000).toFixed(1);
      const messages = [
        'Nice!', 'Great recall!', 'Smooth!', 'Nailed it!',
        'Sharp!', 'Quick thinking!', 'Impressive!', 'On fire!'
      ];
      text.textContent = messages[Math.floor(Math.random() * messages.length)];
      pts.textContent = `+${points}`;
      pts.className = 'result-points';
      if (timeMs < RR.Progress.SPEED_BONUS_THRESHOLD) {
        pts.textContent += ` (${timeSec}s!)`;
      }
    } else {
      icon.textContent = '✗';
      icon.style.color = 'var(--danger)';
      text.textContent = 'Time\'s up!';
      pts.textContent = `The word was: ${state.currentWord ? state.currentWord.word : ''}`;
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

    // Calculate XP
    const xpEarned = Math.round(state.score * 0.5);
    const xpResult = RR.Progress.addXP(xpEarned);

    // Record game
    RR.Progress.recordGameResult({
      wordsCompleted: state.wordsCompleted,
      wordsCorrect: state.wordsCorrect,
      totalTimeMs: state.totalResponseTime,
      bestStreak: state.bestStreak,
      mode: MODE_ID,
      score: state.score,
    });

    // Update streak
    RR.Progress.updateStreak();

    // Show game over screen
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
    onWordDetected,
    getState,
  };
})();
