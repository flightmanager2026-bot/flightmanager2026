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

function openShop() {
  var html =
    '<div style="font-size:15px;font-weight:900;color:#f1f5f9;margin-bottom:16px;">&#128722; Sklep</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">'
    +'<div onclick="openNewAircraftShop()" style="background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(6,182,212,0.08));border:1px solid rgba(6,182,212,0.25);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:8px;">&#9992;</div>'
    +'<div style="font-size:13px;font-weight:700;color:#06b6d4;">Samoloty</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:3px;">'+Object.values(AIRCRAFT_CATALOG).reduce(function(s,a){return s+a.length;},0)+' modeli</div>'
    +'</div>'
    +'<div onclick="openSlotShop()" style="background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(139,92,246,0.06));border:1px solid rgba(139,92,246,0.25);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:8px;">&#127915;</div>'
    +'<div style="font-size:13px;font-weight:700;color:#8b5cf6;">Sloty</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:3px;">Dostep do lotnisk</div>'
    +'</div>'
    +'<div onclick="openCargoShop()" style="background:linear-gradient(135deg,rgba(249,115,22,0.1),rgba(249,115,22,0.04));border:1px solid rgba(249,115,22,0.2);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:8px;">&#128230;</div>'
    +'<div style="font-size:13px;font-weight:700;color:#f97316;">Cargo</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:3px;">Wkrotce</div>'
    +'</div>'
    +'<div onclick="openTopUp()" style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(16,185,129,0.04));border:1px solid rgba(16,185,129,0.2);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:8px;">&#128179;</div>'
    +'<div style="font-size:13px;font-weight:700;color:#10b981;">Doladuj</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:3px;">Kup $ i PKT</div>'
    +'</div>'
    +'<div onclick="openDemandShop()" style="background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(236,72,153,0.06));border:1px solid rgba(139,92,246,0.25);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:6px;">&#128200;</div>'
    +'<div style="font-size:13px;font-weight:700;color:#8b5cf6;">Popyt</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:3px;">Obłożenie tras</div>'
    +'</div>'
    +'<div onclick="openUsedMarket()" style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(6,182,212,0.06));border:1px solid rgba(16,185,129,0.25);border-radius:14px;padding:16px;cursor:pointer;text-align:center;">'
    +'<div style="font-size:32px;margin-bottom:6px;">&#9992;</div>'
    +'<div style="font-size:13px;font-weight:700;color:#10b981;">Rynek Używanych</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:3px;">Kup/sprzedaj samoloty</div>'
    +'</div>'
    +'</div>'
    +'<div style="background:linear-gradient(135deg,rgba(255,215,0,0.06),rgba(249,115,22,0.04));border:1px solid rgba(255,215,0,0.2);border-radius:14px;padding:14px;margin-bottom:12px;cursor:pointer;" onclick="showRewardedAdShop()">'
    +'<div style="display:flex;align-items:center;gap:12px;">'
    +'<div style="font-size:28px;">&#127916;</div>'
    +'<div style="flex:1;"><div style="font-size:13px;font-weight:700;color:#ffd700;">Obejrzyj reklame - odbierz nagrode</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:2px;">Losowa nagroda za kazdy obejrzany film</div></div>'
    +'<div style="padding:6px 12px;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.3);border-radius:8px;font-size:11px;font-weight:700;color:#ffd700;">&#9654; Play</div>'
    +'</div></div>'
    +'<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:12px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;">'
    +'<div style="font-size:11px;color:#94a3b8;">Twoje saldo</div>'
    +'<div style="font-size:14px;font-weight:700;color:#10b981;">$'+Math.round(G.cash).toLocaleString()+'</div>'
    +'</div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">'
    +'<div style="font-size:11px;color:#94a3b8;">Hangar</div>'
    +'<div style="font-size:12px;font-weight:700;color:#06b6d4;">'+G.fleet.length+'/'+getHangarCapacity()+' samolotow</div>'
    +'</div></div>';
  document.getElementById('modal-body').innerHTML=html;
  document.getElementById('modal').style.display='flex';
}


/* ===== SYSTEM ODBLOKOWYWANIA KRAJOW ===== */
function getUnlockedCountries() {
  if(!G.homeAirport) return [];
  var lvl = G.level || 1;
  var unlocked = [];

  // LVL 1 - Polska
  if(lvl >= 1) unlocked = unlocked.concat(['Polska']);

  // LVL 2 - bezposredni sasiedzi
  if(lvl >= 2) unlocked = unlocked.concat([
    'Niemcy','Czechy','Slowacja','Ukraina','Bialorus','Litwa','Lotwa','Rosja','Kaliningrad'
  ]);

  // LVL 3 - szersza Europa Centralna
  if(lvl >= 3) unlocked = unlocked.concat([
    'Austria','Holandia','Belgia','Dania','Wegry','Rumunia','Estonia','Szwecja'
  ]);

  // LVL 4 - Europa Zachodnia
  if(lvl >= 4) unlocked = unlocked.concat([
    'Francja','Szwajcaria','Wlochy','Norwegia','Finlandia','Luksemburg','Serbia','Chorwacja','Slowenia','Bulgaria'
  ]);

  // LVL 5 - Europa Poludniowa i Wyspy
  if(lvl >= 5) unlocked = unlocked.concat([
    'Hiszpania','Portugalia','UK','Irlandia','Grecja','Albania','Bosna','Macedonia','Czarnogora','Kosowo','Malta','Cypr','Islandia'
  ]);

  // LVL 8 - Bliski Wschod i Afryka Polnocna
  if(lvl >= 8) unlocked = unlocked.concat([
    'Turcja','UAE','Qatar','Arabia Saudyjska','Egipt','Maroko','Tunezja','Algieria','Izrael','Jordan','Kuwait','Bahrajn','Oman','Liban'
  ]);

  // LVL 15 - Azja
  if(lvl >= 15) unlocked = unlocked.concat([
    'Indie','Tajlandia','Singapur','Japonia','Korea','Chiny','Malezja','Indonezja','Wietnam','Filipiny','Sri Lanka','Nepal','Pakistan','Bangladesz','Kambodza','Myanmar'
  ]);

  // LVL 25 - Ameryki
  if(lvl >= 25) unlocked = unlocked.concat([
    'USA','Kanada','Meksyk','Brazylia','Argentyna','Chile','Kolumbia','Peru','Wenezuela','Kuba','Panama','Kostaryka','Jamajka','Dominikana'
  ]);

  // LVL 35 - Afryka Subsaharyjska i Oceania
  if(lvl >= 35) unlocked = unlocked.concat([
    'RPA','Etiopia','Nigeria','Kenia','Tanzania','Ghana','Senegal','Australia','Nowa Zelandia','Fidzi'
  ]);

  // LVL 50 - reszta swiata
  if(lvl >= 50) {
    if(typeof ADB !== 'undefined') {
      ADB.forEach(function(ap){
        if(ap.country && unlocked.indexOf(ap.country) < 0) unlocked.push(ap.country);
      });
    }
  }

  return unlocked;
}

