function openBrandFleetByEl(el){ var brand=el.getAttribute("data-brand"); if(brand) openBrandFleet(brand); }

/* -- FLOTA -- */
var _flotaTab='samoloty';

function renderFlotaMain(body) {
  if(!G.fleet.length) {
    body.innerHTML='<div style="padding:20px;color:#94a3b8;text-align:center;">Brak samolotow. Kup w Sklepie.</div>';
    return;
  }
  var manufacturers = {};
  function getBrandForModel(model) {
    if(typeof AIRCRAFT_CATALOG !== 'undefined') {
      var found = null;
      Object.keys(AIRCRAFT_CATALOG).forEach(function(b){
        AIRCRAFT_CATALOG[b].forEach(function(a){ if(a.model===model) found=b; });
      });
      if(found) return found;
    }
    if(model.indexOf('737')>=0||model.indexOf('747')>=0||model.indexOf('757')>=0||
       model.indexOf('767')>=0||model.indexOf('777')>=0||model.indexOf('787')>=0) return 'Boeing';
    if(model.indexOf('A2')>=0||model.indexOf('A3')>=0||model.indexOf('A4')>=0) return 'Airbus';
    return model.split(' ')[0];
  }
  G.fleet.forEach(function(ac) {
    var brand = ac.brand || getBrandForModel(ac.model);
    ac.brand = brand;
    if(!manufacturers[brand]) manufacturers[brand]=[];
    manufacturers[brand].push(ac);
  });
  var AC_IMAGES = {
    'Boeing 737-800':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',
    'Boeing 737 MAX 8':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',
    'Airbus A321neo':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A321_Neo.png',
    'Airbus A340-300':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A340-300-removebg-preview.png',
    'Airbus A350-900':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A350-900_XWB-removebg-preview.png',
    'Airbus A380-800':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A380-removebg-preview.png'
  };
  var BRAND_LOGOS = {
    'Boeing':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/logo.boeing.png'
  };
  var out = '';
  Object.keys(manufacturers).forEach(function(brand) {
    var planes = manufacturers[brand];
    var flying = planes.filter(function(a){return a.status==='flying';}).length;
    var ground = planes.filter(function(a){return a.status!=='flying';}).length;
    var logoSrc = BRAND_LOGOS[brand] || null;
    var logoBg  = BRAND_BG[brand] || '#0f0f1a';
    out += '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;margin-bottom:10px;cursor:pointer;display:flex;align-items:center;gap:14px;" data-b="'+brand+'" onclick="showBrandModal(this.dataset.b)">'
      +(logoSrc
        ?'<div style="width:90px;height:48px;background:'+logoBg+';border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;padding:6px;box-sizing:border-box;"><img src="'+logoSrc+'" style="max-width:78px;max-height:36px;object-fit:contain;"></div>'
        :'<div style="width:90px;height:48px;background:#0f0f1a;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#94a3b8;">'+brand.substring(0,3).toUpperCase()+'</div>'
      )
      +'<div style="flex:1;"><div style="font-size:15px;font-weight:700;color:#f1f5f9;margin-bottom:4px;">'
      +(brand==='Airbus'?'<img src="img/AIRBUS_Blue.png" style="height:14px;margin-right:6px;vertical-align:middle;">':brand==='Embraer'?'<img src="img/embraer-vector-logo-removebg-preview.png" style="height:14px;margin-right:6px;vertical-align:middle;">':'')
      +brand+'</div>'
      +'<div style="font-size:11px;color:#94a3b8;">'+planes.length+' samolot'+(planes.length>1?'y':'')+'</div>'
      +'<div style="display:flex;gap:8px;margin-top:4px;">'
      +(flying?'<span style="font-size:10px;color:#10b981;font-weight:700;">&#9992; '+flying+' w locie</span>':'')
      +(ground?'<span style="font-size:10px;color:#94a3b8;">&#9634; '+ground+' na ziemi</span>':'')
      +'</div></div>'
      +'<div style="color:#94a3b8;font-size:20px;">&#8250;</div></div>';
  });
  body.innerHTML = out;
}

