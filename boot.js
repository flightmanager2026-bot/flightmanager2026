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
          if(g._uid && g._uid !== user.uid) {
            localStorage.removeItem('sb_v3');
            g = {};
          }
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
        // Sprawdz flage globalnego resetu
        _fbDb.collection('config').doc('global').get().then(function(cfg) {
          var requiredVersion = cfg.exists ? (cfg.data().reset_version || 0) : 0;
          var localVersion = 0;
          try { var lv=JSON.parse(localStorage.getItem('sb_v3')||'{}'); localVersion=lv.reset_version||0; } catch(e){}
          if(requiredVersion > localVersion) {
            localStorage.removeItem('sb_v3');
            G.cash=500000; G.fleet=[]; G.routes=[]; G.slots=[]; G.airports=[];
            G.homeAirport=null; G.points=0; G.level=1; G.totalFlights=0;
            G.departurelog=[]; G.lastShopPayout=0; G.staff=null; G.jobMarket=null;
            G.airline={name:'',iata:'',color:'#00d4ff'};
            _fbDb.collection('players').doc(user.uid).delete();
            showSetupScreen();
            return;
          }
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
          startGame();
          loadPlayerData(user.uid, function(hasCloud) {
            if(hasCloud && G.homeAirport) save();
          });
        }).catch(function() {
          // Blad odczytu config - startuj normalnie
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
          loadPlayerData(user.uid, function(hasCloud) {
            if(hasCloud && G.homeAirport) save();
          });
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
            // Zapisz lokalnie na przyszlosc
            try { localStorage.setItem('sb_v3', JSON.stringify({
              cash:G.cash, homeAirport:G.homeAirport, fleet:G.fleet,
              airline:G.airline, points:G.points||0, level:G.level||1,
              totalFlights:G.totalFlights||0, routes:G.routes,
              slots:G.slots, airports:G.airports,
              departurelog:G.departurelog||[], lastShopPayout:G.lastShopPayout||0,
              staff:G.staff||{}, jobMarket:G.jobMarket||null
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
