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
    color: G.airline ? (G.airline.color||'#8b5cf6') : '#8b5cf6',
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
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">'
    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:3px;">RANKING GLOBALNY</div>'
    +'<button onclick="var b=document.getElementById(\'panel-body\');updateRankingValue();renderRanking(b);" '
    +'style="font-size:10px;padding:5px 12px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);'
    +'border-radius:8px;color:#8b5cf6;cursor:pointer;font-family:Arial,sans-serif;font-weight:700;">↻ Odśwież</button>'
    +'</div>'
    +'<div style="padding:30px;text-align:center;color:#94a3b8;">Ładowanie...</div>';

  if(!_fbDb) {
    body.innerHTML = '<div style="padding:20px;text-align:center;color:#94a3b8;">Brak połączenia</div>';
    return;
  }

  _fbDb.collection('ranking').orderBy('fleetValue','desc').limit(100).get()
    .then(function(snap) {
      var myUid = _currentUser ? _currentUser.uid : null;
      var allPlayers = [];
      snap.forEach(function(doc) { allPlayers.push({id:doc.id,data:doc.data()}); });

      function buildRow(entry, pos) {
        var d = entry.data;
        var isMe = entry.id === myUid;
        var medal = pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';
        var posColor = pos===1?'#eab308':pos===2?'#94a3b8':pos===3?'#d97706':'#64748b';
        var accent = (d.color && d.color!=='#000000') ? d.color : '#8b5cf6';
        return '<div style="background:'+(isMe?'rgba(139,92,246,0.08)':'rgba(255,255,255,0.03)')+';'
          +'border:1px solid '+(isMe?'rgba(139,92,246,0.35)':'rgba(255,255,255,0.06)')+';'
          +'border-left:3px solid '+(isMe?'#8b5cf6':accent)+';'
          +'border-radius:12px;padding:11px 12px;margin-bottom:6px;">'
          +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">'
          +'<div style="font-size:'+(pos<=3?'18':'13')+'px;font-weight:900;color:'+posColor+';width:30px;text-align:center;flex-shrink:0;">'+(medal||'#'+pos)+'</div>'
          +'<div style="flex:1;min-width:0;">'
          +'<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">'
          +'<span style="font-size:13px;font-weight:700;color:#f1f5f9;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+d.airline+'</span>'
          +'<span style="font-size:10px;color:#94a3b8;">('+d.code+')</span>'
          +(isMe?'<span style="font-size:9px;font-weight:700;padding:1px 6px;background:rgba(139,92,246,0.2);color:#8b5cf6;border-radius:10px;">TY</span>':'')
          +(d.cargolicence?'<span style="font-size:9px;padding:1px 6px;background:rgba(249,115,22,0.12);color:#f97316;border-radius:10px;">📦 Cargo</span>':'')
          +'</div>'
          +'<div style="font-size:10px;color:#94a3b8;margin-top:1px;">LVL '+d.level+' • '+(d.homeAirport?d.homeAirport.icao+' '+d.homeAirport.city:'?')+'</div>'
          +'</div>'
          +'<div style="text-align:right;flex-shrink:0;">'
          +'<div style="font-size:12px;font-weight:900;color:#10b981;">$'+((d.fleetValue||0)/1000000).toFixed(1)+'M</div>'
          +'<div style="font-size:9px;color:#94a3b8;">wartość floty</div>'
          +'</div></div>'
          +'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:7px;">'
          +'<span style="padding:2px 7px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:9px;color:#06b6d4;">✈ '+d.fleetSize+' sam.</span>'
          +'<span style="padding:2px 7px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:9px;color:#06b6d4;">🛫 '+(d.totalFlights||0)+' lotów</span>'
          +'<span style="padding:2px 7px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:9px;color:#06b6d4;">👤 '+((d.totalPassengers||0)/1000000>=1?((d.totalPassengers||0)/1000000).toFixed(1)+'M':(d.totalPassengers||0).toLocaleString())+' pas.</span>'
          +'</div>'
          +'<button data-uid="'+entry.id+'" onclick="showPlayerProfile(this.dataset.uid)" '
          +'style="width:100%;padding:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);'
          +'border-radius:8px;color:#94a3b8;font-size:11px;font-weight:600;cursor:pointer;font-family:Arial,sans-serif;">'
          +'Zobacz profil ›</button></div>';
      }

      var html =
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">'
        +'<div style="font-size:9px;color:#94a3b8;letter-spacing:3px;">RANKING GLOBALNY</div>'
        +'<button onclick="var b=document.getElementById(\'panel-body\');updateRankingValue();renderRanking(b);" '
        +'style="font-size:10px;padding:5px 12px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);'
        +'border-radius:8px;color:#8b5cf6;cursor:pointer;font-family:Arial,sans-serif;font-weight:700;">↻ Odśwież</button>'
        +'</div>'
        +'<div style="position:relative;margin-bottom:12px;">'
        +'<input id="ranking-search" type="text" placeholder="🔍 Szukaj linii..." '
        +'oninput="window._rankingFilter(this.value)" '
        +'style="width:100%;box-sizing:border-box;padding:9px 14px;background:rgba(255,255,255,0.05);'
        +'border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#f1f5f9;font-size:13px;'
        +'font-family:Arial,sans-serif;outline:none;" />'
        +'</div>'
        +'<div id="ranking-list">';

      if(snap.empty) {
        html += '<div style="padding:30px;text-align:center;color:#94a3b8;">Brak danych</div>';
      } else {
        var pos = 0;
        allPlayers.forEach(function(entry){ pos++; html += buildRow(entry, pos); });
      }
      html += '</div>';

      window._rankingFilter = function(val) {
        var list = document.getElementById('ranking-list');
        if(!list) return;
        var q = val.toLowerCase().trim();
        var pos = 0, out = '';
        allPlayers.forEach(function(entry){
          pos++;
          var d = entry.data;
          if(q && (d.airline||'').toLowerCase().indexOf(q)<0 && (d.code||'').toLowerCase().indexOf(q)<0) return;
          out += buildRow(entry, pos);
        });
        if(!out) out = '<div style="padding:20px;text-align:center;color:#94a3b8;">Brak wyników</div>';
        list.innerHTML = out;
      };

      body.innerHTML = html;
    })
    .catch(function(e) {
      body.innerHTML = '<div style="padding:20px;text-align:center;color:#ef4444;">Błąd: '+e.message+'</div>';
    });
}

