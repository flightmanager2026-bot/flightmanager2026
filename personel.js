/* -- PERSONEL -- */

var BRAND_LOGOS = {
  'Airbus': 'img/AIRBUS_Blue.png',
  'Embraer': 'img/embraer-vector-logo-removebg-preview.png'
};

var STAFF_TYPES = {
  pilot:    { label:'Pilot',       icon:'✈️', color:'#00d4ff', salaryMin:60,   salaryMax:120,  neededPerAc:2, desc:'Wymagany do lotu (2 na samolot)' },
  steward:  { label:'Steward/essa',icon:'👩‍✈️', color:'#a78bfa', salaryMin:30,   salaryMax:70,   neededPerAc:4, desc:'Obsługa pasażerów (4 na samolot)' },
  mechanic: { label:'Mechanik',    icon:'🔧', color:'#f5a623', salaryMin:40,   salaryMax:90,   neededPerAc:1, desc:'Konserwacja samolotu (1 na samolot)' },
  engineer: { label:'Inżynier',    icon:'👷', color:'#00e676', salaryMin:70,   salaryMax:150,  neededPerAc:0.33, desc:'Nadzór techniczny (1 na 3 samoloty)' }
};

var FIRST_NAMES_M = ['Adam','Piotr','Marek','Tomasz','Paweł','Michał','Andrzej','Grzegorz','Rafał','Łukasz','Jakub','Krzysztof','Robert','Marcin','Bartosz'];
var FIRST_NAMES_F = ['Anna','Maria','Katarzyna','Agnieszka','Monika','Karolina','Magdalena','Joanna','Natalia','Aleksandra','Marta','Ewa','Paulina','Izabela','Barbara'];
var LAST_NAMES = ['Kowalski','Nowak','Wiśniewski','Dąbrowski','Lewandowski','Wójcik','Kamiński','Kowalczyk','Zieliński','Szymański','Woźniak','Kozłowski','Jankowski','Wojciechowski','Kwiatkowski'];

function randomName(type) {
  if(type==='steward') {
    var fn = FIRST_NAMES_F[Math.floor(Math.random()*FIRST_NAMES_F.length)];
    var ln = LAST_NAMES[Math.floor(Math.random()*LAST_NAMES.length)];
    return fn+' '+ln+'a';
  }
  var fn = Math.random()>0.3 ? FIRST_NAMES_M[Math.floor(Math.random()*FIRST_NAMES_M.length)] : FIRST_NAMES_F[Math.floor(Math.random()*FIRST_NAMES_F.length)];
  var ln = LAST_NAMES[Math.floor(Math.random()*LAST_NAMES.length)];
  return fn+' '+ln;
}

function generateCandidate(type) {
  var st = STAFF_TYPES[type];
  var exp = Math.floor(Math.random()*15)+1;
  var salary = Math.round(st.salaryMin + (st.salaryMax-st.salaryMin)*(exp/15) + Math.random()*300);
  return {
    id: type+'_c_'+Date.now()+'_'+Math.random().toString(36).substr(2,5),
    name: randomName(type),
    experience: exp,
    salary: salary,
    rating: Math.min(5, Math.ceil(exp/3)),
    type: type
  };
}

function initStaff() {
  if(!G.staff) G.staff = {pilot:[],steward:[],mechanic:[],engineer:[]};
  if(!G.jobMarket) {
    G.jobMarket = {};
    Object.keys(STAFF_TYPES).forEach(function(type){
      G.jobMarket[type] = [];
      for(var i=0;i<6;i++) G.jobMarket[type].push(generateCandidate(type));
    });
  }
  // Auto-refresh market - add new candidates if < 4
  Object.keys(STAFF_TYPES).forEach(function(type){
    if(!G.jobMarket[type]) G.jobMarket[type]=[];
    while(G.jobMarket[type].length < 4) {
      G.jobMarket[type].push(generateCandidate(type));
    }
  });
}

function getNeeded(type) {
  var st = STAFF_TYPES[type];
  if(type==='engineer') return Math.max(1, Math.ceil(G.fleet.length * st.neededPerAc));
  return G.fleet.length * st.neededPerAc;
}

function renderPersonel(body) {
  initStaff();
  var tabs = [
    {id:'overview', label:'📊 Przegląd'},
    {id:'pilot', label:'✈️ Piloci'},
    {id:'steward', label:'👩‍✈️ Stewardzi'},
    {id:'mechanic', label:'🔧 Mechanicy'},
    {id:'engineer', label:'👷 Inżynierowie'}
  ];

  var html = '<div style="display:flex;gap:4px;margin-bottom:14px;overflow-x:auto;padding-bottom:4px;">';
  tabs.forEach(function(t){
    html += '<button onclick="openPersonelTab(\''+t.id+'\')" id="ptab-'+t.id+'" '
      +'style="padding:6px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);'
      +'border-radius:20px;color:#5580a0;font-size:11px;font-weight:700;cursor:pointer;'
      +'font-family:Arial,sans-serif;white-space:nowrap;flex-shrink:0;">'+t.label+'</button>';
  });
  html += '</div><div id="personel-content"></div>';
  body.innerHTML = html;
  openPersonelTab('overview');
}

