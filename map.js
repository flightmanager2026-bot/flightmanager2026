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
      + '<svg width="22" height="30" viewBox="0 0 28 38">'
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
  
  // Add home airport from G.homeAirport (real city coordinates)
  if(G.homeAirport) {
    addPin(G.homeAirport);
  }
  
  // Add other airports from ADB (skip if same ICAO as home)
  ADB.forEach(function(ap){
    if(G.homeAirport && ap.icao === G.homeAirport.icao) return;
    addPin(ap);
  });
  
  // Add owned slots
  G.airports.forEach(function(ap){
    if(!ap.isHome && (!G.homeAirport || ap.icao !== G.homeAirport.icao)) {
      addPin(ap);
    }
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
  if(isHome) btn='<button onclick="upgradeHome()" style="'+BS('#f5a623')+'">Ulepsz baze</button>';
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
