function openBuyPassenger() {
  var img = (typeof ICONS !== 'undefined' && ICONS.aircraft_a321neo)
    ? '<img src="'+ICONS.aircraft_a321neo+'" style="width:100%;max-height:140px;object-fit:contain;background:#000;border-radius:8px;margin-bottom:12px;">'
    : '';
  document.getElementById('modal-body').innerHTML =
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:12px;">KUP SAMOLOT</div>'
    + img
    + '<div style="font-size:14px;font-weight:700;color:#e0f0ff;margin-bottom:4px;">Airbus A321neo</div>'
    + '<div style="font-size:11px;color:#5580a0;margin-bottom:12px;">Waskie kadlub, 192 miejsca, zasiag 7400km</div>'
    + '<div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;"><span style="color:#5580a0;">Cena:</span><span style="color:#e0f0ff;font-weight:700;">$120,000,000</span></div>'
    + '<div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:13px;"><span style="color:#5580a0;">Maks. zasieg:</span><span style="color:#e0f0ff;">7,400 km</span></div>'
    + '<button onclick="buyA321neo()" style="width:100%;padding:12px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Kup za $120,000,000</button>'
    + '<button onclick="document.getElementById('modal').style.display='none'" style="width:100%;padding:10px;background:none;border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-top:8px;">Anuluj</button>';
  document.getElementById('modal').style.display='flex';
}

function buyA321neo() {
  var price = 120000000;
  if(G.cash < price){ showMsg('Za malo gotowki!'); return; }
  G.cash -= price;
  var id = 'ac_'+Date.now();
  G.fleet.push({id:id,model:'Airbus A321neo',reg:'VS-'+(G.fleet.length+1),seats:192,status:'ground',routeId:null});
  save(); updateHUD();
  document.getElementById('modal').style.display='none';
  showMsg('Kupiono Airbus A321neo!');
}

function openShop() {
  function row(label,sub,action,dm) {
    return '<div onclick="'+action+'"'+(dm?' data-m="'+dm+'"':'')
      +' style="display:flex;justify-content:space-between;align-items:center;padding:11px 0;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);">'
      +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+label+'</div>'
      +(sub?'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'+sub+'</div>':'')+'</div>'
      +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  }
  function sec(title,rows) {
    return '<div style="margin-bottom:16px;"><div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:6px;">'+title+'</div>'+rows.join('')+'</div>';
  }
  document.getElementById('modal-body').innerHTML=
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:16px;">SKLEP</div>'
    +sec('KUP SAMOLOT',[row('Pasazerski (nowy)','Airbusy, Boeingi, ATR...','openBuyPassenger()'),row('Cargo (nowy)','Samoloty towarowe','shopMsg(this)','Cargo - wkrotce!')])
    +sec('LEASING',[row('Pasazerski','Nizsza oplata poczatkowa','shopMsg(this)','Leasing - wkrotce!'),row('Cargo','Leasing towarowy','shopMsg(this)','Leasing cargo - wkrotce!')])
    +sec('KUP UZYWANY',[row('Pasazerski','Tansze, wieksze ryzyko','shopMsg(this)','Uzywane - wkrotce!'),row('Cargo','Uzywane towarowe','shopMsg(this)','Uzywane cargo - wkrotce!')])
    +sec('KUP SLOT',[row('Slot na lotnisku','Dodaj lotnisko docelowe','openSlotShop()')])
    +'<div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:14px;">'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:10px;">PREMIUM</div>'
    +'<div onclick="shopMsg(this)" data-m="Platnosci - wkrotce!" style="background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.3);border-radius:12px;padding:13px;margin-bottom:8px;cursor:pointer;"><div style="font-size:13px;font-weight:700;color:#f5a623;">Doladuj saldo</div><div style="font-size:11px;color:#a07040;margin-top:2px;">Zakup wirtualna gotowke</div></div>'
    +'<div onclick="shopWatchAd()" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:13px;cursor:pointer;"><div style="font-size:13px;font-weight:700;color:#e0f0ff;">Obejrzyj reklame</div><div style="font-size:11px;color:#5580a0;margin-top:2px;">+50 punktow za reklame</div></div>'
    +'</div>';
  document.getElementById('modal').style.display='flex';
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

/* -- NOTIFICATIONS -- */
var _nT;
function showMsg(msg) {
  var n=document.getElementById('msg'); if(!n) return;
  n.textContent=msg; n.style.transform='translateX(-50%) translateY(0)';
  clearTimeout(_nT); _nT=setTimeout(function(){n.style.transform='translateX(-50%) translateY(-80px)';},3000);
}

/* -- SETUP -- */
var _setupFiltered=[], _setupPicked=null;

function setupFilter() {
  var q=(document.getElementById('sq').value||'').toLowerCase();
  _setupFiltered=[];
  for(var i=0;i<POLISH_CITIES.length;i++){
    var c=POLISH_CITIES[i];
    if(!q||c.name.toLowerCase().indexOf(q)>=0||c.voiv.toLowerCase().indexOf(q)>=0) _setupFiltered.push(c);
  }
  renderSetupList();
}

function renderSetupList() {
  var shown=_setupFiltered.slice(0,40), out='';
  for(var j=0;j<shown.length;j++){
    var c=shown[j];
    var active=_setupPicked&&_setupPicked.name===c.name;
    out+='<div onclick="setupPick('+j+')" style="padding:10px 14px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.06);background:'+(active?'rgba(0,212,255,0.15)':'transparent')+';color:'+(active?'#00d4ff':'#cce4ff')+';font-size:14px;font-family:Arial,sans-serif;">'
      +c.name+'<span style="font-size:10px;color:#5580a0;margin-left:8px;">'+c.voiv+' &bull; '+c.airport+'</span></div>';
  }
  if(!out) out='<div style="padding:14px;color:#5580a0;font-family:Arial,sans-serif;">Brak wynikow</div>';
  document.getElementById('slist').innerHTML=out;
}

function setupPick(j) {
  _setupPicked=_setupFiltered[j]; if(!_setupPicked) return;
  document.getElementById('spicked').textContent=_setupPicked.name+' - '+_setupPicked.airport;
  document.getElementById('spicked').style.display='block';
  var btn=document.getElementById('sbtn'); btn.disabled=false; btn.style.opacity='1';
  renderSetupList();
}

function setupGo() {
  var c=_setupPicked; if(!c) return;
  var ap={id:'AP_HOME',name:c.airport!=='brak lotniska'?c.airport:c.name,icao:c.icao,city:c.name,country:'Polska',lat:c.lat,lng:c.lng,isHome:true,level:1,maxSlots:10,usedSlots:0};
  G.airports.push(ap); G.homeAirport=ap;
  G.airline.name='VIS Airlines'; G.airline.iata='VS';
  save();
  document.getElementById('setupScreen').style.display='none';
  LMAP.setView([c.lat,c.lng],10);
  renderMarkers(); renderRoutes();
  // Test route
  var tr={id:'rt_test',acId:null,from:c.icao,to:'EPWA',fromLat:c.lat,fromLng:c.lng,toLat:52.165,toLng:20.967,startTime:Date.now(),duration:5000,revenue:12500,price:350};
  G.routes.push(tr); save();
  showMsg('Baza w '+c.name+' gotowa!');
}

/* -- BOOT -- */
