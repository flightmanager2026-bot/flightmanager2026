/* -- NAPRAWY I KONSERWACJA -- */

var MAINTENANCE_HOURS = { default:2000 };

var RANDOM_INCIDENTS = [
  {id:'bird',   name:'Kolizja z ptakiem',   minCost:15000,  maxCost:80000,  prob:0.003},
  {id:'gear',   name:'Problem z podwoziem', minCost:50000,  maxCost:200000, prob:0.002},
  {id:'engine', name:'Awaria silnika',      minCost:100000, maxCost:500000, prob:0.001},
  {id:'hail',   name:'Uszkodzenie gradem',  minCost:30000,  maxCost:120000, prob:0.002},
  {id:'tire',   name:'Pęknięcie opony',     minCost:8000,   maxCost:25000,  prob:0.005},
];

function initMaintenance(ac) {
  if(!ac.maintenance) ac.maintenance={flightHours:0,condition:100,lastService:Date.now(),incidents:[],inMaintenance:false,maintenanceEnd:null};
}

function needsMaintenance(ac) {
  initMaintenance(ac);
  return ac.maintenance.flightHours >= (MAINTENANCE_HOURS[ac.model]||MAINTENANCE_HOURS.default);
}

function tickFlightHours(ac, durationMin) {
  initMaintenance(ac);
  ac.maintenance.flightHours += durationMin/60;
  ac.maintenance.condition = Math.max(0, ac.maintenance.condition - (durationMin/60)*0.05);
  RANDOM_INCIDENTS.forEach(function(inc){
    if(Math.random() < inc.prob*(durationMin/60)) {
      var cost=Math.round(inc.minCost+Math.random()*(inc.maxCost-inc.minCost));
      ac.maintenance.incidents.push({id:inc.id,name:inc.name,cost:cost,date:Date.now(),resolved:false});
      showMsg('⚠️ '+ac.model+': '+inc.name+'! Koszt: $'+cost.toLocaleString());
      if(typeof addGameNotification==='function') addGameNotification('⚠️ '+ac.model+' ('+ac.reg+'): '+inc.name+' — koszt naprawy $'+cost.toLocaleString(),'error');
    }
  });
}

function startMaintenance(acId, cost, usePkt) {
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  if(ac.status==='flying'){showMsg('Samolot jest w locie!');return;}
  var pktCost = Math.max(1, Math.round(cost/10000));
  if(usePkt) {
    if((G.points||0)<pktCost){showMsg('Za mało PKT! Potrzebujesz '+pktCost+' PKT');return;}
    G.points-=pktCost;
    showMsg('🔧 Opłacono '+pktCost+' PKT!');
  } else {
    if(G.cash<cost){showMsg('Za mało gotówki! Potrzebujesz $'+cost.toLocaleString());return;}
    G.cash-=cost;
  }
  ac.status='maintenance';
  initMaintenance(ac);
  var dur=(10+Math.floor(Math.random()*20))*60000;
  ac.maintenance.inMaintenance=true; ac.maintenance.maintenanceEnd=Date.now()+dur;
  save(); updateHUD();
  showMsg('🔧 Konserwacja! Gotowe za '+Math.round(dur/60000)+' min. Koszt: $'+cost.toLocaleString());
  var b=document.getElementById('panel-body'); if(b&&_activeTab==='naprawy') renderNaprawy(b);
}

function completeMaintenance(acId) {
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  initMaintenance(ac);
  ac.maintenance.inMaintenance=false; ac.maintenance.maintenanceEnd=null;
  ac.maintenance.flightHours=0; ac.maintenance.condition=100; ac.maintenance.lastService=Date.now();
  ac.status='ground'; save(); updateHUD();
  showMsg('✅ '+ac.model+' gotowy do lotów!');
  var b=document.getElementById('panel-body'); if(b&&_activeTab==='naprawy') renderNaprawy(b);
}

function repairIncident(acId, incId, usePkt) {
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  var inc=(ac.maintenance.incidents||[]).filter(function(i){return i.id===incId;})[0];
  if(!inc||inc.resolved) return;
  var pktCost = Math.max(1, Math.round(inc.cost/10000));
  if(usePkt) {
    if((G.points||0)<pktCost){showMsg('Za mało PKT! Potrzebujesz '+pktCost+' PKT');return;}
    G.points-=pktCost;
  } else {
    if(G.cash<inc.cost){showMsg('Za mało gotówki! Potrzebujesz $'+inc.cost.toLocaleString());return;}
    G.cash-=inc.cost;
  }
  inc.resolved=true;
  ac.maintenance.condition=Math.min(100,(ac.maintenance.condition||0)+20);
  save(); updateHUD();
  showMsg('✅ Naprawa ukończona! $'+inc.cost.toLocaleString());
  var b=document.getElementById('panel-body'); if(b&&_activeTab==='naprawy') renderNaprawy(b);
}

