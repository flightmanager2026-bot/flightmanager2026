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
  var html =
    '<div style="font-size:15px;font-weight:900;color:#e0f0ff;margin-bottom:16px;">🛒 Sklep</div>'

    // Main categories
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">'

    // Aircraft
    +'<div onclick="openNewAircraftShop()" style="background:linear-gradient(135deg,rgba(26,86,219,0.15),rgba(0,212,255,0.08));'
    +'border:1px solid rgba(0,212,255,0.25);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:8px;">✈️</div>'
    +'<div style="font-size:13px;font-weight:700;color:#00d4ff;">Samoloty</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:3px;">'+Object.values(AIRCRAFT_CATALOG).reduce(function(s,a){return s+a.length;},0)+' modeli</div>'
    +'</div>'

    // Slots
    +'<div onclick="openSlotShop()" style="background:linear-gradient(135deg,rgba(168,139,250,0.12),rgba(168,139,250,0.06));'
    +'border:1px solid rgba(168,139,250,0.25);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:8px;">🎫</div>'
    +'<div style="font-size:13px;font-weight:700;color:#a78bfa;">Sloty</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:3px;">Dostęp do lotnisk</div>'
    +'</div>'

    // Cargo
    +'<div onclick="openCargoShop()" style="background:linear-gradient(135deg,rgba(245,166,35,0.1),rgba(245,166,35,0.04));'
    +'border:1px solid rgba(245,166,35,0.2);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:8px;">📦</div>'
    +'<div style="font-size:13px;font-weight:700;color:#f5a623;">Cargo</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:3px;">Wkrótce</div>'
    +'</div>'

    // Top-up
    +'<div onclick="openTopUp()" style="background:linear-gradient(135deg,rgba(0,230,118,0.1),rgba(0,230,118,0.04));'
    +'border:1px solid rgba(0,230,118,0.2);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:8px;">💳</div>'
    +'<div style="font-size:13px;font-weight:700;color:#00e676;">Doładuj</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:3px;">Kup $ i PKT</div>'
    +'</div>'

    +'</div>'

    // Rewarded ad
    +'<div style="background:linear-gradient(135deg,rgba(255,215,0,0.06),rgba(245,166,35,0.04));'
    +'border:1px solid rgba(255,215,0,0.2);border-radius:14px;padding:14px;margin-bottom:12px;cursor:pointer;" onclick="showRewardedAdShop()">'
    +'<div style="display:flex;align-items:center;gap:12px;">'
    +'<div style="font-size:28px;">🎬</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:13px;font-weight:700;color:#ffd700;">Obejrzyj reklamę — odbierz nagrodę</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">Losowa nagroda za każdy obejrzany film</div>'
    +'</div>'
    +'<div style="padding:6px 12px;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.3);'
    +'border-radius:8px;font-size:11px;font-weight:700;color:#ffd700;">▶ Play</div>'
    +'</div></div>'

    // Quick stats
    +'<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:12px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;">'
    +'<div style="font-size:11px;color:#5580a0;">Twoje saldo</div>'
    +'<div style="font-size:14px;font-weight:700;color:#00e676;">$'+Math.round(G.cash).toLocaleString()+'</div>'
    +'</div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">'
    +'<div style="font-size:11px;color:#5580a0;">Hangar</div>'
    +'<div style="font-size:12px;font-weight:700;color:#00d4ff;">'+G.fleet.length+'/'+getHangarCapacity()+' samolotów</div>'
    +'</div></div>';

  document.getElementById('modal-body').innerHTML=html;
  document.getElementById('modal').style.display='flex';
}


