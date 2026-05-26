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

function getAirportScore() {
  var ap = G.homeAirport;
  if(!ap || !ap.upgrades) return 0;
  var u = ap.upgrades;
  return ((u.terminal||1)*3) + ((u.hangar||1)*2) + ((u.runways||1)*4) + ((u.shops||0)*1);
}

function updateRankingValue() {
  if(!_currentUser || !_fbDb) return;
  var value = getFleetValue();
  var fleetModels = {};
  G.fleet.forEach(function(ac){ fleetModels[ac.model] = (fleetModels[ac.model]||0)+1; });
  var ap = G.homeAirport;
  var apScore = getAirportScore();
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
    totalRoutes: G.routes ? G.routes.length : 0,
    airportScore: apScore,
    airportUpgrades: ap ? (ap.upgrades || {}) : {},
    airportName: ap ? (ap.city + ' (' + ap.icao + ')') : '?',
    cargolicence: G.cargolicence || false,
    homeAirport: ap ? {icao:ap.icao, city:ap.city, country:ap.country} : null,
    foundedAt: G.foundedAt || 0,
    updatedAt: Date.now()
  }).catch(function(){});
}

var _rankingTab = 'ogolny';

function renderRanking(body) {
  var tabs = [
    {id:'ogolny',    icon:'🏆', label:'Ogólny',     field:'fleetValue',      desc:'wartość floty'},
    {id:'lotnisko',  icon:'🏗',  label:'Lotnisko',   field:'airportScore',    desc:'rozbudowa bazy'},
    {id:'trasy',     icon:'✈',  label:'Trasy',       field:'totalRoutes',     desc:'liczba tras'},
    {id:'pasazerowie',icon:'👥', label:'Pasażerowie', field:'totalPassengers', desc:'przewiezieni'},
  ];

  var tabHtml = '<div style="display:flex;gap:4px;margin-bottom:14px;overflow-x:auto;padding-bottom:2px;">';
  tabs.forEach(function(t){
    var active = t.id === _rankingTab;
    tabHtml += '<button onclick="window._rankingTab=\''+t.id+'\';renderRanking(document.getElementById(\'panel-body\'));" '
      +'style="padding:7px 12px;border:none;border-radius:20px;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;white-space:nowrap;flex-shrink:0;'
      +(active?'background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;box-shadow:0 4px 12px rgba(139,92,246,0.4);':'background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.08);')
      +'">'+t.icon+' '+t.label+'</button>';
  });
  tabHtml += '</div>';

  var activeTab = tabs.filter(function(t){return t.id===_rankingTab;})[0] || tabs[0];

  body.innerHTML = tabHtml
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">'
    + '<div style="font-size:9px;color:#94a3b8;letter-spacing:3px;">'+activeTab.icon+' RANKING — '+activeTab.label.toUpperCase()+'</div>'
    + '<button onclick="updateRankingValue();renderRanking(document.getElementById(\'panel-body\'));" '
    + 'style="font-size:10px;padding:5px 12px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:8px;color:#8b5cf6;cursor:pointer;font-family:Arial,sans-serif;font-weight:700;">↻ Odśwież</button>'
    + '</div>'
    + '<div style="padding:20px;text-align:center;color:#94a3b8;">Ładowanie...</div>';

  if(!_fbDb) {
    body.innerHTML = tabHtml + '<div style="padding:20px;text-align:center;color:#94a3b8;">Brak połączenia</div>';
    return;
  }

  _fbDb.collection('ranking').orderBy(activeTab.field,'desc').limit(100).get()
    .then(function(snap) {
      var myUid = _currentUser ? _currentUser.uid : null;
      var allPlayers = [];
      snap.forEach(function(doc){ allPlayers.push({id:doc.id, data:doc.data()}); });

      function formatValue(d, tab) {
        if(tab==='ogolny')      return '$'+((d.fleetValue||0)/1000000).toFixed(1)+'M';
        if(tab==='lotnisko')    return (d.airportScore||0)+' pkt';
        if(tab==='trasy')       return (d.totalRoutes||0)+' tras';
        if(tab==='pasazerowie') return (d.totalPassengers||0)/1000000>=1 ? ((d.totalPassengers||0)/1000000).toFixed(1)+'M' : (d.totalPassengers||0).toLocaleString();
        return '?';
      }

      function formatSub(d, tab) {
        if(tab==='ogolny')      return d.fleetSize+' sam. • LVL '+d.level;
        if(tab==='lotnisko') {
          var u = d.airportUpgrades || {};
          return 'T:'+( u.terminal||1)+' H:'+(u.hangar||1)+' P:'+(u.runways||1)+' S:'+(u.shops||0);
        }
        if(tab==='trasy')       return (d.totalFlights||0)+' lotów';
        if(tab==='pasazerowie') return (d.totalFlights||0)+' lotów • '+d.fleetSize+' sam.';
        return '';
      }

      function buildRow(entry, pos) {
        var d = entry.data;
        var isMe = entry.id === myUid;
        var medal = pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';
        var posColor = pos===1?'#eab308':pos===2?'#94a3b8':pos===3?'#d97706':'#64748b';
        var accent = (d.color&&d.color!=='#000000') ? d.color : '#8b5cf6';
        var val = formatValue(d, _rankingTab);
        var sub = formatSub(d, _rankingTab);

        return '<div style="background:'+(isMe?'rgba(139,92,246,0.08)':'rgba(255,255,255,0.03)')+';'
          +'border:1px solid '+(isMe?'rgba(139,92,246,0.35)':'rgba(255,255,255,0.06)')+';'
          +'border-left:3px solid '+(isMe?'#8b5cf6':accent)+';'
          +'border-radius:12px;padding:11px 12px;margin-bottom:6px;">'
          +'<div style="display:flex;align-items:center;gap:10px;">'
          +'<div style="font-size:'+(pos<=3?'18':'13')+'px;font-weight:900;color:'+posColor+';width:30px;text-align:center;flex-shrink:0;">'+(medal||'#'+pos)+'</div>'
          +'<div style="flex:1;min-width:0;">'
          +'<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">'
          +'<span style="font-size:13px;font-weight:700;color:#f1f5f9;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+d.airline+'</span>'
          +'<span style="font-size:10px;color:#94a3b8;">('+d.code+')</span>'
          +(isMe?'<span style="font-size:9px;font-weight:700;padding:1px 6px;background:rgba(139,92,246,0.2);color:#8b5cf6;border-radius:10px;">TY</span>':'')
          +(d.cargolicence?'<span style="font-size:9px;padding:1px 6px;background:rgba(249,115,22,0.12);color:#f97316;border-radius:10px;">📦</span>':'')
          +'</div>'
          +'<div style="font-size:10px;color:#94a3b8;margin-top:1px;">'+sub+'</div>'
          +'</div>'
          +'<div style="text-align:right;flex-shrink:0;">'
          +'<div style="font-size:13px;font-weight:900;color:#10b981;">'+val+'</div>'
          +'<div style="font-size:9px;color:#94a3b8;">'+activeTab.desc+'</div>'
          +'</div></div>'
          +'<button data-uid="'+entry.id+'" onclick="showPlayerProfile(this.dataset.uid)" '
          +'style="width:100%;margin-top:8px;padding:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);'
          +'border-radius:8px;color:#94a3b8;font-size:11px;font-weight:600;cursor:pointer;font-family:Arial,sans-serif;">'
          +'Zobacz profil ›</button></div>';
      }

      // Szukaj pozycji gracza
      var myPos = null;
      allPlayers.forEach(function(e,i){ if(e.id===myUid) myPos=i+1; });

      var html = tabHtml
        + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">'
        + '<div style="font-size:9px;color:#94a3b8;letter-spacing:3px;">'+activeTab.icon+' RANKING — '+activeTab.label.toUpperCase()+'</div>'
        + '<button onclick="updateRankingValue();renderRanking(document.getElementById(\'panel-body\'));" '
        + 'style="font-size:10px;padding:5px 12px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:8px;color:#8b5cf6;cursor:pointer;font-family:Arial,sans-serif;font-weight:700;">↻ Odśwież</button>'
        + '</div>';

      // Moja pozycja
      if(myPos) {
        html += '<div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.25);border-radius:12px;padding:10px 14px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;">'
          +'<div style="font-size:12px;color:#94a3b8;">Twoja pozycja</div>'
          +'<div style="font-size:18px;font-weight:900;color:#8b5cf6;">#'+myPos+'</div>'
          +'</div>';
      }

      // Wyszukiwarka
      html += '<div style="margin-bottom:12px;">'
        +'<input id="ranking-search" type="text" placeholder="🔍 Szukaj linii..." '
        +'oninput="window._rankingFilter(this.value)" '
        +'style="width:100%;box-sizing:border-box;padding:9px 14px;background:rgba(255,255,255,0.05);'
        +'border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#f1f5f9;font-size:13px;'
        +'font-family:Arial,sans-serif;outline:none;" /></div>'
        +'<div id="ranking-list">';

      if(snap.empty) {
        html += '<div style="padding:30px;text-align:center;color:#94a3b8;">Brak danych</div>';
      } else {
        allPlayers.forEach(function(entry, i){ html += buildRow(entry, i+1); });
      }
      html += '</div>';

      window._rankingFilter = function(val) {
        var list = document.getElementById('ranking-list');
        if(!list) return;
        var q = val.toLowerCase().trim();
        var out = '';
        allPlayers.forEach(function(entry, i){
          var d = entry.data;
          if(q && (d.airline||'').toLowerCase().indexOf(q)<0 && (d.code||'').toLowerCase().indexOf(q)<0) return;
          out += buildRow(entry, i+1);
        });
        if(!out) out = '<div style="padding:20px;text-align:center;color:#94a3b8;">Brak wyników</div>';
        list.innerHTML = out;
      };

      body.innerHTML = html;
    })
    .catch(function(e) {
      body.innerHTML = tabHtml + '<div style="padding:20px;text-align:center;color:#ef4444;">Błąd: '+e.message+'</div>';
    });
}

