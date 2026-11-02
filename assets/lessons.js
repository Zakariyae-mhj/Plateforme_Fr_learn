/* Original Arabic–French course material for Zakaria El Mahjoubi — 60 days. */
const LESSONS = [];
function add(title, category, intro, vocab, examples, mission, question, options, answer, tip) {
  const parse = text => text.split(';').map(x => x.split('|').map(y => y.trim()));
  LESSONS.push({id:LESSONS.length+1,title,category,intro,words:parse(vocab),examples:parse(examples),mission,quiz:{question,options:options.split('|'),answer},tip});
}

// SEMAINE 1 — Premiers pas
add('التحيات والتعريف بالنفس','محادثة','تعلّم كيف تبدأ لقاءً وتعرّف بنفسك بعبارات قصيرة وواضحة.',
`Bonjour|صباح الخير / مرحبا;Bonsoir|مساء الخير;Salut|أهلا (غير رسمي);Je m'appelle|اسمي;Enchanté|تشرفت بمعرفتك;Au revoir|إلى اللقاء`,
`Bonjour, je m'appelle Zakaria.|مرحبا، اسمي زكرياء.;Je suis marocain.|أنا مغربي.;Enchanté de vous rencontrer.|تشرفت بلقائكم.;Je suis doctorant en géographie.|أنا باحث في سلك الدكتوراه في الجغرافيا.`,
`سجّل تعريفا صوتيا بنفسك من 20 ثانية يتضمن اسمك وبلدك ومجال دراستك.`,
`كيف تقول «اسمي زكرياء»؟`,`Je suis Zakaria.|Je m'appelle Zakaria.|J'ai Zakaria.`,1,
`استخدم Bonjour نهارا وBonsoir مساء، أما Salut فأنسب بين الأصدقاء.`);
add('الأرقام وأيام الأسبوع','مفردات','احفظ الأرقام الأساسية وأسماء أيام الأسبوع واستعملها في جمل يومية.',
`zéro|صفر;un|واحد;deux|اثنان;trois|ثلاثة;quatre|أربعة;cinq|خمسة;six|ستة;sept|سبعة;huit|ثمانية;neuf|تسعة;dix|عشرة;onze|أحد عشر;douze|اثنا عشر;treize|ثلاثة عشر;quatorze|أربعة عشر;quinze|خمسة عشر;seize|ستة عشر;dix-sept|سبعة عشر;dix-huit|ثمانية عشر;dix-neuf|تسعة عشر;vingt|عشرون;lundi|الاثنين;mardi|الثلاثاء;mercredi|الأربعاء;jeudi|الخميس;vendredi|الجمعة;samedi|السبت;dimanche|الأحد`,
`Nous sommes mardi.|اليوم الثلاثاء.;J'ai deux livres.|لدي كتابان.;Aujourd'hui, c'est lundi.|اليوم الاثنين.;Il est dix heures.|الساعة العاشرة.`,
`عدّ من 1 إلى 20 بالفرنسية، ثم اذكر أيام الأسبوع بالترتيب.`,
`ما معنى vendredi؟`,`الثلاثاء|الجمعة|الأحد`,1,
`أسماء الأيام في الفرنسية تبدأ عادة بحرف صغير: lundi, mardi, mercredi.`);
add('فعل être في الحاضر','قواعد','فعل être بمعنى «يكون» أساسي للتعريف بالهوية والصفة والمكان.',
`je suis|أنا أكون;tu es|أنت تكون;il est|هو يكون;elle est|هي تكون;nous sommes|نحن نكون;vous êtes|أنتم تكونون;ils sont|هم يكونون`,
`Je suis étudiant.|أنا طالب.;Tu es prêt.|أنت مستعد.;Nous sommes à Oujda.|نحن في وجدة.;Elle est gentille.|هي لطيفة.`,
`كوّن 6 جمل: جملتين عن نفسك، وجملتين عن أشخاص، وجملتين عن المكان.`,
`أكمل: Nous ... étudiants.`,`sommes|êtes|sont`,0,
`بعد Je نستعمل suis، وبعد Nous نستعمل sommes.`);
add('فعل avoir في الحاضر','قواعد','استعمل avoir للتعبير عن الملكية والعمر وبعض الأحاسيس.',
`j'ai|لديّ;tu as|لديك;il a|لديه;nous avons|لدينا;vous avez|لديكم;ils ont|لديهم;avoir besoin de|يحتاج إلى`,
`J'ai un ordinateur.|لدي حاسوب.;J'ai vingt-sept ans.|عمري 27 سنة.;Nous avons un cours.|لدينا درس.;Elle a faim.|هي جائعة.`,
`اكتب خمس جمل تبدأ بـ J’ai أو Nous avons.`,
`أكمل: Vous ... un livre.`,`avons|avez|ont`,1,
`نقول J’ai 27 ans، وليس Je suis 27 ans.`);
add('العائلة','مفردات','تعرف إلى أفراد العائلة وقدّم أحد أقربائك في جمل قصيرة.',
`la famille|العائلة;le père|الأب;la mère|الأم;le frère|الأخ;la sœur|الأخت;les parents|الوالدان;le cousin|ابن العم أو الخال`,
`Voici ma famille.|هذه عائلتي.;J'ai une sœur.|لدي أخت.;Mon père travaille.|والدي يعمل.;Ma mère est gentille.|أمي لطيفة.`,
`صف أسرتك في أربع جمل، مع استعمال mon وma وmes.`,
`اختر معنى la sœur.`,`الأخت|الأخ|الوالدة`,0,
`نستخدم mon مع الاسم المذكر وma مع الاسم المؤنث عادة.`);
add('النطق المتصل — liaison','نطق','تعلم كيف تنتقل بعض الأصوات بين الكلمات في الفرنسية عند النطق.',
`les amis|الأصدقاء;vous avez|لديكم;nous avons|لدينا;un enfant|طفل;très intéressant|مثير جدا;deux amis|صديقان`,
`Vous avez un livre.|لديكم كتاب.;Nous avons un ami.|لدينا صديق.;Les amis arrivent.|يصل الأصدقاء.;C'est très intéressant.|هذا مثير جدا.`,
`استمع إلى أربع جمل وكررها ثلاث مرات، وركز على الربط بين الكلمات.`,
`أي تركيب يحتوي على liaison شائعة؟`,`les amis|et elle|avec Pierre`,0,
`غالبا تُنطق s أو x بصوت z في الوصل: les amis ≈ لي زامي. ولا يُوصل عادة بعد et.`);
add('مراجعة الأسبوع الأول','مراجعة','اربط التحيات والأرقام والأفعال والعائلة في حديث واحد.',
`Je suis|أنا أكون;J'ai|لدي;Bonjour|مرحبا;aujourd'hui|اليوم;ma famille|عائلتي;un étudiant|طالب`,
`Bonjour, je suis Zakaria.|مرحبا، أنا زكرياء.;J'ai deux frères.|لدي أخوان.;Nous sommes lundi.|اليوم الاثنين.;Ma famille est au Maroc.|عائلتي في المغرب.`,
`اكتب 5 جمل مترابطة عن نفسك، ثم اقرأها بصوت مرتفع.`,
`اختر الجملة الصحيحة.`,`Nous est étudiants.|Nous sommes étudiants.|Nous avons étudiants.`,1,
`يوم المراجعة مخصص للتطبيق لا لحفظ قائمة جديدة من القواعد.`);

