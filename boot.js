window.addEventListener('load', function() {
  initFirebase();

  _fbAuth.onAuthStateChanged(function(user) {
    if(user) {
      _currentUser = user;
      // Zaladuj dane tylko z Firebase
      loadPlayerData(user.uid, function(hasData) {
        if(hasData && G.homeAirport) {
          G.slots = G.slots.filter(function(icao){
            return ADB.some(function(a){return a.icao===icao;});
          });
          G.airports = G.airports.filter(function(ap){
            if(ap.isHome) return true;
            return ADB.some(function(a){return a.icao===ap.icao;});
          });
          G.fleet.forEach(function(ac){
            if(ac.routeId) {
              var route = G.routes.filter(function(r){return r.id===ac.routeId;})[0];
              if(!route) { ac.routeId=null; ac.status='ground'; }
            }
          });
          G.routes = G.routes.filter(function(r){
            return G.fleet.some(function(ac){return ac.id===r.acId;});
          });
          startGame();
        } else {
          showSetupScreen();
        }
      });
    } else {
      showAuthScreen();
    }
  });
});