function openPersonelTab(tab) {
  ['overview','pilot','steward','mechanic','engineer'].forEach(function(t){
    var el=document.getElementById('ptab-'+t);
    if(!el) return;
    el.style.background = t===tab?'rgba(0,212,255,0.15)':'rgba(255,255,255,0.05)';
    el.style.color = t===tab?'#00d4ff':'#5580a0';
    el.style.borderColor = t===tab?'rgba(0,212,255,0.4)':'rgba(255,255,255,0.1)';
  });
  var c=document.getElementById('personel-content');
  if(!c) return;
  if(tab==='overview') renderOverview(c);
  else renderStaffType(c, tab);
}

function renderOverview(el) {
  initStaff();
  var totalSalary=0;
  Object.keys(G.staff).forEach(function(t){ (G.staff[t]||[]).forEach(function(e){ totalSalary+=e.salary; }); });

  var html =
    // Header stats
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">'
    +'<div style="background:linear-gradient(135deg,rgba(0,212,255,0.1),rgba(26,86,219,0.1));border:1px solid rgba(0,212,255,0.2);border-radius:12px;padding:12px;text-align:center;">'
    +'<div style="font-size:24px;font-weight:900;color:#00d4ff;">'+
    Object.keys(G.staff).reduce(function(s,t){return s+(G.staff[t]||[]).length;},0)+'</div>'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:1px;margin-top:2px;">PRACOWNIKÓW</div>'
    +'</div>'
    +'<div style="background:linear-gradient(135deg,rgba(230,57,70,0.1),rgba(230,57,70,0.05));border:1px solid rgba(230,57,70,0.2);border-radius:12px;padding:12px;text-align:center;">'
    +'<div style="font-size:20px;font-weight:900;color:#e63946;">$'+totalSalary.toLocaleString()+'</div>'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:1px;margin-top:2px;">PENSJE/24H</div>'
    +'</div></div>';

  // Staff status per type
  Object.keys(STAFF_TYPES).forEach(function(type){
    var st=STAFF_TYPES[type];
    var count=(G.staff[type]||[]).length;
    var needed=getNeeded(type);
    var pct=needed>0?Math.min(100,Math.round(count/needed*100)):100;
    var ok=count>=needed;
    var barColor=ok?'#00e676':pct>50?'#f5a623':'#e63946';

    html +=
      '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
      +'border-radius:14px;padding:14px;margin-bottom:8px;cursor:pointer;" '
      +'onclick="openPersonelTab(\''+type+'\')">'
      +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">'
      +'<div style="width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,0.05);'
      +'display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">'+st.icon+'</div>'
      +'<div style="flex:1;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+st.label+'</div>'
      +'<div style="font-size:12px;font-weight:900;color:'+barColor+';">'+count+'/'+needed+'</div>'
      +'</div>'
      +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'+st.desc+'</div>'
      +'</div></div>'
      +'<div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">'
      +'<div style="height:100%;width:'+pct+'%;background:'+barColor+';border-radius:2px;transition:width 0.3s;"></div>'
      +'</div>'
      +(!ok?'<div style="margin-top:8px;font-size:10px;color:#f5a623;">⚠ Potrzeba jeszcze '+(needed-count)+' osób</div>':'')
      +'</div>';
  });

  el.innerHTML = html;
}