// SEMAINE 2
add('فعل aller','قواعد','تعلّم فعل «يذهب» للتعبير عن الحركة والوجهة.',
`je vais|أنا أذهب;tu vas|أنت تذهب;il va|هو يذهب;nous allons|نحن نذهب;vous allez|أنتم تذهبون;ils vont|هم يذهبون`,
`Je vais à l'université.|أذهب إلى الجامعة.;Nous allons au marché.|نذهب إلى السوق.;Où vas-tu ?|إلى أين تذهب؟;Je vais bien.|أنا بخير.`,
`قل بصوتك إلى أين تذهب صباحا ومساء مع استعمال aller.`,
`أكمل: Je ... à l'université.`,`vas|vais|va`,1,
`مع اسم مدينة نستعمل غالبا à: Je vais à Oujda.`);
add('فعل faire','قواعد','استعمل faire للأنشطة اليومية والرياضة والعمل.',
`je fais|أنا أفعل;tu fais|أنت تفعل;il fait|هو يفعل;nous faisons|نحن نفعل;vous faites|أنتم تفعلون;ils font|هم يفعلون`,
`Je fais du sport.|أمارس الرياضة.;Je fais des recherches.|أنجز أبحاثا.;Nous faisons un exercice.|نقوم بتمرين.;Que faites-vous ?|ماذا تفعلون؟`,
`صف ثلاثة أنشطة تقوم بها باستعمال faire.`,
`أكمل: Vous ... un exercice.`,`faites|faisons|font`,0,
`احفظ التعبير كاملا: faire du sport، وليس فقط الفعل وحده.`);
add('أماكن المدينة','مفردات','تعرف إلى الأماكن الأكثر استعمالا في المدينة وكيف تسأل عنها.',
`la ville|المدينة;la gare|المحطة;la pharmacie|الصيدلية;l'hôpital|المستشفى;la bibliothèque|المكتبة;la banque|البنك;la place|الساحة`,
`Où est la gare ?|أين المحطة؟;La bibliothèque est près d'ici.|المكتبة قريبة من هنا.;Je vais à la pharmacie.|أذهب إلى الصيدلية.;Tournez à droite.|انعطف يمينا.`,
`تخيل أنك ترشد شخصا إلى المكتبة أو محطة القطار في ثلاث جمل.`,
`ما معنى la bibliothèque؟`,`المكتبة|المستشفى|البنك`,0,
`près de تعني «قريب من»، وloin de تعني «بعيد عن».`);
add('الطعام والمطعم','مفردات','اطلب وجبة بسيطة واسأل عن قائمة الطعام والثمن.',
`le restaurant|المطعم;le menu|قائمة الطعام;le pain|الخبز;l'eau|الماء;le café|القهوة;l'addition|الحساب;délicieux|لذيذ`,
`Je voudrais un café, s'il vous plaît.|أود قهوة من فضلك.;L'addition, s'il vous plaît.|الحساب من فضلك.;Ce plat est délicieux.|هذا الطبق لذيذ.;Avez-vous de l'eau ?|هل لديكم ماء؟`,
`مثّل حوارا قصيرا بين زبون ونادل واطلب مشروبا ووجبة.`,
`كيف تطلب الحساب؟`,`La gare, s'il vous plaît.|L'addition, s'il vous plaît.|La famille, s'il vous plaît.`,1,
`Je voudrais ألطف من Je veux عند الطلب في المطعم.`);
add('تكوين الأسئلة: Quand, Où, Pourquoi','قواعد','ابدأ بطرح أسئلة بسيطة عن الزمان والمكان والسبب.',
`quand|متى;où|أين;pourquoi|لماذا;comment|كيف;qui|من;quoi|ماذا;parce que|لأن`,
`Où habitez-vous ?|أين تسكنون؟;Quand commence le cours ?|متى يبدأ الدرس؟;Pourquoi étudiez-vous le français ?|لماذا تدرسون الفرنسية؟;Comment allez-vous ?|كيف حالكم؟`,
`اكتب ستة أسئلة باستعمال أدوات الاستفهام، ثم أجب عنها.`,
`ما أداة السؤال عن السبب؟`,`Quand|Pourquoi|Où`,1,
`استخدم Pourquoi للسؤال عن السبب، وأجب غالبا بـ Parce que.`);
add('جمل يومية قصيرة','كتابة','اجمع الأفعال والمفردات لتصف أحداث يوم عادي.',
`le matin|صباحا;à midi|عند الظهر;le soir|مساء;ensuite|ثم;d'abord|أولا;chaque jour|كل يوم`,
`Le matin, je prends un café.|صباحا أشرب قهوة.;Ensuite, je vais à l'université.|ثم أذهب إلى الجامعة.;Le soir, je lis un livre.|مساء أقرأ كتابا.;Chaque jour, j'étudie.|أدرس كل يوم.`,
`اكتب 6 جمل تصف بها اليوم منذ الاستيقاظ إلى النوم.`,
`ما معنى ensuite؟`,`أمس|ثم|غدا`,1,
`لتحسين الترابط: d’abord → ensuite → enfin.`);
add('مراجعة + محادثة دقيقة','مراجعة','تدرب على التحية والذهاب إلى مكان وطلب شيء والسؤال.',
`je voudrais|أود;où|أين;quand|متى;je vais|أذهب;je fais|أفعل;merci|شكرا`,
`Bonjour, où est le restaurant ?|مرحبا، أين المطعم؟;Je vais au centre-ville.|أذهب إلى وسط المدينة.;Je voudrais de l'eau.|أود ماء.;Merci beaucoup !|شكرا جزيلا!`,
`سجّل محادثة من دقيقة واحدة تؤدي فيها دورين: زبون ونادل.`,
`أي عبارة مناسبة لطلب مهذب؟`,`Je voudrais un thé.|Je suis un thé.|Je vais un thé.`,0,
`سجّل نفسك، وأعد التسجيل مرة ثانية بعد ملاحظة نقاط التعثر.`);

