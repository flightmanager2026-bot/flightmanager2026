function openManufacturerByName(el){ openManufacturer(el.getAttribute("data-brand")); }

if(typeof showMsg === 'undefined') {
  var _nT;
  function showMsg(msg) {
    var n=document.getElementById('msg'); if(!n) return;
    n.textContent=msg; n.style.transform='translateX(-50%) translateY(0)';
    clearTimeout(_nT); _nT=setTimeout(function(){n.style.transform='translateX(-50%) translateY(-80px)';},3000);
  }
}

function closeModal(){ document.getElementById("modal").style.display="none"; }

// AIRCRAFT_CATALOG loaded from aircraft.js

function openShop() {
  function sec(title, rows) {
    return '<div style="margin-bottom:16px;"><div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:6px;">'+title+'</div>'+rows+'</div>';
  }
  function row(label, sub, fn) {
    return '<div onclick="'+fn+'" style="display:flex;justify-content:space-between;align-items:center;padding:11px 0;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);">'
      +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+label+'</div>'
      +(sub?'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'+sub+'</div>':'')+'</div>'
      +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  }
  document.getElementById('modal-body').innerHTML =
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:16px;">SKLEP</div>'
    +sec('KUP SAMOLOT',
      row('Nowy','Airbus, Boeing, Embraer...','openNewAircraftShop()')
      +row('Uzywany','Tansze, wieksze ryzyko','showMsg("Uzywane - wkrotce!")')
      +row('Leasing','Nizsza oplata poczatkowa','showMsg("Leasing - wkrotce!")')
    )
    +sec('KUP SLOT',row('Slot na lotnisku','Dodaj lotnisko docelowe','openSlotShop()'))
    +sec('PREMIUM',row('Doladuj konto','Zakup waluty premium','showMsg("Premium - wkrotce!")'))
    +'<div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:12px;margin-top:4px;">'
    +'<div onclick="shopWatchAd()" style="background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.3);border-radius:12px;padding:13px;cursor:pointer;">'
    +'<div style="font-size:13px;font-weight:700;color:#f5a623;">&#128253; Obejrzyj reklame</div>'
    +'<div style="font-size:11px;color:#a07040;margin-top:2px;">+50 punktow i +$5,000</div>'
    +'</div></div>';
  document.getElementById('modal').style.display='flex';
}