function getSlotCost(country) {
  if(country === 'Polska') return 50000;
  var europaBliska = ['Niemcy','Czechy','Slowacja','Ukraina','Bialorus','Litwa','Lotwa','Estonia','Rosja','Austria','Holandia','Belgia','Dania','Wegry','Rumunia','Szwecja'];
  if(europaBliska.indexOf(country) >= 0) return 80000;
  var europaZach = ['Francja','Szwajcaria','Wlochy','Norwegia','Finlandia','Luksemburg','Serbia','Chorwacja','Slowenia','Bulgaria','Hiszpania','Portugalia','UK','Irlandia','Grecja','Albania','Bosna','Macedonia','Czarnogora','Kosowo','Malta','Cypr','Islandia'];
  if(europaZach.indexOf(country) >= 0) return 120000;
  var bliskiWschod = ['Turcja','UAE','Qatar','Arabia Saudyjska','Egipt','Maroko','Tunezja','Algieria','Izrael','Jordan','Kuwait','Bahrajn','Oman','Liban'];
  if(bliskiWschod.indexOf(country) >= 0) return 200000;
  var azja = ['Indie','Tajlandia','Singapur','Japonia','Korea','Chiny','Malezja','Indonezja','Wietnam','Filipiny','Sri Lanka','Nepal','Pakistan','Bangladesz','Kambodza','Myanmar'];
  if(azja.indexOf(country) >= 0) return 350000;
  var ameryki = ['USA','Kanada','Meksyk','Brazylia','Argentyna','Chile','Kolumbia','Peru','Wenezuela','Kuba','Panama','Kostaryka','Jamajka','Dominikana'];
  if(ameryki.indexOf(country) >= 0) return 500000;
  var afrykaOceania = ['RPA','Etiopia','Nigeria','Kenia','Tanzania','Ghana','Senegal','Australia','Nowa Zelandia','Fidzi'];
  if(afrykaOceania.indexOf(country) >= 0) return 400000;
  return 250000;
}

function getCountryRequiredLevel(country) {
  if(country === 'Polska') return 1;
  var l2 = ['Niemcy','Czechy','Slowacja','Ukraina','Bialorus','Litwa','Lotwa','Rosja','Kaliningrad'];
  if(l2.indexOf(country) >= 0) return 2;
  var l3 = ['Austria','Holandia','Belgia','Dania','Wegry','Rumunia','Estonia','Szwecja'];
  if(l3.indexOf(country) >= 0) return 3;
  var l4 = ['Francja','Szwajcaria','Wlochy','Norwegia','Finlandia','Luksemburg','Serbia','Chorwacja','Slowenia','Bulgaria'];
  if(l4.indexOf(country) >= 0) return 4;
  var l5 = ['Hiszpania','Portugalia','UK','Irlandia','Grecja','Albania','Bosna','Macedonia','Czarnogora','Kosowo','Malta','Cypr','Islandia'];
  if(l5.indexOf(country) >= 0) return 5;
  var l8 = ['Turcja','UAE','Qatar','Arabia Saudyjska','Egipt','Maroko','Tunezja','Algieria','Izrael','Jordan','Kuwait','Bahrajn','Oman','Liban'];
  if(l8.indexOf(country) >= 0) return 8;
  var l15 = ['Indie','Tajlandia','Singapur','Japonia','Korea','Chiny','Malezja','Indonezja','Wietnam','Filipiny','Sri Lanka','Nepal','Pakistan','Bangladesz','Kambodza','Myanmar'];
  if(l15.indexOf(country) >= 0) return 15;
  var l25 = ['USA','Kanada','Meksyk','Brazylia','Argentyna','Chile','Kolumbia','Peru','Wenezuela','Kuba','Panama','Kostaryka','Jamajka','Dominikana'];
  if(l25.indexOf(country) >= 0) return 25;
  var l35 = ['RPA','Etiopia','Nigeria','Kenia','Tanzania','Ghana','Senegal','Australia','Nowa Zelandia','Fidzi'];
  if(l35.indexOf(country) >= 0) return 35;
  return 50;
}