function renderStaffType(el, type) {
  initStaff();
  var st=STAFF_TYPES[type];
  var employed=G.staff[type]||[];
  var market=G.jobMarket[type]||[];
  var needed=getNeeded(type);

  var html =
    // Stats bar
    '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
    +'border-radius:12px;padding:12px;margin-bottom:14px;display:flex;align-items:center;gap:14px;">'
    +'<div style="font-size:28px;">'+st.icon+'</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:14px;font-weight:700;color:#e0f0ff;">'+st.label+'</div>'
    +'<div style="font-size:11px;color:#5580a0;">Zatrudnieni: <b style="color:'+(employed.length>=needed?'#00e676':'#e63946')+'">'+employed.length+'/'+needed+'</b></div>'
    +'</div>'
    +'<button onclick="refreshMarket(\''+type+'\')" '
    +'style="padding:6px 10px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);'
    +'border-radius:8px;color:#00d4ff;font-size:10px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">'
    +'🔄 Odśwież</button>'
    +'</div>';

  // Employed section
  if(employed.length > 0) {
    html += '<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin-bottom:8px;">ZATRUDNIENI</div>';
    employed.forEach(function(emp, i) {
      var assignedAc=null;
      G.fleet.forEach(function(ac){ if(ac.crew&&ac.crew[type]&&ac.crew[type].indexOf(emp.id)>=0) assignedAc=ac; });
      var stars='';
      for(var s=0;s<5;s++) stars+=s<emp.rating?'★':'☆';

      html +=
        '<div style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.12);'
        +'border-radius:12px;padding:12px;margin-bottom:6px;">'
        +'<div style="display:flex;align-items:center;gap:10px;">'
        +'<div style="width:38px;height:38px;border-radius:50%;background:rgba(0,212,255,0.1);'
        +'border:2px solid rgba(0,212,255,0.3);display:flex;align-items:center;justify-content:center;'
        +'font-size:16px;flex-shrink:0;">'+st.icon+'</div>'
        +'<div style="flex:1;min-width:0;">'
        +'<div style="font-size:12px;font-weight:700;color:#e0f0ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+emp.name+'</div>'
        +'<div style="font-size:10px;color:#f5a623;">'+stars+'</div>'
        +'<div style="font-size:10px;color:#5580a0;">Dośw: '+emp.experience+' lat &bull; <span style="color:#00e676;">$'+emp.salary.toLocaleString()+'/24h</span></div>'
        +'<div style="font-size:10px;margin-top:2px;color:'+(assignedAc?'#00e676':'#f5a623')+';">'
        +(assignedAc?'✓ '+assignedAc.model+' ('+assignedAc.reg+')':'⚠ Nieprzypisany')
        +'</div></div>'
        +'<div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0;">'
        +(G.fleet.length>0?'<button onclick="assignStaff(\''+type+'\',\''+emp.id+'\')" '
          +'style="padding:5px 8px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);'
          +'border-radius:6px;color:#00d4ff;font-size:10px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Przypisz</button>':'')
        +'<button onclick="fireStaff(\''+type+'\','+i+')" '
        +'style="padding:5px 8px;background:rgba(230,57,70,0.08);border:1px solid rgba(230,57,70,0.2);'
        +'border-radius:6px;color:#e63946;font-size:10px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Zwolnij</button>'
        +'</div></div></div>';
    });
  }

  // Market section
  html += '<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin:14px 0 8px;">RYNEK PRACY — KANDYDACI</div>';

  if(market.length===0) {
    html += '<div style="padding:20px;text-align:center;color:#5580a0;font-size:12px;">Brak kandydatów — odśwież listę</div>';
  } else {
    market.forEach(function(c, i) {
      var stars='';
      for(var s=0;s<5;s++) stars+=s<c.rating?'★':'☆';
      html +=
        '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
        +'border-radius:12px;padding:12px;margin-bottom:6px;">'
        +'<div style="display:flex;align-items:center;gap:10px;">'
        +'<div style="width:38px;height:38px;border-radius:50%;background:rgba(245,166,35,0.1);'
        +'border:1px solid rgba(245,166,35,0.2);display:flex;align-items:center;justify-content:center;'
        +'font-size:16px;flex-shrink:0;">'+st.icon+'</div>'
        +'<div style="flex:1;min-width:0;">'
        +'<div style="font-size:12px;font-weight:700;color:#e0f0ff;">'+c.name+'</div>'
        +'<div style="font-size:10px;color:#f5a623;">'+stars+' Dośw: '+c.experience+' lat</div>'
        +'<div style="font-size:11px;font-weight:700;color:#00e676;">$'+c.salary.toLocaleString()+'/24h</div>'
        +'</div>'
        +'<button onclick="hireStaff(\''+type+'\','+i+')" '
        +'style="padding:8px 14px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;'
        +'border-radius:10px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;'
        +'font-family:Arial,sans-serif;white-space:nowrap;flex-shrink:0;">Zatrudnij</button>'
        +'</div></div>';
    });
  }

  el.innerHTML = html;
}

function refreshMarket(type) {
  initStaff();
  G.jobMarket[type] = [];
  for(var i=0;i<6;i++) G.jobMarket[type].push(generateCandidate(type));
  save();
  var c=document.getElementById('personel-content');
  if(c) renderStaffType(c, type);
}