// SEMAINE 3
add('تصريف الحاضر للأفعال الشائعة','قواعد','ابدأ بالأفعال المنتظمة المنتهية بـ -er في الزمن الحاضر.',
`parler|يتحدث;étudier|يدرس;travailler|يعمل;habiter|يسكن;écouter|يستمع;regarder|يشاهد;jouer|يلعب`,
`Je parle français.|أتحدث الفرنسية.;Nous étudions la géographie.|ندرس الجغرافيا.;Ils travaillent ici.|هم يعملون هنا.;Elle regarde une carte.|هي تشاهد خريطة.`,
`صرّف parler مع Je وTu وIl وNous وVous وIls.`,
`أكمل: Nous parl... français.`,`-ons|-ez|-ent`,0,
`في أغلب أفعال -er: je -e، tu -es، il -e، nous -ons، vous -ez، ils -ent.`);
add('الروتين اليومي','محادثة','صف ما تقوم به منذ الصباح حتى المساء.',
`se réveiller|يستيقظ;se lever|ينهض;prendre le petit-déjeuner|يتناول الفطور;partir|يغادر;rentrer|يعود;se coucher|ينام`,
`Je me réveille à sept heures.|أستيقظ في السابعة.;Je prends mon petit-déjeuner.|أتناول فطوري.;Je rentre à la maison.|أعود إلى البيت.;Je me couche à vingt-trois heures.|أنام في الحادية عشرة ليلا.`,
`سجّل روتينك من الاستيقاظ حتى النوم في 45 ثانية.`,
`أكمل: Je ... réveille tôt.`,`me|te|se`,0,
`الأفعال الضميرية تأخذ ضميرا مرافقا: je me، tu te، il se.`);
add('أدوات الربط: et, mais, parce que, que','قواعد','اجعل الجمل أكثر سلاسة باستعمال الروابط الأساسية.',
`et|و;mais|لكن;parce que|لأن;que|أن / الذي;donc|إذن;ou|أو;avec|مع`,
`J'étudie et je travaille.|أدرس وأعمل.;Je suis fatigué, mais content.|أنا متعب لكن سعيد.;J'apprends le français parce que j'en ai besoin.|أتعلم الفرنسية لأنني أحتاجها.;Je pense que c'est utile.|أظن أن هذا مفيد.`,
`اربط أربع جمل منفصلة باستعمال et وmais وparce que.`,
`أي رابط يدل على السبب؟`,`mais|et|parce que`,2,
`بعد parce que يأتي سبب كامل، مثل: parce que je travaille.`);
add('مفردات المنزل','مفردات','تعلّم أسماء الغرف والأشياء الموجودة في المنزل.',
`la maison|المنزل;la chambre|غرفة النوم;la cuisine|المطبخ;le salon|غرفة الجلوس;la porte|الباب;la fenêtre|النافذة;la table|الطاولة`,
`Ma chambre est petite.|غرفتي صغيرة.;La cuisine est à gauche.|المطبخ على اليسار.;Le livre est sur la table.|الكتاب على الطاولة.;Il y a une fenêtre.|هناك نافذة.`,
`صف غرفة في منزلك باستعمال Il y a وsur وdans.`,
`ما معنى la cuisine؟`,`غرفة النوم|المطبخ|الباب`,1,
`Il y a = يوجد / توجد، وهي عبارة مهمة في الوصف.`);
add('تكوين فقرة قصيرة','كتابة','نظم أفكارك في فقرة لها بداية ووسط ونهاية.',
`d'abord|أولا;ensuite|بعد ذلك;de plus|بالإضافة إلى ذلك;enfin|أخيرا;j'aime|أحب;je préfère|أفضل`,
`Je m'appelle Zakaria et j'habite au Maroc.|اسمي زكرياء وأسكن في المغرب.;J'étudie la géographie à l'université.|أدرس الجغرافيا في الجامعة.;J'aime apprendre de nouvelles choses.|أحب تعلم أشياء جديدة.;Enfin, je pratique le français.|وأخيرا، أتدرب على الفرنسية.`,
`اكتب فقرة من 6 إلى 8 جمل عن شخصك ودراستك وهواياتك.`,
`ما الرابط الأنسب لخاتمة فقرة؟`,`Enfin|D'abord|Parce que`,0,
`احرص على فكرة واحدة في كل جملة قبل محاولة كتابة جمل طويلة.`);
add('تدريب على النطق المتصل','نطق','ركّز على الوصل والإيقاع ونطق الجمل لا الكلمات المنفصلة فقط.',
`nous avons|لدينا;les enfants|الأطفال;vous êtes|أنتم تكونون;un ami|صديق;trois étudiants|ثلاثة طلاب;très utile|مفيد جدا`,
`Vous êtes étudiants ?|هل أنتم طلاب؟;Nous avons un examen.|لدينا امتحان.;Les enfants arrivent.|يصل الأطفال.;C'est très utile.|هذا مفيد جدا.`,
`كرر الجمل بصوت مرتفع وسجل مقارنة بين المحاولة الأولى والأخيرة.`,
`الصوت النهائي في vous êtes يُنطق غالبا عند الوصل كـ...`,`z|p|f`,0,
`الاستماع ثم التقليد (shadowing) لمدة خمس دقائق أكثر فائدة من قراءة القاعدة وحدها.`);
add('مراجعة + محادثة دقيقتين','مراجعة','اصنع محادثة متكاملة عن روتينك ومنزلك ودراستك.',
`je me réveille|أستيقظ;je travaille|أعمل;la maison|البيت;ensuite|بعد ذلك;mais|لكن;parce que|لأن`,
`Je me réveille tôt parce que j'étudie.|أستيقظ مبكرا لأنني أدرس.;Ma maison est près de l'université.|منزلي قريب من الجامعة.;Ensuite, je travaille.|ثم أعمل.;Le soir, je rentre à la maison.|مساء أعود إلى المنزل.`,
`تحدث لمدة دقيقتين عن يومك مستعملا 3 أدوات ربط.`,
`اختر الجملة الصحيحة.`,`Je me réveille à sept heures.|Je réveille me à sept heures.|Je me réveilles à sept heures.`,0,
`حاول أن تتحدث دون قراءة ورقة، ولو كانت الجمل قصيرة.`);

