/* -- NAPRAWY I KONSERWACJA -- */

var MAINTENANCE_HOURS = {
  default: 2000,
  // Per model overrides
  '737-800': 2000, 'A320 Neo': 2500, 'A321 Neo': 2500,
  '787-8': 3000, '787-9': 3000, 'A350-900': 3500
};

var RANDOM_INCIDENTS = [
  {id:'bird',    name:'Kolizja z ptakiem',    minCost:15000,  maxCost:80000,  prob:0.003},
  {id:'gear',    name:'Problem z podwoziem',  minCost:50000,  maxCost:200000, prob:0.002},
  {id:'engine',  name:'Awaria silnika',       minCost:100000, maxCost:500000, prob:0.001},
  {id:'hail',    name:'Grad uszkodził kadłub',minCost:30000,  maxCost:120000, prob:0.002},
  {id:'tire',    name:'Pęknięcie opony',      minCost:8000,   maxCost:25000,  prob:0.005},
];

function getMaintenanceHours(model) {
  return MAINTENANCE_HOURS[model] || MAINTENANCE_HOURS.default;
}

function initMaintenance(ac) {
  if(!ac.maintenance) ac.maintenance = {
    flightHours: 0,
    condition: 100,
    lastService: Date.now(),
    incidents: [],
    inMaintenance: false,
    maintenanceEnd: null
  };
}

// Called after each flight
function tickFlightHours(ac, durationMin) {
  initMaintenance(ac);
  ac.maintenance.flightHours += (durationMin/60);
  ac.maintenance.condition = Math.max(0, ac.maintenance.condition - (durationMin/60)*0.05);

  // Check for random incident
  RANDOM_INCIDENTS.forEach(function(inc){
    if(Math.random() < inc.prob * (durationMin/60)) {
      var cost = Math.round(inc.minCost + Math.random()*(inc.maxCost-inc.minCost));
      ac.maintenance.incidents.push({
        id: inc.id,
        name: inc.name,
        cost: cost,
        date: Date.now(),
        resolved: false
      });
      addNotification('⚠️ '+ac.model+' ('+ac.reg+'): '+inc.name+' — koszt naprawy $'+cost.toLocaleString());
    }
  });
}

var _notifications = [];
function addNotification(msg) {
  _notifications.push({msg:msg, time:Date.now(), read:false});
  // Show message
  showMsg(msg);
}

function needsMaintenance(ac) {
  initMaintenance(ac);
  var needed = getMaintenanceHours(ac.model);
  return ac.maintenance.flightHours >= needed;
}

function hasUnresolvedIncidents(ac) {
  initMaintenance(ac);
  return (ac.maintenance.incidents||[]).some(function(i){return !i.resolved;});
}

