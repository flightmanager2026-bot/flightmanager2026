/* -- TRASY -- */
function getApName(icao) {
  if(G.homeAirport && G.homeAirport.icao === icao) return G.homeAirport.city;
  var ap = null;
  ADB.forEach(function(a){ if(a.icao===icao) ap=a; });
  return ap ? ap.city : icao;
}

function calcETA(r) {
  if(!r.startTime||!r.duration) return '';
  var left=Math.max(0,r.duration-(Date.now()-r.startTime));
  var mins=Math.ceil(left/60000);
  if(mins<=0) return 'Laduje...';
  if(mins>=60) return Math.floor(mins/60)+'h '+(mins%60)+'min';
  return mins+'min';
}

function renderTrasy(body) {
  if(!G.routes.length){
    body.innerHTML='<div style="padding:20px;color:#5580a0;text-align:center;">Brak tras. Dodaj trase w Flocie.</div>';
    return;
  }

  // Trasy gotowe do odlotu = samolot na ziemi LUB wyladowal
  var available = G.routes.filter(function(r){
    var ac = G.fleet.filter(function(a){return a.id===r.acId;})[0];
    return ac && (ac.status==='ground' || ac.status==='landed');
  });

  var out='<div style="margin-bottom:12px;">'
    +'<button onclick="departAll()" '
    +(available.length===0
      ?'disabled style="width:100%;padding:10px;background:rgba(26,86,219,0.2);border:1px solid rgba(26,86,219,0.2);border-radius:8px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:not-allowed;"'
      :'style="width:100%;padding:10px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;"')
    +'>&#9992; Odlec wszystkie ('+available.length+' gotowych)</button>'
    +'</div>';

  G.routes.forEach(function(r) {
    // Znajdz samolot przypisany do tej trasy
    var ac = G.fleet.filter(function(a){return a.id===r.acId;})[0];
    var flying = ac && ac.status==='flying';
    var landed = ac && ac.status==='landed';
    var onGround = ac && ac.status==='ground';
    var prog = flying ? Math.min(100,Math.round((Date.now()-r.startTime)/r.duration*100)) : landed ? 100 : 0;
    var eta = flying ? calcETA(r) : '';
    var sc = flying?'#00e676':landed?'#f5a623':'#5580a0';
    var st = flying?'W LOCIE':landed?'WYLADOWAL':'NA ZIEMI';

    var sideBtn = '';
    if(flying) {
      sideBtn = '<div style="flex-shrink:0;padding:8px 10px;background:rgba(0,230,118,0.1);border:1px solid rgba(0,230,118,0.3);border-radius:8px;font-size:11px;color:#00e676;font-weight:700;text-align:center;min-width:60px;">'+eta+'</div>';
    } else {
      var canGo = onGround || landed;
      sideBtn = '<div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">'
        +'<button onclick="departSingle(this)" data-rid="'+r.id+'" '
        +(!canGo?'disabled ':'')
        +'style="padding:8px 12px;background:'+(canGo?'linear-gradient(135deg,#1a56db,#00d4ff)':'rgba(26,86,219,0.2)')+';border:none;border-radius:8px;color:'+(canGo?'#fff':'#5580a0')+';font-size:11px;font-weight:700;font-family:Arial,sans-serif;cursor:'+(canGo?'pointer':'not-allowed')+';white-space:nowrap;">&#9992; Odlec</button>'
        +'<button onclick="cancelRouteById(this)" data-id="'+r.id+'" style="padding:6px 10px;background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.3);border-radius:8px;color:#e63946;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;white-space:nowrap;">&#10005; Anuluj</button>'
        +'</div>';
    }

    out+='<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.12);border-radius:12px;padding:12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:10px;">'
      +'<div style="flex:1;min-width:0;">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+getApName(r.from)+' &#8594; '+getApName(r.to)+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+r.from+' &#8594; '+r.to+'</div>'
      +'<div style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,0.07);color:'+sc+';">'+st+'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:#5580a0;margin-bottom:6px;">'+(ac?ac.model+' ('+ac.reg+')':'Brak samolotu')+' &bull; '+(r.durationMin?r.durationMin+'min':'?')+' &bull; <span style="color:#00e676;">$'+r.revenue.toLocaleString()+'</span></div>'
      +'<div style="height:3px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">'
      +'<div style="height:100%;width:'+prog+'%;background:linear-gradient(90deg,#1a56db,#00d4ff);border-radius:2px;"></div>'
      +'</div>'
      +'</div>'+sideBtn+'</div></div>';
  });
  body.innerHTML=out;
}