// SEMAINE 4
add('المستقبل القريب — futur proche','قواعد','عبّر عن الخطط القريبة بـ aller في الحاضر + مصدر الفعل.',
`je vais étudier|سأدرس;tu vas partir|ستغادر;il va venir|سيأتي;nous allons lire|سنقرأ;vous allez travailler|ستعملون;demain|غدا`,
`Demain, je vais étudier.|غدا سأدرس.;Nous allons voyager samedi.|سنسافر يوم السبت.;Je vais préparer un article.|سأحضّر مقالا.;Elle va venir demain.|ستأتي غدا.`,
`اكتب خمس خطط للأسبوع المقبل بصيغة futur proche.`,
`أي جملة تصف المستقبل القريب؟`,`Je vais lire.|Je lis hier.|J'ai lu demain.`,0,
`القاعدة: الفاعل + aller مصرّفا + الفعل في المصدر: Je vais travailler.`);
add('الماضي القريب — passé récent','قواعد','تحدث عن شيء انتهيت منه للتو بـ venir de + مصدر الفعل.',
`je viens de|انتهيت للتو من;tu viens de|انتهيت للتو من;il vient de|انتهى للتو من;nous venons de|انتهينا للتو من;vous venez de|انتهيتم للتو من;à l'instant|قبل لحظات`,
`Je viens de terminer mon travail.|أنهيت عملي للتو.;Nous venons de manger.|تناولنا الطعام للتو.;Elle vient de partir.|لقد غادرت للتو.;Je viens d'arriver.|وصلت للتو.`,
`اذكر أربعة أمور انتهيت منها اليوم بصيغة الماضي القريب.`,
`أكمل: Je ... de rentrer.`,`viens|vais|suis`,0,
`تُختصر de إلى d’ قبل حرف صوتي: Je viens d’arriver.`);
add('مفردات السفر','مفردات','استعد لمحادثات التنقل والحجز والسؤال عن السفر.',
`le voyage|السفر;le billet|التذكرة;le passeport|جواز السفر;le train|القطار;l'aéroport|المطار;la valise|الحقيبة;la réservation|الحجز`,
`Je voudrais réserver un billet.|أود حجز تذكرة.;Où est l'aéroport ?|أين المطار؟;Mon train part à huit heures.|ينطلق قطاري في الثامنة.;J'ai mon passeport.|لدي جواز سفري.`,
`مثّل حوارا لحجز تذكرة ذهاب إلى مدينة أخرى.`,
`ما معنى le billet؟`,`التذكرة|الحقيبة|المحطة`,0,
`عبارة un billet aller-retour تعني تذكرة ذهاب وإياب.`);
add('مفردات العمل','مفردات','تحدث عن المهنة والمؤسسة والمهام اليومية.',
`le travail|العمل;le métier|المهنة;le bureau|المكتب;le collègue|الزميل;la réunion|الاجتماع;le projet|المشروع;la recherche|البحث`,
`Je travaille sur un projet.|أعمل على مشروع.;J'ai une réunion demain.|لدي اجتماع غدا.;Je fais de la recherche en géographie.|أقوم ببحث في الجغرافيا.;Mon bureau est à l'université.|مكتبي في الجامعة.`,
`قدّم عملك أو دراستك في خمس جمل بسيطة.`,
`ما معنى la réunion؟`,`البحث|الاجتماع|المشروع`,1,
`pour travailler sur = العمل على مشروع أو موضوع؛ مثال: sur un projet.`);
add('كتابة فقرة من 5 أو 6 جمل','كتابة','ادمج مفردات العمل والسفر مع الحديث عن المستقبل.',
`la semaine prochaine|الأسبوع المقبل;demain|غدا;je prépare|أحضّر;je vais|سوف;ensuite|ثم;finalement|في النهاية`,
`La semaine prochaine, je vais travailler.|الأسبوع المقبل سأعمل.;Je vais préparer ma présentation.|سأحضّر عرضي.;Ensuite, je vais lire des articles.|ثم سأقرأ مقالات.;Finalement, je vais me reposer.|وفي النهاية سأرتاح.`,
`اكتب فقرة من 6 جمل عن برنامج الأسبوع المقبل.`,
`أي عبارة تشير إلى المستقبل؟`,`hier|la semaine prochaine|avant-hier`,1,
`راجع توافق الزمن مع كل عبارة زمنية في الفقرة.`);
add('محادثة لمدة 3 دقائق','محادثة','تمرن على الحديث المتواصل عن السفر أو العمل أو الدراسة.',
`je pense|أعتقد;je voudrais|أود;je vais|سوف;par exemple|مثلا;ensuite|بعد ذلك;merci de|شكرا على`,
`Je voudrais visiter Paris.|أود زيارة باريس.;Je vais préparer mon voyage.|سأحضّر سفري.;Je pense que c'est intéressant.|أرى أن هذا مثير للاهتمام.;Par exemple, je vais visiter un musée.|مثلا سأزور متحفا.`,
`تحدث ثلاث دقائق عن رحلة تخطط لها أو مشروع مهني قادم.`,
`كيف تبدأ التعبير عن الرغبة بأدب؟`,`Je voudrais...|J'ai été...|Je viens de...`,0,
`استعمل كلمات ملء طبيعية عند التردد مثل alors أو eh bien دون الإفراط فيها.`);
add('مراجعة شاملة للأسبوع الرابع','مراجعة','قارن ما ستفعله بما انتهيت منه للتو.',
`je vais écrire|سأكتب;je viens d'écrire|كتبت للتو;le voyage|السفر;le travail|العمل;demain|غدا;à l'instant|للتو`,
`Je vais envoyer un message.|سأرسل رسالة.;Je viens d'envoyer un message.|أرسلت رسالة للتو.;Nous allons partir demain.|سنغادر غدا.;Nous venons d'arriver.|وصلنا للتو.`,
`اكتب أربع جمل في المستقبل القريب وأربع جمل في الماضي القريب.`,
`ما الصحيح للتعبير عن «لقد وصلت للتو»؟`,`Je vais arriver.|Je viens d'arriver.|J'arrive demain.`,1,
`تميّز الصيغتين: aller + infinitif للمستقبل، وvenir de + infinitif للماضي القريب.`);

