function openBrandFleetByEl(el){ var brand=el.getAttribute("data-brand"); if(brand) openBrandFleet(brand); }

/* -- FLOTA -- */
var _flotaTab='samoloty';

function renderFlotaMain(body) {
  if(!G.fleet.length) {
    body.innerHTML='<div style="padding:20px;color:#5580a0;text-align:center;">Brak samolotow. Kup w Sklepie.</div>';
    return;
  }

  // Group by manufacturer
  var manufacturers = {};
  G.fleet.forEach(function(ac) {
    var brand = ac.model.split(' ')[0]; // Boeing, Airbus, ATR
    if(!manufacturers[brand]) manufacturers[brand] = [];
    manufacturers[brand].push(ac);
  });

  var AC_IMAGES = {
    'Boeing 737-800': 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',
    'Airbus A321neo': 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A321_Neo.png',
    'Airbus A380-800': 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A380-removebg-preview.png'
  };

  var out = '';
  Object.keys(manufacturers).forEach(function(brand) {
    var planes = manufacturers[brand];
    var flying = planes.filter(function(a){return a.status==='flying';}).length;
    var ground = planes.filter(function(a){return a.status==='ground'||a.status==='landed';}).length;

    // Get first image for this brand
    var imgSrc = null;
    planes.forEach(function(ac){ if(!imgSrc && AC_IMAGES[ac.model]) imgSrc = AC_IMAGES[ac.model]; });

    out += '<div data-brand="'+brand+'" onclick="openBrandFleetByEl(this)" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;margin-bottom:10px;cursor:pointer;display:flex;align-items:center;gap:14px;">'
      + (imgSrc ? '<img src="'+imgSrc+'" style="width:100px;height:50px;object-fit:contain;background:#000;border-radius:8px;flex-shrink:0;">' : '<div style="width:100px;height:50px;background:#0d1b2a;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:22px;">&#9992;</div>')
      + '<div style="flex:1;">'
      + '<div style="font-size:15px;font-weight:700;color:#e0f0ff;margin-bottom:4px;">'+brand+'</div>'
      + '<div style="font-size:11px;color:#5580a0;">'+planes.length+' samolot'+(planes.length>1?'y':'')+'</div>'
      + '<div style="display:flex;gap:8px;margin-top:4px;">'
      + (flying?'<span style="font-size:10px;color:#00e676;font-weight:700;">&#9992; '+flying+' w locie</span>':'')
      + (ground?'<span style="font-size:10px;color:#5580a0;">&#9634; '+ground+' na ziemi</span>':'')
      + '</div>'
      + '</div>'
      + '<div style="color:#5580a0;font-size:20px;">&#8250;</div>'
      + '</div>';
  });

  body.innerHTML = out;
}

function openBrandFleet(brand) {
  // Use modal so panel doesn't interfere
  var body = document.getElementById('modal-body');
  if(!body) return;
  document.getElementById('modal').style.display = 'flex';

  var AC_IMAGES = {
    'Boeing 737-800': 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',
    'Airbus A321neo': 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A321_Neo.png',
    'Airbus A380-800': 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A380-removebg-preview.png'
  };

  var planes = G.fleet.filter(function(ac){ return ac.model.split(' ')[0] === brand; });

  var out = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.07);">'
    +'<button onclick="closeModal()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;line-height:1;">&#8592;</button>'
    +'<div style="font-size:14px;font-weight:700;color:#00d4ff;letter-spacing:1px;">'+brand.toUpperCase()+'</div>'
    +'</div>';

  // Group by model
  var models = {};
  planes.forEach(function(ac){
    if(!models[ac.model]) models[ac.model]=[];
    models[ac.model].push(ac);
  });

  Object.keys(models).forEach(function(model) {
    var list = models[model];
    var imgSrc = AC_IMAGES[model];
    var inFlight = list.filter(function(a){return a.status==='flying';}).length;
    var onGround = list.filter(function(a){return a.status!=='flying';}).length;

    out += '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.12);border-radius:12px;padding:12px;margin-bottom:8px;">';
    if(imgSrc) out += '<img src="'+imgSrc+'" style="width:100%;max-height:100px;object-fit:contain;background:#000;border-radius:8px;margin-bottom:10px;">';
    out += '<div style="font-size:14px;font-weight:700;color:#e0f0ff;margin-bottom:6px;">'+model+' <span style="font-size:11px;color:#5580a0;">×'+list.length+'</span></div>';
    out += '<div style="display:flex;gap:8px;margin-bottom:10px;">';
    if(inFlight) out += '<span style="font-size:11px;color:#00e676;font-weight:700;">&#9992; '+inFlight+' w locie</span>';
    if(onGround) out += '<span style="font-size:11px;color:#5580a0;">&#9634; '+onGround+' na ziemi</span>';
    out += '</div>';

    // Individual aircraft
    list.forEach(function(ac) {
      var route = null; G.routes.forEach(function(r){if(r.id===ac.routeId)route=r;});
      var cfg = ac.config || {eco:ac.seats||150, biz:0};
      out += '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px 10px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">'
        +'<div>'
        +'<div style="font-size:12px;font-weight:700;color:#e0f0ff;">'+ac.reg+'</div>'
        +'<div style="font-size:10px;color:#5580a0;">Eko:'+cfg.eco+' Biz:'+(cfg.biz||0)+(route?' &bull; '+route.from+'&#8594;'+route.to:'')+'</div>'
        +'</div>'
        +'<div style="display:flex;gap:6px;">'
        +'<button data-id="'+ac.id+'" onclick="openModAc(this.dataset.id)" style="padding:5px 10px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:6px;color:#00d4ff;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Konfiguruj</button>'
        +'<button data-id="'+ac.id+'" onclick="openAddRoute(this.dataset.id)" style="padding:5px 10px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:6px;color:#fff;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">+ Trasa</button>'
        +'</div>'
        +'</div>';
    });

    out += '</div>';
  });

  body.innerHTML = out;
}


