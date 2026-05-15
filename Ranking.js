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
  _fbDb.collection('ranking').doc(_currentUser.uid).set({
    uid: _currentUser.uid,
    airline: G.airline ? G.airline.name : 'Unknown',
    code: G.airline ? G.airline.iata : '??',
    fleetValue: value,
    fleetSize: G.fleet.length,
    level: G.level || 1,
    updatedAt: Date.now()
  }).catch(function(){});
}

function renderRanking(body) {
  body.innerHTML = '<div style="padding:20px;text-align:center;color:#5580a0;">Ładowanie rankingu...</div>';

  if(!_fbDb) {
    body.innerHTML = '<div style="padding:20px;text-align:center;color:#5580a0;">Brak połączenia z Firebase</div>';
    return;
  }

  _fbDb.collection('ranking').orderBy('fleetValue','desc').limit(50).get()
    .then(function(snap) {
      if(snap.empty) {
        body.innerHTML = '<div style="padding:20px;text-align:center;color:#5580a0;">Brak danych w rankingu</div>';
        return;
      }

      var myUid = _currentUser ? _currentUser.uid : null;
      var html = '<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin-bottom:12px;">TOP LINIE LOTNICZE</div>';

      var pos = 0;
      snap.forEach(function(doc) {
        pos++;
        var d = doc.data();
        var isMe = doc.id === myUid;
        var medal = pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';

        html += '<div style="background:'+(isMe?'rgba(0,212,255,0.08)':'rgba(255,255,255,0.03)')+';'
          +'border:1px solid '+(isMe?'rgba(0,212,255,0.3)':'rgba(255,255,255,0.07)')+';'
          +'border-radius:12px;padding:12px 14px;margin-bottom:8px;display:flex;align-items:center;gap:12px;">'
          +'<div style="font-size:18px;font-weight:900;color:'+(pos<=3?'#f5a623':'#5580a0')+';width:30px;text-align:center;">'
          +(medal || '#'+pos)+'</div>'
          +'<div style="flex:1;">'
          +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+d.airline+' <span style="font-size:10px;color:#5580a0;">('+d.code+')</span>'+(isMe?' <span style="font-size:10px;color:#00d4ff;">✦ TY</span>':'')+'</div>'
          +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">LVL '+d.level+' &bull; '+d.fleetSize+' samolotów</div>'
          +'</div>'
          +'<div style="text-align:right;">'
          +'<div style="font-size:13px;font-weight:800;color:#00e676;">$'+(d.fleetValue||0).toLocaleString()+'</div>'
          +'<div style="font-size:9px;color:#5580a0;letter-spacing:1px;">WARTOŚĆ FLOTY</div>'
          +'</div></div>';
      });

      body.innerHTML = html;
    })
    .catch(function(e) {
      body.innerHTML = '<div style="padding:20px;text-align:center;color:#e63946;">Błąd ładowania rankingu: '+e.message+'</div>';
    });
}