function showBrandModal(brand) {
  var AC_IMAGES = {
    'Boeing 737-800':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',
    'Boeing 737 MAX 8':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',
    'Airbus A321neo':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A321_Neo.png',
    'Airbus A340-300':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A340-300-removebg-preview.png',
    'Airbus A350-900':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A350-900_XWB-removebg-preview.png',
    'Airbus A380-800':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A380-removebg-preview.png'
  };
  var planes = G.fleet.filter(function(ac){
    var b = ac.brand || (function(model){
      if(typeof AIRCRAFT_CATALOG!=='undefined'){
        var f=null; Object.keys(AIRCRAFT_CATALOG).forEach(function(br){ AIRCRAFT_CATALOG[br].forEach(function(a){if(a.model===model)f=br;}); }); if(f) return f;
      }
      return model.split(' ')[0];
    })(ac.model);
    return b===brand;
  });
  var models = {};
  planes.forEach(function(ac){ if(!models[ac.model])models[ac.model]=[]; models[ac.model].push(ac); });

  var out = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="closeModal()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:24px;padding:0;">&#8592;</button>'
    +'<div style="font-size:16px;font-weight:700;color:#06b6d4;">'+brand+'</div></div>';

  Object.keys(models).forEach(function(model) {
    var list = models[model];
    var imgSrc = AC_IMAGES[model];
    var inFlight = list.filter(function(a){return a.status==='flying';}).length;
    var onGround = list.filter(function(a){return a.status!=='flying';}).length;
    out += '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(6,182,212,0.12);border-radius:12px;padding:12px;margin-bottom:10px;">';
    if(imgSrc) out += '<img src="'+imgSrc+'" style="width:100%;max-height:90px;object-fit:contain;background:#000;border-radius:8px;margin-bottom:10px;">';
    out += '<div style="font-size:14px;font-weight:700;color:#f1f5f9;margin-bottom:4px;">'+model+' <span style="font-size:11px;color:#94a3b8;">x'+list.length+'</span></div>';
    out += '<div style="display:flex;gap:8px;margin-bottom:10px;">';
    if(inFlight) out += '<span style="font-size:11px;color:#10b981;">&#9992; '+inFlight+' w locie</span>';
    if(onGround) out += '<span style="font-size:11px;color:#94a3b8;">&#9634; '+onGround+' na ziemi</span>';
    out += '</div>';
    list.forEach(function(ac) {
      var route=null; G.routes.forEach(function(r){if(r.id===ac.routeId)route=r;});
      var cfg=ac.config||{eco:ac.seats||150,biz:0};
      out += '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px 10px;margin-bottom:6px;">'
        +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">'
        +'<div><div style="font-size:12px;font-weight:700;color:#f1f5f9;">'+ac.reg+'</div>'
        +'<div style="font-size:10px;color:#94a3b8;">Eko:'+cfg.eco+' Biz:'+(cfg.biz||0)+(route?' | '+route.from+'->'+route.to:'')+'</div></div>'
        +'<div style="display:flex;gap:5px;">'
        +(ac.status==='ground'
          ? '<button data-id="'+ac.id+'" onclick="closeModal();openModAc(this.dataset.id)" style="padding:5px 8px;background:rgba(6,182,212,0.1);border:1px solid rgba(6,182,212,0.3);border-radius:6px;color:#06b6d4;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Konfig</button>'
          : '<div style="padding:5px 8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:6px;color:#94a3b8;font-size:10px;font-weight:700;">W locie</div>'
        )
        +(ac.routeId
          ? '<div style="padding:5px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:#94a3b8;font-size:10px;font-weight:700;">Ma trase</div>'
          : (ac.config && ac.config.total > 0
            ? '<button data-id="'+ac.id+'" onclick="closeModal();openAddRoute(this.dataset.id)" style="padding:5px 8px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;border-radius:6px;color:#fff;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">+Trasa</button>'
            : '<button data-id="'+ac.id+'" onclick="closeModal();openModAc(this.dataset.id)" style="padding:5px 8px;background:rgba(249,115,22,0.2);border:1px solid rgba(249,115,22,0.4);border-radius:6px;color:#f97316;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Skonfiguruj</button>'
          )
        )
        +'</div></div>'
        // Przyciski odlacz i sprzedaj
        +'<div style="display:flex;gap:5px;">'
        +(ac.routeId && ac.status!=='flying'
          ? '<button data-id="'+ac.id+'" onclick="detachRoute(this.dataset.id)" style="padding:4px 10px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.3);border-radius:6px;color:#f97316;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">&#8722; Odlacz trase</button>'
          : '')
        +(ac.status!=='flying'
          ? '<button data-id="'+ac.id+'" onclick="sellAircraft(this.dataset.id)" style="padding:4px 10px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:6px;color:#ef4444;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">&#128179; Sprzedaj</button>'
          : '')
        +'</div>'
        +'</div>';
    });
    out += '</div>';
  });

  document.getElementById('modal-body').innerHTML = out;
  document.getElementById('modal').style.display = 'flex';
}

