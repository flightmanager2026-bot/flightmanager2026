/* -- MAP -- */
function initMap() {
  if(LMAP) return;
  LMAP = L.map('map', {
    center: [52, 19], zoom: 5,
    minZoom: 3, maxZoom: 18,
    zoomControl: false, attributionControl: false, tap: true
  });

  // OSM tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, subdomains: ['a','b','c']
  }).addTo(LMAP);

  renderMarkers();
  renderRoutes();
  addCountryLabels();
  window.addEventListener('resize', function(){ if(LMAP) LMAP.invalidateSize(); });
}


function addPin(ap) {
  if(!LMAP || AP_MARKERS[ap.icao]) return;
  var isHome = G.homeAirport && G.homeAirport.icao === ap.icao;
  var color  = isHome ? '#e63946' : '#2563eb';
  var icon = L.divIcon({
    className: '',
    html: '<div style="position:relative;display:inline-block;">'
      + '<svg width="14" height="20" viewBox="0 0 28 38">'
      + '<path d="M14 0C6.27 0 0 6.27 0 14c0 9.8 14 24 14 24S28 23.8 28 14C28 6.27 21.73 0 14 0z"'
      + ' fill="'+color+'" stroke="rgba(255,255,255,0.9)" stroke-width="2"/>'
      + '<circle cx="14" cy="14" r="6" fill="white"/>'
      + '</svg>'
      + '<div style="position:absolute;top:32px;left:50%;transform:translateX(-50%);'
      + 'font-size:9px;font-weight:700;color:'+color+';font-family:Arial,sans-serif;'
      + 'white-space:nowrap;text-shadow:0 0 3px #fff,0 0 3px #fff;">'+ap.icao+'</div>'
      + '</div>',
    iconSize: [22, 30], iconAnchor: [11, 30], popupAnchor: [0, -32]
  });
  var m = L.marker([ap.lat, ap.lng], {
    icon: icon, interactive: true,
    zIndexOffset: isHome ? 1000 : 100
  }).addTo(LMAP);
  m.on('click', function(){ onApClick(ap); });
  AP_MARKERS[ap.icao] = m;
}


function renderMarkers() {
  if(!LMAP) return;
  Object.keys(AP_MARKERS).forEach(function(k){try{LMAP.removeLayer(AP_MARKERS[k]);}catch(e){}});
  AP_MARKERS={};

  // TYLKO baza gracza (czerwona)
  if(G.homeAirport) addPin(G.homeAirport);

  // TYLKO prawdziwe lotniska z ADB (niebieskie) - NIE z G.airports
  ADB.forEach(function(ap){
    if(G.homeAirport && ap.icao === G.homeAirport.icao) return;
    addPin(ap);
  });

  // Wyczysc falszywe lotniska z G.airports przy okazji
  G.airports = G.airports.filter(function(ap){
    if(ap.isHome) return true;
    return ADB.some(function(a){ return a.icao === ap.icao; });
  });
}

function renderRoutes() {
  ROUTE_LINES.forEach(function(l){try{LMAP.removeLayer(l);}catch(e){}});
  ROUTE_LINES=[];
  G.routes.forEach(function(r){
    var line=L.polyline([[r.fromLat,r.fromLng],[r.toLat,r.toLng]],
      {color:'#00d4ff',weight:1.5,opacity:0.5,dashArray:'6,5'}).addTo(LMAP);
    ROUTE_LINES.push(line);
  });
}

function renderGroundPlanes() {
  // Usuń stare markery samolotów na ziemi
  if(!window.GROUND_MARKERS) window.GROUND_MARKERS=[];
  GROUND_MARKERS.forEach(function(m){try{LMAP.removeLayer(m);}catch(e){}});
  GROUND_MARKERS=[];

  // Dodaj ikonkę dla każdego samolotu stojącego na ziemi
  G.fleet.forEach(function(ac){
    if(ac.status==='flying') return; // latające obsługuje flight.js
    // Znajdź lotnisko bazowe
    var ap = G.homeAirport;
    if(!ap) return;
    // Lekkie przesunięcie żeby się nie nakładały
    var offset = GROUND_MARKERS.length * 0.003;
    var lat = ap.lat + offset;
    var lng = ap.lng + offset;

    var planeHtml='<div style="position:relative;cursor:pointer;">'
      +'<img src="https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/pngtree-vector-airplane-icon-png-image_515968-removebg-preview.png" '
      +'width="28" height="28" style="opacity:0.7;filter:grayscale(30%);">'
      +'</div>';
    var icon=L.divIcon({className:'',html:planeHtml,iconSize:[28,28],iconAnchor:[14,14]});
    var marker=L.marker([lat,lng],{icon:icon,zIndexOffset:1500}).addTo(LMAP);
    marker.on('click', (function(aircraft){ return function(){ showGroundPlaneInfo(aircraft); }; })(ac));
    GROUND_MARKERS.push(marker);
  });
}