function renderNaprawy(body) {
  if(!G.fleet.length) {
    body.innerHTML = '<div style="padding:40px;text-align:center;color:#5580a0;">Brak samolotów we flocie</div>';
    return;
  }

  // Init all
  G.fleet.forEach(function(ac){ initMaintenance(ac); });

  // Notifications
  var unread = _notifications.filter(function(n){return !n.read;});

  var html =
    // Header
    '<div style="background:linear-gradient(135deg,rgba(245,166,35,0.08),rgba(245,166,35,0.03));'
    +'border:1px solid rgba(245,166,35,0.2);border-radius:14px;padding:14px;margin-bottom:12px;">'
    +'<div style="display:flex;align-items:center;gap:12px;">'
    +'<div style="font-size:28px;">🔧</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:14px;font-weight:700;color:#e0f0ff;">Centrum Napraw i Konserwacji</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">Konserwacja co '+MAINTENANCE_HOURS.default+' godzin lotu</div>'
    +'</div>'
    +(unread.length>0?'<div style="background:#e63946;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;">'+unread.length+' alert</div>':'')
    +'</div></div>';

  // Alerts/Incidents
  var allIncidents = [];
  G.fleet.forEach(function(ac){
    (ac.maintenance.incidents||[]).forEach(function(inc){
      if(!inc.resolved) allIncidents.push({ac:ac, inc:inc});
    });
  });

  if(allIncidents.length > 0) {
    html += '<div style="font-size:9px;color:#e63946;letter-spacing:3px;margin-bottom:8px;">🚨 AWARIE WYMAGAJĄCE NAPRAWY</div>';
    allIncidents.forEach(function(item){
      html +=
        '<div style="background:rgba(230,57,70,0.08);border:1px solid rgba(230,57,70,0.25);border-radius:12px;padding:12px;margin-bottom:8px;">'
        +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">'
        +'<div style="font-size:22px;">⚠️</div>'
        +'<div style="flex:1;">'
        +'<div style="font-size:13px;font-weight:700;color:#e63946;">'+item.inc.name+'</div>'
        +'<div style="font-size:11px;color:#5580a0;">'+item.ac.model+' ('+item.ac.reg+')</div>'
        +'<div style="font-size:11px;color:#f5a623;font-weight:700;">Koszt naprawy: $'+item.inc.cost.toLocaleString()+'</div>'
        +'</div>'
        +'<button onclick="repairIncident(\''+item.ac.id+'\',\''+item.inc.id+'\')" '
        +'style="padding:8px 14px;background:linear-gradient(135deg,#e63946,#c0392b);border:none;border-radius:10px;'
        +'color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Napraw</button>'
        +'</div></div>';
    });
  }

  // Fleet maintenance status
  html += '<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin-bottom:10px;margin-top:4px;">STAN FLOTY</div>';

  G.fleet.forEach(function(ac) {
    var m = ac.maintenance;
    var needed = getMaintenanceHours(ac.model);
    var pct = Math.min(100, Math.round(m.flightHours/needed*100));
    var cond = Math.round(m.condition||100);
    var condColor = cond>75?'#00e676':cond>50?'#f5a623':'#e63946';
    var serviceColor = pct>90?'#e63946':pct>70?'#f5a623':'#00e676';
    var maintenanceCost = Math.round(needed * ac.seats * 10);
    var inMaint = m.inMaintenance;
    var maintDone = inMaint && m.maintenanceEnd && Date.now() >= m.maintenanceEnd;

    html +=
      '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
      +'border-radius:12px;padding:12px;margin-bottom:8px;">'

      // Header
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">'
      +'<div style="font-size:20px;flex-shrink:0;">✈</div>'
      +'<div style="flex:1;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+ac.model+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+ac.reg+' &bull; '+Math.round(m.flightHours||0)+' h lotu</div>'
      +'</div>'
      +(inMaint && !maintDone
        ?'<div style="text-align:right;"><div style="font-size:10px;color:#f5a623;font-weight:700;">🔧 W konserwacji</div>'
          +'<div style="font-size:9px;color:#5580a0;" id="maint-timer-'+ac.id+'">'+formatMaintTimer(m.maintenanceEnd)+'</div></div>'
        :maintDone
          ?'<button onclick="completeMaintenance(\''+ac.id+'\')" style="padding:6px 12px;background:linear-gradient(135deg,#00e676,#00b894);border:none;border-radius:8px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">✓ Odbierz</button>'
          :needsMaintenance(ac)
            ?'<button onclick="startMaintenance(\''+ac.id+'\','+maintenanceCost+')" style="padding:6px 12px;background:linear-gradient(135deg,#e63946,#c0392b);border:none;border-radius:8px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Konserwacja $'+Math.round(maintenanceCost/1000)+'K</button>'
            :'<div style="font-size:10px;color:#00e676;font-weight:700;">✓ OK</div>'
      )
      +'</div>'

      // Condition bar
      +'<div style="display:flex;gap:8px;margin-bottom:6px;">'
      +'<div style="flex:1;">'
      +'<div style="display:flex;justify-content:space-between;font-size:9px;color:#5580a0;margin-bottom:3px;">'
      +'<span>Stan techniczny</span><span style="color:'+condColor+'">'+cond+'%</span></div>'
      +'<div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;">'
      +'<div style="height:100%;width:'+cond+'%;background:'+condColor+';border-radius:2px;"></div></div>'
      +'</div>'
      +'<div style="flex:1;">'
      +'<div style="display:flex;justify-content:space-between;font-size:9px;color:#5580a0;margin-bottom:3px;">'
      +'<span>Do konserwacji</span><span style="color:'+serviceColor+'">'+Math.round(m.flightHours||0)+'/'+needed+'h</span></div>'
      +'<div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;">'
      +'<div style="height:100%;width:'+pct+'%;background:'+serviceColor+';border-radius:2px;"></div></div>'
      +'</div></div>'

      +(needsMaintenance(ac)&&!inMaint?'<div style="font-size:10px;color:#e63946;margin-top:4px;">⚠️ Wymagana konserwacja! Samolot może mieć ograniczenia lotów.</div>':'')
      +'</div>';
  });

  body.innerHTML = html;

  // Start maintenance timers
  G.fleet.forEach(function(ac){
    if(ac.maintenance && ac.maintenance.inMaintenance && ac.maintenance.maintenanceEnd) {
      startMaintTimer(ac.id, ac.maintenance.maintenanceEnd);
    }
  });
}