function openBrandFleet(brand) { showBrandModal(brand); }

/* -- ODLACZ TRASE -- */
function detachRoute(acId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0];
  if(!ac) return;
  if(ac.status==='flying'){showMsg('Nie mozna odlaczyc w trakcie lotu!');return;}
  if(!ac.routeId){showMsg('Ten samolot nie ma trasy!');return;}
  G.routes = G.routes.filter(function(r){return r.id!==ac.routeId;});
  if(typeof removeFlightLayer==='function') removeFlightLayer(ac.routeId);
  ac.routeId = null;
  ac.status = 'ground';
  save();
  showMsg('Trasa odlaczona. Samolot wolny.');
  closeModal();
}

/* -- SPRZEDAJ SAMOLOT -- */
function sellAircraft(acId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0];
  if(!ac) return;
  if(ac.status==='flying'){showMsg('Nie mozna sprzedac w trakcie lotu!');return;}
  var price = 0;
  if(typeof AIRCRAFT_CATALOG!=='undefined'){
    Object.keys(AIRCRAFT_CATALOG).forEach(function(brand){
      AIRCRAFT_CATALOG[brand].forEach(function(a){if(a.model===ac.model)price=a.price;});
    });
  }
  var sellPrice = Math.round(price*0.6);
  if(!confirm('Sprzedac '+ac.model+' ('+ac.reg+') za $'+sellPrice.toLocaleString()+'?\n(60% wartosci katalogowej)')) return;
  if(ac.routeId){
    G.routes = G.routes.filter(function(r){return r.id!==ac.routeId;});
    if(typeof removeFlightLayer==='function') removeFlightLayer(ac.routeId);
  }
  G.fleet = G.fleet.filter(function(a){return a.id!==acId;});
  G.cash += sellPrice;
  save(); updateHUD();
  showMsg('Sprzedano '+ac.model+' za $'+sellPrice.toLocaleString()+'!');
  closeModal();
}

/* -- 1 SAMOLOT NA LOTNISKO -- */
function airportHasPlane(toIcao) {
  return G.fleet.some(function(ac){
    if(!ac.routeId) return false;
    var route = G.routes.filter(function(r){return r.id===ac.routeId;})[0];
    if(!route) return false;
    return route.to===toIcao || route.from===toIcao;
  });
}

/* -- ADD ROUTE -- */
var _pendingAcId=null;

