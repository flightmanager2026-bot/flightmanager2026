/* -- LOTNISKO -- */

function renderLotnisko(body) {
  var ap = G.homeAirport;
  if(!ap) { body.innerHTML='<div style="padding:20px;color:#5580a0;text-align:center;">Brak bazy</div>'; return; }

  // Init airport upgrades if not present
  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};
  if(!ap.income) ap.income = 0;

  var u = ap.upgrades;

  function upgradeRow(key, label, icon, desc, cost, level, maxLevel) {
    var canUp = level < maxLevel;
    var afford = G.cash >= cost;
    var stars = '';
    for(var i=0;i<maxLevel;i++) stars += '<span style="color:'+(i<level?'#f5a623':'#2a3a4a')+';">&#9733;</span>';
    return '<div class="card" style="margin-bottom:8px;">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">'
      +'<div>'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+icon+' '+label+'</div>'
      +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'+desc+'</div>'
      +'</div>'
      +'<div style="text-align:right;">'
      +'<div style="font-size:12px;color:#f5a623;margin-bottom:4px;">'+stars+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+level+'/'+maxLevel+'</div>'
      +'</div>'
      +'</div>'
      +(canUp
        ? '<button onclick="upgradeAirport(&quot;'+key+'&quot;)" style="width:100%;padding:8px;background:'+(afford?'linear-gradient(135deg,#1a56db,#00d4ff)':'rgba(255,255,255,0.05)')+';border:none;border-radius:8px;color:'+(afford?'#fff':'#5580a0')+';font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:'+(afford?'pointer':'not-allowed')+';">Ulepsz za $'+cost.toLocaleString()+'</button>'
        : '<div style="padding:8px;text-align:center;font-size:12px;color:#00e676;font-weight:700;">MAKS. POZIOM</div>'
      )
      +'</div>';
  }

  var runwayCost = [0, 500000, 1500000, 4000000, 10000000];
  var termCost   = [0, 300000, 800000, 2000000, 5000000];
  var hangarCost = [0, 200000, 600000, 1500000, 4000000];
  var shopsCost  = [0, 400000, 1200000, 3000000, 8000000];
  var parkCost   = [0, 150000, 450000, 1200000, 3000000];

  // Income per minute calculation
  var incomePerMin = (u.terminal * 2000)
    + (u.shops * 3000)
    + (u.parking * 1000)
    + (u.runways * 500);

  // Queue info
  var waiting = G.routes ? G.routes.filter(function(r){return !r.active && !r.flying;}).length : 0;
  var rwyInfo = u.runways === 1
    ? '1 samolot co 5 sek'
    : u.runways + ' samoloty co 5 sek';

  body.innerHTML =
    '<div style="background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.15);border-radius:12px;padding:12px;margin-bottom:14px;">'
    +'<div style="font-size:13px;font-weight:700;color:#00d4ff;margin-bottom:6px;">&#127968; '+ap.city+' ('+ap.icao+')</div>'
    +'<div style="display:flex;justify-content:space-between;font-size:11px;color:#5580a0;margin-bottom:4px;"><span>Pasy startowe:</span><span style="color:#e0f0ff;font-weight:700;">'+u.runways+' / 5</span></div>'
    +'<div style="display:flex;justify-content:space-between;font-size:11px;color:#5580a0;margin-bottom:4px;"><span>Przepustowosc:</span><span style="color:#e0f0ff;">'+rwyInfo+'</span></div>'
    +'<div style="display:flex;justify-content:space-between;font-size:11px;color:#5580a0;margin-bottom:4px;"><span>Dochod lotniska:</span><span style="color:#00e676;font-weight:700;">$'+incomePerMin.toLocaleString()+'/min</span></div>'
    +'<div style="display:flex;justify-content:space-between;font-size:11px;color:#5580a0;"><span>Lacznie zarobiono:</span><span style="color:#f5a623;">$'+Math.round(ap.income||0).toLocaleString()+'</span></div>'
    +'</div>'

    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.07);">ULEPSZENIA</div>'

    + upgradeRow('runways','Pas startowy','&#9992;',
        'Wiecej pasow = wiecej startow naraz (max 5)',
        runwayCost[u.runways]||0, u.runways, 5)

    + upgradeRow('terminal','Terminal','&#127963;',
        'Wiekszy terminal = wiecej pasazerow = wieksze przychody',
        termCost[u.terminal]||0, u.terminal, 5)

    + upgradeRow('hangar','Hangar','&#128295;',
        'Lepszy hangar = szybsze naprawy i konserwacja',
        hangarCost[u.hangar]||0, u.hangar, 5)

    + upgradeRow('shops','Sklepy lotniskowe','&#128722;',
        'Pasywny dochod z lotniska',
        shopsCost[u.shops+1]||0, u.shops, 4)

    + upgradeRow('parking','Parking','&#128664;',
        'Dodatkowy dochod pasywny',
        parkCost[u.parking+1]||0, u.parking, 4);
}

function upgradeAirport(key) {
  var ap = G.homeAirport;
  if(!ap) return;
  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};
  if(!ap.income) ap.income = 0;

  var costs = {
    runways:  [0, 500000, 1500000, 4000000, 10000000],
    terminal: [0, 300000, 800000,  2000000, 5000000],
    hangar:   [0, 200000, 600000,  1500000, 4000000],
    shops:    [0, 400000, 1200000, 3000000, 8000000],
    parking:  [0, 150000, 450000,  1200000, 3000000]
  };
  var maxLevels = {runways:5, terminal:5, hangar:5, shops:4, parking:4};
  var cur = ap.upgrades[key] || 0;
  var max = maxLevels[key] || 5;
  if(cur >= max) { showMsg('Maks. poziom!'); return; }
  var cost = (costs[key] || [])[cur] || 0;
  if(G.cash < cost) { showMsg('Za malo gotowki!'); return; }
  G.cash -= cost;
  ap.upgrades[key] = cur + 1;
  save(); updateHUD();
  showMsg('Ulepszono: '+ key + ' do poziomu ' + ap.upgrades[key] + '!');
  // Re-render panel
  var body = document.getElementById('panel-body');
  if(body) renderLotnisko(body);
}

/* Airport passive income tick - called from startTick */
function tickAirportIncome() {
  var ap = G.homeAirport;
  if(!ap || !ap.upgrades) return;
  var u = ap.upgrades;
  var perMin = (u.terminal * 2000) + (u.shops * 3000) + (u.parking * 1000) + (u.runways * 500);
  var perTick = perMin / 60; // called every second
  G.cash += perTick;
  if(!ap.income) ap.income = 0;
  ap.income += perTick;
}