function openCargoShop() {
  document.getElementById('modal-body').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">'
    +'<button onclick="openSlotShop?openSlotShop():closeModal()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;padding:0;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Samoloty Cargo</div></div>'
    +'<div style="text-align:center;padding:30px 20px;">'
    +'<div style="font-size:60px;margin-bottom:16px;">📦</div>'
    +'<div style="font-size:16px;font-weight:700;color:#e0f0ff;margin-bottom:8px;">Flota Cargo — Wkrótce</div>'
    +'<div style="font-size:12px;color:#5580a0;line-height:1.6;margin-bottom:20px;">'
    +'Samoloty cargo pozwolą Ci na transport towarów.<br>'
    +'Dostępne będą: nowe, leasing i używane.<br>'
    +'Już wkrótce w Flight Manager 2026!</div>'
    +'<div style="display:flex;gap:8px;justify-content:center;">'
    +'<div style="padding:8px 16px;background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.3);border-radius:20px;font-size:11px;color:#f5a623;">📦 A330 Cargo</div>'
    +'<div style="padding:8px 16px;background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.3);border-radius:20px;font-size:11px;color:#f5a623;">📦 747-8F</div>'
    +'<div style="padding:8px 16px;background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.3);border-radius:20px;font-size:11px;color:#f5a623;">📦 777F</div>'
    +'</div></div>';
  document.getElementById('modal').style.display='flex';
}