function openAddRoute(acId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0];
  if(!ac) return;
  if(ac.routeId){
    var existing = G.routes.filter(function(r){return r.id===ac.routeId;})[0];
    if(existing){showMsg('Ten samolot juz ma trase '+existing.from+' - '+existing.to+'!');return;}
  }
  _pendingAcId = acId;
  var hasBiz   = ac.config && ac.config.biz > 0;
  var hasPrem  = ac.config && ac.config.prem > 0;
  var hasFirst = ac.config && ac.config.first > 0;
  var owned = {};
  G.slots.forEach(function(s){owned[s]=true;});
  if(G.homeAirport) owned[G.homeAirport.icao] = true;

  var opts = '<option value="">-- Wybierz lotnisko --</option>';
  if(typeof ADB!=='undefined'){
    ADB.forEach(function(ap){
      if(G.homeAirport && ap.icao===G.homeAirport.icao) return;
      if(!owned[ap.icao]) return;
      if(airportHasPlane(ap.icao)) return; // juz ma samolot
      opts += '<option value="'+ap.icao+'">'+ap.icao+' - '+ap.city+' ('+ap.country+')</option>';
    });
  }
  if(opts==='<option value="">-- Wybierz lotnisko --</option>'){
    opts+='<option disabled>Brak slotow - kup w Sklepie!</option>';
  }

  document.getElementById('modal-body').innerHTML =
    '<div style="font-size:15px;font-weight:700;color:#06b6d4;margin-bottom:12px;">Nowa trasa - '+ac.model+'</div>'
    +'<div style="font-size:10px;color:#94a3b8;letter-spacing:1px;margin-bottom:6px;">LOTNISKO DOCELOWE</div>'
    +'<select id="route-dest" data-acid="'+acId+'" onchange="updateRouteInfo(this.dataset.acid,this.value)" style="width:100%;background:#0f0f1a;border:1px solid rgba(6,182,212,0.3);border-radius:8px;padding:10px;color:#fff;font-size:13px;font-family:Arial,sans-serif;margin-bottom:8px;outline:none;box-sizing:border-box;">'
    +opts+'</select>'
    +'<div id="route-info" style="background:rgba(6,182,212,0.06);border:1px solid rgba(6,182,212,0.15);border-radius:10px;padding:10px;margin-bottom:12px;font-size:12px;color:#94a3b8;">Wybierz lotnisko aby zobaczyc informacje o trasie</div>'
    +'<div style="font-size:10px;color:#94a3b8;letter-spacing:1px;margin-bottom:8px;">CENY BILETOW (zl/pasazer)</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">'
    +'<div><div style="font-size:10px;color:#06b6d4;margin-bottom:3px;">&#128186; EKONOMIA</div>'
    +'<input id="price-eco" type="number" min="0" max="9999" value="0" style="width:100%;background:#0f0f1a;border:1px solid rgba(6,182,212,0.3);border-radius:6px;padding:8px;color:#fff;font-size:13px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;"></div>'
    +'<div><div style="font-size:10px;color:#f97316;margin-bottom:3px;">&#127913; BIZNES</div>'
    +'<input id="price-biz" type="number" min="0" max="99999" value="0" '+(hasBiz?'':' disabled ')
    +'style="width:100%;background:#0f0f1a;border:1px solid rgba(249,115,22,'+(hasBiz?'0.3':'0.1')+');border-radius:6px;padding:8px;color:'+(hasBiz?'#fff':'#2a3a4a')+';font-size:13px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;"></div>'
    +'<div><div style="font-size:10px;color:#8b5cf6;margin-bottom:3px;">&#128142; PREMIUM</div>'
    +'<input id="price-prem" type="number" min="0" max="99999" value="0" '+(hasPrem?'':' disabled ')
    +'style="width:100%;background:#0f0f1a;border:1px solid rgba(139,92,246,'+(hasPrem?'0.3':'0.1')+');border-radius:6px;padding:8px;color:'+(hasPrem?'#fff':'#2a3a4a')+';font-size:13px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;"></div>'
    +'<div><div style="font-size:10px;color:#ffd700;margin-bottom:3px;">&#11088; PIERWSZA</div>'
    +'<input id="price-first" type="number" min="0" max="99999" value="0" '+(hasFirst?'':' disabled ')
    +'style="width:100%;background:#0f0f1a;border:1px solid rgba(255,215,0,'+(hasFirst?'0.3':'0.1')+');border-radius:6px;padding:8px;color:'+(hasFirst?'#fff':'#2a3a4a')+';font-size:13px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;"></div>'
    +'</div>'
    +'<div id="price-hint" style="font-size:11px;color:#94a3b8;margin-bottom:14px;">Wybierz lotnisko aby zobaczyc sugerowane ceny</div>'
    +'<button onclick="confirmRouteGlobal()" style="width:100%;padding:12px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;border-radius:9px;color:#fff;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:6px;">Dodaj trase</button>'
    +'<button onclick="closeModal()" style="width:100%;padding:10px;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:9px;color:#94a3b8;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Anuluj</button>';

  document.getElementById('modal').style.display = 'flex';
}

