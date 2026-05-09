window.addEventListener('load',function(){
  var saved=localStorage.getItem('sb_v3');
  if(saved){try{var g=JSON.parse(saved);
    if(g.cash)G.cash=g.cash;if(g.airports)G.airports=g.airports;
    if(g.routes)G.routes=g.routes;if(g.slots)G.slots=g.slots;
    if(g.homeAirport)G.homeAirport=g.homeAirport;
    if(g.fleet&&g.fleet.length)G.fleet=g.fleet;
    if(g.airline)G.airline=g.airline;if(g.points)G.points=g.points;
    if(g.level)G.level=g.level;if(g.totalFlights)G.totalFlights=g.totalFlights;
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
