/* The Wealth Bible — app engine. Content lives in content/*.js */
"use strict";
const ORDER=["m01","m02","m03","m04","m05","m06","m07","m08","m09","m10","m11","m12","m13","m14","m15","m16","fl","oh"];
BIBLE.mods.sort((a,b)=>ORDER.indexOf(a.id)-ORDER.indexOf(b.id));
const MODS=BIBLE.mods, MOD=Object.fromEntries(MODS.map(m=>[m.id,m]));
const ALL_LESSONS=MODS.flatMap(m=>m.lessons.map(l=>({...l,mod:m.id})));
const ALL_CARDS=MODS.flatMap(m=>m.cards.map(c=>({...c,mod:m.id})));
const CARD=Object.fromEntries(ALL_CARDS.map(c=>[c.id,c]));
const LESSON=Object.fromEntries(ALL_LESSONS.map(l=>[l.id,l]));
const QUIZ_TOTAL=MODS.reduce((s,m)=>s+m.quiz.length,0);

/* ---------- state ---------- */
const DEF=()=>({read:{},done:{},quiz:{},srs:{},reps:{},daily:{},nw:[],settings:{rate:1,fs:16,state:"fl"},notes:{},checks:{}});
let S=load();
function load(){try{const j=JSON.parse(localStorage.getItem("wb_state")||"null");if(!j)return DEF();const d=DEF();return{...d,...j,settings:{...d.settings,...(j.settings||{})}};}catch(e){return DEF();}}
function save(){try{localStorage.setItem("wb_state",JSON.stringify(S));}catch(e){}}
const DAY=86400000;
const dstr=t=>{const d=new Date(t);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
const today=()=>dstr(Date.now());
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt$=n=>(n<0?"-$":"$")+Math.abs(Math.round(n)).toLocaleString();
const pct=n=>(n*100).toFixed(1)+"%";
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1600);}
function applyFs(){document.documentElement.style.setProperty("--fs",S.settings.fs+"px");}
applyFs();

/* ---------- spaced repetition ---------- */
function srsOf(id){return S.srs[id]||{e:2.5,i:0,d:0,r:0,l:0};}
const due=id=>{const s=S.srs[id];return !!s&&s.d<=Date.now();};
function nextIvl(s,g){let i=s.i,e=s.e;if(g===1)i=Math.max(1,Math.round(i*1.2)||1);else if(g===2)i=i===0?1:Math.max(i+1,Math.round(i*e));else i=i===0?3:Math.max(i+2,Math.round(i*e*1.3));return i;}
function grade(id,g){const s=srsOf(id);if(g===0){s.r=0;s.l++;s.i=0;s.e=Math.max(1.3,s.e-0.2);s.d=Date.now()+10*60000;}else{s.i=nextIvl(s,g);if(g===1)s.e=Math.max(1.3,s.e-0.15);if(g===3)s.e+=0.1;s.r++;s.d=Date.now()+s.i*DAY;}S.srs[id]=s;save();}
const seenIds=()=>ALL_CARDS.filter(c=>S.srs[c.id]).map(c=>c.id);
const dueIds=()=>seenIds().filter(due);
const weakIds=()=>seenIds().filter(id=>S.srs[id].l>=2);
const modCardIds=m=>MOD[m].cards.map(c=>c.id);
function modProg(m){const L=MOD[m].lessons,ids=modCardIds(m);return{read:L.filter(l=>S.read[l.id]).length,total:L.length,seen:ids.filter(id=>S.srs[id]).length,due:ids.filter(due).length,cards:ids.length,quiz:S.quiz[m],done:!!S.done[m]};}

/* ---------- router ---------- */
window.addEventListener("hashchange",render);
function go(h){if(location.hash==="#"+h)render();else location.hash=h;}
function setTitle(a,b){$("#tbT1").textContent=a;$("#tbT2").textContent=b;}
$("#backBtn").onclick=()=>{const[r,a]=(location.hash.slice(1)||"today").split("/");if(r==="l")go("m/"+LESSON[a].mod);else if(r==="m")go("learn");else if(r==="cs")go(MOD[a]?"m/"+a:"cards");else if(r==="quiz")go("m/"+a);else if(r==="tool")go("tools");else go("more");};
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{sess=null;qz=null;go(b.dataset.t);});
function render(){
  stopSpeak();closeJump();
  const [r,a]=(location.hash.slice(1)||"today").split("/");
  const tab={today:"today",learn:"learn",m:"learn",l:"learn",quiz:"learn",cards:"cards",cs:"cards",tools:"tools",tool:"tools"}[r]||"more";
  document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("on",x.dataset.t===tab));
  $("#topbar").classList.toggle("has-back",!["today","learn","cards","tools","more"].includes(r)||(r==="more"&&!!a));
  const v=$("#view");v.innerHTML="";
  const fn={today:vToday,learn:vLearn,m:vModule,l:vLesson,cards:vCards,cs:vSession,quiz:vQuiz,tools:vTools,tool:vTool,more:vMore}[r]||vToday;
  try{fn(v,a);}catch(e){console.error(e);v.innerHTML=`<div class="card">Something went wrong. <button class="btn" onclick="go('today')">Go home</button></div>`;}
  window.scrollTo(0,0);
}

