var LMAP=null, AP_MARKERS={}, FLIGHT_LAYERS={}, ROUTE_LINES=[];
var G = {
  airline: {name:'VIS Airlines', iata:'VS', color:'#e63946'},
  cash: 500000, airports: [], routes: [], slots: [],
  homeAirport: null, points: 0, level: 1, totalFlights: 0,
  fleet: [
    {id:'ac1',model:'Boeing 737-800',reg:'VS-001',seats:156,status:'ground',routeId:null},
    {id:'ac2',model:'Boeing 737-800',reg:'VS-002',seats:156,status:'ground',routeId:null},
    {id:'ac3',model:'Airbus A320neo',reg:'VS-003',seats:168,status:'ground',routeId:null},
    {id:'ac4',model:'ATR-72',reg:'VS-004',seats:72,status:'ground',routeId:null}
  ]
};

var LMAP=null, AP_MARKERS={}, ROUTE_LINES=[], PL_MARKERS=[];
var FLIGHT_LAYERS={}, TICK_INTERVAL=null;

/* -- SAVE/LOAD -- */
function save() {
  // Zapisz do chmury Firebase
  if(typeof saveToCloud === 'function') saveToCloud();
  // Aktualizuj ranking co 5 zapisów
  if(typeof updateRankingValue === 'function') {
    window._saveCount = (window._saveCount||0) + 1;
    if(window._saveCount % 5 === 0) updateRankingValue();
  }
  try {
    var sv={cash:G.cash,airports:G.airports,routes:G.routes,slots:G.slots,departurelog:G.departurelog||[],lastShopPayout:G.lastShopPayout||0,staff:G.staff||{},jobMarket:G.jobMarket||null,tutorialDone:G.tutorialDone||false,
      homeAirport:G.homeAirport,fleet:G.fleet,airline:G.airline,
      points:G.points||0,level:G.level||1,totalFlights:G.totalFlights||0};
    localStorage.setItem('sb_v3',JSON.stringify(sv));
  } catch(e) {}
}
function loadSave() {
  try {
    var d=localStorage.getItem('sb_v3');
    if(!d) return false;
    var g=JSON.parse(d);
    if(g.cash) G.cash=g.cash;
    if(g.airports) {
      // Filtruj - zostaw tylko baze i sloty z prawdziwych lotnisk ADB
      G.airports = g.airports.filter(function(ap){
        if(ap.isHome) return true; // baza gracza zawsze
        // Sprawdz czy lotnisko jest w ADB
        if(typeof ADB !== 'undefined') {
          return ADB.some(function(a){ return a.icao === ap.icao; });
        }
        return false;
      });
    }
    if(g.routes) G.routes=g.routes;
    if(g.slots) {
      G.slots = g.slots.filter(function(icao){
        if(typeof ADB !== 'undefined') {
          return ADB.some(function(a){ return a.icao === icao; });
        }
        return true;
      });
    }
    if(g.homeAirport) G.homeAirport=g.homeAirport;
    if(g.fleet && g.fleet.length) G.fleet=g.fleet;
    if(g.airline) G.airline=g.airline;
    if(g.points) G.points=g.points;
    if(g.level) G.level=g.level;
    if(g.totalFlights) G.totalFlights=g.totalFlights;
    return true;
  } catch(e) { return false; }
}

/* -- LEVEL -- */
var LEVEL_FLIGHTS=[0,0,10,25,50,100,200,400,750,1500,3000];
function getLv(n) {
  var lv=1;
  for(var i=1;i<LEVEL_FLIGHTS.length;i++) { if(n>=LEVEL_FLIGHTS[i]) lv=i; else break; }
  return lv;
}
function checkLevelUp() {
  var newLv=getLv(G.totalFlights||0);
  if(newLv>(G.level||1)) {
    G.level=newLv; save();
    showMsg('POZIOM '+newLv+' odblokowany!');
  }
  updateHUD();
}
function updateHUD() {
  var el=document.getElementById('hud-cash');
  if(el) el.textContent='$'+G.cash.toLocaleString();
  var ep=document.getElementById('hud-pts');
  if(ep) ep.textContent=(G.points||0).toLocaleString();
  var lv=G.level||1;
  var tf=G.totalFlights||0;
  var next=LEVEL_FLIGHTS[lv+1];
  var elvEl=document.getElementById('hud-lv');
  if(elvEl) elvEl.textContent=lv;
  var bar=document.getElementById('hud-lv-bar');
  if(bar) {
    var prev=LEVEL_FLIGHTS[lv]||0;
    var pct=next?Math.round((tf-prev)/(next-prev)*100):100;
    bar.style.width=Math.min(100,Math.max(0,pct))+'%';
  }
  var lv2=document.getElementById('hud-lv-next');
  if(lv2) lv2.textContent=next?(tf-(LEVEL_FLIGHTS[lv]||0))+'/'+(next-(LEVEL_FLIGHTS[lv]||0)):'MAX';
}



var _nT;
function showMsg(msg) {
  var n=document.getElementById('msg'); if(!n) return;
  // Clear any existing timeout and animation
  clearTimeout(_nT);
  n.style.transition='none';
  n.style.opacity='0';
  n.style.transform='translateX(-50%) translateY(-80px)';
  
  // Force reflow then show
  void n.offsetHeight;
  n.style.transition='transform 0.3s ease, opacity 0.3s ease';
  n.textContent=msg;
  n.style.opacity='1';
  n.style.transform='translateX(-50%) translateY(0)';
  
  // Hide after 3 seconds
  _nT=setTimeout(function(){
    n.style.opacity='0';
    n.style.transform='translateX(-50%) translateY(-80px)';
  },3000);
}

function closeModal() {
  var m=document.getElementById('modal'); if(m) m.style.display='none';
}

function openShop() {
  document.getElementById('modal-body').innerHTML = '<div style="padding:20px;color:#5580a0;text-align:center;">Ladowanie sklepu...</div>';
  document.getElementById('modal').style.display = 'flex';
}