function departSingle(el) {
  var rid = el.dataset.rid;
  var r = null; G.routes.forEach(function(x){if(x.id===rid)r=x;});
  if(!r) return;

  // Znajdz samolot przypisany do TEJ trasy
  var ac = G.fleet.filter(function(a){return a.id===r.acId;})[0];
  if(!ac) { showMsg('Brak samolotu na tej trasie!'); return; }
  if(ac.status==='flying') { showMsg('Samolot juz w locie!'); return; }

  // Jeśli wyladowal - odwroc trase
  if(ac.status==='landed') {
    var tmp;
    tmp=r.from; r.from=r.to; r.to=tmp;
    tmp=r.fromLat; r.fromLat=r.toLat; r.toLat=tmp;
    tmp=r.fromLng; r.fromLng=r.toLng; r.toLng=tmp;
  }

  // Oblicz czas lotu
  if(!r.durationMin && r.fromLat && r.toLat && typeof calcDistance==='function') {
    var d = Math.round(calcDistance(r.fromLat,r.fromLng,r.toLat,r.toLng));
    var sp = (typeof AC_SPEEDS!=='undefined'&&AC_SPEEDS[ac.model])?AC_SPEEDS[ac.model]:800;
    r.durationMin = Math.round(d/sp*60)+20;
    r.distKm = d;
  }
  r.duration = (r.durationMin||40)*60000;

  // Sprawdz personel (tylko jesli gracz juz zatrudnil kogos)
  var totalStaff = 0;
  if(G.staff) Object.keys(G.staff).forEach(function(t){ totalStaff += (G.staff[t]||[]).length; });
  if(totalStaff > 0 && typeof canAircraftDepart === 'function') {
    var crewCheck = canAircraftDepart(ac);
    if(crewCheck !== true && !crewCheck.ok) {
      showMsg('✋ Nie można odlecieć: '+crewCheck.reason);
      return;
    }
  }

  // Sprawdz limit terminala
  var mins = r.durationMin||40;
  var eco = ac.config?(ac.config.eco||0):(ac.seats||150);
  var biz = ac.config?(ac.config.biz||0):0;
  var totalPax = eco + biz;

  if(typeof canDepart === 'function' && !canDepart(totalPax)) {
    var cap = typeof getTerminalCapacity==='function' ? getTerminalCapacity() : 1000;
    var used = typeof getPassengersLast2h==='function' ? getPassengersLast2h() : 0;
    showMsg('Terminal pelny! Uzyte: '+used+'/'+cap+' pasazerow. Ulepsz terminal!');
    return;
  }

  r.startTime = Date.now();
  ac.status = 'flying';

  // Kasa za odlot
  var cfg = ac.config || {first:0,prem:0,biz:biz,eco:eco};
  r.revenue = Math.round(
    (cfg.first||0)*mins*4.0 +
    (cfg.prem||0)*mins*3.0 +
    (cfg.biz||biz)*mins*2.0 +
    (cfg.eco||eco)*mins*1.6
  );
  G.cash += r.revenue;

  // +1 lot i sprawdz LVL
  G.totalFlights = (G.totalFlights||0) + 1;
  var newLevel = Math.floor(G.totalFlights / 10) + 1;
  if(newLevel > (G.level||1)) {
    G.level = newLevel;
    showMsg('&#127881; POZIOM '+G.level+'! Odblokowano nowe możliwości!');
  }

  updateHUD();

  // Zapisz odlot do logu terminala
  if(typeof logDeparture === 'function') logDeparture(totalPax);

  // Aktualizuj ranking
  if(typeof updateRankingValue === 'function') updateRankingValue();

  removeFlightLayer(r.id);
  drawFlightLayer(r);
  save();
  if(G.level === newLevel || newLevel <= (G.level||1))
    showMsg('Odlecial '+ac.model+'! +$'+r.revenue.toLocaleString()+' | Lot #'+G.totalFlights);

  var body=document.getElementById('panel-body');
  if(body) renderTrasy(body);
}