function updateRouteInfo(acId, toIcaoParam) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  var toIcao = toIcaoParam;
  if(!toIcao){var dest=document.getElementById('route-dest');if(!dest||!dest.value)return;toIcao=dest.value;}
  var fromIcao = G.homeAirport ? G.homeAirport.icao : '';
  var info = null;
  if(typeof getRouteInfo==='function') info=getRouteInfo(fromIcao,toIcao,ac.model);
  if(!info){
    var toAp=null,fromAp=null;
    if(typeof ADB!=='undefined'){ADB.forEach(function(a){if(a.icao===toIcao)toAp=a;if(a.icao===fromIcao)fromAp=a;});}
    if(!fromAp&&G.homeAirport) fromAp=G.homeAirport;
    if(!toAp) return;
    var dist=500;
    if(typeof calcDistance==='function') dist=Math.round(calcDistance(fromAp.lat,fromAp.lng,toAp.lat,toAp.lng));
    info={dist:dist,minutes:Math.round(dist/800*60)+20,timeStr:Math.round(dist/800)+'h',inRange:true,range:99999,fromAp:fromAp,toAp:toAp};
  }
  var infoBox=document.getElementById('route-info');
  var hint=document.getElementById('price-hint');
  if(!info.inRange){
    if(infoBox) infoBox.innerHTML='<div style="color:#ef4444;font-weight:700;">&#9888; Zbyt duzy dystans!</div><div style="font-size:12px;color:#94a3b8;">Dystans: '+info.dist+' km &bull; Zasieg: '+info.range+' km</div>';
    return;
  }
  if(infoBox) infoBox.innerHTML=
    '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:#94a3b8;">Dystans:</span><span style="color:#f1f5f9;font-weight:700;">'+info.dist+' km</span></div>'
    +'<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;"><span style="color:#94a3b8;">Czas lotu:</span><span style="color:#06b6d4;font-weight:700;">'+info.timeStr+'</span></div>'
    +'<div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:#94a3b8;">Trasa:</span><span style="color:#f1f5f9;">'+info.fromAp.city+' &#8594; '+info.toAp.city+'</span></div>';
  var mins=info.minutes||40;
  var minPrice=Math.max(10,Math.round(1.6*mins));
  if(hint) hint.textContent='Sugerowana cena: '+minPrice+' zl/os ('+mins+' min x 1.6 zl)';
  var ecoIn=document.getElementById('price-eco');
  var bizIn=document.getElementById('price-biz');
  if(ecoIn){ecoIn.disabled=false;ecoIn.value=minPrice;}
  if(bizIn&&!bizIn.disabled) bizIn.value=Math.round(minPrice*2.5);
}