function hireStaff(type, idx) {
  initStaff();
  var c=G.jobMarket[type][idx]; if(!c) return;
  G.staff[type].push({id:c.id,name:c.name,experience:c.experience,salary:c.salary,rating:c.rating,assignedAcId:null});
  G.jobMarket[type].splice(idx,1);
  // Auto-add new candidate
  G.jobMarket[type].push(generateCandidate(type));
  save();
  showMsg('✓ '+c.name+' zatrudniony/a! $'+c.salary.toLocaleString()+'/mies.');
  var content=document.getElementById('personel-content'); if(content) renderStaffType(content,type);
}

function fireStaff(type, idx) {
  initStaff();
  var emp=G.staff[type][idx]; if(!emp) return;
  if(!confirm('Zwolnić '+emp.name+'?')) return;
  G.fleet.forEach(function(ac){ if(ac.crew&&ac.crew[type]) ac.crew[type]=ac.crew[type].filter(function(id){return id!==emp.id;}); });
  G.staff[type].splice(idx,1);
  save();
  showMsg(emp.name+' zwolniony/a.');
  var c=document.getElementById('personel-content'); if(c) renderStaffType(c,type);
}

function assignStaff(type, empId) {
  initStaff();
  if(!G.fleet.length){showMsg('Brak samolotów!');return;}
  var emp=null; G.staff[type].forEach(function(e){if(e.id===empId)emp=e;});
  if(!emp) return;

  var maxCrew={pilot:2,steward:4,mechanic:1,engineer:1}[type]||1;

  var html=
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:4px;">Przypisz do samolotu</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:14px;">'+emp.name+'</div>';

  G.fleet.forEach(function(ac){
    var crew=ac.crew||{}; var typeCrew=crew[type]||[];
    var hasSlot=typeCrew.length<maxCrew;
    var already=typeCrew.indexOf(empId)>=0;
    html +=
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px;'
      +'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;margin-bottom:6px;">'
      +'<div>'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+ac.model+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+ac.reg+' &bull; obsada: '+typeCrew.length+'/'+maxCrew+'</div>'
      +'</div>'
      +(already?'<div style="font-size:10px;color:#00e676;font-weight:700;">✓ Przypisany</div>'
        :hasSlot?'<button onclick="doAssign(\''+type+'\',\''+empId+'\',\''+ac.id+'\')" '
          +'style="padding:6px 14px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;'
          +'border-radius:8px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Przypisz</button>'
        :'<div style="font-size:10px;color:#e63946;">Pełna obsada</div>')
      +'</div>';
  });

  document.getElementById('modal-body').innerHTML=html;
  document.getElementById('modal').style.display='flex';
}

function doAssign(type, empId, acId) {
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  if(!ac.crew) ac.crew={};
  if(!ac.crew[type]) ac.crew[type]=[];
  var maxCrew={pilot:2,steward:4,mechanic:1,engineer:1}[type]||1;
  if(ac.crew[type].length>=maxCrew){showMsg('Pełna obsada!');return;}
  if(ac.crew[type].indexOf(empId)>=0){showMsg('Już przypisany!');return;}
  G.fleet.forEach(function(a){ if(a.id!==acId&&a.crew&&a.crew[type]) a.crew[type]=a.crew[type].filter(function(id){return id!==empId;}); });
  ac.crew[type].push(empId);
  G.staff[type].forEach(function(e){if(e.id===empId)e.assignedAcId=acId;});
  save(); closeModal();
  showMsg('✓ Przypisano do '+ac.model+'!');
}

function canAircraftDepart(ac) {
  if(!G.staff) return {ok:true};
  var crew = ac.crew || {};
  var pilots    = (crew.pilot||[]).length;
  var stewards  = (crew.steward||[]).length;
  var mechs     = (crew.mechanic||[]).length;
  var engineers = (crew.engineer||[]).length;
  if(pilots < 2)    return {ok:false, reason:'Brak pilotów ('+pilots+'/2) → Personel'};
  if(stewards < 2)  return {ok:false, reason:'Brak stewardów ('+stewards+'/2) → Personel'};
  if(mechs < 1)     return {ok:false, reason:'Brak mechanika (0/1) → Personel'};
  if(engineers < 1) return {ok:false, reason:'Brak inżyniera (0/1) → Personel'};
  return {ok:true};
}

function paySalaries() {
  if(!G.staff) return;
  if(!G.lastSalaryPay) G.lastSalaryPay = Date.now();
  var now = Date.now();
  if(now - G.lastSalaryPay < 86400000) return; // 24h
  var total = 0;
  Object.keys(G.staff).forEach(function(t){
    (G.staff[t]||[]).forEach(function(e){ total+=e.salary; });
  });
  if(total > 0) {
    G.cash -= total;
    G.lastSalaryPay = now;
    save();
    showMsg('💰 Wypłata pensji: -$'+total.toLocaleString()+'/24h');
  }
}
