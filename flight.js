/* -- FLIGHT ANIMATION -- */
function drawFlightLayer(route) {
  if(!LMAP) return;
  removeFlightLayer(route.id);
  var line=L.polyline([[route.fromLat,route.fromLng],[route.toLat,route.toLng]],
    {color:'#e63946',weight:2.5,opacity:0.8,dashArray:'7,6'}).addTo(LMAP);
  var planeHtml='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 100 100">'
    +'<path d="M50 5 C50 5 62 28 65 35 L92 40 L68 60 L74 90 L50 76 L26 90 L32 60 L8 40 L35 35 C38 28 50 5 50 5Z" fill="'+G.airline.color+'" stroke="#fff" stroke-width="3"/>'
    +'</svg>';
  var planeIcon=L.divIcon({className:'',html:planeHtml,iconSize:[28,28],iconAnchor:[14,14]});
  var planeMarker=L.marker([route.fromLat,route.fromLng],{icon:planeIcon,zIndexOffset:2000}).addTo(LMAP);
  FLIGHT_LAYERS[route.id]={line:line,plane:planeMarker};
}

function removeFlightLayer(routeId) {
  if(FLIGHT_LAYERS[routeId]) {
    if(LMAP){LMAP.removeLayer(FLIGHT_LAYERS[routeId].line);LMAP.removeLayer(FLIGHT_LAYERS[routeId].plane);}
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
    if(layer) {
      layer.plane.setLatLng([lat,lng]);var pe=layer.plane.getElement();if(pe){var sv=pe.querySelector('svg');if(sv)sv.style.transform='rotate('+bearing+'deg)';}
    }
    if(t>=1) {
      ac.status='landed';
      G.cash+=route.revenue;
      G.totalFlights=(G.totalFlights||0)+1;
      checkLevelUp(); save();
      showMsg('Wyladowal '+ac.model+'! +$'+route.revenue.toLocaleString());
      if(_activeTab==='trasy'){var pb=document.getElementById('panel-body');if(pb)renderTrasy(pb);}
      if(_activeTab==='flota'){var pb=document.getElementById('panel-body');if(pb)renderFlotaMain(pb);}
    }
  });
}

function startTick() {
  if(TICK_INTERVAL) clearInterval(TICK_INTERVAL);
  TICK_INTERVAL=setInterval(function(){
    updateFlightPositions();
    if(_activeTab==='trasy'){var pb=document.getElementById('panel-body');if(pb)renderTrasy(pb);}
    if(_activeTab==='flota'){var pb=document.getElementById('panel-body');if(pb)renderFlotaMain(pb);}
  },200);
}

function restoreFlights() {
  G.routes.forEach(function(r){
    var ac=G.fleet.filter(function(a){return a.routeId===r.id;})[0];
    if(ac&&ac.status==='flying') drawFlightLayer(r);
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

