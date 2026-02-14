/* ================================================
   Storage Module - LocalStorage wrapper
   ================================================ */
window.RR = window.RR || {};

RR.Storage = (function () {
  const PREFIX = 'recallrush_';

  const DEFAULTS = {
    apiKey: '',
    timerDuration: 10,
    difficulty: 'intermediate',
    category: 'general',
    speechEngine: 'webspeech',
    xp: 0,
    level: 1,
    streak: 0,
    lastPlayDate: null,
    gamesPlayed: 0,
    totalWords: 0,
    totalCorrect: 0,
    totalResponseTimeMs: 0,
    bestStreak: 0,
    bestScores: {},
    wordHistory: {},       // { word: { attempts, correct, avgTime } }
    masteredWords: [],
    cachedVocabulary: [],
    setupComplete: false,
  };

  function _key(name) {
    return PREFIX + name;
  }

  function get(name) {
    try {
      const raw = localStorage.getItem(_key(name));
      if (raw === null) {
        return DEFAULTS[name] !== undefined ? DEFAULTS[name] : null;
      }
      return JSON.parse(raw);
    } catch (e) {
      return DEFAULTS[name] !== undefined ? DEFAULTS[name] : null;
    }
  }

  function set(name, value) {
    try {
      localStorage.setItem(_key(name), JSON.stringify(value));
    } catch (e) {
      console.warn('Storage: failed to save', name, e);
    }
  }

  function remove(name) {
    localStorage.removeItem(_key(name));
  }

  function getAll() {
    const data = {};
    for (const key of Object.keys(DEFAULTS)) {
      data[key] = get(key);
    }
    return data;
  }

  function resetAll() {
    for (const key of Object.keys(DEFAULTS)) {
      remove(key);
    }
  }

  // Get settings as an object
  function getSettings() {
    return {
      apiKey: get('apiKey'),
      timerDuration: get('timerDuration'),
      difficulty: get('difficulty'),
      category: get('category'),
      speechEngine: get('speechEngine'),
    };
  }

  // Save settings from an object
  function saveSettings(settings) {
    for (const [key, val] of Object.entries(settings)) {
      set(key, val);
    }
  }

  return {
    get,
    set,
    remove,
    getAll,
    resetAll,
    getSettings,
    saveSettings,
    DEFAULTS,
  };
})();