/* ---------- jump sheet (bounce anywhere) ---------- */
$("#jumpBtn").onclick=openJump;
$("#jumpSheet").addEventListener("click",e=>{if(e.target.id==="jumpSheet")closeJump();});
function closeJump(){$("#jumpSheet").classList.remove("open");}
function openJump(){
  const cur=(location.hash.match(/^#(?:l|m|cs|quiz)\/([\w-]+)/)||[])[1];
  const curMod=cur?(MOD[cur]?cur:(LESSON[cur]||{}).mod):null;
  let h=`<div class="grab"></div><div class="label" style="margin-top:0">Jump to any module or chapter</div>`,part=0;
  MODS.forEach(m=>{
    if(m.part!==part){part=m.part;h+=`<div class="tiny muted" style="margin:12px 10px 4px;letter-spacing:.1em;text-transform:uppercase">Part ${part} · ${esc(PARTS[part])}</div>`;}
    const p=modProg(m.id);
    h+=`<div class="jm" data-tog="${m.id}"><span>${m.icon}</span><span style="flex:1">${esc(m.title)}</span><span class="tiny muted">${p.read}/${p.total}</span></div><div id="j-${m.id}" style="display:${m.id===curMod?'block':'none'}">`;
    h+=`<div class="jl" data-go="m/${m.id}">▸ Module overview</div>`;
    m.lessons.forEach((l,i)=>{h+=`<div class="jl ${S.read[l.id]?'read':''}" data-go="l/${l.id}">${S.read[l.id]?'✓ ':''}${i+1}. ${esc(l.title)}</div>`;});
    h+=`<div class="jl" data-go="cs/${m.id}">🃏 Flashcards (${m.cards.length})</div><div class="jl" data-go="quiz/${m.id}">✅ Quiz · optional (${m.quiz.length})</div></div>`;
  });
  const b=$("#jumpBody");b.innerHTML=h;
  b.querySelectorAll("[data-tog]").forEach(x=>x.onclick=()=>{const e=$("#j-"+x.dataset.tog);e.style.display=e.style.display==="none"?"block":"none";});
  b.querySelectorAll("[data-go]").forEach(x=>x.onclick=()=>{closeJump();sess=null;qz=null;go(x.dataset.go);});
  $("#jumpSheet").classList.add("open");
  if(curMod){const el=$("#j-"+curMod);if(el)setTimeout(()=>el.previousElementSibling.scrollIntoView({block:"start"}),30);}
}

/* ---------- listen ---------- */
let speaking=false;
function stopSpeak(){if(window.speechSynthesis)speechSynthesis.cancel();speaking=false;const b=$("#lsBtn");if(b)b.textContent="▶︎ Listen";}
function speak(text){
  if(!window.speechSynthesis){toast("Listen isn't supported on this browser");return;}
  const b=$("#lsBtn");
  if(speechSynthesis.speaking&&!speechSynthesis.paused){speechSynthesis.pause();if(b)b.textContent="▶︎ Resume";return;}
  if(speechSynthesis.paused){speechSynthesis.resume();if(b)b.textContent="⏸ Pause";return;}
  speechSynthesis.cancel();
  // iOS cuts off long utterances: speak in sentence chunks
  const chunks=text.replace(/\s+/g," ").match(/[^.!?]+[.!?]*\s*/g)||[text];
  const groups=[];let cur="";chunks.forEach(c=>{if((cur+c).length>220){groups.push(cur);cur=c;}else cur+=c;});if(cur)groups.push(cur);
  const vs=speechSynthesis.getVoices();
  const voice=vs.find(v=>/en[-_]US/i.test(v.lang)&&/Ava|Samantha|Allison|Evan|Nathan|Zoe|Google US/i.test(v.name))||vs.find(v=>/en[-_]US/i.test(v.lang));
  groups.forEach((g,i)=>{const u=new SpeechSynthesisUtterance(g);u.rate=S.settings.rate;u.lang="en-US";if(voice)u.voice=voice;if(i===groups.length-1)u.onend=()=>{speaking=false;const bb=$("#lsBtn");if(bb)bb.textContent="▶︎ Listen";};speechSynthesis.speak(u);});
  speaking=true;if(b)b.textContent="⏸ Pause";
}
const spokenize=s=>String(s).replace(/×/g," times ").replace(/÷/g," divided by ").replace(/→/g,", gives ").replace(/≤/g," at most ").replace(/≥/g," at least ").replace(/\|/g,". ").replace(/−/g," minus ").replace(/~/g,"about ");
function lessonText(l){return spokenize([l.title+"."].concat(l.blocks.map(b=>b.h!==undefined?`${b.h}. ${b.p||""}`:b.formula?`Formula. ${b.formula}.`:b.example?`Example. ${b.example}`:b.carry?`The number to carry. ${b.carry}`:b.trap?`Watch out. ${b.trap}`:b.state?`${b.state.fl?"In Florida. "+b.state.fl:""} ${b.state.oh?"In Ohio. "+b.state.oh:""}`:"")).join(" "));}

/* ---------- TODAY ---------- */
function vToday(v){
  setTitle("THE WEALTH BIBLE","Real Estate Investor Edition");
  const d=today(),rp=S.reps[d]||{c:0,t:0,o:0,a:0},dueN=dueIds().length;
  const next=ALL_LESSONS.find(l=>!S.read[l.id]);
  const m=next?MOD[next.mod]:MODS[0];
  const drill=m.drills[new Date().getDate()%m.drills.length];
  const readToday=Object.values(S.read).filter(x=>x===d).length,cardsToday=(S.daily[d]||{}).cards||0,repsToday=rp.c+rp.t+rp.o+rp.a;
  const goals=[readToday>0,cardsToday>=10,repsToday>0];
  v.innerHTML=`
  <div class="rowx" style="margin-bottom:12px"><div class="stat"><div class="n">${streak()}</div><div class="l">Day streak</div></div><div class="stat"><div class="n">${dueN}</div><div class="l">Cards due</div></div><div class="stat"><div class="n">${Object.keys(S.read).length}</div><div class="l">of ${ALL_LESSONS.length} read</div></div></div>
  <div class="card" style="padding:12px 14px">
    <div style="font-weight:700;margin-bottom:6px">${goals.every(Boolean)?'<span class="green">✓ Today is done.</span> Protect the streak tomorrow.':'Today\'s three wins'}</div>
    ${[["Read 1 chapter",goals[0]],["Review 10 cards ("+Math.min(cardsToday,10)+"/10)",goals[1]],["Log 1 real rep (call, text, offer, analysis)",goals[2]]].map(([t,ok])=>`<div style="display:flex;gap:10px;align-items:center;padding:5px 0"><div class="check ${ok?'on':''}" style="width:22px;height:22px;font-size:12px">${ok?'✓':''}</div><span class="${ok?'muted':''}">${t}</span></div>`).join("")}
  </div>
  <div class="label">Continue learning</div>
  ${next?`<div class="card tap" onclick="go('l/${next.id}')"><span class="pill pill-g">${m.icon} ${esc(m.title)}</span><h3 style="margin-top:8px">${esc(next.title)}</h3><div class="small muted" style="margin-top:4px">${next.minutes||5} min · tap to read or listen</div></div>`:`<div class="card">You've read every chapter. Keep cards and reps going.</div>`}
  <div class="label">Flashcards</div>
  <div class="rowx"><button class="btn primary" onclick="sess=null;go('cs/due')">Review due (${dueN})</button><button class="btn" onclick="sess=null;go('cs/new')">Learn new</button></div>
  <div class="label">Today's drill</div>
  <div class="carry"><b>Do this today</b>${esc(drill)}</div>
  <div class="label">Reps log · today</div>
  <div class="rep">${[["c","Calls"],["t","Texts / mail"],["o","Offers"],["a","Deals run"]].map(([k,l])=>`<button data-rep="${k}"><span class="n">${rp[k]||0}</span><span class="l">${l}</span></button>`).join("")}</div>
  <div class="tiny muted" style="margin-top:6px">Tap to add one. Press and hold to take one off.</div>
  <div class="label">Last 7 days</div><div class="card small">${week()}</div>`;
  v.querySelectorAll("[data-rep]").forEach(b=>{let t=null,held=false;const k=b.dataset.rep;
    b.addEventListener("touchstart",()=>{held=false;t=setTimeout(()=>{held=true;rep(k,-1);},550);},{passive:true});
    b.addEventListener("touchend",()=>clearTimeout(t));
    b.addEventListener("click",()=>{if(!held)rep(k,1);held=false;});});
}
function rep(k,n){const d=today(),r=S.reps[d]||{c:0,t:0,o:0,a:0};r[k]=Math.max(0,(r[k]||0)+n);S.reps[d]=r;save();if(navigator.vibrate)navigator.vibrate(8);render();}
function activeOn(d){const r=S.reps[d]||{};return Object.values(S.read).includes(d)||((S.daily[d]||{}).cards>0)||((r.c||0)+(r.t||0)+(r.o||0)+(r.a||0))>0;}
function streak(){let s=0;for(let i=0;i<730;i++){const d=dstr(Date.now()-i*DAY);if(activeOn(d))s++;else if(i>0)break;}return s;}
function week(){let h='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center">';for(let i=6;i>=0;i--){const t=Date.now()-i*DAY,d=dstr(t),r=S.reps[d]||{},n=(r.c||0)+(r.t||0)+(r.o||0)+(r.a||0);h+=`<div><div class="tiny muted">${new Date(t).toLocaleDateString(undefined,{weekday:"short"})}</div><div style="font-weight:800;color:${n?'var(--green)':'var(--gray-d)'}">${n}</div><div class="tiny">${Object.values(S.read).includes(d)?'📖':'&nbsp;'}${(S.daily[d]||{}).cards?'🃏':''}</div></div>`;}return h+'</div><div class="tiny muted" style="margin-top:6px">Number = reps · 📖 read · 🃏 cards</div>';}

/* ---------- LEARN ---------- */
function vLearn(v){
  setTitle("THE WEALTH BIBLE",`Learn · ${MODS.length} modules`);
  const tr=Object.keys(S.read).filter(k=>LESSON[k]).length;
  let h=`<div class="card"><div class="rr"><span class="l">Your progress</span><span class="v green">${tr} / ${ALL_LESSONS.length} chapters</span></div><div class="bar"><i style="width:${tr/ALL_LESSONS.length*100}%"></i></div><div class="small muted">Each module runs Read → Cards → Quiz. The order below is the recommended path, but nothing is locked. Jump anywhere with ☰ Jump. Quizzes are optional.</div></div>`,part=0;
  MODS.forEach(m=>{if(m.part!==part){part=m.part;h+=`<div class="label">Part ${part} · ${esc(PARTS[part])}</div>`;}
    const p=modProg(m.id);
    h+=`<div class="card tap" style="padding:14px" onclick="go('m/${m.id}')"><div style="display:flex;gap:12px;align-items:center"><div style="font-size:28px">${m.icon}</div><div style="flex:1;min-width:0"><div style="font-weight:700">${esc(m.title)}</div><div class="small muted">${p.total} chapters · ${p.cards} cards${p.due?` · <span class="green">${p.due} due</span>`:''}${p.quiz!=null?` · quiz ${p.quiz}%`:''}</div></div><div class="check ${p.done?'on':''}">${p.done?'✓':''}</div></div><div class="bar" style="margin-bottom:0"><i style="width:${p.read/p.total*100}%"></i></div></div>`;});
  v.innerHTML=h;
}
function vModule(v,id){
  const m=MOD[id];if(!m)return go("learn");
  setTitle(m.title,`Part ${m.part} · ${PARTS[m.part]}`);
  const p=modProg(id),next=m.lessons.find(l=>!S.read[l.id])||m.lessons[0],newN=p.cards-p.seen;
  v.innerHTML=`
  <div class="card"><div style="font-size:34px">${m.icon}</div><h1 style="margin:6px 0 4px">${esc(m.title)}</h1><p class="muted">${esc(m.summary)}</p></div>
  <div class="path">
    <div class="st ${p.read===p.total?'done':''}" onclick="go('l/${next.id}')"><div class="k">1 · Read</div><div class="v">${p.read}/${p.total}</div></div><span class="ar">›</span>
    <div class="st ${p.seen===p.cards&&!p.due?'done':''}" onclick="sess=null;go('cs/${id}')"><div class="k">2 · Cards</div><div class="v">${p.due?p.due+' due':newN?newN+' new':'✓'}</div></div><span class="ar">›</span>
    <div class="st ${p.quiz!=null?'done':''}" onclick="qz=null;go('quiz/${id}')"><div class="k">3 · Quiz</div><div class="v">${p.quiz!=null?p.quiz+'%':'optional'}</div></div>
  </div>
  <button class="btn primary" onclick="go('l/${next.id}')">${p.read?'Continue':'Start'}: ${esc(next.title)}</button>
  <div class="label">Chapters</div>
  <div class="card" style="padding:0 8px">${m.lessons.map((l,i)=>`<div class="list-item" onclick="go('l/${l.id}')"><div class="check ${S.read[l.id]?'on':''}">${S.read[l.id]?'✓':''}</div><div class="body"><div class="ttl">${i+1}. ${esc(l.title)}</div><div class="sub">${l.minutes||5} min</div></div><span class="chev">›</span></div>`).join("")}</div>
  <div class="label">Do this week</div>
  <div class="card" style="padding:4px 14px">${m.drills.map((d,i)=>{const k=id+"#"+i;return`<div class="cb ${S.checks[k]?'on':''}" data-k="${k}"><div class="box">${S.checks[k]?'✓':''}</div><div>${esc(d)}</div></div>`;}).join("")}</div>
  <button class="btn ${p.done?'':'primary'}" style="margin-top:14px" id="doneBtn">${p.done?'✓ Module complete · tap to reopen':'Mark module complete'}</button>
  <div class="small muted" style="margin-top:8px;text-align:center">The quiz is optional. Mark complete whenever you're ready.</div>`;
  v.querySelectorAll(".cb").forEach(x=>x.onclick=()=>{const k=x.dataset.k;S.checks[k]=!S.checks[k];save();x.classList.toggle("on");x.querySelector(".box").textContent=S.checks[k]?"✓":"";});
  $("#doneBtn").onclick=()=>{S.done[id]=!S.done[id];save();toast(S.done[id]?"Module complete":"Module reopened");render();};
}
function vLesson(v,id){
  const l=LESSON[id];if(!l)return go("learn");
  const m=MOD[l.mod],i=m.lessons.findIndex(x=>x.id===id),prev=m.lessons[i-1],next=m.lessons[i+1],st=S.settings.state;
  setTitle(m.title,`Chapter ${i+1} of ${m.lessons.length}`);
  let h=`<div class="lesson"><span class="pill pill-g">${m.icon} ${esc(m.title)}</span><h1 style="margin-top:8px">${esc(l.title)}</h1><div class="meta">Chapter ${i+1} · ${l.minutes||5} min${S.read[id]?' · ✓ read':''}</div>
  <div class="listen"><button class="btn sm primary" id="lsBtn">▶︎ Listen</button><button class="btn sm" onclick="stopSpeak()">■ Stop</button><select id="rateSel">${[0.8,0.9,1,1.1,1.2,1.4,1.6].map(r=>`<option value="${r}" ${r===S.settings.rate?'selected':''}>${r}×</option>`).join("")}</select></div>`;
  l.blocks.forEach(b=>{
    if(b.h!==undefined)h+=`<div class="block"><h3>${esc(b.h)}</h3>${String(b.p||"").split(/\n+/).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join("")}</div>`;
    else if(b.formula)h+=`<div class="block"><div class="formula">${esc(b.formula)}</div></div>`;
    else if(b.example)h+=`<div class="block"><div class="example"><b>Worked example</b>${esc(b.example)}</div></div>`;
    else if(b.carry)h+=`<div class="block"><div class="carry"><b>The number to carry</b>${esc(b.carry)}</div></div>`;
    else if(b.trap)h+=`<div class="block"><div class="trap"><b>Trap</b>${esc(b.trap)}</div></div>`;
    else if(b.state)h+=`<div class="block"><div class="state">${b.state.fl?`<div style="${st==='fl'?'border-color:var(--orange)':''}"><b>🌴 FLORIDA</b>${esc(b.state.fl)}</div>`:""}${b.state.oh?`<div style="${st==='oh'?'border-color:var(--orange)':''}"><b>🌰 OHIO</b>${esc(b.state.oh)}</div>`:""}</div></div>`;
    else if(b.sources)h+=`<div class="block sources"><b class="tiny" style="letter-spacing:.1em">SOURCES</b>${b.sources.map(s=>`<a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a>`).join("")}</div>`;
  });
  h+=`<button class="btn ${S.read[id]?'':'primary'}" id="readBtn">${next?(S.read[id]?'Next chapter ›':'✓ Mark read & next chapter'):(S.read[id]?'Back to module':'✓ Mark read & finish module')}</button>
  <div class="lesson-nav"><button class="btn ghost" ${prev?`onclick="go('l/${prev.id}')"`:'disabled'}>‹ Prev</button><button class="btn ghost" onclick="sess=null;go('cs/${m.id}')">🃏 Cards</button><button class="btn ghost" onclick="${next?`go('l/${next.id}')`:`go('m/${m.id}')`}">${next?'Skip ›':'Module'}</button></div></div>`;
  v.innerHTML=h;
  $("#lsBtn").onclick=()=>speak(lessonText(l));
  $("#rateSel").onchange=e=>{S.settings.rate=parseFloat(e.target.value);save();stopSpeak();};
  $("#readBtn").onclick=()=>{if(!S.read[id])S.read[id]=today();save();if(next)go("l/"+next.id);else{toast("Module read. Try the cards.");go("m/"+m.id);}};
}

/* ---------- CARDS ---------- */
function vCards(v){
  setTitle("THE WEALTH BIBLE","Flashcards");
  const dn=dueIds().length,wn=weakIds().length,nn=ALL_CARDS.length-seenIds().length;
  let h=`<div class="rowx" style="margin-bottom:12px"><div class="stat"><div class="n">${dn}</div><div class="l">Due</div></div><div class="stat"><div class="n">${wn}</div><div class="l">Weak</div></div><div class="stat"><div class="n">${nn}</div><div class="l">New</div></div></div>
  <button class="btn primary" onclick="sess=null;go('cs/due')">Review due cards (${dn})</button><div style="height:8px"></div>
  <div class="rowx"><button class="btn" onclick="sess=null;go('cs/new')">Learn 20 new</button><button class="btn" onclick="sess=null;go('cs/weak')">Weak spots (${wn})</button></div>
  <div class="small muted" style="margin-top:10px">Grade yourself honestly. Cards you miss come back in minutes; cards you know come back in days, then weeks. ${ALL_CARDS.length} cards total.</div>
  <div class="label">Study one module</div><div class="card" style="padding:0 8px">`;
  MODS.forEach(m=>{const p=modProg(m.id);h+=`<div class="list-item" onclick="sess=null;go('cs/${m.id}')"><span class="ic">${m.icon}</span><div class="body"><div class="ttl">${esc(m.title)}</div><div class="sub">${p.cards} cards · ${p.due} due · ${p.cards-p.seen} new</div></div><span class="chev">›</span></div>`;});
  v.innerHTML=h+"</div>";
}
let sess=null;
function vSession(v,mode){
  if(!sess||sess.mode!==mode){let ids,limit=40;
    if(mode==="due")ids=dueIds();else if(mode==="weak")ids=weakIds();
    else if(mode==="new"){ids=ALL_CARDS.filter(c=>!S.srs[c.id]).map(c=>c.id);limit=20;ids=ids.slice(0,limit);}
    else if(MOD[mode]){const all=modCardIds(mode),d=all.filter(due),n=all.filter(x=>!S.srs[x]);ids=d.concat(n);if(!ids.length)ids=all;}
    else return go("cards");
    sess={mode,ids:mode==="new"?ids:shuffle(ids).slice(0,limit),i:0,good:0,again:0};}
  const title=MOD[mode]?MOD[mode].title:{due:"Due cards",weak:"Weak spots",new:"New cards"}[mode];
  setTitle(title,sess.ids.length?`Card ${Math.min(sess.i+1,sess.ids.length)} of ${sess.ids.length}`:"Flashcards");
  if(!sess.ids.length||sess.i>=sess.ids.length){
    const tot=sess.good+sess.again;
    v.innerHTML=`<div class="card score-big"><div class="pct">${tot?Math.round(sess.good/tot*100)+'%':'✓'}</div><div class="muted" style="margin-top:8px">${tot?`${sess.good} good · ${sess.again} again`:'Nothing due here right now. Learn new cards or come back later.'}</div></div>
    <div class="rowx"><button class="btn primary" onclick="sess=null;go('${MOD[mode]?'m/'+mode:'cards'}')">Done</button><button class="btn" onclick="sess=null;go('cs/new')">Learn new</button></div>`;return;}
  const c=CARD[sess.ids[sess.i]],m=MOD[c.mod],s=srsOf(c.id);
  v.innerHTML=`<div class="small muted" style="display:flex;justify-content:space-between;gap:8px"><span>${m.icon} ${esc(m.title)}</span><span class="pill pill-x">${esc(c.type)}</span></div>
  <div class="bar"><i style="width:${sess.i/sess.ids.length*100}%"></i></div>
  <div class="fc-wrap"><div class="fc" id="fc"><div class="f"><div class="lbl">Question</div><div class="q">${esc(c.q)}</div><div class="hint">Tap the card to flip</div></div><div class="b"><div class="lbl">Answer</div><div class="a">${esc(c.a)}</div></div></div></div>
  <div class="grade"><button class="g0" data-g="0">Again<small>10 min</small></button><button class="g1" data-g="1">Hard<small>${nextIvl(s,1)}d</small></button><button class="g2" data-g="2">Good<small>${nextIvl(s,2)}d</small></button><button class="g3" data-g="3">Easy<small>${nextIvl(s,3)}d</small></button></div>
  <div class="listen" style="margin-top:12px"><button class="btn sm" id="lsBtn">▶︎ Listen</button><button class="btn sm" onclick="go('l/${m.lessons[0].id}')">📖 Read the chapter</button><button class="btn sm ghost" onclick="sess.i++;render()">Skip</button></div>`;
  $("#fc").onclick=()=>$("#fc").classList.toggle("flip");
  $("#lsBtn").onclick=()=>speak(spokenize(c.q+". Answer. "+c.a));
  v.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{const g=+b.dataset.g;grade(c.id,g);if(g===0){sess.again++;sess.ids.push(c.id);}else sess.good++;const d=today();S.daily[d]=S.daily[d]||{};S.daily[d].cards=(S.daily[d].cards||0)+1;save();sess.i++;render();});
}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

/* ---------- QUIZ (optional) ---------- */
let qz=null;
function vQuiz(v,mid){
  const m=MOD[mid];if(!m)return go("learn");
  if(!qz||qz.mid!==mid)qz={mid,qs:shuffle(m.quiz),i:0,score:0,picked:null};
  setTitle(m.title,`Quiz · ${Math.min(qz.i+1,qz.qs.length)} of ${qz.qs.length} · optional`);
  if(qz.i>=qz.qs.length){const p=Math.round(qz.score/qz.qs.length*100);S.quiz[mid]=Math.max(S.quiz[mid]||0,p);save();
    v.innerHTML=`<div class="card score-big"><div class="pct">${p}%</div><div class="muted" style="margin-top:8px">${qz.score} of ${qz.qs.length} · ${p>=80?'Strong. Move on.':p>=60?'Close. Run the cards once more.':'Re-read the chapters, then retry.'}</div></div><div class="rowx"><button class="btn primary" onclick="qz=null;go('m/${mid}')">Back to module</button><button class="btn" onclick="qz=null;render()">Retry</button></div>`;return;}
  const q=qz.qs[qz.i],P=qz.picked;
  v.innerHTML=`<div class="bar"><i style="width:${qz.i/qz.qs.length*100}%"></i></div><div class="qq">${esc(q.q)}</div>
  ${q.opts.map((o,i)=>`<button class="opt ${P!=null?(i===q.correct?'right':i===P?'wrong':''):''}" data-o="${i}" ${P!=null?'disabled':''}>${esc(o)}</button>`).join("")}
  ${P!=null?`<div class="explain">${P===q.correct?'✓ ':'✗ '}${esc(q.explain)}</div><button class="btn primary" id="qNext">${qz.i+1<qz.qs.length?'Next question ›':'See my score'}</button>`:''}
  <button class="btn ghost" style="margin-top:8px" onclick="qz=null;go('m/${mid}')">Exit quiz</button>`;
  v.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{qz.picked=+b.dataset.o;if(qz.picked===q.correct)qz.score++;render();});
  const n=$("#qNext");if(n)n.onclick=()=>{qz.i++;qz.picked=null;render();};
}

