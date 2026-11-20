const DEFAULT_TIMES = ["09:00","13:00","18:00","21:00"];
const $ = id => document.getElementById(id);
const load = (key, fallback) => { try { const v=localStorage.getItem(key); return v?JSON.parse(v):fallback; } catch { return fallback; } };
let times = load("sm-times", DEFAULT_TIMES);
let checks = load("sm-checks", {});
const today = () => new Date().toLocaleDateString("sv-SE");
const keyFor = t => `${today()}-${t}`;

function renderTimes(){
  $("times").innerHTML="";
  times.forEach((time,i)=>{
    const div=document.createElement("div"); div.className="time-card";
    const label=document.createElement("label"); label.textContent=`Muistutus ${i+1}`;
    const input=document.createElement("input"); input.type="time"; input.value=time; input.setAttribute("aria-label",`Muistutuksen ${i+1} kellonaika`);
    input.addEventListener("change",()=>{times[i]=input.value;});
    div.append(label,input); $("times").append(div);
  });
}
function renderChecks(){
  $("checks").innerHTML="";
  times.forEach(time=>{
    const row=document.createElement("label"); row.className="check-row";
    const cb=document.createElement("input"); cb.type="checkbox"; cb.checked=!!checks[keyFor(time)];
    const text=document.createElement("span"); text.textContent=time+" – tarkistettu"; if(cb.checked) text.className="done";
    cb.addEventListener("change",()=>{checks[keyFor(time)]=cb.checked;saveChecks();renderChecks();});
    row.append(cb,text); $("checks").append(row);
  });
}
function saveChecks(){localStorage.setItem("sm-checks",JSON.stringify(checks));}
function saveTimes(){
  times=[...new Set(times)].sort();
  localStorage.setItem("sm-times",JSON.stringify(times));
  renderTimes();renderChecks();$("status").textContent="Tallennettu";
}
$("saveBtn").addEventListener("click",saveTimes);
$("resetBtn").addEventListener("click",()=>{checks={};saveChecks();renderChecks();});
$("libreBtn").addEventListener("click",()=>{window.location.href="https://www.freestyle.abbott/";});
$("notifyBtn").addEventListener("click",async()=>{
  if(!("Notification" in window)){ $("permissionText").textContent="Tämä selain ei tue ilmoituksia.";return; }
  try{
    const permission=await Notification.requestPermission();
    $("permissionText").textContent=permission==="granted"?"Ilmoituslupa myönnetty. Muistutukset näkyvät sovelluksen ollessa käytössä.":"Ilmoituslupaa ei myönnetty.";
  }catch{$("permissionText").textContent="Ilmoituslupaa ei voitu pyytää tässä ympäristössä.";}
});
function checkDue(){
  if(!("Notification" in window) || Notification.permission!=="granted")return;
  const now=new Date(), current=now.toTimeString().slice(0,5);
  times.forEach(t=>{
    const k=`sent-${keyFor(t)}`;
    if(t===current && !localStorage.getItem(k)){
      new Notification("Sokerimuistuttaja",{body:"Muista tarkistaa sokerit Libre 3 -sovelluksesta!"});
      localStorage.setItem(k,"1");
    }
  });
}
renderTimes();renderChecks();
if("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("./sw.js").catch(()=>{});
setInterval(checkDue,15000);checkDue();
