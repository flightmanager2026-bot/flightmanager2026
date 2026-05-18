/* -- RANKING GLOBALNY -- */

function getFleetValue() {
  var total = 0;
  G.fleet.forEach(function(ac){
    var found = null;
    Object.keys(AIRCRAFT_CATALOG).forEach(function(brand){
      AIRCRAFT_CATALOG[brand].forEach(function(a){ if(a.model===ac.model) found=a; });
    });
    total += found ? found.price : 50000000;
  });
  return total;
}

function updateRankingValue() {
  if(!_currentUser || !_fbDb) return;
  var value = getFleetValue();
  var fleetModels = {};
  G.fleet.forEach(function(ac){ fleetModels[ac.model] = (fleetModels[ac.model]||0)+1; });
  _fbDb.collection('ranking').doc(_currentUser.uid).set({
    uid: _currentUser.uid,
    airline: G.airline ? G.airline.name : 'Unknown',
    code: G.airline ? G.airline.iata : '??',
    color: G.airline ? (G.airline.color||'#e63946') : '#e63946',
    fleetValue: value,
    fleetSize: G.fleet.length,
    fleetModels: fleetModels,
    level: G.level || 1,
    totalFlights: G.totalFlights || 0,
    totalPassengers: G.totalPassengers || 0,
    cargolicence: G.cargolicence || false,
    homeAirport: G.homeAirport ? {icao: G.homeAirport.icao, city: G.homeAirport.city, country: G.homeAirport.country} : null,
    foundedAt: G.foundedAt || 0,
    updatedAt: Date.now()
  }).catch(function(){});
}