/* ---------- TOOLS ---------- */
const TOOLS=[["deal","🏠","BRRRR Deal Analyzer","MAO · 75% test · DSCR · cash flow"],["doors","🎯","Income Replacement","How many doors to replace a paycheck"],["mort","📉","Mortgage Calculator","Amortizing vs interest-only"],["nw","📈","Net Worth Tracker","Private · stays on this phone"],["dep","🧾","Depreciation Estimator","Paper losses & tax value"],["heloc","🏦","HELOC Planner","Equity as seed capital"],["mkt","📣","Marketing Budget","Spend → leads → deals"],["rehab","🔨","Rehab Quick Pricer","Line items + contingency"]];
function vTools(v){setTitle("THE WEALTH BIBLE","Calculators");v.innerHTML=`<div class="grid2">${TOOLS.map(([id,ic,t,s])=>`<div class="tile" onclick="go('tool/${id}')"><div class="ic">${ic}</div><div class="t">${t}</div><div class="s">${s}</div></div>`).join("")}</div><div class="small muted" style="margin-top:14px">Education only. Confirm real numbers with your lender, CPA and attorney.</div>`;}
let TV={};try{TV=JSON.parse(localStorage.getItem("wb_tools")||"{}");}catch(e){}
const saveTV=()=>{try{localStorage.setItem("wb_tools",JSON.stringify(TV));}catch(e){}};
const num=(id,label,def)=>{if(TV[id]==null)TV[id]=def;return`<div class="f"><label>${label}</label><input type="number" inputmode="decimal" data-tv="${id}" value="${TV[id]}"></div>`;};
const pick=(id,label,opts,def)=>{if(TV[id]==null)TV[id]=def;return`<div class="f"><label>${label}</label><select data-tv="${id}" data-s="1">${opts.map(([v,l])=>`<option value="${v}" ${String(TV[id])===String(v)?'selected':''}>${l}</option>`).join("")}</select></div>`;};
const rr=(l,v,c)=>`<div class="rr"><span class="l">${l}</span><span class="v ${c||''}">${v}</span></div>`;
let curTool="";
function vTool(v,id){
  const t=TOOLS.find(x=>x[0]===id);if(!t)return go("tools");curTool=id;setTitle(t[2],"Calculator");
  const F={
    deal:()=>pick("st","State (closing-cost estimate)",[["fl","Florida: loan doc stamps + intangible tax"],["oh","Ohio: no tax on mortgages"],["x","Other"]],S.settings.state)+num("arv","After-repair value (ARV) $",200000)+num("price","Purchase price $",115000)+num("rehab","Rehab estimate $",35000)+num("cont","Rehab contingency %",20)+num("hold","Holding costs during rehab $",4000)+num("rent","Monthly rent $",1800)+num("ltv","Refinance LTV %",75)+num("rate","Refinance rate %",7.25)+pick("io","Refinance loan type",[["am","30-year amortizing"],["io","Interest-only"]],"am")+num("tax","Property tax / year $",2800)+num("ins","Insurance / year $",2200)+num("mgmt","Management % of rent",8)+num("vac","Vacancy %",6)+num("rep","Repairs + CapEx reserve %",10)+pick("mao","Max offer rule",[["0.70","70% of ARV − rehab"],["0.65","65% (high closing-cost states)"]],"0.70"),
    doors:()=>num("goal","Monthly income to replace $",6000)+num("cfd","Net cash flow per door / month $",175)+num("dpy","Doors added per year",4)+num("wh","Active income per year (wholesale fees, commissions) $",0),
    mort:()=>num("loan","Loan amount $",150000)+num("mr","Interest rate %",7.25)+num("yrs","Term (years)",30),
    nw:()=>num("a1","Cash & savings $",0)+num("a2","Real estate (market value) $",0)+num("a3","Retirement & investments $",0)+num("a4","Vehicles & other assets $",0)+num("l1","Mortgage balances $",0)+num("l2","Credit cards & loans $",0)+num("l3","Other debts $",0),
    dep:()=>num("basis","Purchase price + closing costs $",180000)+num("land","Land share of value %",20)+num("imp","Capital improvements $",35000)+num("brk","Your tax bracket %",22)+num("cseg","Share reclassified by cost seg %",25),
    heloc:()=>num("hv","Home value $",350000)+num("hb","Mortgage balance $",220000)+num("cltv","Lender's max CLTV %",85)+num("hr","HELOC rate %",8.5)+num("use","Amount you'd draw $",50000)+num("mo","Months until the refi pays it back",9),
    mkt:()=>num("spend","Monthly marketing spend $",1000)+num("cpl","Cost per lead $",60)+num("l2a","Leads → appointments %",20)+num("a2o","Appointments → offers %",60)+num("o2d","Offers → signed deals %",10)+num("fee","Average profit per deal $",12000),
    rehab:()=>[["roof","Roof"],["hvac","HVAC"],["elec","Electrical / panel"],["plumb","Plumbing / water heater"],["kit","Kitchen"],["bath","Bathrooms"],["floor","Flooring"],["paint","Paint inside & out"],["win","Windows & doors"],["ext","Exterior & landscaping"],["misc","Permits, dumpster, misc"]].map(([k,l])=>num("rh_"+k,l+" $",0)).join("")+num("rcont","Contingency %",20),
  };
  v.innerHTML=`<div class="card">${F[id]()}</div><div class="label">Results</div><div class="card" id="out"></div>${id==="nw"?`<button class="btn" id="snap">Save today's snapshot</button><div class="label">History</div><div class="card small">${S.nw.length?S.nw.slice(-12).reverse().map(x=>rr(x.d,fmt$(x.v),x.v>=0?'green':'red')).join(""):'<span class="muted">No snapshots yet. Stored only on this phone.</span>'}</div>`:''}`;
  v.querySelectorAll("[data-tv]").forEach(el=>el.addEventListener(el.dataset.s?"change":"input",()=>{TV[el.dataset.tv]=el.dataset.s?el.value:(parseFloat(el.value)||0);saveTV();calc();}));
  const sn=$("#snap");if(sn)sn.onclick=()=>{S.nw.push({d:today(),v:(+TV.a1+ +TV.a2+ +TV.a3+ +TV.a4)-(+TV.l1+ +TV.l2+ +TV.l3)});save();toast("Snapshot saved");render();};
  calc();
}
const pmt=(P,r,n)=>{r=r/100/12;return r?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n;};
function calc(){
  const o=$("#out");if(!o)return;const T=new Proxy(TV,{get:(t,k)=>{const x=t[k];return isNaN(+x)?x:+x;}});let h="";
  if(curTool==="deal"){
    const rehab=T.rehab*(1+T.cont/100),mao=T.arv*parseFloat(T.mao)-rehab,loan=T.arv*T.ltv/100;
    const buyClose=1500+(T.st==="fl"?0:0), hmLoan=T.price*0.9, hmTax=T.st==="fl"?hmLoan*0.0055:0, hmPts=hmLoan*0.02;
    const refiTax=T.st==="fl"?loan*0.0055:0, refiFees=loan*0.02+1500;
    const allIn=T.price+rehab+T.hold+buyClose+hmTax+hmPts, allPct=allIn/T.arv;
    const net=loan-refiFees-refiTax-allIn;
    const pi=T.io==="io"?loan*T.rate/100/12:pmt(loan,T.rate,360),pitia=pi+(T.tax+T.ins)/12;
    const opx=T.rent*(T.mgmt+T.vac+T.rep)/100,cf=T.rent-pitia-opx,dscr=pitia?T.rent/pitia:0,cash=allIn-hmLoan;
    const g=[T.price<=mao,allPct<=0.75,dscr>=1.2,cf>=150];
    h=rr("Max offer (MAO)",fmt$(mao),g[0]?'green':'red')+rr("Rehab incl. "+T.cont+"% contingency",fmt$(rehab))+rr("Hard-money points & "+(T.st==="fl"?"FL loan taxes":"fees"),fmt$(hmPts+hmTax+buyClose))+rr("All-in cost",fmt$(allIn))+rr("All-in as % of ARV",pct(allPct),g[1]?'green':'red')+rr("Refinance loan ("+T.ltv+"% LTV)",fmt$(loan))+rr("Refi fees"+(T.st==="fl"?" + FL loan taxes":""),fmt$(refiFees+refiTax))+rr(net>=0?"Cash back after refi":"Cash left in the deal",fmt$(Math.abs(net)),net>=0?'green':'orange')+rr("Monthly P&I"+(T.io==="io"?" (IO)":""),fmt$(pi))+rr("PITIA",fmt$(pitia))+rr("DSCR (lenders want 1.20+)",dscr.toFixed(2),g[2]?'green':'red')+rr("Reserves (mgmt, vacancy, repairs)",fmt$(opx)+"/mo")+rr("Net cash flow",fmt$(cf)+"/mo",g[3]?'green':cf>0?'orange':'red')+rr("Cash-on-cash",net>=0?"∞ (no cash left in)":pct(cf*12/Math.abs(net)));
    const n=g.filter(Boolean).length;
    h+=`<div class="verdict ${n===4?'ok':n>=2?'warn':'bad'}">${n===4?'✓ Passes all 4 gates: price ≤ MAO, all-in ≤ 75%, DSCR ≥ 1.20, cash flow ≥ $150':n>=2?`⚠ Fails ${4-n} of 4 gates. Renegotiate price or scope.`:'✗ Not a BRRRR at these numbers.'}</div><div class="tiny muted" style="margin-top:8px">Assumes hard money at 90% of price with 2 points, and 2% refi fees. Florida adds about 0.55% of each loan in documentary stamp and intangible taxes; Ohio doesn't tax mortgages. Estimates only.</div>`;}
  if(curTool==="doors"){const need=Math.max(0,T.goal*12-T.wh),doors=T.cfd?Math.ceil(need/(T.cfd*12)):0;h=rr("Doors needed (rental cash flow)",doors,'green')+rr("Years at "+T.dpy+" doors/year",T.dpy?(doors/T.dpy).toFixed(1):"—")+`<div class="label">Year by year</div>`;for(let y=1;y<=15;y++){const d=Math.min(doors,y*T.dpy),inc=d*T.cfd+T.wh/12;h+=rr(`Year ${y} · ${d} doors`,fmt$(inc)+"/mo",inc>=T.goal?'green':'');if(d>=doors)break;}h+=`<div class="tiny muted" style="margin-top:8px">Rental cash flow alone takes years. Active income (wholesale fees, commissions) is the bridge while the portfolio grows, and equity builds net worth faster than cash flow.</div>`;}
  if(curTool==="mort"){const n=T.yrs*12,p=pmt(T.loan,T.mr,n),io=T.loan*T.mr/100/12;let b=T.loan,pr=0;for(let i=0;i<12;i++){const it=b*T.mr/1200;pr+=p-it;b-=p-it;}h=rr("Amortizing payment",fmt$(p)+"/mo")+rr("Interest-only payment",fmt$(io)+"/mo")+rr("Difference",fmt$(p-io)+"/mo")+rr("Principal paid in year 1",fmt$(pr))+rr("Total interest over "+T.yrs+" yrs",fmt$(p*n-T.loan));}
  if(curTool==="nw"){const a=T.a1+T.a2+T.a3+T.a4,l=T.l1+T.l2+T.l3;h=rr("Total assets",fmt$(a))+rr("Total debts",fmt$(l))+rr("Net worth",fmt$(a-l),a-l>=0?'green':'red')+rr("Progress to $1,000,000",pct(Math.max(0,a-l)/1e6))+`<div class="bar"><i style="width:${Math.min(100,Math.max(0,a-l)/1e4)}%"></i></div>`;}
  if(curTool==="dep"){const base=T.basis*(1-T.land/100)+T.imp,sl=base/27.5,seg=base*T.cseg/100,y1=(base-seg)/27.5+seg;h=rr("Depreciable basis",fmt$(base))+rr("Straight-line per year (27.5 yrs)",fmt$(sl))+rr("Tax value per year at "+T.brk+"%",fmt$(sl*T.brk/100),'green')+rr("Year 1 with cost seg + 100% bonus",fmt$(y1))+rr("Year 1 tax value",fmt$(y1*T.brk/100),'green')+`<div class="tiny muted" style="margin-top:8px">Passive loss rules can delay these benefits unless you qualify for the $25K allowance or real estate professional status. Recapture applies on sale. Confirm with a CPA.</div>`;}
  if(curTool==="heloc"){const av=Math.max(0,T.hv*T.cltv/100-T.hb),mi=T.use*T.hr/1200;h=rr("Available line (CLTV limit)",fmt$(av),'green')+rr("Interest-only payment on draw",fmt$(mi)+"/mo")+rr("Total cost over "+T.mo+" months",fmt$(mi*T.mo))+rr("Draw fits the line?",T.use<=av?"Yes":"No",T.use<=av?'green':'red')+`<div class="tiny muted" style="margin-top:8px">A HELOC is secured by your home. Use it only when the deal's refinance exit is underwritten before you draw.</div>`;}
  if(curTool==="mkt"){const L=T.cpl?T.spend/T.cpl:0,A=L*T.l2a/100,O=A*T.a2o/100,D=O*T.o2d/100;h=rr("Leads / month",L.toFixed(1))+rr("Appointments",A.toFixed(1))+rr("Offers",O.toFixed(1))+rr("Deals / month",D.toFixed(2),D>=0.5?'green':'orange')+rr("Cost per deal",D?fmt$(T.spend/D):"—")+rr("Profit / month",fmt$(D*T.fee-T.spend),D*T.fee>T.spend?'green':'red')+rr("Months to first deal (avg)",D?(1/D).toFixed(1):"—");}
  if(curTool==="rehab"){const sub=Object.keys(TV).filter(k=>k.startsWith("rh_")).reduce((s,k)=>s+(+TV[k]||0),0);h=rr("Line items subtotal",fmt$(sub))+rr("Contingency "+T.rcont+"%",fmt$(sub*T.rcont/100))+rr("Rehab number for your MAO",fmt$(sub*(1+T.rcont/100)),'green')+`<div class="tiny muted" style="margin-top:8px">See Rehab & Contractors for typical price ranges. Always get local bids.</div>`;}
  o.innerHTML=h;
}