function openNewAircraftShop() {
  var brands = Object.keys(AIRCRAFT_CATALOG);
  var LOGOS = {
    'Boeing': 'img/logo.boeing.png',
    'Airbus': 'img/AIRBUS_Blue.png',
    'Embraer': 'img/embraer-vector-logo-removebg-preview.png'
  };
  var LOGO_BG = {'Airbus':'#001f5b', 'Boeing':'#fff'};

  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Kup samolot</div>'
    +'<div style="margin-left:auto;font-size:11px;color:#5580a0;">Flota: '+G.fleet.length+'/'+getHangarCapacity()+' &bull; $'+Math.round(G.cash/1000)+'K</div>'
    +'</div>'

    // Type tabs
    +'<div style="display:flex;gap:6px;margin-bottom:14px;">'
    +'<button onclick="openNewAircraftShop()" style="flex:1;padding:8px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">✈ Pasażerskie</button>'
    +'<button onclick="openCargoShop()" style="flex:1;padding:8px;background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.3);border-radius:10px;color:#f5a623;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">📦 Cargo</button>'
    +'</div>'

    +'<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin-bottom:10px;">WYBIERZ PRODUCENTA</div>';

  brands.forEach(function(brand) {
    var planes = AIRCRAFT_CATALOG[brand];
    var logo = LOGOS[brand];
    var logoBg = LOGO_BG[brand] || 'transparent';
    var availablePlanes = planes.filter(function(p){return p.locked !== true;});
    var minPrice = availablePlanes.length ? Math.min.apply(null, availablePlanes.map(function(p){return p.price;})) : 0;
    var affordable = availablePlanes.filter(function(p){return G.cash>=p.price && G.level>=(p.level||1);}).length;

    html +=
      '<div data-brand="'+brand+'" onclick="openManufacturerByName(this)" '
      +'style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;'
      +'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
      +'margin-bottom:6px;cursor:pointer;transition:background 0.2s;" '
      +(logo
        ?'<div style="width:72px;height:36px;background:'+logoBg+';border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:4px;">'
          +'<img src="'+logo+'" style="max-width:64px;max-height:28px;object-fit:contain;"></div>'
        :'<div style="width:72px;height:36px;background:#0d1b2a;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:20px;">✈</div>'
      )
      +'<div style="flex:1;min-width:0;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+brand+'</div>'
      +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'+planes.length+' modeli &bull; od $'+Math.round(minPrice/1000000)+'M</div>'
      +(affordable>0?'<div style="font-size:10px;color:#00e676;margin-top:1px;">'+affordable+' dostępnych</div>':'')
      +'</div>'
      +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}


function openManufacturer(brand) {
  var aircraft = AIRCRAFT_CATALOG[brand] || [];
  var LOGOS = {'Boeing':'img/logo.boeing.png','Airbus':'img/AIRBUS_Blue.png','Embraer':'img/embraer-vector-logo-removebg-preview.png'};
  var LOGO_BG = {'Airbus':'#001f5b','Boeing':'#fff'};
  var logo = LOGOS[brand];
  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openNewAircraftShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;padding:0;">&#8592;</button>'
    +(logo?'<div style="background:'+(LOGO_BG[brand]||'transparent')+';border-radius:8px;padding:4px 8px;">'
      +'<img src="'+logo+'" style="height:22px;object-fit:contain;vertical-align:middle;"></div>':'')
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">'+brand+'</div>'
    +'<div style="margin-left:auto;font-size:10px;color:#5580a0;">'+aircraft.length+' modeli</div>'
    +'</div>';
  aircraft.forEach(function(ac) {
    var isLocked = ac.locked === true;
    var canBuy = !isLocked && G.level >= (ac.level||1);
    var img = ac.img
      ? '<img src="'+ac.img+'" style="width:100%;max-height:110px;object-fit:contain;background:#000;border-radius:8px;margin-bottom:10px;">'
      : '';
    html += '<div style="background:'+(isLocked?'rgba(255,255,255,0.01)':'rgba(255,255,255,0.04)')+';border:1px solid '+(isLocked?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.08)')+';border-radius:12px;padding:12px;margin-bottom:8px;opacity:'+(isLocked?'0.55':'1')+'">'
      +img
      +'<div style="font-size:13px;font-weight:700;color:'+(isLocked?'#5580a0':'#e0f0ff')+';margin-bottom:3px;">'+(isLocked?'🔒 ':'')+ac.model+'</div>'
      +'<div style="font-size:10px;color:#5580a0;margin-bottom:6px;">'+ac.desc+'</div>'
      +'<div style="display:flex;gap:12px;font-size:10px;color:#5580a0;margin-bottom:8px;">'
      +'<span>&#128cadeiras; '+ac.seats+' miejsc</span>'
      +'<span>&#9992; '+ac.range+' km</span>'
      +'<span>'+ac.engines+'</span></div>'
      +(isLocked
        ? '<div style="padding:8px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;text-align:center;font-size:11px;color:#5580a0;">🔒 Niedostępny</div>'
        : (canBuy
          ? '<button data-model="'+ac.model+'" onclick="buyAircraftByEl(this)" style="width:100%;padding:9px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Kup za $'+ac.price.toLocaleString()+'</button>'
          : '<div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:8px;text-align:center;font-size:11px;color:#5580a0;">Wymagany poziom '+ac.level+'</div>'
        )
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

function showRewardedAdShop() {
  var el = document.getElementById('ad-container');
  if(!el) { doAdReward(); return; }
  el.style.display='flex';
  try { (adsbygoogle=window.adsbygoogle||[]).push({}); } catch(e){}
  var sec=5;
  var timerEl=document.getElementById('ad-timer-txt');
  var closeBtn=document.getElementById('ad-close-btn');
  if(timerEl) timerEl.textContent='Zamknij za '+sec+'s';
  if(closeBtn){ closeBtn.disabled=true; closeBtn.style.color='#5580a0'; closeBtn.style.cursor='not-allowed'; closeBtn.style.background='rgba(255,255,255,0.04)'; }
  var interval=setInterval(function(){
    sec--;
    if(timerEl) timerEl.textContent=sec>0?'Zamknij za '+sec+'s':'Możesz zamknąć ✓';
    if(sec<=0){
      clearInterval(interval);
      if(closeBtn){ closeBtn.disabled=false; closeBtn.style.color='#fff'; closeBtn.style.background='linear-gradient(135deg,#1a56db,#00d4ff)'; closeBtn.style.cursor='pointer'; }
      closeBtn.onclick=function(){ closeAdAndReward(); };
    }
  },1000);
}

function closeAdAndReward() {
  var el=document.getElementById('ad-container');
  if(el) el.style.display='none';
  doAdReward();
}

function doAdReward() {
  var lvl = G.level || 1;
  // Level bonus
  var lvlBonus = lvl * 100000;
  var lvlPts = 50;
  // Random reward - cash OR points (not both)
  var rewardType = Math.random() < 0.5 ? 'cash' : 'points';
  var cashAmount = Math.round(1000 + Math.random()*4000);
  var ptsAmount = Math.round(1 + Math.random()*49);

  G.cash += lvlBonus;
  G.points = (G.points||0) + lvlPts;

  var msg = '🎁 Nagroda za LVL '+lvl+': +$'+lvlBonus.toLocaleString()+' +'+lvlPts+' PKT';

  if(rewardType==='cash') {
    G.cash += cashAmount;
    msg += ' | Bonus losowy: +$'+cashAmount.toLocaleString();
  } else {
    G.points += ptsAmount;
    msg += ' | Bonus losowy: +'+ptsAmount+' PKT';
  }

  save(); updateHUD();
  showMsg(msg);
  if(typeof addGameNotification==='function') addGameNotification(msg, 'success');
}