function formatMaintTimer(endTime) {
  if(!endTime) return '';
  var ms = Math.max(0, endTime - Date.now());
  if(ms <= 0) return 'Gotowe!';
  var h = Math.floor(ms/3600000);
  var m = Math.floor((ms%3600000)/60000);
  return h+'h '+String(m).padStart(2,'0')+'min pozostało';
}

function startMaintTimer(acId, endTime) {
  var el = document.getElementById('maint-timer-'+acId);
  if(!el) return;
  var interval = setInterval(function(){
    var el2 = document.getElementById('maint-timer-'+acId);
    if(!el2){ clearInterval(interval); return; }
    var ms = Math.max(0, endTime - Date.now());
    if(ms <= 0) {
      clearInterval(interval);
      var body = document.getElementById('panel-body');
      if(body && _activeTab==='naprawy') renderNaprawy(body);
    } else {
      el2.textContent = formatMaintTimer(endTime);
    }
  }, 10000);
}

function startMaintenance(acId, cost) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  if(G.cash < cost){ showMsg('Za mało gotówki! Potrzebujesz $'+cost.toLocaleString()); return; }
  if(ac.status === 'flying'){ showMsg('Samolot jest w locie!'); return; }

  G.cash -= cost;
  ac.status = 'maintenance';
  initMaintenance(ac);

  // Duration: 4-8 hours real time (shortened to 10-30 minutes for gameplay)
  var durationMs = (10 + Math.floor(Math.random()*20)) * 60 * 1000; // 10-30 min
  ac.maintenance.inMaintenance = true;
  ac.maintenance.maintenanceEnd = Date.now() + durationMs;

  save(); updateHUD();
  showMsg('🔧 Konserwacja rozpoczęta! Gotowe za '+Math.round(durationMs/60000)+' minut. Koszt: $'+cost.toLocaleString());

  var body = document.getElementById('panel-body');
  if(body && _activeTab==='naprawy') renderNaprawy(body);
}

function completeMaintenance(acId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  initMaintenance(ac);
  ac.maintenance.inMaintenance = false;
  ac.maintenance.maintenanceEnd = null;
  ac.maintenance.flightHours = 0;
  ac.maintenance.condition = 100;
  ac.maintenance.lastService = Date.now();
  ac.status = 'ground';
  save(); updateHUD();
  showMsg('✅ '+ac.model+' przeszedł konserwację! Gotowy do lotów.');
  var body = document.getElementById('panel-body');
  if(body && _activeTab==='naprawy') renderNaprawy(body);
}

function repairIncident(acId, incId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  var inc = (ac.maintenance.incidents||[]).filter(function(i){return i.id===incId;})[0];
  if(!inc || inc.resolved) return;
  if(G.cash < inc.cost){ showMsg('Za mało gotówki! Potrzebujesz $'+inc.cost.toLocaleString()); return; }
  G.cash -= inc.cost;
  inc.resolved = true;
  ac.maintenance.condition = Math.min(100, (ac.maintenance.condition||0)+20);
  save(); updateHUD();
  showMsg('✅ Naprawa ukończona! Koszt: $'+inc.cost.toLocaleString());
  var body = document.getElementById('panel-body');
  if(body && _activeTab==='naprawy') renderNaprawy(body);
}