function setFlotaTab(el) { var tab=el.dataset?el.dataset.tab:el;
  _flotaTab=tab;
  var body=document.getElementById('panel-body');
  if(body) renderFlotaMain(body);
}

function buildWkrotce(name) {
  return '<div style="text-align:center;padding:24px 10px;">'
    +'<div style="font-size:32px;margin-bottom:12px;">&#9881;</div>'
    +'<div style="font-size:14px;font-weight:700;color:#e0f0ff;margin-bottom:8px;">'+name+'</div>'
    +'<div style="margin-top:16px;display:inline-block;padding:6px 16px;border:1px solid #1e3a5f;border-radius:20px;font-size:11px;color:#4a7099;">Wkrotce</div>'
    +'</div>';
}

function getAcSvg(model) {
  var AC_IMAGES = {
    'Boeing 737-800': 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',
    'Airbus A321neo': 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A321_Neo.png',
    'Airbus A380-800': 'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A380-removebg-preview.png'
  };
  if(AC_IMAGES[model]) {
    return '<img src="'+AC_IMAGES[model]+'" style="width:200px;height:80px;object-fit:contain;background:#000;border-radius:6px;">';
  }
  var color=G.airline.color||'#e63946';
  if(model.indexOf('787')>=0||model.indexOf('777')>=0) {
    return '<svg viewBox="0 0 200 60" width="200" height="60"><ellipse cx="100" cy="32" rx="85" ry="12" fill="'+color+'"/><path d="M15 32 Q3 30 1 32 Q3 34 15 32Z" fill="'+color+'"/><path d="M175 32 L188 23 L188 32 L192 32 L188 41 L188 32Z" fill="'+color+'"/><path d="M85 32 L55 55 L115 47 Z" fill="'+color+'" opacity="0.9"/><path d="M85 32 L55 9 L115 17 Z" fill="'+color+'" opacity="0.65"/><ellipse cx="70" cy="51" rx="12" ry="5" fill="#555"/><ellipse cx="100" cy="49" rx="11" ry="5" fill="#555"/><g fill="rgba(255,255,255,0.65)"><rect x="35" y="28" width="6" height="5" rx="1"/><rect x="45" y="28" width="6" height="5" rx="1"/><rect x="55" y="28" width="6" height="5" rx="1"/><rect x="65" y="28" width="6" height="5" rx="1"/><rect x="75" y="28" width="6" height="5" rx="1"/><rect x="85" y="28" width="6" height="5" rx="1"/><rect x="95" y="28" width="6" height="5" rx="1"/><rect x="105" y="28" width="6" height="5" rx="1"/><rect x="115" y="28" width="6" height="5" rx="1"/><rect x="125" y="28" width="6" height="5" rx="1"/><rect x="135" y="28" width="6" height="5" rx="1"/></g></svg>';
  }
  if(model.indexOf('ATR')>=0) {
    return '<svg viewBox="0 0 200 60" width="200" height="60"><ellipse cx="95" cy="36" rx="72" ry="9" fill="'+color+'"/><path d="M23 36 Q12 34 10 36 Q12 38 23 36Z" fill="'+color+'"/><path d="M163 36 L173 29 L173 36 L177 36 L173 43 L173 36Z" fill="'+color+'"/><path d="M90 30 L65 8 L115 15 Z" fill="'+color+'" opacity="0.85"/><path d="M90 30 L65 52 L115 45 Z" fill="'+color+'" opacity="0.5"/><circle cx="72" cy="18" r="5" fill="#444"/><circle cx="108" cy="16" r="5" fill="#444"/><g fill="rgba(255,255,255,0.7)"><rect x="40" y="33" width="5" height="4" rx="1"/><rect x="50" y="33" width="5" height="4" rx="1"/><rect x="60" y="33" width="5" height="4" rx="1"/><rect x="70" y="33" width="5" height="4" rx="1"/><rect x="80" y="33" width="5" height="4" rx="1"/><rect x="90" y="33" width="5" height="4" rx="1"/><rect x="100" y="33" width="5" height="4" rx="1"/></g></svg>';
  }
  return '<svg viewBox="0 0 200 60" width="200" height="60"><ellipse cx="100" cy="32" rx="85" ry="10" fill="'+color+'"/><path d="M15 32 Q5 30 3 32 Q5 34 15 32Z" fill="'+color+'"/><path d="M175 32 L185 25 L185 32 L190 32 L185 39 L185 32Z" fill="'+color+'"/><path d="M90 32 L70 52 L110 45 Z" fill="'+color+'" opacity="0.85"/><path d="M90 32 L70 12 L110 19 Z" fill="'+color+'" opacity="0.6"/><ellipse cx="80" cy="47" rx="10" ry="5" fill="#666"/><g fill="rgba(255,255,255,0.7)"><rect x="40" y="29" width="5" height="4" rx="1"/><rect x="50" y="29" width="5" height="4" rx="1"/><rect x="60" y="29" width="5" height="4" rx="1"/><rect x="70" y="29" width="5" height="4" rx="1"/><rect x="80" y="29" width="5" height="4" rx="1"/><rect x="90" y="29" width="5" height="4" rx="1"/><rect x="100" y="29" width="5" height="4" rx="1"/><rect x="110" y="29" width="5" height="4" rx="1"/><rect x="120" y="29" width="5" height="4" rx="1"/><rect x="130" y="29" width="5" height="4" rx="1"/></g></svg>';
}