function renderRanking(body) {
  body.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
    +'<div style="font-size:9px;color:#5580a0;letter-spacing:3px;">RANKING GLOBALNY</div>'
    +'<button onclick="var b=document.getElementById(\'panel-body\');updateRankingValue();renderRanking(b);" '
    +'style="font-size:10px;padding:4px 10px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);'
    +'border-radius:6px;color:#00d4ff;cursor:pointer;font-family:Arial,sans-serif;">&#8635; Odśwież</button>'
    +'</div>'
    +'<div style="padding:30px;text-align:center;color:#5580a0;">Ładowanie...</div>';

  if(!_fbDb) {
    body.innerHTML = '<div style="padding:20px;text-align:center;color:#5580a0;">Brak połączenia</div>';
    return;
  }

  _fbDb.collection('ranking').orderBy('fleetValue','desc').limit(100).get()
    .then(function(snap) {
      var myUid = _currentUser ? _currentUser.uid : null;
      var allPlayers = [];
      var myPos = null;

      snap.forEach(function(doc) {
        allPlayers.push({id: doc.id, data: doc.data()});
      });

      function buildHtml(filter) {
        var html =
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
          +'<div style="font-size:9px;color:#5580a0;letter-spacing:3px;">RANKING GLOBALNY</div>'
          +'<button onclick="var b=document.getElementById(\'panel-body\');updateRankingValue();renderRanking(b);" '
          +'style="font-size:10px;padding:4px 10px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);'
          +'border-radius:6px;color:#00d4ff;cursor:pointer;font-family:Arial,sans-serif;">&#8635; Odśwież</button>'
          +'</div>'
          // Wyszukiwarka
          +'<div style="position:relative;margin-bottom:12px;">'
          +'<input id="ranking-search" type="text" placeholder="&#128269; Szukaj linii lotniczej..." value="'+(filter||'')+'" '
          +'oninput="window._rankingFilter(this.value)" '
          +'style="width:100%;box-sizing:border-box;padding:8px 12px;background:rgba(255,255,255,0.05);'
          +'border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#e0f0ff;font-size:12px;'
          +'font-family:Arial,sans-serif;outline:none;" />'
          +'</div>'
          +'<div id="ranking-list">';

        if(snap.empty) {
          html += '<div style="padding:30px;text-align:center;color:#5580a0;">Brak danych w rankingu</div>';
        } else {
          var q = (filter||'').toLowerCase().trim();
          var pos = 0, shown = 0;
          allPlayers.forEach(function(entry) {
            pos++;
            var d = entry.data;
            if(q && (d.airline||'').toLowerCase().indexOf(q)<0 && (d.code||'').toLowerCase().indexOf(q)<0) return;
            shown++;
            var isMe = entry.id === myUid;
            if(isMe) myPos = pos;
            var medal = pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';
            var posColor = pos===1?'#f5a623':pos===2?'#b0b8c8':pos===3?'#cd7f32':'#5580a0';
            var accentColor = (d.color && d.color !== '#000000') ? d.color : '#00d4ff';

            html +=
              '<div style="background:'+(isMe?'rgba(0,212,255,0.07)':'rgba(255,255,255,0.03)')+';'
              +'border:1px solid '+(isMe?'rgba(0,212,255,0.3)':'rgba(255,255,255,0.06)')+';'
              +'border-left:3px solid '+(isMe?'#00d4ff':accentColor)+';'
              +'border-radius:12px;padding:11px 12px;margin-bottom:6px;">'
              // Górna linia: pozycja + linia + "TY" badge + wartość
              +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">'
              +'<div style="font-size:'+(pos<=3?'18':'13')+'px;font-weight:900;color:'+posColor+';width:30px;text-align:center;flex-shrink:0;">'+(medal||'#'+pos)+'</div>'
              +'<div style="flex:1;min-width:0;">'
              +'<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">'
              +'<span style="font-size:13px;font-weight:700;color:#e0f0ff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+d.airline+'</span>'
              +'<span style="font-size:10px;color:#5580a0;">('+d.code+')</span>'
              +(isMe?'<span style="font-size:9px;font-weight:700;padding:1px 6px;background:rgba(0,212,255,0.15);color:#00d4ff;border-radius:10px;">TY</span>':'')
              +(d.cargolicence?'<span style="font-size:9px;padding:1px 6px;background:rgba(245,166,35,0.12);color:#f5a623;border-radius:10px;">📦 Cargo</span>':'')
              +'</div>'
              +'<div style="font-size:10px;color:#5580a0;margin-top:1px;">LVL '+d.level+' &bull; '+(d.homeAirport?d.homeAirport.icao+' '+d.homeAirport.city:'?')+'</div>'
              +'</div>'
              +'<div style="text-align:right;flex-shrink:0;">'
              +'<div style="font-size:12px;font-weight:900;color:#00e676;">$'+((d.fleetValue||0)/1000000).toFixed(1)+'M</div>'
              +'<div style="font-size:9px;color:#5580a0;">flota</div>'
              +'</div></div>'
              // Statystyki
              +'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:7px;">'
              +'<span style="padding:2px 7px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:9px;color:#7dd3fc;">&#9992; '+d.fleetSize+' sam.</span>'
              +'<span style="padding:2px 7px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:9px;color:#7dd3fc;">&#128736; '+(d.totalFlights||0)+' lotów</span>'
              +'<span style="padding:2px 7px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:9px;color:#7dd3fc;">&#128100; '+((d.totalPassengers||0)/1000000>=1?((d.totalPassengers||0)/1000000).toFixed(1)+'M':(d.totalPassengers||0).toLocaleString())+' pas.</span>'
              +'</div>'
              // Przycisk profilu
              +'<button data-uid="'+entry.id+'" onclick="showPlayerProfile(this.dataset.uid)" '
              +'style="width:100%;padding:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);'
              +'border-radius:8px;color:#a0b8d0;font-size:11px;font-weight:600;cursor:pointer;font-family:Arial,sans-serif;">'
              +'Zobacz profil &#8250;'
              +'</button>'
              +'</div>';
          });
          if(shown === 0) html += '<div style="padding:20px;text-align:center;color:#5580a0;">Brak wyników dla &ldquo;'+filter+'&rdquo;</div>';
        }
        html += '</div>';
        return html;
      }

      window._rankingFilter = function(val) {
        var list = document.getElementById('ranking-list');
        if(list) {
          var q = val.toLowerCase().trim();
          var pos = 0;
          var shown = 0;
          var out = '';
          allPlayers.forEach(function(entry) {
            pos++;
            var d = entry.data;
            if(q && (d.airline||'').toLowerCase().indexOf(q)<0 && (d.code||'').toLowerCase().indexOf(q)<0) return;
            shown++;
            var isMe = entry.id === myUid;
            var medal = pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';
            var posColor = pos===1?'#f5a623':pos===2?'#b0b8c8':pos===3?'#cd7f32':'#5580a0';
            var accentColor = (d.color && d.color !== '#000000') ? d.color : '#00d4ff';
            out +=
              '<div style="background:'+(isMe?'rgba(0,212,255,0.07)':'rgba(255,255,255,0.03)')+';'
              +'border:1px solid '+(isMe?'rgba(0,212,255,0.3)':'rgba(255,255,255,0.06)')+';'
              +'border-left:3px solid '+(isMe?'#00d4ff':accentColor)+';'
              +'border-radius:12px;padding:11px 12px;margin-bottom:6px;">'
              +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">'
              +'<div style="font-size:'+(pos<=3?'18':'13')+'px;font-weight:900;color:'+posColor+';width:30px;text-align:center;flex-shrink:0;">'+(medal||'#'+pos)+'</div>'
              +'<div style="flex:1;min-width:0;">'
              +'<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">'
              +'<span style="font-size:13px;font-weight:700;color:#e0f0ff;">'+d.airline+'</span>'
              +'<span style="font-size:10px;color:#5580a0;">('+d.code+')</span>'
              +(isMe?'<span style="font-size:9px;font-weight:700;padding:1px 6px;background:rgba(0,212,255,0.15);color:#00d4ff;border-radius:10px;">TY</span>':'')
              +(d.cargolicence?'<span style="font-size:9px;padding:1px 6px;background:rgba(245,166,35,0.12);color:#f5a623;border-radius:10px;">📦 Cargo</span>':'')
              +'</div>'
              +'<div style="font-size:10px;color:#5580a0;margin-top:1px;">LVL '+d.level+' &bull; '+(d.homeAirport?d.homeAirport.icao+' '+d.homeAirport.city:'?')+'</div>'
              +'</div>'
              +'<div style="text-align:right;flex-shrink:0;">'
              +'<div style="font-size:12px;font-weight:900;color:#00e676;">$'+((d.fleetValue||0)/1000000).toFixed(1)+'M</div>'
              +'<div style="font-size:9px;color:#5580a0;">flota</div>'
              +'</div></div>'
              +'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:7px;">'
              +'<span style="padding:2px 7px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:9px;color:#7dd3fc;">&#9992; '+d.fleetSize+' sam.</span>'
              +'<span style="padding:2px 7px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:9px;color:#7dd3fc;">&#128736; '+(d.totalFlights||0)+' lotów</span>'
              +'<span style="padding:2px 7px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:9px;color:#7dd3fc;">&#128100; '+((d.totalPassengers||0)/1000000>=1?((d.totalPassengers||0)/1000000).toFixed(1)+'M':(d.totalPassengers||0).toLocaleString())+' pas.</span>'
              +'</div>'
              +'<button data-uid="'+entry.id+'" onclick="showPlayerProfile(this.dataset.uid)" '
              +'style="width:100%;padding:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);'
              +'border-radius:8px;color:#a0b8d0;font-size:11px;font-weight:600;cursor:pointer;font-family:Arial,sans-serif;">'
              +'Zobacz profil &#8250;</button>'
              +'</div>';
          });
          if(shown===0) out = '<div style="padding:20px;text-align:center;color:#5580a0;">Brak wyników</div>';
          list.innerHTML = out;
        }
      };

      body.innerHTML = buildHtml('');
    })
    .catch(function(e) {
      body.innerHTML = '<div style="padding:20px;text-align:center;color:#e63946;">Błąd: '+e.message+'</div>';
    });
}

