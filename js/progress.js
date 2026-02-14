/* ================================================
   Progress Module - XP, levels, streaks, stats
   ================================================ */
window.RR = window.RR || {};

RR.Progress = (function () {

  // XP required for each level (cumulative)
  const LEVEL_THRESHOLDS = [
    0,      // Level 1
    100,    // Level 2
    300,    // Level 3
    600,    // Level 4
    1000,   // Level 5
    1500,   // Level 6
    2200,   // Level 7
    3000,   // Level 8
    4000,   // Level 9
    5200,   // Level 10
    6600,   // Level 11
    8200,   // Level 12
    10000,  // Level 13
    12000,  // Level 14
    14500,  // Level 15
    17500,  // Level 16
    21000,  // Level 17
    25000,  // Level 18
    30000,  // Level 19
    36000,  // Level 20
  ];

  // Scoring
  const BASE_POINTS = 100;
  const STREAK_MULTIPLIER = 0.25;  // +25% per streak level
  const SPEED_BONUS_THRESHOLD = 3000; // ms - bonus if answered under this
  const SPEED_BONUS_POINTS = 50;
  const SKIP_PENALTY = 0;  // No penalty for skipping
  const TIME_UP_PENALTY = 0; // No penalty for time running out

  function calculateScore(timeMs, streak) {
    let points = BASE_POINTS;

    // Streak bonus
    const streakBonus = Math.floor(BASE_POINTS * STREAK_MULTIPLIER * Math.min(streak, 10));
    points += streakBonus;

    // Speed bonus
    if (timeMs < SPEED_BONUS_THRESHOLD) {
      points += SPEED_BONUS_POINTS;
    }

    return points;
  }

  function addXP(amount) {
    const currentXP = RR.Storage.get('xp') + amount;
    RR.Storage.set('xp', currentXP);

    // Check level up
    const currentLevel = RR.Storage.get('level');
    const newLevel = _calculateLevel(currentXP);
    if (newLevel > currentLevel) {
      RR.Storage.set('level', newLevel);
      return { xp: currentXP, level: newLevel, leveledUp: true };
    }

    return { xp: currentXP, level: currentLevel, leveledUp: false };
  }

  function _calculateLevel(xp) {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
    }
    return 1;
  }

  function getXPForNextLevel() {
    const level = RR.Storage.get('level');
    const xp = RR.Storage.get('xp');
    if (level >= LEVEL_THRESHOLDS.length) return { current: xp, needed: xp, progress: 1 };

    const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
    const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    const progress = (xp - currentThreshold) / (nextThreshold - currentThreshold);

    return {
      current: xp - currentThreshold,
      needed: nextThreshold - currentThreshold,
      progress: Math.min(1, Math.max(0, progress)),
    };
  }

  function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastPlay = RR.Storage.get('lastPlayDate');
    let streak = RR.Storage.get('streak');

    if (lastPlay === today) {
      // Already played today, streak unchanged
      return streak;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (lastPlay === yesterday) {
      // Played yesterday, increment streak
      streak += 1;
    } else if (lastPlay) {
      // Missed a day, reset streak
      streak = 1;
    } else {
      // First time playing
      streak = 1;
    }

    RR.Storage.set('streak', streak);
    RR.Storage.set('lastPlayDate', today);
    return streak;
  }

  function recordGameResult(result) {
    // result: { wordsCompleted, wordsCorrect, totalTimeMs, bestStreak, mode }
    const games = RR.Storage.get('gamesPlayed') + 1;
    const totalWords = RR.Storage.get('totalWords') + result.wordsCompleted;
    const totalCorrect = RR.Storage.get('totalCorrect') + result.wordsCorrect;
    const totalTime = RR.Storage.get('totalResponseTimeMs') + result.totalTimeMs;
    const bestStreak = Math.max(RR.Storage.get('bestStreak'), result.bestStreak);

    RR.Storage.set('gamesPlayed', games);
    RR.Storage.set('totalWords', totalWords);
    RR.Storage.set('totalCorrect', totalCorrect);
    RR.Storage.set('totalResponseTimeMs', totalTime);
    RR.Storage.set('bestStreak', bestStreak);

    // Update best score for mode
    if (result.mode && result.score) {
      const bestScores = RR.Storage.get('bestScores') || {};
      if (!bestScores[result.mode] || result.score > bestScores[result.mode]) {
        bestScores[result.mode] = result.score;
        RR.Storage.set('bestScores', bestScores);
      }
    }

    return {
      gamesPlayed: games,
      totalWords,
      accuracy: totalWords > 0 ? Math.round((totalCorrect / totalWords) * 100) : 0,
      avgResponseTime: totalWords > 0 ? Math.round(totalTime / totalWords) : 0,
      bestStreak,
    };
  }

  function recordWordAttempt(word, correct, timeMs) {
    const history = RR.Storage.get('wordHistory') || {};

    if (!history[word]) {
      history[word] = { attempts: 0, correct: 0, totalTime: 0 };
    }

    history[word].attempts += 1;
    if (correct) history[word].correct += 1;
    history[word].totalTime += timeMs;

    // Check if mastered (3+ correct, 80%+ accuracy, avg time under 4s)
    const h = history[word];
    const accuracy = h.correct / h.attempts;
    const avgTime = h.totalTime / h.attempts;

    if (h.correct >= 3 && accuracy >= 0.8 && avgTime < 4000) {
      const mastered = RR.Storage.get('masteredWords') || [];
      if (!mastered.includes(word)) {
        mastered.push(word);
        RR.Storage.set('masteredWords', mastered);
      }
    }

    RR.Storage.set('wordHistory', history);
  }

  function getStats() {
    const totalWords = RR.Storage.get('totalWords');
    const totalCorrect = RR.Storage.get('totalCorrect');
    const totalTime = RR.Storage.get('totalResponseTimeMs');

    return {
      totalWords,
      accuracy: totalWords > 0 ? Math.round((totalCorrect / totalWords) * 100) : 0,
      avgResponseTime: totalWords > 0 ? (totalTime / totalWords / 1000).toFixed(1) : '0',
      bestStreak: RR.Storage.get('bestStreak'),
      gamesPlayed: RR.Storage.get('gamesPlayed'),
      xp: RR.Storage.get('xp'),
      level: RR.Storage.get('level'),
      streak: RR.Storage.get('streak'),
      masteredWords: RR.Storage.get('masteredWords') || [],
      bestScores: RR.Storage.get('bestScores') || {},
    };
  }

  return {
    calculateScore,
    addXP,
    getXPForNextLevel,
    updateStreak,
    recordGameResult,
    recordWordAttempt,
    getStats,
    BASE_POINTS,
    SPEED_BONUS_POINTS,
    SPEED_BONUS_THRESHOLD,
  };
})();
