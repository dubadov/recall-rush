/* ================================================
   i18n Module - Internationalization (English / Hebrew)
   ================================================ */
window.RR = window.RR || {};

RR.i18n = (function () {
  let currentLang = 'en';

  const TRANSLATIONS = {
    en: {
      // ---- Setup Screen ----
      logoTitle: 'Recall Rush',
      logoSubtitle: 'Master your vocabulary under pressure',
      getStarted: 'Get Started',
      setupDesc: 'Enter your free Groq API key for AI-generated vocabulary, or skip to use the built-in word bank.',
      getFreeKey: 'Get free key',
      saveAndStart: 'Save & Start',
      skipForNow: 'Skip for now',

      // ---- Menu Header ----
      xpLabel: 'XP',
      levelLabel: 'Level',
      streakLabel: 'Streak',

      // ---- Daily Challenge ----
      dailyBadge: 'DAILY',
      dailyText: 'Complete all 10 rounds in Definition Match',
      dailyGo: 'Go',

      // ---- Mode Cards ----
      definitionMatchTitle: 'Definition Match',
      definitionMatchDesc: 'Pick the correct definition for each word',
      sentenceFillTitle: 'Sentence Fill',
      sentenceFillDesc: 'Say the word that best completes the sentence',
      recallChallengeTitle: 'Recall Challenge',
      recallChallengeDesc: 'See the definition, say the word from memory',
      wordUpgradeTitle: 'Word Upgrade',
      wordUpgradeDesc: 'Replace the common word with a more elevated synonym',

      // ---- Navigation ----
      navHome: 'Home',
      navStats: 'Stats',
      navSettings: 'Settings',

      // ---- Game Screen ----
      ptsLabel: 'pts',
      streakStatLabel: 'streak',
      listening: 'Listening...',
      skipBtn: 'Skip',
      hintBtn: 'Hint',

      // ---- Game Over ----
      gameOver: 'Game Over',
      pointsLabel: 'points',
      wordsLabel: 'Words',
      accuracyLabel: 'Accuracy',
      bestStreakLabel: 'Best Streak',
      xpEarnedLabel: 'XP Earned',
      continueSentence: 'Continue to Sentence Fill',
      playAgain: 'Play Again',
      backToMenu: 'Back to Menu',

      // ---- Stats Screen ----
      statisticsTitle: 'Statistics',
      wordsCompleted: 'Words Completed',
      avgResponse: 'Avg Response',
      gamesPlayed: 'Games Played',
      totalXP: 'Total XP',
      wordsMastered: 'Words Mastered',
      noWordsMastered: 'No words mastered yet. Keep practicing!',
      sAvg: 's avg',

      // ---- Settings Screen ----
      settingsGameTitle: 'Game',
      difficultyLabel: 'Difficulty Level',
      categoryLabel: 'Category',
      catGeneral: 'General',
      catBusiness: 'Business',
      catAcademic: 'Academic',
      catCreative: 'Creative',
      settingsApiTitle: 'API',
      groqApiKey: 'Groq API Key',
      saveKey: 'Save Key',
      settingsDataTitle: 'Data',
      resetAllProgress: 'Reset All Progress',

      // ---- Difficulty levels ----
      diffName1: 'Beginner',
      diffName2: 'Easy',
      diffName3: 'Medium',
      diffName4: 'Hard',
      diffName5: 'Master',
      diffInfo1: 'Basic words \u2022 15s timer',
      diffInfo2: 'Simple words \u2022 12s timer',
      diffInfo3: 'Balanced words \u2022 10s timer',
      diffInfo4: 'Advanced words \u2022 8s timer',
      diffInfo5: 'Expert words \u2022 6s timer',
      diffLabel: 'Difficulty',

      // ---- Dynamic JS strings ----
      countdown_go: 'GO!',
      confirmReset: 'Are you sure? This will reset all your progress, XP, and statistics.',
      progressReset: 'Progress has been reset.',
      comingSoon: 'This game mode is coming soon!',
      saved: 'Saved!',

      // ---- Definition Match ----
      pickCorrectDef: 'Pick the correct definition:',
      roundOf: 'Round {current} of {total}',
      successDef: ['Nice!', 'Correct!', 'Spot on!', 'Nailed it!', 'Sharp!', 'Well done!'],
      notQuite: 'Not quite!',
      answerWas: 'The answer was: ',

      // ---- Sentence Fill ----
      sayWordFits: 'Say the word that fits best!',
      successSentence: ['Perfect fit!', 'Right word!', 'Nailed it!', 'Exactly!', 'Spot on!', 'Precise!'],
      timesUp: "Time's up!",
      wordWas: 'The word was: ',
      hintStartsWith: 'Hint: starts with "{letter}..."',

      // ---- Recall Challenge ----
      sayTheWord: 'Say the word!',
      roundOfSay: 'Round {current} of {total} \u2022 Say the word!',
      successRecall: ['Great recall!', 'You knew it!', 'Sharp memory!', 'Impressive!', 'Nailed it!'],
      hintStartsWithLetters: 'Hint: starts with "{letters}..." ({count} letters)',

      // ---- Word Upgrade ----
      sayElevatedWord: 'Say a more elevated word!',
      upgraded: '"{word}" \u2014 upgraded!',
      tryWords: 'Try: ',
      hintsLabel: 'Hints: ',

      successUpgrade: ['Upgraded!', 'Level up!', 'Elevated!', 'Impressive!', 'Sharp!'],
    },

    he: {
      // ---- Setup Screen ----
      logoTitle: 'אתגר המילים',
      logoSubtitle: 'שלוט באוצר המילים שלך תחת לחץ',
      getStarted: 'בואו נתחיל',
      setupDesc: 'הזן את מפתח ה-Groq API החינמי שלך לאוצר מילים מונע בינה מלאכותית, או דלג כדי להשתמש בבנק המילים המובנה.',
      getFreeKey: 'קבל מפתח חינמי',
      saveAndStart: 'שמור והתחל',
      skipForNow: 'דלג לעת עתה',

      // ---- Menu Header ----
      xpLabel: 'XP',
      levelLabel: 'רמה',
      streakLabel: 'רצף',

      // ---- Daily Challenge ----
      dailyBadge: 'יומי',
      dailyText: 'השלם את כל 10 הסיבובים בהתאמת הגדרות',
      dailyGo: 'התחל',

      // ---- Mode Cards ----
      definitionMatchTitle: 'התאמת הגדרות',
      definitionMatchDesc: 'בחר את ההגדרה הנכונה לכל מילה',
      sentenceFillTitle: 'השלמת משפטים',
      sentenceFillDesc: 'אמור את המילה שמשלימה את המשפט בצורה הטובה ביותר',
      recallChallengeTitle: 'אתגר הזיכרון',
      recallChallengeDesc: 'ראה את ההגדרה, אמור את המילה מהזיכרון',
      wordUpgradeTitle: 'שדרוג מילים',
      wordUpgradeDesc: 'החלף את המילה הנפוצה במילה נרדפת מתוחכמת יותר',

      // ---- Navigation ----
      navHome: 'בית',
      navStats: 'סטטיסטיקה',
      navSettings: 'הגדרות',

      // ---- Game Screen ----
      ptsLabel: "נק'",
      streakStatLabel: 'רצף',
      listening: 'מאזין...',
      skipBtn: 'דלג',
      hintBtn: 'רמז',

      // ---- Game Over ----
      gameOver: 'המשחק נגמר',
      pointsLabel: 'נקודות',
      wordsLabel: 'מילים',
      accuracyLabel: 'דיוק',
      bestStreakLabel: 'רצף הכי טוב',
      xpEarnedLabel: 'XP שנצבר',
      continueSentence: 'המשך להשלמת משפטים',
      playAgain: 'שחק שוב',
      backToMenu: 'חזור לתפריט',

      // ---- Stats Screen ----
      statisticsTitle: 'סטטיסטיקה',
      wordsCompleted: 'מילים שהושלמו',
      avgResponse: 'זמן תגובה ממוצע',
      gamesPlayed: 'משחקים ששוחקו',
      totalXP: 'סה״כ XP',
      wordsMastered: 'מילים שנשלטו',
      noWordsMastered: 'עדיין לא שלטת במילים. המשך לתרגל!',
      sAvg: 'שנ׳ ממוצע',

      // ---- Settings Screen ----
      settingsGameTitle: 'משחק',
      difficultyLabel: 'רמת קושי',
      categoryLabel: 'קטגוריה',
      catGeneral: 'כללי',
      catBusiness: 'עסקים',
      catAcademic: 'אקדמי',
      catCreative: 'יצירתי',
      settingsApiTitle: 'API',
      groqApiKey: 'מפתח Groq API',
      saveKey: 'שמור מפתח',
      settingsDataTitle: 'נתונים',
      resetAllProgress: 'אפס את כל ההתקדמות',

      // ---- Difficulty levels ----
      diffName1: 'מתחיל',
      diffName2: 'קל',
      diffName3: 'בינוני',
      diffName4: 'קשה',
      diffName5: 'מומחה',
      diffInfo1: 'מילים בסיסיות \u2022 15 שניות',
      diffInfo2: 'מילים פשוטות \u2022 12 שניות',
      diffInfo3: 'מילים מאוזנות \u2022 10 שניות',
      diffInfo4: 'מילים מתקדמות \u2022 8 שניות',
      diffInfo5: 'מילים ברמת מומחה \u2022 6 שניות',
      diffLabel: 'קושי',

      // ---- Dynamic JS strings ----
      countdown_go: '!קדימה',
      confirmReset: 'האם אתה בטוח? פעולה זו תאפס את כל ההתקדמות, ה-XP והסטטיסטיקה שלך.',
      progressReset: 'ההתקדמות אופסה.',
      comingSoon: 'מצב משחק זה יהיה זמין בקרוב!',
      saved: 'נשמר!',

      // ---- Definition Match ----
      pickCorrectDef: 'בחר את ההגדרה הנכונה:',
      roundOf: 'סיבוב {current} מתוך {total}',
      successDef: ['יפה!', 'נכון!', 'בדיוק!', 'מושלם!', 'חד!', 'כל הכבוד!'],
      notQuite: 'לא בדיוק!',
      answerWas: 'התשובה הייתה: ',

      // ---- Sentence Fill ----
      sayWordFits: 'אמור את המילה המתאימה ביותר!',
      successSentence: ['מתאים מושלם!', 'המילה הנכונה!', 'מושלם!', 'בדיוק!', 'מדויק!', 'נכון!'],
      timesUp: 'נגמר הזמן!',
      wordWas: 'המילה הייתה: ',
      hintStartsWith: 'רמז: מתחיל ב-"{letter}..."',

      // ---- Recall Challenge ----
      sayTheWord: 'אמור את המילה!',
      roundOfSay: 'סיבוב {current} מתוך {total} \u2022 אמור את המילה!',
      successRecall: ['זיכרון מצוין!', 'ידעת!', 'זיכרון חד!', 'מרשים!', 'מושלם!'],
      hintStartsWithLetters: 'רמז: מתחיל ב-"{letters}..." ({count} אותיות)',

      // ---- Word Upgrade ----
      sayElevatedWord: 'אמור מילה מתוחכמת יותר!',
      upgraded: '"{word}" \u2014 שודרג!',
      tryWords: 'נסה: ',
      hintsLabel: 'רמזים: ',

      successUpgrade: ['שודרג!', 'רמה למעלה!', 'מתוחכם!', 'מרשים!', 'חד!'],
    },
  };

  /**
   * Get translation for a key, with optional interpolation.
   * t('roundOf', { current: 3, total: 10 }) => "Round 3 of 10"
   */
  function t(key, params) {
    const val = TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key;

    // If it's an array, return the whole array (for random message picks)
    if (Array.isArray(val)) return val;

    // Interpolate {placeholders}
    if (params && typeof val === 'string') {
      return val.replace(/\{(\w+)\}/g, (_, k) => params[k] !== undefined ? params[k] : _);
    }
    return val;
  }

  /**
   * Pick a random message from a translation array key.
   */
  function tRandom(key) {
    const arr = t(key);
    if (Array.isArray(arr)) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    return arr;
  }

  /**
   * Set the active language. Updates dir, lang, and all data-i18n elements.
   */
  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;

    // Persist
    try {
      localStorage.setItem('recallrush_language', lang);
    } catch (e) { /* ignore */ }

    // Update document direction and lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      if (typeof translation === 'string') {
        el.textContent = translation;
      }
    });

    // Update data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = t(key);
      if (typeof translation === 'string') {
        el.placeholder = translation;
      }
    });

    // Update the toggle button text
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = lang === 'he' ? 'EN' : 'עב';
    }

    // Update speech recognition language
    if (RR.Speech && RR.Speech.setLanguage) {
      RR.Speech.setLanguage(lang === 'he' ? 'he-IL' : 'en-US');
    }
  }

  /**
   * Get the current language code ('en' or 'he').
   */
  function getLang() {
    return currentLang;
  }

  /**
   * Initialize: read saved language from localStorage.
   */
  function init() {
    try {
      const saved = localStorage.getItem('recallrush_language');
      if (saved && TRANSLATIONS[saved]) {
        currentLang = saved;
      }
    } catch (e) { /* ignore */ }

    // Apply immediately
    setLanguage(currentLang);
  }

  return {
    t,
    tRandom,
    setLanguage,
    getLang,
    init,
    TRANSLATIONS,
  };
})();
