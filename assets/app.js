/* Français 60 · A private, local-first learning companion for Zakaria El Mahjoubi. */
(() => {
  'use strict';
  const STORAGE_KEY = 'francais-zakaria-60-v1';
  const DEFAULT_START = '2026-11-03';
  const SKILLS = [ ['listening','الاستماع','🎧'], ['speaking','المحادثة','🗣️'], ['reading','القراءة','📖'], ['writing','الكتابة','✍️'] ];
  const WEEK_NAMES = ['الأول','الثاني','الثالث','الرابع','الخامس','السادس','السابع','الثامن','التاسع'];
  const ICONS = {محادثة:'illustration-talk.svg',قواعد:'illustration-grammar.svg',مفردات:'illustration-vocab.svg',مراجعة:'illustration-review.svg',نطق:'illustration-talk.svg',كتابة:'illustration-study.svg',قراءة:'illustration-study.svg',تقييم:'illustration-review.svg'};
  const PRACTICES = ['قرأت الشرح وفهمت الفكرة','استمعت إلى الأمثلة وكررتها','كتبت جملا أو أتممت المهمة','تدربت على التحدث بصوت مسموع'];
  const main = document.getElementById('main-content');
  const toastEl = document.getElementById('toast');
  let state = load();
  let activeWeek = -1;
  let filter = 'all';
  let search = '';
  let toastTimer = null;

  function blank(){return {start:DEFAULT_START,done:{},practice:{},quiz:{},notes:{},skills:{listening:0,speaking:0,reading:0,writing:0}};}
  function load(){
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!raw || typeof raw !== 'object') return blank();
      return clean(raw);
    } catch(e) {return blank();}
  }
  function clean(raw){
    const result = blank();
    if (typeof raw.start==='string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.start) && !Number.isNaN(Date.parse(raw.start))) result.start=raw.start;
    for (const type of ['done','practice','quiz','notes']) {
      if(raw[type] && typeof raw[type]==='object' && !Array.isArray(raw[type])){
        for(let i=1;i<=60;i++){
          const k=String(i), v=raw[type][k];
          if(type==='done' && typeof v === 'string') result.done[k]=v.slice(0,32);
          if(type==='practice' && Array.isArray(v)) result.practice[k]=v.slice(0,4).map(Boolean);
          if(type==='quiz' && v && Number.isInteger(v.selected) && v.selected>=0 && v.selected<3) result.quiz[k]={selected:v.selected,correct:v.selected===LESSONS[i-1].quiz.answer};
          if(type==='notes' && typeof v === 'string') result.notes[k]=v.slice(0,3000);
        }
      }
    }
    if(raw.skills && typeof raw.skills==='object') SKILLS.forEach(([id])=>{const v=Number(raw.skills[id]); result.skills[id]=Number.isFinite(v)?Math.max(0,Math.min(5,Math.round(v))):0;});
    return result;
  }
  function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));return true;}catch(e){toast('تعذر الحفظ في المتصفح. تحقق من وضع التصفح الخاص.');return false;}}
  function dateUTC(str){const [y,m,d]=str.split('-').map(Number);return Date.UTC(y,m-1,d);}
  function dayDate(id){let d=new Date(dateUTC(state.start));d.setUTCDate(d.getUTCDate()+id-1);return d.toISOString().slice(0,10);}
  function todayString(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
  function todayIndex(){return Math.max(1,Math.min(60,Math.floor((dateUTC(todayString())-dateUTC(state.start))/86400000)+1));}
  function dueIndex(){return Math.floor((dateUTC(todayString())-dateUTC(state.start))/86400000)+1;}
  function nextLesson(){let due=dueIndex(); if(due<1)return 1; for(let i=1;i<=Math.min(60,due);i++)if(!state.done[i])return i; for(let i=Math.min(60,due)+1;i<=60;i++)if(!state.done[i])return i;return 60;}
  function finished(){return Object.keys(state.done).filter(i=>Number(i)>=1&&Number(i)<=60).length;}
  function quizResults(){const a=Object.values(state.quiz);return {count:a.length,score:a.filter(x=>x.correct).length,pct:a.length?Math.round(100*a.filter(x=>x.correct).length/a.length):0};}
  function streak(){const days = new Set(Object.values(state.done).map(d=>typeof d==='string'?d.slice(0,10):'').filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)));
    if(!days.size)return 0; let date=todayString(); if(!days.has(date)){let y=new Date(dateUTC(date)-86400000);date=y.toISOString().slice(0,10);}let n=0;
    while(days.has(date)){n++;date=new Date(dateUTC(date)-86400000).toISOString().slice(0,10);}return n;
  }
  function esc(str){return String(str??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}
  function fmtDate(iso){const d=new Date(dateUTC(iso));return new Intl.DateTimeFormat('ar-MA',{day:'numeric',month:'long'}).format(d);}
  function fmtLongDate(iso){return new Intl.DateTimeFormat('ar-MA',{day:'numeric',month:'long',year:'numeric'}).format(new Date(dateUTC(iso)));}
  function lessonIcon(lesson){return './assets/'+(ICONS[lesson.category]||'illustration-study.svg');}
  function toast(msg){clearTimeout(toastTimer);toastEl.textContent=msg;toastEl.classList.add('toast-visible');toastTimer=setTimeout(()=>toastEl.classList.remove('toast-visible'),2700);}
  function status(id){return state.done[id]?'مكتمل':dayDate(id)>todayString()?'قادم':'قيد التعلم';}
  function updateNav(view){document.querySelectorAll('[data-nav]').forEach(el=>{const yes=el.dataset.nav===(view==='dashboard'?'dashboard':'lessons');el.classList.toggle('active',yes);if(yes)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
    document.getElementById('header-date').textContent=fmtLongDate(todayString());
    const title=view==='dashboard'?'لوحة التقدم':view==='lessons'?'جميع الدروس':'تفاصيل الدرس';
    document.getElementById('breadcrumb').innerHTML='مسار تعلّم الفرنسية <span>/</span> '+title;
  }
  function render(){
    const hash=decodeURIComponent(location.hash.slice(1));
    const match=/^day\/(\d+)$/.exec(hash);
    if(match){let id=Number(match[1]);if(id>=1&&id<=60){updateNav('detail');renderDetail(id);}else{location.hash='#lessons';} }
    else if(hash==='lessons'){updateNav('lessons');renderLessons();}
    else {updateNav('dashboard');renderDashboard();}
    window.scrollTo({top:0,behavior:'auto'});
  }
  function renderDashboard(){
    const done=finished(),pct=Math.round(done/60*100),q=quizResults(),daily=nextLesson(),task=LESSONS[daily-1];
    const level=done>=45?'A1 — ممارسة متقدمة':done>=20?'A1 — بناء المهارات':'A1 — مرحلة التأسيس';
    const h=new Date().getHours(),greeting=h<12?'صباح الخير':'مساء الخير';
    const badges=[['🌱','أول خطوة',done>=1],['🔥','7 أيام',streak()>=7],['📚','منتصف الطريق',done>=30],['🏆','أكملت 60 يوما',done===60]];
    main.innerHTML=`<div class="container">
      <div class="welcome-line"><div><p>${greeting}، زكرياء المحجوبي 👋</p><h1>لوحة تقدّمك الشخصي</h1></div><span class="welcome-chip">🇫🇷 Mon parcours</span></div>
      <section class="hero"><div class="hero-copy"><span class="hero-tag">✦ تحدي الفرنسية · 60 يوما</span><h2>Bonjour, Zakaria !</h2><p>خطوة صغيرة كل يوم نحو ثقة أكبر في التحدث بالفرنسية. استمر في رحلتك، وتتبّع كل إنجاز.</p><a class="btn btn-light" href="#day/${daily}">تابع درس اليوم <span aria-hidden="true">←</span></a></div><img class="hero-illustration" src="./assets/hero-france.svg" alt="رسم توضيحي لباريس وكتاب تعلم الفرنسية"></section>
      <div class="stats-grid">
        ${statCard('الدروس المكتملة',done+' / 60','✅','s-purple','إجمالي أيام التعلم')}
        ${statCard('سلسلة الاستمرار',streak()+' أيام','🔥','s-orange','أيام متتالية بالتاريخ')}
        ${statCard('دقة الاختبارات',q.count?q.pct+'%':'—','🎯','s-cyan',q.count+' اختبار مجاب عنه')}
        ${statCard('الأيام المتبقية',60-done,'📅','s-green','دروسا لم تكتمل بعد')}
      </div>
      <div class="section-row"><div><h2 class="section-title">نظرة عامة على رحلتك</h2><p class="section-subtitle">إنجازك من بداية البرنامج حتى اليوم</p></div><span class="level-tag">${level}</span></div>
      <div class="dashboard-split">
        <section class="panel"><h3 class="panel-title">التقدم الإجمالي</h3><p class="panel-desc">كل درس تضع عليه علامة الإتمام يقرّبك من الهدف</p><div class="progress-panel-inner"><div class="ring" style="--percent:${pct}%"><div class="ring-inner"><strong>${pct}%</strong><small>من البرنامج</small></div></div><div class="progress-info"><h4>${done===60?'أحسنت! اكتمل المسار 🎉':'ما زالت أمامك خطوات جميلة'}</h4><p>أنجزت <strong>${done}</strong> درسا من أصل 60. ${60-done?`يتبقى ${60-done} درسا.`:'يمكنك الآن مراجعة المواد كلها.'}</p><span class="progress-pill">● ${level}</span><div class="progress-meta">الموعد المخطط للانتهاء: ${fmtLongDate(dayDate(60))}</div></div></div></section>
        <section class="panel"><h3 class="panel-title">درسك المقترح الآن</h3><p class="panel-desc">اليوم ${daily} · الأسبوع ${Math.ceil(daily/7)}</p><div class="mini-lesson"><img src="${lessonIcon(task)}" alt="رسم توضيحي للدرس"/><div><span class="mini-label">اليوم ${daily} من 60</span><h4>${esc(task.title)}</h4><p>${esc(task.intro)}</p><a class="text-link" href="#day/${daily}">افتح الدرس ←</a></div></div><p class="note-hint">تاريخ هذا الدرس في خطتك: ${fmtLongDate(dayDate(daily))}.</p></section>
      </div>
      <div class="section-row"><div><h2 class="section-title">التقدم أسبوعا بأسبوع</h2><p class="section-subtitle">تابع مسار الأسابيع التسعة</p></div><a class="text-link" href="#lessons">عرض جميع الدروس</a></div>
      <div class="dashboard-split">
        <section class="panel"><h3 class="panel-title">مخطط الإنجاز</h3><p class="panel-desc">يمثل كل عمود أسبوعا واحدا من الخطة</p><div class="week-bars">${WEEK_NAMES.map((n,i)=>{const total=i===8?4:7,completed=LESSONS.slice(i*7,i*7+total).filter(x=>state.done[x.id]).length;return `<div class="week-bar" title="الأسبوع ${n}: ${completed} من ${total}"><div class="track"><div class="fill" style="height:${completed/total*100}%"></div></div><span>${i+1}</span></div>`}).join('')}</div><div class="achievements">${badges.map(([icon,name,unlocked])=>`<span class="achievement ${unlocked?'unlocked':''}">${icon} ${name}</span>`).join('')}</div></section>
        <section class="panel"><h3 class="panel-title">تقييمي الذاتي للمهارات</h3><p class="panel-desc">حرّك المؤشر من 0 إلى 5 وفق إحساسك بالتحسن</p>${SKILLS.map(([key,name,icon])=>{const v=state.skills[key];return `<div class="skill-item"><div class="skill-top"><strong>${icon} ${name}</strong><small>${v} / 5</small></div><div class="skill-track"><div class="skill-fill" style="width:${v*20}%"></div></div><input type="range" min="0" max="5" value="${v}" aria-label="تقييم ${name}" data-skill="${key}" /></div>`}).join('')}<p class="note-hint">هذه مؤشرات ذاتية وليست تقييما رسميا لمستوى A1/A2.</p></section>
      </div>
      <section class="panel utility-panel"><h2>إعدادات رحلتك ونسخ الإنجاز</h2><p>يحفظ تقدمك تلقائيا داخل هذا المتصفح وعلى هذا الجهاز. قم بتصدير نسخة إذا أردت نقله إلى هاتف أو متصفح آخر.</p><div class="date-setting"><label for="start-date">تاريخ بداية المسار:</label><input type="date" id="start-date" value="${state.start}" /><button class="btn btn-outline" data-action="today">درس اليوم بحسب التاريخ</button></div><div class="tools-row"><button class="btn btn-muted" data-action="export">⬇ تصدير نسخة احتياطية</button><button class="btn btn-outline" data-action="import">⬆ استرجاع إنجازاتي</button><input type="file" id="import-progress" hidden accept="application/json,.json" /></div><p class="note-hint">النطق الصوتي يحتاج دعما من نظام هاتفك، ويعمل عادة بعد لمس زر الاستماع. النسخة الأولى من المنصة تحتاج الإنترنت، ويمكن فتح الصفحات المخزنة لاحقا دون اتصال.</p></section>
    </div>`;
  }
  function statCard(label,val,icon,color,note){return `<div class="stat-card"><div class="stat-head"><span class="stat-label">${label}</span><span class="stat-icon ${color}">${icon}</span></div><div class="stat-val">${val}</div><div class="stat-note">${note}</div></div>`;}
  function renderLessons(){
    main.innerHTML=`<div class="container"><div class="view-heading"><div><span class="eyebrow">LE PROGRAMME</span><h1>دروس الفرنسية في 60 يوما</h1><p>تعلم المفردات والقواعد والتعبير والمحادثة يوما بعد يوم</p></div><span class="level-tag">${finished()} / 60 مكتمل</span></div>
      <div class="lessons-banner"><div><h3>ستون يوما، 60 فرصة للتقدم ✨</h3><p>كل درس يضم شرحا ومفردات وأمثلة مسموعة وتمرين تطبيق واختبارا قصيرا.</p></div><img src="./assets/illustration-study.svg" alt="رسم لمكتب الدراسة" /></div>
      <div class="search-controls"><div class="search"><span>⌕</span><input id="search-lessons" type="search" placeholder="ابحث عن يوم أو موضوع درس..." value="${esc(search)}" autocomplete="off" aria-label="البحث في الدروس" /></div><select class="filter-select" id="lesson-filter" aria-label="تصفية الدروس"><option value="all" ${filter==='all'?'selected':''}>جميع الحالات</option><option value="pending" ${filter==='pending'?'selected':''}>لم تكتمل</option><option value="done" ${filter==='done'?'selected':''}>مكتملة</option></select></div>
      <div class="week-chips" id="week-chips">${weekChips()}</div><div class="lessons-grid" id="lessons-grid"></div></div>`;
    renderLessonsGrid();
  }
  function weekChips(){return `<button class="week-chip ${activeWeek===-1?'active':''}" data-week="-1">كل الأسابيع</button>`+WEEK_NAMES.map((w,i)=>`<button class="week-chip ${activeWeek===i?'active':''}" data-week="${i}">الأسبوع ${w}</button>`).join('');}
  function renderLessonsGrid(){
    const grid=document.getElementById('lessons-grid');if(!grid)return;
    const term=search.trim().toLocaleLowerCase();
    const items=LESSONS.filter(x=> (activeWeek===-1 || Math.floor((x.id-1)/7)===activeWeek) && (filter==='all'||(filter==='done'?!!state.done[x.id]:!state.done[x.id])) && (!term|| x.title.toLowerCase().includes(term)||x.category.includes(term)||String(x.id)===term|| x.words.some(w=>w[0].toLowerCase().includes(term)||w[1].includes(term))));
    grid.innerHTML=items.length?items.map(x=>{
      const done=!!state.done[x.id];return `<article class="lesson-card ${done?'done':''}"><div class="lesson-card-top"><span class="day-pill">اليوم ${x.id}</span><span class="status-pill ${done?'completed':''}">${done?'✓ مكتمل':dayDate(x.id)>todayString()?'◷ قادم':'○ متاح'}</span></div><img class="lesson-card-icon" src="${lessonIcon(x)}" alt="" loading="lazy"/><h3>${esc(x.title)}</h3><p>${esc(x.intro)}</p><div class="lesson-bottom"><span class="category">${esc(x.category)} · ${fmtDate(dayDate(x.id))}</span><a class="open-card" href="#day/${x.id}" aria-label="افتح اليوم ${x.id}">افتح الدرس ←</a></div></article>`;}).join(''):'<div class="no-results">لا توجد دروس مطابقة لهذا البحث. جرّب كلمة أخرى.</div>';
  }
  function renderDetail(id){
    const l=LESSONS[id-1],done=!!state.done[id],practice=state.practice[id]||[false,false,false,false],quiz=state.quiz[id],count=practice.filter(Boolean).length;
    main.innerHTML=`<div class="container">
      <a href="#lessons" class="back-link">→ العودة إلى جميع الدروس</a>
      <div class="lesson-hero"><div><span class="eyebrow">JOUR ${String(id).padStart(2,'0')} / 60 · ${esc(l.category)}</span><h1>${esc(l.title)}</h1><p>${esc(l.intro)}</p><div class="lesson-meta"><span>📅 ${fmtLongDate(dayDate(id))}</span><span>⏱ نحو 60 دقيقة</span><span>${done?'✓ درس مكتمل':'◯ قيد التعلم'}</span></div></div><img src="${lessonIcon(l)}" alt="رسم توضيحي لموضوع الدرس" /></div>
      <div class="detail-layout"><div class="detail-main">
        <section class="panel"><div class="lesson-section-head"><h2>📚 مفردات الدرس</h2><small>${l.words.length} كلمات وعبارات</small></div><div class="vocab-grid">${l.words.map(([fr,ar])=>`<div class="vocab-item"><div><div class="fr" lang="fr">${esc(fr)}</div><div class="arabic">${esc(ar)}</div></div>${speakButton(fr)}</div>`).join('')}</div></section>
        <section class="panel"><div class="lesson-section-head"><h2>💬 أمثلة في سياقها</h2><small>اضغط على الصوت للاستماع</small></div>${l.examples.map(([fr,ar])=>`<div class="example-row"><div class="example-content"><div class="fr" lang="fr">${esc(fr)}</div><p>${esc(ar)}</p></div>${speakButton(fr)}</div>`).join('')}</section>
        <section class="panel"><h2 class="panel-title" style="margin-bottom:12px">🧠 ملاحظة مهمة</h2><div class="tip"><strong>قاعدة أو نصيحة</strong>${esc(l.tip)}</div></section>
        <section class="panel"><div class="lesson-section-head"><h2>✍️ دفتر الجمل الخاص بي</h2><small>يحفظ تلقائيا</small></div><textarea id="lesson-notes" data-day="${id}" class="note-input" maxlength="3000" placeholder="اكتب جملك الفرنسية هنا. مثال: Je m'appelle Zakaria...">${esc(state.notes[id]||'')}</textarea><p class="note-hint">جرّب تأليف جمل جديدة دون نسخ كل الأمثلة السابقة.</p></section>
      </div><div class="detail-side">
        <section class="mission-card"><h3>🎯 مهمة اليوم</h3><p>${esc(l.mission)}</p></section>
        <section class="panel"><div class="lesson-section-head"><h2>✅ قائمة التدريب</h2><small>${count} / 4</small></div><div class="check-list">${PRACTICES.map((s,i)=>`<label class="check-item"><input type="checkbox" data-day="${id}" data-practice="${i}" ${practice[i]?'checked':''}/><span>${s}</span></label>`).join('')}</div><div class="mini-progress"><div style="width:${count*25}%"></div></div></section>
        <section class="panel"><h2 class="panel-title" style="margin-bottom:5px">📝 اختبر فهمك</h2><p class="panel-desc">سؤال تفاعلي مرتبط بدرس اليوم</p><p class="quiz-question">${esc(l.quiz.question)}</p>${l.quiz.options.map((option,i)=>{const selected=quiz && quiz.selected===i,correct=quiz && quiz.correct && selected;return `<button class="quiz-option ${selected?(correct?'correct':'wrong'):''}" data-action="quiz" data-day="${id}" data-option="${i}"><span ${/^[A-Za-zÀ-ÿ]/.test(option)?'class="fr" lang="fr"':''}>${esc(option)}</span></button>`}).join('')}<div class="quiz-feedback ${quiz?(quiz.correct?'good':'bad'):''}" aria-live="polite">${quiz?(quiz.correct?'✓ إجابة صحيحة، أحسنت!':'ليست الإجابة الصحيحة. حاول مرة أخرى.'):'اختر الجواب المناسب.'}</div></section>
        <section class="panel"><h2 class="panel-title">إتمام اليوم ${id}</h2><p class="panel-desc">عند الانتهاء من مراجعة الدرس وتطبيقه، حدده كمكتمل.</p><button data-action="toggle-done" data-day="${id}" class="btn ${done?'btn-outline':'btn-primary'}" style="width:100%">${done?'✓ مكتمل — إلغاء الإتمام':'✓ أنهيت درس اليوم'}</button><p class="note-hint">الإتمام يدوي، وسجلك يتغير فور الضغط ويُحفظ على الهاتف.</p></section>
      </div></div>
      <div class="detail-nav"><span>${id>1?`<a class="btn btn-outline" href="#day/${id-1}">→ اليوم السابق</a>`:''}</span><span>${id<60?`<a class="btn btn-primary" href="#day/${id+1}">اليوم التالي ←</a>`:'<a class="btn btn-primary" href="#dashboard">عرض إنجازي ←</a>'}</span></div>
    </div>`;
  }
  function speakButton(phrase){return `<button class="speaker" type="button" data-action="speak" data-phrase="${esc(phrase)}" aria-label="استمع إلى ${esc(phrase)}" title="النطق الفرنسي">◖))</button>`;}
  function speak(text){
    if(!('speechSynthesis' in window)){toast('النطق الصوتي غير مدعوم في هذا المتصفح.');return;}
    try{speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='fr-FR';utterance.rate=.84;utterance.pitch=1;const voices=speechSynthesis.getVoices();const voice=voices.find(v=>v.lang.toLowerCase()==='fr-fr')||voices.find(v=>v.lang.toLowerCase().startsWith('fr'));if(voice)utterance.voice=voice;speechSynthesis.speak(utterance);}catch(e){toast('تعذر تشغيل الصوت. جرّب إعدادات النطق في هاتفك.');}
  }
  function exportData(){const payload={app:'francais-zakaria-60',version:1,exported:new Date().toISOString(),...state};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='francais-zakaria-backup-'+todayString()+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('تم تجهيز ملف النسخة الاحتياطية.');}
  function importData(file){if(!file)return;if(file.size>1500000){toast('هذا الملف أكبر من المسموح.');return;}const reader=new FileReader();reader.onload=()=>{try{const raw=JSON.parse(reader.result);if(raw.app!=='francais-zakaria-60'){throw new Error('bad file');}if(!confirm('هل تريد استبدال تقدمك الحالي بالتقدم الموجود في النسخة الاحتياطية؟'))return;state=clean(raw);save();render();toast('تم استرجاع التقدم بنجاح.');}catch(e){toast('ملف غير صالح. استعمل نسخة احتياطية صادرة من المنصة.');}};reader.readAsText(file);}
  document.addEventListener('click',e=>{
    const week=e.target.closest('[data-week]');if(week){activeWeek=Number(week.dataset.week);document.getElementById('week-chips').innerHTML=weekChips();renderLessonsGrid();return;}
    const btn=e.target.closest('[data-action]');if(!btn)return;
    const action=btn.dataset.action,id=Number(btn.dataset.day);
    if(action==='speak'){speak(btn.dataset.phrase);return;}
    if(action==='quiz'){const choice=Number(btn.dataset.option);state.quiz[id]={selected:choice,correct:choice===LESSONS[id-1].quiz.answer};save();renderDetail(id);toast(state.quiz[id].correct?'أحسنت! إجابة صحيحة 🎉':'حاول مرة أخرى، يمكنك تغيير إجابتك.');return;}
    if(action==='toggle-done'){if(state.done[id]){delete state.done[id];toast('أُعيد فتح الدرس للمراجعة.');}else{state.done[id]=todayString();toast('رائع! تم تسجيل إنجاز اليوم 🌟');}save();renderDetail(id);return;}
    if(action==='export'){exportData();return;}
    if(action==='import'){document.getElementById('import-progress')?.click();return;}
    if(action==='today'){location.hash='#day/'+nextLesson();return;}
  });
  document.addEventListener('input',e=>{
    if(e.target.id==='search-lessons'){search=e.target.value;renderLessonsGrid();}
    if(e.target.id==='lesson-notes'){state.notes[e.target.dataset.day]=e.target.value;save();}
    if(e.target.dataset.skill){state.skills[e.target.dataset.skill]=Number(e.target.value);save();const item=e.target.closest('.skill-item');item.querySelector('.skill-fill').style.width=(Number(e.target.value)*20)+'%';item.querySelector('.skill-top small').textContent=e.target.value+' / 5';}
  });
  document.addEventListener('change',e=>{
    if(e.target.id==='lesson-filter'){filter=e.target.value;renderLessonsGrid();}
    if(e.target.dataset.practice!==undefined){const id=Number(e.target.dataset.day),idx=Number(e.target.dataset.practice);if(!state.practice[id])state.practice[id]=[false,false,false,false];state.practice[id][idx]=e.target.checked;save();renderDetail(id);}
    if(e.target.id==='start-date'){if(e.target.value){state.start=e.target.value;save();renderDashboard();toast('تم تحديث تاريخ انطلاق المسار.');}}
    if(e.target.id==='import-progress'){importData(e.target.files[0]);e.target.value='';}
  });
  window.addEventListener('hashchange',render);
  if('serviceWorker' in navigator && location.protocol.startsWith('http')){
    window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  }
  render();
})();
