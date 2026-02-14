/* ================================================
   Vocabulary Module - Groq API + fallback word bank
   ================================================ */
window.RR = window.RR || {};

RR.Vocabulary = (function () {

  // ---- Hardcoded fallback word bank ----
  const FALLBACK_WORDS = [
    // BEGINNER
    { word: 'Articulate', definition: 'Expressing oneself clearly and effectively', example: 'She was able to articulate her vision for the project clearly.', difficulty: 'beginner', category: 'general' },
    { word: 'Diligent', definition: 'Showing careful and persistent effort', example: 'His diligent work ethic earned him the promotion.', difficulty: 'beginner', category: 'business' },
    { word: 'Resilient', definition: 'Able to recover quickly from difficulties', example: 'The team proved resilient after the initial setback.', difficulty: 'beginner', category: 'general' },
    { word: 'Versatile', definition: 'Able to adapt to many different functions or activities', example: 'She is a versatile employee who can handle any department.', difficulty: 'beginner', category: 'business' },
    { word: 'Meticulous', definition: 'Showing great attention to detail', example: 'Her meticulous planning ensured the event ran smoothly.', difficulty: 'beginner', category: 'general' },
    { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', example: 'The CEO gave an eloquent speech at the conference.', difficulty: 'beginner', category: 'general' },
    { word: 'Pragmatic', definition: 'Dealing with things sensibly and realistically', example: 'We need a pragmatic approach to solve this budget issue.', difficulty: 'beginner', category: 'business' },
    { word: 'Tenacious', definition: 'Holding firmly to something; persistent', example: 'Her tenacious attitude helped her overcome every obstacle.', difficulty: 'beginner', category: 'general' },
    { word: 'Innovative', definition: 'Introducing new ideas or methods', example: 'The startup took an innovative approach to food delivery.', difficulty: 'beginner', category: 'business' },
    { word: 'Substantial', definition: 'Of considerable importance, size, or worth', example: 'We saw substantial growth in the third quarter.', difficulty: 'beginner', category: 'business' },
    { word: 'Comprehensive', definition: 'Including all or nearly all aspects of something', example: 'The report provides a comprehensive overview of the market.', difficulty: 'beginner', category: 'academic' },
    { word: 'Conducive', definition: 'Making a situation or outcome likely or possible', example: 'The quiet office is conducive to deep focus work.', difficulty: 'beginner', category: 'general' },

    // INTERMEDIATE
    { word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere', example: 'Smartphones have become ubiquitous in modern society.', difficulty: 'intermediate', category: 'general' },
    { word: 'Paradigm', definition: 'A typical example or pattern of something; a model', example: 'This represents a paradigm shift in how we think about education.', difficulty: 'intermediate', category: 'academic' },
    { word: 'Proliferate', definition: 'Increase rapidly in number; spread', example: 'Social media platforms have proliferated over the past decade.', difficulty: 'intermediate', category: 'general' },
    { word: 'Exacerbate', definition: 'Make a problem or situation worse', example: 'The delay only served to exacerbate the existing tensions.', difficulty: 'intermediate', category: 'general' },
    { word: 'Mitigate', definition: 'Make something less severe, serious, or painful', example: 'We implemented safeguards to mitigate the risk of data loss.', difficulty: 'intermediate', category: 'business' },
    { word: 'Juxtapose', definition: 'Place close together for contrasting effect', example: 'The film juxtaposes wealth and poverty in a striking way.', difficulty: 'intermediate', category: 'creative' },
    { word: 'Superfluous', definition: 'More than what is needed; unnecessary', example: 'We removed superfluous features to simplify the interface.', difficulty: 'intermediate', category: 'general' },
    { word: 'Ambiguous', definition: 'Open to more than one interpretation; unclear', example: 'The contract language was deliberately ambiguous.', difficulty: 'intermediate', category: 'business' },
    { word: 'Augment', definition: 'Make something greater by adding to it', example: 'We plan to augment the team with three new hires.', difficulty: 'intermediate', category: 'business' },
    { word: 'Unprecedented', definition: 'Never done or known before', example: 'The company achieved unprecedented growth this year.', difficulty: 'intermediate', category: 'general' },
    { word: 'Nuanced', definition: 'Characterized by subtle differences or distinctions', example: 'The discussion requires a more nuanced understanding of the issue.', difficulty: 'intermediate', category: 'academic' },
    { word: 'Synthesize', definition: 'Combine elements into a coherent whole', example: 'She was able to synthesize complex data into a clear narrative.', difficulty: 'intermediate', category: 'academic' },
    { word: 'Tangible', definition: 'Clear and definite; real; perceptible by touch', example: 'We need tangible results, not just promises.', difficulty: 'intermediate', category: 'business' },
    { word: 'Facilitate', definition: 'Make an action or process easier', example: 'The new software will facilitate collaboration between teams.', difficulty: 'intermediate', category: 'business' },

    // ADVANCED
    { word: 'Ephemeral', definition: 'Lasting for a very short time', example: 'Social media stories are deliberately ephemeral by design.', difficulty: 'advanced', category: 'creative' },
    { word: 'Serendipity', definition: 'The occurrence of finding pleasant things by chance', example: 'It was pure serendipity that we met at that conference.', difficulty: 'advanced', category: 'general' },
    { word: 'Quintessential', definition: 'Representing the most perfect example of something', example: 'She is the quintessential entrepreneur: bold, creative, and driven.', difficulty: 'advanced', category: 'general' },
    { word: 'Magnanimous', definition: 'Very generous or forgiving, especially toward a rival', example: 'He was magnanimous in victory, praising his opponent\'s effort.', difficulty: 'advanced', category: 'general' },
    { word: 'Ineffable', definition: 'Too great or extreme to be expressed in words', example: 'There was an ineffable beauty to the sunset over the mountains.', difficulty: 'advanced', category: 'creative' },
    { word: 'Cacophony', definition: 'A harsh, discordant mixture of sounds', example: 'The construction site was a cacophony of drills and hammers.', difficulty: 'advanced', category: 'creative' },
    { word: 'Sycophant', definition: 'A person who flatters to gain advantage', example: 'A good leader surrounds themselves with advisors, not sycophants.', difficulty: 'advanced', category: 'general' },
    { word: 'Obsequious', definition: 'Excessively obedient or attentive to gain favor', example: 'His obsequious behavior around the boss was uncomfortable to watch.', difficulty: 'advanced', category: 'business' },
    { word: 'Pernicious', definition: 'Having a harmful effect, especially in a gradual way', example: 'The pernicious effects of misinformation are hard to undo.', difficulty: 'advanced', category: 'academic' },
    { word: 'Dichotomy', definition: 'A division into two mutually exclusive groups', example: 'There is a false dichotomy between profit and social responsibility.', difficulty: 'advanced', category: 'academic' },
    { word: 'Amalgamate', definition: 'Combine or unite to form one structure', example: 'The two departments will amalgamate into a single division.', difficulty: 'advanced', category: 'business' },
    { word: 'Perfunctory', definition: 'Carried out with minimum effort or care', example: 'He gave a perfunctory nod and continued scrolling his phone.', difficulty: 'advanced', category: 'general' },

    // EXPERT
    { word: 'Loquacious', definition: 'Tending to talk a great deal; talkative', example: 'The loquacious host kept the conversation flowing effortlessly.', difficulty: 'expert', category: 'general' },
    { word: 'Verisimilitude', definition: 'The appearance of being true or real', example: 'The film achieved remarkable verisimilitude in its depiction of ancient Rome.', difficulty: 'expert', category: 'creative' },
    { word: 'Grandiloquent', definition: 'Pompous or extravagant in language or style', example: 'His grandiloquent speeches impressed some but annoyed others.', difficulty: 'expert', category: 'creative' },
    { word: 'Perspicacious', definition: 'Having a ready insight into and understanding of things', example: 'The perspicacious analyst predicted the market crash months before.', difficulty: 'expert', category: 'business' },
    { word: 'Pusillanimous', definition: 'Showing a lack of courage or determination; timid', example: 'The board made a pusillanimous decision to avoid any risk.', difficulty: 'expert', category: 'general' },
    { word: 'Sesquipedalian', definition: 'Relating to or characterized by the use of long words', example: 'His sesquipedalian writing style made the manual hard to read.', difficulty: 'expert', category: 'creative' },
    { word: 'Conflagration', definition: 'An extensive and destructive fire', example: 'The small spark turned into a conflagration that engulfed the building.', difficulty: 'expert', category: 'general' },
    { word: 'Antediluvian', definition: 'Ridiculously old-fashioned', example: 'Their antediluvian technology systems desperately needed upgrading.', difficulty: 'expert', category: 'general' },
    { word: 'Tergiversation', definition: 'The act of being evasive or ambiguous', example: 'The politician\'s tergiversation on the issue frustrated voters.', difficulty: 'expert', category: 'academic' },
    { word: 'Defenestration', definition: 'The action of throwing someone out of a window; removal from power', example: 'The board\'s defenestration of the CEO shocked the industry.', difficulty: 'expert', category: 'academic' },
    { word: 'Mellifluous', definition: 'Sweet or musical; pleasant to hear', example: 'Her mellifluous voice captivated the entire audience.', difficulty: 'expert', category: 'creative' },
    { word: 'Propinquity', definition: 'Nearness in place or time; kinship', example: 'The propinquity of the two events suggests a causal connection.', difficulty: 'expert', category: 'academic' },
  ];

  // ---- Synonym bank (for Synonym Sprint) ----
  const SYNONYM_BANK = [
    { common: 'big', synonyms: ['substantial', 'considerable', 'immense', 'colossal', 'monumental'] },
    { common: 'small', synonyms: ['diminutive', 'minuscule', 'negligible', 'trivial', 'marginal'] },
    { common: 'good', synonyms: ['exemplary', 'commendable', 'exceptional', 'superb', 'outstanding'] },
    { common: 'bad', synonyms: ['detrimental', 'deplorable', 'abysmal', 'atrocious', 'egregious'] },
    { common: 'happy', synonyms: ['elated', 'euphoric', 'jubilant', 'ecstatic', 'exuberant'] },
    { common: 'sad', synonyms: ['melancholy', 'despondent', 'morose', 'somber', 'disconsolate'] },
    { common: 'smart', synonyms: ['astute', 'shrewd', 'perspicacious', 'sagacious', 'erudite'] },
    { common: 'fast', synonyms: ['expeditious', 'swift', 'brisk', 'accelerated', 'precipitous'] },
    { common: 'slow', synonyms: ['lethargic', 'sluggish', 'languid', 'deliberate', 'protracted'] },
    { common: 'angry', synonyms: ['incensed', 'irate', 'indignant', 'livid', 'wrathful'] },
    { common: 'scared', synonyms: ['apprehensive', 'petrified', 'trepidatious', 'aghast', 'daunted'] },
    { common: 'beautiful', synonyms: ['resplendent', 'exquisite', 'magnificent', 'stunning', 'sublime'] },
    { common: 'ugly', synonyms: ['unsightly', 'grotesque', 'repugnant', 'hideous', 'abhorrent'] },
    { common: 'important', synonyms: ['paramount', 'pivotal', 'imperative', 'consequential', 'indispensable'] },
    { common: 'easy', synonyms: ['effortless', 'straightforward', 'rudimentary', 'elementary', 'uncomplicated'] },
    { common: 'hard', synonyms: ['arduous', 'formidable', 'strenuous', 'onerous', 'laborious'] },
    { common: 'old', synonyms: ['antiquated', 'archaic', 'venerable', 'primordial', 'anachronistic'] },
    { common: 'new', synonyms: ['novel', 'nascent', 'cutting-edge', 'contemporary', 'unprecedented'] },
    { common: 'clear', synonyms: ['lucid', 'transparent', 'unambiguous', 'explicit', 'manifest'] },
    { common: 'confusing', synonyms: ['perplexing', 'bewildering', 'convoluted', 'enigmatic', 'inscrutable'] },
  ];

  // ---- Cache & state ----
  let cachedWords = [];
  let usedIndices = new Set();

  // ---- Groq API integration ----
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  async function _fetchFromGroq(difficulty, category, count) {
    const apiKey = RR.Storage.get('apiKey');
    if (!apiKey) return null;

    const prompt = `Generate ${count} vocabulary words for a word recall practice game. 
Requirements:
- Difficulty level: ${difficulty}
- Category: ${category}
- Each word should be a sophisticated English word that educated adults might know but struggle to recall quickly
- Return ONLY valid JSON array, no markdown or explanation

Format each word as:
{"word": "Ubiquitous", "definition": "present, appearing, or found everywhere", "example": "Smartphones have become ubiquitous in modern society."}

Return a JSON array of ${count} objects in this exact format. Only output the JSON array, nothing else.`;

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: 'You are a vocabulary expert. You only respond with valid JSON arrays. No markdown, no explanation, just the JSON.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.8,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        console.warn('Vocabulary: Groq API error', response.status);
        return null;
      }

      const data = await response.json();
      const content = data.choices[0].message.content.trim();

      // Parse JSON (handle potential markdown wrapping)
      let jsonStr = content;
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      }

      const words = JSON.parse(jsonStr);
      // Add metadata
      return words.map(w => ({
        ...w,
        difficulty: difficulty,
        category: category,
      }));
    } catch (err) {
      console.warn('Vocabulary: failed to fetch from Groq', err);
      return null;
    }
  }

  async function loadWords(difficulty, category, count) {
    count = count || 20;

    // Try Groq API first
    const aiWords = await _fetchFromGroq(difficulty, category, count);
    if (aiWords && aiWords.length > 0) {
      cachedWords = aiWords;
      usedIndices.clear();
      // Also cache in storage for offline use
      RR.Storage.set('cachedVocabulary', aiWords);
      return aiWords;
    }

    // Fallback to cached words from previous session
    const stored = RR.Storage.get('cachedVocabulary');
    if (stored && stored.length > 0) {
      cachedWords = stored;
      usedIndices.clear();
      return stored;
    }

    // Fallback to hardcoded words
    cachedWords = _filterFallback(difficulty, category);
    usedIndices.clear();
    return cachedWords;
  }

  function _filterFallback(difficulty, category) {
    let words = [...FALLBACK_WORDS];

    // Filter by difficulty (allow current and one level below)
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const idx = levels.indexOf(difficulty);
    if (idx >= 0) {
      const allowed = levels.slice(Math.max(0, idx - 1), idx + 2);
      words = words.filter(w => allowed.includes(w.difficulty));
    }

    // Filter by category (include 'general' always)
    if (category && category !== 'general') {
      words = words.filter(w => w.category === category || w.category === 'general');
    }

    // Shuffle
    return _shuffle(words);
  }

  function getNextWord() {
    if (cachedWords.length === 0) {
      cachedWords = _shuffle([...FALLBACK_WORDS]);
    }

    // If all words used, reset
    if (usedIndices.size >= cachedWords.length) {
      usedIndices.clear();
    }

    // Find unused word
    let idx;
    do {
      idx = Math.floor(Math.random() * cachedWords.length);
    } while (usedIndices.has(idx) && usedIndices.size < cachedWords.length);

    usedIndices.add(idx);
    return cachedWords[idx];
  }

  function getRandomSynonymChallenge() {
    const idx = Math.floor(Math.random() * SYNONYM_BANK.length);
    return SYNONYM_BANK[idx];
  }

  function getSynonymBank() {
    return SYNONYM_BANK;
  }

  function _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  return {
    loadWords,
    getNextWord,
    getRandomSynonymChallenge,
    getSynonymBank,
    FALLBACK_WORDS,
  };
})();
