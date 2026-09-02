const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const SEASONS={
January:["WINTER · CLEAR & COOL","FIND THE COOL","Golden winter routes","Rajasthan, Kerala and clear-weather road trips.","winter","Winter edit"],
February:["WINTER · SOFT LIGHT","FOLLOW THE LIGHT","Warm days, cool evenings","A flexible month for heritage, beaches and hills.","winter","Winter edit"],
March:["SPRING · BEFORE THE HEAT","CHASE SPRING","Colour before the heat","Good for wildlife and hill escapes before the heat builds.","summer","Spring edit"],
April:["SUMMER · HEAD HIGHER","HEAD FOR HIGHER","Hills before the heat","Move toward higher elevations and greener pockets.","summer","Summer edit"],
May:["SUMMER · COOL ESCAPES","FIND THE COOL","Mountains call","Prefer high-altitude escapes as plains get warmer.","summer","Summer edit"],
June:["MONSOON · FIRST RAINS","FOLLOW THE RAIN","Green begins here","A transition month: verify rainfall before long road routes.","monsoon","Monsoon edit"],
July:["MONSOON · DEEP GREEN","GO WHERE IT'S GREEN","Waterfalls wake up","Western Ghats and Northeast can be dramatic in July.","monsoon","Monsoon edit"],
August:["MONSOON · PEAK GREEN","LET INDIA TURN GREEN","Peak lush season","A strong month for waterfalls, villages and slow travel.","monsoon","Monsoon edit"],
September:["SEPTEMBER · MONSOON TAIL","TRAVEL SLOWLY","Green India, after rain","Lush valleys, mountain roads, waterfalls and post-rain quiet.","monsoon","Monsoon edit"],
October:["AUTUMN · CLEAR SKIES","FOLLOW THE LIGHT","Post-monsoon India","Clearer skies and strong road-trip conditions in many regions.","autumn","Autumn edit"],
November:["AUTUMN · ROAD-TRIP SEASON","TAKE THE LONG WAY","Perfect road-trip month","An excellent all-round month for many parts of India.","autumn","Autumn edit"],
December:["WINTER · FESTIVE INDIA","END THE YEAR SOMEWHERE BEAUTIFUL","Winter journeys","Strong for Rajasthan, Goa, Kerala and selected mountain trips.","winter","Winter edit"]
};

const allPlaces = ITINERA_DATA.flatMap(s=>s.places);
const els = {
  month:document.getElementById("month"), days:document.getElementById("tripDays"), vibe:document.getElementById("vibe"),
  budget:document.getElementById("budget"), budgetValue:document.getElementById("budgetValue"), search:document.getElementById("search"),
  state:document.getElementById("stateFilter"), nature:document.getElementById("natureOnly"), culture:document.getElementById("cultureOnly"), low:document.getElementById("lowOnly"),
  sort:document.getElementById("sort"), cards:document.getElementById("cards"), count:document.getElementById("count"),
  monthName:document.getElementById("monthName"), seasonLabel:document.getElementById("seasonLabel"), quick:document.getElementById("quickFilters"),
  smartNote:document.getElementById("smartNote"), atmosphere:document.getElementById("atmosphere"), modal:document.getElementById("modal")
};

MONTHS.forEach(m=>els.month.add(new Option(m,m)));
els.month.value="September";
ITINERA_DATA.forEach(s=>els.state.add(new Option(s.state,s.state)));
document.getElementById("stateCloud").innerHTML=ITINERA_DATA.map(s=>`<button onclick="selectState('${escapeHtml(s.state)}')">${s.state}</button>`).join("");

