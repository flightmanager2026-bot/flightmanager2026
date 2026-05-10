if(typeof showMsg === 'undefined') {
  var _nT;
  function showMsg(msg) {
    var n=document.getElementById('msg'); if(!n) return;
    n.textContent=msg; n.style.transform='translateX(-50%) translateY(0)';
    clearTimeout(_nT); _nT=setTimeout(function(){n.style.transform='translateX(-50%) translateY(-80px)';},3000);
  }
}

function closeModal(){ document.getElementById("modal").style.display="none"; }

/* ---- KATALOG SAMOLOTOW ---- */
var AIRCRAFT_CATALOG = {
  'Airbus': [
    {
      model: 'Airbus A321neo',
      img: 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A321_Neo.png',
      seats: 192, range: 7400, price: 120000000,
      desc: 'Waski kadlub, 192 miejsca, zasieg 7400km',
      engines: 'CFM LEAP-1A / P&W PW1100G',
      level: 1
    },
    {
      model: 'Airbus A380-800',
      img: 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A380-removebg-preview.png',
      seats: 555, range: 15200, price: 450000000,
      desc: 'Dwupokladowy gigant, 555 miejsc, zasieg 15200km',
      engines: 'Rolls-Royce Trent 970',
      level: 5
    }
  ],
  'Boeing': [
    {
      model: 'Boeing 737-800',
      img: 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',
      seats: 162, range: 5765, price: 90000000,
      desc: 'Klasyczny waski kadlub, 162 miejsca',
      engines: 'CFM56-7B',
      level: 1
    },
    {
      model: 'Boeing 787-9',
      img: null,
      seats: 296, range: 14140, price: 280000000,
      desc: 'Dreamliner, 296 miejsc, zasieg 14140km',
      engines: 'GEnx-1B / RR Trent 1000',
      level: 3
    }
  ],
  'ATR': [
    {
      model: 'ATR-72',
      img: null,
      seats: 72, range: 1528, price: 25000000,
      desc: 'Turbosmiglowiec regionalny, 72 miejsca',
      engines: 'PW127M',
      level: 1
    }
  ]
};

function openShop() {
  function row(label,sub,action,dm) {
    return '<div onclick="'+action+'"'+(dm?' data-m="'+dm+'"':'')+' style="display:flex;justify-content:space-between;align-items:center;padding:11px 0;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);">'
      +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+label+'</div>'
      +(sub?'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'+sub+'</div>':'')+'</div>'
      +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  }
  function sec(title,rows) {
    return '<div style="margin-bottom:16px;"><div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:6px;">'+title+'</div>'+rows.join('')+'</div>';
  }
  document.getElementById('modal-body').innerHTML =
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:16px;">SKLEP</div>'
    + sec('KUP SAMOLOT', [
        row('Airbus', 'A320neo, A321neo, A380...', 'openManufacturer(\'Airbus\')'),
        row('Boeing', '737, 787, 777...', 'openManufacturer(\'Boeing\')'),
        row('ATR', 'Turbosmiglowce regionalne', 'openManufacturer(\'ATR\')')
      ])
    + sec('LEASING', [
        row('Pasazerski', 'Nizsza oplata poczatkowa', 'shopMsg(this)', 'Leasing - wkrotce!'),
        row('Cargo', 'Leasing towarowy', 'shopMsg(this)', 'Leasing cargo - wkrotce!')
      ])
    + sec('KUP UZYWANY', [
        row('Pasazerski', 'Tansze, wieksze ryzyko', 'shopMsg(this)', 'Uzywane - wkrotce!'),
        row('Cargo', 'Uzywane towarowe', 'shopMsg(this)', 'Uzywane cargo - wkrotce!')
      ])
    + sec('KUP SLOT', [
        row('Slot na lotnisku', 'Dodaj lotnisko docelowe', 'openSlotShop()')
      ])
    + '<div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:12px;margin-top:4px;">'
    + '<div onclick="shopWatchAd()" style="background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.3);border-radius:12px;padding:13px;cursor:pointer;">'
    + '<div style="font-size:13px;font-weight:700;color:#f5a623;">Obejrzyj reklame</div>'
    + '<div style="font-size:11px;color:#a07040;margin-top:2px;">+50 punktow za reklame</div>'
    + '</div></div>';
  document.getElementById('modal').style.display='flex';
}

