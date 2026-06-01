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

    // Oblicz popyt i przewidywany zarobek
    var occ = 70;
    var estRevenue = r.revenue || 0;
    var poolInfo = '';
    if(typeof getOccupancy==='function' && r.id) {
      occ = Math.round(getOccupancy(r.id)*100);
    }
    if(ac && r.durationMin && !flying) {
      var mins = r.durationMin;
      var seats = ac.seats || 150;
      var cfg = ac.config || {};
      var eco   = cfg.eco   || Math.round(seats*0.80);
      var biz   = cfg.biz   || Math.round(seats*0.15);
      var prem  = cfg.prem  || Math.round(seats*0.04);
      var first = cfg.first || Math.round(seats*0.01);
      var occR = occ/100;
      estRevenue = Math.round(
        first*occR*mins*4.0 +
        prem *occR*mins*3.0 +
        biz  *occR*mins*2.0 +
        eco  *occR*mins*1.6
      );
      var totalPax = Math.round((eco+biz+prem+first)*occR);
      poolInfo = totalPax+' pax';
      // Sprawdz pule popytu
      if(typeof G.demand!=='undefined' && G.demand && G.demand[r.id]) {
        var pool = G.demand[r.id];
        var poolEco = pool.eco||0;
        if(poolEco <= 0) poolInfo += ' • <span style="color:#ef4444;">Brak eco!</span>';
      }
    }

    // Kolor obłożenia
    var occColor = occ>=90?'#10b981':occ>=70?'#8b5cf6':'#f97316';
    var occBar = '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">'
      +'<div style="flex:1;height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">'
      +'<div style="height:100%;width:'+occ+'%;background:'+occColor+';border-radius:2px;"></div>'
      +'</div>'
      +'<span style="font-size:10px;font-weight:700;color:'+occColor+';min-width:32px;">'+occ+'%</span>'
      +'</div>';

    // Awaria
    var hasIncident = ac && ac.maintenance && (ac.maintenance.incidents||[]).some(function(i){return !i.resolved;});

    var sideBtn = '';
    if(flying) {
      sideBtn = '<div style="flex-shrink:0;padding:8px 10px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:10px;font-size:11px;color:#10b981;font-weight:700;text-align:center;min-width:60px;">'+eta+'</div>';
    } else {
      var canGo = (onGround || landed) && !hasIncident;
      sideBtn = '<div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">'
        +'<button onclick="departSingle(this)" data-rid="'+r.id+'" '
        +(!canGo?'disabled ':'')
        +'style="padding:8px 12px;background:'+(canGo?'linear-gradient(135deg,#8b5cf6,#ec4899)':'rgba(255,255,255,0.05)')+';border:none;border-radius:8px;color:'+(canGo?'#fff':'#94a3b8')+';font-size:11px;font-weight:700;font-family:Arial,sans-serif;cursor:'+(canGo?'pointer':'not-allowed')+';white-space:nowrap;">'
        +(hasIncident?'🚨 Awaria':'✈ Odlec')+'</button>'
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
      // Info o samolocie i przychodzie
      +'<div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">'
      +(ac?ac.model+' ('+ac.reg+')':'Brak samolotu')
      +' • '+(r.durationMin?r.durationMin+'min':'?')
      +' • <span style="color:#10b981;font-weight:700;">~$'+estRevenue.toLocaleString()+'</span>'
      +(poolInfo?' • '+poolInfo:'')
      +'</div>'
      // Pula popytu - ile pasazerow zostalo
      +(function(){
        if(flying) return '';
        if(typeof G==='undefined'||!G.demand) return '';
        var pool = G.demand && G.demand[r.id];
        if(!pool) {
          // Brak puli - oblicz max na podstawie samolotu
          var s = ac ? ac.seats : 150;
          var cfg2 = ac ? (ac.config||{}) : {};
          var e = cfg2.eco   || Math.round(s*0.80);
          var b = cfg2.biz   || Math.round(s*0.15);
          var p = cfg2.prem  || Math.round(s*0.04);
          var f = cfg2.first || Math.round(s*0.01);
          return '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px;">'
            +'<span style="font-size:9px;padding:2px 7px;background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.2);border-radius:20px;color:#06b6d4;">ECO '+(e*4)+'</span>'
            +(b?'<span style="font-size:9px;padding:2px 7px;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.2);border-radius:20px;color:#8b5cf6;">BIZ '+(b*4)+'</span>':'')
            +(p?'<span style="font-size:9px;padding:2px 7px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.2);border-radius:20px;color:#f97316;">PREM '+(p*4)+'</span>':'')
            +(f?'<span style="font-size:9px;padding:2px 7px;background:rgba(234,179,8,0.12);border:1px solid rgba(234,179,8,0.2);border-radius:20px;color:#eab308;">FIRST '+(f*4)+'</span>':'')
            +'<span style="font-size:9px;color:#94a3b8;padding:2px 4px;">pula dzienna</span>'
            +'</div>';
        }
        var eCol = pool.eco<=0?'#ef4444':pool.eco<20?'#f97316':'#06b6d4';
        var bCol = pool.biz<=0?'#ef4444':pool.biz<5?'#f97316':'#8b5cf6';
        return '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px;">'
          +'<span style="font-size:9px;padding:2px 7px;background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.2);border-radius:20px;color:'+eCol+';">ECO '+pool.eco+'</span>'
          +(pool.biz!==undefined?'<span style="font-size:9px;padding:2px 7px;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.2);border-radius:20px;color:'+bCol+';">BIZ '+pool.biz+'</span>':'')
          +((pool.prem!==undefined&&pool.prem>0)?'<span style="font-size:9px;padding:2px 7px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.2);border-radius:20px;color:'+(pool.prem<=0?'#ef4444':'#f97316')+';">PREM '+pool.prem+'</span>':'')
          +((pool.first!==undefined&&pool.first>0)?'<span style="font-size:9px;padding:2px 7px;background:rgba(234,179,8,0.12);border:1px solid rgba(234,179,8,0.2);border-radius:20px;color:'+(pool.first<=0?'#ef4444':'#eab308')+';">FIRST '+pool.first+'</span>':'')
          +'<span style="font-size:9px;color:#94a3b8;padding:2px 4px;">pozostało dziś</span>'
          +'</div>';
      })()
      // Pasek obłożenia
      + occBar
      // Pasek postępu lotu
      +'<div style="height:3px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">'
      +'<div style="height:100%;width:'+prog+'%;background:linear-gradient(90deg,#8b5cf6,#06b6d4);border-radius:2px;transition:width 0.5s;"></div>'
      +'</div>'
      +'</div>'+sideBtn+'</div></div>';
  });

  // Przycisk do panelu popytu
  out += '<div onclick="if(typeof openDemandShop!==\'undefined\')openDemandShop();" '
    +'style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.2);border-radius:12px;cursor:pointer;margin-top:4px;">'
    +'<span style="font-size:20px;">📈</span>'
    +'<div style="flex:1;">'
    +'<div style="font-size:13px;font-weight:700;color:#8b5cf6;">Popyt pasażerski</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Bazowe obłożenie: 70% • Kup boost aby zwiększyć</div>'
    +'</div>'
    +'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
    +'</div>';

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
  // Sprawdz nienaprawione awarie
  var _hasIncident = ac.maintenance && (ac.maintenance.incidents||[]).some(function(i){return !i.resolved;});
  if(_hasIncident){showMsg('🚨 '+ac.model+' ma nienaprawioną awarię! Idź do Serwisu.');return;}
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
  // Oblicz przychod z uwzglednieniem popytu
  var demandResult = typeof calcRevenueWithDemand==='function'
    ? calcRevenueWithDemand(r, ac)
    : null;
  if(demandResult) {
    r.revenue = demandResult.revenue;
    r.lastPax = demandResult.pax;
    r.lastOcc = demandResult.occupancy;
  } else {
    var cfg=ac.config||{first:0,prem:0,biz:biz,eco:eco};
    r.revenue=Math.round((cfg.first||0)*mins*4.0+(cfg.prem||0)*mins*3.0+(cfg.biz||biz)*mins*2.0+(cfg.eco||eco)*mins*1.6);
  }
  G.cash+=r.revenue;
  G.totalFlights=(G.totalFlights||0)+1;
  if(typeof checkLevelUp==='function') checkLevelUp();
  else { var nl=Math.floor(G.totalFlights/10)+1; if(nl>(G.level||1)){G.level=nl;showMsg('🎉 POZIOM '+G.level+'!');} }
  updateHUD();
  if(typeof logDeparture==='function') logDeparture(demandResult?demandResult.pax:totalPax);
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
    // Sprawdz awarie - samolot z nienaprawiona awaria nie moze odleciec
    var hasIncident = ac.maintenance && (ac.maintenance.incidents||[]).some(function(i){return !i.resolved;});
    if(hasIncident){skipped.push(ac.model+' (awaria!)');return;}
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
