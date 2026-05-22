/* -- FLIGHT ANIMATION -- */
function drawFlightLayer(route) {
  if(!LMAP) return;
  removeFlightLayer(route.id);
  var line=L.polyline([[route.fromLat,route.fromLng],[route.toLat,route.toLng]],
    {color:'#e63946',weight:2.5,opacity:0.8,dashArray:'7,6'}).addTo(LMAP);
  var planeHtml='<img src="https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/pngtree-vector-airplane-icon-png-image_515968-removebg-preview.png" width="36" height="36" style="transform-origin:center;display:block;">';
  var planeIcon=L.divIcon({className:'',html:planeHtml,iconSize:[36,36],iconAnchor:[18,18]});
  var planeMarker=L.marker([route.fromLat,route.fromLng],{icon:planeIcon,zIndexOffset:2000}).addTo(LMAP);

  // Kliknięcie w samolot podczas lotu
  planeMarker.on('click', function(){ showFlightInfo(route.id); });

  FLIGHT_LAYERS[route.id]={line:line,plane:planeMarker};
}

function showFlightInfo(routeId) {
  var route = G.routes.filter(function(r){return r.id===routeId;})[0];
  if(!route) return;
  var ac = G.fleet.filter(function(a){return a.routeId===routeId;})[0];
  if(!ac) return;

  var now = Date.now();
  var t = Math.min(1,(now-route.startTime)/route.duration);
  var isFlying = ac.status==='flying' && t<1;
  var isLanded = ac.status==='landed' || t>=1;

  // Oblicz ETA
  var rem = Math.max(0, route.duration-(now-route.startTime));
  var eta = '';
  if(rem<60000) eta=Math.ceil(rem/1000)+'s';
  else { var h=Math.floor(rem/3600000),m=Math.floor((rem%3600000)/60000); eta=h>0?h+'h '+m+'m':m+'m'; }

  // Prędkość przelotowa
  var speed = 850;
  if(typeof AC_SPEEDS!=='undefined' && AC_SPEEDS[ac.model]) speed=AC_SPEEDS[ac.model];

  // Dystans
  var dist = Math.round(calcDist(route.fromLat,route.fromLng,route.toLat,route.toLng));

  // Progres %
  var pct = Math.round(t*100);

  var statusColor = isFlying?'#00d4ff':isLanded?'#00e676':'#f5a623';
  var statusText  = isFlying?'✈ W locie':isLanded?'✅ Wylądował':'⏳ Oczekuje';

  document.getElementById('modal-body').innerHTML =
    // Header
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">'
    +'<div style="font-size:32px;">✈</div>'
    +'<div>'
    +'<div style="font-size:16px;font-weight:900;color:#e0f0ff;">'+ac.model+'</div>'
    +'<div style="font-size:11px;color:#5580a0;">'+ac.reg+' &bull; '+G.airline.name+'</div>'
    +'</div>'
    +'<div style="margin-left:auto;padding:5px 12px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);border-radius:20px;font-size:11px;font-weight:700;color:'+statusColor+';">'+statusText+'</div>'
    +'</div>'

    // Trasa
    +'<div style="background:rgba(0,0,0,0.25);border-radius:12px;padding:14px;margin-bottom:12px;">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">'
    +'<div style="text-align:center;">'
    +'<div style="font-size:20px;font-weight:900;color:#00d4ff;">'+route.from+'</div>'
    +'<div style="font-size:10px;color:#5580a0;">'+(route.fromCity||'')+'</div>'
    +'</div>'
    +'<div style="flex:1;text-align:center;">'
    +'<div style="font-size:10px;color:#5580a0;margin-bottom:4px;">'+dist+' km</div>'
    +'<div style="height:2px;background:rgba(255,255,255,0.1);border-radius:1px;position:relative;">'
    +'<div style="position:absolute;left:0;top:0;height:100%;width:'+pct+'%;background:#00d4ff;border-radius:1px;transition:width 0.3s;"></div>'
    +'<div style="position:absolute;top:-5px;left:'+pct+'%;transform:translateX(-50%);font-size:14px;">✈</div>'
    +'</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:8px;">'+pct+'% trasy</div>'
    +'</div>'
    +'<div style="text-align:center;">'
    +'<div style="font-size:20px;font-weight:900;color:#00d4ff;">'+route.to+'</div>'
    +'<div style="font-size:10px;color:#5580a0;">'+(route.toCity||'')+'</div>'
    +'</div></div></div>'

    // Stats
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:16px;font-weight:900;color:#a78bfa;">'+(isFlying?eta:isLanded?'Wylądował':'—')+'</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;letter-spacing:1px;">DO LĄDOWANIA</div></div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:16px;font-weight:900;color:#f5a623;">'+speed+' km/h</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;letter-spacing:1px;">PRĘDKOŚĆ</div></div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:16px;font-weight:900;color:#00e676;">'+ac.seats+'</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;letter-spacing:1px;">PASAŻERÓW</div></div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:16px;font-weight:900;color:#00d4ff;">'+Math.round(route.duration/60000)+' min</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;letter-spacing:1px;">CZAS LOTU</div></div>'
    +'</div>'

    +'<button onclick="closeModal()" style="width:100%;padding:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zamknij</button>';

  document.getElementById('modal').style.display='flex';
}

function removeFlightLayer(routeId) {
  if(FLIGHT_LAYERS[routeId]) {
    if(LMAP){
      try{LMAP.removeLayer(FLIGHT_LAYERS[routeId].line);}catch(e){}
      try{LMAP.removeLayer(FLIGHT_LAYERS[routeId].plane);}catch(e){}
    }
    delete FLIGHT_LAYERS[routeId];
  }
}

