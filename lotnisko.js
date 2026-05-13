/* -- LOTNISKO -- */

function getTerminalCost(level) {
  return 300000 * level;
}

function getTerminalCapacity() {
  var ap = G.homeAirport;
  if(!ap || !ap.upgrades) return 1000;
  return (ap.upgrades.terminal || 1) * 1000;
}

function getPassengersLast2h() {
  var now = Date.now();
  var twoHours = 2 * 60 * 60 * 1000;
  if(!G.departurelog) G.departurelog = [];
  G.departurelog = G.departurelog.filter(function(e){ return now - e.time < twoHours; });
  return G.departurelog.reduce(function(sum, e){ return sum + e.pax; }, 0);
}

function getTerminalResetTime() {
  if(!G.departurelog || !G.departurelog.length) return 0;
  var oldest = G.departurelog[0].time;
  var resetAt = oldest + 2 * 60 * 60 * 1000;
  return Math.max(0, resetAt - Date.now());
}

function canDepart(paxCount) {
  return getPassengersLast2h() + paxCount <= getTerminalCapacity();
}

function logDeparture(paxCount) {
  if(!G.departurelog) G.departurelog = [];
  G.departurelog.push({time: Date.now(), pax: paxCount});
  save();
}

function formatTimer(ms) {
  if(ms <= 0) return '00:00';
  var totalSec = Math.ceil(ms / 1000);
  var h = Math.floor(totalSec / 3600);
  var m = Math.floor((totalSec % 3600) / 60);
  var s = totalSec % 60;
  if(h > 0) return h+'h '+String(m).padStart(2,'0')+'min';
  return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}

function upgradeCardPkt(key, icon, label, desc, costPkt, level, maxLevel) {
  var canUp = level < maxLevel;
  var afford = (G.points||0) >= costPkt;
  var pct = Math.round(level/maxLevel*100);
  return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;margin-bottom:8px;">'    +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">'    +'<div style="width:40px;height:40px;border-radius:10px;background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">'+icon+'</div>'    +'<div style="flex:1;">'    +'<div style="display:flex;align-items:center;gap:8px;">'    +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+label+'</div>'    +'<div style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:rgba(245,166,35,0.15);color:#f5a623;">LVL '+level+'/'+maxLevel+'</div>'    +'</div>'    +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'+desc+'</div>'    +'</div></div>'    +'<div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;margin-bottom:8px;">'    +'<div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#f5a623,#ffd700);border-radius:2px;"></div>'    +'</div>'    +(canUp      ?'<button onclick="upgradeShops()" style="width:100%;padding:9px;background:'+(afford?'linear-gradient(135deg,#b8860b,#f5a623)':'rgba(255,255,255,0.05)')+';border:none;border-radius:9px;color:'+(afford?'#fff':'#5580a0')+';font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:'+(afford?'pointer':'not-allowed')+';">&#11088; Ulepsz za '+costPkt+' PKT (masz '+(G.points||0)+')</button>'      :'<div style="padding:9px;text-align:center;font-size:12px;color:#f5a623;font-weight:700;background:rgba(245,166,35,0.06);border-radius:9px;">&#10003; Maks. poziom (LVL 10)</div>'    )    +'</div>';
}

function upgradeShops() {
  var ap = G.homeAirport;
  if(!ap || !ap.upgrades) return;
  var lvl = ap.upgrades.shops || 0;
  if(lvl >= 10) { showMsg('Maks. poziom sklepow!'); return; }
  var cost = 1000;
  if((G.points||0) < cost) { showMsg('Za malo PKT! Potrzebujesz '+cost+' PKT'); return; }
  G.points = (G.points||0) - cost;
  ap.upgrades.shops = lvl + 1;
  save(); updateHUD();
  showMsg('Sklepy ulepszone do LVL '+(lvl+1)+'! Dochod: '+((lvl+1)*1000)+' zł/h');
  var body = document.getElementById('panel-body');
  if(body) renderLotnisko(body);
}