function departAll() {
  var departed = 0;

  G.routes.forEach(function(r) {
    var ac = G.fleet.filter(function(a){return a.id===r.acId;})[0];
    if(!ac) return;
    if(ac.status==='flying') return;

    // Jeśli wyladowal - odwroc trase
    if(ac.status==='landed') {
      var tmp;
      tmp=r.from; r.from=r.to; r.to=tmp;
      tmp=r.fromLat; r.fromLat=r.toLat; r.toLat=tmp;
      tmp=r.fromLng; r.fromLng=r.toLng; r.toLng=tmp;
    }

    if(!r.durationMin && r.fromLat && r.toLat && typeof calcDistance==='function') {
      var d = Math.round(calcDistance(r.fromLat,r.fromLng,r.toLat,r.toLng));
      var sp = (typeof AC_SPEEDS!=='undefined'&&AC_SPEEDS[ac.model])?AC_SPEEDS[ac.model]:800;
      r.durationMin = Math.round(d/sp*60)+20;
      r.distKm = d;
    }
    r.duration = (r.durationMin||40)*60000;

    var mins = r.durationMin||40;
    var eco = ac.config?(ac.config.eco||0):(ac.seats||150);
    var biz = ac.config?(ac.config.biz||0):0;
    var totalPax = eco + biz;

    // Sprawdz limit terminala
    if(typeof canDepart==='function' && !canDepart(totalPax)) {
      return; // Pominij ten samolot
    }

    r.startTime = Date.now();
    ac.status = 'flying';
    var cfg = ac.config || {first:0,prem:0,biz:biz,eco:eco};
  r.revenue = Math.round(
    (cfg.first||0)*mins*4.0 +
    (cfg.prem||0)*mins*3.0 +
    (cfg.biz||biz)*mins*2.0 +
    (cfg.eco||eco)*mins*1.6
  );
    G.cash += r.revenue;
    G.totalFlights = (G.totalFlights||0) + 1;
    var _newLvl = Math.floor(G.totalFlights/10)+1;
    if(_newLvl > (G.level||1)) { G.level=_newLvl; }
    if(typeof logDeparture==='function') logDeparture(totalPax);
    removeFlightLayer(r.id);
    drawFlightLayer(r);
    departed++;
  });

  if(departed>0){ updateHUD(); save(); showMsg('Odlecelo '+departed+' samolotow!'); }
  else showMsg('Brak samolotow gotowych do odlotu!');

  var body=document.getElementById('panel-body');
  if(body) renderTrasy(body);
}

function cancelRouteById(el) {
  var rid = el && el.dataset ? el.dataset.id : null;
  if(rid) cancelRoute(rid);
}

function cancelRoute(rid) {
  if(!confirm('Na pewno anulowac te trase?')) return;
  // Zwolnij samolot
  G.fleet.forEach(function(a){
    if(a.routeId===rid){ a.routeId=null; a.status='ground'; }
  });
  // Usun trase
  G.routes = G.routes.filter(function(r){ return r.id!==rid; });
  removeFlightLayer(rid);
  save();
  showMsg('Trasa anulowana');
  var body = document.getElementById('panel-body');
  if(body) renderTrasy(body);
}