// SEMAINE 5
add('الماضي المركب مع être','قواعد','تعلم استعمال être مساعدا مع بعض أفعال الحركة والأفعال الضميرية.',
`je suis allé|ذهبت (مذكر);elle est arrivée|وصلت;il est parti|غادر;nous sommes venus|أتينا;elles sont sorties|خرجن;hier|أمس`,
`Je suis allé à la faculté.|ذهبت إلى الكلية.;Elle est arrivée tôt.|وصلت باكرا.;Nous sommes partis le matin.|غادرنا صباحا.;Je me suis réveillé tôt.|استيقظت مبكرا.`,
`كوّن خمس جمل عن تنقلاتك أمس باستعمال être.`,
`أكمل: Elle ... arrivée.`,`a|est|va`,1,
`مع être يتوافق اسم المفعول مع جنس الفاعل وعدده غالبا: allé, allée, allés, allées.`);
add('الماضي المركب مع avoir','قواعد','استعمل avoir مع غالبية الأفعال لسرد أحداث منتهية.',
`j'ai parlé|تحدثت;j'ai étudié|درست;j'ai mangé|أكلت;j'ai lu|قرأت;j'ai fait|فعلت;j'ai eu|كان لدي;la semaine dernière|الأسبوع الماضي`,
`J'ai étudié hier.|درست أمس.;J'ai lu un article.|قرأت مقالا.;Nous avons travaillé ensemble.|عملنا معا.;J'ai fait une carte.|أنجزت خريطة.`,
`اكتب ستة أفعال أنجزتها أمس باستعمال passé composé.`,
`أكمل: Nous ... préparé le cours.`,`sommes|avons|allons`,1,
`القاعدة العامة: avoir في الحاضر + participe passé، مع استثناءات مهمة.`);
add('ضمائر المفعول به','قواعد','تجنب تكرار الاسم باستعمال الضمائر المباشرة مثل le وla وles.',
`me|ني;te|ك;le|إياه (مذكر);la|إياها (مؤنث);nous|نا;vous|كم;les|إياهم / إياهن`,
`Je lis le livre. Je le lis.|أقرأ الكتاب. أقرؤه.;Je connais Sara. Je la connais.|أعرف سارة. أعرفها.;Je vois les étudiants. Je les vois.|أرى الطلاب. أراهم.;Tu me comprends ?|هل تفهمني؟`,
`اكتب أربع جمل، ثم استبدل المفعول به فيها بالضمير المناسب.`,
`أكمل: Je regarde la carte. Je ... regarde.`,`le|la|les`,1,
`ضمير المفعول المباشر يسبق الفعل المصرف عادة: Je la regarde.`);
add('جمل للتعبير عن الرأي','محادثة','تعلم كيف تعرض رأيك وتوافق أو تختلف باحترام.',
`je pense que|أظن أن;à mon avis|في رأيي;je crois que|أعتقد أن;je suis d'accord|أنا موافق;je ne suis pas d'accord|لست موافقا;c'est important|هذا مهم`,
`À mon avis, la lecture est utile.|في رأيي القراءة مفيدة.;Je pense que le français est important.|أرى أن الفرنسية مهمة.;Je suis d'accord avec vous.|أنا أتفق معكم.;Je ne suis pas d'accord sur ce point.|لا أتفق في هذه النقطة.`,
`تحدث عن أهمية تعلم اللغات وقدم رأيين مختلفين.`,
`ما ترجمة «في رأيي»؟`,`À mon avis|À demain|À bientôt`,0,
`ابدأ الرأي بـ Je pense que، ثم قدّم سببا باستخدام parce que.`);
add('مفردات الهوايات','مفردات','وصف ما تحب القيام به في وقت الفراغ.',
`la lecture|القراءة;la musique|الموسيقى;le cinéma|السينما;le sport|الرياضة;la photographie|التصوير;la randonnée|التنزه مشيا;écrire|يكتب`,
`J'aime lire des romans.|أحب قراءة الروايات.;Je fais de la photographie.|أمارس التصوير.;Le week-end, je marche.|في نهاية الأسبوع أمشي.;J'aime écrire des histoires.|أحب كتابة القصص.`,
`اكتب سبع جمل حول هواياتك وما تحبه وما لا تفضله.`,
`ما معنى la lecture؟`,`الكتابة|القراءة|التصوير`,1,
`بعد aimer يمكنك وضع الفعل في المصدر: J’aime lire.`);
add('قراءة نص فرنسي قصير','قراءة','اقرأ ببطء واستخرج المعلومة الأساسية قبل الترجمة.',
`le texte|النص;le titre|العنوان;le personnage|الشخصية;l'histoire|القصة;le début|البداية;la fin|النهاية`,
`Karim habite à Fès.|كريم يسكن في فاس.;Chaque matin, il va à l'université.|كل صباح يذهب إلى الجامعة.;Hier, il a lu un livre.|أمس قرأ كتابا.;Il aime apprendre le français.|يحب تعلم الفرنسية.`,
`اقرأ الجمل الأربع ثم لخص القصة في ثلاث جمل فرنسية.`,
`Où habite Karim ?`,`À Fès.|À Paris.|À Rabat.`,0,
`لا تترجم كل كلمة. اسأل: من؟ أين؟ ماذا يفعل؟ متى؟`);
add('مراجعة + محادثة 5 دقائق','مراجعة','ادمج الماضي المركب والهوايات والتعبير عن الرأي.',
`hier|أمس;j'ai fait|فعلت;je suis allé|ذهبت;à mon avis|في رأيي;j'aime|أحب;ensuite|ثم`,
`Hier, je suis allé à la bibliothèque.|أمس ذهبت إلى المكتبة.;J'ai lu un article scientifique.|قرأت مقالا علميا.;À mon avis, c'est important.|في رأيي هذا مهم.;J'aime apprendre chaque jour.|أحب التعلم يوميا.`,
`سجّل حديثا من خمس دقائق عن يوم سابق وما تعلمته منه.`,
`أي جملة صحيحة في الماضي المركب؟`,`J'ai allé au marché.|Je suis allé au marché.|Je vais allé au marché.`,1,
`ركز على توصيل المعنى قبل محاولة تصحيح كل خطأ أثناء الحديث.`);

