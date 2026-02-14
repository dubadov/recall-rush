/* ================================================
   Vocabulary Module - Word banks for all game modes
   Supports English and Hebrew
   ================================================ */
window.RR = window.RR || {};

RR.Vocabulary = (function () {

  // ---- English Definition Match word bank ----
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

  // ---- Hebrew Definition Match word bank ----
  const DEFINITION_BANK_HE = [
    { word: 'סובלנות', definition: 'נכונות לקבל התנהגות או דעות שונות משלך', wrongDefinitions: ['תחושת עייפות קשה לאחר מאמץ', 'יכולת לזכור דברים לאורך זמן', 'נטייה להסכים עם כל אדם'], difficulty: 'beginner', category: 'general' },
    { word: 'עקביות', definition: 'פעולה באופן קבוע ועקבי לאורך זמן', wrongDefinitions: ['שינוי דעה בתדירות גבוהה', 'היכולת לעשות דברים במהירות', 'תכונה של אנשים ביישנים'], difficulty: 'beginner', category: 'general' },
    { word: 'הסתייגות', definition: 'ספק או התנגדות חלקית כלפי משהו', wrongDefinitions: ['הסכמה מלאה עם הצעה', 'תחושת שמחה גדולה', 'חוסר עניין מוחלט בנושא'], difficulty: 'intermediate', category: 'general' },
    { word: 'יוזמה', definition: 'פעולה עצמאית ללא צורך בהנחיה מאחרים', wrongDefinitions: ['ביצוע פקודות בצורה מדויקת', 'המתנה סבלנית לתוצאות', 'חיקוי מעשיהם של אחרים'], difficulty: 'beginner', category: 'business' },
    { word: 'אמפתיה', definition: 'היכולת להבין ולחוש את רגשותיו של אדם אחר', wrongDefinitions: ['חוסר רגישות כלפי אחרים', 'תחושת כעס כלפי זרים', 'הצורך להיות תמיד צודק'], difficulty: 'beginner', category: 'general' },
    { word: 'פרדוקס', definition: 'אמירה שנראית סותרת את עצמה אך עשויה להיות אמיתית', wrongDefinitions: ['עובדה מדעית מוכחת', 'סיפור קצר עם מוסר השכל', 'שאלה שאין לה תשובה'], difficulty: 'intermediate', category: 'academic' },
    { word: 'אופטימיות', definition: 'נטייה לצפות לתוצאות טובות ולראות את הצד החיובי', wrongDefinitions: ['פחד מתמיד מהעתיד', 'אדישות כלפי מה שקורה', 'נטייה לבקר אחרים'], difficulty: 'beginner', category: 'general' },
    { word: 'מהות', definition: 'התכונה הבסיסית והחשובה ביותר של דבר מה', wrongDefinitions: ['המראה החיצוני של דבר', 'הגודל הפיזי של עצם', 'הצבע הדומיננטי של משהו'], difficulty: 'intermediate', category: 'academic' },
    { word: 'פרגמטי', definition: 'מתייחס לדברים בצורה מעשית וריאליסטית', wrongDefinitions: ['חולם חלומות גדולים', 'מתעלם מהמציאות', 'פועל על פי רגשות בלבד'], difficulty: 'intermediate', category: 'general' },
    { word: 'אמביוולנטי', definition: 'בעל רגשות מעורבים או סותרים כלפי משהו', wrongDefinitions: ['בטוח לחלוטין בדעתו', 'חסר כל רגש או תחושה', 'תמיד שמח ומרוצה'], difficulty: 'intermediate', category: 'general' },
    { word: 'רלוונטי', definition: 'קשור ומתאים לנושא הנדון', wrongDefinitions: ['ישן ולא עדכני', 'מסוכן ומזיק', 'יקר ובלתי נגיש'], difficulty: 'beginner', category: 'general' },
    { word: 'אפקטיבי', definition: 'משיג את התוצאה הרצויה בהצלחה', wrongDefinitions: ['גורם לנזק צדדי', 'עובד בצורה איטית מדי', 'מתעלם מהבעיה העיקרית'], difficulty: 'beginner', category: 'business' },
    { word: 'אינטואיציה', definition: 'הבנה מיידית של משהו ללא צורך בחשיבה מודעת', wrongDefinitions: ['תהליך לימוד ארוך ומסובך', 'ניתוח נתונים בצורה מדויקת', 'העתקת דעתו של מומחה'], difficulty: 'intermediate', category: 'general' },
    { word: 'קוהרנטי', definition: 'הגיוני, עקבי וקל למעקב', wrongDefinitions: ['מבלבל ולא מסודר', 'ארוך ומשעמם', 'מלא בטעויות'], difficulty: 'intermediate', category: 'academic' },
    { word: 'אוטונומיה', definition: 'חופש לקבל החלטות ולפעול באופן עצמאי', wrongDefinitions: ['תלות מוחלטת באחרים', 'מכונה שעובדת אוטומטית', 'חוסר יכולת לבחור'], difficulty: 'intermediate', category: 'general' },
    { word: 'סטגנציה', definition: 'מצב של חוסר התקדמות או שינוי', wrongDefinitions: ['צמיחה מהירה ובלתי נשלטת', 'שינוי חד ופתאומי', 'התקדמות יציבה וקבועה'], difficulty: 'intermediate', category: 'business' },
    { word: 'אלטרואיזם', definition: 'דאגה חסרת אנוכיות לרווחתם של אחרים', wrongDefinitions: ['חיפוש רווח אישי בכל מחיר', 'אדישות לסבלם של אחרים', 'תחרותיות עזה עם הסביבה'], difficulty: 'intermediate', category: 'general' },
    { word: 'לגיטימי', definition: 'מוצדק ותקף על פי חוק או כללים מקובלים', wrongDefinitions: ['בלתי חוקי ואסור', 'מפוקפק ולא אמין', 'ישן ומיושן'], difficulty: 'beginner', category: 'general' },
    { word: 'הדדיות', definition: 'מצב שבו שני צדדים נותנים ומקבלים באופן שווה', wrongDefinitions: ['מערכת יחסים חד-צדדית', 'תחרות בין שני גורמים', 'חוסר תקשורת בין אנשים'], difficulty: 'intermediate', category: 'general' },
    { word: 'תעוזה', definition: 'נכונות לקחת סיכונים ולפעול באומץ', wrongDefinitions: ['פחד מכל דבר חדש', 'זהירות יתרה בכל צעד', 'היסוס ממושך לפני החלטה'], difficulty: 'beginner', category: 'general' },
    { word: 'אמינות', definition: 'תכונה של מי שאפשר לסמוך עליו ולבטוח בו', wrongDefinitions: ['נטייה לשקר באופן קבוע', 'חוסר יכולת לעמוד בהבטחות', 'שינוי דעה לפי הנוחות'], difficulty: 'beginner', category: 'business' },
    { word: 'דילמה', definition: 'מצב שבו צריך לבחור בין שתי אפשרויות קשות', wrongDefinitions: ['בעיה עם פתרון פשוט', 'שאלה עם תשובה ברורה', 'סיטואציה נעימה ומהנה'], difficulty: 'beginner', category: 'general' },
    { word: 'ניואנס', definition: 'הבדל עדין ודק שקשה להבחין בו', wrongDefinitions: ['הבדל ברור וגדול', 'שינוי פתאומי ודרמטי', 'דמיון מוחלט בין דברים'], difficulty: 'intermediate', category: 'academic' },
    { word: 'אסרטיביות', definition: 'היכולת לבטא דעות ורצונות בביטחון ללא תוקפנות', wrongDefinitions: ['ביישנות קיצונית ושתיקה', 'תוקפנות ואלימות מילולית', 'הסכמה עם כולם תמיד'], difficulty: 'intermediate', category: 'general' },
    { word: 'רטוריקה', definition: 'אומנות השכנוע באמצעות דיבור או כתיבה', wrongDefinitions: ['מדע העוסק במספרים', 'שיטת בישול מסורתית', 'סוג של מוזיקה קלאסית'], difficulty: 'intermediate', category: 'academic' },
    { word: 'אמפירי', definition: 'מבוסס על ניסוי ותצפית ולא על תיאוריה בלבד', wrongDefinitions: ['מבוסס על השערות בלבד', 'קשור לאימפריה או שלטון', 'חסר כל בסיס מדעי'], difficulty: 'intermediate', category: 'academic' },
    { word: 'סינרגיה', definition: 'שיתוף פעולה שמניב תוצאה גדולה מסכום חלקיו', wrongDefinitions: ['תחרות חריפה בין צוותים', 'עבודה עצמאית ללא קשר', 'חוסר תיאום בין גורמים'], difficulty: 'intermediate', category: 'business' },
    { word: 'חוסן', definition: 'היכולת להתאושש ולהתמודד עם קשיים', wrongDefinitions: ['חולשה פיזית מתמשכת', 'חוסר יכולת להתמודד עם לחץ', 'נטייה לוותר בקלות'], difficulty: 'beginner', category: 'general' },
    { word: 'הפשטה', definition: 'תהליך של זיקוק רעיון למרכיביו העיקריים', wrongDefinitions: ['הוספת פרטים מיותרים', 'ביצוע פעולה פיזית', 'הסרת בגדים בפומבי'], difficulty: 'intermediate', category: 'academic' },
    { word: 'אנלוגיה', definition: 'השוואה בין שני דברים לצורך הבהרה', wrongDefinitions: ['סתירה בין שני דברים', 'רשימה של מילים נרדפות', 'שיטת חישוב מתמטי'], difficulty: 'intermediate', category: 'academic' },
    { word: 'קטליזטור', definition: 'גורם שמזרז תהליך או שינוי', wrongDefinitions: ['גורם שמאט תהליך', 'מכשיר למדידת טמפרטורה', 'סוג של חומר כימי מסוכן'], difficulty: 'intermediate', category: 'general' },
    { word: 'פרופורציה', definition: 'יחס נכון ומאוזן בין חלקים שונים', wrongDefinitions: ['גודל עצום ומוגזם', 'חוסר איזון בולט', 'כמות קטנה מאוד'], difficulty: 'beginner', category: 'general' },
    { word: 'אובייקטיבי', definition: 'מבוסס על עובדות ולא על דעות אישיות', wrongDefinitions: ['מושפע מרגשות אישיים', 'עצם פיזי שאפשר לגעת בו', 'נוגד את ההיגיון הבריא'], difficulty: 'intermediate', category: 'academic' },
    { word: 'מנטור', definition: 'אדם מנוסה שמדריך ומייעץ לאחרים', wrongDefinitions: ['תלמיד צעיר וחסר ניסיון', 'מנהל שרק נותן פקודות', 'אדם שעובד לבד תמיד'], difficulty: 'beginner', category: 'business' },
    { word: 'אתיקה', definition: 'מערכת עקרונות מוסריים המנחה התנהגות נכונה', wrongDefinitions: ['חוק שנקבע על ידי ממשלה', 'מנהג חברתי ללא חשיבות', 'תחביב שעושים בזמן הפנוי'], difficulty: 'intermediate', category: 'general' },
    { word: 'סנכרון', definition: 'תיאום פעולות כך שיתרחשו באותו הזמן', wrongDefinitions: ['עבודה בזמנים שונים', 'תחרות בין שני צוותים', 'ביטול פגישה מתוכננת'], difficulty: 'beginner', category: 'general' },
    { word: 'אסטרטגיה', definition: 'תוכנית פעולה מקיפה להשגת מטרה ארוכת טווח', wrongDefinitions: ['החלטה מהירה ללא תכנון', 'בעיה שאין לה פתרון', 'פעולה אקראית ללא מטרה'], difficulty: 'beginner', category: 'business' },
    { word: 'פוטנציאל', definition: 'יכולת או כוח טמון שטרם מומש', wrongDefinitions: ['תוצאה סופית ומוגמרת', 'חולשה ברורה וגלויה', 'מגבלה שאי אפשר לשנות'], difficulty: 'beginner', category: 'general' },
    { word: 'דינמי', definition: 'מתאפיין בשינוי מתמיד, אנרגיה ופעילות', wrongDefinitions: ['סטטי ונייח לחלוטין', 'שקט ורגוע באופן קבוע', 'חסר כל אנרגיה או מרץ'], difficulty: 'beginner', category: 'general' },
    { word: 'אירוניה', definition: 'מצב שבו התוצאה היא הפוכה ממה שציפית', wrongDefinitions: ['בדיחה מצחיקה במיוחד', 'סיפור עם סוף שמח', 'אמירה ישירה וכנה'], difficulty: 'intermediate', category: 'general' },
    { word: 'אינטגריטי', definition: 'יושרה מוסרית ועקביות בין ערכים למעשים', wrongDefinitions: ['חישוב מתמטי מורכב', 'חלק ממערכת מחשב', 'סוג של תרגיל גופני'], difficulty: 'intermediate', category: 'business' },
    { word: 'אמביציה', definition: 'שאיפה חזקה להצליח ולהשיג הישגים', wrongDefinitions: ['שביעות רצון מהמצב הקיים', 'חוסר עניין בקידום', 'נטייה להימנע מאתגרים'], difficulty: 'beginner', category: 'general' },
    { word: 'קונצנזוס', definition: 'הסכמה כללית בין כל חברי הקבוצה', wrongDefinitions: ['מחלוקת חריפה בין אנשים', 'החלטה של אדם אחד בלבד', 'הצבעה עם תוצאה צמודה'], difficulty: 'intermediate', category: 'business' },
    { word: 'אמפירי', definition: 'מבוסס על ניסיון ותצפית ולא על תיאוריה', wrongDefinitions: ['תיאורטי ומנותק מהמציאות', 'קשור לאימפריה עתיקה', 'מבוסס על אמונות בלבד'], difficulty: 'intermediate', category: 'academic' },
    { word: 'הוליסטי', definition: 'מתייחס למכלול ולא רק לחלקים בודדים', wrongDefinitions: ['מתמקד בפרט אחד בלבד', 'קשור לרפואה חלופית בלבד', 'מתעלם מהתמונה הגדולה'], difficulty: 'intermediate', category: 'general' },
    { word: 'גמישות', definition: 'היכולת להסתגל לשינויים ולתנאים חדשים', wrongDefinitions: ['עקשנות וסירוב להשתנות', 'חולשה פיזית של הגוף', 'חוסר יכולת לקבל החלטות'], difficulty: 'beginner', category: 'general' },
    { word: 'אמפתיה', definition: 'הבנה עמוקה של רגשות וחוויות של אחרים', wrongDefinitions: ['חוסר רגישות כלפי אנשים', 'יכולת לשלוט ברגשות', 'העדפה להיות לבד'], difficulty: 'beginner', category: 'general' },
    { word: 'פרספקטיבה', definition: 'נקודת מבט או זווית ראייה מסוימת', wrongDefinitions: ['עובדה מוכחת שאינה ניתנת לערעור', 'מכשיר אופטי להגדלה', 'תמונה דו-ממדית שטוחה'], difficulty: 'intermediate', category: 'academic' },
    { word: 'קריטי', definition: 'בעל חשיבות מכרעת או הכרחי ביותר', wrongDefinitions: ['לא חשוב ושולי', 'מעניין אך לא הכרחי', 'קל לביצוע ופשוט'], difficulty: 'beginner', category: 'general' },
    { word: 'אותנטי', definition: 'מקורי ואמיתי, לא מזויף או מועתק', wrongDefinitions: ['מזויף ומחקה מקור אחר', 'ישן ולא רלוונטי', 'מודרני ועדכני'], difficulty: 'beginner', category: 'general' },
  ];

  // ---- Hebrew Sentence Fill bank ----
  const SENTENCE_BANK_HE = [
    { sentence: 'הוא הביע _____ כלפי ההצעה ולא היה בטוח אם לקבל אותה.', correctWord: 'הסתייגות', distractors: ['התלהבות', 'שמחה', 'הסכמה'], difficulty: 'intermediate' },
    { sentence: 'הצוות גילה _____ ופעל ליצור את הפרויקט ללא הנחיה.', correctWord: 'יוזמה', distractors: ['עצלות', 'בלבול', 'אדישות'], difficulty: 'beginner' },
    { sentence: 'חשוב לשמור על _____ כדי שאנשים יוכלו לסמוך עליך.', correctWord: 'אמינות', distractors: ['סודיות', 'עדינות', 'שקט'], difficulty: 'beginner' },
    { sentence: 'היא עמדה בפני _____ - האם לקבל את המשרה או להישאר עם המשפחה.', correctWord: 'דילמה', distractors: ['הזדמנות', 'חגיגה', 'הפסקה'], difficulty: 'beginner' },
    { sentence: 'הגישה _____ שלו עזרה לצוות למצוא פתרונות מעשיים.', correctWord: 'פרגמטית', distractors: ['רגשית', 'חלומית', 'אקראית'], difficulty: 'intermediate' },
    { sentence: 'המנהלת גילתה _____ גדולה כשלקחה את הסיכון הזה.', correctWord: 'תעוזה', distractors: ['פחדנות', 'עייפות', 'שעמום'], difficulty: 'beginner' },
    { sentence: 'ה_____ בין שני הצוותים הובילה לתוצאות מרשימות.', correctWord: 'סינרגיה', distractors: ['תחרות', 'מריבה', 'נתק'], difficulty: 'intermediate' },
    { sentence: 'עלינו לגבש _____ ברורה לפני שנתחיל לפעול.', correctWord: 'אסטרטגיה', distractors: ['תירוץ', 'בדיחה', 'תלונה'], difficulty: 'beginner' },
    { sentence: 'השופט חייב להיות _____ ולא להעדיף צד אחד.', correctWord: 'אובייקטיבי', distractors: ['רגשני', 'עצבני', 'משועמם'], difficulty: 'intermediate' },
    { sentence: 'הילד הזה מראה _____ עצום - הוא יכול להצליח בכל דבר.', correctWord: 'פוטנציאל', distractors: ['כישלון', 'בעיה', 'קושי'], difficulty: 'beginner' },
    { sentence: 'חברת ההייטק מאופיינת בסביבת עבודה _____ ומשתנה.', correctWord: 'דינמית', distractors: ['משעממת', 'סטטית', 'שקטה'], difficulty: 'beginner' },
    { sentence: 'הוא הוכיח _____ מוסרית כשסירב לשקר למרות הלחץ.', correctWord: 'אינטגריטי', distractors: ['חולשה', 'פחדנות', 'אדישות'], difficulty: 'intermediate' },
    { sentence: 'צריך _____ כדי להסתגל לשינויים בשוק העבודה.', correctWord: 'גמישות', distractors: ['עקשנות', 'עצלות', 'בורות'], difficulty: 'beginner' },
    { sentence: 'כולם הגיעו ל_____ לגבי התוכנית החדשה.', correctWord: 'קונצנזוס', distractors: ['מריבה', 'ויכוח', 'בלבול'], difficulty: 'intermediate' },
    { sentence: 'המחקר הזה הוא _____ כי הוא מבוסס על ניסויים אמיתיים.', correctWord: 'אמפירי', distractors: ['תיאורטי', 'דמיוני', 'מזויף'], difficulty: 'intermediate' },
    { sentence: 'ה_____ שלו גרמה לו לא לפסוק ולהמשיך לנסות.', correctWord: 'חוסן', distractors: ['חולשה', 'עייפות', 'אכזבה'], difficulty: 'beginner' },
    { sentence: 'היא הצליחה להסביר את הנושא המורכב בצורה _____.', correctWord: 'קוהרנטית', distractors: ['מבלבלת', 'משעממת', 'מסובכת'], difficulty: 'intermediate' },
    { sentence: 'הוא אדם _____ שתמיד מוכן לעזור לאחרים ללא תמורה.', correctWord: 'אלטרואיסטי', distractors: ['אנוכי', 'אכזרי', 'אדיש'], difficulty: 'intermediate' },
    { sentence: 'ההחלטה הזו היא _____ בשביל הצלחת הפרויקט.', correctWord: 'קריטית', distractors: ['שולית', 'מיותרת', 'משעממת'], difficulty: 'beginner' },
    { sentence: 'היא ביקשה מה_____ שלה עצה לגבי הקריירה.', correctWord: 'מנטור', distractors: ['מתחרה', 'יריב', 'זר'], difficulty: 'beginner' },
    { sentence: 'כדאי להסתכל על הבעיה מ_____ אחרת לפני שמחליטים.', correctWord: 'פרספקטיבה', distractors: ['מרחק', 'גובה', 'מהירות'], difficulty: 'intermediate' },
    { sentence: 'הסיפור שלו נשמע _____ ואמיתי, לא כמו המצאה.', correctWord: 'אותנטי', distractors: ['מזויף', 'משעמם', 'ארוך'], difficulty: 'beginner' },
    { sentence: 'ה_____ שלו להצליח דחפה אותו לעבוד קשה יותר.', correctWord: 'אמביציה', distractors: ['עצלות', 'אדישות', 'נחת'], difficulty: 'beginner' },
    { sentence: 'ההבדל בין שני הצלילים הוא עניין של _____ עדין.', correctWord: 'ניואנס', distractors: ['צעקה', 'פיצוץ', 'שקט'], difficulty: 'intermediate' },
    { sentence: 'האירוע הזה שימש כ_____ לשינוי גדול בחברה.', correctWord: 'קטליזטור', distractors: ['מכשול', 'עיכוב', 'בעיה'], difficulty: 'intermediate' },
    { sentence: 'מערכת היחסים הטובה ביניהם מבוססת על _____.', correctWord: 'הדדיות', distractors: ['שליטה', 'תחרות', 'ניצול'], difficulty: 'intermediate' },
    { sentence: 'גישה _____ מתייחסת לכל ההיבטים של הבעיה.', correctWord: 'הוליסטית', distractors: ['חלקית', 'שטחית', 'צרה'], difficulty: 'intermediate' },
    { sentence: 'חשוב לשמור על _____ בין עבודה לחיים אישיים.', correctWord: 'פרופורציה', distractors: ['כאוס', 'בלגן', 'עומס'], difficulty: 'beginner' },
    { sentence: 'ה_____ של השוק גורמת למשקיעים לחשוש.', correctWord: 'סטגנציה', distractors: ['שגשוג', 'צמיחה', 'פריחה'], difficulty: 'intermediate' },
    { sentence: 'הוא למד לבטא את דעתו בצורה _____ אך מכבדת.', correctWord: 'אסרטיבית', distractors: ['ביישנית', 'תוקפנית', 'שתקנית'], difficulty: 'intermediate' },
  ];

  // ---- Hebrew Word Upgrade bank ----
  const UPGRADE_BANK_HE = [
    { commonWord: 'גדול', acceptedUpgrades: ['עצום', 'אדיר', 'כביר', 'ענק', 'מסיבי'], difficulty: 'beginner' },
    { commonWord: 'קטן', acceptedUpgrades: ['זעיר', 'פעוט', 'שולי', 'מזערי', 'דל'], difficulty: 'beginner' },
    { commonWord: 'טוב', acceptedUpgrades: ['מצוין', 'מעולה', 'נפלא', 'מושלם', 'מרשים'], difficulty: 'beginner' },
    { commonWord: 'רע', acceptedUpgrades: ['גרוע', 'נורא', 'חמור', 'קטסטרופלי', 'הרסני'], difficulty: 'beginner' },
    { commonWord: 'חשוב', acceptedUpgrades: ['מכריע', 'חיוני', 'קריטי', 'הכרחי', 'מהותי'], difficulty: 'beginner' },
    { commonWord: 'יפה', acceptedUpgrades: ['מהמם', 'מרהיב', 'נהדר', 'מקסים', 'שובה לב'], difficulty: 'beginner' },
    { commonWord: 'מהיר', acceptedUpgrades: ['מהיר', 'זריז', 'חטוף', 'בזק', 'מיידי'], difficulty: 'beginner' },
    { commonWord: 'איטי', acceptedUpgrades: ['עצלני', 'מתמשך', 'ממושך', 'כבד', 'רפוי'], difficulty: 'beginner' },
    { commonWord: 'חכם', acceptedUpgrades: ['נבון', 'חריף', 'מבריק', 'פיקח', 'שנון'], difficulty: 'intermediate' },
    { commonWord: 'עצוב', acceptedUpgrades: ['עגום', 'קודר', 'מדוכא', 'נכאה', 'מלנכולי'], difficulty: 'beginner' },
    { commonWord: 'שמח', acceptedUpgrades: ['מאושר', 'צוהל', 'אופורי', 'מלא חדווה', 'מרונן'], difficulty: 'beginner' },
    { commonWord: 'כועס', acceptedUpgrades: ['זועם', 'נסער', 'רותח', 'נזעם', 'מתלקח'], difficulty: 'intermediate' },
    { commonWord: 'קשה', acceptedUpgrades: ['מאתגר', 'סבוך', 'מורכב', 'עמוס', 'תובעני'], difficulty: 'beginner' },
    { commonWord: 'קל', acceptedUpgrades: ['פשוט', 'נוח', 'יסודי', 'בסיסי', 'אלמנטרי'], difficulty: 'beginner' },
    { commonWord: 'ישן', acceptedUpgrades: ['עתיק', 'מיושן', 'ארכאי', 'קדום', 'מנוון'], difficulty: 'beginner' },
    { commonWord: 'חדש', acceptedUpgrades: ['חדשני', 'חדשי', 'מהפכני', 'פורץ דרך', 'טרי'], difficulty: 'beginner' },
    { commonWord: 'חזק', acceptedUpgrades: ['אדיר', 'עוצמתי', 'עז', 'כביר', 'משמעותי'], difficulty: 'beginner' },
    { commonWord: 'חלש', acceptedUpgrades: ['רפה', 'שביר', 'פגיע', 'עדין', 'דל'], difficulty: 'intermediate' },
    { commonWord: 'מפחיד', acceptedUpgrades: ['מאיים', 'מבהיל', 'מחריד', 'מרעיד', 'מבעית'], difficulty: 'intermediate' },
    { commonWord: 'משעמם', acceptedUpgrades: ['מונוטוני', 'חדגוני', 'תפל', 'מייגע', 'משמים'], difficulty: 'intermediate' },
    { commonWord: 'מעניין', acceptedUpgrades: ['מרתק', 'סוחף', 'מסקרן', 'שובה לב', 'כובש'], difficulty: 'intermediate' },
    { commonWord: 'עשיר', acceptedUpgrades: ['אמיד', 'משגשג', 'שופע', 'מבוסס', 'בעל אמצעים'], difficulty: 'intermediate' },
    { commonWord: 'עני', acceptedUpgrades: ['מרושש', 'חסר כל', 'דל', 'נזקק', 'מחוסר'], difficulty: 'intermediate' },
    { commonWord: 'אמיתי', acceptedUpgrades: ['אותנטי', 'מקורי', 'כן', 'גנואי', 'אמין'], difficulty: 'intermediate' },
    { commonWord: 'שקר', acceptedUpgrades: ['כזב', 'מרמה', 'הונאה', 'סילוף', 'זיוף'], difficulty: 'intermediate' },
    { commonWord: 'רגיל', acceptedUpgrades: ['שגרתי', 'מקובל', 'נורמטיבי', 'שכיח', 'מוכר'], difficulty: 'intermediate' },
    { commonWord: 'מוזר', acceptedUpgrades: ['מוזר', 'חריג', 'אקסצנטרי', 'תמוה', 'משונה'], difficulty: 'intermediate' },
    { commonWord: 'ברור', acceptedUpgrades: ['מובן', 'שקוף', 'חד-משמעי', 'מפורש', 'נהיר'], difficulty: 'intermediate' },
    { commonWord: 'מבלבל', acceptedUpgrades: ['מסובך', 'עמום', 'סתום', 'מורכב', 'מפותל'], difficulty: 'intermediate' },
    { commonWord: 'נחוש', acceptedUpgrades: ['נחוש', 'עיקש', 'תקיף', 'איתן', 'בלתי מתפשר'], difficulty: 'intermediate' },
  ];

  // ---- English Sentence Fill bank ----
  const SENTENCE_BANK = [
    { sentence: 'The report was _____ and got straight to the point without any filler.', correctWord: 'concise', distractors: ['brief', 'short', 'small'], difficulty: 'beginner' },
    { sentence: 'Her feedback was very _____ to the topic we were discussing.', correctWord: 'relevant', distractors: ['related', 'important', 'useful'], difficulty: 'beginner' },
    { sentence: 'The budget they gave us was _____ for what we needed to complete the project.', correctWord: 'adequate', distractors: ['enough', 'plenty', 'decent'], difficulty: 'beginner' },
    { sentence: 'We need a more _____ approach instead of just hoping things work out.', correctWord: 'pragmatic', distractors: ['practical', 'realistic', 'logical'], difficulty: 'beginner' },
    { sentence: 'The evidence she presented was extremely _____ and hard to argue against.', correctWord: 'compelling', distractors: ['strong', 'convincing', 'powerful'], difficulty: 'intermediate' },
    { sentence: 'His instructions were so _____ that nobody had any confusion about what to do.', correctWord: 'explicit', distractors: ['clear', 'obvious', 'simple'], difficulty: 'intermediate' },
    { sentence: 'The new policy had a _____ effect on employee morale across departments.', correctWord: 'detrimental', distractors: ['harmful', 'negative', 'damaging'], difficulty: 'intermediate' },
    { sentence: 'She was _____ in her research, checking every source twice.', correctWord: 'meticulous', distractors: ['careful', 'thorough', 'precise'], difficulty: 'beginner' },
    { sentence: 'The CEO gave a _____ speech that moved the entire audience.', correctWord: 'eloquent', distractors: ['beautiful', 'powerful', 'moving'], difficulty: 'intermediate' },
    { sentence: 'The wording of the contract was deliberately _____, leaving room for interpretation.', correctWord: 'ambiguous', distractors: ['vague', 'unclear', 'confusing'], difficulty: 'intermediate' },
    { sentence: 'Despite repeated setbacks, the team remained _____ and bounced back every time.', correctWord: 'resilient', distractors: ['strong', 'tough', 'determined'], difficulty: 'beginner' },
    { sentence: 'The success of this project is _____ on getting approval from the board first.', correctWord: 'contingent', distractors: ['dependent', 'reliant', 'based'], difficulty: 'intermediate' },
    { sentence: 'The quiet library environment is very _____ to focused study.', correctWord: 'conducive', distractors: ['helpful', 'good', 'suitable'], difficulty: 'intermediate' },
    { sentence: 'We saw _____ growth in revenue compared to last quarter.', correctWord: 'substantial', distractors: ['big', 'large', 'major'], difficulty: 'beginner' },
    { sentence: 'His _____ work ethic is the main reason he got promoted so quickly.', correctWord: 'diligent', distractors: ['hard', 'strong', 'dedicated'], difficulty: 'beginner' },
    { sentence: 'The plan is _____ if we can secure the funding by next month.', correctWord: 'feasible', distractors: ['possible', 'doable', 'achievable'], difficulty: 'intermediate' },
    { sentence: 'She offered a _____ perspective that changed how we viewed the whole problem.', correctWord: 'profound', distractors: ['deep', 'interesting', 'unique'], difficulty: 'intermediate' },
    { sentence: 'Misinformation on social media has become increasingly _____ in recent years.', correctWord: 'prevalent', distractors: ['common', 'widespread', 'frequent'], difficulty: 'intermediate' },
    { sentence: 'The manager tried to _____ the conflict between the two departments.', correctWord: 'mitigate', distractors: ['reduce', 'solve', 'handle'], difficulty: 'intermediate' },
    { sentence: 'After the scandal, the company had to _____ its damaged public image.', correctWord: 'restore', distractors: ['fix', 'rebuild', 'repair'], difficulty: 'beginner' },
    { sentence: 'The data shows a clear _____ between the two sets of numbers.', correctWord: 'discrepancy', distractors: ['difference', 'gap', 'mismatch'], difficulty: 'intermediate' },
    { sentence: 'It would be _____ to invest everything in a single stock.', correctWord: 'imprudent', distractors: ['stupid', 'risky', 'dangerous'], difficulty: 'intermediate' },
    { sentence: 'The new software will _____ collaboration between remote teams.', correctWord: 'facilitate', distractors: ['improve', 'help', 'enable'], difficulty: 'beginner' },
    { sentence: 'He remained _____ about the project even when others lost faith.', correctWord: 'optimistic', distractors: ['hopeful', 'positive', 'confident'], difficulty: 'beginner' },
    { sentence: 'The results were _____ evidence that the new method actually works.', correctWord: 'tangible', distractors: ['solid', 'real', 'clear'], difficulty: 'intermediate' },
    { sentence: 'Her _____ nature means she can handle any role the company needs.', correctWord: 'versatile', distractors: ['flexible', 'adaptable', 'capable'], difficulty: 'beginner' },
    { sentence: 'The committee reached a _____ decision after three hours of debate.', correctWord: 'unanimous', distractors: ['final', 'complete', 'joint'], difficulty: 'intermediate' },
    { sentence: 'Trying to change his mind at this point would be _____.', correctWord: 'futile', distractors: ['useless', 'pointless', 'wasteful'], difficulty: 'intermediate' },
    { sentence: 'The judge must remain _____ throughout the entire trial.', correctWord: 'impartial', distractors: ['fair', 'neutral', 'balanced'], difficulty: 'intermediate' },
    { sentence: 'The changes she proposed were _____ but could transform the company.', correctWord: 'bold', distractors: ['brave', 'daring', 'risky'], difficulty: 'beginner' },
  ];

  // ---- English Word Upgrade bank ----
  const UPGRADE_BANK = [
    { commonWord: 'enough', acceptedUpgrades: ['sufficient', 'adequate', 'ample'], difficulty: 'beginner' },
    { commonWord: 'important', acceptedUpgrades: ['significant', 'crucial', 'essential', 'vital', 'paramount', 'pivotal'], difficulty: 'beginner' },
    { commonWord: 'big', acceptedUpgrades: ['substantial', 'considerable', 'significant', 'immense'], difficulty: 'beginner' },
    { commonWord: 'small', acceptedUpgrades: ['minimal', 'negligible', 'marginal', 'trivial', 'modest'], difficulty: 'beginner' },
    { commonWord: 'good', acceptedUpgrades: ['excellent', 'exceptional', 'superb', 'commendable', 'exemplary', 'outstanding'], difficulty: 'beginner' },
    { commonWord: 'bad', acceptedUpgrades: ['detrimental', 'adverse', 'harmful', 'unfavorable', 'deplorable'], difficulty: 'beginner' },
    { commonWord: 'clear', acceptedUpgrades: ['explicit', 'lucid', 'coherent', 'transparent', 'unambiguous'], difficulty: 'intermediate' },
    { commonWord: 'confusing', acceptedUpgrades: ['ambiguous', 'perplexing', 'convoluted', 'bewildering'], difficulty: 'intermediate' },
    { commonWord: 'careful', acceptedUpgrades: ['meticulous', 'diligent', 'thorough', 'prudent', 'scrupulous'], difficulty: 'intermediate' },
    { commonWord: 'useful', acceptedUpgrades: ['beneficial', 'advantageous', 'valuable', 'instrumental'], difficulty: 'intermediate' },
    { commonWord: 'hard', acceptedUpgrades: ['arduous', 'strenuous', 'formidable', 'demanding', 'rigorous'], difficulty: 'beginner' },
    { commonWord: 'easy', acceptedUpgrades: ['effortless', 'straightforward', 'feasible', 'manageable'], difficulty: 'beginner' },
    { commonWord: 'fast', acceptedUpgrades: ['expeditious', 'swift', 'rapid', 'prompt'], difficulty: 'beginner' },
    { commonWord: 'slow', acceptedUpgrades: ['sluggish', 'lethargic', 'gradual', 'deliberate'], difficulty: 'beginner' },
    { commonWord: 'angry', acceptedUpgrades: ['furious', 'irate', 'indignant', 'livid', 'incensed'], difficulty: 'intermediate' },
    { commonWord: 'happy', acceptedUpgrades: ['elated', 'jubilant', 'ecstatic', 'euphoric', 'delighted'], difficulty: 'beginner' },
    { commonWord: 'sad', acceptedUpgrades: ['melancholy', 'somber', 'despondent', 'dismal', 'gloomy'], difficulty: 'beginner' },
    { commonWord: 'old', acceptedUpgrades: ['antiquated', 'obsolete', 'archaic', 'outdated'], difficulty: 'beginner' },
    { commonWord: 'new', acceptedUpgrades: ['novel', 'innovative', 'contemporary', 'cutting-edge', 'unprecedented'], difficulty: 'beginner' },
    { commonWord: 'smart', acceptedUpgrades: ['astute', 'shrewd', 'perceptive', 'discerning', 'insightful'], difficulty: 'intermediate' },
    { commonWord: 'strong', acceptedUpgrades: ['robust', 'resilient', 'formidable', 'tenacious'], difficulty: 'beginner' },
    { commonWord: 'weak', acceptedUpgrades: ['fragile', 'vulnerable', 'feeble', 'precarious'], difficulty: 'intermediate' },
    { commonWord: 'likely', acceptedUpgrades: ['probable', 'plausible', 'feasible', 'conceivable'], difficulty: 'intermediate' },
    { commonWord: 'unlikely', acceptedUpgrades: ['improbable', 'implausible', 'dubious', 'remote'], difficulty: 'intermediate' },
    { commonWord: 'normal', acceptedUpgrades: ['conventional', 'typical', 'standard', 'customary', 'mundane'], difficulty: 'intermediate' },
    { commonWord: 'strange', acceptedUpgrades: ['peculiar', 'anomalous', 'unconventional', 'irregular'], difficulty: 'intermediate' },
    { commonWord: 'rich', acceptedUpgrades: ['affluent', 'prosperous', 'opulent', 'abundant'], difficulty: 'intermediate' },
    { commonWord: 'poor', acceptedUpgrades: ['impoverished', 'destitute', 'meager', 'scarce'], difficulty: 'intermediate' },
    { commonWord: 'short', acceptedUpgrades: ['concise', 'brief', 'succinct', 'compact'], difficulty: 'beginner' },
    { commonWord: 'boring', acceptedUpgrades: ['mundane', 'monotonous', 'tedious', 'stale'], difficulty: 'intermediate' },
  ];

  // ---- Cache & state ----
  let cachedWords = [];
  let usedIndices = new Set();
  let usedSentenceIndices = new Set();
  let usedUpgradeIndices = new Set();

  // ---- Helper: get current language ----
  function _getLang() {
    return (RR.i18n && RR.i18n.getLang) ? RR.i18n.getLang() : 'en';
  }

  // ---- Groq API integration ----
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  async function _fetchFromGroq(difficulty, category, count) {
    const apiKey = RR.Storage.get('apiKey');
    if (!apiKey) return null;

    const lang = _getLang();
    let prompt;

    if (lang === 'he') {
      prompt = `Generate ${count} Hebrew vocabulary words for a word recall practice game.
Requirements:
- Difficulty level: ${difficulty}
- Category: ${category}
- Each word should be a moderately complex Hebrew word - NOT slang and NOT overly archaic
- All content must be in Hebrew
- Return ONLY valid JSON array, no markdown or explanation

Format each word as:
{"word": "סובלנות", "definition": "נכונות לקבל התנהגות או דעות שונות משלך", "wrongDefinitions": ["תחושת עייפות קשה לאחר מאמץ", "יכולת לזכור דברים לאורך זמן", "נטייה להסכים עם כל אדם"], "example": "חברה בריאה דורשת סובלנות כלפי דעות שונות."}

Return a JSON array of ${count} objects in this exact format. Only output the JSON array, nothing else.`;
    } else {
      prompt = `Generate ${count} vocabulary words for a word recall practice game. 
Requirements:
- Difficulty level: ${difficulty}
- Category: ${category}
- Each word should be a moderately complex English word (like "relevant", "adequate", "concise", "pragmatic") - NOT overly obscure
- Return ONLY valid JSON array, no markdown or explanation

Format each word as:
{"word": "Pragmatic", "definition": "dealing with things sensibly and realistically", "wrongDefinitions": ["following strict rules without exception", "expressing emotions openly and freely", "acting without thinking about consequences"], "example": "We need a pragmatic approach to solve this budget issue."}

Return a JSON array of ${count} objects in this exact format. Only output the JSON array, nothing else.`;
    }

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
            { role: 'system', content: lang === 'he'
              ? 'You are a Hebrew vocabulary expert. You only respond with valid JSON arrays. No markdown, no explanation, just the JSON. All content must be in Hebrew.'
              : 'You are a vocabulary expert. You only respond with valid JSON arrays. No markdown, no explanation, just the JSON.'
            },
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

  function _getDefinitionBank() {
    return _getLang() === 'he' ? DEFINITION_BANK_HE : DEFINITION_BANK;
  }

  function _getSentenceBank() {
    return _getLang() === 'he' ? SENTENCE_BANK_HE : SENTENCE_BANK;
  }

  function _getUpgradeBank() {
    return _getLang() === 'he' ? UPGRADE_BANK_HE : UPGRADE_BANK;
  }

  // ---- Difficulty filtering helpers ----
  // Maps numeric difficulty (1-5) to allowed bank difficulty tags
  function _getAllowedDifficulties(numericLevel) {
    if (numericLevel <= 2) return ['beginner'];
    if (numericLevel >= 4) return ['intermediate'];
    return ['beginner', 'intermediate']; // level 3 = all
  }

  function _getCurrentDifficulty() {
    const settings = RR.Storage.getSettings();
    return settings.difficulty || 3;
  }

  // Filters any bank array by difficulty, with fallback to full bank
  function _filterByDifficulty(bank, numericLevel) {
    const allowed = _getAllowedDifficulties(numericLevel);
    const filtered = bank.filter(e => allowed.includes(e.difficulty));
    // Safety: if filtering yields fewer than 5 entries, use full bank
    return filtered.length >= 5 ? filtered : bank;
  }

  function _filterDefinitionBank(difficulty, category) {
    let words = [..._getDefinitionBank()];

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
      cachedWords = _shuffle([..._getDefinitionBank()]);
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
    const level = _getCurrentDifficulty();
    const bank = _filterByDifficulty(_getDefinitionBank(), level);
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
    const level = _getCurrentDifficulty();
    const bank = _filterByDifficulty(_getSentenceBank(), level);
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
    const level = _getCurrentDifficulty();
    const bank = _filterByDifficulty(_getDefinitionBank(), level);
    const idx = Math.floor(Math.random() * bank.length);
    return {
      word: bank[idx].word,
      definition: bank[idx].definition,
    };
  }

  // ---- Word Upgrade helpers ----
  function getUpgradeChallenge() {
    const level = _getCurrentDifficulty();
    const bank = _filterByDifficulty(_getUpgradeBank(), level);
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
    DEFINITION_BANK_HE,
  };
})();
