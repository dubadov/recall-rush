/* ================================================
   Storage Module - LocalStorage wrapper
   ================================================ */
window.RR = window.RR || {};

RR.Storage = (function () {
  const PREFIX = 'recallrush_';

  const DEFAULTS = {
    apiKey: '',
    difficulty: 3,          // 1-5 numeric scale (was string, now numeric)
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

  // Difficulty level → timer duration (seconds)
  const DIFFICULTY_TIMER = { 1: 15, 2: 12, 3: 10, 4: 8, 5: 6 };

  // Backward-compat: map old string difficulty to numeric 1-5
  const _DIFF_MAP = { beginner: 1, intermediate: 3, advanced: 4, expert: 5 };

  function _migrateDifficulty(val) {
    if (typeof val === 'string' && _DIFF_MAP[val] !== undefined) {
      const num = _DIFF_MAP[val];
      set('difficulty', num);
      return num;
    }
    // Handle numeric strings like "3" from old code
    const num = typeof val === 'string' ? parseInt(val, 10) : val;
    if (typeof num === 'number' && !isNaN(num) && num >= 1 && num <= 5) return num;
    return DEFAULTS.difficulty;
  }

  // Get settings as an object
  function getSettings() {
    const diff = _migrateDifficulty(get('difficulty'));
    return {
      apiKey: get('apiKey'),
      difficulty: diff,
      timerDuration: DIFFICULTY_TIMER[diff] || 10,
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
    DIFFICULTY_TIMER,
  };
})();
