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
  var hasLicence = G.cargolicence === true;
  var CARGO_PRICE = 20000000;
  var CARGO_PTS   = 500;
  var canAfford   = G.cash >= CARGO_PRICE && (G.points||0) >= CARGO_PTS;

  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#e0f0ff;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;line-height:1.4;font-family:Arial,sans-serif;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:800;color:#e0f0ff;">Cargo</div>'
    +'</div>'

    // Status licencji
    +(hasLicence
      ? '<div style="border-radius:13px;padding:16px;background:rgba(245,166,35,0.06);border:1px solid rgba(245,166,35,0.2);margin-bottom:14px;text-align:center;">'
        +'<div style="font-size:32px;margin-bottom:8px;">📦</div>'
        +'<div style="font-size:14px;font-weight:800;color:#f5a623;margin-bottom:4px;">Masz licencję Cargo!</div>'
        +'<div style="font-size:11px;color:#5580a0;">Flota cargo będzie dostępna wkrótce.</div>'
        +'</div>'
      : '<div style="border-radius:13px;padding:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);margin-bottom:14px;">'
        +'<div style="font-size:28px;margin-bottom:10px;text-align:center;">📦</div>'
        +'<div style="font-size:14px;font-weight:800;color:#e0f0ff;margin-bottom:6px;text-align:center;">Licencja Cargo</div>'
        +'<div style="font-size:11px;color:#5580a0;line-height:1.6;margin-bottom:14px;text-align:center;">'
        +'Odblokuj dostęp do transportu towarów.<br>Samoloty cargo pojawią się wkrótce po zakupie licencji.'
        +'</div>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">'
        +'<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
        +'<div style="font-size:10px;color:#5580a0;margin-bottom:2px;">Koszt</div>'
        +'<div style="font-size:14px;font-weight:800;color:'+(G.cash>=CARGO_PRICE?'#00e676':'#e63946')+';">$'+CARGO_PRICE.toLocaleString()+'</div>'
        +'</div>'
        +'<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
        +'<div style="font-size:10px;color:#5580a0;margin-bottom:2px;">Punkty</div>'
        +'<div style="font-size:14px;font-weight:800;color:'+((G.points||0)>=CARGO_PTS?'#00e676':'#e63946')+';">'+CARGO_PTS+' PKT</div>'
        +'</div>'
        +'</div>'
        +(canAfford
          ? '<button onclick="buyCargoLicence()" style="width:100%;padding:12px;background:linear-gradient(135deg,#e67e22,#f5a623);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:800;font-family:Arial,sans-serif;cursor:pointer;box-shadow:0 3px 12px rgba(245,166,35,0.3);">📦 Kup licencję Cargo</button>'
          : '<div style="padding:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;text-align:center;font-size:11px;color:#5580a0;">Potrzebujesz $'+CARGO_PRICE.toLocaleString()+' i '+CARGO_PTS+' PKT</div>'
        )
        +'</div>'
    )

    // Co będzie dostępne
    +'<div style="font-size:9px;color:#5580a0;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Planowane modele cargo</div>'
    +'<div style="display:flex;gap:7px;flex-wrap:wrap;">'
    +'<div style="padding:6px 12px;background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.18);border-radius:20px;font-size:11px;color:#f5a623;">📦 A330-200F</div>'
    +'<div style="padding:6px 12px;background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.18);border-radius:20px;font-size:11px;color:#f5a623;">📦 747-8F</div>'
    +'<div style="padding:6px 12px;background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.18);border-radius:20px;font-size:11px;color:#f5a623;">📦 777F</div>'
    +'<div style="padding:6px 12px;background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.18);border-radius:20px;font-size:11px;color:#f5a623;">📦 737-800BCF</div>'
    +'<div style="padding:6px 12px;background:rgba(245,166,35,0.07);border:1px solid rgba(245,166,35,0.18);border-radius:20px;font-size:11px;color:#f5a623;">📦 An-124</div>'
    +'</div>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function buyCargoLicence() {
  var CARGO_PRICE = 20000000;
  var CARGO_PTS   = 500;
  if(G.cargolicence) { showMsg('Już masz licencję cargo!'); return; }
  if(G.cash < CARGO_PRICE) { showMsg('Za mało gotówki!'); return; }
  if((G.points||0) < CARGO_PTS) { showMsg('Za mało punktów! Potrzebujesz '+CARGO_PTS+' PKT'); return; }
  G.cash -= CARGO_PRICE;
  G.points = (G.points||0) - CARGO_PTS;
  G.cargolicence = true;
  save(); updateHUD(); updateRankingValue();
  showMsg('📦 Licencja Cargo zakupiona! Flota cargo wkrótce dostępna.');
  openCargoShop();
}

