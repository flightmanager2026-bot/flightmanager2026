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
    totalFlights: G.totalFlights || 0,
    updatedAt: Date.now()
  }).catch(function(){});
}

function renderRanking(body) {
  body.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">'
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
      var myPos = null;

      var html =
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">'
        +'<div style="font-size:9px;color:#5580a0;letter-spacing:3px;">RANKING GLOBALNY</div>'
        +'<button onclick="var b=document.getElementById(\'panel-body\');updateRankingValue();renderRanking(b);" '
        +'style="font-size:10px;padding:4px 10px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);'
        +'border-radius:6px;color:#00d4ff;cursor:pointer;font-family:Arial,sans-serif;">&#8635; Odśwież</button>'
        +'</div>';

      if(snap.empty) {
        html += '<div style="padding:30px;text-align:center;color:#5580a0;">Brak danych w rankingu</div>';
        body.innerHTML = html;
        return;
      }

      var pos = 0;
      snap.forEach(function(doc) {
        pos++;
        var d = doc.data();
        var isMe = doc.id === myUid;
        if(isMe) myPos = pos;

        var medal = pos===1?'🥇':pos===2?'🥈':pos===3?'🥉':'';
        var posColor = pos<=3 ? '#f5a623' : '#5580a0';

        html +=
          '<div style="background:'+(isMe?'rgba(0,212,255,0.08)':'rgba(255,255,255,0.03)')+';'
          +'border:1px solid '+(isMe?'rgba(0,212,255,0.35)':'rgba(255,255,255,0.06)')+';'
          +'border-radius:12px;padding:12px 14px;margin-bottom:6px;display:flex;align-items:center;gap:12px;">'

          // Pozycja
          +'<div style="font-size:'+(pos<=3?'20':'14')+'px;font-weight:900;color:'+posColor+';'
          +'width:32px;text-align:center;flex-shrink:0;">'
          +(medal || '#'+pos)+'</div>'

          // Info
          +'<div style="flex:1;min-width:0;">'
          +'<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">'
          +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+d.airline+'</div>'
          +'<div style="font-size:10px;color:#5580a0;">('+d.code+')</div>'
          +(isMe?'<div style="font-size:9px;font-weight:700;padding:2px 6px;background:rgba(0,212,255,0.15);color:#00d4ff;border-radius:10px;">TY</div>':'')
          +'</div>'
          +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'
          +'LVL '+d.level+' &bull; '+d.fleetSize+' samolot'+(d.fleetSize!==1?'ów':'')+' &bull; '+d.totalFlights+' lotów'
          +'</div></div>'

          // Wartość floty
          +'<div style="text-align:right;flex-shrink:0;">'
          +'<div style="font-size:12px;font-weight:900;color:#00e676;">$'
          +((d.fleetValue||0)/1000000).toFixed(1)+'M</div>'
          +'<div style="font-size:9px;color:#5580a0;letter-spacing:1px;">FLOTA</div>'
          +'</div></div>';
      });

      body.innerHTML = html;
    })
    .catch(function(e) {
      body.innerHTML = '<div style="padding:20px;text-align:center;color:#e63946;">Błąd: '+e.message+'</div>';
    });
}
