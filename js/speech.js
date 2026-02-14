/* ================================================
   Speech Module - Dual engine speech recognition
   Primary: Web Speech API (fast, ~200ms)
   Fallback: Available for future Whisper integration
   ================================================ */
window.RR = window.RR || {};

RR.Speech = (function () {
  let recognition = null;
  let isListening = false;
  let onResult = null;       // callback(transcript, isFinal)
  let onWordDetected = null; // callback(word)
  let targetWord = '';
  let targetSynonyms = [];   // For synonym sprint mode
  let fullTranscript = '';
  let _currentLang = 'en-US';

  // Check if Web Speech API is available
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSupported = !!SpeechRecognition;

  function init() {
    if (!isSupported) {
      console.warn('Speech: Web Speech API not supported in this browser');
      return false;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = _currentLang;
    recognition.maxAlternatives = 3;

    recognition.onresult = function (event) {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }

      const current = (finalTranscript || interimTranscript).trim();
      fullTranscript = current;

      // Fire result callback
      if (onResult) {
        onResult(current, !!finalTranscript);
      }

      // Check for target word in transcript
      _checkForTarget(current);
    };

    recognition.onerror = function (event) {
      // 'no-speech' and 'aborted' are normal during gameplay
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.warn('Speech error:', event.error);
      }
      // Auto-restart on network errors
      if (event.error === 'network' && isListening) {
        setTimeout(() => {
          try { recognition.start(); } catch (e) { /* ignore */ }
        }, 500);
      }
    };

    recognition.onend = function () {
      // Auto-restart if we should still be listening
      if (isListening) {
        try {
          recognition.start();
        } catch (e) { /* ignore */ }
      }
    };

    return true;
  }

  function _checkForTarget(transcript) {
    if (!transcript) return;
    const lower = transcript.toLowerCase();

    // Check main target word
    if (targetWord) {
      const target = targetWord.toLowerCase();
      // Check for the word (allow word boundary matching)
      if (_containsWord(lower, target)) {
        if (onWordDetected) onWordDetected(targetWord);
        return;
      }
    }

    // Check synonyms (for synonym sprint mode)
    if (targetSynonyms.length > 0) {
      for (const syn of targetSynonyms) {
        if (_containsWord(lower, syn.toLowerCase())) {
          if (onWordDetected) onWordDetected(syn);
          return;
        }
      }
    }
  }

  function _containsWord(text, word) {
    // Create a regex that matches the word with word boundaries
    // Also handle common speech recognition variations
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escaped + '\\b', 'i');
    if (regex.test(text)) return true;

    // Also check without strict word boundaries for compound words
    if (text.includes(word)) return true;

    return false;
  }

  function start() {
    if (!recognition) {
      if (!init()) return false;
    }
    fullTranscript = '';
    isListening = true;
    try {
      recognition.start();
      return true;
    } catch (e) {
      // Already started
      return true;
    }
  }

  function stop() {
    isListening = false;
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) { /* ignore */ }
    }
  }

  function setTarget(word, synonyms) {
    targetWord = word || '';
    targetSynonyms = synonyms || [];
    fullTranscript = '';
  }

  function clearTarget() {
    targetWord = '';
    targetSynonyms = [];
    fullTranscript = '';
  }

  function getTranscript() {
    return fullTranscript;
  }

  function setLanguage(lang) {
    _currentLang = lang || 'en-US';
    if (recognition) {
      recognition.lang = _currentLang;
    }
  }

  return {
    init,
    start,
    stop,
    setTarget,
    clearTarget,
    getTranscript,
    setLanguage,
    get isSupported() { return isSupported; },
    get isListening() { return isListening; },
    set onResult(fn) { onResult = fn; },
    set onWordDetected(fn) { onWordDetected = fn; },
  };
})();
