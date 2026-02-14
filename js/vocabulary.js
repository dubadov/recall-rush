/* ================================================
   Vocabulary Module - Word banks for all game modes
   ================================================ */
window.RR = window.RR || {};

RR.Vocabulary = (function () {

  // ---- Definition Match word bank ----
  // Each word has a correct definition and 3 plausible wrong ones
  const DEFINITION_BANK = [
    { word: 'Relevant', definition: 'Closely connected or appropriate to the matter at hand', wrongDefinitions: ['Required by law or regulation', 'Repeated multiple times for emphasis', 'Resistant to change or influence'], difficulty: 'beginner', category: 'general' },
    { word: 'Adequate', definition: 'Sufficient for a specific need or requirement', wrongDefinitions: ['Perfectly executed without any flaws', 'Adjusted to fit new circumstances', 'Admired by a large group of people'], difficulty: 'beginner', category: 'general' },
    { word: 'Concise', definition: 'Giving a lot of information clearly in few words', wrongDefinitions: ['Agreeing with someone reluctantly', 'Happening at the same time as something else', 'Certain about something without any doubt'], difficulty: 'beginner', category: 'general' },
    { word: 'Diligent', definition: 'Showing careful and persistent effort in work', wrongDefinitions: ['Willing to share with others generously', 'Having a natural talent for something', 'Speaking in a direct and honest manner'], difficulty: 'beginner', category: 'general' },
    { word: 'Pragmatic', definition: 'Dealing with things sensibly and realistically', wrongDefinitions: ['Following strict rules without exception', 'Expressing emotions openly and freely', 'Acting without thinking about consequences'], difficulty: 'beginner', category: 'general' },
    { word: 'Substantial', definition: 'Of considerable importance, size, or worth', wrongDefinitions: ['Easily broken or damaged by force', 'Located beneath the surface of something', 'Substituted in place of the original'], difficulty: 'beginner', category: 'business' },
    { word: 'Versatile', definition: 'Able to adapt to many different functions or activities', wrongDefinitions: ['Speaking in a poetic or rhythmic way', 'Arranged in a vertical or upright position', 'Competing against others for dominance'], difficulty: 'beginner', category: 'general' },
    { word: 'Comprehensive', definition: 'Including all or nearly all elements or aspects', wrongDefinitions: ['Easy to understand at first glance', 'Feeling sympathy for another person', 'Forced to comply against your will'], difficulty: 'beginner', category: 'academic' },
    { word: 'Ambiguous', definition: 'Open to more than one interpretation; unclear', wrongDefinitions: ['Extremely large in size or scope', 'Having strong desires to achieve success', 'Willing to take bold risks'], difficulty: 'intermediate', category: 'general' },
    { word: 'Facilitate', definition: 'Make an action or process easier', wrongDefinitions: ['Create something entirely from scratch', 'Pretend to have a quality you lack', 'Break something into smaller parts'], difficulty: 'beginner', category: 'business' },
    { word: 'Resilient', definition: 'Able to recover quickly from difficulties', wrongDefinitions: ['Unwilling to change your opinion', 'Resistant to any kind of authority', 'Living in a remote rural area'], difficulty: 'beginner', category: 'general' },
    { word: 'Meticulous', definition: 'Showing great attention to detail; very careful', wrongDefinitions: ['Happening in a very dramatic fashion', 'Relating to metals or metal work', 'Extremely fast and efficient'], difficulty: 'beginner', category: 'general' },
    { word: 'Elaborate', definition: 'Involving many carefully arranged parts; detailed', wrongDefinitions: ['Arriving late to an important event', 'Working independently without help', 'Choosing the simplest available option'], difficulty: 'beginner', category: 'general' },
    { word: 'Credible', definition: 'Able to be believed; convincing and trustworthy', wrongDefinitions: ['Deserving praise for an achievement', 'Able to be bent without breaking', 'Likely to cause harm or injury'], difficulty: 'beginner', category: 'general' },
    { word: 'Inevitable', definition: 'Certain to happen; unavoidable', wrongDefinitions: ['Invisible to the naked eye', 'Not able to be invented or created', 'Happening inside a closed space'], difficulty: 'intermediate', category: 'general' },
    { word: 'Profound', definition: 'Very great or intense; having deep meaning', wrongDefinitions: ['Existing in large quantities', 'Found only in professional settings', 'Proving something to be correct'], difficulty: 'intermediate', category: 'academic' },
    { word: 'Feasible', definition: 'Possible and practical to do or achieve', wrongDefinitions: ['Easy to celebrate or enjoy', 'Capable of being seen from far away', 'Likely to cause a festive mood'], difficulty: 'intermediate', category: 'business' },
    { word: 'Prevalent', definition: 'Widespread in a particular area or at a particular time', wrongDefinitions: ['Happening before the expected time', 'Having the ability to prevent harm', 'Valued more highly than everything else'], difficulty: 'intermediate', category: 'general' },
    { word: 'Inherent', definition: 'Existing as a natural or permanent quality of something', wrongDefinitions: ['Received through a legal will or inheritance', 'Hidden from view or kept secret', 'Placed inside a container for storage'], difficulty: 'intermediate', category: 'academic' },
    { word: 'Tangible', definition: 'Clear and definite; real enough to be perceived', wrongDefinitions: ['Easily tangled or twisted together', 'Capable of being argued or debated', 'Related to taste or flavor'], difficulty: 'intermediate', category: 'business' },
    { word: 'Articulate', definition: 'Expressing oneself clearly and effectively', wrongDefinitions: ['Having joints that move freely', 'Creating visual art professionally', 'Joining separate pieces together'], difficulty: 'beginner', category: 'general' },
    { word: 'Conducive', definition: 'Making a certain situation or outcome likely', wrongDefinitions: ['Leading a group with authority', 'Transferring electricity or heat', 'Behaving in a polite and proper way'], difficulty: 'intermediate', category: 'general' },
    { word: 'Prudent', definition: 'Acting with care and thought for the future', wrongDefinitions: ['Feeling proud of your accomplishments', 'Being overly strict with others', 'Showing off wealth or status'], difficulty: 'intermediate', category: 'business' },
    { word: 'Subtle', definition: 'So delicate or precise as to be difficult to notice', wrongDefinitions: ['Located directly below something', 'Appearing only at certain times', 'Changed into a different form'], difficulty: 'intermediate', category: 'general' },
    { word: 'Coherent', definition: 'Logical and consistent; easy to follow', wrongDefinitions: ['Sticking together physically', 'Working together as equal partners', 'Following the latest trends'], difficulty: 'intermediate', category: 'academic' },
    { word: 'Lucid', definition: 'Expressed clearly; easy to understand', wrongDefinitions: ['Giving off a faint glow of light', 'Extremely fortunate or lucky', 'Happening during sleep or rest'], difficulty: 'intermediate', category: 'academic' },
    { word: 'Mitigate', definition: 'Make something less severe or serious', wrongDefinitions: ['Move from one place to another', 'Copy or imitate someone exactly', 'Combine two things into one'], difficulty: 'intermediate', category: 'business' },
    { word: 'Scrutinize', definition: 'Examine or inspect closely and thoroughly', wrongDefinitions: ['Clean something until it shines', 'Write in very small handwriting', 'Criticize someone harshly in public'], difficulty: 'intermediate', category: 'general' },
    { word: 'Contemplate', definition: 'Look at thoughtfully; think about deeply', wrongDefinitions: ['Show strong disapproval of something', 'Argue against a popular belief', 'Arrive at the same time as others'], difficulty: 'intermediate', category: 'general' },
    { word: 'Trivial', definition: 'Of little value or importance; insignificant', wrongDefinitions: ['Having exactly three components', 'Relating to ancient civilizations', 'Happening every three years'], difficulty: 'beginner', category: 'general' },
    { word: 'Discrepancy', definition: 'A difference between things that should be the same', wrongDefinitions: ['A lack of respect for authority', 'A feeling of sadness or loss', 'A secret plan to cause harm'], difficulty: 'intermediate', category: 'business' },
    { word: 'Exemplary', definition: 'Serving as a desirable model; very good', wrongDefinitions: ['Free from any rules or restrictions', 'Given as a sample without charge', 'Required to complete a test or exam'], difficulty: 'intermediate', category: 'general' },
    { word: 'Impartial', definition: 'Treating all rivals or sides equally; fair', wrongDefinitions: ['Not complete; missing some parts', 'Unable to be divided into parts', 'Having no particular interest in anything'], difficulty: 'intermediate', category: 'general' },
    { word: 'Mundane', definition: 'Lacking interest or excitement; dull and ordinary', wrongDefinitions: ['Relating to the entire world', 'Clean and free from bacteria', 'Happening once every month'], difficulty: 'intermediate', category: 'general' },
    { word: 'Precarious', definition: 'Not securely held; dangerously likely to fall or fail', wrongDefinitions: ['Extremely valuable and worth protecting', 'Coming before something in time', 'Done with great care and precision'], difficulty: 'intermediate', category: 'general' },
    { word: 'Superficial', definition: 'Existing or occurring at the surface; lacking depth', wrongDefinitions: ['Better than everything else; supreme', 'Having supernatural or magical powers', 'Extremely well organized and efficient'], difficulty: 'intermediate', category: 'general' },
    { word: 'Complacent', definition: 'Smugly satisfied with oneself; uncritically content', wrongDefinitions: ['Willing to follow orders without question', 'Expressing a formal complaint officially', 'Feeling grateful for what you have'], difficulty: 'intermediate', category: 'general' },
    { word: 'Redundant', definition: 'No longer needed or useful; unnecessarily repetitive', wrongDefinitions: ['Extremely abundant and overflowing', 'Painted a deep shade of red', 'Returned to a previous condition'], difficulty: 'intermediate', category: 'business' },
    { word: 'Sporadic', definition: 'Occurring at irregular intervals; not constant', wrongDefinitions: ['Related to athletics or physical exercise', 'Happening in a dramatic and sudden way', 'Spread evenly across a large area'], difficulty: 'intermediate', category: 'general' },
    { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', wrongDefinitions: ['Extremely elegant in appearance', 'Silent and unwilling to communicate', 'Referring to a specific historical period'], difficulty: 'intermediate', category: 'general' },
    { word: 'Futile', definition: 'Incapable of producing any useful result; pointless', wrongDefinitions: ['Full of energy and enthusiasm', 'Relating to events in the future', 'Extremely small in size or amount'], difficulty: 'intermediate', category: 'general' },
    { word: 'Hinder', definition: 'Create difficulties that delay or prevent progress', wrongDefinitions: ['Stay behind someone to offer support', 'Look back at past events with fondness', 'Connect two separate things together'], difficulty: 'beginner', category: 'general' },
    { word: 'Nominal', definition: 'Existing in name only; very small or token', wrongDefinitions: ['Following all expected social norms', 'Being the most popular choice', 'Selected by voting or nomination'], difficulty: 'intermediate', category: 'business' },
    { word: 'Plausible', definition: 'Seeming reasonable or probable; believable', wrongDefinitions: ['Deserving of applause and recognition', 'Flexible enough to be shaped easily', 'Likely to cause pleasure or delight'], difficulty: 'intermediate', category: 'general' },
    { word: 'Detrimental', definition: 'Tending to cause harm; damaging', wrongDefinitions: ['Helping to determine the final outcome', 'Firmly committed to a specific goal', 'Easily identified or recognized'], difficulty: 'intermediate', category: 'general' },
    { word: 'Tenacious', definition: 'Holding firmly to something; persistent and determined', wrongDefinitions: ['Living in rented accommodation', 'Easily stretched without breaking', 'Having a gentle and quiet nature'], difficulty: 'intermediate', category: 'general' },
    { word: 'Obsolete', definition: 'No longer produced or used; out of date', wrongDefinitions: ['Extremely large and difficult to move', 'Following all requirements precisely', 'Happening without any warning'], difficulty: 'intermediate', category: 'general' },
    { word: 'Unanimous', definition: 'Fully in agreement; with everyone consenting', wrongDefinitions: ['Done without revealing your identity', 'Happening only one time ever', 'Related to a single universe or world'], difficulty: 'intermediate', category: 'general' },
    { word: 'Volatile', definition: 'Liable to change rapidly and unpredictably', wrongDefinitions: ['Relating to electrical voltage', 'Done by free will and choice', 'Large enough to fill a whole volume'], difficulty: 'intermediate', category: 'business' },
    { word: 'Arbitrary', definition: 'Based on random choice rather than reason', wrongDefinitions: ['Relating to trees and woodland areas', 'Serving as a judge or mediator', 'Following a strict alphabetical order'], difficulty: 'intermediate', category: 'general' },
    { word: 'Compelling', definition: 'Evoking interest or attention in a powerfully irresistible way', wrongDefinitions: ['Forcing someone to act against their will', 'Gathering items into a single collection', 'Competing fiercely with a close rival'], difficulty: 'intermediate', category: 'general' },
    { word: 'Explicit', definition: 'Stated clearly and in detail, leaving no room for doubt', wrongDefinitions: ['Happening without any prior planning', 'Excluded from a group or activity', 'Extremely complicated and hard to follow'], difficulty: 'intermediate', category: 'general' },
    { word: 'Contingent', definition: 'Dependent on certain circumstances or conditions', wrongDefinitions: ['Touching or sharing a common border', 'Continuing without any interruption', 'Satisfied with current conditions'], difficulty: 'intermediate', category: 'business' },
    { word: 'Restore', definition: 'Return something to a former condition or position', wrongDefinitions: ['Keep something in its current state', 'Store items away for future use', 'Restrict access to a limited group'], difficulty: 'beginner', category: 'general' },
    { word: 'Imprudent', definition: 'Not showing care for the consequences of an action; rash', wrongDefinitions: ['Extremely patient and slow to act', 'Unable to be improved or enhanced', 'Lacking any sense of pride or dignity'], difficulty: 'intermediate', category: 'general' },
    { word: 'Optimistic', definition: 'Hopeful and confident about the future or success', wrongDefinitions: ['Choosing the best possible option available', 'Relating to vision or eyesight', 'Functioning at maximum possible capacity'], difficulty: 'beginner', category: 'general' },
    { word: 'Bold', definition: 'Showing a willingness to take risks; confident and courageous', wrongDefinitions: ['Written in a heavier typeface for emphasis', 'Cold and indifferent toward others', 'Old and outdated in style or approach'], difficulty: 'beginner', category: 'general' },
  ];

  // ---- Sentence Fill bank ----
  // Player sees sentence + 4 options, must SAY the correct word
  const SENTENCE_BANK = [
    { sentence: 'The report was _____ and got straight to the point without any filler.', correctWord: 'concise', distractors: ['brief', 'short', 'small'] },
    { sentence: 'Her feedback was very _____ to the topic we were discussing.', correctWord: 'relevant', distractors: ['related', 'important', 'useful'] },
    { sentence: 'The budget they gave us was _____ for what we needed to complete the project.', correctWord: 'adequate', distractors: ['enough', 'plenty', 'decent'] },
    { sentence: 'We need a more _____ approach instead of just hoping things work out.', correctWord: 'pragmatic', distractors: ['practical', 'realistic', 'logical'] },
    { sentence: 'The evidence she presented was extremely _____ and hard to argue against.', correctWord: 'compelling', distractors: ['strong', 'convincing', 'powerful'] },
    { sentence: 'His instructions were so _____ that nobody had any confusion about what to do.', correctWord: 'explicit', distractors: ['clear', 'obvious', 'simple'] },
    { sentence: 'The new policy had a _____ effect on employee morale across departments.', correctWord: 'detrimental', distractors: ['harmful', 'negative', 'damaging'] },
    { sentence: 'She was _____ in her research, checking every source twice.', correctWord: 'meticulous', distractors: ['careful', 'thorough', 'precise'] },
    { sentence: 'The CEO gave a _____ speech that moved the entire audience.', correctWord: 'eloquent', distractors: ['beautiful', 'powerful', 'moving'] },
    { sentence: 'The wording of the contract was deliberately _____, leaving room for interpretation.', correctWord: 'ambiguous', distractors: ['vague', 'unclear', 'confusing'] },
    { sentence: 'Despite repeated setbacks, the team remained _____ and bounced back every time.', correctWord: 'resilient', distractors: ['strong', 'tough', 'determined'] },
    { sentence: 'The success of this project is _____ on getting approval from the board first.', correctWord: 'contingent', distractors: ['dependent', 'reliant', 'based'] },
    { sentence: 'The quiet library environment is very _____ to focused study.', correctWord: 'conducive', distractors: ['helpful', 'good', 'suitable'] },
    { sentence: 'We saw _____ growth in revenue compared to last quarter.', correctWord: 'substantial', distractors: ['big', 'large', 'major'] },
    { sentence: 'His _____ work ethic is the main reason he got promoted so quickly.', correctWord: 'diligent', distractors: ['hard', 'strong', 'dedicated'] },
    { sentence: 'The plan is _____ if we can secure the funding by next month.', correctWord: 'feasible', distractors: ['possible', 'doable', 'achievable'] },
    { sentence: 'She offered a _____ perspective that changed how we viewed the whole problem.', correctWord: 'profound', distractors: ['deep', 'interesting', 'unique'] },
    { sentence: 'Misinformation on social media has become increasingly _____ in recent years.', correctWord: 'prevalent', distractors: ['common', 'widespread', 'frequent'] },
    { sentence: 'The manager tried to _____ the conflict between the two departments.', correctWord: 'mitigate', distractors: ['reduce', 'solve', 'handle'] },
    { sentence: 'After the scandal, the company had to _____ its damaged public image.', correctWord: 'restore', distractors: ['fix', 'rebuild', 'repair'] },
    { sentence: 'The data shows a clear _____ between the two sets of numbers.', correctWord: 'discrepancy', distractors: ['difference', 'gap', 'mismatch'] },
    { sentence: 'It would be _____ to invest everything in a single stock.', correctWord: 'imprudent', distractors: ['stupid', 'risky', 'dangerous'] },
    { sentence: 'The new software will _____ collaboration between remote teams.', correctWord: 'facilitate', distractors: ['improve', 'help', 'enable'] },
    { sentence: 'He remained _____ about the project even when others lost faith.', correctWord: 'optimistic', distractors: ['hopeful', 'positive', 'confident'] },
    { sentence: 'The results were _____ evidence that the new method actually works.', correctWord: 'tangible', distractors: ['solid', 'real', 'clear'] },
    { sentence: 'Her _____ nature means she can handle any role the company needs.', correctWord: 'versatile', distractors: ['flexible', 'adaptable', 'capable'] },
    { sentence: 'The committee reached a _____ decision after three hours of debate.', correctWord: 'unanimous', distractors: ['final', 'complete', 'joint'] },
    { sentence: 'Trying to change his mind at this point would be _____.', correctWord: 'futile', distractors: ['useless', 'pointless', 'wasteful'] },
    { sentence: 'The judge must remain _____ throughout the entire trial.', correctWord: 'impartial', distractors: ['fair', 'neutral', 'balanced'] },
    { sentence: 'The changes she proposed were _____ but could transform the company.', correctWord: 'bold', distractors: ['brave', 'daring', 'risky'] },
  ];

  // ---- Recall Challenge bank ----
  // Player sees only a definition, must SAY the word
  // Using the DEFINITION_BANK words - just need word + definition
  // (We reuse DEFINITION_BANK for this mode)

  // ---- Word Upgrade bank ----
  // Common word -> say a more elevated synonym
  const UPGRADE_BANK = [
    { commonWord: 'enough', acceptedUpgrades: ['sufficient', 'adequate', 'ample'] },
    { commonWord: 'important', acceptedUpgrades: ['significant', 'crucial', 'essential', 'vital', 'paramount', 'pivotal'] },
    { commonWord: 'big', acceptedUpgrades: ['substantial', 'considerable', 'significant', 'immense'] },
    { commonWord: 'small', acceptedUpgrades: ['minimal', 'negligible', 'marginal', 'trivial', 'modest'] },
    { commonWord: 'good', acceptedUpgrades: ['excellent', 'exceptional', 'superb', 'commendable', 'exemplary', 'outstanding'] },
    { commonWord: 'bad', acceptedUpgrades: ['detrimental', 'adverse', 'harmful', 'unfavorable', 'deplorable'] },
    { commonWord: 'clear', acceptedUpgrades: ['explicit', 'lucid', 'coherent', 'transparent', 'unambiguous'] },
    { commonWord: 'confusing', acceptedUpgrades: ['ambiguous', 'perplexing', 'convoluted', 'bewildering'] },
    { commonWord: 'careful', acceptedUpgrades: ['meticulous', 'diligent', 'thorough', 'prudent', 'scrupulous'] },
    { commonWord: 'useful', acceptedUpgrades: ['beneficial', 'advantageous', 'valuable', 'instrumental'] },
    { commonWord: 'hard', acceptedUpgrades: ['arduous', 'strenuous', 'formidable', 'demanding', 'rigorous'] },
    { commonWord: 'easy', acceptedUpgrades: ['effortless', 'straightforward', 'feasible', 'manageable'] },
    { commonWord: 'fast', acceptedUpgrades: ['expeditious', 'swift', 'rapid', 'prompt'] },
    { commonWord: 'slow', acceptedUpgrades: ['sluggish', 'lethargic', 'gradual', 'deliberate'] },
    { commonWord: 'angry', acceptedUpgrades: ['furious', 'irate', 'indignant', 'livid', 'incensed'] },
    { commonWord: 'happy', acceptedUpgrades: ['elated', 'jubilant', 'ecstatic', 'euphoric', 'delighted'] },
    { commonWord: 'sad', acceptedUpgrades: ['melancholy', 'somber', 'despondent', 'dismal', 'gloomy'] },
    { commonWord: 'old', acceptedUpgrades: ['antiquated', 'obsolete', 'archaic', 'outdated'] },
    { commonWord: 'new', acceptedUpgrades: ['novel', 'innovative', 'contemporary', 'cutting-edge', 'unprecedented'] },
    { commonWord: 'smart', acceptedUpgrades: ['astute', 'shrewd', 'perceptive', 'discerning', 'insightful'] },
    { commonWord: 'strong', acceptedUpgrades: ['robust', 'resilient', 'formidable', 'tenacious'] },
    { commonWord: 'weak', acceptedUpgrades: ['fragile', 'vulnerable', 'feeble', 'precarious'] },
    { commonWord: 'likely', acceptedUpgrades: ['probable', 'plausible', 'feasible', 'conceivable'] },
    { commonWord: 'unlikely', acceptedUpgrades: ['improbable', 'implausible', 'dubious', 'remote'] },
    { commonWord: 'normal', acceptedUpgrades: ['conventional', 'typical', 'standard', 'customary', 'mundane'] },
    { commonWord: 'strange', acceptedUpgrades: ['peculiar', 'anomalous', 'unconventional', 'irregular'] },
    { commonWord: 'rich', acceptedUpgrades: ['affluent', 'prosperous', 'opulent', 'abundant'] },
    { commonWord: 'poor', acceptedUpgrades: ['impoverished', 'destitute', 'meager', 'scarce'] },
    { commonWord: 'short', acceptedUpgrades: ['concise', 'brief', 'succinct', 'compact'] },
    { commonWord: 'boring', acceptedUpgrades: ['mundane', 'monotonous', 'tedious', 'stale'] },
  ];

  // ---- Cache & state ----
  let cachedWords = [];
  let usedIndices = new Set();
  let usedSentenceIndices = new Set();
  let usedUpgradeIndices = new Set();

  // ---- Groq API integration ----
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  async function _fetchFromGroq(difficulty, category, count) {
    const apiKey = RR.Storage.get('apiKey');
    if (!apiKey) return null;

    const prompt = `Generate ${count} vocabulary words for a word recall practice game. 
Requirements:
- Difficulty level: ${difficulty}
- Category: ${category}
- Each word should be a moderately complex English word (like "relevant", "adequate", "concise", "pragmatic") - NOT overly obscure
- Return ONLY valid JSON array, no markdown or explanation

Format each word as:
{"word": "Pragmatic", "definition": "dealing with things sensibly and realistically", "wrongDefinitions": ["following strict rules without exception", "expressing emotions openly and freely", "acting without thinking about consequences"], "example": "We need a pragmatic approach to solve this budget issue."}

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

      let jsonStr = content;
      if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
      }

      const words = JSON.parse(jsonStr);
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

    const aiWords = await _fetchFromGroq(difficulty, category, count);
    if (aiWords && aiWords.length > 0) {
      cachedWords = aiWords;
      usedIndices.clear();
      RR.Storage.set('cachedVocabulary', aiWords);
      return aiWords;
    }

    const stored = RR.Storage.get('cachedVocabulary');
    if (stored && stored.length > 0) {
      cachedWords = stored;
      usedIndices.clear();
      return stored;
    }

    cachedWords = _filterDefinitionBank(difficulty, category);
    usedIndices.clear();
    return cachedWords;
  }

  function _filterDefinitionBank(difficulty, category) {
    let words = [...DEFINITION_BANK];

    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const idx = levels.indexOf(difficulty);
    if (idx >= 0) {
      const allowed = levels.slice(Math.max(0, idx - 1), idx + 2);
      words = words.filter(w => allowed.includes(w.difficulty));
    }

    if (category && category !== 'general') {
      words = words.filter(w => w.category === category || w.category === 'general');
    }

    return _shuffle(words);
  }

  function getNextWord() {
    if (cachedWords.length === 0) {
      cachedWords = _shuffle([...DEFINITION_BANK]);
    }

    if (usedIndices.size >= cachedWords.length) {
      usedIndices.clear();
    }

    let idx;
    do {
      idx = Math.floor(Math.random() * cachedWords.length);
    } while (usedIndices.has(idx) && usedIndices.size < cachedWords.length);

    usedIndices.add(idx);
    return cachedWords[idx];
  }

  // ---- Definition Match helpers ----
  function getDefinitionChallenge() {
    // Returns a random word with its correct definition + 3 wrong ones, shuffled
    const bank = DEFINITION_BANK;
    if (usedIndices.size >= bank.length) usedIndices.clear();

    let idx;
    do {
      idx = Math.floor(Math.random() * bank.length);
    } while (usedIndices.has(idx) && usedIndices.size < bank.length);
    usedIndices.add(idx);

    const entry = bank[idx];
    const options = _shuffle([
      { text: entry.definition, correct: true },
      { text: entry.wrongDefinitions[0], correct: false },
      { text: entry.wrongDefinitions[1], correct: false },
      { text: entry.wrongDefinitions[2], correct: false },
    ]);

    return {
      word: entry.word,
      options: options,
      correctDefinition: entry.definition,
    };
  }

  // ---- Sentence Fill helpers ----
  function getSentenceChallenge() {
    const bank = SENTENCE_BANK;
    if (usedSentenceIndices.size >= bank.length) usedSentenceIndices.clear();

    let idx;
    do {
      idx = Math.floor(Math.random() * bank.length);
    } while (usedSentenceIndices.has(idx) && usedSentenceIndices.size < bank.length);
    usedSentenceIndices.add(idx);

    const entry = bank[idx];
    const options = _shuffle([entry.correctWord, ...entry.distractors]);

    return {
      sentence: entry.sentence,
      correctWord: entry.correctWord,
      options: options,
    };
  }

  // ---- Recall Challenge helpers ----
  function getRecallChallenge() {
    // Pick a random word from DEFINITION_BANK, return just the definition
    const bank = DEFINITION_BANK;
    const idx = Math.floor(Math.random() * bank.length);
    return {
      word: bank[idx].word,
      definition: bank[idx].definition,
    };
  }

  // ---- Word Upgrade helpers ----
  function getUpgradeChallenge() {
    const bank = UPGRADE_BANK;
    if (usedUpgradeIndices.size >= bank.length) usedUpgradeIndices.clear();

    let idx;
    do {
      idx = Math.floor(Math.random() * bank.length);
    } while (usedUpgradeIndices.has(idx) && usedUpgradeIndices.size < bank.length);
    usedUpgradeIndices.add(idx);

    return bank[idx];
  }

  function resetUsedIndices() {
    usedIndices.clear();
    usedSentenceIndices.clear();
    usedUpgradeIndices.clear();
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
    getDefinitionChallenge,
    getSentenceChallenge,
    getRecallChallenge,
    getUpgradeChallenge,
    resetUsedIndices,
    DEFINITION_BANK,
  };
})();