function buildFlotaList() {
  if(!G.fleet.length) return '<div style="padding:20px;color:#5580a0;text-align:center;">Brak samolotow</div>';
  var groups={};
  G.fleet.forEach(function(ac){if(!groups[ac.model])groups[ac.model]=[];groups[ac.model].push(ac);});
  var out='';
  Object.keys(groups).forEach(function(model) {
    var list=groups[model];
    var inFlight=list.filter(function(a){return a.status==='flying';}).length;
    var onGround=list.filter(function(a){return a.status==='ground';}).length;
    var isLanded=list.filter(function(a){return a.status==='landed';}).length;
    var sl='';
    if(inFlight) sl+='<span style="color:#00e676;font-weight:700;">'+inFlight+' w locie</span> ';
    if(isLanded) sl+='<span style="color:#f5a623;font-weight:700;">'+isLanded+' wylad.</span> ';
    if(onGround) sl+='<span style="color:#5580a0;">'+onGround+' na ziemi</span>';
    out+='<div onclick="openModelDetail(this)" data-model="'+model+'" style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.12);border-radius:14px;margin-bottom:10px;cursor:pointer;overflow:hidden;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;padding:11px 14px 0;">'
      +'<div style="font-size:14px;font-weight:700;color:#e0f0ff;">'+model+'</div>'
      +'<div style="background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.3);border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700;color:#00d4ff;">'+list.length+' szt.</div>'
      +'</div>'
      +'<div style="padding:2px 14px 8px;font-size:11px;">'+sl+'</div>'
      +'<div style="background:linear-gradient(135deg,rgba(26,86,219,0.08),rgba(0,212,255,0.04));padding:12px 20px;display:flex;align-items:center;justify-content:center;">'+getAcSvg(model)+'</div>'
      +'<div style="padding:8px 14px 12px;font-size:11px;color:#5580a0;">Kliknij aby zarzadzac</div>'
      +'</div>';
  });
  return out;
}