function showGroundPlaneInfo(ac) {
  var speed = 850;
  if(typeof AC_SPEEDS!=='undefined' && AC_SPEEDS[ac.model]) speed=AC_SPEEDS[ac.model];

  // Znajdź trasę tego samolotu
  var route = G.routes.filter(function(r){
    return G.fleet.some(function(a){return a.id===ac.id && (r.acId===ac.id || a.routeId===r.id);});
  })[0];

  document.getElementById('modal-body').innerHTML =
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">'
    +'<div style="font-size:32px;">✈</div>'
    +'<div>'
    +'<div style="font-size:16px;font-weight:900;color:#e0f0ff;">'+ac.model+'</div>'
    +'<div style="font-size:11px;color:#5580a0;">'+ac.reg+' &bull; '+(G.homeAirport?G.homeAirport.icao:'')+'</div>'
    +'</div>'
    +'<div style="margin-left:auto;padding:5px 12px;background:rgba(0,230,118,0.1);border:1px solid rgba(0,230,118,0.2);border-radius:20px;font-size:11px;font-weight:700;color:#00e676;">🅿 Na ziemi</div>'
    +'</div>'

    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:16px;font-weight:900;color:#00e676;">'+ac.seats+'</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;">FOTELI</div></div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:16px;font-weight:900;color:#f5a623;">'+speed+' km/h</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;">PRĘDKOŚĆ PRZELOTOWA</div></div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:16px;font-weight:900;color:#00d4ff;">'+(ac.range||0)+' km</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;">ZASIĘG</div></div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:16px;font-weight:900;color:#a78bfa;">'+(route?route.from+'→'+route.to:'Brak trasy')+'</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;">PRZYPISANA TRASA</div></div>'
    +'</div>'

    +'<button onclick="closeModal()" style="width:100%;padding:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zamknij</button>';

  document.getElementById('modal').style.display='flex';
}

function addPolishCheckpoints() {}
function addCountryLabels() {}

function drawFlightLayer(route) {
  if(!LMAP) return;
  removeFlightLayer(route.id);
  var line = L.polyline(
    [[route.fromLat,route.fromLng],[route.toLat,route.toLng]],
    {color:'#00d4ff',weight:2,opacity:0.7,dashArray:'8,5'}
  ).addTo(LMAP);
  var planeHtml = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">'
    +'<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"'
    +' fill="'+G.airline.color+'" stroke="rgba(0,0,0,0.4)" stroke-width="0.5"/>'
    +'</svg>';
  var icon = L.divIcon({className:'',html:planeHtml,iconSize:[28,28],iconAnchor:[14,14]});
  var plane = L.marker([route.fromLat,route.fromLng],{icon:icon,zIndexOffset:2000}).addTo(LMAP);
  FLIGHT_LAYERS[route.id] = {line:line, plane:plane};
}

function removeFlightLayer(rid) {
  if(FLIGHT_LAYERS[rid]){
    try{LMAP.removeLayer(FLIGHT_LAYERS[rid].line);}catch(e){}
    try{LMAP.removeLayer(FLIGHT_LAYERS[rid].plane);}catch(e){}
    delete FLIGHT_LAYERS[rid];
  }
}

function onApClick(ap) {
  var isHome=G.homeAirport&&G.homeAirport.icao===ap.icao;
  var hasSlot=isHome||G.slots.indexOf(ap.icao)>=0;
  var sc=hasSlot?'#00e676':'#666';
  var st=isHome?'Twoja baza':hasSlot?'Masz slot':'Brak slotu';
  var btn='';
  if(isHome) btn=''; // Ulepszenia tylko w zakładce Lotnisko
  else if(hasSlot) btn='<button onclick="doAddRouteFromMap(this)" data-icao="'+ap.icao+'" style="'+BS('#00e676')+'">+ Otworz trase</button>';
  else btn='<div style="font-size:12px;color:#555;margin-top:8px;">Kup slot w Sklepie</div>';
  document.getElementById('modal-body').innerHTML=
    '<div style="font-size:16px;font-weight:700;color:#00d4ff;margin-bottom:2px;">'+ap.icao+'</div>'
    +'<div style="font-size:13px;color:#a0b8cc;margin-bottom:4px;">'+ap.city+'</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:12px;">'+ap.country+'</div>'
    +'<div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:13px;">'
    +'<span style="color:#5580a0;">Status:</span><span style="color:'+sc+';font-weight:700;">'+st+'</span></div>'+btn;
  document.getElementById('modal').style.display='flex';
  if(LMAP) LMAP.closePopup();
}
function BS(c){return 'width:100%;padding:10px;background:'+c+';border:none;border-radius:8px;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;color:#fff;margin-top:4px;';}
function upgradeHome(){var ap=G.homeAirport;if(!ap)return;var cost=(ap.level||1)*50000;if(G.cash<cost){showMsg('Za malo gotowki!');return;}G.cash-=cost;ap.level=(ap.level||1)+1;save();updateHUD();showMsg('Baza ulepszona!');document.getElementById('modal').style.display='none';}
function doAddRouteFromMap(icao){document.getElementById('modal').style.display='none';showMsg('Dodaj trase w zakladce Flota!');}
function openRoute(){}