// SEMAINE 6
add('مراجعة الأزمنة الأساسية','قواعد','قارن الحاضر بالماضي المركب والمستقبل القريب والماضي القريب.',
`aujourd'hui|اليوم;hier|أمس;demain|غدا;je travaille|أعمل;j'ai travaillé|عملت;je vais travailler|سأعمل;je viens de travailler|انتهيت للتو من العمل`,
`Aujourd'hui, j'étudie.|اليوم أدرس.;Hier, j'ai étudié.|أمس درست.;Demain, je vais étudier.|غدا سأدرس.;Je viens de terminer.|انتهيت للتو.`,
`اكتب فعلا واحدا في الأزمنة الأربعة، ثم كرر مع فعلين آخرين.`,
`أي عبارة تدل على الماضي المركب؟`,`J'ai écrit.|Je vais écrire.|J'écris.`,0,
`اربط كل زمن بعبارة زمنية مناسبة لتثبيت المعنى.`);
add('مفردات التسوق','مفردات','اسأل عن السعر والمقاس والكميات في المتجر.',
`le magasin|المتجر;le prix|الثمن;cher|غالي;bon marché|رخيص / بسعر مناسب;la taille|المقاس;acheter|يشتري;payer|يدفع`,
`Combien ça coûte ?|كم ثمن هذا؟;C'est trop cher.|هذا غال جدا.;Je voudrais acheter ce livre.|أود شراء هذا الكتاب.;Vous avez une autre taille ?|هل لديكم مقاس آخر؟`,
`مثّل محادثة لشراء كتاب أو قميص والسؤال عن السعر.`,
`كيف تسأل عن الثمن؟`,`Où ça va ?|Combien ça coûte ?|Qui êtes-vous ?`,1,
`تعبير السعر: Ça coûte vingt euros. لاحظ أن bon marché تعني غير مكلف.`);
add('مفردات الصحة','مفردات','تعلم التعبير عن حالة صحية بسيطة أو طلب المساعدة.',
`la santé|الصحة;le médecin|الطبيب;la pharmacie|الصيدلية;la douleur|الألم;la fièvre|الحمى;la tête|الرأس;se reposer|يستريح`,
`J'ai mal à la tête.|رأسي يؤلمني.;J'ai de la fièvre.|لدي حمى.;Je voudrais voir un médecin.|أود رؤية طبيب.;Je dois me reposer.|يجب أن أستريح.`,
`كوّن حوارا قصيرا داخل صيدلية للتعبير عن ألم بسيط.`,
`كيف تقول «رأسي يؤلمني»؟`,`Je suis la tête.|J'ai mal à la tête.|Je vais la tête.`,1,
`J’ai mal à + جزء الجسم: J’ai mal au dos، J’ai mal aux yeux.`);
add('كتابة فقرة من 8 أو 9 جمل','كتابة','اكتب موضوعا قصيرا مترابطا مستعملا أكثر من زمن.',
`premièrement|أولا;ensuite|ثم;hier|أمس;aujourd'hui|اليوم;demain|غدا;en conclusion|في الختام`,
`Hier, j'ai visité la bibliothèque.|أمس زرت المكتبة.;Aujourd'hui, je prépare mon travail.|اليوم أحضّر عملي.;Demain, je vais étudier davantage.|غدا سأدرس أكثر.;En conclusion, j'aime apprendre.|في الختام أحب التعلم.`,
`اكتب 9 جمل حول نشاط علمي: ماذا فعلت؟ ماذا تفعل؟ ماذا ستفعل؟`,
`أي تعبير يناسب الخاتمة؟`,`En conclusion|Hier|Pourquoi`,0,
`اقرأ الفقرة ثم احذف التكرار وأضف رابطين على الأقل.`);
add('تدريب النطق والربط','نطق','قوّ وضوحك بتحسين الإيقاع وربط الكلمات الشائعة.',
`vous avez|لديكم;nous allons|سنذهب;les étudiants|الطلاب;très intéressant|مثير جدا;deux heures|ساعتان;ils ont|لديهم`,
`Nous allons à l'université.|نذهب إلى الجامعة.;Vous avez une question ?|هل لديكم سؤال؟;Les étudiants ont terminé.|أنهى الطلاب.;C'est très intéressant !|هذا مثير جدا!`,
`استمع إلى كل جملة وكررها مع مطابقة الإيقاع والنبر.`,
`أي عبارة يظهر فيها وصل شائع بين les وكلمة تالية؟`,`les étudiants|les livres|les cartes`,0,
`تدرّب على المجموعات الصوتية الكاملة، وليس الكلمات منفصلة.`);
add('محادثة لمدة 7 دقائق','محادثة','تمرن على حوار يمتد لسبع دقائق عن الحياة والاهتمامات.',
`je voudrais parler de|أود أن أتحدث عن;selon moi|حسب رأيي;en général|بشكل عام;par exemple|مثلا;en revanche|بالمقابل;pour finir|للختام`,
`Je voudrais parler de mes études.|أود التحدث عن دراستي.;Selon moi, la recherche est importante.|في نظري البحث مهم.;Par exemple, j'utilise des cartes.|مثلا أستعمل خرائط.;Pour finir, merci pour votre écoute.|في الختام شكرا لحسن الاستماع.`,
`سجل حوارا من 7 دقائق عن الدراسة والحياة اليومية والهوايات.`,
`أي عبارة مناسبة لبدء عرض موضوع؟`,`Je voudrais parler de...|Je suis mal à...|J'ai un livre de...`,0,
`قسّم المحادثة إلى تعريف، وتفاصيل، ورأي، وخاتمة.`);
add('مراجعة شاملة للأسبوع السادس','مراجعة','اختبر قدرتك على اختيار الزمن والمفردات المناسبة للموقف.',
`le prix|السعر;la santé|الصحة;j'ai acheté|اشتريت;je vais acheter|سأشتري;j'ai mal à|يؤلمني;selon moi|حسب رأيي`,
`Hier, j'ai acheté un livre.|أمس اشتريت كتابا.;Demain, je vais voir le médecin.|غدا سأزور الطبيب.;Selon moi, la santé est importante.|في رأيي الصحة مهمة.;Combien coûte ce produit ?|كم ثمن هذا المنتج؟`,
`راجع اختبارات هذا الأسبوع وأعد الإجابة عن الأسئلة دون مساعدة.`,
`اختر المستقبل القريب الصحيح.`,`Je vais acheter un livre.|J'ai acheté un livre.|J'achète hier.`,0,
`خصص وقت المراجعة لأصعب ثلاث قواعد واجهتها في الأيام السابقة.`);

