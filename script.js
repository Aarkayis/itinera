const places=[
 {name:"MEGHALAYA",sub:"Clouds, Falls, Peace.",img:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",min:4500},
 {name:"COORG",sub:"Greenery & Coffee",img:"https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=700&q=80",min:3500},
 {name:"KERALA",sub:"Backwaters & Bliss",img:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80",min:5000},
 {name:"GOA",sub:"Rainy Beaches",img:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80",min:4500},
 {name:"UDAIPUR",sub:"Royal Monsoon",img:"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=80",min:4000},
 {name:"VALLEY OF FLOWERS",sub:"Nature's Paradise",img:"https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=700&q=80",min:6500}
];
const grid=document.getElementById("destinationGrid");
const budget=document.getElementById("budget"), budgetValue=document.getElementById("budgetValue");
function money(n){return n>=100000?"₹"+(n/100000).toFixed(n%100000?1:0)+"L":n>=1000?"₹"+Math.round(n/1000)+"K":"₹"+n}
function renderPlaces(){
 const b=+budget.value; budgetValue.textContent=money(b);
 grid.innerHTML=places.map(p=>`<article class="card" title="${p.name}"><img src="${p.img}" alt="${p.name}"><div class="card-info"><b>⌖ ${p.name}</b><small>${p.sub}</small></div></article>`).join("");
}
budget.addEventListener("input",renderPlaces);
document.getElementById("applyBudget").onclick=()=>toast("Budget set to "+money(+budget.value)+" — recommendations updated.");
document.getElementById("viewAll").onclick=()=>toast("More destinations are ready for the next database expansion.");
document.getElementById("watch").onclick=()=>window.open("https://www.youtube.com/results?search_query=India+monsoon+travel","_blank");

const dayTabs=document.getElementById("dayTabs"), stops=document.getElementById("stops");
let days=7;
for(let i=1;i<=7;i++){const b=document.createElement("button");b.textContent=i+" Day"+(i>1?"s":"");if(i===7)b.className="active";b.onclick=()=>{days=i;document.querySelectorAll("#dayTabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderRoadmap()};dayTabs.appendChild(b)}
function renderRoadmap(){
 const labels=["Arrival","Explore","Adventure","Culture","Relax","Local Life","Departure"];
 stops.innerHTML=labels.slice(0,days).map((x,i)=>`<div class="stop"><div class="dot">${i+1}</div>Day ${i+1}<span>${x}</span></div>`).join("");
}
renderRoadmap(); renderPlaces();
document.getElementById("createTrip").onclick=()=>toast(`Your ${days}-day starter itinerary is ready — choose a destination to customize it.`);
function scrollToId(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
document.querySelectorAll(".nav button").forEach(b=>b.onclick=()=>{scrollToId(b.dataset.scroll);document.getElementById("sidebar").classList.remove("open")});
document.getElementById("menu").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}