function openModelDetail(el) { var model=el.dataset?el.dataset.model:el;
  var list=G.fleet.filter(function(a){return a.model===model;});
  if(!list.length) return;
  var items='';
  list.forEach(function(ac) {
    var seats=getAcSeats(ac);
    var route=null; G.routes.forEach(function(r){if(r.id===ac.routeId)route=r;});
    var sc=ac.status==='flying'?'#00e676':ac.status==='landed'?'#f5a623':'#5580a0';
    var st=ac.status==='flying'?'W LOCIE':ac.status==='landed'?'WYLADOWAL':'NA ZIEMI';
    var btn='';
    if(ac.status==='ground') btn='<button onclick="doAddRoute(this)" data-id="'+ac.id+'" style="padding:8px 14px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:11px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">+ Dodaj trase</button>';
    else if(ac.status==='landed') btn='<button onclick="doReturn(this)" data-id="'+ac.id+'" style="padding:8px 14px;background:linear-gradient(135deg,#0a5a1a,#00e676);border:none;border-radius:8px;color:#fff;font-size:11px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Odlec z powrotem</button>';
    else if(route) btn='<div style="font-size:11px;color:#00e676;">'+route.from+' > '+route.to+' | '+calcETA(route)+'</div>';
    items+='<div style="border-top:1px solid rgba(255,255,255,0.07);padding:12px 0;display:flex;justify-content:space-between;align-items:center;">'
      +'<div>'
      +'<div style="font-size:12px;font-weight:700;color:#e0f0ff;">'+ac.reg+'</div>'
      +'<div style="font-size:11px;margin-top:2px;">'
      +(seats.biz>0?'<span style="color:#f5a623;">'+seats.biz+' Biz</span> ':'')
      +'<span style="color:#00d4ff;">'+seats.eco+' Eco</span>'
      +' &bull; <span style="color:'+sc+';">'+st+'</span>'
      +'</div></div>'
      +'<div>'+btn+'</div></div>';
  });
  document.getElementById('modal-body').innerHTML=
    '<div style="background:linear-gradient(135deg,rgba(26,86,219,0.1),rgba(0,212,255,0.05));border-radius:12px;padding:12px 20px;margin-bottom:12px;display:flex;justify-content:center;">'+getAcSvg(model)+'</div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">'
    +'<div style="font-size:16px;font-weight:700;color:#e0f0ff;">'+model+'</div>'
    +'<div style="background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.3);border-radius:20px;padding:4px 12px;font-size:12px;font-weight:700;color:#00d4ff;">'+list.length+' sztuk</div>'
    +'</div>'+items;
  document.getElementById('modal').style.display='flex';
}

function doAddRoute(el) { openAddRoute(el.dataset.id); }
function doReturn(el) {
  var ac=G.fleet.filter(function(a){return a.id===el.dataset.id;})[0];
  if(!ac) return;
  var r=G.routes.filter(function(x){return x.id===ac.routeId;})[0];
  if(!r) return;
  var t=r.from; r.from=r.to; r.to=t;
  t=r.fromLat; r.fromLat=r.toLat; r.toLat=t;
  t=r.fromLng; r.fromLng=r.toLng; r.toLng=t;
  r.startTime=Date.now(); r.duration=5000; ac.status='flying';
  removeFlightLayer(r.id); drawFlightLayer(r);
  save(); document.getElementById('modal').style.display='none';
  showMsg('Odlecial '+ac.model+'!');
}

/* -- ADD ROUTE -- */
var _pendingAcId=null;

function openAddRoute(acId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0];
  if(!ac) return;
  _pendingAcId = acId;

  var owned = {};
  G.slots.forEach(function(s){owned[s]=true;});
  if(G.homeAirport) owned[G.homeAirport.icao] = true;

  var cfg = ac.config || {eco: ac.seats||150, biz:0, total: ac.seats||150};
  var hasEco = cfg.eco > 0;
  var hasBiz = cfg.biz > 0;

  var opts = '<option value="">-- Wybierz lotnisko --</option>';
  ADB.forEach(function(ap){
    if(G.homeAirport && ap.icao === G.homeAirport.icao) return;
    var hasSlot = owned[ap.icao];
    opts += '<option value="'+ap.icao+'"'+(hasSlot?'':' style="color:#5580a0;"')+'>'+ap.icao+' - '+ap.city+(hasSlot?'':' [brak slotu]')+'</option>';
  });

  document.getElementById('modal-body').innerHTML =
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:12px;">Nowa trasa - '+ac.model+'</div>'

    // Destination select
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:1px;margin-bottom:6px;">LOTNISKO DOCELOWE</div>'
    +'<select id="route-dest" style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:10px;color:#fff;font-size:13px;font-family:Arial,sans-serif;margin-bottom:8px;outline:none;box-sizing:border-box;">'
    +opts+'</select>'

    // Route info (updated on change)
    +'<div id="route-info" style="background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.15);border-radius:10px;padding:10px;margin-bottom:12px;font-size:12px;color:#5580a0;">Wybierz lotnisko aby zobaczyc informacje o trasie</div>'

    // Ticket prices - always visible
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:1px;margin-bottom:6px;">CENA BILETU (zł/pasażer)</div>'
    +'<div style="display:flex;gap:8px;margin-bottom:6px;">'
    +'<div style="flex:1;">'
    +'<div style="font-size:10px;color:'+(hasEco?'#a0b8cc':'#2a3a4a')+';margin-bottom:4px;">EKONOMIA</div>'
    +'<input id="price-eco" type="number" min="0" max="9999" value="0" '+(hasEco?'':'disabled ')
    +'style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,'+(hasEco?'0.3':'0.08')+');border-radius:6px;padding:8px;color:'+(hasEco?'#fff':'#2a3a4a')+';font-size:13px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;" placeholder="'+(hasEco?'np. 250':'Brak')+'"></div>'
    +'</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:10px;color:'+(hasBiz?'#a0b8cc':'#2a3a4a')+';margin-bottom:4px;">BIZNES</div>'
    +'<input id="price-biz" type="number" min="0" max="99999" value="0" '+(hasBiz?'':'disabled ')
    +'style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,'+(hasBiz?'0.3':'0.08')+');border-radius:6px;padding:8px;color:'+(hasBiz?'#fff':'#2a3a4a')+';font-size:13px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;" placeholder="'+(hasBiz?'np. 800':'Brak')+'"></div>'
    +'</div></div>'
    +'<div id="price-hint" style="font-size:11px;color:#5580a0;margin-bottom:14px;">Wybierz lotnisko aby zobaczyc sugerowana cene</div>'

    // Buttons
    +'<button onclick="confirmRouteGlobal()" style="width:100%;padding:12px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:9px;color:#fff;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:6px;">Dodaj trase</button>'
    +'<button onclick="closeModal()" style="width:100%;padding:10px;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:9px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Anuluj</button>';

  document.getElementById('modal').style.display = 'flex';

  // Attach onchange after render
  setTimeout(function(){
    var sel = document.getElementById('route-dest');
    if(sel) sel.onchange = function(){ updateRouteInfo(_pendingAcId); };
  }, 50);
}


