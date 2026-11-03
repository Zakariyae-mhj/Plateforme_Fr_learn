/* Français 60 — Version 2.0 · Local-first, no external API or account required. */
(()=>{
'use strict';
const KEY='francais-zakaria-60-v2', OLD_KEY='francais-zakaria-60-v1', START='2026-11-03';
const main=document.getElementById('main-content'), toastEl=document.getElementById('toast');
const WEEKS=['الأول','الثاني','الثالث','الرابع','الخامس','السادس','السابع','الثامن','التاسع'];
const ART={قواعد:'illustration-grammar.svg',مفردات:'illustration-vocab.svg',مراجعة:'illustration-review.svg',نطق:'illustration-talk.svg',محادثة:'illustration-talk.svg',كتابة:'illustration-study.svg',قراءة:'illustration-study.svg',تقييم:'illustration-review.svg'};
const SKILLS=[['listening','الاستماع','🎧'],['speaking','المحادثة','🗣️'],['reading','القراءة','📖'],['writing','الكتابة','✍️']];
const EX_TYPES={choice:'اختيار من متعدد',fill:'إكمال الفراغ',order:'ترتيب الكلمات',translation:'ترجمة وكتابة',dictation:'إملاء صوتي',guided:'كتابة موجهة'};
let state=load(), view={week:-1,query:'',filter:'all',tab:'sentences',sentences:'all',exerciseType:'all'},tempOrder={},activeDay=1,toastTimer;
const esc=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const dateUTC=s=>{const [y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d);};
const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
const dayDate=i=>new Date(dateUTC(state.start)+(i-1)*86400000).toISOString().slice(0,10);
const fmt=s=>new Intl.DateTimeFormat('ar-MA',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(new Date(dateUTC(s)));
const icon=l=>'./assets/'+(ART[l.category]||'illustration-study.svg');
const exercises=l=>{
  const e=l.extra, q=l.quiz;
  const fill=(id,item)=>{
    const tokens=item[0].replace(/[.!?؟]+$/,'').split(/\s+/);
    const eligible=tokens.map((w,i)=>({w,i})).filter(({w,i})=>i>0&&w.length>=4&&!/^\d/.test(w));
    const idx=(eligible.find(x=>/^(suis|sommes|avez|étudie|travaillons|arrivés|parti|allons|vais|aujourd'hui)$/i.test(x.w))||eligible[Math.floor(eligible.length/2)]||{i:Math.min(2,tokens.length-1)}).i;
    const answer=tokens[idx], display=tokens.map((w,i)=>i===idx?'__________':w).join(' ')+' .';
    return {id,type:'fill',label:'أكمل الكلمة الناقصة',prompt:'أكمل الكلمة الناقصة في الجملة:',display,answer,model:item[0],ar:item[1]};
  };
  const order=(id,item)=>({id,type:'order',label:'رتب الكلمات',prompt:'رتّب الكلمات لتكوين الجملة الفرنسية:',ar:item[1],model:item[0],answer:item[0],tokens:item[0].replace(/[.!?؟]+$/,'').split(/\s+/)});
  const write=(id,item,type)=>({id,type,label:type==='dictation'?'اكتب ما تسمع':type==='guided'?'اكتب الجملة بالفرنسية':'ترجم إلى الفرنسية',prompt:type==='dictation'?'استمع إلى الجملة ثم اكتبها كما سمعتها:':type==='guided'?'اكتب جملة فرنسية تؤدي المعنى التالي. يمكنك الاستعانة بمفردات الدرس:':'ترجم العبارة التالية إلى الفرنسية:',ar:type==='dictation'?'انقر زر الاستماع، ويمكنك تكراره.':item[1],model:item[0],answer:item[0]});
  const opts=[e[4],e[6],e[10]].map(x=>x[0]);
  return [
    {id:'choice1',type:'choice',label:'اختر الإجابة',prompt:q.question,options:q.options,answer:q.answer,model:q.options[q.answer],explanation:l.tip},
    {id:'choice2',type:'choice',label:'اختر الترجمة',prompt:'اختر الجملة الفرنسية المطابقة للمعنى:',ar:e[4][1],options:opts,answer:0,model:e[4][0],explanation:'انتبه إلى دلالة الفعل والمفردات في الجملة.'},
    fill('fill1',e[2]),fill('fill2',e[9]),
    order('order1',e[1]),order('order2',e[11]),
    write('translation1',e[0],'translation'),write('translation2',e[12],'translation'),
    write('dictation1',e[6],'dictation'),write('guided1',e[13],'guided')
  ];
};
const ALL_EX=LESSONS.map(exercises);
function blank(){return {start:START,done:{},answers:{},notes:{},skills:{listening:0,speaking:0,reading:0,writing:0},favorites:[],opened:{}};}
function clean(raw){const d=blank();if(!raw||typeof raw!=='object')return d;
  if(typeof raw.start==='string'&&/^\d{4}-\d\d-\d\d$/.test(raw.start)&&!Number.isNaN(Date.parse(raw.start)))d.start=raw.start;
  ['done','answers','notes','opened'].forEach(k=>{if(raw[k]&&typeof raw[k]==='object'&&!Array.isArray(raw[k])){
    for(const [id,val] of Object.entries(raw[k]).slice(0,k==='answers'?1300:75)){
      if(k==='answers'&&/^\d{1,2}:(choice\d|fill\d|order\d|translation\d|dictation\d|guided\d)$/.test(id)&&val&&typeof val==='object')d.answers[id]={value:String(val.value??'').slice(0,500),correct:!!val.correct,at:String(val.at||'').slice(0,40)};
      if(k==='notes'&&Number(id)>=1&&Number(id)<=60&&typeof val==='string')d.notes[id]=val.slice(0,6500);
      if(k==='done'&&Number(id)>=1&&Number(id)<=60&&typeof val==='string')d.done[id]=val.slice(0,10);
      if(k==='opened'&&Number(id)>=1&&Number(id)<=60&&typeof val==='string')d.opened[id]=val.slice(0,10);
    }
  }});
  if(raw.skills&&typeof raw.skills==='object')SKILLS.forEach(([k])=>{d.skills[k]=Math.min(5,Math.max(0,Math.round(Number(raw.skills[k])||0)));});
  if(Array.isArray(raw.favorites))d.favorites=raw.favorites.filter(x=>typeof x==='string'&&/^\d{1,2}:\d{1,2}$/.test(x)).slice(0,2000);
  return d;
}
function load(){try{const now=localStorage.getItem(KEY);if(now)return clean(JSON.parse(now));const old=localStorage.getItem(OLD_KEY);if(old){const prev=JSON.parse(old);return clean({...prev,answers:{},favorites:[],opened:{}});}}catch(e){}return blank();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){toast('تعذّر الحفظ. تحقق من التخزين أو وضع التصفح الخاص.');}}
function toast(s){clearTimeout(toastTimer);toastEl.textContent=s;toastEl.classList.add('active');toastTimer=setTimeout(()=>toastEl.classList.remove('active'),3000);}
function numDone(){return Object.keys(state.done).length;}
function weekCount(w){return LESSONS.slice(w*7,w===8?60:(w+1)*7).filter(l=>state.done[l.id]).length;}
function testsOf(day){return ALL_EX[day-1].map(x=>state.answers[`${day}:${x.id}`]);}
function stats(){const a=Object.values(state.answers);return {done:numDone(),answered:a.length,correct:a.filter(x=>x.correct).length,accuracy:a.length?Math.round(a.filter(x=>x.correct).length/a.length*100):0};}
function streak(){const days=new Set(Object.values(state.done));let ref=today();if(!days.has(ref))ref=new Date(dateUTC(ref)-86400000).toISOString().slice(0,10);let n=0;while(days.has(ref)){n++;ref=new Date(dateUTC(ref)-86400000).toISOString().slice(0,10);}return n;}
function recommended(){const due=Math.max(1,Math.min(60,Math.floor((dateUTC(today())-dateUTC(state.start))/86400000)+1));for(let i=1;i<=due;i++)if(!state.done[i])return i;for(let i=due+1;i<=60;i++)if(!state.done[i])return i;return 60;}
function levelText(n){return n>=60?'أنهيت المسار — راجع مهاراتك':n>=45?'تطبيقات مستوى A1':n>=25?'أساسيات A1 المتقدمة':n>=8?'بناء أساس A1':'بداية المستوى A1';}
function record(day,ex,val,correct){state.answers[`${day}:${ex.id}`]={value:String(val).slice(0,500),correct,at:new Date().toISOString()};save();}
function speak(fr){if(!('speechSynthesis' in window)){toast('خاصية النطق غير مدعومة في هذا المتصفح.');return;}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(fr);u.lang='fr-FR';u.rate=.83;u.pitch=1;const voices=speechSynthesis.getVoices();u.voice=voices.find(v=>v.lang?.toLowerCase()==='fr-fr')||voices.find(v=>v.lang?.toLowerCase().startsWith('fr'))||null;speechSynthesis.speak(u);}catch(e){toast('تعذر تشغيل الصوت. تحقق من توفر صوت فرنسي على هاتفك.');}}
const frNorm=s=>String(s||'').toLowerCase().normalize('NFC').replace(/[’‘`´]/g,"'").replace(/[.,!?;:«»“”()؟]/g,' ').replace(/\s+/g,' ').trim();
const noAccent=s=>frNorm(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function grammarHints(input,expected=''){
 const tips=[];const v=input.toLowerCase().replace(/[’]/g,"'");
 const patterns=[
  [/\bje\s+(est|es|sommes|sont)\b/i,'بعد Je نستعمل «suis» من فعل être، وليس est أو sommes.'],
  [/\btu\s+(suis|est|sommes|êtes)\b/i,'فعل être مع tu يُصرَّف «es».'],
  [/\bnous\s+(suis|est|êtes|sont)\b/i,'فعل être مع nous يُصرَّف «sommes».'],
  [/\bvous\s+(suis|est|sommes|sont)\b/i,'فعل être مع vous يُصرَّف «êtes».'],
  [/\bje\s+(a|as|avons|avez|ont)\b/i,'نستعمل «j’ai» مع je من فعل avoir.'],
  [/\bje\s+ai\b/i,'يُحذف حرف e قبل حرف صوتي: «j’ai» بدلا من «je ai».'],
  [/\bje\s+est\b/i,'الصحيح «je suis» لا «je est».'],
  [/\bje\s+va\b/i,'الفعل aller مع je هو «je vais».'],
  [/\bnous\s+va\b/i,'الفعل aller مع nous هو «nous allons».'],
  [/\bje\s+suis\s+\d+\s+ans\b/i,'العمر يُعبَّر عنه بفعل avoir: «J’ai 27 ans»، لا «Je suis 27 ans».'],
  [/\bà\s+le\b/i,'في الفرنسية يندمج «à + le» إلى «au».'],
  [/\bde\s+le\b/i,'في الفرنسية يندمج «de + le» إلى «du».'],
  [/\bje\s+ne\s+\S+\s+pas\s+pas\b/i,'لا تكرر «pas»؛ النفي الأساسي هو «ne … pas».'],
  [/\bj'ai\s+allé\b/i,'الفعل aller في الماضي المركب يأخذ être: «je suis allé».'],
  [/\belle\s+est\s+allé\b/i,'مع elle نضيف e إلى اسم المفعول: «elle est allée».'],
  [/\bje\s+faire\b/i,'في الحاضر يُصرف faire مع je إلى «je fais».'],
  [/\bnous\s+fait\b/i,'في الحاضر يُصرف faire مع nous إلى «nous faisons».'],
 ];
 patterns.forEach(([re,t])=>{if(re.test(v)&&!tips.includes(t))tips.push(t);});
 if(expected&&noAccent(input)===noAccent(expected)&&frNorm(input)!==frNorm(expected))tips.unshift('الإملاء قريب من النموذج، لكن علامات النبر مثل é وè وê أو ç مهمة في الكتابة الفرنسية.');
 return tips;
}
function sequenceDifference(user,reference){
 const x=frNorm(user).split(' ').filter(Boolean), y=frNorm(reference).split(' ').filter(Boolean), a=x.length,b=y.length;
 const mat=Array.from({length:a+1},()=>Array(b+1).fill(0));
 for(let i=1;i<=a;i++)for(let j=1;j<=b;j++)mat[i][j]=x[i-1]===y[j-1]?mat[i-1][j-1]+1:Math.max(mat[i-1][j],mat[i][j-1]);
 let i=a,j=b;const missing=[],extra=[];while(i&&j){if(x[i-1]===y[j-1]){i--;j--;}else if(mat[i-1][j]>=mat[i][j-1]){extra.unshift(x[--i]);}else{missing.unshift(y[--j]);}}while(i)extra.unshift(x[--i]);while(j)missing.unshift(y[--j]);
 return {missing,extra};
}
function evaluate(value,answer){const match=frNorm(value)===frNorm(answer),accents=noAccent(value)===noAccent(answer);return {match,accents,hints:grammarHints(value,answer),diff:sequenceDifference(value,answer)};}
function feedbackMarkup(r,model,tip='',live=false){
 if(!model)return '';
 const explanation=r.match?'الإجابة مطابقة للنموذج. يمكنك الانتقال إلى التمرين التالي.':r.accents?'الجملة مطابقة بعد تجاهل علامات النبر، لكن الإملاء الفرنسي يحتاج إلى ضبط.':'لم تطابق كتابتك النموذج المرجعي. افحص الكلمات والترتيب ثم أعد المحاولة.';
 const diff=!r.match?`<div class="diff-list">${r.diff.missing.length?`<span>كلمات ناقصة أو مختلفة: <b dir="ltr">${esc(r.diff.missing.join(' · '))}</b></span>`:''}${r.diff.extra.length?`<span>كلمات زائدة أو مختلفة: <b dir="ltr">${esc(r.diff.extra.join(' · '))}</b></span>`:''}</div>`:'';
 const hints=r.hints.length?`<ul class="feedback-rules">${r.hints.slice(0,3).map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:!r.match&&tip?`<p class="hint-rule">💡 ${esc(tip)}</p>`:'';
 return `<div class="response-feedback ${r.match?'is-correct':r.accents?'is-close':'is-wrong'}" role="status"><strong>${r.match?'✓ إجابة صحيحة':r.accents?'◉ قريبة جدا':'↻ راجع هذه النقاط'}</strong><p>${explanation}</p>${diff}${hints}${!r.match?`<div class="answer-model"><small>النموذج الصحيح</small><b lang="fr" dir="ltr">${esc(model)}</b></div>`:''}${!r.match?'<small class="soft-warning">قد تكون هناك صياغة صحيحة أخرى؛ المقارنة هنا مع نموذج محدد وليست فحصا شاملا لكل الفرنسية.</small>':''}</div>`;
}
function freeReview(text,lesson){if(!text.trim())return `<div class="free-status muted">ابدأ بكتابة جملة فرنسية لتظهر الملاحظات مباشرة.</div>`;
 const cleaned=text.trim(),sentences=cleaned.split(/\n|[.!?]+\s+/).map(s=>s.trim()).filter(Boolean);
 const matches=lesson.sentences.filter(x=>sentences.some(s=>frNorm(s)===frNorm(x.fr)));
 const tips=grammarHints(cleaned);
 let basic=[];if(/^[a-zà-ÿ]/.test(cleaned))basic.push('ابدأ أول جملة بحرف كبير.');
 if(!/[.!?؟…]$/.test(cleaned))basic.push('أضف علامة ترقيم مناسبة في نهاية الجملة بعد إكمالها.');
 if(/\s{2,}/.test(cleaned))basic.push('توجد مسافات متكررة بين بعض الكلمات.');
 if(/\b(je|tu|nous|vous)\b/i.test(cleaned)&&!/[.!?\n]/.test(cleaned)&&cleaned.split(' ').length<3)basic.push('الجملة قصيرة جدا؛ حاول إضافة فعل أو مكمل ليكتمل المعنى.');
 return `<div class="free-status ${tips.length?'has-hints':matches.length?'has-match':'muted'}"><b>${matches.length?`✓ ${matches.length} من جملك مطابق لأمثلة الدرس.`:tips.length?'وجدت أخطاء محتملة في قواعد محددة.':'فحص إرشادي مباشر'}</b>
 ${tips.length?`<ul>${tips.slice(0,5).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
 ${basic.length?`<ul>${basic.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
 ${!tips.length?'<p>لم أرصد خطأ من القواعد المحدودة التي أفحصها؛ لا يعني ذلك أن النص صحيح لغويا بالكامل أو أن معناه قد تم التحقق منه.</p>':''}
 <small>عدد الكلمات: ${cleaned.split(/\s+/).length} · جمل أو أسطر: ${sentences.length}</small></div>`;
}
function updateNav(viewName){const v=viewName==='dashboard'?'dashboard':'lessons';document.querySelectorAll('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===v);});document.getElementById('topbar-date').textContent=new Intl.DateTimeFormat('ar-MA',{month:'short',day:'numeric'}).format(new Date());document.getElementById('breadcrumb').textContent='مسار تعلم الفرنسية / '+(viewName==='dashboard'?'لوحة التقدم':viewName==='lessons'?'الدروس':'اليوم '+activeDay);document.getElementById('side-progress').textContent=numDone()+' / 60';document.getElementById('side-progress-fill').style.width=(numDone()/60*100)+'%';}
function route(){const hash=decodeURIComponent(location.hash.slice(1));const m=/^day\/(\d+)$/.exec(hash);if(m){const id=Number(m[1]);if(id>=1&&id<=60){if(id!==activeDay){view.tab='sentences';view.sentences='all';view.exerciseType='all';}activeDay=id;state.opened[id]=today();save();updateNav('day');renderDay();}else location.hash='#lessons';}
 else if(hash==='lessons'){updateNav('lessons');renderCatalog();}else{updateNav('dashboard');renderDashboard();}window.scrollTo({top:0,behavior:'auto'});}
function pill(text,cls=''){return `<span class="pill ${cls}">${esc(text)}</span>`;}
function renderDashboard(){const s=stats(),next=recommended(),p=Math.round(s.done/60*100),l=LESSONS[next-1],h=new Date().getHours();main.innerHTML=`<div class="page-wrap">
  <div class="welcome"><div><span class="eyebrow">TABLEAU DE BORD · ESPACE PERSONNEL</span><h1>${h<12?'صباح الخير':'مساء الخير'}، زكرياء 👋</h1><p>تابع تطورك يوما بعد يوم، واحتفظ بتقدمك في جميع الدروس والاختبارات.</p></div><span class="welcome-date">اليوم · ${esc(fmt(today()))}</span></div>
  <section class="dash-hero"><div class="hero-copy"><span class="hero-kicker">✦ تحدّي 60 يوما لتعلم الفرنسية</span><h2 lang="fr">Bonjour, Zakaria !</h2><p>من أول تحية بالفرنسية إلى محادثات أكاديمية قصيرة — مسار يومي واضح وتمارين مصححة مع تفسير الأخطاء.</p><a href="#day/${next}" class="btn btn-white">ابدأ درس اليوم <span>←</span></a></div><img src="./assets/hero-france.svg" alt="رسم باريسي وكتب لتعلم الفرنسية"></section>
  <div class="stats-grid">
    ${statCard('الدروس المكتملة',s.done+' / 60','◫','purple','إنجازك الحالي من البرنامج')}
    ${statCard('تمارين تم حلها',s.answered+' / 600','✍','blue','10 تطبيقات في كل درس')}
    ${statCard('نسبة الإجابات الصحيحة',s.answered?s.accuracy+'%':'—','◎','mint',s.correct+' إجابات صحيحة')}
    ${statCard('أيام متتالية',streak()+'','♨','peach','حسب تاريخ إتمام الدروس')}
  </div>
  <div class="dash-columns">
    <section class="panel"><div class="section-head"><div><h2>المسار العام</h2><p>إجمالي الدروس المنجزة والمستوى التقديري</p></div>${pill(levelText(s.done),'soft-purple')}</div><div class="progress-section"><div class="progress-ring" style="--progress:${p}%"><span><b>${p}%</b><small>مكتمل</small></span></div><div class="progress-summary"><h3>${s.done===60?'أكملت المسار، أحسنت!':'كل يوم خطوة جديدة'}</h3><p>أتممت <strong>${s.done}</strong> درسا، ويتبقى <strong>${60-s.done}</strong> درسا. تقدمك في الاختبارات يُقاس بشكل منفصل.</p><div class="data-note">الانتهاء المخطط: ${fmt(dayDate(60))}</div></div></div></section>
    <section class="panel current-lesson"><div class="section-head"><div><h2>الدرس التالي المقترح</h2><p>استكمل البرنامج حسب ترتيبك</p></div>${pill('اليوم '+next)}</div><div class="current-lesson-body"><img src="${icon(l)}" alt="رسم توضيحي للدرس"><div><h3>${esc(l.title)}</h3><p>${esc(l.intro)}</p><span>${l.sentences.length} جملة · 10 تمارين · تصحيح فوري</span><a class="btn btn-primary" href="#day/${next}">الانتقال إلى الدرس ←</a></div></div></section>
  </div>
  <div class="dash-columns">
    <section class="panel"><div class="section-head"><div><h2>تقدم الأسابيع التسعة</h2><p>يظهر عدد الأيام المكتملة في كل أسبوع</p></div><a class="text-link" href="#lessons">جميع الدروس ←</a></div><div class="chart">${WEEKS.map((name,i)=>{const total=i===8?4:7,n=weekCount(i);return `<div class="chart-col" title="الأسبوع ${name}: ${n} من ${total}"><span>${n}/${total}</span><div class="chart-bar"><div style="height:${n/total*100}%"></div></div><small>${i+1}</small></div>`}).join('')}</div><div class="achievement-row">${[['🌱','بداية الرحلة',s.done>=1],['✨','الأسبوع الأول',s.done>=7],['📚','نصف المسار',s.done>=30],['🏆','60 يوما',s.done>=60]].map(([ic,t,on])=>`<span class="achievement ${on?'won':''}">${ic} ${t}</span>`).join('')}</div></section>
    <section class="panel"><div class="section-head"><div><h2>تقييمي الذاتي للمهارات</h2><p>قيّم شعورك بالتقدم من 0 إلى 5</p></div><span>🎯</span></div><div class="skill-list">${SKILLS.map(([id,name,emoji])=>`<div class="skill-item"><div class="skill-title"><span>${emoji} ${name}</span><small data-skill-value="${id}">${state.skills[id]} / 5</small></div><input type="range" min="0" max="5" step="1" value="${state.skills[id]}" data-skill="${id}" aria-label="مستوى ${name}"></div>`).join('')}</div><small class="footnote">هذه التقديرات ذاتية وليست اختبارا معتمدا لمستوى CEFR.</small></section>
  </div>
  <div class="dash-columns"><section class="panel"><div class="section-head"><div><h2>إعدادات المسار</h2><p>يمكنك إعادة ضبط تاريخ البداية فقط</p></div><span>⚙️</span></div><label class="field-label" for="start-date">تاريخ بداية التحدي</label><input id="start-date" type="date" class="field" value="${esc(state.start)}"><p class="footnote">يمكنك فتح أي يوم في أي وقت، دون انتظار تاريخه المخطط.</p></section>
  <section class="panel"><div class="section-head"><div><h2>نسخة احتياطية من إنجازاتك</h2><p>الحفظ محلي على هذا المتصفح</p></div><span>☁</span></div><div class="backup-actions"><button class="btn btn-outline" data-action="export">↧ تصدير التقدم</button><button class="btn btn-outline" data-action="import">↥ استرجاع التقدم</button><input type="file" id="import-file" accept=".json,application/json" hidden></div><p class="footnote">لا توجد مزامنة تلقائية بين الهواتف؛ صدّر نسختك قبل تغيير الجهاز أو حذف بيانات Safari.</p></section></div>
  </div>`;}
function statCard(label,value,symbol,colour,explain){return `<div class="stat-card"><div class="stat-top"><span>${label}</span><i class="stat-symbol ${colour}">${symbol}</i></div><strong>${value}</strong><small>${explain}</small></div>`;}
function renderCatalog(){const s=stats();main.innerHTML=`<div class="page-wrap"><div class="catalog-intro"><div><span class="eyebrow">LE PROGRAMME EN 60 JOURS</span><h1>مكتبة الدروس اليومية</h1><p>60 درسا تفاعليا، و${LESSONS.reduce((n,l)=>n+l.sentences.length,0).toLocaleString('en-US')} جملة فرنسية مترجمة، و600 تمرين قابل للتصحيح.</p></div>${pill(s.done+' / 60 مكتمل','soft-purple')}</div>
 <div class="catalog-banner"><div><h2>تدرّب، اكتب، ثم صحّح بنفسك ✨</h2><p>افتح أي درس لتستمع إلى الجمل، وتطبّق ستة أنواع من التمارين، وتحصل على تفسير مباشر للأخطاء.</p></div><img src="./assets/illustration-study.svg" alt="رسم لمكتب الدراسة"></div>
 <div class="filters"><label class="search"><span>⌕</span><input id="search-lessons" placeholder="ابحث عن درس، قاعدة، كلمة..." value="${esc(view.query)}" type="search" aria-label="البحث في الدروس"></label><select id="filter-lessons" class="field" aria-label="تصفية حسب الإنجاز"><option value="all" ${view.filter==='all'?'selected':''}>كل الدروس</option><option value="done" ${view.filter==='done'?'selected':''}>المكتملة</option><option value="pending" ${view.filter==='pending'?'selected':''}>المتبقية</option></select></div>
 <div id="week-chips" class="week-chips">${weekChips()}</div><div id="lessons-grid" class="lesson-grid"></div></div>`;renderCatalogGrid();}
function weekChips(){return `<button data-week="-1" class="chip ${view.week===-1?'selected':''}">كل الأسابيع</button>`+WEEKS.map((x,i)=>`<button data-week="${i}" class="chip ${view.week===i?'selected':''}">الأسبوع ${x}</button>`).join('');}
function renderCatalogGrid(){const container=document.getElementById('lessons-grid');if(!container)return;const query=view.query.toLowerCase().trim();const arr=LESSONS.filter(l=>(view.week<0||Math.floor((l.id-1)/7)===view.week)&&(view.filter==='all'||(view.filter==='done'?state.done[l.id]:!state.done[l.id]))&&(!query||l.title.toLowerCase().includes(query)||l.category.includes(query)||String(l.id)===query||l.words.some(w=>w.some(x=>x.toLowerCase().includes(query)))));
 container.innerHTML=arr.length?arr.map(l=>{const day=l.id,t=testsOf(day),done=!!state.done[day];return `<a href="#day/${day}" class="lesson-card"><div class="lesson-card-head"><span class="day-number">JOUR ${String(day).padStart(2,'0')}</span>${pill(done?'✓ مكتمل':t.filter(Boolean).length?'◷ قيد التطبيق':'○ متاح',done?'status-done':'status-pending')}</div><img src="${icon(l)}" alt="" loading="lazy"><h3>${esc(l.title)}</h3><p>${esc(l.intro)}</p><div class="lesson-card-meta"><span>${l.sentences.length} جملة</span><span>10 تمارين</span><span>الأسبوع ${Math.ceil(day/7)}</span></div><div class="lesson-card-foot"><small>${fmt(dayDate(day))}</small><b>افتح الدرس ←</b></div></a>`;}).join(''):'<div class="empty-state">لا توجد دروس تطابق البحث. جرّب كلمة أخرى.</div>';}
function renderDay(){const l=LESSONS[activeDay-1],day=l.id,done=!!state.done[day],t=testsOf(day),attempts=t.filter(Boolean).length,correct=t.filter(x=>x?.correct).length;
 main.innerHTML=`<div class="page-wrap lesson-page"><a class="back" href="#lessons">→ العودة إلى جميع الدروس</a>
 <div class="lesson-heading"><div><span class="eyebrow">JOUR ${String(day).padStart(2,'0')} / 60 · SEMAINE ${Math.ceil(day/7)}</span><h1>${esc(l.title)}</h1><p>${esc(l.intro)}</p><div class="meta-badges">${pill(l.category,'soft-purple')}${pill(l.sentences.length+' جملة')}${pill('10 تمارين')}${pill(correct+'/'+attempts+' صحيحة')}${done?pill('✓ مكتمل','status-done'):''}</div></div><img src="${icon(l)}" alt="رسم توضيحي"></div>
 <div class="lesson-tabs" role="tablist" aria-label="محتويات اليوم"><button role="tab" aria-selected="${view.tab==='sentences'}" data-tab="sentences" class="lesson-tab ${view.tab==='sentences'?'current':''}">📚 الجمل والمفردات</button><button role="tab" aria-selected="${view.tab==='practice'}" data-tab="practice" class="lesson-tab ${view.tab==='practice'?'current':''}">✅ تمارين وتصحيح <small>${correct}/${10}</small></button><button role="tab" aria-selected="${view.tab==='writing'}" data-tab="writing" class="lesson-tab ${view.tab==='writing'?'current':''}">✍️ مساحة الكتابة</button></div>
 <div id="lesson-tab-content"></div><div class="day-bottom"><a href="${day>1?'#day/'+(day-1):'#lessons'}" class="btn btn-outline">→ ${day>1?'الدرس السابق':'جميع الدروس'}</a><button class="btn ${done?'btn-outline':'btn-primary'}" data-action="finish" data-day="${day}">${done?'✓ مكتمل — إلغاء الإتمام':'✓ أنهيت درس اليوم'}</button><a href="${day<60?'#day/'+(day+1):'#dashboard'}" class="btn btn-outline">${day<60?'اليوم التالي':'لوحة التقدم'} ←</a></div></div>`;
 renderTab();}
function renderTab(){const l=LESSONS[activeDay-1],ct=document.getElementById('lesson-tab-content');if(!ct)return;
 document.querySelectorAll('[data-tab]').forEach(b=>{const yes=b.dataset.tab===view.tab;b.classList.toggle('current',yes);b.setAttribute('aria-selected',yes?'true':'false');});
 if(view.tab==='sentences')renderSentences(l,ct);else if(view.tab==='practice')renderExercises(l,ct);else renderWriting(l,ct);
}
function renderSentences(l,ct){const g=view.sentences;const filtered=l.sentences.map((x,i)=>({...x,i})).filter(x=>g==='all'||x.group===g);
 ct.innerHTML=`<div class="lesson-content-grid"><div class="lesson-primary">
 <section class="panel"><div class="section-head"><div><h2>دليل الجمل والعبارات</h2><p>31–32 جملة مترجمة، تتضمن نماذج مثبتة وأسئلة للتدريب</p></div>${pill(l.sentences.length+' جملة','soft-purple')}</div>
 <div class="sentence-filters"><button data-sentences="all" class="chip ${g==='all'?'selected':''}">الكل (${l.sentences.length})</button><button data-sentences="affirmation" class="chip ${g==='affirmation'?'selected':''}">جمل متنوعة (14)</button><button data-sentences="question" class="chip ${g==='question'?'selected':''}">أسئلة (14)</button><button data-sentences="illustration" class="chip ${g==='illustration'?'selected':''}">أمثلة أساسية</button></div>
 <div class="sentence-list">${filtered.map(item=>{const fav=state.favorites.includes(`${l.id}:${item.i}`);return `<article class="sentence-row"><span class="sentence-index">${String(item.i+1).padStart(2,'0')}</span><div class="sentence-text"><p class="fr-text" lang="fr" dir="ltr">${esc(item.fr)}</p><p class="ar-text">${esc(item.ar)}</p></div><div class="sentence-actions"><button class="square-button listen" data-action="speak" data-phrase="${esc(item.fr)}" aria-label="استمع إلى الجملة">♫</button><button class="square-button ${fav?'favorited':''}" data-action="favorite" data-id="${l.id}:${item.i}" aria-label="${fav?'أزل من المفضلة':'أضف إلى المفضلة'}">${fav?'♥':'♡'}</button></div></article>`;}).join('')}</div></section></div>
 <aside class="lesson-aside"><section class="panel"><div class="section-head"><h2>مفردات الدرس</h2>${pill(l.words.length+' مفردة')}</div><div class="words-list">${l.words.map(([fr,ar])=>`<div class="word-item"><div><b lang="fr" dir="ltr">${esc(fr)}</b><small>${esc(ar)}</small></div><button data-action="speak" data-phrase="${esc(fr)}" class="tiny-listen" aria-label="استمع">♫</button></div>`).join('')}</div></section>
 <section class="notice-panel"><span>💡 قاعدة اليوم</span><p>${esc(l.tip)}</p></section><section class="mission-panel"><strong>🎯 مهمة اليوم</strong><p>${esc(l.mission)}</p><button class="btn btn-white" data-action="tab" data-next-tab="practice">ابدأ التمارين ←</button></section></aside></div>`;}
function orderShuffle(tokens,id){const arr=tokens.map((v,i)=>({v,i}));let seed=[...id].reduce((a,c)=>a+c.charCodeAt(0),18);for(let i=arr.length-1;i>0;i--){seed=(seed*9301+49297)%233280;const j=Math.floor(seed/233280*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}if(arr.every((x,i)=>x.i===i))arr.reverse();return arr;}
function renderExercises(l,ct){const exs=ALL_EX[l.id-1],a=testsOf(l.id),correct=a.filter(x=>x?.correct).length,attempt=a.filter(Boolean).length;
 ct.innerHTML=`<div class="practice-layout"><div class="practice-primary"><div class="panel practice-intro"><div class="section-head"><div><h2>تمارين اليوم ${l.id}</h2><p>ستة أنواع من التطبيقات مع إجابات نموذجية وتفسير الأخطاء</p></div>${pill(correct+' / '+exs.length+' صحيحة','soft-purple')}</div><div class="practice-progress"><div style="width:${correct/exs.length*100}%"></div></div><div class="exercise-filters"><button class="chip ${view.exerciseType==='all'?'selected':''}" data-ex-filter="all">الكل</button>${Object.entries(EX_TYPES).map(([k,v])=>`<button data-ex-filter="${k}" class="chip ${view.exerciseType===k?'selected':''}">${esc(v)}</button>`).join('')}</div></div>
 <div class="exercise-stack">${exs.filter(x=>view.exerciseType==='all'||x.type===view.exerciseType).map((ex,j)=>exerciseCard(ex,l)).join('')}</div></div>
 <aside class="practice-aside"><section class="panel"><h2>نتيجتك في هذا الدرس</h2><div class="practice-large">${correct}<small>/ 10</small></div><p class="footnote">${attempt} تمارين تمت الإجابة عنها على الأقل. يمكنك إعادة المحاولة لتصحيح النتيجة.</p><div class="practice-progress"><div style="width:${correct*10}%"></div></div></section><section class="notice-panel"><span>🧠 تذكير بالقواعد</span><p>${esc(l.tip)}</p></section><section class="panel"><h3>كيف يعمل التصحيح؟</h3><p class="footnote">في الترجمة والإملاء وترتيب الكلمات، تُقارن إجابتك بنموذج موثوق. يعرض النظام الكلمات الناقصة أو المختلفة ويشرح أخطاءً شائعة. بعض الإجابات الصحيحة البديلة قد لا يكتشفها.</p></section></aside></div>`;
}
function exerciseCard(ex,l){const saved=state.answers[`${l.id}:${ex.id}`],isChoice=ex.type==='choice',isOrder=ex.type==='order';const badge=saved?(saved.correct?'✓ صحيح':'↻ للمراجعة'):'غير منجز';const result=saved?exFeedback(ex,saved.value,saved.correct):'';
 let body='';if(isChoice){body=`<div class="choice-options">${ex.options.map((o,i)=>`<button class="option-button ${saved&&Number(saved.value)===i?(saved.correct?'choice-right':'choice-wrong'):''}" data-action="choose" data-ex="${ex.id}" data-option="${i}" lang="${/^[A-Za-zÀ-ÿ]/.test(o)?'fr':'ar'}">${esc(o)}</button>`).join('')}</div>`;}
 else if(isOrder){const key=`${l.id}:${ex.id}`;let selected=tempOrder[key]||[],shuffled=orderShuffle(ex.tokens,key);body=`<div class="word-puzzle" data-puzzle="${esc(ex.id)}"><div class="puzzle-picked" dir="ltr">${selected.length?selected.map((id,index)=>`<button type="button" data-action="remove-token" data-ex="${ex.id}" data-index="${index}" class="word-token picked">${esc(ex.tokens[id])} ×</button>`).join(''):'<small>اضغط على الكلمات بالترتيب الصحيح</small>'}</div><div class="puzzle-bank" dir="ltr">${shuffled.filter(t=>!selected.includes(t.i)).map(t=>`<button type="button" data-action="pick-token" data-ex="${ex.id}" data-index="${t.i}" class="word-token">${esc(t.v)}</button>`).join('')}</div><button type="button" data-action="submit-order" data-ex="${ex.id}" class="btn btn-primary small">تصحيح الترتيب</button><button type="button" data-action="reset-order" data-ex="${ex.id}" class="btn btn-text small">إعادة الترتيب</button></div>`;}
 else {const val=saved?.value||'';body=`<div class="type-answer"><label for="input-${l.id}-${ex.id}">إجابتك بالفرنسية</label><div class="answer-row"><input dir="ltr" lang="fr" id="input-${l.id}-${ex.id}" data-answer-input="${ex.id}" type="text" class="answer-input" autocomplete="off" autocapitalize="sentences" spellcheck="true" placeholder="اكتب الجملة هنا..." value="${esc(val)}"><button data-action="check" data-ex="${ex.id}" class="btn btn-primary small">تصحيح</button></div><div class="live-correction" data-live="${ex.id}" aria-live="polite">${val?'يمكنك تعديل الإجابة وستظهر ملاحظات فورية.':'التحقق يبدأ أثناء الكتابة.'}</div></div>`;}
 const example=ex.display?`<div class="exercise-display fr-text" lang="fr" dir="ltr">${esc(ex.display)}</div>`:'';
 const ar=ex.ar?`<div class="exercise-context" ${ex.type==='dictation'?'':'dir="rtl"'}>${esc(ex.ar)}</div>`:'';
 const voice=ex.type==='dictation'?`<button class="btn btn-outline btn-audio" data-action="speak" data-phrase="${esc(ex.answer)}">♫ تشغيل الجملة الفرنسية</button>`:'';
 return `<article class="panel exercise-card" id="ex-${ex.id}"><div class="exercise-top"><span class="exercise-type">${esc(EX_TYPES[ex.type])} · ${ex.id.replace(/\D/g,'')}</span>${pill(badge,saved?.correct?'status-done':'status-pending')}</div><h3>${esc(ex.prompt)}</h3>${example}${ar}${voice}${body}<div data-ex-feedback="${ex.id}">${result}</div></article>`;
}
function exFeedback(ex,val,forced){if(ex.type==='choice'){const answer=ex.options[ex.answer];return `<div class="response-feedback ${forced?'is-correct':'is-wrong'}"><strong>${forced?'✓ أحسنت، إجابة صحيحة':'↻ الإجابة غير صحيحة'}</strong><p>${esc(ex.explanation||'ركز على المعنى وراجع الجملة النموذجية.')}</p>${!forced?`<div class="answer-model"><small>الإجابة الصحيحة</small><b dir="auto">${esc(answer)}</b></div>`:''}</div>`;}
 return feedbackMarkup(evaluate(val,ex.answer),ex.model,lTip(),false);
}
function lTip(){return LESSONS[activeDay-1]?.tip||'';}
function renderWriting(l,ct){const text=state.notes[l.id]||'';ct.innerHTML=`<div class="writing-layout"><section class="panel"><div class="section-head"><div><h2>✍️ دفتري لتعلم الفرنسية</h2><p>اكتب بحرية، وستظهر الملاحظات مباشرة أثناء الكتابة</p></div>${pill('يُحفظ تلقائيا','soft-purple')}</div><div class="writing-prompt"><span>مهمة الكتابة</span><p>${esc(l.mission)}</p><div class="mini-example"><small>مثال مرجعي بالفرنسية:</small><b lang="fr" dir="ltr">${esc(l.extra[0][0])}</b></div></div><label class="field-label" for="free-text">النص الفرنسي الذي تكتبه</label><textarea id="free-text" lang="fr" dir="ltr" class="free-editor" rows="9" placeholder="Écrivez ici vos phrases en français..." spellcheck="true">${esc(text)}</textarea><div class="editor-actions"><span id="word-count">${text.trim()?text.trim().split(/\s+/).length:0} كلمة</span><button data-action="clear-note" class="btn btn-text small">مسح الكتابة</button></div><div id="free-feedback" aria-live="polite">${freeReview(text,l)}</div></section>
 <aside class="writing-side"><section class="notice-panel"><span>📌 كيف أستفيد من التصحيح الآني؟</span><p>المصحح المحلي يكشف أخطاء تصريف شائعة، وبعض أخطاء تركيب الجمل وعلامات الكتابة. إذا كتبت جملة مطابقة لنموذج من الدرس، يستطيع التحقق منها مباشرة.</p></section><section class="panel"><h3>حدود مهمة</h3><p class="footnote">لا تستطيع صفحة GitHub Pages وحدها فهم جميع المعاني أو تصحيح كل صياغة فرنسية حرة بدقة. عند عدم رصد مشكلة، لا يعني ذلك اعتماد الجملة أو صحة أسلوبها. تمارين الإجابات المحددة أكثر دقة لأنها تملك نموذجا معروفا.</p></section><section class="mission-panel"><strong>🎓 الخطوة التالية</strong><p>بعد كتابة الفقرة، اقرأها بصوت مرتفع. يمكنك كذلك العودة إلى التمارين للحصول على تصحيح مرجعي مفصل.</p><button class="btn btn-white" data-action="tab" data-next-tab="practice">الذهاب للتمارين ←</button></section></aside></div>`;}
function exportProgress(){const data=JSON.stringify({app:'francais-zakaria-60',version:2,exported:new Date().toISOString(),...state},null,2);const url=URL.createObjectURL(new Blob([data],{type:'application/json;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`zakaria-francais60-backup-${today()}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);toast('تم تجهيز النسخة الاحتياطية.');}
function importProgress(file){if(!file)return;if(file.size>3e6){toast('الملف كبير جدا.');return;}const reader=new FileReader();reader.onload=()=>{try{const raw=JSON.parse(reader.result);if(raw.app!=='francais-zakaria-60')throw Error('نوع الملف غير صحيح');if(!confirm('هل تريد استبدال التقدم الحالي بالنسخة المستوردة؟'))return;state=clean(raw);save();route();toast('تم استرجاع التقدم بنجاح.');}catch(e){toast('النسخة الاحتياطية غير صالحة.');}};reader.readAsText(file);}
function updatePuzzle(exid){const ex=ALL_EX[activeDay-1].find(x=>x.id===exid);const card=document.getElementById('ex-'+exid);if(!card||!ex)return;const key=`${activeDay}:${exid}`,selected=tempOrder[key]||[],shuffled=orderShuffle(ex.tokens,key);
 card.querySelector('.puzzle-picked').innerHTML=selected.length?selected.map((idx,i)=>`<button type="button" data-action="remove-token" data-ex="${exid}" data-index="${i}" class="word-token picked">${esc(ex.tokens[idx])} ×</button>`).join(''):'<small>اضغط على الكلمات بالترتيب الصحيح</small>';
 card.querySelector('.puzzle-bank').innerHTML=shuffled.filter(t=>!selected.includes(t.i)).map(t=>`<button type="button" data-action="pick-token" data-ex="${exid}" data-index="${t.i}" class="word-token">${esc(t.v)}</button>`).join('');}
function submitExercise(exid,value){const ex=ALL_EX[activeDay-1].find(x=>x.id===exid);if(!ex)return;const normalizedValue=String(value||'').trim();if(!normalizedValue){toast('اكتب إجابتك أولا.');return;}
 const r=ex.type==='choice'?{match:Number(value)===ex.answer}:evaluate(normalizedValue,ex.answer);
 record(activeDay,ex,normalizedValue,r.match);const feedback=document.querySelector(`[data-ex-feedback="${exid}"]`);if(feedback)feedback.innerHTML=exFeedback(ex,normalizedValue,r.match);
 const card=document.getElementById('ex-'+exid);if(card){const badge=card.querySelector('.exercise-top .pill');if(badge){badge.className='pill '+(r.match?'status-done':'status-pending');badge.textContent=r.match?'✓ صحيح':'↻ للمراجعة';}
 if(ex.type==='choice'){card.querySelectorAll('.option-button').forEach((b,i)=>{b.classList.remove('choice-right','choice-wrong');if(i===Number(value))b.classList.add(r.match?'choice-right':'choice-wrong');});}}
 const count=testsOf(activeDay).filter(x=>x?.correct).length;const scoreBadge=document.querySelector('.practice-intro .section-head .pill');if(scoreBadge)scoreBadge.textContent=count+' / 10 صحيحة';
 const big=document.querySelector('.practice-large');if(big)big.innerHTML=count+'<small>/ 10</small>';document.querySelectorAll('.practice-progress > div').forEach(x=>x.style.width=count*10+'%');
 toast(r.match?'إجابة صحيحة! أحسنت 🎉':'تم إظهار التصحيح والتفسير. يمكنك تعديل الإجابة.');}
function onClick(e){const week=e.target.closest('[data-week]');if(week){view.week=Number(week.dataset.week);document.getElementById('week-chips').innerHTML=weekChips();renderCatalogGrid();return;}
 const tab=e.target.closest('[data-tab]');if(tab){view.tab=tab.dataset.tab;renderTab();return;}
 const sent=e.target.closest('[data-sentences]');if(sent){view.sentences=sent.dataset.sentences;renderTab();return;}
 const type=e.target.closest('[data-ex-filter]');if(type){view.exerciseType=type.dataset.exFilter;renderTab();return;}
 const btn=e.target.closest('[data-action]');if(!btn)return;const action=btn.dataset.action,exid=btn.dataset.ex,day=activeDay;
 if(action==='speak'){speak(btn.dataset.phrase);return;}
 if(action==='tab'){view.tab=btn.dataset.nextTab;renderTab();document.querySelector('.lesson-tabs')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 if(action==='favorite'){const id=btn.dataset.id;state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];save();btn.textContent=state.favorites.includes(id)?'♥':'♡';btn.classList.toggle('favorited',state.favorites.includes(id));return;}
 if(action==='finish'){if(state.done[day]){delete state.done[day];toast('أعدت فتح الدرس للمراجعة.');}else{state.done[day]=today();toast('تهانينا! تم تسجيل إتمام الدرس.');}save();renderDay();updateNav('day');return;}
 if(action==='choose'){submitExercise(exid,btn.dataset.option);return;}
 if(action==='check'){submitExercise(exid,document.querySelector(`[data-answer-input="${exid}"]`)?.value);return;}
 if(action==='pick-token'){const key=`${day}:${exid}`;const arr=tempOrder[key]||[];const ix=Number(btn.dataset.index);if(!arr.includes(ix))arr.push(ix);tempOrder[key]=arr;updatePuzzle(exid);return;}
 if(action==='remove-token'){const key=`${day}:${exid}`;const arr=tempOrder[key]||[];arr.splice(Number(btn.dataset.index),1);tempOrder[key]=arr;updatePuzzle(exid);return;}
 if(action==='reset-order'){tempOrder[`${day}:${exid}`]=[];updatePuzzle(exid);return;}
 if(action==='submit-order'){const key=`${day}:${exid}`,selected=tempOrder[key]||[],ex=ALL_EX[day-1].find(x=>x.id===exid);if(selected.length!==ex.tokens.length){toast('اختر جميع الكلمات قبل التصحيح.');return;}submitExercise(exid,selected.map(i=>ex.tokens[i]).join(' '));return;}
 if(action==='export'){exportProgress();return;}
 if(action==='import'){document.getElementById('import-file')?.click();return;}
 if(action==='clear-note'){if(!confirm('هل تريد مسح النص الذي كتبته في هذا اليوم؟'))return;state.notes[day]='';save();renderWriting(LESSONS[day-1],document.getElementById('lesson-tab-content'));return;}
}
function onInput(e){const t=e.target;if(t.id==='search-lessons'){view.query=t.value;renderCatalogGrid();return;}
 if(t.dataset.answerInput){const ex=ALL_EX[activeDay-1].find(x=>x.id===t.dataset.answerInput);const el=document.querySelector(`[data-live="${ex.id}"]`);if(!el)return;const text=t.value.trim();if(text.length<2){el.textContent='تابع الكتابة للحصول على مراجعة فورية.';return;}const r=evaluate(text,ex.answer);el.innerHTML=r.match?'<span class="inline-right">✓ مطابق للنموذج!</span>':'<div class="live-caption">التصحيح المباشر (لا يحتسب ضمن النتيجة)</div>'+feedbackMarkup(r,ex.model,LESSONS[activeDay-1].tip,true);return;}
 if(t.id==='free-text'){state.notes[activeDay]=t.value.slice(0,6500);save();const feedback=document.getElementById('free-feedback');if(feedback)feedback.innerHTML=freeReview(t.value,LESSONS[activeDay-1]);const counter=document.getElementById('word-count');if(counter)counter.textContent=(t.value.trim()?t.value.trim().split(/\s+/).length:0)+' كلمة';return;}
 if(t.dataset.skill){const skill=t.dataset.skill;state.skills[skill]=Number(t.value);save();document.querySelector(`[data-skill-value="${skill}"]`).textContent=t.value+' / 5';}
}
function onChange(e){if(e.target.id==='filter-lessons'){view.filter=e.target.value;renderCatalogGrid();}
 if(e.target.id==='start-date'&&e.target.value){state.start=e.target.value;save();renderDashboard();toast('تم تعديل بداية التحدي.');}
 if(e.target.id==='import-file'){importProgress(e.target.files[0]);e.target.value='';}
}
document.addEventListener('click',onClick);document.addEventListener('input',onInput);document.addEventListener('change',onChange);window.addEventListener('hashchange',route);
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
route();
})();