function showPlayerProfile(uid) {
  if(!_fbDb) return;
  var modal = document.getElementById('modal');
  var modalBody = document.getElementById('modal-body');
  if(!modal || !modalBody) return;
  modalBody.innerHTML = '<div style="padding:30px;text-align:center;color:#5580a0;">Ładowanie profilu...</div>';
  modal.style.display = 'flex';

  _fbDb.collection('ranking').doc(uid).get().then(function(doc) {
    if(!doc.exists) {
      modalBody.innerHTML = '<div style="padding:20px;text-align:center;color:#e63946;">Nie znaleziono gracza</div>';
      return;
    }
    var d = doc.data();
    var isMe = _currentUser && doc.id === _currentUser.uid;

    // Dla własnego profilu uzupełnij brakujące pola z G (gdy ranking doc jest stary)
    if(isMe) {
      if(!d.homeAirport && G.homeAirport) d.homeAirport = {icao: G.homeAirport.icao, city: G.homeAirport.city, country: G.homeAirport.country};
      if(!d.foundedAt && G.foundedAt) d.foundedAt = G.foundedAt;
      if(!d.foundedAt && _currentUser.metadata && _currentUser.metadata.creationTime)
        d.foundedAt = new Date(_currentUser.metadata.creationTime).getTime();
      if(d.fleetSize === undefined) d.fleetSize = G.fleet.length;
      if(!d.fleetModels) {
        d.fleetModels = {};
        G.fleet.forEach(function(ac){ d.fleetModels[ac.model] = (d.fleetModels[ac.model]||0)+1; });
      }
      if(!d.totalPassengers && G.totalPassengers) d.totalPassengers = G.totalPassengers;
    }

    var accent = (d.color && d.color !== '#000000') ? d.color : '#00d4ff';
    var founded = d.foundedAt ? new Date(d.foundedAt).toLocaleDateString('pl-PL',{year:'numeric',month:'long',day:'numeric'}) : 'Nieznana';

    // Fleet models list
    var fleetHtml = '';
    if(d.fleetModels && Object.keys(d.fleetModels).length) {
      Object.keys(d.fleetModels).forEach(function(model) {
        fleetHtml +=
          '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">'
          +'<span style="font-size:12px;color:#e0f0ff;">'+model+'</span>'
          +'<span style="font-size:11px;color:#00d4ff;font-weight:700;">×'+d.fleetModels[model]+'</span>'
          +'</div>';
      });
    } else {
      fleetHtml = '<div style="font-size:11px;color:#5580a0;padding:8px 0;">Brak danych o flocie</div>';
    }

    var html =
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
      +'<button onclick="closeModal()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#e0f0ff;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;line-height:1.4;font-family:Arial,sans-serif;">&#8592;</button>'
      +'<div style="flex:1;">'
      +'<div style="font-size:15px;font-weight:800;color:#e0f0ff;">Profil linii</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+d.code+'</div>'
      +'</div>'
      +(isMe?'<span style="font-size:9px;font-weight:700;padding:2px 8px;background:rgba(0,212,255,0.15);color:#00d4ff;border-radius:10px;">TY</span>':'')
      +'</div>'

      // Hero band
      +'<div style="border-radius:13px;padding:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-left:4px solid '+accent+';margin-bottom:12px;">'
      +'<div style="font-size:18px;font-weight:900;color:#e0f0ff;margin-bottom:4px;">'+d.airline+'</div>'
      +'<div style="display:flex;gap:6px;flex-wrap:wrap;">'
      +(d.cargolicence?'<span style="padding:3px 8px;background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.25);border-radius:20px;font-size:10px;color:#f5a623;">📦 Cargo</span>':'')
      +'<span style="padding:3px 8px;background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.15);border-radius:20px;font-size:10px;color:#00d4ff;">LVL '+d.level+'</span>'
      +'</div></div>'

      // Stats grid
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
      +_profileStat('&#9992;','Flota',d.fleetSize+' samolot'+(d.fleetSize!==1?'ów':''))
      +_profileStat('&#128100;','Pasażerowie',((d.totalPassengers||0)/1000000>=1?((d.totalPassengers||0)/1000000).toFixed(2)+'M':(d.totalPassengers||0).toLocaleString()))
      +_profileStat('&#128736;','Loty',(d.totalFlights||0).toLocaleString())
      +_profileStat('&#128204;','Baza',(d.homeAirport?(d.homeAirport.icao+' — '+d.homeAirport.city):'?'))
      +_profileStat('&#127758;','Kraj',(d.homeAirport?d.homeAirport.country:'?'))
      +_profileStat('&#128197;','Założona',founded)
      +'</div>'

      // Fleet breakdown
      +'<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.07);border-radius:11px;padding:12px;">'
      +'<div style="font-size:9px;color:#5580a0;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Samoloty w flocie</div>'
      +fleetHtml
      +'</div>';

    modalBody.innerHTML = html;
  }).catch(function(e) {
    modalBody.innerHTML = '<div style="padding:20px;text-align:center;color:#e63946;">Błąd: '+e.message+'</div>';
  });
}

function _profileStat(icon, label, value) {
  return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px 12px;">'
    +'<div style="font-size:10px;color:#5580a0;margin-bottom:3px;">'+icon+' '+label+'</div>'
    +'<div style="font-size:12px;font-weight:700;color:#e0f0ff;word-break:break-word;">'+value+'</div>'
    +'</div>';
}