function openNewAircraftShop() {
  var brands = Object.keys(AIRCRAFT_CATALOG);
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Wybierz producenta</div></div>';
  var BRAND_LOGOS = {
    'Boeing':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/logo.boeing.png'
  };
  brands.forEach(function(brand) {
    var planes = AIRCRAFT_CATALOG[brand];
    var imgSrc = BRAND_LOGOS[brand] || null;
    if(!imgSrc) planes.forEach(function(p){ if(!imgSrc && p.img) imgSrc = p.img; });
    html += '<div data-brand="'+brand+'" onclick="openManufacturerByName(this)" '
      +'style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);margin-bottom:6px;cursor:pointer;">'
      +(imgSrc?'<img src="'+imgSrc+'" style="width:70px;height:38px;object-fit:contain;background:#000;border-radius:6px;flex-shrink:0;">':'<div style="width:70px;height:38px;background:#0d1b2a;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px;">&#9992;</div>')
      +'<div style="flex:1;"><div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+brand+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+planes.length+' model'+(planes.length>1?'i':'')+'</div></div>'
      +'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  });
  document.getElementById('modal-body').innerHTML = html;
}

function openManufacturer(brand) {
  var aircraft = AIRCRAFT_CATALOG[brand] || [];
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openNewAircraftShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">'+brand+'</div></div>';
  aircraft.forEach(function(ac) {
    var canBuy = G.level >= (ac.level||1);
    var img = ac.img
      ? '<img src="'+ac.img+'" style="width:100%;max-height:110px;object-fit:contain;background:#000;border-radius:8px;margin-bottom:10px;">'
      : '';
    html += '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;margin-bottom:8px;">'
      +img
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;margin-bottom:3px;">'+ac.model+'</div>'
      +'<div style="font-size:10px;color:#5580a0;margin-bottom:6px;">'+ac.desc+'</div>'
      +'<div style="display:flex;gap:12px;font-size:10px;color:#5580a0;margin-bottom:8px;">'
      +'<span>&#128cadeiras; '+ac.seats+' miejsc</span>'
      +'<span>&#9992; '+ac.range+' km</span>'
      +'<span>'+ac.engines+'</span></div>'
      +(canBuy
        ? '<button data-model="'+ac.model+'" onclick="buyAircraftByEl(this)" style="width:100%;padding:9px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Kup za $'+ac.price.toLocaleString()+'</button>'
        : '<div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:8px;text-align:center;font-size:11px;color:#5580a0;">Wymagany poziom '+ac.level+'</div>'
      )
      +'</div>';
  });
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function buyAircraftByEl(el) { buyAircraft(el.getAttribute('data-model')); }

function buyAircraft(model) {
  var ac = null;
  Object.keys(AIRCRAFT_CATALOG).forEach(function(brand) {
    AIRCRAFT_CATALOG[brand].forEach(function(a){ if(a.model===model) ac=a; });
  });
  if(!ac) return;
  if(G.cash < ac.price){ showMsg('Za malo gotowki!'); return; }
  if(G.level < (ac.level||1)){ showMsg('Za niski poziom!'); return; }
  // Sprawdz pojemnosc hangaru
  var hangarCap = typeof getHangarCapacity==='function' ? getHangarCapacity() : 10;
  if(G.fleet.length >= hangarCap){ showMsg('Hangar pelny! ('+G.fleet.length+'/'+hangarCap+') Ulepsz hangar w Lotnisku!'); return; }
  G.cash -= ac.price;
  // Znajdz producenta
  var acBrand = 'Unknown';
  Object.keys(AIRCRAFT_CATALOG).forEach(function(b){
    AIRCRAFT_CATALOG[b].forEach(function(a){ if(a.model===model) acBrand=b; });
  });
  var reg = G.airline.iata + '-' + String(G.fleet.length+1).padStart(3,'0');
  G.fleet.push({
    id:'ac_'+Date.now(), model:ac.model, brand:acBrand,
    reg:reg, seats:ac.seats, range:ac.range||5000,
    status:'ground', routeId:null,
    config:{eco:ac.seats, biz:0, total:ac.seats}
  });
  save(); updateHUD(); closeModal();
  showMsg('Kupiono '+model+'!');
}

function shopWatchAd() {
  closeModal();
  showRewardedAd(function() {
    G.points+=50; G.cash+=5000; save(); updateHUD();
    showMsg('+50 PKT i +$5,000 za reklame!');
  });
}

function showRewardedAd(callback) {
  window._adCallback = callback;
  var container = document.getElementById('ad-container');
  if(!container){ showMsg('Reklama niedostepna'); return; }
  container.style.display='flex';
  var wrapper = document.getElementById('ad-slot-wrapper');
  if(wrapper) {
    wrapper.innerHTML='<ins class="adsbygoogle" style="display:block;width:300px;height:200px;" data-ad-client="ca-pub-3572597201441656" data-ad-slot="7126799672" data-ad-format="fixed"></ins>';
    try{ (window.adsbygoogle=window.adsbygoogle||[]).push({}); }catch(e){}
  }
  var t=5,te=document.getElementById('ad-timer-txt'),cb=document.getElementById('ad-close-btn');
  if(te) te.textContent='Zamknij za '+t+'s';
  if(cb){ cb.disabled=true; cb.style.background='#333'; cb.style.color='#888'; cb.style.cursor='not-allowed'; }
  var ti=setInterval(function(){
    t--;
    if(te) te.textContent=t>0?'Zamknij za '+t+'s':'Mozesz zamknac!';
    if(t<=0){ clearInterval(ti); if(cb){ cb.disabled=false; cb.style.background='linear-gradient(135deg,#1a56db,#00d4ff)'; cb.style.color='#fff'; cb.style.cursor='pointer'; } }
  },1000);
}

function closeAd() {
  var c=document.getElementById('ad-container'); if(c) c.style.display='none';
  if(window._adCallback){ window._adCallback(); window._adCallback=null; }
}

/* Kraje i poziomy odblokowania */
/* System ekspansji geograficznej */
function getUnlockedCountries() {
  if(!G.homeAirport) return [];
  var homeCountry = G.homeAirport.country || 'Polska';
  var lvl = G.level || 1;
  var unlocked = [homeCountry];
  
  // Get neighbors from WORLD_CITIES
  function addNeighbors(country, depth) {
    if(depth <= 0) return;
    if(!WORLD_CITIES || !WORLD_CITIES[country]) return;
    var neighbors = WORLD_CITIES[country].neighbors || [];
    neighbors.forEach(function(n) {
      if(unlocked.indexOf(n) < 0) {
        unlocked.push(n);
        if(depth > 1) addNeighbors(n, depth-1);
      }
    });
  }
  
  // Each level unlocks one more ring of neighbors
  // LVL 1: home country only
  // LVL 2: direct neighbors
  // LVL 3: neighbors of neighbors
  // etc.
  if(lvl >= 2) addNeighbors(homeCountry, 1);
  if(lvl >= 4) addNeighbors(homeCountry, 2);
  if(lvl >= 6) addNeighbors(homeCountry, 3);
  if(lvl >= 8) addNeighbors(homeCountry, 4);
  if(lvl >= 12) {
    // All countries with airports
    if(WORLD_CITIES) Object.keys(WORLD_CITIES).forEach(function(c){ if(unlocked.indexOf(c)<0) unlocked.push(c); });
  }
  
  return unlocked;
}

function getSlotCost(country) {
  var homeCountry = G.homeAirport ? (G.homeAirport.country || 'Polska') : 'Polska';
  if(country === homeCountry) return 50000;
  if(!WORLD_CITIES || !WORLD_CITIES[homeCountry]) return 100000;
  var neighbors = WORLD_CITIES[homeCountry].neighbors || [];
  if(neighbors.indexOf(country) >= 0) return 80000;
  return 150000;
}

function getCountryKey(country) {
  var map = {
    'Niemcy':'Niemcy','Francja':'Francja','UK':'UK','Hiszpania':'Hiszpania',
    'Portugalia':'Portugalia','Irlandia':'Irlandia','USA':'USA',
    'Italy':'Wlochy','Switzerland':'Szwajcaria','Netherlands':'Holandia',
    'Belgium':'Belgia','Turkey':'Turcja','UAE':'UAE','India':'Indie',
    'China':'Chiny','Japan':'Japonia','Korea':'Korea','Thailand':'Tajlandia',
    'Australia':'Australia','Brazil':'Brazylia','Egypt':'Egipt',
    'S.Africa':'RPA','Ethiopia':'Etiopia','Singapore':'Singapore',
    'Polska':'Polska'
  };
  return map[country] || country;
}

function openSlotShop() {
  var lvl = G.level || 1;
  var unlocked = getUnlockedCountries();
  
  // Get all countries from ADB
  var countries = {};
  ADB.forEach(function(ap){
    var c = ap.country;
    if(!countries[c]) countries[c] = {name:c, airports:[], unlocked:false};
    countries[c].airports.push(ap);
  });
  
  // Mark unlocked
  Object.keys(countries).forEach(function(c){
    countries[c].unlocked = unlocked.indexOf(c) >= 0;
  });
  
  // Sort: unlocked first, then by name
  var sorted = Object.keys(countries).sort(function(a,b){
    if(countries[a].unlocked && !countries[b].unlocked) return -1;
    if(!countries[a].unlocked && countries[b].unlocked) return 1;
    return a.localeCompare(b);
  });

  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
    +'<button onclick="openShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">KUP SLOT</div></div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:10px;">Poziom <span style="color:#f5a623;font-weight:700;">'+lvl+'</span> &bull; Odblokowane: <span style="color:#00e676;font-weight:700;">'+unlocked.length+'</span> krajów</div>';

  sorted.forEach(function(c){
    var info = countries[c];
    var isUnlocked = info.unlocked;
    var available = info.airports.filter(function(ap){
      return G.slots.indexOf(ap.icao)<0 && !(G.homeAirport&&G.homeAirport.icao===ap.icao);
    }).length;
    var cost = getSlotCost(c);
    var flag = (WORLD_CITIES && WORLD_CITIES[c]) ? WORLD_CITIES[c].flag : '🌍';
    
    html += '<div '+(isUnlocked?'data-c="'+c+'" onclick="openCountrySlots(this.dataset.c)"':'')
      +' style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;'
      +'background:'+(isUnlocked?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.01)')+';'
      +'border:1px solid '+(isUnlocked?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.03)')+';'
      +'margin-bottom:5px;cursor:'+(isUnlocked?'pointer':'default')+';opacity:'+(isUnlocked?'1':'0.4')+'">'
      +'<span style="font-size:20px;">'+flag+'</span>'
      +'<div style="flex:1;">'
      +'<div style="font-size:13px;font-weight:700;color:'+(isUnlocked?'#e0f0ff':'#5580a0')+';">'+c+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+available+' lotnisk &bull; $'+cost.toLocaleString()+'/slot</div>'
      +'</div>'
      +(isUnlocked
        ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
        : '<span style="font-size:10px;color:#e63946;">&#128274;</span>'
      )+'</div>';
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}


function openCountrySlots(country) {
  var unlocked = getUnlockedCountries();
  if(unlocked.indexOf(country) < 0) { showMsg('Ten kraj jest zablokowany!'); return; }
  var cost = getSlotCost(country);
  var flag = (WORLD_CITIES && WORLD_CITIES[country]) ? WORLD_CITIES[country].flag : '🌍';

  var slots = [];
  ADB.forEach(function(ap){
    // Match by exact country name or normalized
    var apCountry = ap.country||'';
    if(apCountry !== country) return;
    if(G.slots.indexOf(ap.icao)>=0||(G.homeAirport&&G.homeAirport.icao===ap.icao)) return;
    slots.push(ap);
  });

  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openSlotShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<span style="font-size:20px;">'+flag+'</span>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">'+country+'</div></div>';

  if(!slots.length) {
    html += '<div style="padding:20px;text-align:center;color:#5580a0;">Brak dostepnych lotnisk lub wszystkie kupione</div>';
  } else {
    slots.forEach(function(ap){
      html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">'
        +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+ap.icao+' - '+ap.city+'</div>'
        +'<div style="font-size:10px;color:#5580a0;">$'+cost.toLocaleString()+'</div></div>'
        +'<button data-icao="'+ap.icao+'" data-cost="'+cost+'" onclick="buySlotByEl(this)" '
        +'style="padding:6px 14px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:6px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Kup</button>'
        +'</div>';
    });
  }
  document.getElementById('modal-body').innerHTML = html;
}

function buySlotByEl(el){ buySlot(el.dataset.icao,parseInt(el.dataset.cost)); }

function buySlot(icao,cost) {
  if(G.cash<cost){ showMsg('Za malo gotowki!'); return; }
  G.cash-=cost; G.slots.push(icao);
  var ap=null; ADB.forEach(function(a){if(a.icao===icao)ap=a;});
  if(ap) G.airports.push({id:'AP_'+icao,name:ap.city,icao:icao,city:ap.city,country:ap.country,lat:ap.lat,lng:ap.lng,isHome:false,level:1});
  save(); updateHUD(); renderMarkers();
  closeModal(); showMsg('Kupiono slot '+icao+'!');
}

function resetGame(){ localStorage.removeItem('sb_v3'); location.reload(); }
function saveSettings(){ closeModal(); showMsg('Zapisano!'); }
