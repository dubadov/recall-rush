/* ================================================
   Sounds Module - Web Audio API sound effects
   No external files needed
   ================================================ */
window.RR = window.RR || {};

RR.Sounds = (function () {
  let ctx = null;

  function _getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (Chrome autoplay policy)
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function _playTone(freq, duration, type, gain, rampDown) {
    try {
      const c = _getCtx();
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, c.currentTime);
      g.gain.setValueAtTime(gain || 0.15, c.currentTime);
      if (rampDown !== false) {
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
      }
      osc.connect(g);
      g.connect(c.destination);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + duration);
    } catch (e) { /* silent fail */ }
  }

  function success() {
    _playTone(523.25, 0.1, 'sine', 0.12);  // C5
    setTimeout(() => _playTone(659.25, 0.1, 'sine', 0.12), 80);  // E5
    setTimeout(() => _playTone(783.99, 0.2, 'sine', 0.15), 160); // G5
  }

  function fail() {
    _playTone(311.13, 0.2, 'sawtooth', 0.08); // Eb4
    setTimeout(() => _playTone(233.08, 0.35, 'sawtooth', 0.06), 150); // Bb3
  }

  function tick() {
    _playTone(800, 0.05, 'sine', 0.06);
  }

  function countdown() {
    _playTone(440, 0.15, 'sine', 0.1);
  }

  function countdownGo() {
    _playTone(880, 0.25, 'sine', 0.15);
  }

  function skip() {
    _playTone(400, 0.08, 'triangle', 0.06);
    setTimeout(() => _playTone(350, 0.12, 'triangle', 0.04), 60);
  }

  function bomb() {
    // Low rumble
    _playTone(80, 0.5, 'sawtooth', 0.2);
    _playTone(60, 0.6, 'square', 0.15);
    setTimeout(() => {
      _playTone(100, 0.3, 'sawtooth', 0.1);
    }, 200);
  }

  function streak() {
    _playTone(587.33, 0.08, 'sine', 0.1); // D5
    setTimeout(() => _playTone(698.46, 0.08, 'sine', 0.1), 60); // F5
    setTimeout(() => _playTone(880, 0.15, 'sine', 0.12), 120);  // A5
    setTimeout(() => _playTone(1046.5, 0.25, 'sine', 0.14), 180); // C6
  }

  function levelUp() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      setTimeout(() => _playTone(freq, 0.15, 'sine', 0.12), i * 100);
    });
  }

  function urgentTick() {
    _playTone(600, 0.06, 'square', 0.08);
  }

  return {
    success,
    fail,
    tick,
    countdown,
    countdownGo,
    skip,
    bomb,
    streak,
    levelUp,
    urgentTick,
  };
})();