// SEMAINE 7
add('وصف الأشخاص','مفردات','صف المظهر والصفات بطريقة مهذبة ومباشرة.',
`grand|طويل;petit|قصير / صغير;gentil|لطيف;sérieux|جاد;calme|هادئ;jeune|شاب;les cheveux|الشعر`,
`Mon ami est grand et calme.|صديقي طويل وهادئ.;Elle a les cheveux noirs.|شعرها أسود.;Ce professeur est sérieux.|هذا الأستاذ جاد.;Il est très gentil.|هو لطيف جدا.`,
`صف شخصا تعرفه في 6 جمل تشمل المظهر والصفات.`,
`كيف تقول «هي لطيفة»؟`,`Elle est gentil.|Elle est gentille.|Elle a gentil.`,1,
`الصفة غالبا تتوافق مع جنس الاسم: gentil / gentille.`);
add('وصف الأماكن','مفردات','استعمل الصفات والاتجاهات لوصف فضاء مألوف.',
`vaste|واسع;propre|نظيف;calme|هادئ;animé|حيوي;ancien|قديم;moderne|حديث;au centre|في المركز`,
`Oujda est une ville agréable.|وجدة مدينة جميلة للعيش.;La bibliothèque est calme.|المكتبة هادئة.;Le laboratoire est moderne.|المختبر حديث.;La place est au centre-ville.|الساحة في وسط المدينة.`,
`صف مكان عملك أو جامعتك في ست جمل.`,
`ما معنى moderne؟`,`حديث|قديم|صاخب`,0,
`استعمل Il y a لإضافة تفاصيل: Il y a une grande salle.`);
add('وصف الأحداث','محادثة','احكِ باختصار ما حدث وأين ومتى ومن شارك.',
`l'événement|الحدث;la conférence|الندوة;la séance|الحصة;le public|الجمهور;le débat|النقاش;présenter|يعرض;participer|يشارك`,
`Hier, j'ai assisté à une conférence.|أمس حضرت ندوة.;La séance a commencé à neuf heures.|بدأت الحصة في التاسعة.;Le public a posé des questions.|طرح الجمهور أسئلة.;J'ai présenté mon travail.|قدمت عملي.`,
`احكِ في دقيقة عن نشاط أو محاضرة حضرتها سابقا.`,
`أي جملة تصف حدثا ماضيا؟`,`Je vais présenter demain.|J'ai présenté hier.|Je présente maintenant.`,1,
`بنية وصف الحدث: التاريخ → المكان → المشاركون → ما حدث → النتيجة.`);
add('مفردات المشاعر','مفردات','تحدث عن حالتك الشعورية وردود أفعالك في مواقف مختلفة.',
`heureux|سعيد;triste|حزين;inquiet|قلق;fatigué|متعب;motivé|متحفز;surpris|متفاجئ;fier|فخور`,
`Je suis heureux aujourd'hui.|أنا سعيد اليوم.;Je suis motivé pour apprendre.|أنا متحفز للتعلم.;Elle est inquiète avant l'examen.|هي قلقة قبل الامتحان.;Je suis fier de mon travail.|أنا فخور بعملي.`,
`اكتب أربع جمل عن شعورك في مواقف دراسية مختلفة.`,
`ما معنى motivé؟`,`متحفز|حزين|متفاجئ`,0,
`مع الشعور يمكن استعمال être: Je suis fatigué، Je suis content.`);
add('كتابة فقرة من 8 جمل','كتابة','صف حدثا أو شخصا أو مكانا في فقرة مركزة من ثماني جمل.',
`il y a|يوجد;près de|قرب;d'abord|أولا;puis|ثم;finalement|أخيرا;agréable|مريح / جميل`,
`Mon université est grande.|جامعتي كبيرة.;Il y a plusieurs salles.|هناك قاعات كثيرة.;Les étudiants sont motivés.|الطلبة متحفزون.;J'aime cet endroit.|أحب هذا المكان.`,
`اكتب ثماني جمل بالضبط عن جامعتك أو مدينة تعرفها.`,
`ما التعبير الذي يعني «يوجد»؟`,`Il y a|Il va|Il est allé`,0,
`خصص كل جملة لتفصيل مختلف حتى لا تتكرر الفكرة نفسها.`);
add('محادثة لمدة 10 دقائق','محادثة','انتقل من الجمل القصيرة إلى حديث ذي تسلسل منطقي.',
`pour commencer|للبداية;je voudrais expliquer|أود أن أشرح;par exemple|مثلا;cependant|ومع ذلك;à mon avis|في رأيي;pour conclure|للخاتمة`,
`Pour commencer, je me présente.|للبداية أعرّف بنفسي.;Je voudrais expliquer mon projet.|أود شرح مشروعي.;Cependant, il y a des difficultés.|ومع ذلك توجد صعوبات.;Pour conclure, je vous remercie.|في الختام أشكركم.`,
`سجّل عرضا من 10 دقائق عن نفسك واهتماماتك ودراستك.`,
`أي عبارة مناسبة للخاتمة؟`,`Pour conclure|Pour commencer|D'abord`,0,
`ضع أمامك ثلاث كلمات مفتاحية لكل محور بدل قراءة نص كامل.`);
add('مراجعة الأسبوع السابع','مراجعة','اجمع الوصف والمشاعر والتعبير عن أحداث ماضية.',
`calme|هادئ;moderne|حديث;heureux|سعيد;la conférence|الندوة;j'ai participé|شاركت;à mon avis|في رأيي`,
`La ville est moderne et calme.|المدينة حديثة وهادئة.;J'ai participé à une conférence.|شاركت في ندوة.;Je suis heureux de cette expérience.|أنا سعيد بهذه التجربة.;À mon avis, elle était utile.|في رأيي كانت مفيدة.`,
`اكتب وصفا لحدث في 8 جمل، ثم اقرأه دون توقف.`,
`أكمل: J'... participé à la conférence.`,`ai|suis|vais`,0,
`راجع الفرق بين وصف حالة ثابتة être وبين سرد فعل ماض avoir/être.`);

// SEMAINE 8
add('قراءة نصوص قصيرة','قراءة','اقرأ نصا متصلا واستخرج الأشخاص والزمن والأفعال الرئيسية.',
`le sujet|الموضوع;l'auteur|الكاتب;le paragraphe|الفقرة;le mot-clé|الكلمة المفتاحية;comprendre|يفهم;résumer|يلخص`,
`Nadia étudie la géographie à Oujda.|نادية تدرس الجغرافيا في وجدة.;Hier, elle a visité une rivière.|أمس زارت نهرا.;Elle a pris des photos.|التقطت صورا.;Demain, elle va rédiger un rapport.|غدا ستكتب تقريرا.`,
`اقرأ النص ثم استخرج: من؟ أين؟ ماذا فعلت أمس؟ ماذا ستفعل غدا؟`,
`Que va faire Nadia demain ?`,`Rédiger un rapport.|Acheter un billet.|Faire du sport.`,0,
`افهم أولا المعنى العام، ثم عد إلى التفاصيل غير الواضحة.`);
add('تكوين أسئلة','قواعد','استعمل الاستفهام بنبرة السؤال وبـ est-ce que عند الحاجة.',
`est-ce que|هل;quel|أي / ما (مذكر);quelle|أي / ما (مؤنث);combien|كم;depuis quand|منذ متى;avec qui|مع من`,
`Est-ce que vous parlez français ?|هل تتحدثون الفرنسية؟;Quel est votre projet ?|ما مشروعكم؟;Depuis quand étudiez-vous ?|منذ متى تدرسون؟;Avec qui travaillez-vous ?|مع من تعملون؟`,
`اكتب ثمانية أسئلة مناسبة لحوار مع أستاذ أو زميل.`,
`أي تركيب يصوغ سؤالا مباشرا؟`,`Est-ce que vous êtes prêt ?|Parce que vous êtes prêt.|Vous être prêt.`,0,
`يمكن تكوين سؤال بسيط برفع النبرة: Vous travaillez ici ?`);
add('التحدث عن الماضي','محادثة','احك قصة بسيطة باستعمال الماضي المركب وروابط التسلسل.',
`hier matin|صباح أمس;d'abord|أولا;puis|ثم;après|بعد;finalement|في النهاية;j'ai visité|زرت;je suis rentré|عدت`,
`Hier, j'ai visité un village.|أمس زرت قرية.;J'ai rencontré des habitants.|التقيت سكانا.;Ensuite, j'ai pris des photos.|ثم التقطت صورا.;Finalement, je suis rentré chez moi.|في النهاية عدت إلى منزلي.`,
`احكِ بصوتك تجربة شخصية سابقة في دقيقة ونصف.`,
`أي فعل يستخدم être هنا؟`,`Je suis rentré.|J'ai visité.|J'ai rencontré.`,0,
`للأحداث المتتابعة استخدم d’abord، ensuite، enfin.`);
add('التحدث عن المستقبل','محادثة','اشرح ما تخطط له للأيام القادمة وللدراسة والعمل.',
`bientôt|قريبا;l'année prochaine|العام المقبل;je vais préparer|سأحضر;je compte|أنوي;mon objectif|هدفي;j'espère|آمل`,
`Je vais terminer mon projet.|سأنهي مشروعي.;L'année prochaine, je vais voyager.|العام المقبل سأسافر.;Mon objectif est de parler français.|هدفي هو التحدث بالفرنسية.;J'espère progresser rapidement.|آمل أن أتقدم بسرعة.`,
`تحدث عن ثلاثة أهداف شخصية وعلمية للأشهر المقبلة.`,
`ما معنى bientôt؟`,`قريبا|أمس|دائما`,0,
`Je compte + infinitif وJ’espère + infinitif مفيدان للتعبير عن النية والأمل.`);
add('محادثة لمدة 11 دقيقة','محادثة','درّب نفسك على ربط الخبرات الماضية والخطط المستقبلية.',
`mon expérience|تجربتي;mon objectif|هدفي;auparavant|سابقا;maintenant|حاليا;plus tard|لاحقا;en résumé|باختصار`,
`Auparavant, j'ai étudié les cartes.|سابقا درست الخرائط.;Maintenant, je travaille sur ma recherche.|حاليا أعمل على بحثي.;Plus tard, je vais publier un article.|لاحقا سأنشر مقالا.;En résumé, je veux progresser.|باختصار أريد التقدم.`,
`سجل حديثا من 11 دقيقة عن الماضي والحاضر والمستقبل.`,
`ما العبارة التي تعني «لاحقا»؟`,`Plus tard|Hier|À l'instant`,0,
`عندما تنسى كلمة، حاول شرحها بعبارة أبسط بدلا من التوقف.`);
add('كتابة فقرة من 12 جملة','كتابة','اكتب نصا منظما بأزمنة وروابط متنوعة.',
`introduction|مقدمة;développement|عرض;conclusion|خاتمة;en effet|فعلا;cependant|مع ذلك;ainsi|وهكذا`,
`Je suis passionné par la géographie.|أنا شغوف بالجغرافيا.;J'ai réalisé plusieurs cartes.|أنجزت عدة خرائط.;Aujourd'hui, j'apprends le français.|اليوم أتعلم الفرنسية.;Je vais continuer mes recherches.|سأواصل أبحاثي.`,
`اكتب 12 جملة موزعة على مقدمة (2) وعرض (8) وخاتمة (2).`,
`أي رابط للتعارض؟`,`cependant|ainsi|et`,0,
`اقرأ النص مرتين؛ مرة للمعنى ومرة للأزمنة والاتفاق النحوي.`);
add('مراجعة شاملة للأسبوع الثامن','مراجعة','اختبر القراءة والكتابة والسؤال وسرد الماضي والمستقبل.',
`j'ai fait|فعلت;je vais faire|سأفعل;combien|كم;depuis quand|منذ متى;en résumé|باختصار;cependant|مع ذلك`,
`Qu'avez-vous fait hier ?|ماذا فعلتم أمس؟;J'ai étudié toute la journée.|درست طوال اليوم.;Qu'allez-vous faire demain ?|ماذا ستفعلون غدا؟;Demain, je vais travailler.|غدا سأعمل.`,
`اقرأ نصا ثم اكتب ملخصا من 5 جمل، وأنجز محادثة قصيرة.`,
`أي عبارة تسأل عن المدة منذ البداية؟`,`Depuis quand ?|Combien ça coûte ?|Où allez-vous ?`,0,
`في هذه المرحلة ركز على الفهم والتواصل، لا على حفظ كلمات كثيرة دفعة واحدة.`);

