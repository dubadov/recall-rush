/* ================================================
   App Controller - Main orchestrator
   Screen navigation, game lifecycle, event binding
   ================================================ */
window.RR = window.RR || {};

RR.App = (function () {
  let currentScreen = 'setup';
  let currentMode = null;
  let activeGame = null;

  const GAME_MODES = {
    'speed-recall': RR.GameModes.SpeedRecall,
    'word-bomb': RR.GameModes.WordBomb,
    'synonym-sprint': RR.GameModes.SynonymSprint,
  };

  const $ = (id) => document.getElementById(id);

  // ---- Screen Navigation ----
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = $('screen-' + name);
    if (screen) {
      screen.classList.add('active');
      currentScreen = name;
    }

    // Update bottom nav active states
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.nav === name);
    });
  }

  // ---- Initialize ----
  function init() {
    // Check if setup is complete
    if (RR.Storage.get('setupComplete')) {
      showScreen('menu');
      _updateMenuStats();
    } else {
      showScreen('setup');
    }

    _bindEvents();
    _initSpeech();
  }

  function _initSpeech() {
    const supported = RR.Speech.init();
    if (!supported) {
      console.warn('App: Speech recognition not supported. Game will use self-report mode.');
    }

    // Wire up speech callbacks
    RR.Speech.onResult = function (transcript, isFinal) {
      const el = $('transcript-text');
      if (el) {
        el.textContent = transcript || 'Listening...';
      }

      // Update speaking indicator
      const indicator = $('speaking-indicator');
      const glow = $('video-glow');
      if (transcript && transcript.length > 0) {
        if (indicator) indicator.classList.add('active');
        if (glow) glow.classList.add('speaking');
      }

      // Clear speaking state after brief pause
      clearTimeout(_speakingTimeout);
      _speakingTimeout = setTimeout(() => {
        if (indicator) indicator.classList.remove('active');
        if (glow) glow.classList.remove('speaking');
      }, 800);
    };

    RR.Speech.onWordDetected = function (word) {
      if (activeGame && activeGame.onWordDetected) {
        activeGame.onWordDetected(word);
      }
    };
  }

  let _speakingTimeout = null;

  // ---- Event Binding ----
  function _bindEvents() {
    // Setup screen
    $('save-api-key').addEventListener('click', _onSaveApiKey);
    $('skip-api-key').addEventListener('click', _onSkipApiKey);
    $('api-key-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') _onSaveApiKey();
    });

    // Mode cards
    document.querySelectorAll('.mode-card').forEach(card => {
      card.addEventListener('click', () => _onModeSelect(card.dataset.mode));
    });

    // Game controls
    $('game-back').addEventListener('click', _onGameBack);
    $('btn-skip').addEventListener('click', () => {
      if (activeGame && activeGame.skip) activeGame.skip();
    });
    $('btn-hint').addEventListener('click', () => {
      if (activeGame && activeGame.hint) activeGame.hint();
    });

    // Game over
    $('btn-play-again').addEventListener('click', _onPlayAgain);
    $('btn-back-menu').addEventListener('click', () => {
      RR.Video.stop();
      showScreen('menu');
      _updateMenuStats();
    });

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.nav;
        if (target === 'menu') {
          showScreen('menu');
          _updateMenuStats();
        } else if (target === 'stats') {
          _updateStatsScreen();
          showScreen('stats');
        } else if (target === 'settings') {
          _loadSettings();
          showScreen('settings');
        }
      });
    });

    // Stats back
    $('stats-back').addEventListener('click', () => {
      showScreen('menu');
      _updateMenuStats();
    });

    // Settings
    $('settings-back').addEventListener('click', () => {
      _saveSettingsFromUI();
      showScreen('menu');
      _updateMenuStats();
    });
    $('save-settings-api').addEventListener('click', () => {
      const key = $('settings-api-key').value.trim();
      if (key) {
        RR.Storage.set('apiKey', key);
        $('save-settings-api').textContent = 'Saved!';
        setTimeout(() => { $('save-settings-api').textContent = 'Save Key'; }, 1500);
      }
    });
    $('reset-progress').addEventListener('click', () => {
      if (confirm('Are you sure? This will reset all your progress, XP, and statistics.')) {
        const apiKey = RR.Storage.get('apiKey');
        RR.Storage.resetAll();
        RR.Storage.set('apiKey', apiKey);
        RR.Storage.set('setupComplete', true);
        _updateMenuStats();
        alert('Progress has been reset.');
      }
    });

    // Settings auto-save on change
    ['setting-timer', 'setting-difficulty', 'setting-category'].forEach(id => {
      $(id).addEventListener('change', _saveSettingsFromUI);
    });

    // Daily challenge
    $('start-daily').addEventListener('click', () => {
      _onModeSelect('speed-recall');
    });
  }

  // ---- Setup ----
  function _onSaveApiKey() {
    const key = $('api-key-input').value.trim();
    if (key) {
      RR.Storage.set('apiKey', key);
    }
    RR.Storage.set('setupComplete', true);
    showScreen('menu');
    _updateMenuStats();
  }

  function _onSkipApiKey() {
    RR.Storage.set('setupComplete', true);
    showScreen('menu');
    _updateMenuStats();
  }

  // ---- Game Lifecycle ----
  async function _onModeSelect(modeId) {
    const GameMode = GAME_MODES[modeId];
    if (!GameMode) {
      alert('This game mode is coming soon!');
      return;
    }

    currentMode = modeId;
    activeGame = GameMode;

    // Show game screen
    showScreen('game');

    // Start camera
    const cameraOk = await RR.Video.start('video-feed');
    if (!cameraOk) {
      alert('Camera access is needed for the full experience. The game will still work without it.');
    }

    // Show countdown
    await _showCountdown();

    // Start the game mode
    await GameMode.start();
  }

  function _showCountdown() {
    return new Promise((resolve) => {
      const overlay = $('countdown-overlay');
      const number = $('countdown-number');
      overlay.classList.add('active');

      let count = 3;
      number.textContent = count;
      number.classList.add('anim-scale-pop');
      RR.Sounds.countdown();

      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          number.classList.remove('anim-scale-pop');
          void number.offsetWidth;
          number.textContent = count;
          number.classList.add('anim-scale-pop');
          RR.Sounds.countdown();
        } else {
          number.classList.remove('anim-scale-pop');
          void number.offsetWidth;
          number.textContent = 'GO!';
          number.classList.add('anim-scale-pop');
          RR.Sounds.countdownGo();

          setTimeout(() => {
            overlay.classList.remove('active');
            resolve();
          }, 500);

          clearInterval(interval);
        }
      }, 800);
    });
  }

  function _onGameBack() {
    if (activeGame && activeGame.stop) activeGame.stop();
    RR.Video.stop();
    RR.Speech.stop();
    activeGame = null;
    showScreen('menu');
    _updateMenuStats();
  }

  function _onPlayAgain() {
    if (currentMode) {
      _onModeSelect(currentMode);
    }
  }

  function showGameOver(result) {
    // Stop video and speech
    RR.Video.stop();
    RR.Speech.stop();

    // Populate game over screen
    $('final-score').textContent = result.score;
    $('go-words-completed').textContent = result.wordsCompleted || result.wordsCorrect;
    $('go-accuracy').textContent = result.accuracy + '%';
    $('go-best-streak').textContent = result.bestStreak;
    $('go-xp-earned').textContent = '+' + result.xpEarned;

    // Level up notification
    if (result.leveledUp) {
      setTimeout(() => {
        RR.Sounds.levelUp();
      }, 500);
    }

    showScreen('gameover');
  }

  // ---- Menu Stats ----
  function _updateMenuStats() {
    const stats = RR.Progress.getStats();

    $('menu-xp').textContent = stats.xp;
    $('menu-level').textContent = stats.level;
    $('menu-streak').textContent = stats.streak;

    // Best scores
    const bestScores = stats.bestScores;
    _setBest('best-speed-recall', bestScores['speed-recall']);
    _setBest('best-word-bomb', bestScores['word-bomb']);
    _setBest('best-synonym-sprint', bestScores['synonym-sprint']);
    _setBest('best-context', bestScores['context-roulette']);
    _setBest('best-improv', bestScores['improv-interview']);
  }

  function _setBest(elementId, score) {
    const el = $(elementId);
    if (el) {
      el.textContent = score ? score : '--';
    }
  }

  // ---- Stats Screen ----
  function _updateStatsScreen() {
    const stats = RR.Progress.getStats();

    $('stat-total-words').textContent = stats.totalWords;
    $('stat-accuracy').textContent = stats.accuracy + '%';
    $('stat-avg-time').textContent = stats.avgResponseTime + 's';
    $('stat-best-streak').textContent = stats.bestStreak;
    $('stat-games-played').textContent = stats.gamesPlayed;
    $('stat-total-xp').textContent = stats.xp;

    // Mastered words list
    const list = $('mastered-list');
    const mastered = stats.masteredWords;

    if (mastered.length === 0) {
      list.innerHTML = '<p class="empty-state">No words mastered yet. Keep practicing!</p>';
    } else {
      list.innerHTML = mastered.map(word => {
        const history = RR.Storage.get('wordHistory') || {};
        const h = history[word];
        const avgTime = h ? ((h.totalTime / h.attempts) / 1000).toFixed(1) + 's avg' : '';
        return `
          <div class="mastered-item">
            <span class="mastered-word">${word}</span>
            <span class="mastered-time">${avgTime}</span>
          </div>
        `;
      }).join('');
    }
  }

  // ---- Settings ----
  function _loadSettings() {
    const settings = RR.Storage.getSettings();
    $('setting-timer').value = settings.timerDuration;
    $('setting-difficulty').value = settings.difficulty;
    $('setting-category').value = settings.category;
    $('settings-api-key').value = settings.apiKey || '';
  }

  function _saveSettingsFromUI() {
    RR.Storage.saveSettings({
      timerDuration: parseInt($('setting-timer').value),
      difficulty: $('setting-difficulty').value,
      category: $('setting-category').value,
    });
  }

  return {
    init,
    showScreen,
    showGameOver,
  };
})();

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
  RR.App.init();
});
