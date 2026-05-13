window.addEventListener('load',function(){
  var saved=localStorage.getItem('sb_v3');
  if(saved){try{var g=JSON.parse(saved);
    if(g.cash)G.cash=g.cash;
    if(g.homeAirport)G.homeAirport=g.homeAirport;
    if(g.fleet&&g.fleet.length)G.fleet=g.fleet;
    if(g.airline)G.airline=g.airline;
    if(g.points)G.points=g.points;
    if(g.level)G.level=g.level;
    if(g.totalFlights)G.totalFlights=g.totalFlights;
    if(g.routes)G.routes=g.routes;
    // Sloty - tylko prawdziwe lotniska z ADB
    if(g.slots) G.slots=g.slots.filter(function(icao){
      return ADB.some(function(a){return a.icao===icao;});
    });
    // Lotniska - tylko baza + prawdziwe z ADB
    if(g.airports) G.airports=g.airports.filter(function(ap){
      if(ap.isHome) return true;
      return ADB.some(function(a){return a.icao===ap.icao;});
    });
  }catch(e){}}
  // Napraw niespojnosci miedzy flotą a trasami
  G.fleet.forEach(function(ac){
    if(ac.routeId) {
      var route = G.routes.filter(function(r){return r.id===ac.routeId;})[0];
      if(!route) {
        // Trasa nie istnieje - zwolnij samolot
        ac.routeId = null;
        ac.status = 'ground';
      }
    }
    // Napraw status - jesli trasa skonczyla sie ale status flying
    if(ac.status==='flying' && ac.routeId) {
      var r = G.routes.filter(function(x){return x.id===ac.routeId;})[0];
      if(r && r.startTime && r.duration) {
        var elapsed = Date.now() - r.startTime;
        if(elapsed >= r.duration) {
          ac.status = 'landed';
        }
      }
    }
  });

  // Usun trasy bez samolotu
  G.routes = G.routes.filter(function(r){
    return G.fleet.some(function(ac){return ac.id===r.acId;});
  });

  if(G.homeAirport){
    initMap();
    setTimeout(function(){
      LMAP.invalidateSize({animate:false});
      LMAP.setView([G.homeAirport.lat,G.homeAirport.lng],6);
      renderMarkers();renderRoutes();restoreFlights();startTick();updateHUD();
    },50);
  } else {
    showSetupScreen();
  }
});