function updateRouteInfo(acId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  var dest = document.getElementById('route-dest');
  if(!dest || !dest.value) return;
  var toIcao = dest.value;
  var fromIcao = G.homeAirport ? G.homeAirport.icao : '';

  // Build info manually if flight_calc not loaded
  var info = null;
  if(typeof getRouteInfo === 'function') {
    info = getRouteInfo(fromIcao, toIcao, ac.model);
  }
  if(!info) {
    // Fallback - basic info without distance calc
    var toAp = null; ADB.forEach(function(a){if(a.icao===toIcao)toAp=a;});
    var fromAp = null; ADB.forEach(function(a){if(a.icao===fromIcao)fromAp=a;});
    if(!toAp||!fromAp) return;
    var dist = 500; // default
    if(typeof calcDistance==='function') dist=Math.round(calcDistance(fromAp.lat,fromAp.lng,toAp.lat,toAp.lng));
    info = {dist:dist, minutes:Math.round(dist/800*60)+20, timeStr:Math.round(dist/800)+'h', inRange:true, range:99999, fromAp:fromAp, toAp:toAp};
  }

  var infoBox = document.getElementById('route-info');
  var priceBox = document.getElementById('route-price-box');
  var hint = document.getElementById('price-hint');

  if(!info.inRange) {
    infoBox.style.display = 'block';
    infoBox.innerHTML = '<div style="color:#e63946;font-weight:700;font-size:13px;">&#9888; Zbyt duzy dystans!</div>'
      +'<div style="font-size:12px;color:#5580a0;margin-top:4px;">Dystans: '+info.dist+' km &bull; Zasieg '+ac.model+': '+info.range+' km</div>';
    if(priceBox) priceBox.style.display = 'none';
    return;
  }

  infoBox.style.display = 'block';
  infoBox.innerHTML =
    '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">'
    +'<span style="color:#5580a0;">Dystans:</span><span style="color:#e0f0ff;font-weight:700;">'+info.dist+' km</span></div>'
    +'<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">'
    +'<span style="color:#5580a0;">Czas lotu:</span><span style="color:#00d4ff;font-weight:700;">'+info.timeStr+'</span></div>'
    +'<div style="display:flex;justify-content:space-between;font-size:12px;">'
    +'<span style="color:#5580a0;">Lotnisko:</span><span style="color:#e0f0ff;">'+info.fromAp.city+' &#8594; '+info.toAp.city+'</span></div>';

  if(priceBox) priceBox.style.display = 'block';

  // Show suggested min price
  var hours = info.minutes / 60;
  var minPrice = Math.round(80 * hours);
  if(hint) hint.textContent = 'Sugerowana minimalna cena: '+minPrice+' zł/os ('+info.timeStr+' × 80zł)';

  // Set default price
  var ecoIn = document.getElementById('price-eco');
  var bizIn = document.getElementById('price-biz');
  if(ecoIn && !ecoIn.disabled) ecoIn.value = minPrice;
  if(bizIn && !bizIn.disabled) bizIn.value = Math.round(minPrice * 2.5);
}