function formatMaintTimer(endTime) {
  var ms=Math.max(0,endTime-Date.now());
  if(ms<=0) return 'Gotowe!';
  var h=Math.floor(ms/3600000), m=Math.floor((ms%3600000)/60000);
  return h>0?h+'h '+m+'min':m+'min';
}

function renderNaprawy(body) {
  G.fleet.forEach(function(ac){initMaintenance(ac);});

  var incidents=[];
  G.fleet.forEach(function(ac){
    (ac.maintenance.incidents||[]).forEach(function(i){if(!i.resolved) incidents.push({ac:ac,inc:i});});
  });

  var html =
    '<div style="background:linear-gradient(135deg,rgba(249,115,22,0.1),rgba(239,68,68,0.07));'
    +'border:1px solid rgba(249,115,22,0.25);border-radius:16px;padding:16px;margin-bottom:14px;">'
    +'<div style="display:flex;align-items:center;gap:14px;">'
    +'<div style="width:48px;height:48px;background:rgba(249,115,22,0.15);border-radius:14px;'
    +'display:flex;align-items:center;justify-content:center;font-size:24px;border:1px solid rgba(249,115,22,0.3);">🔧</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:15px;font-weight:900;color:#f1f5f9;">Centrum Serwisowe</div>'
    +'<div style="font-size:11px;color:#94a3b8;margin-top:2px;">Konserwacja wymagana co '+(MAINTENANCE_HOURS.default)+' godzin lotu</div>'
    +'</div>'
    +(incidents.length>0?'<div style="background:#ef4444;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;flex-shrink:0;">'+incidents.length+' awarii</div>':'')
    +'</div></div>';

  if(incidents.length>0) {
    html+='<div style="font-size:9px;font-weight:700;color:#ef4444;letter-spacing:3px;margin-bottom:8px;">🚨 AWARIE</div>';
    incidents.forEach(function(item){
      html+=
        '<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:14px;padding:14px;margin-bottom:8px;">'
        +'<div style="display:flex;align-items:center;gap:12px;">'
        +'<div style="font-size:28px;">⚠️</div>'
        +'<div style="flex:1;">'
        +'<div style="font-size:13px;font-weight:700;color:#ef4444;">'+item.inc.name+'</div>'
        +'<div style="font-size:11px;color:#94a3b8;margin-top:2px;">'+item.ac.model+' · '+item.ac.reg+'</div>'
        +'<div style="font-size:12px;font-weight:700;color:#f97316;margin-top:4px;">Koszt naprawy: $'+item.inc.cost.toLocaleString()+'</div>'
        +'</div>'
        +'<button onclick="repairIncident(\''+item.ac.id+'\',\''+item.inc.id+'\')" '
        +'style="padding:10px 16px;background:linear-gradient(135deg,#ef4444,#dc2626);border:none;'
        +'border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;'
        +'white-space:nowrap;flex-shrink:0;">Napraw</button>'
        +'</div></div>';
    });
  }

  if(!G.fleet.length) {
    html+='<div style="padding:40px;text-align:center;color:#94a3b8;font-size:13px;">Brak samolotów we flocie</div>';
    body.innerHTML=html; return;
  }

  html+='<div style="font-size:9px;font-weight:700;color:#94a3b8;letter-spacing:3px;margin-bottom:10px;">STAN FLOTY</div>';

  G.fleet.forEach(function(ac) {
    var m=ac.maintenance;
    var needed=MAINTENANCE_HOURS[ac.model]||MAINTENANCE_HOURS.default;
    var hours=Math.round(m.flightHours||0);
    var pct=Math.min(100,Math.round(hours/needed*100));
    var cond=Math.round(m.condition||100);
    var condColor=cond>75?'#10b981':cond>50?'#f97316':'#ef4444';
    var serviceColor=pct>90?'#ef4444':pct>70?'#f97316':'#10b981';
    var maintCost=Math.round(needed*ac.seats*10);
    var inMaint=m.inMaintenance;
    var maintDone=inMaint&&m.maintenanceEnd&&Date.now()>=m.maintenanceEnd;
    var needsServ=needsMaintenance(ac);
    var hasIncident=(m.incidents||[]).some(function(i){return !i.resolved;});
    var statusBadge=inMaint&&!maintDone?'🔧 W serwisie':maintDone?'✅ Gotowy':needsServ?'⚠️ Wymaga serwisu':hasIncident?'🚨 Awaria':'✓ Sprawny';
    var badgeColor=inMaint&&!maintDone?'#f97316':maintDone?'#10b981':needsServ||hasIncident?'#ef4444':'#10b981';

    html+=
      '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
      +'border-radius:16px;padding:14px;margin-bottom:10px;overflow:hidden;position:relative;">'
      +(needsServ||hasIncident?'<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#ef4444,transparent);"></div>':'')
      +(maintDone?'<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#10b981,transparent);"></div>':'')
      +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">'
      +'<div style="width:44px;height:44px;border-radius:12px;background:rgba(0,0,0,0.3);'
      +'border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">✈️</div>'
      +'<div style="flex:1;min-width:0;">'
      +'<div style="font-size:14px;font-weight:700;color:#f1f5f9;">'+ac.model+'</div>'
      +'<div style="font-size:11px;color:#94a3b8;">'+ac.reg+' · '+hours+' h lotu</div>'
      +'</div>'
      +'<div style="font-size:11px;font-weight:700;color:'+badgeColor+';">'+statusBadge+'</div>'
      +'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">'
      +'<div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:10px;">'
      +'<div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:6px;">'
      +'<span style="color:#94a3b8;">Stan techniczny</span>'
      +'<span style="color:'+condColor+';font-weight:700;">'+cond+'%</span></div>'
      +'<div style="height:6px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;">'
      +'<div style="height:100%;width:'+cond+'%;background:'+condColor+';border-radius:3px;"></div></div></div>'
      +'<div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:10px;">'
      +'<div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:6px;">'
      +'<span style="color:#94a3b8;">Do serwisu</span>'
      +'<span style="color:'+serviceColor+';font-weight:700;">'+hours+'/'+needed+'h</span></div>'
      +'<div style="height:6px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;">'
      +'<div style="height:100%;width:'+pct+'%;background:'+serviceColor+';border-radius:3px;"></div></div></div>'
      +'</div>'
      +'<div style="display:flex;gap:8px;">'
      +(hasIncident
        ?'<button onclick="repairIncident(\''+ac.id+'\',\''+(m.incidents.filter(function(i){return !i.resolved;})[0]||{}).id+'\')" '
          +'style="flex:1;padding:10px;background:linear-gradient(135deg,#ef4444,#dc2626);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">⚒ Napraw awarię</button>'
        :'<button disabled style="flex:1;padding:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;color:#1e293b;font-size:12px;font-weight:700;cursor:not-allowed;font-family:Arial,sans-serif;">⚒ Napraw</button>'
      )
      +(maintDone
        ?'<button onclick="completeMaintenance(\''+ac.id+'\')" '
          +'style="flex:1;padding:10px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">✓ Odbierz</button>'
        :inMaint&&!maintDone
          ?'<div style="flex:1;padding:10px;background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.2);border-radius:10px;text-align:center;">'
            +'<div style="font-size:10px;color:#f97316;font-weight:700;" id="mt-'+ac.id+'">'+formatMaintTimer(m.maintenanceEnd)+'</div></div>'
          :needsServ
            ?'<button onclick="startMaintenance(\''+ac.id+'\','+maintCost+')" '
              +'style="flex:1;padding:10px;background:linear-gradient(135deg,#f97316,#ea580c);border:none;border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">🔧 Serwis $'+Math.round(maintCost/1000)+'K</button>'
            :'<button disabled style="flex:1;padding:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;color:#1e293b;font-size:12px;font-weight:700;cursor:not-allowed;font-family:Arial,sans-serif;">🔧 Serwis</button>'
      )
      +'</div></div>';
  });

  body.innerHTML=html;

  clearInterval(window._maintTimerInterval);
  window._maintTimerInterval=setInterval(function(){
    G.fleet.forEach(function(ac){
      if(ac.maintenance&&ac.maintenance.inMaintenance&&ac.maintenance.maintenanceEnd){
        var el=document.getElementById('mt-'+ac.id);
        if(el) el.textContent=formatMaintTimer(ac.maintenance.maintenanceEnd);
      }
    });
  },10000);
}
