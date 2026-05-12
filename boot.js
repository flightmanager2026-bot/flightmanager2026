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