/* ---------- MORE ---------- */
function vMore(v,sec){
  const items=[["scripts","📞","Call scripts","Openers, objections, probate, private money"],["search","🔎","Search","Every chapter and flashcard"],["res","🗂","Resources","Where to find data and records"],["@fl","🌴","Florida guide","Taxes, tenants, liens, insurance"],["@oh","🌰","Ohio guide","Wholesaler disclosure law, taxes, tenants"],["sheet","📋","Daily sheet","Checklist and notes"],["set","⚙️","Settings","Text size, voice, state, backup"],["about","ℹ️","About & install","What this is, how to add to Home Screen"]];
  if(!sec){setTitle("THE WEALTH BIBLE","More");v.innerHTML=`<div class="card" style="padding:0 8px">${items.map(([k,i,t,s])=>`<div class="list-item" onclick="go('${k[0]==='@'?'m/'+k.slice(1):'more/'+k}')"><span class="ic">${i}</span><div class="body"><div class="ttl">${t}</div><div class="sub">${s}</div></div><span class="chev">›</span></div>`).join("")}</div>`;return;}
  if(sec==="scripts"){setTitle("Call scripts","More");v.innerHTML=`<div class="small muted" style="margin-bottom:10px">Swap in your name and company. Read the calling-law chapter in Marketing From Scratch before you dial.</div>`+BIBLE.ex.scripts.map(s=>`<div class="card"><h3 style="margin-bottom:8px">${esc(s.title)}</h3><div class="scr">${s.body.replace(/<span class="speaker (you|them)">/g,'<span class="$1">').replace(/<br\s*\/?>/g,"\n")}</div></div>`).join("");return;}
  if(sec==="res"){setTitle("Resources","More");const cats=[...new Set(BIBLE.ex.resources.map(r=>r.cat))];v.innerHTML=cats.map(c=>`<div class="label">${esc(c)}</div>`+BIBLE.ex.resources.filter(r=>r.cat===c).map(r=>`<div class="card" style="padding:12px 14px"><div style="font-weight:700">${esc(r.title)}</div><div class="small blue">${esc(r.url)}</div><div class="small muted" style="margin-top:4px">${esc(r.desc)}</div></div>`).join("")).join("");return;}
  if(sec==="search"){setTitle("Search","More");v.innerHTML=`<input class="search" id="sq" type="search" placeholder="DSCR, seasoning, probate, doc stamps…"><div id="sres" class="small muted">Searches ${ALL_LESSONS.length} chapters and ${ALL_CARDS.length} cards.</div>`;$("#sq").oninput=e=>search(e.target.value);setTimeout(()=>$("#sq").focus(),60);return;}
  if(sec==="sheet"){setTitle("Daily sheet","More");const d=today(),k="day:"+d,ck=S.checks[k]||{};const list=["Read one chapter","Review 10+ flashcards","10 calls or 20 texts / letters","Analyze 3 deals in the calculator","Every lead logged with a next action","One follow-up to an old lead","One AI role-play objection","Update the numbers: leads, appointments, offers"];
    v.innerHTML=`<div class="card" style="padding:8px 14px"><div class="small muted" style="padding:6px 0">${new Date().toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})}</div>${list.map((t,i)=>`<div class="cb ${ck[i]?'on':''}" data-i="${i}"><div class="box">${ck[i]?'✓':''}</div><div>${t}</div></div>`).join("")}<textarea class="notes" id="nt" placeholder="Wins, lessons, what to fix tomorrow…">${esc(S.notes[d]||"")}</textarea></div>`;
    v.querySelectorAll(".cb").forEach(x=>x.onclick=()=>{const c=S.checks[k]=S.checks[k]||{};c[x.dataset.i]=!c[x.dataset.i];save();x.classList.toggle("on");x.querySelector(".box").textContent=c[x.dataset.i]?"✓":"";});
    $("#nt").oninput=e=>{S.notes[d]=e.target.value;save();};return;}
  if(sec==="set"){setTitle("Settings","More");
    v.innerHTML=`<div class="card"><div class="f"><label>Text size</label><div class="seg">${[[15,"S"],[16,"M"],[18,"L"],[20,"XL"]].map(([n,l])=>`<button class="${S.settings.fs===n?'on':''}" data-fs="${n}">${l}</button>`).join("")}</div></div>
    <div class="f"><label>Highlight my state</label><div class="seg">${[["fl","🌴 Florida"],["oh","🌰 Ohio"]].map(([k,l])=>`<button class="${S.settings.state===k?'on':''}" data-st="${k}">${l}</button>`).join("")}</div></div>
    <div class="f"><label>Voice speed</label><div class="seg">${[0.9,1,1.2,1.4].map(r=>`<button class="${S.settings.rate===r?'on':''}" data-rate="${r}">${r}×</button>`).join("")}</div></div></div>
    <div class="label">Backup</div><div class="card"><div class="small muted" style="margin-bottom:10px">Progress is saved only on this phone. Export a backup now and then, and import it on a new phone.</div><div class="rowx"><button class="btn" id="exp">Export</button><button class="btn" id="impB">Import</button></div><input type="file" id="imp" accept="application/json,.json" style="display:none"></div>
    <div class="label">Reset</div><div class="card"><button class="btn" style="border-color:var(--red);color:var(--red)" id="rst">Erase all progress on this phone</button></div><div class="tiny muted" style="text-align:center;margin-top:10px">Version ${APP_VERSION}</div>`;
    v.querySelectorAll("[data-fs]").forEach(b=>b.onclick=()=>{S.settings.fs=+b.dataset.fs;save();applyFs();render();});
    v.querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>{S.settings.state=b.dataset.st;TV.st=b.dataset.st;saveTV();save();render();});
    v.querySelectorAll("[data-rate]").forEach(b=>b.onclick=()=>{S.settings.rate=+b.dataset.rate;save();render();});
    $("#exp").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:"application/json"}));a.download="wealth-bible-backup-"+today()+".json";document.body.appendChild(a);a.click();a.remove();};
    $("#impB").onclick=()=>$("#imp").click();
    $("#imp").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result);if(!j.srs)throw 0;S={...DEF(),...j};save();toast("Backup restored");render();}catch(x){toast("That isn't a valid backup");}};r.readAsText(f);};
    $("#rst").onclick=()=>{if(confirm("Erase all progress on this phone? This can't be undone.")){localStorage.removeItem("wb_state");S=load();render();}};return;}
  if(sec==="about"){setTitle("About","More");v.innerHTML=`<div class="card about"><h2 style="margin-bottom:10px">The Wealth Bible</h2><p>A free, self-paced study system for building a rental portfolio with the BRRRR method: buy, rehab, rent, refinance, repeat. It starts from zero and covers how wealth is actually built, deal math, leverage, the tax code, marketing, sales, contracts, AI, daily habits, scaling, and state rules for Florida and Ohio.</p><p><b>${MODS.length}</b> modules · <b>${ALL_LESSONS.length}</b> chapters · <b>${ALL_CARDS.length}</b> flashcards · <b>${QUIZ_TOTAL}</b> quiz questions · <b>8</b> calculators.</p><p><b>How to use it:</b> each module runs Read → Cards → Quiz. Nothing is locked, quizzes are optional, and ☰ Jump takes you anywhere. Ten minutes of cards a day beats a three-hour weekend cram.</p><p><b>Add to your iPhone:</b> open this page in Safari, tap the Share button, then "Add to Home Screen." It opens full-screen like an app and works offline.</p><p><b>Not advice.</b> This is education, not legal, tax, or investment advice. Laws and rates change. Legal and tax chapters cite their sources; confirm with a CPA, attorney, or lender before you act.</p></div>`;return;}
  go("more");
}
function search(q){q=q.trim().toLowerCase();const o=$("#sres");if(q.length<2){o.innerHTML="";return;}
  const txt=l=>(l.title+" "+l.blocks.map(b=>b.h!==undefined?b.h+" "+b.p:b.carry||b.formula||b.example||b.trap||"").join(" ")).toLowerCase();
  const L=ALL_LESSONS.filter(l=>txt(l).includes(q)).slice(0,15),C=ALL_CARDS.filter(c=>(c.q+" "+c.a).toLowerCase().includes(q)).slice(0,25);
  o.innerHTML=(L.length?`<div class="label">Chapters (${L.length})</div><div class="card" style="padding:0 8px">${L.map(l=>`<div class="list-item" onclick="go('l/${l.id}')"><span class="ic">${MOD[l.mod].icon}</span><div class="body"><div class="ttl">${esc(l.title)}</div><div class="sub">${esc(MOD[l.mod].title)}</div></div><span class="chev">›</span></div>`).join("")}</div>`:"")+(C.length?`<div class="label">Flashcards (${C.length})</div>`+C.map(c=>`<div class="card" style="padding:12px 14px"><div style="font-weight:600">${esc(c.q)}</div><div class="small green" style="margin-top:4px">${esc(c.a)}</div></div>`).join(""):"")+(!L.length&&!C.length?'<div class="muted">No matches.</div>':"");}

/* ---------- offline + updates ---------- */
if("serviceWorker" in navigator&&location.protocol==="https:"){
  navigator.serviceWorker.register("sw.js").then(reg=>{
    const show=w=>{$("#updBanner").classList.add("show");$("#updBtn").onclick=()=>w.postMessage("skip");};
    if(reg.waiting&&navigator.serviceWorker.controller)show(reg.waiting);
    reg.addEventListener("updatefound",()=>{const w=reg.installing;w&&w.addEventListener("statechange",()=>{if(w.state==="installed"&&navigator.serviceWorker.controller)show(w);});});
    document.addEventListener("visibilitychange",()=>{if(!document.hidden)reg.update();});
  }).catch(()=>{});
  let reloaded=false;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!reloaded){reloaded=true;location.reload();}});
}
if(window.speechSynthesis)speechSynthesis.getVoices();
render();
