/* -- TRASY -- */
function renderTrasy(body) {
  if(!G.routes.length){
    body.innerHTML='<div style="padding:20px;color:#5580a0;text-align:center;">Brak tras. Dodaj trase w Flocie.</div>';
    return;
  }
  var available=G.routes.filter(function(r){
    var ac=null; G.fleet.forEach(function(a){if(a.id===r.acId)ac=a;});
    return !r.startTime || (ac && ac.status==='landed');
  });
  var out='<div style="margin-bottom:12px;">'
    +'<button onclick="departAll()" '
    +(available.length===0
      ?'disabled style="width:100%;padding:10px;background:rgba(26,86,219,0.2);border:1px solid rgba(26,86,219,0.2);border-radius:8px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:not-allowed;"'
      :'style="width:100%;padding:10px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;"')
    +'>&#9992; Odlec wszystkie ('+available.length+' wolnych)</button>'
    +'</div>';
  G.routes.forEach(function(r) {
    var ac=null; G.fleet.forEach(function(a){if(a.routeId===r.id)ac=a;});
    var flying=ac&&ac.status==='flying';
    var landed=ac&&ac.status==='landed';
    var prog=flying?Math.min(100,Math.round((Date.now()-r.startTime)/r.duration*100)):landed?100:0;
    var eta=flying?calcETA(r):'';
    var sc=flying?'#00e676':landed?'#f5a623':'#5580a0';
    var st=flying?'W LOCIE':landed?'WYLADOWAL':'NA ZIEMI';
    var sideBtn='';
    if(flying) {
      sideBtn='<div style="flex-shrink:0;padding:8px 10px;background:rgba(0,230,118,0.1);border:1px solid rgba(0,230,118,0.3);border-radius:8px;font-size:11px;color:#00e676;font-weight:700;text-align:center;min-width:44px;">'+eta+'</div>';
    } else {
      var canGo=available.length>0||landed;
      sideBtn='<div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">'
        +'<button onclick="departSingle(this)" data-rid="'+r.id+'" '
        +(!canGo?'disabled ':'')
        +'style="padding:8px 12px;background:'+(canGo?'linear-gradient(135deg,#1a56db,#00d4ff)':'rgba(26,86,219,0.2)')+';border:none;border-radius:8px;color:'+(canGo?'#fff':'#5580a0')+';font-size:11px;font-weight:700;font-family:Arial,sans-serif;cursor:'+(canGo?'pointer':'not-allowed')+';white-space:nowrap;">&#9992; Odlec</button>';
      sideBtn += '<button onclick="cancelRouteById(this)" data-id="'+r.id+'" style="padding:6px 10px;background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.3);border-radius:8px;color:#e63946;font-size:10px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;white-space:nowrap;">&#10005; Anuluj</button>';
      sideBtn += '</div>';
    }
    out+='<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.12);border-radius:12px;padding:12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:10px;">'
      +'<div style="flex:1;min-width:0;">'
      +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+r.from+' &#8594; '+r.to+'</div>'
      +'<div style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;background:rgba(255,255,255,0.07);color:'+sc+';">'+st+'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:#5580a0;margin-bottom:6px;">'+(ac?ac.model+' ('+ac.reg+')':'Brak samolotu')+' &bull; '+(r.durationMin?r.durationMin+'min':'?')+' &bull; $'+r.revenue.toLocaleString()+'</div>'
      +'<div style="height:3px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">'
      +'<div style="height:100%;width:'+prog+'%;background:linear-gradient(90deg,#1a56db,#00d4ff);border-radius:2px;"></div>'
      +'</div>'
      +'</div>'+sideBtn+'</div></div>';
  });
  body.innerHTML=out;
}

function departSingle(el) {
  var rid=el.dataset.rid;
  var r=null; G.routes.forEach(function(x){if(x.id===rid)r=x;});
  if(!r) return;
  var ac=G.fleet.filter(function(a){return a.routeId===r.id;})[0];
  if(ac&&ac.status==='landed') {
    var t=r.from; r.from=r.to; r.to=t;
    t=r.fromLat; r.fromLat=r.toLat; r.toLat=t;
    t=r.fromLng; r.fromLng=r.toLng; r.toLng=t;
    r.startTime=Date.now(); r.duration=5000;
    ac.status='flying';
    removeFlightLayer(r.id); drawFlightLayer(r);
    save(); showMsg('Odlecial '+ac.model+'!');
  } else {
    var free=null; G.fleet.forEach(function(a){if(a.status==='ground'&&!free)free=a;});
    if(!free){showMsg('Brak wolnych samolotow!');return;}
    free.status='flying'; free.routeId=r.id;
    r.startTime=Date.now(); r.duration=5000; r.acId=free.id;
    if(!r.fromLat&&G.homeAirport){r.fromLat=G.homeAirport.lat;r.fromLng=G.homeAirport.lng;}
    removeFlightLayer(r.id); drawFlightLayer(r);
    save(); showMsg('Odlecial '+free.model+'!');
  }
  var body=document.getElementById('panel-body');
  if(body) renderTrasy(body);
}

function departAll() {
  // Reset landed aircraft to ground first
  G.fleet.forEach(function(a){
    if(a.status==='landed' || a.status==='ground') {
      a.status='ground'; a.routeId=null;
    }
  });

  var departed=0;
  G.routes.forEach(function(r) {
    // Find free aircraft (ground status)
    var free=null;
    G.fleet.forEach(function(a){
      if(a.status==='ground' && !free) free=a;
    });
    if(free) {
      free.status='flying'; free.routeId=r.id;
      r.startTime=Date.now(); r.duration=5000; r.acId=free.id;
      if(!r.fromLat&&G.homeAirport){r.fromLat=G.homeAirport.lat;r.fromLng=G.homeAirport.lng;}
      removeFlightLayer(r.id); drawFlightLayer(r);
      departed++;
    }
  });
  if(departed>0){save();showMsg('Odlecelo '+departed+' samolotow!');}
  else showMsg('Brak wolnych samolotow!');
  var body=document.getElementById('panel-body');
  if(body) renderTrasy(body);
}


function cancelRouteById(el) {
  var rid = el && el.dataset ? el.dataset.id : null;
  if(rid) cancelRoute(rid);
}

function cancelRoute(rid) {
  if(!confirm('Na pewno anulowac te trase?')) return;
  // Free up aircraft
  G.fleet.forEach(function(a){ if(a.routeId===rid){ a.routeId=null; a.status='ground'; } });
  // Remove route
  G.routes = G.routes.filter(function(r){ return r.id!==rid; });
  // Remove flight layer
  removeFlightLayer(rid);
  save();
  showMsg('Trasa anulowana');
  var body = document.getElementById('panel-body');
  if(body) renderTrasy(body);
}