function openSlotShop() {
  var lvl = G.level || 1;
  var unlocked = getUnlockedCountries();
  var countries = {};
  if(typeof ADB !== 'undefined') {
    ADB.forEach(function(ap){
      var c = ap.country || 'Unknown';
      if(!countries[c]) countries[c] = {airports:[], unlocked:false, reqLvl:1};
      countries[c].airports.push(ap);
    });
  }
  Object.keys(countries).forEach(function(c){
    countries[c].unlocked = unlocked.indexOf(c) >= 0;
    countries[c].reqLvl = getCountryRequiredLevel(c);
  });
  var sorted = Object.keys(countries).sort(function(a,b){
    if(countries[a].unlocked && !countries[b].unlocked) return -1;
    if(!countries[a].unlocked && countries[b].unlocked) return 1;
    if(!countries[a].unlocked && !countries[b].unlocked) return countries[a].reqLvl - countries[b].reqLvl;
    return a.localeCompare(b);
  });

  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
    +'<button onclick="openShop()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#06b6d4;">KUP SLOT</div></div>'
    +'<div style="background:rgba(6,182,212,0.06);border:1px solid rgba(6,182,212,0.15);border-radius:10px;padding:10px 12px;margin-bottom:12px;font-size:11px;color:#94a3b8;">'
    +'LVL <span style="color:#f97316;font-weight:700;">'+lvl+'</span> &bull; '
    +'Odblokowane: <span style="color:#10b981;font-weight:700;">'+unlocked.length+'</span> krajow &bull; '
    +'Azja: LVL 15 &bull; USA/Kanada: LVL 25 &bull; Australia: LVL 35'
    +'</div>';

  var lastReqLvl = -1;
  sorted.forEach(function(c){
    var info = countries[c];
    var isUnlocked = info.unlocked;
    var reqLvl = info.reqLvl;
    var available = info.airports.filter(function(ap){
      return G.slots.indexOf(ap.icao)<0 && !(G.homeAirport&&G.homeAirport.icao===ap.icao);
    }).length;
    var cost = getSlotCost(c);
    var flag = '&#127758;';
    if(typeof WORLD_CITIES!=='undefined'&&WORLD_CITIES&&WORLD_CITIES[c]) flag = WORLD_CITIES[c].flag || '&#127758;';

    if(!isUnlocked && reqLvl !== lastReqLvl) {
      lastReqLvl = reqLvl;
      html += '<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;margin:10px 0 6px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.05);">ODBLOKUJ PRZY LVL '+reqLvl+'</div>';
    }

    html += '<div '+(isUnlocked?'data-c="'+c+'" onclick="openCountrySlots(this.dataset.c)"':'')
      +' style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;'
      +'background:'+(isUnlocked?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.01)')+';'
      +'border:1px solid '+(isUnlocked?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.03)')+';'
      +'margin-bottom:5px;cursor:'+(isUnlocked?'pointer':'default')+';opacity:'+(isUnlocked?'1':'0.45')+'">'
      +'<span style="font-size:20px;">'+flag+'</span>'
      +'<div style="flex:1;">'
      +'<div style="font-size:13px;font-weight:700;color:'+(isUnlocked?'#f1f5f9':'#94a3b8')+';">'+c+'</div>'
      +'<div style="font-size:10px;color:#94a3b8;">'+available+' lotnisk &bull; $'+cost.toLocaleString()+'/slot</div>'
      +'</div>'
      +(isUnlocked
        ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
        : '<span style="font-size:10px;font-weight:700;color:#ef4444;">LVL '+reqLvl+'</span>'
      )+'</div>';
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function openCountrySlots(country) {
  var unlocked = getUnlockedCountries();
  if(unlocked.indexOf(country) < 0) { showMsg('Ten kraj jest zablokowany!'); return; }
  var cost = getSlotCost(country);
  var flag = '&#127758;';
  if(typeof WORLD_CITIES!=='undefined'&&WORLD_CITIES&&WORLD_CITIES[country]) flag = WORLD_CITIES[country].flag || '&#127758;';

  var slots = [];
  if(typeof ADB!=='undefined'){
    ADB.forEach(function(ap){
      if(ap.country !== country) return;
      if(G.slots.indexOf(ap.icao)>=0||(G.homeAirport&&G.homeAirport.icao===ap.icao)) return;
      slots.push(ap);
    });
  }

  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openSlotShop()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<span style="font-size:20px;">'+flag+'</span>'
    +'<div style="font-size:15px;font-weight:700;color:#06b6d4;">'+country+'</div></div>';

  if(!slots.length) {
    html += '<div style="padding:20px;text-align:center;color:#94a3b8;">Brak dostepnych lotnisk lub wszystkie kupione</div>';
  } else {
    slots.forEach(function(ap){
      html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">'
        +'<div><div style="font-size:13px;font-weight:600;color:#f1f5f9;">'+ap.icao+' - '+ap.city+'</div>'
        +'<div style="font-size:10px;color:#94a3b8;">$'+cost.toLocaleString()+'</div></div>'
        +'<button data-icao="'+ap.icao+'" data-cost="'+cost+'" onclick="buySlotByEl(this)" '
        +'style="padding:6px 14px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;border-radius:6px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Kup</button>'
        +'</div>';
    });
  }
  document.getElementById('modal-body').innerHTML = html;
}

function buySlotByEl(el){ buySlot(el.dataset.icao, parseInt(el.dataset.cost)); }

function buySlot(icao, cost) {
  if(G.cash < cost){ showMsg('Za malo gotowki!'); return; }
  G.cash -= cost;
  G.slots.push(icao);
  var ap=null;
  if(typeof ADB!=='undefined') ADB.forEach(function(a){if(a.icao===icao)ap=a;});
  if(ap) G.airports.push({id:'AP_'+icao,name:ap.city,icao:icao,city:ap.city,country:ap.country,lat:ap.lat,lng:ap.lng,isHome:false,level:1});
  save(); updateHUD();
  if(typeof renderMarkers==='function') renderMarkers();
  closeModal();
  showMsg('Kupiono slot '+icao+'!');
}

/* ===== CARGO ===== */
function openCargoShop() {
  var hasLicence = G.cargolicence === true;
  var CARGO_PRICE = 20000000;
  var CARGO_PTS = 500;
  var canAfford = G.cash >= CARGO_PRICE && (G.points||0) >= CARGO_PTS;
  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#f1f5f9;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;line-height:1.4;font-family:Arial,sans-serif;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:800;color:#f1f5f9;">Cargo</div></div>'
    +(hasLicence
      ? '<div style="border-radius:13px;padding:16px;background:rgba(249,115,22,0.06);border:1px solid rgba(249,115,22,0.2);margin-bottom:14px;text-align:center;">'
        +'<div style="font-size:32px;margin-bottom:8px;">&#128230;</div>'
        +'<div style="font-size:14px;font-weight:800;color:#f97316;margin-bottom:4px;">Masz licencje Cargo!</div>'
        +'<div style="font-size:11px;color:#94a3b8;">Flota cargo bedzie dostepna wkrotce.</div></div>'
      : '<div style="border-radius:13px;padding:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);margin-bottom:14px;">'
        +'<div style="font-size:28px;margin-bottom:10px;text-align:center;">&#128230;</div>'
        +'<div style="font-size:14px;font-weight:800;color:#f1f5f9;margin-bottom:6px;text-align:center;">Licencja Cargo</div>'
        +'<div style="font-size:11px;color:#94a3b8;line-height:1.6;margin-bottom:14px;text-align:center;">Odblokuj dostep do transportu towarow.</div>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">'
        +'<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
        +'<div style="font-size:10px;color:#94a3b8;margin-bottom:2px;">Koszt</div>'
        +'<div style="font-size:14px;font-weight:800;color:'+(G.cash>=CARGO_PRICE?'#10b981':'#ef4444')+';">$'+CARGO_PRICE.toLocaleString()+'</div></div>'
        +'<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;text-align:center;">'
        +'<div style="font-size:10px;color:#94a3b8;margin-bottom:2px;">Punkty</div>'
        +'<div style="font-size:14px;font-weight:800;color:'+((G.points||0)>=CARGO_PTS?'#10b981':'#ef4444')+';">'+CARGO_PTS+' PKT</div></div>'
        +'</div>'
        +(canAfford
          ? '<button onclick="buyCargoLicence()" style="width:100%;padding:12px;background:linear-gradient(135deg,#e67e22,#f97316);border:none;border-radius:10px;color:#fff;font-size:13px;font-weight:800;font-family:Arial,sans-serif;cursor:pointer;">&#128230; Kup licencje Cargo</button>'
          : '<div style="padding:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;text-align:center;font-size:11px;color:#94a3b8;">Potrzebujesz $'+CARGO_PRICE.toLocaleString()+' i '+CARGO_PTS+' PKT</div>'
        )+'</div>'
    )
    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Planowane modele cargo</div>'
    +'<div style="display:flex;gap:7px;flex-wrap:wrap;">'
    +'<div style="padding:6px 12px;background:rgba(249,115,22,0.07);border:1px solid rgba(249,115,22,0.18);border-radius:20px;font-size:11px;color:#f97316;">&#128230; A330-200F</div>'
    +'<div style="padding:6px 12px;background:rgba(249,115,22,0.07);border:1px solid rgba(249,115,22,0.18);border-radius:20px;font-size:11px;color:#f97316;">&#128230; 747-8F</div>'
    +'<div style="padding:6px 12px;background:rgba(249,115,22,0.07);border:1px solid rgba(249,115,22,0.18);border-radius:20px;font-size:11px;color:#f97316;">&#128230; 777F</div>'
    +'<div style="padding:6px 12px;background:rgba(249,115,22,0.07);border:1px solid rgba(249,115,22,0.18);border-radius:20px;font-size:11px;color:#f97316;">&#128230; 737-800BCF</div>'
    +'</div>';
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function buyCargoLicence() {
  var CARGO_PRICE=20000000, CARGO_PTS=500;
  if(G.cargolicence){showMsg('Juz masz licencje cargo!');return;}
  if(G.cash<CARGO_PRICE){showMsg('Za malo gotowki!');return;}
  if((G.points||0)<CARGO_PTS){showMsg('Za malo punktow! Potrzebujesz '+CARGO_PTS+' PKT');return;}
  G.cash-=CARGO_PRICE; G.points=(G.points||0)-CARGO_PTS; G.cargolicence=true;
  save(); updateHUD();
  showMsg('Licencja Cargo zakupiona!');
  openCargoShop();
}

/* ===== SAMOLOTY ===== */
function openNewAircraftShop() {
  var brands = Object.keys(AIRCRAFT_CATALOG);
  var LOGOS = {'Boeing':'img/logo.boeing.png','Airbus':'img/AIRBUS_Blue.png','Embraer':'img/embraer-vector-logo-removebg-preview.png'};
  var LOGO_BG = {'Airbus':'#fff','Boeing':'#fff','Embraer':'#fff','Bombardier':'#fff','ATR':'#fff','Suchoj':'#fff','McDonnell Douglas':'#fff','Fokker':'#fff','British Aerospace':'#fff','Antonow':'#fff','DHC':'#fff','COMAC':'#fff'};
  var BRAND_COLOR = {
    'Boeing':'#1f5ea8','Airbus':'#003087','Embraer':'#00a651',
    'Bombardier':'#d4372c','ATR':'#4a90e2','Suchoj':'#c0392b',
    'Irkut':'#e74c3c','Iliuszyn':'#9b59b6','Tupolew':'#e67e22',
    'McDonnell Douglas':'#16a085','Fokker':'#f39c12','British Aerospace':'#8e44ad',
    'Antonow':'#27ae60','Dassault':'#2980b9','DHC':'#1abc9c','COMAC':'#c0392b'
  };
  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="openShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#f1f5f9;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;line-height:1.4;font-family:Arial,sans-serif;">&#8592;</button>'
    +'<div style="flex:1;"><div style="font-size:15px;font-weight:800;color:#f1f5f9;">Kup samolot</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:1px;">Saldo: <span style="color:#10b981;font-weight:700;">$'+Math.round(G.cash).toLocaleString()+'</span> &nbsp;&bull;&nbsp; Hangar: <span style="color:#06b6d4;font-weight:700;">'+G.fleet.length+'/'+getHangarCapacity()+'</span></div>'
    +'</div></div>'
    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Wybierz producenta</div>';

  brands.forEach(function(brand) {
    var planes = AIRCRAFT_CATALOG[brand];
    var availablePlanes = planes.filter(function(p){return p.locked !== true;});
    var minPrice = availablePlanes.length ? Math.min.apply(null,availablePlanes.map(function(p){return p.price;})) : 0;
    var affordable = availablePlanes.filter(function(p){return G.cash>=p.price && G.level>=(p.level||1);}).length;
    var logo = LOGOS[brand];
    var logoBg = LOGO_BG[brand] || '#0f0f1a';
    var accent = BRAND_COLOR[brand] || '#94a3b8';
    var abbr = brand.substring(0,3).toUpperCase();

    html +=
      '<div data-brand="'+brand+'" onclick="openManufacturerByName(this)" '
      +'style="display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:13px;'
      +'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);'
      +'border-left:3px solid '+accent+';margin-bottom:7px;cursor:pointer;">'
      +(logo
        ?'<div style="width:66px;height:36px;background:'+logoBg+';border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;padding:5px;box-sizing:border-box;">'
          +'<img src="'+logo+'" style="max-width:56px;max-height:26px;object-fit:contain;"></div>'
        :'<div style="width:66px;height:36px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
          +'<span style="font-size:11px;font-weight:800;color:'+accent+';">'+abbr+'</span></div>'
      )
      +'<div style="flex:1;min-width:0;">'
      +'<div style="font-size:13px;font-weight:700;color:#f1f5f9;margin-bottom:2px;">'+brand+'</div>'
      +'<div style="font-size:10px;color:#94a3b8;">'+planes.length+' modeli'+(minPrice>0?' &bull; od $'+Math.round(minPrice/1000000)+'M':'')+'</div>'
      +(affordable>0?'<div style="display:inline-flex;align-items:center;gap:3px;margin-top:4px;padding:2px 8px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:20px;font-size:9px;font-weight:700;color:#10b981;">&#10003; '+affordable+' dostepnych</div>':'')
      +'</div>'
      +'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="'+accent+'" stroke-width="2.5" opacity="0.7"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function openManufacturer(brand) {
  var aircraft = AIRCRAFT_CATALOG[brand] || [];
  var LOGOS = {'Boeing':'img/logo.boeing.png','Airbus':'img/AIRBUS_Blue.png','Embraer':'img/embraer-vector-logo-removebg-preview.png'};
  var LOGO_BG = {'Airbus':'#fff','Boeing':'#fff','Embraer':'#fff','Bombardier':'#fff','ATR':'#fff','Suchoj':'#fff','McDonnell Douglas':'#fff','Fokker':'#fff','British Aerospace':'#fff','Antonow':'#fff','DHC':'#fff','COMAC':'#fff'};
  var BRAND_COLOR = {
    'Boeing':'#1f5ea8','Airbus':'#003087','Embraer':'#00a651',
    'Bombardier':'#d4372c','ATR':'#4a90e2','Suchoj':'#c0392b',
    'Irkut':'#e74c3c','Iliuszyn':'#9b59b6','Tupolew':'#e67e22',
    'McDonnell Douglas':'#16a085','Fokker':'#f39c12','British Aerospace':'#8e44ad',
    'Antonow':'#27ae60','Dassault':'#2980b9','DHC':'#1abc9c','COMAC':'#c0392b'
  };
  var logo = LOGOS[brand];
  var accent = BRAND_COLOR[brand] || '#06b6d4';
  var availCount = aircraft.filter(function(a){return !a.locked;}).length;
  var affordCount = aircraft.filter(function(a){return !a.locked&&G.cash>=a.price&&G.level>=(a.level||1);}).length;

  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="openNewAircraftShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#f1f5f9;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;line-height:1.4;font-family:Arial,sans-serif;">&#8592;</button>'
    +(logo?'<div style="background:'+(LOGO_BG[brand]||'#0f0f1a')+';border-radius:8px;padding:4px 10px;flex-shrink:0;"><img src="'+logo+'" style="height:22px;object-fit:contain;vertical-align:middle;"></div>':'')
    +'<div style="flex:1;min-width:0;">'
    +'<div style="font-size:15px;font-weight:800;color:#f1f5f9;">'+brand+'</div>'
    +'<div style="font-size:10px;color:#94a3b8;">'+availCount+' modeli &bull; <span style="color:#10b981;">'+affordCount+' stac cie</span></div>'
    +'</div></div>';

  aircraft.forEach(function(ac) {
    var isLocked = ac.locked === true;
    var levelLocked = !isLocked && G.level < (ac.level||1);
    var tooExpensive = !isLocked && !levelLocked && G.cash < ac.price;
    var canBuy = !isLocked && !levelLocked && !tooExpensive;

    var statusBadge = '';
    if(isLocked) statusBadge='<span style="padding:2px 8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:20px;font-size:9px;color:#94a3b8;white-space:nowrap;">&#128274; Wkrotce</span>';
    else if(canBuy) statusBadge='<span style="padding:2px 8px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);border-radius:20px;font-size:9px;font-weight:700;color:#10b981;white-space:nowrap;">&#10003; Dostepny</span>';
    else if(levelLocked) statusBadge='<span style="padding:2px 8px;background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);border-radius:20px;font-size:9px;font-weight:700;color:#f97316;white-space:nowrap;">LVL '+ac.level+'</span>';
    else if(tooExpensive) statusBadge='<span style="padding:2px 8px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:20px;font-size:9px;color:#ef4444;white-space:nowrap;">Za drogi</span>';

    html +=
      '<div style="border-radius:13px;overflow:hidden;margin-bottom:10px;border:1px solid '+(isLocked?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.09)')+';opacity:'+(isLocked?'0.5':'1')+'">'
      +'<div style="padding:10px 12px;background:rgba(255,255,255,0.04);display:flex;align-items:flex-start;justify-content:space-between;gap:8px;border-bottom:1px solid rgba(255,255,255,0.05);border-left:3px solid '+accent+'">'
      +'<div style="min-width:0;"><div style="font-size:14px;font-weight:800;color:'+(isLocked?'#94a3b8':'#f1f5f9')+';margin-bottom:2px;">'+(isLocked?'&#128274; ':'')+ac.model+'</div>'
      +'<div style="font-size:10px;color:#94a3b8;line-height:1.3;">'+ac.desc+'</div></div>'
      +statusBadge+'</div>'
      +(ac.img?'<img src="'+ac.img+'" style="width:100%;max-height:100px;object-fit:cover;object-position:center;background:#060e17;display:block;">':'')
      +'<div style="padding:10px 12px;background:rgba(0,0,0,0.25);">'
      +'<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:'+(isLocked?'0':'10px')+'">'
      +'<div style="padding:4px 8px;background:rgba(6,182,212,0.07);border:1px solid rgba(6,182,212,0.14);border-radius:7px;font-size:10px;color:#06b6d4;">&#128186; '+ac.seats+' miejsc</div>'
      +'<div style="padding:4px 8px;background:rgba(6,182,212,0.07);border:1px solid rgba(6,182,212,0.14);border-radius:7px;font-size:10px;color:#06b6d4;">&#9992; '+ac.range+' km</div>'
      +'<div style="padding:4px 8px;background:rgba(6,182,212,0.07);border:1px solid rgba(6,182,212,0.14);border-radius:7px;font-size:10px;color:#06b6d4;">'+ac.engines+'</div>'
      +'</div>'
      +(!isLocked
        ? (canBuy
          ? '<button data-model="'+ac.model+'" onclick="buyAircraftByEl(this)" style="width:100%;padding:10px;background:linear-gradient(135deg,'+accent+','+accent+'cc);border:none;border-radius:9px;color:#fff;font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Kup za $'+ac.price.toLocaleString()+'</button>'
          : levelLocked
            ? '<div style="padding:9px 12px;background:rgba(249,115,22,0.05);border:1px solid rgba(249,115,22,0.15);border-radius:9px;text-align:center;font-size:11px;color:#f97316;">Wymagany poziom '+ac.level+'</div>'
            : '<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 12px;background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.12);border-radius:9px;">'
              +'<span style="font-size:11px;color:#ef4444;">Za malo gotowki</span>'
              +'<span style="font-size:12px;font-weight:700;color:#f1f5f9;">$'+ac.price.toLocaleString()+'</span></div>'
        )
        :''
      )+'</div></div>';
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function buyAircraftByEl(el){ buyAircraft(el.getAttribute('data-model')); }

function buyAircraft(model) {
  var ac=null;
  Object.keys(AIRCRAFT_CATALOG).forEach(function(brand){AIRCRAFT_CATALOG[brand].forEach(function(a){if(a.model===model)ac=a;});});
  if(!ac) return;
  if(G.cash<ac.price){showMsg('Za malo gotowki!');return;}
  if(G.level<(ac.level||1)){showMsg('Za niski poziom! Wymagany LVL '+(ac.level||1));return;}
  var hangarCap=typeof getHangarCapacity==='function'?getHangarCapacity():10;
  if(G.fleet.length>=hangarCap){showMsg('Hangar pelny! ('+G.fleet.length+'/'+hangarCap+') Ulepsz hangar!');return;}
  G.cash-=ac.price;
  var acBrand='Unknown';
  Object.keys(AIRCRAFT_CATALOG).forEach(function(b){AIRCRAFT_CATALOG[b].forEach(function(a){if(a.model===model)acBrand=b;});});
  var reg=G.airline.iata+'-'+String(G.fleet.length+1).padStart(3,'0');
  G.fleet.push({id:'ac_'+Date.now(),model:ac.model,brand:acBrand,reg:reg,seats:ac.seats,range:ac.range||5000,status:'ground',routeId:null,config:{eco:ac.seats,biz:0,total:ac.seats}});
  save(); updateHUD(); closeModal();
  showMsg('Kupiono '+model+'!');
}

/* ===== REKLAMA / NAGRODA ===== */
function showRewardedAdShop() {
  var el=document.getElementById('ad-container');
  if(!el){doAdReward();return;}
  el.style.display='flex';
  try{(adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}
  var sec=5,timerEl=document.getElementById('ad-timer-txt'),closeBtn=document.getElementById('ad-close-btn');
  if(timerEl) timerEl.textContent='Zamknij za '+sec+'s';
  if(closeBtn){closeBtn.disabled=true;closeBtn.style.color='#94a3b8';closeBtn.style.cursor='not-allowed';closeBtn.style.background='rgba(255,255,255,0.04)';}
  var interval=setInterval(function(){
    sec--;
    if(timerEl) timerEl.textContent=sec>0?'Zamknij za '+sec+'s':'Mozesz zamknac!';
    if(sec<=0){
      clearInterval(interval);
      if(closeBtn){closeBtn.disabled=false;closeBtn.style.color='#fff';closeBtn.style.background='linear-gradient(135deg,#8b5cf6,#ec4899)';closeBtn.style.cursor='pointer';closeBtn.onclick=function(){closeAdAndReward();};}
    }
  },1000);
}

function closeAdAndReward(){
  var el=document.getElementById('ad-container');if(el)el.style.display='none';doAdReward();
}

function doAdReward(){
  var lvl=G.level||1;
  var lvlBonus=lvl*100000,lvlPts=50;
  G.cash+=lvlBonus; G.points=(G.points||0)+lvlPts;
  var rewardType=Math.random()<0.5?'cash':'points';
  var msg='Nagroda za LVL '+lvl+': +$'+lvlBonus.toLocaleString()+' +'+lvlPts+' PKT';
  if(rewardType==='cash'){var c=Math.round(1000+Math.random()*4000);G.cash+=c;msg+=' | Bonus: +$'+c.toLocaleString();}
  else{var p=Math.round(1+Math.random()*49);G.points+=p;msg+=' | Bonus: +'+p+' PKT';}
  save();updateHUD();showMsg(msg);
}

function resetGame(){localStorage.removeItem('sb_v3');location.reload();}
function saveSettings(){closeModal();showMsg('Zapisano!');}

/* ===== POPYT / OBLOZENIE ===== */
function openDemandShop() {
  if(typeof initDemand==='function') initDemand();
  var now = Date.now();
  var globalBoost = G.demandBoost && G.demandBoost['_global'];
  var boostActive = globalBoost && globalBoost.expires > now;
  var adUsedToday = G.demandAdUsed && (now - G.demandAdUsed) < 86400000;

  var timeLeft = function(expires) {
    var ms = Math.max(0, expires - now);
    var h = Math.floor(ms/3600000);
    var m = Math.floor((ms%3600000)/60000);
    return h+'h '+String(m).padStart(2,'0')+'m';
  };

  var currentOcc = 70;
  if(boostActive) currentOcc = Math.min(100, 70 + Math.round(globalBoost.pct*100));

  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#f1f5f9;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;font-family:Arial,sans-serif;">&#8592;</button>'
    +'<div style="flex:1;">'
    +'<div style="font-size:15px;font-weight:800;color:#f1f5f9;">Popyt pasażerski</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:1px;">Ulepsz obłożenie wszystkich tras</div>'
    +'</div></div>'

    // Aktualny stan
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;margin-bottom:14px;">'
    +'<div style="font-size:11px;color:#94a3b8;margin-bottom:10px;">AKTUALNE OBŁOŻENIE TRAS</div>'
    +'<div style="display:flex;align-items:center;gap:12px;">'
    +'<div style="flex:1;height:10px;background:rgba(255,255,255,0.08);border-radius:5px;overflow:hidden;">'
    +'<div style="height:100%;width:'+currentOcc+'%;background:linear-gradient(90deg,#8b5cf6,#ec4899);border-radius:5px;transition:width 0.5s;"></div>'
    +'</div>'
    +'<div style="font-size:20px;font-weight:900;color:#8b5cf6;min-width:50px;text-align:right;">'+currentOcc+'%</div>'
    +'</div>'
    +(boostActive
      ?'<div style="font-size:11px;color:#10b981;margin-top:8px;">✓ Boost aktywny — wygasa za '+timeLeft(globalBoost.expires)+'</div>'
      :'<div style="font-size:11px;color:#94a3b8;margin-top:8px;">Bazowe obłożenie 70% — kup boost aby zwiększyć</div>'
    )
    +'</div>'

    // Darmowa reklama
    +'<div style="background:rgba(255,215,0,0.06);border:1px solid rgba(255,215,0,0.2);border-radius:14px;padding:14px;margin-bottom:10px;">'
    +'<div style="display:flex;align-items:flex-start;gap:12px;">'
    +'<div style="font-size:32px;flex-shrink:0;">📺</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:14px;font-weight:800;color:#ffd700;">Reklama</div>'
    +'<div style="font-size:11px;color:#94a3b8;margin-top:2px;line-height:1.5;">+10% obłożenia na 5 godzin<br>Raz dziennie bezpłatnie</div>'
    +'<div style="margin-top:10px;">'
    +(adUsedToday
      ?'<div style="padding:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;text-align:center;font-size:12px;color:#94a3b8;">✓ Użyto dziś — reset o północy</div>'
      :'<button onclick="useDemandAdFromShop()" style="width:100%;padding:11px;background:linear-gradient(135deg,#f97316,#eab308);border:none;border-radius:10px;color:#000;font-size:13px;font-weight:800;font-family:Arial,sans-serif;cursor:pointer;">▶ Obejrzyj reklamę — GRATIS</button>'
    )
    +'</div></div></div></div>'

    // Płatny boost
    +'<div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.25);border-radius:14px;padding:14px;margin-bottom:10px;">'
    +'<div style="display:flex;align-items:flex-start;gap:12px;">'
    +'<div style="font-size:32px;flex-shrink:0;">💎</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:14px;font-weight:800;color:#8b5cf6;">Kampania reklamowa</div>'
    +'<div style="font-size:11px;color:#94a3b8;margin-top:2px;line-height:1.5;">+20% obłożenia na 12 godzin<br>Dotyczy wszystkich tras jednocześnie</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;">'
    +'<div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:10px;color:#94a3b8;margin-bottom:2px;">Koszt</div>'
    +'<div style="font-size:16px;font-weight:900;color:'+(G.cash>=50000?'#10b981':'#ef4444')+';">$50,000</div>'
    +'</div>'
    +'<div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:10px;text-align:center;">'
    +'<div style="font-size:10px;color:#94a3b8;margin-bottom:2px;">Efekt</div>'
    +'<div style="font-size:16px;font-weight:900;color:#8b5cf6;">+20% / 12h</div>'
    +'</div></div>'
    +'<button onclick="buyDemandBoostFromShop()" style="width:100%;padding:11px;margin-top:10px;background:'
    +(G.cash>=50000?'linear-gradient(135deg,#8b5cf6,#ec4899)':'rgba(255,255,255,0.05)')
    +';border:none;border-radius:10px;color:'+(G.cash>=50000?'#fff':'#94a3b8')+';font-size:13px;font-weight:800;font-family:Arial,sans-serif;cursor:'+(G.cash>=50000?'pointer':'not-allowed')+';font-family:Arial,sans-serif;">'
    +(G.cash>=50000?'💎 Kup kampanię':'🔒 Za mało gotówki')
    +'</button>'
    +'</div></div></div>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function useDemandAdFromShop() {
  if(typeof initDemand==='function') initDemand();
  var now = Date.now();
  if(G.demandAdUsed && (now - G.demandAdUsed) < 86400000) {
    showMsg('Reklama już użyta dziś!'); return;
  }
  G.demandAdUsed = now;
  if(!G.demandBoost) G.demandBoost = {};
  G.demandBoost['_global'] = { pct: 0.10, expires: now + 18000000 };
  save();
  showMsg('📺 +10% obłożenia przez 5h!');
  openDemandShop();
}

function buyDemandBoostFromShop() {
  if(typeof initDemand==='function') initDemand();
  var cost = 50000;
  if(G.cash < cost) { showMsg('Za mało gotówki!'); return; }
  G.cash -= cost;
  if(!G.demandBoost) G.demandBoost = {};
  G.demandBoost['_global'] = { pct: 0.20, expires: Date.now() + 43200000 };
  save(); updateHUD();
  showMsg('💎 +20% obłożenia przez 12h!');
  openDemandShop();
}

/* ===== RYNEK UZYWANYCH SAMOLOTOW ===== */

function openUsedMarket() {
  if(!G.usedMarket) G.usedMarket = [];
  // Wczytaj oferty z Firebase
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#f1f5f9;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;font-family:Arial,sans-serif;">&#8592;</button>'
    +'<div style="flex:1;">'
    +'<div style="font-size:15px;font-weight:800;color:#f1f5f9;">✈ Rynek Używanych</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:1px;">Sprzedaj lub kup samolot od innych graczy</div>'
    +'</div></div>'

    // Twoje samoloty do sprzedazy
    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;margin-bottom:8px;">SPRZEDAJ SWÓJ SAMOLOT</div>'
    +'<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;margin-bottom:14px;">';

  if(!G.fleet.length) {
    html += '<div style="font-size:12px;color:#94a3b8;text-align:center;padding:10px;">Brak samolotów do sprzedaży</div>';
  } else {
    html += '<div style="font-size:11px;color:#94a3b8;margin-bottom:10px;">Wybierz samolot i ustaw cenę:</div>'
      +'<select id="sell-ac-select" style="width:100%;padding:8px;background:#0a0a0a;border:1px solid rgba(139,92,246,0.3);border-radius:8px;color:#f1f5f9;font-size:12px;font-family:Arial,sans-serif;margin-bottom:8px;box-sizing:border-box;">'
      +'<option value="">-- Wybierz samolot --</option>';
    G.fleet.forEach(function(ac){
      if(ac.status==='flying') return;
      var val = getUsedValue(ac);
      html += '<option value="'+ac.id+'">'+ac.model+' ('+ac.reg+') — wycena $'+val.toLocaleString()+'</option>';
    });
    html += '</select>'
      +'<div style="display:flex;gap:8px;margin-bottom:8px;">'
      +'<input id="sell-price" type="number" placeholder="Twoja cena ($)" style="flex:1;padding:8px;background:#0a0a0a;border:1px solid rgba(139,92,246,0.3);border-radius:8px;color:#f1f5f9;font-size:12px;font-family:Arial,sans-serif;box-sizing:border-box;">'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
      +'<button onclick="sellAircraftNow()" style="padding:10px;background:linear-gradient(135deg,#10b981,#06b6d4);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">💰 Sprzedaj teraz<br><span style="font-size:10px;font-weight:400;opacity:0.8;">Natychmiastowa wypłata</span></button>'
      +'<button onclick="listAircraftForSale()" style="padding:10px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">🏪 Wystaw na rynek<br><span style="font-size:10px;font-weight:400;opacity:0.8;">Inni gracze kupią</span></button>'
      +'</div>';
  }
  html += '</div>';

  // Oferty innych graczy
  html += '<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;margin-bottom:8px;">OFERTY INNYCH GRACZY</div>';

  if(_fbDb) {
    html += '<div id="used-market-list" style="min-height:60px;"><div style="padding:20px;text-align:center;color:#94a3b8;font-size:12px;">Ładowanie...</div></div>';
    document.getElementById('modal-body').innerHTML = html;
    document.getElementById('modal').style.display = 'flex';

    _fbDb.collection('usedMarket').where('status','==','active').orderBy('listedAt','desc').limit(20).get()
      .then(function(snap){
        var list = document.getElementById('used-market-list');
        if(!list) return;
        if(snap.empty){ list.innerHTML='<div style="padding:20px;text-align:center;color:#94a3b8;font-size:12px;">Brak ofert na rynku</div>'; return; }
        var out = '';
        snap.forEach(function(doc){
          var d = doc.data();
          var isOwn = _currentUser && d.sellerId===_currentUser.uid;
          out += '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;margin-bottom:8px;">'
            +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">'
            +'<div>'
            +'<div style="font-size:13px;font-weight:700;color:#f1f5f9;">'+d.model+'</div>'
            +'<div style="font-size:10px;color:#94a3b8;">'+d.reg+' • '+d.sellerName+' • Stan: '+Math.round(d.condition||100)+'%</div>'
            +'</div>'
            +'<div style="text-align:right;">'
            +'<div style="font-size:14px;font-weight:900;color:#10b981;">$'+Number(d.price).toLocaleString()+'</div>'
            +(isOwn
              ?'<button onclick="cancelListing(\"'+doc.id+'\")" style="font-size:10px;padding:4px 10px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:6px;color:#ef4444;cursor:pointer;font-family:Arial,sans-serif;">Wycofaj</button>'
              :'<button onclick="buyUsedAircraft(\"'+doc.id+'\")" style="font-size:11px;padding:6px 14px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;border-radius:8px;color:#fff;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Kup</button>'
            )
            +'</div></div></div>';
        });
        list.innerHTML = out;
      }).catch(function(){ });
    return;
  }

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function getUsedValue(ac) {
  var basePrice = 50000000;
  Object.keys(AIRCRAFT_CATALOG).forEach(function(brand){
    AIRCRAFT_CATALOG[brand].forEach(function(a){ if(a.model===ac.model) basePrice=a.price; });
  });
  var cond = ac.maintenance ? (ac.maintenance.condition||100) : 100;
  return Math.round(basePrice * (cond/100) * 0.65);
}

function sellAircraftNow() {
  var sel = document.getElementById('sell-ac-select');
  if(!sel||!sel.value){showMsg('Wybierz samolot!');return;}
  var ac = G.fleet.filter(function(a){return a.id===sel.value;})[0];
  if(!ac){showMsg('Nie znaleziono samolotu!');return;}
  if(ac.status==='flying'){showMsg('Samolot jest w locie!');return;}
  var val = getUsedValue(ac);
  if(!confirm('Sprzedać '+ac.model+' za $'+val.toLocaleString()+'? (65% wartości rynkowej)')) return;
  G.cash += val;
  G.fleet = G.fleet.filter(function(a){return a.id!==ac.id;});
  // Usun trasy przypisane do tego samolotu
  G.routes = G.routes.filter(function(r){return r.acId!==ac.id;});
  save(); updateHUD();
  showMsg('✓ Sprzedano '+ac.model+' za $'+val.toLocaleString()+'!');
  openUsedMarket();
}

function listAircraftForSale() {
  if(!_currentUser||!_fbDb){showMsg('Musisz być zalogowany!');return;}
  var sel = document.getElementById('sell-ac-select');
  var priceEl = document.getElementById('sell-price');
  if(!sel||!sel.value){showMsg('Wybierz samolot!');return;}
  var price = parseInt(priceEl?priceEl.value:0);
  if(!price||price<10000){showMsg('Podaj cenę (min $10,000)!');return;}
  var ac = G.fleet.filter(function(a){return a.id===sel.value;})[0];
  if(!ac){showMsg('Nie znaleziono samolotu!');return;}
  if(ac.status==='flying'){showMsg('Samolot jest w locie!');return;}
  var cond = ac.maintenance?(ac.maintenance.condition||100):100;
  _fbDb.collection('usedMarket').add({
    sellerId: _currentUser.uid,
    sellerName: G.airline?G.airline.name:'Unknown',
    acId: ac.id,
    model: ac.model,
    reg: ac.reg,
    price: price,
    condition: cond,
    seats: ac.seats,
    range: ac.range||5000,
    config: ac.config||{},
    status: 'active',
    listedAt: Date.now()
  }).then(function(){
    // Usun samolot z floty i oznacz jako wystawiony
    G.fleet = G.fleet.filter(function(a){return a.id!==ac.id;});
    G.routes = G.routes.filter(function(r){return r.acId!==ac.id;});
    save(); updateHUD();
    showMsg('✓ '+ac.model+' wystawiony na rynek za $'+price.toLocaleString()+'!');
    openUsedMarket();
  }).catch(function(e){showMsg('Błąd: '+e.message);});
}

function buyUsedAircraft(docId) {
  if(!_currentUser||!_fbDb){showMsg('Musisz być zalogowany!');return;}
  _fbDb.collection('usedMarket').doc(docId).get().then(function(doc){
    if(!doc.exists){showMsg('Oferta już niedostępna!');return;}
    var d = doc.data();
    if(d.sellerId===_currentUser.uid){showMsg('To Twój samolot!');return;}
    if(G.cash<d.price){showMsg('Za mało gotówki! Potrzebujesz $'+Number(d.price).toLocaleString());return;}
    var hangarCap = typeof getHangarCapacity==='function'?getHangarCapacity():10;
    if(G.fleet.length>=hangarCap){showMsg('Hangar pełny!');return;}
    if(!confirm('Kupić '+d.model+' za $'+Number(d.price).toLocaleString()+'?')) return;
    G.cash -= d.price;
    var newAc = {
      id:'ac_'+Date.now(),model:d.model,reg:G.airline.iata+'-'+String(G.fleet.length+1).padStart(3,'0'),
      seats:d.seats,range:d.range||5000,status:'ground',routeId:null,
      config:d.config||{eco:d.seats,biz:0,total:d.seats},
      maintenance:{condition:d.condition||100,flightHours:0,incidents:[],inMaintenance:false}
    };
    G.fleet.push(newAc);
    // Oznacz oferte jako sprzedana
    _fbDb.collection('usedMarket').doc(docId).update({status:'sold',soldAt:Date.now(),buyerId:_currentUser.uid});
    // Wyslij kase sprzedajacemu przez Cloud Function (uproszczone - przez Firestore)
    _fbDb.collection('pendingPayments').add({toUid:d.sellerId,amount:d.price,reason:'usedSale',model:d.model,at:Date.now()});
    save(); updateHUD();
    showMsg('✓ Kupiono '+d.model+'!');
    openUsedMarket();
  }).catch(function(e){showMsg('Błąd: '+e.message);});
}

function cancelListing(docId) {
  if(!_currentUser||!_fbDb) return;
  if(!confirm('Wycofać ofertę?')) return;
  _fbDb.collection('usedMarket').doc(docId).get().then(function(doc){
    if(!doc.exists) return;
    var d = doc.data();
    if(d.sellerId!==_currentUser.uid){showMsg('To nie Twoja oferta!');return;}
    // Zwroc samolot do floty
    var newAc = {
      id:'ac_'+Date.now(),model:d.model,reg:d.reg,
      seats:d.seats,range:d.range||5000,status:'ground',routeId:null,
      config:d.config||{eco:d.seats,biz:0,total:d.seats},
      maintenance:{condition:d.condition||100,flightHours:0,incidents:[],inMaintenance:false}
    };
    G.fleet.push(newAc);
    _fbDb.collection('usedMarket').doc(docId).update({status:'cancelled'});
    save(); updateHUD();
    showMsg('Oferta wycofana, samolot wrócił do hangaru');
    openUsedMarket();
  });
}
