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
    body.innerHTML='<div style="padding:30px;color:#94a3b8;text-align:center;font-size:13px;">Brak tras. Dodaj trasę w Flocie.</div>';
    return;
  }
  var available = G.routes.filter(function(r){
    var ac = G.fleet.filter(function(a){return a.id===r.acId;})[0];
    return ac && (ac.status==='ground' || ac.status==='landed');
  });

  var out='<div style="margin-bottom:12px;">'
    +'<button onclick="departAll()" '
    +(available.length===0
      ?'disabled style="width:100%;padding:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#94a3b8;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:not-allowed;"'
      :'style="width:100%;padding:12px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;border-radius:12px;color:#fff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;box-shadow:0 4px 15px rgba(139,92,246,0.4);"')
    +'>✈ Odlec wszystkie ('+available.length+' gotowych)</button>'
    +'</div>';

  G.routes.forEach(function(r) {
    var ac = G.fleet.filter(function(a){return a.id===r.acId;})[0];
    var flying = ac && ac.status==='flying';
    var landed = ac && ac.status==='landed';
    var onGround = ac && ac.status==='ground';
    var prog = flying ? Math.min(100,Math.round((Date.now()-r.startTime)/r.duration*100)) : landed ? 100 : 0;
    var eta = flying ? calcETA(r) : '';
    var sc = flying?'#10b981':landed?'#f97316':'#94a3b8';
    var st = flying?'W LOCIE':landed?'WYLĄDOWAŁ':'NA ZIEMI';

    var sideBtn = '';
    if(flying) {
      sideBtn = '<div style="flex-shrink:0;padding:8px 10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:10px;font-size:11px;color:#10b981;font-weight:700;text-align:center;min-width:60px;">'+eta+'</div>';
    } else {
      var canGo = onGround || landed;
      sideBtn = '<div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">'
        +'<button onclick="departSingle(this)" data-rid="'+r.id+'" '
        +(!canGo?'disabled ':'')
        +'style="padding:8px 12px;background:'+(canGo?'linear-gradient(135deg,#8b5cf6,#ec4899)':'rgba(255,255,255,0.05)')+';border:none;border-radius:8px;color:'+(canGo?'#fff':'#94a3b8')+';font-size:11px;font-weight:700;font-family:Arial,sans-serif;cursor:'+(canGo?'pointer':'not-allowed')+';white-space:nowrap;">✈ Odlec</button>'
        +'<button onclick="cancelRouteById(this)" data-id="'+r.id+'" style="padding:6px 10px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.25);border-radius:8px;color:#ef4444;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;white-space:nowrap;">✕ Anuluj</button>'
        +'</div>';
    }

    out+='<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(139,92,246,0.15);border-radius:14px;padding:12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:10px;">'
      +'<div style="flex:1;min-width:0;">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">'
      +'<div style="font-size:13px;font-weight:700;color:#f1f5f9;">'+getApName(r.from)+' → '+getApName(r.to)+'</div>'
      +'<div style="font-size:9px;color:#94a3b8;">'+r.from+' → '+r.to+'</div>'
      +'<div style="font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;background:rgba(255,255,255,0.06);color:'+sc+';">'+st+'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:#94a3b8;margin-bottom:7px;">'+(ac?ac.model+' ('+ac.reg+')':'Brak samolotu')+' • '+(r.durationMin?r.durationMin+'min':'?')+' • <span style="color:#10b981;font-weight:700;">$'+r.revenue.toLocaleString()+'</span></div>'
      +'<div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">'
      +'<div style="height:100%;width:'+prog+'%;background:linear-gradient(90deg,#8b5cf6,#06b6d4);border-radius:2px;transition:width 0.5s;"></div>'
      +'</div>'
      +'</div>'+sideBtn+'</div></div>';
  });
  body.innerHTML=out;
}

