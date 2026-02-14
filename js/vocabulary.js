/* ================================================
   Vocabulary Module - Word banks for all game modes
   Difficulty 1-5 system across all banks
   ================================================ */
window.RR = window.RR || {};

RR.Vocabulary = (function () {

  // ---- Timer map: difficulty -> seconds ----
  const TIMER_MAP = { 1: 20, 2: 15, 3: 10, 4: 7, 5: 5 };

  function getTimerForDifficulty(level) {
    return TIMER_MAP[level] || TIMER_MAP[3];
  }

  // ---- Definition Match word bank ----
  // difficulty: 1 = easiest / most common, 5 = hardest / most obscure
  const DEFINITION_BANK = [
    // --- Difficulty 1 ---
    { word: 'Bold', definition: 'Showing a willingness to take risks; confident and courageous', wrongDefinitions: ['Written in a heavier typeface for emphasis', 'Cold and indifferent toward others', 'Old and outdated in style or approach'], difficulty: 1, category: 'general' },
    { word: 'Relevant', definition: 'Closely connected or appropriate to the matter at hand', wrongDefinitions: ['Required by law or regulation', 'Repeated multiple times for emphasis', 'Resistant to change or influence'], difficulty: 1, category: 'general' },
    { word: 'Adequate', definition: 'Sufficient for a specific need or requirement', wrongDefinitions: ['Perfectly executed without any flaws', 'Adjusted to fit new circumstances', 'Admired by a large group of people'], difficulty: 1, category: 'general' },
    { word: 'Concise', definition: 'Giving a lot of information clearly in few words', wrongDefinitions: ['Agreeing with someone reluctantly', 'Happening at the same time as something else', 'Certain about something without any doubt'], difficulty: 1, category: 'general' },
    { word: 'Diligent', definition: 'Showing careful and persistent effort in work', wrongDefinitions: ['Willing to share with others generously', 'Having a natural talent for something', 'Speaking in a direct and honest manner'], difficulty: 1, category: 'general' },
    { word: 'Versatile', definition: 'Able to adapt to many different functions or activities', wrongDefinitions: ['Speaking in a poetic or rhythmic way', 'Arranged in a vertical or upright position', 'Competing against others for dominance'], difficulty: 1, category: 'general' },
    { word: 'Optimistic', definition: 'Hopeful and confident about the future or success', wrongDefinitions: ['Choosing the best possible option available', 'Relating to vision or eyesight', 'Functioning at maximum possible capacity'], difficulty: 1, category: 'general' },
    { word: 'Credible', definition: 'Able to be believed; convincing and trustworthy', wrongDefinitions: ['Deserving praise for an achievement', 'Able to be bent without breaking', 'Likely to cause harm or injury'], difficulty: 1, category: 'general' },
    { word: 'Trivial', definition: 'Of little value or importance; insignificant', wrongDefinitions: ['Having exactly three components', 'Relating to ancient civilizations', 'Happening every three years'], difficulty: 1, category: 'general' },
    { word: 'Restore', definition: 'Return something to a former condition or position', wrongDefinitions: ['Keep something in its current state', 'Store items away for future use', 'Restrict access to a limited group'], difficulty: 1, category: 'general' },
    { word: 'Hinder', definition: 'Create difficulties that delay or prevent progress', wrongDefinitions: ['Stay behind someone to offer support', 'Look back at past events with fondness', 'Connect two separate things together'], difficulty: 1, category: 'general' },
    { word: 'Elaborate', definition: 'Involving many carefully arranged parts; detailed', wrongDefinitions: ['Arriving late to an important event', 'Working independently without help', 'Choosing the simplest available option'], difficulty: 1, category: 'general' },

    // --- Difficulty 2 ---
    { word: 'Pragmatic', definition: 'Dealing with things sensibly and realistically', wrongDefinitions: ['Following strict rules without exception', 'Expressing emotions openly and freely', 'Acting without thinking about consequences'], difficulty: 2, category: 'general' },
    { word: 'Substantial', definition: 'Of considerable importance, size, or worth', wrongDefinitions: ['Easily broken or damaged by force', 'Located beneath the surface of something', 'Substituted in place of the original'], difficulty: 2, category: 'business' },
    { word: 'Comprehensive', definition: 'Including all or nearly all elements or aspects', wrongDefinitions: ['Easy to understand at first glance', 'Feeling sympathy for another person', 'Forced to comply against your will'], difficulty: 2, category: 'academic' },
    { word: 'Facilitate', definition: 'Make an action or process easier', wrongDefinitions: ['Create something entirely from scratch', 'Pretend to have a quality you lack', 'Break something into smaller parts'], difficulty: 2, category: 'business' },
    { word: 'Resilient', definition: 'Able to recover quickly from difficulties', wrongDefinitions: ['Unwilling to change your opinion', 'Resistant to any kind of authority', 'Living in a remote rural area'], difficulty: 2, category: 'general' },
    { word: 'Meticulous', definition: 'Showing great attention to detail; very careful', wrongDefinitions: ['Happening in a very dramatic fashion', 'Relating to metals or metal work', 'Extremely fast and efficient'], difficulty: 2, category: 'general' },
    { word: 'Articulate', definition: 'Expressing oneself clearly and effectively', wrongDefinitions: ['Having joints that move freely', 'Creating visual art professionally', 'Joining separate pieces together'], difficulty: 2, category: 'general' },
    { word: 'Inevitable', definition: 'Certain to happen; unavoidable', wrongDefinitions: ['Invisible to the naked eye', 'Not able to be invented or created', 'Happening inside a closed space'], difficulty: 2, category: 'general' },
    { word: 'Mundane', definition: 'Lacking interest or excitement; dull and ordinary', wrongDefinitions: ['Relating to the entire world', 'Clean and free from bacteria', 'Happening once every month'], difficulty: 2, category: 'general' },
    { word: 'Redundant', definition: 'No longer needed or useful; unnecessarily repetitive', wrongDefinitions: ['Extremely abundant and overflowing', 'Painted a deep shade of red', 'Returned to a previous condition'], difficulty: 2, category: 'business' },

    // --- Difficulty 3 ---
    { word: 'Ambiguous', definition: 'Open to more than one interpretation; unclear', wrongDefinitions: ['Extremely large in size or scope', 'Having strong desires to achieve success', 'Willing to take bold risks'], difficulty: 3, category: 'general' },
    { word: 'Profound', definition: 'Very great or intense; having deep meaning', wrongDefinitions: ['Existing in large quantities', 'Found only in professional settings', 'Proving something to be correct'], difficulty: 3, category: 'academic' },
    { word: 'Feasible', definition: 'Possible and practical to do or achieve', wrongDefinitions: ['Easy to celebrate or enjoy', 'Capable of being seen from far away', 'Likely to cause a festive mood'], difficulty: 3, category: 'business' },
    { word: 'Prevalent', definition: 'Widespread in a particular area or at a particular time', wrongDefinitions: ['Happening before the expected time', 'Having the ability to prevent harm', 'Valued more highly than everything else'], difficulty: 3, category: 'general' },
    { word: 'Conducive', definition: 'Making a certain situation or outcome likely', wrongDefinitions: ['Leading a group with authority', 'Transferring electricity or heat', 'Behaving in a polite and proper way'], difficulty: 3, category: 'general' },
    { word: 'Prudent', definition: 'Acting with care and thought for the future', wrongDefinitions: ['Feeling proud of your accomplishments', 'Being overly strict with others', 'Showing off wealth or status'], difficulty: 3, category: 'business' },
    { word: 'Subtle', definition: 'So delicate or precise as to be difficult to notice', wrongDefinitions: ['Located directly below something', 'Appearing only at certain times', 'Changed into a different form'], difficulty: 3, category: 'general' },
    { word: 'Scrutinize', definition: 'Examine or inspect closely and thoroughly', wrongDefinitions: ['Clean something until it shines', 'Write in very small handwriting', 'Criticize someone harshly in public'], difficulty: 3, category: 'general' },
    { word: 'Contemplate', definition: 'Look at thoughtfully; think about deeply', wrongDefinitions: ['Show strong disapproval of something', 'Argue against a popular belief', 'Arrive at the same time as others'], difficulty: 3, category: 'general' },
    { word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', wrongDefinitions: ['Extremely elegant in appearance', 'Silent and unwilling to communicate', 'Referring to a specific historical period'], difficulty: 3, category: 'general' },
    { word: 'Mitigate', definition: 'Make something less severe or serious', wrongDefinitions: ['Move from one place to another', 'Copy or imitate someone exactly', 'Combine two things into one'], difficulty: 3, category: 'business' },
    { word: 'Exemplary', definition: 'Serving as a desirable model; very good', wrongDefinitions: ['Free from any rules or restrictions', 'Given as a sample without charge', 'Required to complete a test or exam'], difficulty: 3, category: 'general' },
    { word: 'Plausible', definition: 'Seeming reasonable or probable; believable', wrongDefinitions: ['Deserving of applause and recognition', 'Flexible enough to be shaped easily', 'Likely to cause pleasure or delight'], difficulty: 3, category: 'general' },

    // --- Difficulty 4 ---
    { word: 'Inherent', definition: 'Existing as a natural or permanent quality of something', wrongDefinitions: ['Received through a legal will or inheritance', 'Hidden from view or kept secret', 'Placed inside a container for storage'], difficulty: 4, category: 'academic' },
    { word: 'Tangible', definition: 'Clear and definite; real enough to be perceived', wrongDefinitions: ['Easily tangled or twisted together', 'Capable of being argued or debated', 'Related to taste or flavor'], difficulty: 4, category: 'business' },
    { word: 'Coherent', definition: 'Logical and consistent; easy to follow', wrongDefinitions: ['Sticking together physically', 'Working together as equal partners', 'Following the latest trends'], difficulty: 4, category: 'academic' },
    { word: 'Lucid', definition: 'Expressed clearly; easy to understand', wrongDefinitions: ['Giving off a faint glow of light', 'Extremely fortunate or lucky', 'Happening during sleep or rest'], difficulty: 4, category: 'academic' },
    { word: 'Discrepancy', definition: 'A difference between things that should be the same', wrongDefinitions: ['A lack of respect for authority', 'A feeling of sadness or loss', 'A secret plan to cause harm'], difficulty: 4, category: 'business' },
    { word: 'Impartial', definition: 'Treating all rivals or sides equally; fair', wrongDefinitions: ['Not complete; missing some parts', 'Unable to be divided into parts', 'Having no particular interest in anything'], difficulty: 4, category: 'general' },
    { word: 'Precarious', definition: 'Not securely held; dangerously likely to fall or fail', wrongDefinitions: ['Extremely valuable and worth protecting', 'Coming before something in time', 'Done with great care and precision'], difficulty: 4, category: 'general' },
    { word: 'Superficial', definition: 'Existing or occurring at the surface; lacking depth', wrongDefinitions: ['Better than everything else; supreme', 'Having supernatural or magical powers', 'Extremely well organized and efficient'], difficulty: 4, category: 'general' },
    { word: 'Complacent', definition: 'Smugly satisfied with oneself; uncritically content', wrongDefinitions: ['Willing to follow orders without question', 'Expressing a formal complaint officially', 'Feeling grateful for what you have'], difficulty: 4, category: 'general' },
    { word: 'Detrimental', definition: 'Tending to cause harm; damaging', wrongDefinitions: ['Helping to determine the final outcome', 'Firmly committed to a specific goal', 'Easily identified or recognized'], difficulty: 4, category: 'general' },
    { word: 'Tenacious', definition: 'Holding firmly to something; persistent and determined', wrongDefinitions: ['Living in rented accommodation', 'Easily stretched without breaking', 'Having a gentle and quiet nature'], difficulty: 4, category: 'general' },
    { word: 'Nominal', definition: 'Existing in name only; very small or token', wrongDefinitions: ['Following all expected social norms', 'Being the most popular choice', 'Selected by voting or nomination'], difficulty: 4, category: 'business' },

    // --- Difficulty 5 ---
    { word: 'Sporadic', definition: 'Occurring at irregular intervals; not constant', wrongDefinitions: ['Related to athletics or physical exercise', 'Happening in a dramatic and sudden way', 'Spread evenly across a large area'], difficulty: 5, category: 'general' },
    { word: 'Futile', definition: 'Incapable of producing any useful result; pointless', wrongDefinitions: ['Full of energy and enthusiasm', 'Relating to events in the future', 'Extremely small in size or amount'], difficulty: 5, category: 'general' },
    { word: 'Obsolete', definition: 'No longer produced or used; out of date', wrongDefinitions: ['Extremely large and difficult to move', 'Following all requirements precisely', 'Happening without any warning'], difficulty: 5, category: 'general' },
    { word: 'Unanimous', definition: 'Fully in agreement; with everyone consenting', wrongDefinitions: ['Done without revealing your identity', 'Happening only one time ever', 'Related to a single universe or world'], difficulty: 5, category: 'general' },
    { word: 'Volatile', definition: 'Liable to change rapidly and unpredictably', wrongDefinitions: ['Relating to electrical voltage', 'Done by free will and choice', 'Large enough to fill a whole volume'], difficulty: 5, category: 'business' },
    { word: 'Arbitrary', definition: 'Based on random choice rather than reason', wrongDefinitions: ['Relating to trees and woodland areas', 'Serving as a judge or mediator', 'Following a strict alphabetical order'], difficulty: 5, category: 'general' },
    { word: 'Compelling', definition: 'Evoking interest or attention in a powerfully irresistible way', wrongDefinitions: ['Forcing someone to act against their will', 'Gathering items into a single collection', 'Competing fiercely with a close rival'], difficulty: 5, category: 'general' },
    { word: 'Explicit', definition: 'Stated clearly and in detail, leaving no room for doubt', wrongDefinitions: ['Happening without any prior planning', 'Excluded from a group or activity', 'Extremely complicated and hard to follow'], difficulty: 5, category: 'general' },
    { word: 'Contingent', definition: 'Dependent on certain circumstances or conditions', wrongDefinitions: ['Touching or sharing a common border', 'Continuing without any interruption', 'Satisfied with current conditions'], difficulty: 5, category: 'business' },
    { word: 'Imprudent', definition: 'Not showing care for the consequences of an action; rash', wrongDefinitions: ['Extremely patient and slow to act', 'Unable to be improved or enhanced', 'Lacking any sense of pride or dignity'], difficulty: 5, category: 'general' },
  ];

  // ---- Sentence Fill bank ----
  // Player sees sentence + 4 options, must SAY the correct word
  const SENTENCE_BANK = [
    // --- Difficulty 1 ---
    { sentence: 'The report was _____ and got straight to the point without any filler.', correctWord: 'concise', distractors: ['brief', 'short', 'small'], difficulty: 1 },
    { sentence: 'Her feedback was very _____ to the topic we were discussing.', correctWord: 'relevant', distractors: ['related', 'important', 'useful'], difficulty: 1 },
    { sentence: 'The budget they gave us was _____ for what we needed to complete the project.', correctWord: 'adequate', distractors: ['enough', 'plenty', 'decent'], difficulty: 1 },
    { sentence: 'She was _____ in her research, checking every source twice.', correctWord: 'meticulous', distractors: ['careful', 'thorough', 'precise'], difficulty: 1 },
    { sentence: 'He remained _____ about the project even when others lost faith.', correctWord: 'optimistic', distractors: ['hopeful', 'positive', 'confident'], difficulty: 1 },
    { sentence: 'The changes she proposed were _____ but could transform the company.', correctWord: 'bold', distractors: ['brave', 'daring', 'risky'], difficulty: 1 },

    // --- Difficulty 2 ---
    { sentence: 'We need a more _____ approach instead of just hoping things work out.', correctWord: 'pragmatic', distractors: ['practical', 'realistic', 'logical'], difficulty: 2 },
    { sentence: 'His _____ work ethic is the main reason he got promoted so quickly.', correctWord: 'diligent', distractors: ['hard', 'strong', 'dedicated'], difficulty: 2 },
    { sentence: 'Despite repeated setbacks, the team remained _____ and bounced back every time.', correctWord: 'resilient', distractors: ['strong', 'tough', 'determined'], difficulty: 2 },
    { sentence: 'We saw _____ growth in revenue compared to last quarter.', correctWord: 'substantial', distractors: ['big', 'large', 'major'], difficulty: 2 },
    { sentence: 'Her _____ nature means she can handle any role the company needs.', correctWord: 'versatile', distractors: ['flexible', 'adaptable', 'capable'], difficulty: 2 },
    { sentence: 'After the scandal, the company had to _____ its damaged public image.', correctWord: 'restore', distractors: ['fix', 'rebuild', 'repair'], difficulty: 2 },

    // --- Difficulty 3 ---
    { sentence: 'The evidence she presented was extremely _____ and hard to argue against.', correctWord: 'compelling', distractors: ['strong', 'convincing', 'powerful'], difficulty: 3 },
    { sentence: 'The wording of the contract was deliberately _____, leaving room for interpretation.', correctWord: 'ambiguous', distractors: ['vague', 'unclear', 'confusing'], difficulty: 3 },
    { sentence: 'The CEO gave a _____ speech that moved the entire audience.', correctWord: 'eloquent', distractors: ['beautiful', 'powerful', 'moving'], difficulty: 3 },
    { sentence: 'She offered a _____ perspective that changed how we viewed the whole problem.', correctWord: 'profound', distractors: ['deep', 'interesting', 'unique'], difficulty: 3 },
    { sentence: 'Misinformation on social media has become increasingly _____ in recent years.', correctWord: 'prevalent', distractors: ['common', 'widespread', 'frequent'], difficulty: 3 },
    { sentence: 'The plan is _____ if we can secure the funding by next month.', correctWord: 'feasible', distractors: ['possible', 'doable', 'achievable'], difficulty: 3 },

    // --- Difficulty 4 ---
    { sentence: 'His instructions were so _____ that nobody had any confusion about what to do.', correctWord: 'explicit', distractors: ['clear', 'obvious', 'simple'], difficulty: 4 },
    { sentence: 'The new policy had a _____ effect on employee morale across departments.', correctWord: 'detrimental', distractors: ['harmful', 'negative', 'damaging'], difficulty: 4 },
    { sentence: 'The success of this project is _____ on getting approval from the board first.', correctWord: 'contingent', distractors: ['dependent', 'reliant', 'based'], difficulty: 4 },
    { sentence: 'The quiet library environment is very _____ to focused study.', correctWord: 'conducive', distractors: ['helpful', 'good', 'suitable'], difficulty: 4 },
    { sentence: 'The manager tried to _____ the conflict between the two departments.', correctWord: 'mitigate', distractors: ['reduce', 'solve', 'handle'], difficulty: 4 },
    { sentence: 'The data shows a clear _____ between the two sets of numbers.', correctWord: 'discrepancy', distractors: ['difference', 'gap', 'mismatch'], difficulty: 4 },

    // --- Difficulty 5 ---
    { sentence: 'The new software will _____ collaboration between remote teams.', correctWord: 'facilitate', distractors: ['improve', 'help', 'enable'], difficulty: 5 },
    { sentence: 'It would be _____ to invest everything in a single stock.', correctWord: 'imprudent', distractors: ['stupid', 'risky', 'dangerous'], difficulty: 5 },
    { sentence: 'The results were _____ evidence that the new method actually works.', correctWord: 'tangible', distractors: ['solid', 'real', 'clear'], difficulty: 5 },
    { sentence: 'The committee reached a _____ decision after three hours of debate.', correctWord: 'unanimous', distractors: ['final', 'complete', 'joint'], difficulty: 5 },
    { sentence: 'Trying to change his mind at this point would be _____.', correctWord: 'futile', distractors: ['useless', 'pointless', 'wasteful'], difficulty: 5 },
    { sentence: 'The judge must remain _____ throughout the entire trial.', correctWord: 'impartial', distractors: ['fair', 'neutral', 'balanced'], difficulty: 5 },
  ];

  // ---- Word Upgrade bank ----
  // Common word -> say a more elevated synonym
  const UPGRADE_BANK = [
    // --- Difficulty 1 (very common words, easy synonyms) ---
    { commonWord: 'big', acceptedUpgrades: ['substantial', 'considerable', 'significant', 'immense'], difficulty: 1 },
    { commonWord: 'small', acceptedUpgrades: ['minimal', 'negligible', 'marginal', 'trivial', 'modest'], difficulty: 1 },
    { commonWord: 'good', acceptedUpgrades: ['excellent', 'exceptional', 'superb', 'commendable', 'exemplary', 'outstanding'], difficulty: 1 },
    { commonWord: 'bad', acceptedUpgrades: ['detrimental', 'adverse', 'harmful', 'unfavorable', 'deplorable'], difficulty: 1 },
    { commonWord: 'happy', acceptedUpgrades: ['elated', 'jubilant', 'ecstatic', 'euphoric', 'delighted'], difficulty: 1 },
    { commonWord: 'sad', acceptedUpgrades: ['melancholy', 'somber', 'despondent', 'dismal', 'gloomy'], difficulty: 1 },

    // --- Difficulty 2 ---
    { commonWord: 'enough', acceptedUpgrades: ['sufficient', 'adequate', 'ample'], difficulty: 2 },
    { commonWord: 'important', acceptedUpgrades: ['significant', 'crucial', 'essential', 'vital', 'paramount', 'pivotal'], difficulty: 2 },
    { commonWord: 'fast', acceptedUpgrades: ['expeditious', 'swift', 'rapid', 'prompt'], difficulty: 2 },
    { commonWord: 'slow', acceptedUpgrades: ['sluggish', 'lethargic', 'gradual', 'deliberate'], difficulty: 2 },
    { commonWord: 'angry', acceptedUpgrades: ['furious', 'irate', 'indignant', 'livid', 'incensed'], difficulty: 2 },
    { commonWord: 'new', acceptedUpgrades: ['novel', 'innovative', 'contemporary', 'cutting-edge', 'unprecedented'], difficulty: 2 },

    // --- Difficulty 3 ---
    { commonWord: 'clear', acceptedUpgrades: ['explicit', 'lucid', 'coherent', 'transparent', 'unambiguous'], difficulty: 3 },
    { commonWord: 'confusing', acceptedUpgrades: ['ambiguous', 'perplexing', 'convoluted', 'bewildering'], difficulty: 3 },
    { commonWord: 'careful', acceptedUpgrades: ['meticulous', 'diligent', 'thorough', 'prudent', 'scrupulous'], difficulty: 3 },
    { commonWord: 'useful', acceptedUpgrades: ['beneficial', 'advantageous', 'valuable', 'instrumental'], difficulty: 3 },
    { commonWord: 'hard', acceptedUpgrades: ['arduous', 'strenuous', 'formidable', 'demanding', 'rigorous'], difficulty: 3 },
    { commonWord: 'easy', acceptedUpgrades: ['effortless', 'straightforward', 'feasible', 'manageable'], difficulty: 3 },

    // --- Difficulty 4 ---
    { commonWord: 'old', acceptedUpgrades: ['antiquated', 'obsolete', 'archaic', 'outdated'], difficulty: 4 },
    { commonWord: 'smart', acceptedUpgrades: ['astute', 'shrewd', 'perceptive', 'discerning', 'insightful'], difficulty: 4 },
    { commonWord: 'strong', acceptedUpgrades: ['robust', 'resilient', 'formidable', 'tenacious'], difficulty: 4 },
    { commonWord: 'weak', acceptedUpgrades: ['fragile', 'vulnerable', 'feeble', 'precarious'], difficulty: 4 },
    { commonWord: 'likely', acceptedUpgrades: ['probable', 'plausible', 'feasible', 'conceivable'], difficulty: 4 },
    { commonWord: 'unlikely', acceptedUpgrades: ['improbable', 'implausible', 'dubious', 'remote'], difficulty: 4 },

    // --- Difficulty 5 ---
    { commonWord: 'normal', acceptedUpgrades: ['conventional', 'typical', 'standard', 'customary', 'mundane'], difficulty: 5 },
    { commonWord: 'strange', acceptedUpgrades: ['peculiar', 'anomalous', 'unconventional', 'irregular'], difficulty: 5 },
    { commonWord: 'rich', acceptedUpgrades: ['affluent', 'prosperous', 'opulent', 'abundant'], difficulty: 5 },
    { commonWord: 'poor', acceptedUpgrades: ['impoverished', 'destitute', 'meager', 'scarce'], difficulty: 5 },
    { commonWord: 'short', acceptedUpgrades: ['concise', 'brief', 'succinct', 'compact'], difficulty: 5 },
    { commonWord: 'boring', acceptedUpgrades: ['mundane', 'monotonous', 'tedious', 'stale'], difficulty: 5 },
  ];

  // ---- Cache & state ----
  let cachedWords = [];
  let usedIndices = new Set();
  let usedSentenceIndices = new Set();
  let usedUpgradeIndices = new Set();

  // ---- Difficulty filtering helper ----
  // Returns entries whose difficulty is within a window around the chosen level
  function _filterByDifficulty(bank, level) {
    level = Math.max(1, Math.min(5, level || 3));
    const lo = Math.max(1, level - 1);
    const hi = Math.min(5, level + 1);
    let filtered = bank.filter(w => w.difficulty >= lo && w.difficulty <= hi);
    // If pool is too small (< 4), widen to full bank
    if (filtered.length < 4) filtered = [...bank];
    return filtered;
  }

  // ---- Groq API integration ----
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  const DIFFICULTY_LABELS = {
    1: 'very common everyday words (like "big", "good", "clear")',
    2: 'common but slightly elevated words (like "resilient", "pragmatic", "substantial")',
    3: 'intermediate vocabulary words (like "ambiguous", "eloquent", "feasible")',
    4: 'advanced vocabulary words (like "complacent", "tenacious", "inherent")',
    5: 'sophisticated, academic, or rare words (like "contingent", "volatile", "imprudent")',
  };

  async function _fetchFromGroq(difficulty, category, count) {
    const apiKey = RR.Storage.get('apiKey');
    if (!apiKey) return null;

    const diffLabel = DIFFICULTY_LABELS[difficulty] || DIFFICULTY_LABELS[3];

    const prompt = `Generate ${count} vocabulary words for a word recall practice game.
Requirements:
- Difficulty level: ${difficulty}/5 — use ${diffLabel}
- Category: ${category}
- Each word should match the difficulty level described above
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

    cachedWords = _filterByDifficulty(DEFINITION_BANK, difficulty);
    usedIndices.clear();
    return cachedWords;
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
  function getDefinitionChallenge(difficulty) {
    const bank = _filterByDifficulty(DEFINITION_BANK, difficulty);
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
  function getSentenceChallenge(difficulty) {
    const bank = _filterByDifficulty(SENTENCE_BANK, difficulty);
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
  function getRecallChallenge(difficulty) {
    const bank = _filterByDifficulty(DEFINITION_BANK, difficulty);
    const idx = Math.floor(Math.random() * bank.length);
    return {
      word: bank[idx].word,
      definition: bank[idx].definition,
    };
  }

  // ---- Word Upgrade helpers ----
  function getUpgradeChallenge(difficulty) {
    const bank = _filterByDifficulty(UPGRADE_BANK, difficulty);
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
    getTimerForDifficulty,
    resetUsedIndices,
    DEFINITION_BANK,
  };
})();