function showPlayerProfile(uid) {
  if(!_fbDb) return;
  var modal = document.getElementById('modal');
  var modalBody = document.getElementById('modal-body');
  if(!modal || !modalBody) return;
  modalBody.innerHTML = '<div style="padding:30px;text-align:center;color:#94a3b8;">Ładowanie...</div>';
  modal.style.display = 'flex';

  _fbDb.collection('ranking').doc(uid).get().then(function(doc) {
    if(!doc.exists){ modalBody.innerHTML='<div style="padding:20px;text-align:center;color:#ef4444;">Nie znaleziono</div>'; return; }
    var d = doc.data();
    var isMe = _currentUser && doc.id === _currentUser.uid;
    if(isMe){
      if(!d.homeAirport && G.homeAirport) d.homeAirport={icao:G.homeAirport.icao,city:G.homeAirport.city,country:G.homeAirport.country};
      if(d.fleetSize===undefined) d.fleetSize=G.fleet.length;
      if(!d.fleetModels){d.fleetModels={};G.fleet.forEach(function(ac){d.fleetModels[ac.model]=(d.fleetModels[ac.model]||0)+1;});}
    }
    var accent = (d.color&&d.color!=='#000000')?d.color:'#8b5cf6';
    var founded = d.foundedAt ? new Date(d.foundedAt).toLocaleDateString('pl-PL',{year:'numeric',month:'long',day:'numeric'}) : 'Nieznana';
    var fleetHtml='';
    if(d.fleetModels&&Object.keys(d.fleetModels).length){
      Object.keys(d.fleetModels).forEach(function(model){
        fleetHtml+='<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">'
          +'<span style="font-size:12px;color:#f1f5f9;">'+model+'</span>'
          +'<span style="font-size:11px;color:#06b6d4;font-weight:700;">×'+d.fleetModels[model]+'</span></div>';
      });
    }
    var html='<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
      +'<button onclick="closeModal()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#f1f5f9;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;font-family:Arial,sans-serif;">←</button>'
      +'<div style="flex:1;"><div style="font-size:15px;font-weight:800;color:#f1f5f9;">Profil linii</div></div>'
      +(isMe?'<span style="font-size:9px;font-weight:700;padding:2px 8px;background:rgba(139,92,246,0.2);color:#8b5cf6;border-radius:10px;">TY</span>':'')
      +'</div>'
      +'<div style="border-radius:14px;padding:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-left:4px solid '+accent+';margin-bottom:12px;">'
      +'<div style="font-size:18px;font-weight:900;color:#f1f5f9;margin-bottom:6px;">'+d.airline+'</div>'
      +'<div style="display:flex;gap:6px;flex-wrap:wrap;">'
      +(d.cargolicence?'<span style="padding:3px 8px;background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);border-radius:20px;font-size:10px;color:#f97316;">📦 Cargo</span>':'')
      +'<span style="padding:3px 8px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.25);border-radius:20px;font-size:10px;color:#8b5cf6;">LVL '+d.level+'</span>'
      +'</div></div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
      +_pStat('✈','Flota',d.fleetSize+' samolot'+(d.fleetSize!==1?'ów':''))
      +_pStat('🛫','Loty',(d.totalFlights||0).toLocaleString())
      +_pStat('👤','Pasażerowie',((d.totalPassengers||0)/1000000>=1?((d.totalPassengers||0)/1000000).toFixed(2)+'M':(d.totalPassengers||0).toLocaleString()))
      +_pStat('🌍','Kraj',(d.homeAirport?d.homeAirport.country:'?'))
      +_pStat('📍','Baza',(d.homeAirport?d.homeAirport.icao+' — '+d.homeAirport.city:'?'))
      +_pStat('📅','Założona',founded)
      +'</div>'
      +'<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;">'
      +'<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;margin-bottom:8px;">FLOTA</div>'
      +fleetHtml+'</div>';
    modalBody.innerHTML=html;
  }).catch(function(e){modalBody.innerHTML='<div style="padding:20px;text-align:center;color:#ef4444;">Błąd: '+e.message+'</div>';});
}

function _pStat(icon,label,value){
  return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px 12px;">'
    +'<div style="font-size:10px;color:#94a3b8;margin-bottom:3px;">'+icon+' '+label+'</div>'
    +'<div style="font-size:12px;font-weight:700;color:#f1f5f9;word-break:break-word;">'+value+'</div></div>';
}