function departSingle(el) {
  var rid = el.dataset.rid;
  var r = null; G.routes.forEach(function(x){if(x.id===rid)r=x;});
  if(!r) return;
  var ac = G.fleet.filter(function(a){return a.id===r.acId;})[0];
  if(!ac) { showMsg('Brak samolotu na tej trasie!'); return; }
  if(ac.status==='flying') { showMsg('Samolot już w locie!'); return; }
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
  if(ac.status==='maintenance'){showMsg('✋ '+ac.model+' jest w konserwacji!');return;}
  if(typeof needsMaintenance==='function'&&needsMaintenance(ac)){if(!confirm('Samolot wymaga konserwacji! Czy na pewno?'))return;}
  if(typeof canAircraftDepart==='function'){var cc=canAircraftDepart(ac);if(!cc.ok){showMsg('✋ '+cc.reason);return;}}
  if(G.fuelCrisis){showMsg('⛽ Kryzys paliwowy! Opłać paliwo najpierw.');return;}
  var mins=r.durationMin||40;
  var eco=ac.config?(ac.config.eco||0):(ac.seats||150);
  var biz=ac.config?(ac.config.biz||0):0;
  var totalPax=eco+biz;
  if(typeof canDepart==='function'&&!canDepart(totalPax)){showMsg('Terminal pełny!');return;}
  r.startTime=Date.now();
  ac.status='flying';
  // Dodaj koszt paliwa do dlugu
  if(typeof addFuelDebt==='function' && r.distKm) addFuelDebt(r.distKm, ac.model);
  var cfg=ac.config||{first:0,prem:0,biz:biz,eco:eco};
  r.revenue=Math.round((cfg.first||0)*mins*4.0+(cfg.prem||0)*mins*3.0+(cfg.biz||biz)*mins*2.0+(cfg.eco||eco)*mins*1.6);
  G.cash+=r.revenue;
  G.totalFlights=(G.totalFlights||0)+1;
  if(typeof checkLevelUp==='function') checkLevelUp();
  else { var nl=Math.floor(G.totalFlights/10)+1; if(nl>(G.level||1)){G.level=nl;showMsg('🎉 POZIOM '+G.level+'!');} }
  updateHUD();
  if(typeof logDeparture==='function') logDeparture(totalPax);
  if(typeof updateRankingValue==='function') updateRankingValue();
  if(typeof updateMissionProgress==='function') updateMissionProgress('flights',1);
  removeFlightLayer(r.id);
  drawFlightLayer(r);
  save();
  showMsg('✈ Odleciał '+ac.model+'! +$'+r.revenue.toLocaleString()+' | Lot #'+G.totalFlights);
  var body=document.getElementById('panel-body');
  if(body) renderTrasy(body);
}

function departAll() {
  var departed=0, skipped=[];
  G.routes.forEach(function(r) {
    var ac=G.fleet.filter(function(a){return a.id===r.acId;})[0];
    if(!ac||ac.status==='flying') return;
    if(ac.status==='maintenance'){skipped.push(ac.model+' (serwis)');return;}
    if(typeof needsMaintenance==='function'&&needsMaintenance(ac)){skipped.push(ac.model+' (wymaga serwisu)');return;}
    if(typeof canAircraftDepart==='function'){var cc=canAircraftDepart(ac);if(!cc.ok){skipped.push(ac.model);return;}}
    if(G.fuelCrisis){showMsg('⛽ Kryzys paliwowy!');return;}
    if(ac.status==='landed'){var t;t=r.from;r.from=r.to;r.to=t;t=r.fromLat;r.fromLat=r.toLat;r.toLat=t;t=r.fromLng;r.fromLng=r.toLng;r.toLng=t;}
    if(!r.durationMin&&r.fromLat&&r.toLat&&typeof calcDistance==='function'){var d=Math.round(calcDistance(r.fromLat,r.fromLng,r.toLat,r.toLng));var sp=(typeof AC_SPEEDS!=='undefined'&&AC_SPEEDS[ac.model])?AC_SPEEDS[ac.model]:800;r.durationMin=Math.round(d/sp*60)+20;r.distKm=d;}
    r.duration=(r.durationMin||40)*60000;
    var mins=r.durationMin||40;
    var eco=ac.config?(ac.config.eco||0):(ac.seats||150);
    var biz=ac.config?(ac.config.biz||0):0;
    if(typeof canDepart==='function'&&!canDepart(eco+biz)) return;
    r.startTime=Date.now(); ac.status='flying';
    if(typeof addFuelDebt==='function'&&r.distKm) addFuelDebt(r.distKm,ac.model);
    var cfg=ac.config||{first:0,prem:0,biz:biz,eco:eco};
    r.revenue=Math.round((cfg.first||0)*mins*4.0+(cfg.prem||0)*mins*3.0+(cfg.biz||biz)*mins*2.0+(cfg.eco||eco)*mins*1.6);
    G.cash+=r.revenue; G.totalFlights=(G.totalFlights||0)+1;
    if(typeof checkLevelUp==='function') checkLevelUp();
    else { var nl=Math.floor(G.totalFlights/10)+1; if(nl>(G.level||1)) G.level=nl; }
    if(typeof logDeparture==='function') logDeparture(eco+biz);
    if(typeof updateMissionProgress==='function') updateMissionProgress('flights',1);
    removeFlightLayer(r.id); drawFlightLayer(r); departed++;
  });
  if(departed>0){updateHUD();save();showMsg('✈ Odleciało '+departed+' samolotów!'+(skipped.length?' (pominięto: '+skipped.length+')':''));}
  else showMsg('Brak gotowych samolotów!'+(skipped.length?' Powód: '+skipped[0]:''));
  var body=document.getElementById('panel-body'); if(body) renderTrasy(body);
}

function cancelRouteById(el){var rid=el&&el.dataset?el.dataset.id:null;if(rid)cancelRoute(rid);}

function cancelRoute(rid) {
  if(!confirm('Na pewno anulować tę trasę?')) return;
  G.fleet.forEach(function(a){if(a.routeId===rid){a.routeId=null;a.status='ground';}});
  G.routes=G.routes.filter(function(r){return r.id!==rid;});
  removeFlightLayer(rid); save();
  showMsg('Trasa anulowana');
  var body=document.getElementById('panel-body'); if(body) renderTrasy(body);
}