function confirmAddRoute(acId) {
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  var dest=document.getElementById('route-dest');
  if(!dest||!dest.value){showMsg('Wybierz lotnisko!');return;}
  var toIcao=dest.value;
  var fromIcao=G.homeAirport?G.homeAirport.icao:'';
  var owned={};
  G.slots.forEach(function(s){owned[s]=true;});
  if(G.homeAirport) owned[G.homeAirport.icao]=true;
  if(!owned[toIcao]){showMsg('Brak slotu na tym lotnisku!');return;}
  if(airportHasPlane(toIcao)){showMsg('To lotnisko juz ma przypisany samolot!');return;}
  var info=null;
  if(typeof getRouteInfo==='function') info=getRouteInfo(fromIcao,toIcao,ac.model);
  if(!info){
    var fromAp=null,toAp2=null;
    if(typeof ADB!=='undefined'){ADB.forEach(function(a){if(a.icao===fromIcao)fromAp=a;if(a.icao===toIcao)toAp2=a;});}
    if(!fromAp&&G.homeAirport) fromAp=G.homeAirport;
    if(!toAp2){showMsg('Nieznane lotnisko docelowe!');return;}
    var dist2=typeof calcDistance==='function'?Math.round(calcDistance(fromAp.lat,fromAp.lng,toAp2.lat,toAp2.lng)):500;
    info={dist:dist2,minutes:Math.round(dist2/800*60)+20,timeStr:Math.round(dist2/800)+'h',inRange:true,range:99999,fromAp:fromAp,toAp:toAp2};
  }
  if(!info.inRange){showMsg('Zbyt duzy dystans dla '+ac.model+'!');return;}
  var ecoIn=document.getElementById('price-eco');
  var bizIn=document.getElementById('price-biz');
  var hours=info.minutes/60;
  var defaultPrice=Math.round(85*hours);
  var ecoPrice=ecoIn&&!ecoIn.disabled?(parseInt(ecoIn.value)||defaultPrice):0;
  var bizPrice=bizIn&&!bizIn.disabled?(parseInt(bizIn.value)||(defaultPrice*2)):0;
  if(ecoPrice<1&&(ac.config?ac.config.eco:ac.seats)>0) ecoPrice=defaultPrice;
  var toAp=info.toAp;
  var routeId='rt_'+Date.now();
  var _mins=info.minutes||40;
  var _eco=ac.config?(ac.config.eco||0):(ac.seats||150);
  var _biz=ac.config?(ac.config.biz||0):0;
  var _rev=Math.round(_eco*_mins*1.6+_biz*_mins*1.6*2.5);
  var route={
    id:routeId,acId:acId,from:fromIcao,to:toIcao,
    fromLat:G.homeAirport.lat,fromLng:G.homeAirport.lng,toLat:toAp.lat,toLng:toAp.lng,
    distKm:info.dist,durationMin:info.minutes,duration:info.minutes*60000,
    ticketPriceEco:ecoPrice,ticketPriceBiz:bizPrice,revenue:_rev,startTime:null
  };
  G.routes.push(route);
  ac.routeId=routeId;
  save(); closeModal();
  showMsg('Trasa '+fromIcao+' - '+toIcao+' dodana! ('+info.timeStr+')');
  var body=document.getElementById('panel-body');
  if(body) renderFlotaMain(body);
}

function confirmRouteGlobal(){ confirmAddRoute(_pendingAcId); }

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

function getAcSvg(model) {
  var AC_IMAGES = {
    'Boeing 737-800':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',
    'Airbus A321neo':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A321_Neo.png',
    'Airbus A380-800':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A380-removebg-preview.png'
  };
  if(AC_IMAGES[model]) return '<img src="'+AC_IMAGES[model]+'" style="width:200px;height:80px;object-fit:contain;background:#000;border-radius:6px;">';
  return '<div style="font-size:40px;text-align:center;">&#9992;</div>';
}