let selectedPlace=null, atmosphereOn=true, activeQuick="";
let selectedDays=7;
function money(n){return n>=100000?`₹${(n/100000).toFixed(1)}L`:n>=1000?`₹${Math.round(n/1000)}k`:`₹${n}`}
function escapeHtml(v){return String(v).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
function getSeason(){return SEASONS[els.month.value]}
function renderSeason(){
  const s=getSeason();
  document.body.dataset.season=s[4];
  document.getElementById("seasonEyebrow").textContent=s[0];
  document.getElementById("heroTitle").innerHTML=s[1].replace(" ","<br>");
  document.getElementById("heroBlurb").textContent=s[3];
  document.getElementById("heroChip").textContent="✦ "+s[5];
  document.getElementById("bannerTitle").textContent=s[2];
  document.getElementById("seasonLabel").textContent=s[5].toUpperCase();
  document.getElementById("monthName").textContent=els.month.value;
  els.smartNote.textContent=s[3]+" Check current local road, rain and trail conditions before departure.";
  renderQuick(s);
  buildAtmosphere();
}
function renderQuick(s){
  const first = ITINERA_DATA.filter(x=>x.places.some(p=>p.tag==="green"||p.tag==="nature")).slice(0,5).map(x=>x.state);
  const q=[...new Set([...s[2].split(", ").slice(0,3),...first])].slice(0,6);
  els.quick.innerHTML=q.map(x=>`<button class="${activeQuick===x?"active":""}" data-q="${escapeHtml(x)}">${escapeHtml(x)}</button>`).join("");
  els.quick.querySelectorAll("button").forEach(b=>b.onclick=()=>{activeQuick=b.dataset.q;els.search.value=b.dataset.q;renderQuick(s);renderCards()});
}
function renderCards(){
  let list=[...allPlaces];
  const q=els.search.value.trim().toLowerCase(), state=els.state.value, v=els.vibe.value, max=+els.budget.value;
  if(q)list=list.filter(p=>(p.name+" "+p.state+" "+p.tag).toLowerCase().includes(q));
  if(state)list=list.filter(p=>p.state===state);
  if(v!=="Anything")list=list.filter(p=>p.tag.toLowerCase().includes(v.toLowerCase())||p.name.toLowerCase().includes(v.toLowerCase()));
  if(els.nature.checked)list=list.filter(p=>p.tag==="nature"||p.tag==="green");
  if(els.culture.checked)list=list.filter(p=>p.tag==="culture");
  if(els.low.checked)list=list.filter(p=>p.budget<5000);
  list=list.filter(p=>p.budget<=max);
  if(els.sort.value==="low")list.sort((a,b)=>a.budget-b.budget);
  if(els.sort.value==="rating")list.sort((a,b)=>b.rating-a.rating);
  els.count.textContent=list.length;
  if(!list.length){els.cards.innerHTML=`<div class="no-results" style="grid-column:1/-1;text-align:center;padding:35px;color:var(--muted);font-size:10px">Nothing matches that filter. Try raising the budget or clearing search.</div>`;return}
  els.cards.innerHTML=list.map(p=>`<article class="place"><div class="place-image" style="background-image:url('${p.image}')"><span class="badge">${escapeHtml(p.tag)} · ${escapeHtml(els.month.value)}</span></div><div class="place-body"><h3>${escapeHtml(p.name)}</h3><div class="subline">${escapeHtml(p.state)} · ${escapeHtml(p.duration)}</div><div class="place-meta"><span>★ ${p.rating}</span><span>from ${money(p.budget)}</span></div><button data-id="${p.id}">Explore place →</button></div></article>`).join("");
  els.cards.querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>openPlace(+b.dataset.id));
}
function selectState(name){els.state.value=name;els.search.value="";scrollToSection("discover");renderCards()}
function resetFilters(){els.search.value="";els.state.value="";els.vibe.value="Anything";els.nature.checked=false;els.culture.checked=false;els.low.checked=false;els.budget.value=25000;els.sort.value="match";activeQuick="";els.budgetValue.textContent="₹25k";renderSeason();renderCards()}
function setBudget(v){els.budget.value=v;els.budgetValue.textContent=money(v);renderCards();scrollToSection("discover")}
function scrollToSection(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
function surpriseMe(){const p=allPlaces[Math.floor(Math.random()*allPlaces.length)];openPlace(p.id)}
function openPlace(id){selectedPlace=allPlaces.find(p=>p.id===id);if(!selectedPlace)return;document.getElementById("modalImage").style.backgroundImage=`url('${selectedPlace.image}')`;document.getElementById("modalState").textContent=selectedPlace.state.toUpperCase();document.getElementById("modalTitle").textContent=selectedPlace.name;document.getElementById("modalDesc").textContent=`A ${selectedPlace.duration.toLowerCase()} starter idea built around a ${selectedPlace.tag} trip style. Use the roadmap to turn this into a day-by-day plan.`;document.getElementById("modalBudget").textContent=money(selectedPlace.budget);document.getElementById("modalBest").textContent=selectedPlace.best;document.getElementById("modalStay").textContent=selectedPlace.stay;document.getElementById("modalFood").textContent=selectedPlace.food;document.getElementById("modalVideo").href=`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedPlace.name+" "+selectedPlace.state+" travel")}`;els.modal.classList.add("show");els.modal.setAttribute("aria-hidden","false")}
function closeModal(){els.modal.classList.remove("show");els.modal.setAttribute("aria-hidden","true")}
function choosePlaceForPlanner(){if(!selectedPlace){toast("Open a destination first.");return}closeModal();document.getElementById("plannerPlace").textContent=selectedPlace.name+" · "+selectedPlace.state;drawRoadmap();scrollToSection("planner")}
function drawRoadmap(){const labels=["Arrival","Explore","Taste","Culture","Relax","Local life","Departure"], icons=["⌖","◒","🍛","✦","☕","⌂","→"];const count=selectedDays;document.getElementById("plannerMeta").textContent=`${count} day${count>1?"s":""} · season-aware`;document.getElementById("roadmap").innerHTML=`<div class="road-line"></div><div class="nodes">${labels.slice(0,count).map((l,i)=>`<div class="node"><div class="node-icon">${icons[i]}</div>Day ${i+1}<small>${l}</small></div>`).join("")}</div>`}
for(let i=1;i<=7;i++){const b=document.createElement("button");b.textContent=i+" day"+(i>1?"s":"");if(i===7)b.className="active";b.onclick=()=>{selectedDays=i;document.querySelectorAll(".day-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");drawRoadmap()};document.getElementById("dayTabs").appendChild(b)}
document.getElementById("modalClose").onclick=closeModal;document.getElementById("modal").addEventListener("click",e=>{if(e.target===els.modal)closeModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
document.getElementById("modalPlan").onclick=choosePlaceForPlanner;
function savePlace(p){let saved=JSON.parse(localStorage.getItem("itineraSaved")||"[]");if(!saved.some(x=>x.id===p.id)){saved.push(p);localStorage.setItem("itineraSaved",JSON.stringify(saved));toast("Saved to this browser.");}else toast("Already saved.");}
document.getElementById("modalSave").onclick=()=>selectedPlace&&savePlace(selectedPlace);
document.getElementById("saveBtn").onclick=()=>selectedPlace?savePlace(selectedPlace):toast("Choose a destination first.");
document.getElementById("copyBtn").onclick=()=>{const t=`ITINERA · ${document.getElementById("plannerPlace").textContent} · ${selectedDays} days`;navigator.clipboard?.writeText(t).then(()=>toast("Trip summary copied.")).catch(()=>toast(t))};
document.getElementById("clearSearch").onclick=()=>{els.search.value="";activeQuick="";renderQuick(getSeason());renderCards();els.search.focus()};
document.getElementById("resetFilters").onclick=resetFilters;
[els.month,els.vibe,els.state,els.sort].forEach(x=>x.addEventListener("change",()=>{if(x===els.month)renderSeason();renderCards()}));
[els.nature,els.culture,els.low].forEach(x=>x.addEventListener("change",renderCards));
els.search.addEventListener("input",renderCards);
els.budget.addEventListener("input",()=>{els.budgetValue.textContent=money(+els.budget.value);renderCards()});
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("dark");document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾";localStorage.setItem("itineraDark",document.body.classList.contains("dark"))};
if(localStorage.getItem("itineraDark")==="true"){document.body.classList.add("dark");document.getElementById("themeBtn").textContent="☀"}
function buildAtmosphere(){const box=els.atmosphere;box.innerHTML="";if(!atmosphereOn)return;const season=getSeason()[4];if(season==="monsoon"){for(let i=0;i<110;i++){let s=document.createElement("i");s.className="rain-drop";s.style.left=Math.random()*100+"%";s.style.animationDuration=(.55+Math.random()*.8)+"s";s.style.animationDelay=(-Math.random()*4)+"s";s.style.opacity=.18+Math.random()*.5;box.appendChild(s)}}else if(season==="summer"){for(let i=0;i<22;i++){let s=document.createElement("i");s.className="sun-mote";s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";s.style.animationDelay=(-Math.random()*8)+"s";box.appendChild(s)}}else{for(let i=0;i<22;i++){let s=document.createElement("i");s.className="fall-leaf";s.textContent=season==="winter"?"❄":"🍂";s.style.left=Math.random()*100+"%";s.style.animationDuration=(6+Math.random()*9)+"s";s.style.animationDelay=(-Math.random()*9)+"s";box.appendChild(s)}}}
document.getElementById("atmoBtn").onclick=()=>{atmosphereOn=!atmosphereOn;document.getElementById("atmoBtn").innerHTML=atmosphereOn?"☔ <span>Atmosphere ON</span>":"☔ <span>Atmosphere OFF</span>";buildAtmosphere()};
document.getElementById("menuBtn").onclick=()=>{document.querySelector(".desktop-nav").classList.toggle("open-mobile")};
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
renderSeason();renderCards();