function openNewAircraftShop() {
  var brands = Object.keys(AIRCRAFT_CATALOG);
  var LOGOS = {
    'Boeing': 'img/logo.boeing.png',
    'Airbus': 'img/AIRBUS_Blue.png',
    'Embraer': 'img/embraer-vector-logo-removebg-preview.png'
  };
  var LOGO_BG = {'Airbus':'#001f5b','Boeing':'#fff','Embraer':'#111'};
  var BRAND_COLOR = {
    'Boeing':'#1f5ea8','Airbus':'#003087','Embraer':'#00a651',
    'Bombardier':'#d4372c','ATR':'#4a90e2','Suchoj':'#c0392b',
    'Irkut':'#e74c3c','Iliuszyn':'#9b59b6','Tupolew':'#e67e22',
    'McDonnell Douglas':'#16a085','Fokker':'#f39c12','British Aerospace':'#8e44ad',
    'Antonow':'#27ae60','Dassault':'#2980b9','DHC':'#1abc9c','COMAC':'#c0392b'
  };

  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="openShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#e0f0ff;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;line-height:1.4;font-family:Arial,sans-serif;">&#8592;</button>'
    +'<div style="flex:1;">'
    +'<div style="font-size:15px;font-weight:800;color:#e0f0ff;">Kup samolot</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:1px;">Saldo: <span style="color:#00e676;font-weight:700;">$'+Math.round(G.cash).toLocaleString()+'</span> &nbsp;&bull;&nbsp; Hangar: <span style="color:#00d4ff;font-weight:700;">'+G.fleet.length+'/'+getHangarCapacity()+'</span></div>'
    +'</div></div>'

    +'<div style="display:flex;gap:6px;margin-bottom:14px;">'
    +'<button onclick="openNewAircraftShop()" style="flex:1;padding:9px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;box-shadow:0 3px 12px rgba(0,212,255,0.3);">✈ Pasażerskie</button>'
    +'<button onclick="openCargoShop()" style="flex:1;padding:9px;background:rgba(245,166,35,0.08);border:1px solid rgba(245,166,35,0.25);border-radius:10px;color:#f5a623;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">📦 Cargo</button>'
    +'</div>'

    +'<div style="font-size:9px;color:#5580a0;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Wybierz producenta</div>';

  brands.forEach(function(brand) {
    var planes = AIRCRAFT_CATALOG[brand];
    var availablePlanes = planes.filter(function(p){return p.locked !== true;});
    var allLocked = availablePlanes.length === 0;
    var minPrice = availablePlanes.length ? Math.min.apply(null, availablePlanes.map(function(p){return p.price;})) : 0;
    var affordable = availablePlanes.filter(function(p){return G.cash>=p.price && G.level>=(p.level||1);}).length;
    var logo = LOGOS[brand];
    var logoBg = LOGO_BG[brand] || '#0d1b2a';
    var accent = BRAND_COLOR[brand] || '#5580a0';
    var abbr = brand.substring(0,3).toUpperCase();

    html +=
      '<div data-brand="'+brand+'" onclick="openManufacturerByName(this)" '
      +'style="display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:13px;'
      +'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
      +'border-left:3px solid '+accent+';margin-bottom:7px;cursor:pointer;" '
      +'onmouseover="this.style.background=\'rgba(255,255,255,0.065)\'" '
      +'onmouseout="this.style.background=\'rgba(255,255,255,0.03)\'">'
      // Logo box
      +(logo
        ?'<div style="width:66px;height:36px;background:'+logoBg+';border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:5px;box-sizing:border-box;">'
          +'<img src="'+logo+'" style="max-width:56px;max-height:26px;object-fit:contain;"></div>'
        :'<div style="width:66px;height:36px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
          +'<span style="font-size:11px;font-weight:800;color:'+accent+';letter-spacing:-0.5px;">'+abbr+'</span></div>'
      )
      // Brand info
      +'<div style="flex:1;min-width:0;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;margin-bottom:2px;">'+brand+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+planes.length+' modeli'+(minPrice>0?' &bull; od $'+Math.round(minPrice/1000000)+'M':'')+'</div>'
      +(affordable>0
        ?'<div style="display:inline-flex;align-items:center;gap:3px;margin-top:4px;padding:2px 8px;background:rgba(0,230,118,0.1);border:1px solid rgba(0,230,118,0.2);border-radius:20px;font-size:9px;font-weight:700;color:#00e676;">&#10003; '+affordable+' dostępnych</div>'
        :allLocked
          ?'<div style="margin-top:4px;font-size:9px;color:#5580a0;">&#128274; Wkrótce</div>'
          :''
      )
      +'</div>'
      // Chevron
      +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+accent+'" stroke-width="2.5" opacity="0.7"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}


function openManufacturer(brand) {
  var aircraft = AIRCRAFT_CATALOG[brand] || [];
  var LOGOS = {'Boeing':'img/logo.boeing.png','Airbus':'img/AIRBUS_Blue.png','Embraer':'img/embraer-vector-logo-removebg-preview.png'};
  var LOGO_BG = {'Airbus':'#001f5b','Boeing':'#fff','Embraer':'#111'};
  var BRAND_COLOR = {
    'Boeing':'#1f5ea8','Airbus':'#003087','Embraer':'#00a651',
    'Bombardier':'#d4372c','ATR':'#4a90e2','Suchoj':'#c0392b',
    'Irkut':'#e74c3c','Iliuszyn':'#9b59b6','Tupolew':'#e67e22',
    'McDonnell Douglas':'#16a085','Fokker':'#f39c12','British Aerospace':'#8e44ad',
    'Antonow':'#27ae60','Dassault':'#2980b9','DHC':'#1abc9c','COMAC':'#c0392b'
  };
  var logo = LOGOS[brand];
  var accent = BRAND_COLOR[brand] || '#00d4ff';
  var availCount = aircraft.filter(function(a){return !a.locked;}).length;
  var affordCount = aircraft.filter(function(a){return !a.locked && G.cash>=a.price && G.level>=(a.level||1);}).length;

  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="openNewAircraftShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#e0f0ff;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;line-height:1.4;font-family:Arial,sans-serif;">&#8592;</button>'
    +(logo?'<div style="background:'+(LOGO_BG[brand]||'#0d1b2a')+';border-radius:8px;padding:4px 10px;flex-shrink:0;">'
      +'<img src="'+logo+'" style="height:22px;object-fit:contain;vertical-align:middle;"></div>':'')
    +'<div style="flex:1;min-width:0;">'
    +'<div style="font-size:15px;font-weight:800;color:#e0f0ff;">'+brand+'</div>'
    +'<div style="font-size:10px;color:#5580a0;">'+availCount+' modeli &bull; <span style="color:#00e676;">'+affordCount+' stać cię</span></div>'
    +'</div></div>';

  aircraft.forEach(function(ac) {
    var isLocked = ac.locked === true;
    var levelLocked = !isLocked && G.level < (ac.level||1);
    var tooExpensive = !isLocked && !levelLocked && G.cash < ac.price;
    var canBuy = !isLocked && !levelLocked && !tooExpensive;

    var statusBadge = '';
    if(isLocked)       statusBadge = '<span style="padding:2px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:20px;font-size:9px;color:#5580a0;white-space:nowrap;">&#128274; Wkrótce</span>';
    else if(canBuy)    statusBadge = '<span style="padding:2px 8px;background:rgba(0,230,118,0.1);border:1px solid rgba(0,230,118,0.25);border-radius:20px;font-size:9px;font-weight:700;color:#00e676;white-space:nowrap;">&#10003; Dostępny</span>';
    else if(levelLocked) statusBadge = '<span style="padding:2px 8px;background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.25);border-radius:20px;font-size:9px;font-weight:700;color:#f5a623;white-space:nowrap;">LVL '+ac.level+'</span>';
    else if(tooExpensive) statusBadge = '<span style="padding:2px 8px;background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.2);border-radius:20px;font-size:9px;color:#e63946;white-space:nowrap;">Za drogi</span>';

    html +=
      '<div style="border-radius:13px;overflow:hidden;margin-bottom:10px;'
      +'border:1px solid '+(isLocked?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.09)')+';'
      +'opacity:'+(isLocked?'0.5':'1')+'">'
      // Card header
      +'<div style="padding:10px 12px;background:rgba(255,255,255,0.04);display:flex;align-items:flex-start;justify-content:space-between;gap:8px;border-bottom:1px solid rgba(255,255,255,0.05);border-left:3px solid '+accent+'">'
      +'<div style="min-width:0;">'
      +'<div style="font-size:14px;font-weight:800;color:'+(isLocked?'#5580a0':'#e0f0ff')+';margin-bottom:2px;">'+(isLocked?'&#128274; ':'')+ac.model+'</div>'
      +'<div style="font-size:10px;color:#5580a0;line-height:1.3;">'+ac.desc+'</div>'
      +'</div>'
      +statusBadge
      +'</div>'
      // Aircraft image
      +(ac.img?'<img src="'+ac.img+'" style="width:100%;max-height:100px;object-fit:cover;object-position:center;background:#060e17;display:block;">':'')
      // Specs + action
      +'<div style="padding:10px 12px;background:rgba(0,0,0,0.25);">'
      +'<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:'+(isLocked?'0':'10px')+'">'
      +'<div style="padding:4px 8px;background:rgba(0,212,255,0.07);border:1px solid rgba(0,212,255,0.14);border-radius:7px;font-size:10px;color:#7dd3fc;">&#128186; '+ac.seats+' miejsc</div>'
      +'<div style="padding:4px 8px;background:rgba(0,212,255,0.07);border:1px solid rgba(0,212,255,0.14);border-radius:7px;font-size:10px;color:#7dd3fc;">&#9992; '+ac.range+' km</div>'
      +'<div style="padding:4px 8px;background:rgba(0,212,255,0.07);border:1px solid rgba(0,212,255,0.14);border-radius:7px;font-size:10px;color:#7dd3fc;">'+ac.engines+'</div>'
      +'</div>'
      +(!isLocked
        ? (canBuy
          ? '<button data-model="'+ac.model+'" onclick="buyAircraftByEl(this)" style="width:100%;padding:10px;background:linear-gradient(135deg,'+accent+','+accent+'cc);border:none;border-radius:9px;color:#fff;font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;box-shadow:0 3px 10px rgba(0,0,0,0.35);">Kup za $'+ac.price.toLocaleString()+'</button>'
          : levelLocked
            ? '<div style="padding:9px 12px;background:rgba(245,166,35,0.05);border:1px solid rgba(245,166,35,0.15);border-radius:9px;text-align:center;font-size:11px;color:#f5a623;">Wymagany poziom '+ac.level+'</div>'
            : '<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 12px;background:rgba(230,57,70,0.05);border:1px solid rgba(230,57,70,0.12);border-radius:9px;">'
              +'<span style="font-size:11px;color:#e63946;">Za mało gotówki</span>'
              +'<span style="font-size:12px;font-weight:700;color:#e0f0ff;">$'+ac.price.toLocaleString()+'</span>'
              +'</div>'
        )
        : ''
      )
      +'</div></div>';
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
