var LMAP=null, AP_MARKERS={}, FLIGHT_LAYERS={}, ROUTE_LINES=[];
var G = {
  airline: {name:'VIS Airlines', iata:'VS', color:'#e63946'},
  cash: 500000, airports: [], routes: [], slots: [],
  homeAirport: null, points: 0, level: 1, totalFlights: 0,
  totalPassengers: 0, cargolicence: false, foundedAt: 0,
  fleet: []
};
var LMAP=null, AP_MARKERS={}, ROUTE_LINES=[], PL_MARKERS=[];
var FLIGHT_LAYERS={}, TICK_INTERVAL=null;

/* -- SAVE/LOAD -- */
function save() {
  if(typeof saveToCloud === 'function') saveToCloud();
  if(typeof updateRankingValue === 'function') {
    window._saveCount = (window._saveCount||0) + 1;
    if(window._saveCount % 5 === 0) updateRankingValue();
  }
}

function loadSave() {
  try {
    var d=localStorage.getItem('sb_v3');
    if(!d) return false;
    var g=JSON.parse(d);
    if(g.cash) G.cash=g.cash;
    if(g.airports) {
      G.airports = g.airports.filter(function(ap){
        if(ap.isHome) return true;
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

/* -- LEVEL - NIESKONCZONOSC -- */
// Progi do lvl 10, potem co 2000 lotow = +1 lvl
var LEVEL_FLIGHTS=[0,0,10,25,50,100,200,400,750,1500,3000];

function getLv(n) {
  var lv=1;
  // Lvl 1-10 wg tablicy
  for(var i=1;i<LEVEL_FLIGHTS.length;i++){
    if(n>=LEVEL_FLIGHTS[i]) lv=i;
    else break;
  }
  // Po lvl 10: kazde 2000 lotow = +1 lvl
  if(n>=3000) {
    var extra=Math.floor((n-3000)/2000);
    lv=10+extra;
  }
  return lv;
}

function getNextLevelFlights(lv) {
  // Ile lotow potrzeba na nastepny lvl
  if(lv < 10) return LEVEL_FLIGHTS[lv + 1] || 3000;
  return 3000 + (lv - 9) * 2000;
}

function getPrevLevelFlights(lv) {
  // Ile lotow bylo potrzeba zeby wejsc na ten lvl
  if(lv <= 1) return 0;
  if(lv <= 10) return LEVEL_FLIGHTS[lv] || 0;
  return 3000 + (lv - 10) * 2000;
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
  var el = document.getElementById('hud-cash');
  if(el) el.textContent = '$' + G.cash.toLocaleString();
  var ep = document.getElementById('hud-pts');
  if(ep) ep.textContent = (G.points||0).toLocaleString();

  var lv = G.level || 1;
  var tf = G.totalFlights || 0;

  var elvEl = document.getElementById('hud-lv');
  if(elvEl) elvEl.textContent = lv;

  var prev = getPrevLevelFlights(lv);
  var next = getNextLevelFlights(lv);
  var range = next - prev;
  var progress = Math.max(0, tf - prev);
  var pct = range > 0 ? Math.min(100, Math.floor(progress / range * 100)) : 100;

  var bar = document.getElementById('hud-lv-bar');
  if(bar) bar.style.width = pct + '%';

  var lv2 = document.getElementById('hud-lv-next');
  if(lv2) lv2.textContent = progress + '/' + range + ' LOT';
}

var _nT;
function showMsg(msg) {
  var n=document.getElementById('msg'); if(!n) return;
  clearTimeout(_nT);
  n.style.transition='none';
  n.style.opacity='0';
  n.style.transform='translateX(-50%) translateY(-80px)';
  void n.offsetHeight;
  n.style.transition='transform 0.3s ease, opacity 0.3s ease';
  n.textContent=msg;
  n.style.opacity='1';
  n.style.transform='translateX(-50%) translateY(0)';
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