// SEMAINE 9
add('مراجعة المفردات','مراجعة','راجع الكلمات الأساسية عبر مواضيع الحياة والجامعة والسفر.',
`l'université|الجامعة;la famille|العائلة;la gare|المحطة;le médecin|الطبيب;la recherche|البحث;la conférence|الندوة;le voyage|السفر`,
`Je travaille à l'université.|أعمل في الجامعة.;J'ai assisté à une conférence.|حضرت ندوة.;Ma famille habite au Maroc.|عائلتي تسكن في المغرب.;Je prépare un voyage.|أحضر رحلة.`,
`راجع مفردات الأيام السابقة وصنف 30 كلمة إلى 5 مجموعات.`,
`ما الكلمة التي تعني «البحث»؟`,`la recherche|le voyage|la santé`,0,
`استخدم كل كلمة تراجعها في جملة شخصية حتى ترسخ في الذاكرة.`);
add('مراجعة الأزمنة','مراجعة','قارن الأزمنة الأربعة الأساسية في أمثلة من حياتك.',
`je présente|أقدم;je vais présenter|سأقدم;je viens de présenter|قدمت للتو;j'ai présenté|قدمت في الماضي;hier|أمس;demain|غدا`,
`Aujourd'hui, je présente un travail.|اليوم أقدم عملا.;Hier, j'ai présenté une carte.|أمس قدمت خريطة.;Je viens de présenter mon projet.|قدمت مشروعي للتو.;Demain, je vais présenter un article.|غدا سأقدم مقالا.`,
`اكتب أربع جمل عن موضوع واحد؛ جملة لكل زمن.`,
`أي جملة تعني «قدمت مشروعي للتو»؟`,`J'ai présenté mon projet hier.|Je viens de présenter mon projet.|Je vais présenter mon projet.`,1,
`لا تخلط بين passé récent وpassé composé؛ الأول يوحي بحدث وقع منذ لحظات.`);
add('محادثة لمدة 13 دقيقة','محادثة','اجمع مهاراتك في عرض مطول يتضمن التعريف والسرد والرأي والتخطيط.',
`je me présente|أقدم نفسي;mon parcours|مساري;mon projet|مشروعي;j'ai appris|تعلمت;je vais continuer|سأواصل;pour conclure|في الختام`,
`Je m'appelle Zakaria El Mahjoubi.|اسمي زكرياء المحجوبي.;Je fais des recherches en géographie.|أجري أبحاثا في الجغرافيا.;J'ai appris beaucoup de choses.|تعلمت أشياء كثيرة.;Je vais continuer à pratiquer le français.|سأواصل ممارسة الفرنسية.`,
`قسّم تسجيلك 13 دقيقة إلى: التعريف (2)، المسار (3)، تجربة (3)، رأي (3)، مستقبل (2).`,
`ما الصيغة المناسبة للحديث عن أمر تعلمته في الماضي؟`,`J'ai appris.|Je vais apprendre.|J'apprends demain.`,0,
`قيّم التسجيل وفق أربعة معايير: الوضوح، المفردات، الأزمنة، استمرار الكلام.`);
add('تقييم المستوى النهائي','تقييم','اختبر قدرتك في أربعة مجالات وتحقق من تقدمك بعد ستين يوما.',
`comprendre|يفهم;parler|يتحدث;écrire|يكتب;lire|يقرأ;progresser|يتقدم;réviser|يراجع;continuer|يواصل`,
`Je peux me présenter en français.|أستطيع تقديم نفسي بالفرنسية.;Je comprends des phrases simples.|أفهم جملا بسيطة.;Je peux écrire un petit texte.|أستطيع كتابة نص قصير.;Je vais continuer à apprendre.|سأواصل التعلم.`,
`اختبار ختامي: تقديم شفهي 5 دقائق + قراءة نص + كتابة 100 كلمة + الاستماع إلى حوار بسيط.`,
`أي فعل يعني «يفهم»؟`,`écrire|comprendre|voyager`,1,
`النتيجة مؤشر تعلّم شخصي، وليست شهادة رسمية بمستوى CEFR.`);

if (LESSONS.length !== 60) throw new Error('Expected 60 lessons, got '+LESSONS.length);