function confirmAddRoute(acId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  var dest = document.getElementById('route-dest');
  if(!dest || !dest.value) { showMsg('Wybierz lotnisko!'); return; }
  var toIcao = dest.value;
  var fromIcao = G.homeAirport ? G.homeAirport.icao : '';

  // Check if slot owned
  var owned = {};
  G.slots.forEach(function(s){owned[s]=true;});
  if(G.homeAirport) owned[G.homeAirport.icao]=true;
  if(!owned[toIcao]){ showMsg('Brak slotu na tym lotnisku!'); return; }

  var info = getRouteInfo(fromIcao, toIcao, ac.model);
  if(!info){ showMsg('Blad danych lotniska!'); return; }
  if(!info.inRange){ showMsg('Zbyt duzy dystans dla '+ac.model+'!'); return; }

  var ecoIn = document.getElementById('price-eco');
  var bizIn = document.getElementById('price-biz');
  var ecoPrice = ecoIn && !ecoIn.disabled ? parseInt(ecoIn.value)||0 : 0;
  var bizPrice = bizIn && !bizIn.disabled ? parseInt(bizIn.value)||0 : 0;

  var toAp = info.toAp;
  var routeId = 'rt_'+Date.now();
  var route = {
    id: routeId,
    acId: acId,
    from: fromIcao,
    to: toIcao,
    fromLat: G.homeAirport.lat,
    fromLng: G.homeAirport.lng,
    toLat: toAp.lat,
    toLng: toAp.lng,
    distKm: info.dist,
    durationMin: info.minutes,
    duration: info.minutes * 60000, // ms
    ticketPriceEco: ecoPrice,
    ticketPriceBiz: bizPrice,
    revenue: 0,
    startTime: null
  };

  G.routes.push(route);
  ac.routeId = routeId;
  save();
  closeModal();
  showMsg('Trasa '+fromIcao+' - '+toIcao+' dodana! ('+info.timeStr+')');
  var body = document.getElementById('panel-body');
  if(body) renderFlotaMain(body);
}


function doStartFlight() { startFlight(_pendingAcId); }

function startFlight(acId) {
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0];
  var destIcao=document.getElementById('dest-select').value;
  var price=parseInt(document.getElementById('ticket-price').value)||350;
  if(!ac||!G.homeAirport) return;
  var owned={}; G.slots.forEach(function(s){owned[s]=true;}); if(G.homeAirport) owned[G.homeAirport.icao]=true;
  var destAp=G.airports.filter(function(a){return a.icao===destIcao;})[0];
  if(!owned[destIcao]) {
    var db=ADB.filter(function(a){return a.icao===destIcao;})[0];
    if(!db){showMsg('Nieznane lotnisko!');return;}
    if(G.cash<db.cost){showMsg('Za malo gotowki na slot!');return;}
    G.cash-=db.cost; G.slots.push(destIcao);
    G.airports.push({id:'AP_'+destIcao,icao:destIcao,city:db.city,country:db.country,lat:db.lat,lng:db.lng,isHome:false,level:1});
    destAp=G.airports.filter(function(a){return a.icao===destIcao;})[0];
  }
  if(!destAp) return;
  // Calculate real flight time
  var distKm = 500;
  if(typeof calcDistance==='function') {
    distKm = Math.round(calcDistance(G.homeAirport.lat,G.homeAirport.lng,destAp.lat,destAp.lng));
  }
  var speed = (typeof AC_SPEEDS!=='undefined'&&AC_SPEEDS[ac.model]) ? AC_SPEEDS[ac.model] : 800;
  var durationMin = Math.round(distKm/speed*60) + 20;
  // 1 real second = 1 game minute
  var durationMs = durationMin * 60000;

  var rid='rt_'+Date.now();
  var route={id:rid,acId:acId,from:G.homeAirport.icao,to:destIcao,
    fromLat:G.homeAirport.lat,fromLng:G.homeAirport.lng,toLat:destAp.lat,toLng:destAp.lng,
    startTime:Date.now(),duration:durationMs,durationMin:durationMin,distKm:distKm,
    revenue:0,price:price,ticketPriceEco:price};
  G.routes.push(route); ac.status='flying'; ac.routeId=rid;
  document.getElementById('modal').style.display='none';
  save(); drawFlightLayer(route); updateHUD();
  showMsg('Odlecial '+ac.model+'!');
}