function renderLotnisko(body) {
  var ap = G.homeAirport;
  if(!ap) { body.innerHTML='<div style="padding:20px;color:#5580a0;text-align:center;">Brak bazy</div>'; return; }
  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};
  if(!ap.income) ap.income = 0;
  var u = ap.upgrades;

  var used = getPassengersLast2h();
  var cap = getTerminalCapacity();
  var pct = Math.min(100, Math.round(used/cap*100));
  var resetMs = getTerminalResetTime();
  var barColor = pct >= 100 ? '#e63946' : pct >= 75 ? '#f5a623' : '#00e676';

  var incomePerMin = (u.terminal*2000)+(u.shops*3000)+(u.parking*1000)+(u.runways*500);

  function upgradeCard(key, icon, label, desc, cost, level, maxLevel) {
    var isUnlimited = maxLevel >= 9999;
    var canUp = isUnlimited || level < maxLevel;
    var afford = G.cash >= cost;
    var lvlDisplay = isUnlimited ? 'LVL '+level : level+'/'+maxLevel;

    var stars = '';
    if(!isUnlimited) {
      for(var i=0;i<maxLevel;i++)
        stars += '<div style="width:8px;height:8px;border-radius:50%;background:'+(i<level?'#f5a623':'rgba(255,255,255,0.1)+')+';flex-shrink:0;"></div>';
    }

    return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">'
      +'<div style="width:40px;height:40px;border-radius:10px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">'+icon+'</div>'
      +'<div style="flex:1;">'
      +'<div style="display:flex;align-items:center;gap:8px;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+label+'</div>'
      +'<div style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:rgba(245,166,35,0.15);color:#f5a623;">'+lvlDisplay+'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'+desc+'</div>'
      +'</div>'
      +(!isUnlimited?'<div style="display:flex;gap:3px;">'+stars+'</div>':'')
      +'</div>'
      +(canUp
        ?'<button onclick="upgradeAirport(\''+key+'\')" style="width:100%;padding:9px;background:'+(afford?'linear-gradient(135deg,#1a56db,#00d4ff)':'rgba(255,255,255,0.05)')+';border:none;border-radius:9px;color:'+(afford?'#fff':'#5580a0')+';font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:'+(afford?'pointer':'not-allowed')+';">Ulepsz za $'+cost.toLocaleString()+'</button>'
        :'<div style="padding:9px;text-align:center;font-size:12px;color:#00e676;font-weight:700;background:rgba(0,230,118,0.06);border-radius:9px;">&#10003; Maks. poziom</div>'
      )
      +'</div>';
  }

  body.innerHTML =
    // Header - info o lotnisku
    '<div style="background:linear-gradient(135deg,rgba(0,212,255,0.08),rgba(26,86,219,0.08));border:1px solid rgba(0,212,255,0.2);border-radius:14px;padding:14px;margin-bottom:12px;">'
    +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">'
    +'<div style="font-size:28px;">&#9992;</div>'
    +'<div>'
    +'<div style="font-size:15px;font-weight:700;color:#e0f0ff;">'+ap.city+'</div>'
    +'<div style="font-size:11px;color:#5580a0;">'+ap.icao+' &bull; '+ap.country+'</div>'
    +'</div>'
    +'<div style="margin-left:auto;text-align:right;">'
    +'<div style="font-size:12px;color:#00e676;font-weight:700;">$'+incomePerMin.toLocaleString()+'/min</div>'
    +'<div style="font-size:10px;color:#5580a0;">dochod pasywny</div>'
    +'</div></div>'
    +'<div style="display:flex;justify-content:space-between;font-size:11px;color:#5580a0;margin-bottom:3px;">'
    +'<span>Zarobiono lacznie:</span><span style="color:#f5a623;font-weight:700;">$'+Math.round(ap.income||0).toLocaleString()+'</span>'
    +'</div>'
    +'</div>'

    // Terminal capacity panel
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;margin-bottom:12px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
    +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">&#127963; Przepustowosc terminala</div>'
    +'<div style="font-size:11px;font-weight:700;color:'+barColor+';">'+used+' / '+cap+' pax</div>'
    +'</div>'
    +'<div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;margin-bottom:8px;">'
    +'<div style="height:100%;width:'+pct+'%;background:'+barColor+';border-radius:3px;transition:width 0.3s;"></div>'
    +'</div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;">'
    +'<div style="font-size:11px;color:#5580a0;">Okno czasowe: 2 godziny</div>'
    +(resetMs>0
      ?'<div style="font-size:11px;font-weight:700;color:#f5a623;" id="terminal-timer">Reset za: '+formatTimer(resetMs)+'</div>'
      :'<div style="font-size:11px;color:#00e676;">&#10003; Wolny limit</div>'
    )
    +'</div>'
    +(pct>=100?'<div style="margin-top:8px;padding:8px;background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.3);border-radius:8px;font-size:11px;color:#e63946;text-align:center;">&#9888; Terminal pelny! Ulepsz aby wyslac wiecej samolotow.</div>':'')
    +'</div>'

    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.07);">ULEPSZENIA</div>'

    + upgradeCard('terminal','&#127963;','Terminal','Przepustowosc: '+(u.terminal*1000)+' pax/2h | Kolejny LVL: '+((u.terminal+1)*1000)+' pax/2h',
        300000*u.terminal, u.terminal, 9999)

    + upgradeCard('runways','&#128747;','Pas startowy','Wiecej pasow = wiecej startow naraz',
        [0,500000,1500000,4000000,10000000][u.runways]||0, u.runways, 5)

    + upgradeCard('hangar','&#128295;','Hangar','Szybsze naprawy i konserwacja samolotow',
        [0,200000,600000,1500000,4000000][u.hangar]||0, u.hangar, 5)

    + upgradeCardPkt('shops','&#128722;','Sklepy lotniskowe',
        'Dochod: '+(u.shops*1000)+' zł/h &bull; Kolejny LVL: '+((u.shops+1)*1000)+' zł/h',
        1000, u.shops, 10)

    + upgradeCard('parking','&#128664;','Parking','Dodatkowy dochod pasywny',
        [0,150000,450000,1200000,3000000][u.parking+1]||0, u.parking, 4);

  // Start timer update if needed
  if(resetMs > 0) {
    clearInterval(window._termTimer);
    window._termTimer = setInterval(function(){
      var el = document.getElementById('terminal-timer');
      if(!el) { clearInterval(window._termTimer); return; }
      var ms = getTerminalResetTime();
      if(ms <= 0) {
        clearInterval(window._termTimer);
        var b = document.getElementById('panel-body');
        if(b && _activeTab==='lotnisko') renderLotnisko(b);
      } else {
        el.textContent = 'Reset za: '+formatTimer(ms);
      }
    }, 1000);
  }
}