function updateFlightPositions() {
  var now=Date.now();
  G.routes.forEach(function(route) {
    var ac=G.fleet.filter(function(a){return a.routeId===route.id;})[0];
    if(!ac||ac.status!=='flying') return;
    var t=Math.min(1,(now-route.startTime)/route.duration);
    var lat=route.fromLat+(route.toLat-route.fromLat)*t;
    var lng=route.fromLng+(route.toLng-route.fromLng)*t;
    var bearing=Math.atan2(route.toLng-route.fromLng,route.toLat-route.fromLat)*180/Math.PI;
    var layer=FLIGHT_LAYERS[route.id];

    // Jeśli nie ma warstwy (np. po odświeżeniu) - odtwórz
    if(!layer) { drawFlightLayer(route); layer=FLIGHT_LAYERS[route.id]; }

    if(layer) {
      layer.plane.setLatLng([lat,lng]);
      var pe=layer.plane.getElement();
      if(pe){var img=pe.querySelector('img');if(img)img.style.transform='rotate('+bearing+'deg)';}
    }

    if(t>=1) {
      ac.status='landed';
      G.totalFlights=(G.totalFlights||0)+1;
      if(typeof tickFlightHours==='function') tickFlightHours(ac, route.durationMin||40);
      checkLevelUp(); save();
      showMsg('✅ Wylądował '+ac.model+' ('+route.from+'→'+route.to+')!');

      // Samolot ląduje na docelowym lotnisku - zostaw ikonkę na miejscu docelowym
      if(layer) {
        layer.plane.setLatLng([route.toLat,route.toLng]);
        var pe2=layer.plane.getElement();
        if(pe2){var img2=pe2.querySelector('img');if(img2)img2.style.transform='rotate(0deg)';}
        // Aktualizuj kliknięcie - po lądowaniu też pokazuj info
        layer.plane.off('click');
        layer.plane.on('click', function(){ showFlightInfo(route.id); });
      }

      if(typeof _activeTab!=='undefined'){
        if(_activeTab==='trasy'){var pb=document.getElementById('panel-body');if(pb)renderTrasy(pb);}
        if(_activeTab==='flota'){var pb=document.getElementById('panel-body');if(pb)renderFlotaMain(pb);}
      }
    }
  });
}

function startTick() {
  if(TICK_INTERVAL) clearInterval(TICK_INTERVAL);
  TICK_INTERVAL=setInterval(function(){
    updateFlightPositions();
    if(typeof _activeTab!=='undefined'){
      if(_activeTab==='trasy'){var pb=document.getElementById('panel-body');if(pb)renderTrasy(pb);}
      if(_activeTab==='flota'){var pb=document.getElementById('panel-body');if(pb)renderFlotaMain(pb);}
    }
  },200);
}

function restoreFlights() {
  G.routes.forEach(function(r){
    var ac=G.fleet.filter(function(a){return a.routeId===r.id;})[0];
    if(ac&&(ac.status==='flying'||ac.status==='landed')) drawFlightLayer(r);
  });
}

function calcETA(route) {
  var rem=Math.max(0,route.duration-(Date.now()-route.startTime));
  if(rem<60000) return Math.ceil(rem/1000)+'s';
  var h=Math.floor(rem/3600000),m=Math.floor((rem%3600000)/60000);
  return h>0?h+'h '+m+'m':m+'m';
}

function calcDist(la1,ln1,la2,ln2) {
  var R=6371,d=Math.PI/180;
  var a=Math.sin((la2-la1)*d/2)*Math.sin((la2-la1)*d/2)+Math.cos(la1*d)*Math.cos(la2*d)*Math.sin((ln2-ln1)*d/2)*Math.sin((ln2-ln1)*d/2);
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

/* -- RUNWAY QUEUE SYSTEM -- */
var _runwayQueue = [];
var _runwayActive = 0;
var _runwayTimer = null;

function getRunwayCount() {
  var ap = G.homeAirport;
  if(!ap || !ap.upgrades) return 1;
  return ap.upgrades.runways || 1;
}

function queueDeparture(route) {
  _runwayQueue.push(route);
  processRunwayQueue();
}

function processRunwayQueue() {
  if(_runwayTimer) return;
  _runwayTimer = setInterval(function() {
    var maxRunways = getRunwayCount();
    var departed = 0;
    while(_runwayQueue.length > 0 && departed < maxRunways) {
      var route = _runwayQueue.shift();
      startFlight(route);
      departed++;
    }
    if(_runwayQueue.length === 0) {
      clearInterval(_runwayTimer);
      _runwayTimer = null;
    }
    var body = document.getElementById('panel-body');
    var title = document.getElementById('panel-title');
    if(title && title.textContent === 'TRASY' && body) renderTrasy(body);
  }, 5000);
}

function departAll() {
  var free = G.routes.filter(function(r){ return !r.flying && !r.active; });
  if(!free.length){ showMsg('Brak gotowych tras!'); return; }
  _runwayQueue = [];
  free.forEach(function(r){ _runwayQueue.push(r); });
  processRunwayQueue();
  var runways = getRunwayCount();
  showMsg(free.length+' lotów w kolejce ('+runways+' pas'+(runways>1?'y':'')+')');
}

function departSingle(route) {
  if(route.flying || route.active){ showMsg('Samolot już w locie!'); return; }
  queueDeparture(route);
  showMsg('Dodano do kolejki startowej');
}
