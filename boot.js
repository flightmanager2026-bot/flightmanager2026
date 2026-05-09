window.addEventListener('load',function(){
  initMap();
  var saved=localStorage.getItem('sb_v3');
  if(saved){try{var g=JSON.parse(saved);if(g.cash)G.cash=g.cash;if(g.airports)G.airports=g.airports;if(g.routes)G.routes=g.routes;if(g.slots)G.slots=g.slots;if(g.homeAirport)G.homeAirport=g.homeAirport;if(g.fleet&&g.fleet.length)G.fleet=g.fleet;if(g.airline)G.airline=g.airline;if(g.points)G.points=g.points;if(g.level)G.level=g.level;if(g.totalFlights)G.totalFlights=g.totalFlights;}catch(e){}}
  _setupFiltered=POLISH_CITIES.slice();
  renderSetupList();
  if(G.homeAirport){document.getElementById('setupScreen').style.display='none';updateHUD();renderMarkers();renderRoutes();}
  else{document.getElementById('setupScreen').style.display='flex';document.getElementById('sq').focus();}
  restoreFlights();
  startTick();
  updateHUD();
});
