window.addEventListener('load', function() {
  initFirebase();

  _fbAuth.onAuthStateChanged(function(user) {
    if(user) {
      _currentUser = user;

      // Najpierw zaladuj z localStorage (natychmiastowe)
      var hasLocal = false;
      try {
        var d = localStorage.getItem('sb_v3');
        if(d) {
          var g = JSON.parse(d);
          if(g.homeAirport) {
            if(g.cash) G.cash=g.cash;
            if(g.homeAirport) G.homeAirport=g.homeAirport;
            if(g.fleet&&g.fleet.length) G.fleet=g.fleet;
            if(g.airline) G.airline=g.airline;
            if(g.points) G.points=g.points;
            if(g.level) G.level=g.level;
            if(g.totalFlights) G.totalFlights=g.totalFlights;
            if(g.routes) G.routes=g.routes;
            if(g.departurelog) G.departurelog=g.departurelog;
            if(g.lastShopPayout) G.lastShopPayout=g.lastShopPayout;
    if(g.staff) G.staff=g.staff;
    if(g.jobMarket) G.jobMarket=g.jobMarket;
            if(g.slots) G.slots=g.slots.filter(function(icao){
              return ADB.some(function(a){return a.icao===icao;});
            });
            if(g.airports) G.airports=g.airports.filter(function(ap){
              if(ap.isHome) return true;
              return ADB.some(function(a){return a.icao===ap.icao;});
            });
            hasLocal = true;
          }
        }
      } catch(e) {}

      if(hasLocal && G.homeAirport) {
        // Napraw niespojnosci
        G.fleet.forEach(function(ac){
          if(ac.routeId) {
            var route = G.routes.filter(function(r){return r.id===ac.routeId;})[0];
            if(!route) { ac.routeId=null; ac.status='ground'; }
          }
        });
        G.routes = G.routes.filter(function(r){
          return G.fleet.some(function(ac){return ac.id===r.acId;});
        });

        // Uruchom gre od razu z lokalnych danych
        startGame();

        // W tle synchronizuj z Firebase (nowsze dane z innego urzadzenia)
        loadPlayerData(user.uid, function(hasCloud) {
          if(hasCloud && G.homeAirport) {
            // Firebase zsynchronizowany - zapisz lokalnie
            save();
          }
        });
      } else {
        // Brak lokalnych danych - sprobuj z Firebase
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
            // Zapisz staff
            if(data.staff) G.staff=data.staff;
            if(data.jobMarket) G.jobMarket=data.jobMarket;
            // Zapisz lokalnie na przyszlosc
            try { localStorage.setItem('sb_v3', JSON.stringify({
              cash:G.cash, homeAirport:G.homeAirport, fleet:G.fleet,
              airline:G.airline, points:G.points||0, level:G.level||1,
              totalFlights:G.totalFlights||0, routes:G.routes,
              slots:G.slots, airports:G.airports,
              departurelog:G.departurelog||[], lastShopPayout:G.lastShopPayout||0
            })); } catch(e) {}
            startGame();
          } else {
            // Nowe konto - pokaż setup
            showSetupScreen();
          }
        });
      }
    } else {
      showAuthScreen();
    }
  });
});