function showPlayerProfile(uid) {
  if(!_fbDb) return;
  var modal = document.getElementById('modal');
  var modalBody = document.getElementById('modal-body');
  if(!modal||!modalBody) return;
  modalBody.innerHTML = '<div style="padding:30px;text-align:center;color:#94a3b8;">Ładowanie...</div>';
  modal.style.display = 'flex';

  _fbDb.collection('ranking').doc(uid).get().then(function(doc) {
    if(!doc.exists){ modalBody.innerHTML='<div style="padding:20px;text-align:center;color:#ef4444;">Nie znaleziono</div>'; return; }
    var d = doc.data();
    var isMe = _currentUser && doc.id === _currentUser.uid;
    if(isMe){
      if(!d.homeAirport&&G.homeAirport) d.homeAirport={icao:G.homeAirport.icao,city:G.homeAirport.city,country:G.homeAirport.country};
      if(d.fleetSize===undefined) d.fleetSize=G.fleet.length;
      if(!d.fleetModels){d.fleetModels={};G.fleet.forEach(function(ac){d.fleetModels[ac.model]=(d.fleetModels[ac.model]||0)+1;});}
      if(!d.totalRoutes) d.totalRoutes = G.routes ? G.routes.length : 0;
      if(!d.airportScore) d.airportScore = getAirportScore();
    }
    var accent = (d.color&&d.color!=='#000000')?d.color:'#8b5cf6';
    var founded = d.foundedAt ? new Date(d.foundedAt).toLocaleDateString('pl-PL',{year:'numeric',month:'long',day:'numeric'}) : 'Nieznana';
    var u = d.airportUpgrades || {};

    var fleetHtml = '';
    if(d.fleetModels&&Object.keys(d.fleetModels).length){
      Object.keys(d.fleetModels).forEach(function(model){
        fleetHtml += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">'
          +'<span style="font-size:12px;color:#f1f5f9;">'+model+'</span>'
          +'<span style="font-size:11px;color:#06b6d4;font-weight:700;">×'+d.fleetModels[model]+'</span></div>';
      });
    } else {
      fleetHtml = '<div style="font-size:11px;color:#94a3b8;padding:8px 0;">Brak danych</div>';
    }

    var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
      +'<button onclick="closeModal()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#f1f5f9;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;font-family:Arial,sans-serif;">←</button>'
      +'<div style="flex:1;"><div style="font-size:15px;font-weight:800;color:#f1f5f9;">Profil linii</div></div>'
      +(isMe?'<span style="font-size:9px;font-weight:700;padding:2px 8px;background:rgba(139,92,246,0.2);color:#8b5cf6;border-radius:10px;">TY</span>':'')
      +'</div>'

      // Nazwa linii
      +'<div style="border-radius:14px;padding:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-left:4px solid '+accent+';margin-bottom:12px;">'
      +'<div style="font-size:18px;font-weight:900;color:#f1f5f9;margin-bottom:6px;">'+d.airline+'</div>'
      +'<div style="display:flex;gap:6px;flex-wrap:wrap;">'
      +(d.cargolicence?'<span style="padding:3px 8px;background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);border-radius:20px;font-size:10px;color:#f97316;">📦 Cargo</span>':'')
      +'<span style="padding:3px 8px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.25);border-radius:20px;font-size:10px;color:#8b5cf6;">LVL '+d.level+'</span>'
      +'</div></div>'

      // Statystyki - 4 kategorie rankingowe
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
      +'<div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:12px;text-align:center;">'
      +'<div style="font-size:10px;color:#94a3b8;margin-bottom:4px;">🏆 Wartość floty</div>'
      +'<div style="font-size:16px;font-weight:900;color:#10b981;">$'+((d.fleetValue||0)/1000000).toFixed(1)+'M</div></div>'

      +'<div style="background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);border-radius:12px;padding:12px;text-align:center;">'
      +'<div style="font-size:10px;color:#94a3b8;margin-bottom:4px;">🏗 Lotnisko</div>'
      +'<div style="font-size:16px;font-weight:900;color:#06b6d4;">'+(d.airportScore||0)+' pkt</div></div>'

      +'<div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:12px;text-align:center;">'
      +'<div style="font-size:10px;color:#94a3b8;margin-bottom:4px;">✈ Trasy</div>'
      +'<div style="font-size:16px;font-weight:900;color:#10b981;">'+(d.totalRoutes||0)+'</div></div>'

      +'<div style="background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.2);border-radius:12px;padding:12px;text-align:center;">'
      +'<div style="font-size:10px;color:#94a3b8;margin-bottom:4px;">👥 Pasażerowie</div>'
      +'<div style="font-size:16px;font-weight:900;color:#f97316;">'
      +((d.totalPassengers||0)/1000000>=1?((d.totalPassengers||0)/1000000).toFixed(1)+'M':(d.totalPassengers||0).toLocaleString())
      +'</div></div>'
      +'</div>'

      // Szczegóły
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
      +_pStat('✈','Samoloty',d.fleetSize+' szt.')
      +_pStat('🛫','Loty',(d.totalFlights||0).toLocaleString())
      +_pStat('📍','Baza',(d.homeAirport?d.homeAirport.icao+' — '+d.homeAirport.city:'?'))
      +_pStat('🌍','Kraj',(d.homeAirport?d.homeAirport.country:'?'))
      +_pStat('🏗','Ulepszenia','T:'+(u.terminal||1)+' H:'+(u.hangar||1)+' P:'+(u.runways||1)+' S:'+(u.shops||0))
      +_pStat('📅','Założona',founded)
      +'</div>'

      // Flota
      +'<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;">'
      +'<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;margin-bottom:8px;">SAMOLOTY W FLOCIE</div>'
      +fleetHtml+'</div>';

    modalBody.innerHTML = html;
  }).catch(function(e){
    modalBody.innerHTML='<div style="padding:20px;text-align:center;color:#ef4444;">Błąd: '+e.message+'</div>';
  });
}

function _pStat(icon,label,value){
  return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px 12px;">'
    +'<div style="font-size:10px;color:#94a3b8;margin-bottom:3px;">'+icon+' '+label+'</div>'
    +'<div style="font-size:12px;font-weight:700;color:#f1f5f9;word-break:break-word;">'+value+'</div></div>';
}
