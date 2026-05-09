/* -- HUD ACTIONS -- */
function hudAction(type) {
  if(type==='settings') {
    document.getElementById('modal-body').innerHTML=
      '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:16px;">USTAWIENIA</div>'
      +'<div style="font-size:12px;color:#5580a0;margin-bottom:6px;">Nazwa linii</div>'
      +'<input id="set-name" type="text" value="'+G.airline.name+'" style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:10px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:12px;outline:none;-webkit-appearance:none;">'
      +'<div style="font-size:12px;color:#5580a0;margin-bottom:6px;">Kod IATA</div>'
      +'<input id="set-iata" type="text" value="'+G.airline.iata+'" maxlength="2" style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:10px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:16px;outline:none;-webkit-appearance:none;text-transform:uppercase;">'
      +'<button onclick="resetGame()" style="width:100%;padding:10px;background:#e63946;border:none;border-radius:8px;color:#fff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-top:12px;">Reset gry (testowanie)</button>'
    +'<button onclick="saveSettings()" style="width:100%;padding:12px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zapisz</button>'
      +'<button onclick="resetGame()" style="width:100%;padding:12px;background:transparent;border:1px solid #e63946;border-radius:8px;color:#e63946;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-top:10px;">Resetuj gre</button>';
    document.getElementById('modal').style.display='flex';
  } else if(type==='shop') {
    openShop();
  } else if(type==='msg') {
    showMsg('Brak nowych wiadomosci');
  }
}

function saveSettings() {
  var n=document.getElementById('set-name'),ia=document.getElementById('set-iata');
  if(n&&n.value.trim()) G.airline.name=n.value.trim();
  if(ia&&ia.value.trim()) G.airline.iata=ia.value.trim().toUpperCase();
  save(); updateHUD(); document.getElementById('modal').style.display='none'; showMsg('Zapisano!');
}

function resetGame() {
  localStorage.removeItem('sb_v3');
  location.reload();
}

function shopMsg(el) { document.getElementById('modal').style.display='none'; showMsg(el&&el.dataset&&el.dataset.m?el.dataset.m:'Wkrotce!'); }
function shopWatchAd() { document.getElementById('modal').style.display='none'; G.points=(G.points||0)+50; save(); updateHUD(); showMsg('+50 punktow!'); }

function openSlotShop() {
  document.getElementById('modal').style.display='none';
  var lv=G.level||1;
  var owned={}; G.slots.forEach(function(s){owned[s]=true;}); if(G.homeAirport) owned[G.homeAirport.icao]=true;
  var available=ADB.filter(function(ap){
    if(owned[ap.icao]) return false;
    if(ap.country==='Polska') return true;
    if(lv>=3&&ap.country==='Niemcy') return true;
    if(lv>=5) return true;
    return false;
  });
  var items=available.map(function(ap){
    return '<div onclick="buySlotShop(this)" data-icao="'+ap.icao+'" style="display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;">'
      +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+ap.icao+' - '+ap.city+'</div><div style="font-size:11px;color:#5580a0;">'+ap.country+'</div></div>'
      +'<div style="font-size:13px;font-weight:700;color:#00d4ff;">$'+ap.cost.toLocaleString()+'</div>'
      +'</div>';
  }).join('');
  var locked=lv<3?'<div style="background:rgba(245,166,35,0.08);border:1px solid rgba(245,166,35,0.2);border-radius:10px;padding:11px;margin-bottom:12px;font-size:12px;color:#f5a623;">Poziom 3+: Niemcy | Poziom 5+: caly swiat</div>':'';
  document.getElementById('modal-body').innerHTML=
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:4px;">KUP SLOT</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:12px;">Poziom '+lv+' | '+(G.totalFlights||0)+' lotow</div>'
    +locked+(items||'<div style="color:#5580a0;text-align:center;padding:20px;">Brak dostepnych slotow</div>');
  document.getElementById('modal').style.display='flex';
}

function buySlotShop(el) { var icao=el&&el.dataset?el.dataset.icao:el;
  var db=ADB.filter(function(a){return a.icao===icao;})[0]; if(!db) return;
  if(G.cash<db.cost){showMsg('Za malo gotowki! Potrzebujesz $'+db.cost.toLocaleString());return;}
  G.cash-=db.cost; G.slots.push(icao);
  G.airports.push({id:'AP_'+icao,icao:icao,city:db.city,country:db.country,lat:db.lat,lng:db.lng,isHome:false,level:1});
  save(); renderMarkers(); updateHUD(); document.getElementById('modal').style.display='none';
  showMsg('Slot '+icao+' ('+db.city+') kupiony!');
}