/* -- MODYFIKACJE -- */
var AC_DEFS={
  'Boeing 737-800':{rows:26,bizRowSeats:6,ecoRowSeats:6,bizRowCost:2,maxBizRows:13},
  'Airbus A320neo':{rows:28,bizRowSeats:6,ecoRowSeats:6,bizRowCost:2,maxBizRows:14},
  'Airbus A321neo':{rows:36,bizRowSeats:6,ecoRowSeats:6,bizRowCost:2,maxBizRows:18},
  'ATR-72':{rows:18,bizRowSeats:4,ecoRowSeats:4,bizRowCost:2,maxBizRows:9},
  'Boeing 787-9':{rows:36,bizRowSeats:6,ecoRowSeats:9,bizRowCost:2,maxBizRows:18}
};

function getAcSeats(ac) {
  var def=AC_DEFS[ac.model];
  if(!def) return {biz:0,eco:ac.seats||150,total:ac.seats||150};
  var bizRows=ac.bizRows||0;
  var ecoRows=def.rows-bizRows*def.bizRowCost;
  var biz=bizRows*def.bizRowSeats;
  var eco=Math.max(0,ecoRows)*def.ecoRowSeats;
  return {biz:biz,eco:eco,total:biz+eco};
}

function buildModyfikacje() {
  if(!G.fleet.length) return '<div style="padding:20px;color:#5580a0;text-align:center;">Brak samolotow</div>';
  var groups={}; G.fleet.forEach(function(ac){if(!groups[ac.model])groups[ac.model]=[];groups[ac.model].push(ac);});
  var out='<div style="font-size:10px;color:#5580a0;margin-bottom:12px;letter-spacing:1px;">Wybierz model:</div>';
  Object.keys(groups).forEach(function(model) {
    var list=groups[model]; var def=AC_DEFS[model]||{};
    out+='<div onclick="openModGroup(this)" data-model="'+model+'" style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.12);border-radius:12px;padding:14px;margin-bottom:8px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">'
      +'<div><div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+model+'</div>'
      +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'+list.length+' sztuk'+(def.rows?' &bull; '+def.rows+' rzedow':'')+'</div></div>'
      +'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  });
  return out;
}

function openModGroup(el) { var model=el.dataset?el.dataset.model:el;
  var list=G.fleet.filter(function(a){return a.model===model;});
  var def=AC_DEFS[model]||{};
  var items='';
  list.forEach(function(ac){
    var seats=getAcSeats(ac);
    var sc=ac.status==='flying'?'#00e676':ac.status==='landed'?'#f5a623':'#5580a0';
    var st=ac.status==='flying'?'W LOCIE':ac.status==='landed'?'WYLADOWAL':'NA ZIEMI';
    var fb=ac.fuelUpgrade?'<span style="font-size:9px;padding:2px 6px;background:rgba(0,230,118,0.15);border-radius:4px;color:#00e676;margin-left:6px;">Silnik+</span>':'';
    items+='<div onclick="openModAc(this)" data-id="'+ac.id+'" style="border-top:1px solid rgba(255,255,255,0.07);padding:13px 0;display:flex;justify-content:space-between;align-items:center;cursor:pointer;">'
      +'<div><div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+ac.reg+fb+'</div>'
      +'<div style="font-size:11px;margin-top:3px;">'
      +(seats.biz>0?'<span style="color:#f5a623;">'+seats.biz+' Biz</span> ':'')
      +'<span style="color:#00d4ff;">'+seats.eco+' Eco</span>'
      +' &bull; <span style="color:'+sc+';">'+st+'</span></div></div>'
      +'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  });
  document.getElementById('modal-body').innerHTML=
    '<div style="background:linear-gradient(135deg,rgba(26,86,219,0.1),rgba(0,212,255,0.05));border-radius:12px;padding:10px 20px;margin-bottom:12px;display:flex;justify-content:center;">'+getAcSvg(model)+'</div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">'
    +'<div style="font-size:16px;font-weight:700;color:#e0f0ff;">'+model+'</div>'
    +'<div style="background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.3);border-radius:20px;padding:4px 12px;font-size:12px;font-weight:700;color:#00d4ff;">'+list.length+' sztuk</div>'
    +'</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:2px;">Wybierz egzemplarz:</div>'
    +items;
  document.getElementById('modal').style.display='flex';
}

function openModAc(el) { var acId=el&&el.dataset?el.dataset.id:el;
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  var def=AC_DEFS[ac.model]; if(!def){showMsg('Brak konfiguracji');return;}
  var bizRows=ac.bizRows||0;
  var biz=bizRows*def.bizRowSeats;
  var eco=Math.max(0,def.rows-bizRows*def.bizRowCost)*def.ecoRowSeats;
  var fuelDone=ac.fuelUpgrade||false;
  var cabinStrip='<div style="display:flex;gap:2px;flex-wrap:wrap;margin:10px 0;">';
  for(var ri=0;ri<Math.min(def.rows,30);ri++) cabinStrip+='<div style="height:12px;border-radius:3px;flex:1;min-width:6px;background:'+(ri<bizRows?'#f5a623':'#1e3a5f')+';"></div>';
  if(def.rows>30) cabinStrip+='<div style="font-size:9px;color:#5580a0;padding-top:2px;">+'+(def.rows-30)+'</div>';
  cabinStrip+='</div>';
  document.getElementById('modal-body').innerHTML=
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:2px;">'+ac.model+'</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:14px;">'+ac.reg+' | '+def.rows+' rzedow | 1 Biz = 2 Eco</div>'
    +'<div style="display:flex;justify-content:space-between;margin-bottom:10px;">'
    +'<div style="text-align:center;flex:1;"><div style="font-size:26px;font-weight:900;color:#f5a623;" id="md-biz">'+biz+'</div><div style="font-size:10px;color:#5580a0;">BIZNES</div></div>'
    +'<div style="text-align:center;flex:1;"><div style="font-size:26px;font-weight:900;color:#00d4ff;" id="md-eco">'+eco+'</div><div style="font-size:10px;color:#5580a0;">EKONOMIA</div></div>'
    +'<div style="text-align:center;flex:1;"><div style="font-size:26px;font-weight:900;color:#e0f0ff;" id="md-tot">'+(biz+eco)+'</div><div style="font-size:10px;color:#5580a0;">RAZEM</div></div>'
    +'</div>'
    +'<div style="display:flex;justify-content:space-between;font-size:10px;color:#2a4a6a;margin-bottom:4px;"><span>Tylko Eco</span><span>Tylko Biz</span></div>'
    +'<input type="range" id="md-slider" min="0" max="'+def.maxBizRows+'" value="'+bizRows+'" step="1" '
    +'oninput="liveModSlider(this.value,'+def.bizRowSeats+','+def.ecoRowSeats+','+def.bizRowCost+','+def.rows+')" '
    +'style="width:100%;accent-color:#00d4ff;cursor:pointer;height:6px;margin-bottom:4px;">'
    +cabinStrip
    +'<button onclick="applySeats(this)" data-id="'+acId+'" style="width:100%;padding:12px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:9px;color:#fff;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:14px;">Zastosuj ($30,000)</button>'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:1px;margin-bottom:8px;">ULEPSZENIA SILNIKA</div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.12);border-radius:10px;padding:12px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;">'
    +'<div><div style="font-size:12px;font-weight:700;color:#e0f0ff;">Ekonomiczniejsze spalanie</div><div style="font-size:11px;color:#5580a0;">-10% kosztow paliwa</div></div>'
    +(fuelDone
      ?'<span style="font-size:10px;padding:3px 8px;background:rgba(0,230,118,.15);border-radius:6px;color:#00e676;">Aktywne</span>'
      :'<button onclick="applyFuelUpg(this)" data-id="'+acId+'" style="padding:6px 12px;background:#162d45;border:1px solid #f5a623;border-radius:7px;color:#f5a623;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">$50,000</button>')
    +'</div></div>';
  document.getElementById('modal').style.display='flex';
}

function liveModSlider(val,brs,ers,brc,rows) {
  var r=parseInt(val),biz=r*brs,eco=Math.max(0,rows-r*brc)*ers;
  var b=document.getElementById('md-biz'),e=document.getElementById('md-eco'),t=document.getElementById('md-tot');
  if(b)b.textContent=biz; if(e)e.textContent=eco; if(t)t.textContent=biz+eco;
}

function applySeats(el) {
  var acId = el&&el.dataset?el.dataset.id:el;
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  var def = AC_DEFS[ac.model]; if(!def) return;
  if(G.cash < 30000){showMsg('Za malo gotowki!'); return;}
  var slider = document.getElementById('md-slider');
  var bizRows = slider ? parseInt(slider.value) : 0;
  ac.bizRows = bizRows;
  // Save seat config
  var biz = bizRows * def.bizRowSeats;
  var eco = Math.max(0, def.rows - bizRows*def.bizRowCost) * def.ecoRowSeats;
  ac.config = {eco:eco, biz:biz, prem:0, first:0, total:eco+biz};
  G.cash -= 30000;
  save(); updateHUD();
  closeModal();
  showMsg('Konfiguracja zapisana! Biznes:'+biz+' Eko:'+eco);
}


function applyFuelUpg(el) { var acId=el&&el.dataset?el.dataset.id:el;
  if(G.cash<50000){showMsg('Za malo gotowki ($50,000)');return;}
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac||ac.fuelUpgrade) return;
  G.cash-=50000; ac.fuelUpgrade=true; save(); updateHUD();
  openModAc(acId); showMsg('Ulepszenie zainstalowane!');
}


function confirmRouteGlobal() { confirmAddRoute(_pendingAcId); }

function goBackToFlota(){ closeModal(); }