function upgradeAirport(key) {
  var ap = G.homeAirport;
  if(!ap) return;
  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};
  if(!ap.income) ap.income = 0;
  var u = ap.upgrades;

  var costs = {
    runways: [0,500000,1500000,4000000,10000000],
    hangar:  [0,200000,600000,1500000,4000000],
    parking: [0,150000,450000,1200000,3000000]
  };
  var maxLevels = {runways:5, hangar:5, shops:4, parking:4};

  var lvl = u[key]||0;

  if(key === 'terminal') {
    var cost = getTerminalCost(lvl);
    if(G.cash < cost) { showMsg('Za malo gotowki! Potrzebujesz $'+cost.toLocaleString()); return; }
    G.cash -= cost;
    u.terminal = lvl + 1;
    save(); updateHUD();
    showMsg('Terminal ulepszony do LVL '+u.terminal+'! Przepustowosc: '+(u.terminal*1000)+' pax/2h');
  } else {
    var maxLvl = maxLevels[key]||5;
    if(lvl >= maxLvl) { showMsg('Maks. poziom!'); return; }
    var cost2 = (costs[key]||[])[lvl+1]||0;
    if(G.cash < cost2) { showMsg('Za malo gotowki!'); return; }
    G.cash -= cost2;
    u[key] = lvl + 1;
    save(); updateHUD();
    showMsg('Ulepszono do LVL '+(lvl+1)+'!');
  }

  var body = document.getElementById('panel-body');
  if(body) renderLotnisko(body);
}

function tickAirportIncome() {
  var ap = G.homeAirport;
  if(!ap || !ap.upgrades) return;
  var u = ap.upgrades;
  // Shops: 1000 zł/h per level = 1000/3600 per second
  var shopsPerSec = (u.shops||0) * 1000 / 3600;
  var otherPerSec = ((u.parking||0)*1000 + (u.runways||0)*500) / 60;
  var perTick = shopsPerSec + otherPerSec;
  G.cash += perTick;
  if(!ap.income) ap.income = 0;
  ap.income += perTick;
}