function openModAc(el) {
  var acId=el&&el.dataset?el.dataset.id:el;
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0];
  if(!ac) return;
  if(ac.status!=='ground'){showMsg('Konfiguracja mozliwa tylko na ziemi!');return;}
  window._modAcId=acId;
  var totalSeats=ac.seats||150;
  var cfg=ac.config||{first:0,prem:0,biz:0,eco:totalSeats};
  var maxFirst=Math.floor(totalSeats/4);
  var maxPrem=Math.floor(totalSeats/3);
  var maxBiz=Math.floor(totalSeats/2);

  document.getElementById('modal-body').innerHTML=
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="closeModal()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:22px;padding:0;">&#8592;</button>'
    +'<div><div style="font-size:15px;font-weight:700;color:#06b6d4;">'+ac.model+'</div>'
    +'<div style="font-size:11px;color:#94a3b8;">'+ac.reg+' &bull; '+totalSeats+' miejsc</div></div></div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:14px;">'
    +'<div style="padding:8px;background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.2);border-radius:8px;text-align:center;"><div style="font-size:11px;font-weight:700;color:#ffd700;">&#11088; Pierwsza</div><div style="font-size:10px;color:#94a3b8;">4.0 zl/min &bull; 4 eco</div></div>'
    +'<div style="padding:8px;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:8px;text-align:center;"><div style="font-size:11px;font-weight:700;color:#8b5cf6;">&#128142; Premium</div><div style="font-size:10px;color:#94a3b8;">3.0 zl/min &bull; 3 eco</div></div>'
    +'<div style="padding:8px;background:rgba(249,115,22,0.08);border:1px solid rgba(249,115,22,0.2);border-radius:8px;text-align:center;"><div style="font-size:11px;font-weight:700;color:#f97316;">&#127913; Biznes</div><div style="font-size:10px;color:#94a3b8;">2.0 zl/min &bull; 2 eco</div></div>'
    +'<div style="padding:8px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);border-radius:8px;text-align:center;"><div style="font-size:11px;font-weight:700;color:#06b6d4;">&#128186; Ekonomia</div><div style="font-size:10px;color:#94a3b8;">1.6 zl/min &bull; 1 eco</div></div>'
    +'</div>'
    +'<div style="margin-bottom:14px;">'
    +'<div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:4px;"><span>Zajete miejsca</span><span id="md-slots-used">0</span><span>/ '+totalSeats+'</span></div>'
    +'<div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;"><div id="md-slots-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#ffd700,#06b6d4);border-radius:3px;transition:width 0.2s;"></div></div>'
    +'</div>'
    +'<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;"><span style="color:#ffd700;font-weight:700;">&#11088; Pierwsza</span><span style="color:#ffd700;font-weight:900;" id="md-first-val">'+(cfg.first||0)+'</span></div>'
    +'<input type="range" id="md-first" min="0" max="'+maxFirst+'" value="'+(cfg.first||0)+'" oninput="modUpdateSeats()" style="width:100%;accent-color:#ffd700;"></div>'
    +'<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;"><span style="color:#8b5cf6;font-weight:700;">&#128142; Premium</span><span style="color:#8b5cf6;font-weight:900;" id="md-prem-val">'+(cfg.prem||0)+'</span></div>'
    +'<input type="range" id="md-prem" min="0" max="'+maxPrem+'" value="'+(cfg.prem||0)+'" oninput="modUpdateSeats()" style="width:100%;accent-color:#8b5cf6;"></div>'
    +'<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;"><span style="color:#f97316;font-weight:700;">&#127913; Biznes</span><span style="color:#f97316;font-weight:900;" id="md-biz-val">'+(cfg.biz||0)+'</span></div>'
    +'<input type="range" id="md-biz" min="0" max="'+maxBiz+'" value="'+(cfg.biz||0)+'" oninput="modUpdateSeats()" style="width:100%;accent-color:#f97316;"></div>'
    +'<div style="background:rgba(6,182,212,0.06);border:1px solid rgba(6,182,212,0.15);border-radius:10px;padding:12px;margin-bottom:12px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:12px;color:#06b6d4;font-weight:700;">&#128186; Ekonomia (pozostale)</span><span style="font-size:18px;font-weight:900;color:#06b6d4;" id="md-eco-val">'+(cfg.eco||totalSeats)+'</span></div></div>'
    +'<div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.15);border-radius:10px;padding:10px 12px;margin-bottom:12px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-size:11px;color:#94a3b8;">Przychod/lot (40 min)</div><div style="font-size:15px;font-weight:900;color:#10b981;" id="md-rev-val">$'+calcModRevenue(cfg,40).toLocaleString()+'</div></div></div>'
    +'<div id="md-warn" style="display:none;color:#ef4444;font-size:11px;margin-bottom:8px;padding:8px;background:rgba(239,68,68,0.1);border-radius:8px;text-align:center;"></div>'
    +'<button onclick="applySeatsNew()" style="width:100%;padding:12px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">&#10003; Zastosuj uklad</button>';

  document.getElementById('modal').style.display='flex';
  modUpdateSeats();
}