function openManufacturer(brand) {
  var aircraft = AIRCRAFT_CATALOG[brand] || [];
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    + '<button onclick="openShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    + '<div style="font-size:15px;font-weight:700;color:#00d4ff;">'+brand+'</div>'
    + '</div>';

  aircraft.forEach(function(ac) {
    var canBuy = G.level >= (ac.level || 1);
    var imgSrc = ac.img || (typeof ICONS !== 'undefined' && ac.imgIcon ? ICONS[ac.imgIcon] : null);
    var img = imgSrc
      ? '<img src="'+imgSrc+'" style="width:100%;max-height:130px;object-fit:contain;background:#000;border-radius:8px;margin-bottom:10px;">'
      : '<div style="width:100%;height:80px;background:#0d1b2a;border-radius:8px;margin-bottom:10px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#5580a0;">Brak grafiki</div>';

    html += '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:10px;">'
      + img
      + '<div style="font-size:14px;font-weight:700;color:#e0f0ff;margin-bottom:4px;">'+ac.model+'</div>'
      + '<div style="font-size:11px;color:#5580a0;margin-bottom:8px;">'+ac.desc+'</div>'
      + '<div style="display:flex;justify-content:space-between;font-size:11px;color:#5580a0;margin-bottom:4px;"><span>Silniki:</span><span style="color:#a0b8cc;">'+ac.engines+'</span></div>'
      + '<div style="display:flex;justify-content:space-between;font-size:11px;color:#5580a0;margin-bottom:4px;"><span>Miejsca:</span><span style="color:#a0b8cc;">'+ac.seats+'</span></div>'
      + '<div style="display:flex;justify-content:space-between;font-size:11px;color:#5580a0;margin-bottom:12px;"><span>Zasieg:</span><span style="color:#a0b8cc;">'+ac.range+' km</span></div>'
      + (canBuy
          ? '<button onclick="buyAircraft(\''+ac.model+'\')" style="width:100%;padding:10px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Kup za $'+ac.price.toLocaleString()+'</button>'
          : '<div style="width:100%;padding:10px;background:rgba(255,255,255,0.04);border-radius:8px;text-align:center;font-size:12px;color:#5580a0;">Wymagany poziom '+ac.level+'</div>'
        )
      + '</div>';
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function buyAircraft(model) {
  var ac = null;
  Object.keys(AIRCRAFT_CATALOG).forEach(function(brand) {
    AIRCRAFT_CATALOG[brand].forEach(function(a) { if(a.model===model) ac=a; });
  });
  if(!ac) return;
  if(G.cash < ac.price){ showMsg('Za malo gotowki!'); return; }
  if(G.level < (ac.level||1)){ showMsg('Za niski poziom!'); return; }
  G.cash -= ac.price;
  G.fleet.push({id:'ac_'+Date.now(), model:ac.model, reg:'VS-'+(100+G.fleet.length), seats:ac.seats, status:'ground', routeId:null});
  save(); updateHUD();
  closeModal();
  showMsg('Kupiono '+model+'!');
}

function shopMsg(el) { closeModal(); showMsg(el&&el.dataset&&el.dataset.m?el.dataset.m:'Wkrotce!'); }
function shopWatchAd() {
  closeModal();
  showRewardedAd(function() {
    G.points += 50;
    G.cash += 5000;
    save();
    updateHUD();
    showMsg('+50 PKT i +$5,000 za reklame!');
  });
}

function showRewardedAd(callback) {
  window._adCallback = callback;
  var container = document.getElementById('ad-container');
  if(!container) { 
    // Brak kontenera - symulacja
    showMsg('Reklama niedostepna, sprobuj pozniej');
    return;
  }

  // Najpierw pokaz kontener
  container.style.display = 'flex';

  // Dopiero teraz zaladuj reklame (kontener ma wymiary)
  var wrapper = document.getElementById('ad-slot-wrapper');
  if(wrapper) {
    wrapper.innerHTML = '<ins class="adsbygoogle"'
      +' style="display:block;width:300px;height:200px;"'
      +' data-ad-client="ca-pub-3572597201441656"'
      +' data-ad-slot="7126799672"'
      +' data-ad-format="fixed"></ins>';
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch(e) {}
  }

  var timeLeft = 5;
  var timerEl = document.getElementById('ad-timer-txt');
  var closeBtn = document.getElementById('ad-close-btn');
  if(timerEl) timerEl.textContent = 'Zamknij za ' + timeLeft + 's';
  if(closeBtn) {
    closeBtn.disabled = true;
    closeBtn.style.background = '#333';
    closeBtn.style.color = '#888';
    closeBtn.style.cursor = 'not-allowed';
  }

  var timer = setInterval(function() {
    timeLeft--;
    if(timerEl) timerEl.textContent = timeLeft > 0 ? 'Zamknij za '+timeLeft+'s' : 'Mozesz zamknac!';
    if(timeLeft <= 0) {
      clearInterval(timer);
      if(closeBtn) {
        closeBtn.disabled = false;
        closeBtn.style.background = 'linear-gradient(135deg,#1a56db,#00d4ff)';
        closeBtn.style.color = '#fff';
        closeBtn.style.cursor = 'pointer';
      }
    }
  }, 1000);
}

function closeAd() {
  var container = document.getElementById('ad-container');
  if(container) container.style.display = 'none';
  if(window._adCallback) { window._adCallback(); window._adCallback = null; }
}

function openSlotShop() {
  var slots = [];
  var lvl = G.level;
  ADB.forEach(function(ap) {
    if(G.slots.indexOf(ap.icao)>=0 || (G.homeAirport&&G.homeAirport.icao===ap.icao)) return;
    if(lvl<3 && ap.country!=='Polska') return;
    if(lvl<5 && ap.country!=='Polska' && ap.country!=='Niemcy') return;
    slots.push(ap);
  });
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">KUP SLOT</div></div>';
  if(!slots.length) {
    html += '<div style="padding:20px;text-align:center;color:#5580a0;">Brak dostepnych lotnisk</div>';
  } else {
    slots.slice(0,20).forEach(function(ap) {
      var cost = ap.country==='Polska'?50000:ap.country==='Niemcy'?80000:150000;
      html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">'
        +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+ap.icao+' - '+ap.city+'</div>'
        +'<div style="font-size:11px;color:#5580a0;">'+ap.country+'</div></div>'
        +'<button onclick="buySlot(\''+ap.icao+'\','+cost+')" style="padding:6px 14px;background:#1a56db;border:none;border-radius:6px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">$'+cost.toLocaleString()+'</button>'
        +'</div>';
    });
  }
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function buySlot(icao, cost) {
  if(G.cash<cost){ showMsg('Za malo gotowki!'); return; }
  G.cash-=cost; G.slots.push(icao);
  var ap=ADB.find(function(a){return a.icao===icao;});
  if(ap) G.airports.push({id:'AP_'+icao,name:ap.city,icao:icao,city:ap.city,country:ap.country,lat:ap.lat,lng:ap.lng,isHome:false,level:1});
  save(); updateHUD(); renderMarkers();
  closeModal(); showMsg('Kupiono slot '+icao+'!');
}

function resetGame() { localStorage.removeItem('sb_v3'); location.reload(); }
function saveSettings() { closeModal(); showMsg('Zapisano!'); }