function calcModRevenue(cfg,mins) {
  return Math.round((cfg.first||0)*mins*4.0+(cfg.prem||0)*mins*3.0+(cfg.biz||0)*mins*2.0+(cfg.eco||0)*mins*1.6);
}

function modUpdateSeats() {
  var ac=G.fleet.filter(function(a){return a.id===window._modAcId;})[0]; if(!ac) return;
  var totalSeats=ac.seats||150;
  var first=parseInt(document.getElementById('md-first').value)||0;
  var prem=parseInt(document.getElementById('md-prem').value)||0;
  var biz=parseInt(document.getElementById('md-biz').value)||0;
  var slotsUsed=first*4+prem*3+biz*2;
  var eco=Math.max(0,totalSeats-slotsUsed);
  document.getElementById('md-first-val').textContent=first;
  document.getElementById('md-prem-val').textContent=prem;
  document.getElementById('md-biz-val').textContent=biz;
  document.getElementById('md-eco-val').textContent=eco;
  var pct=Math.min(100,Math.round(slotsUsed/totalSeats*100));
  var bar=document.getElementById('md-slots-bar');
  var usedEl=document.getElementById('md-slots-used');
  if(bar){bar.style.width=pct+'%';bar.style.background=pct>95?'#ef4444':pct>75?'#f97316':'linear-gradient(90deg,#ffd700,#06b6d4)';}
  if(usedEl) usedEl.textContent=slotsUsed;
  var warn=document.getElementById('md-warn');
  if(slotsUsed>totalSeats){warn.style.display='block';warn.textContent='Przekroczono pojemnosc!';}
  else warn.style.display='none';
  var route=ac.routeId?G.routes.filter(function(r){return r.id===ac.routeId;})[0]:null;
  var mins=route?(route.durationMin||40):40;
  var rev=document.getElementById('md-rev-val');
  if(rev) rev.textContent='$'+calcModRevenue({first:first,prem:prem,biz:biz,eco:eco},mins).toLocaleString();
}

function applySeatsNew() {
  var ac=G.fleet.filter(function(a){return a.id===window._modAcId;})[0]; if(!ac) return;
  var totalSeats=ac.seats||150;
  var first=parseInt(document.getElementById('md-first').value)||0;
  var prem=parseInt(document.getElementById('md-prem').value)||0;
  var biz=parseInt(document.getElementById('md-biz').value)||0;
  var slotsUsed=first*4+prem*3+biz*2;
  var eco=Math.max(0,totalSeats-slotsUsed);
  if(slotsUsed>totalSeats){showMsg('Przekroczono pojemnosc!');return;}
  ac.config={first:first,prem:prem,biz:biz,eco:eco,total:totalSeats};
  var route=ac.routeId?G.routes.filter(function(r){return r.id===ac.routeId;})[0]:null;
  if(route){var mins=route.durationMin||40;route.revenue=calcModRevenue(ac.config,mins);}
  save(); updateHUD(); closeModal();
  showMsg('Uklad zapisany! 1kl:'+first+' Prem:'+prem+' Biz:'+biz+' Eko:'+eco);
}

function goBackToFlota(){ closeModal(); }
