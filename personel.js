/* -- PERSONEL -- */

var STAFF_TYPES = {
  pilot:    { label:'Pilot',        icon:'&#9992;',  color:'#00d4ff', salaryMin:60,  salaryMax:120, desc:'Wymagany do lotu' },
  steward:  { label:'Steward/essa', icon:'&#128105;', color:'#a78bfa', salaryMin:30,  salaryMax:70,  desc:'Obsluga pasazerow' },
  mechanic: { label:'Mechanik',     icon:'&#128295;', color:'#f5a623', salaryMin:40,  salaryMax:90,  desc:'1 na samolot' },
  engineer: { label:'Inzynier',     icon:'&#128119;', color:'#00e676', salaryMin:70,  salaryMax:150, desc:'1 na 3 samoloty' }
};

var FIRST_NAMES_M = ['Adam','Piotr','Marek','Tomasz','Pawel','Michal','Andrzej','Grzegorz','Rafal','Lukasz'];
var FIRST_NAMES_F = ['Anna','Maria','Katarzyna','Agnieszka','Monika','Karolina','Magdalena','Joanna','Natalia','Aleksandra'];
var LAST_NAMES    = ['Kowalski','Nowak','Wisniewski','Dabrowski','Lewandowski','Wojcik','Kaminski','Kowalczyk','Zielinski','Szymanski'];

function randomName(type) {
  var isFemale = type==='steward' || Math.random()<0.3;
  var fn = isFemale
    ? FIRST_NAMES_F[Math.floor(Math.random()*FIRST_NAMES_F.length)]
    : FIRST_NAMES_M[Math.floor(Math.random()*FIRST_NAMES_M.length)];
  var ln = LAST_NAMES[Math.floor(Math.random()*LAST_NAMES.length)];
  return fn+' '+ln;
}

function generateCandidate(type) {
  var st = STAFF_TYPES[type];
  var exp = Math.floor(Math.random()*15)+1;
  return {
    id: type+'_c_'+Date.now()+'_'+Math.random().toString(36).substr(2,5),
    name: randomName(type), experience: exp,
    salary: Math.round(st.salaryMin + (st.salaryMax-st.salaryMin)*(exp/15)),
    rating: Math.min(5, Math.ceil(exp/3)), type: type
  };
}

function initStaff() {
  if(!G.staff) G.staff = {pilot:[],steward:[],mechanic:[],engineer:[]};
  if(!G.staff.pilot)    G.staff.pilot = [];
  if(!G.staff.steward)  G.staff.steward = [];
  if(!G.staff.mechanic) G.staff.mechanic = [];
  if(!G.staff.engineer) G.staff.engineer = [];
  if(!G.jobMarket) G.jobMarket = {};
  Object.keys(STAFF_TYPES).forEach(function(t){
    if(!G.jobMarket[t]) G.jobMarket[t]=[];
    while(G.jobMarket[t].length < 6) G.jobMarket[t].push(generateCandidate(t));
  });
}

function getRequiredPilots(range) {
  var r = range||0;
  if(r<=6500)  return 2;
  if(r<=12000) return 3;
  return 4;
}
function getRequiredStewards(seats) {
  var s = seats||0;
  if(s<=19) return 0;
  return Math.ceil(s/50);
}
function getSlotsPerAc(type, ac) {
  if(type==='pilot')    return getRequiredPilots(ac.range);
  if(type==='steward')  return getRequiredStewards(ac.seats);
  if(type==='mechanic') return 1;
  if(type==='engineer') return 1;
  return 1;
}
function getMaxAssignments(type) {
  if(type==='engineer') return 3;
  return 1;
}
function getNeeded(type) {
  if(!G.fleet||!G.fleet.length) return type==='engineer'?1:0;
  if(type==='pilot')    return G.fleet.reduce(function(s,ac){return s+getRequiredPilots(ac.range);},0);
  if(type==='steward')  return G.fleet.reduce(function(s,ac){return s+getRequiredStewards(ac.seats);},0);
  if(type==='mechanic') return G.fleet.length;
  if(type==='engineer') return Math.max(1,Math.ceil(G.fleet.length/3));
  return 0;
}

/* ---- Render ---- */
function renderPersonel(body) {
  initStaff();
  var tabs = [
    {id:'overview',  label:'&#128202; Przeglad'},
    {id:'pilot',     label:'&#9992; Piloci'},
    {id:'steward',   label:'&#128105; Stewardzi'},
    {id:'mechanic',  label:'&#128295; Mechanicy'},
    {id:'engineer',  label:'&#128119; Inzynierowie'}
  ];
  var html = '<div style="display:flex;gap:4px;margin-bottom:14px;overflow-x:auto;padding-bottom:2px;">';
  tabs.forEach(function(t){
    html += '<button onclick="openPersonelTab(\''+t.id+'\')" id="ptab-'+t.id+'" '
      +'style="padding:6px 11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);'
      +'border-radius:20px;color:#5580a0;font-size:11px;font-weight:700;cursor:pointer;'
      +'font-family:Arial,sans-serif;white-space:nowrap;flex-shrink:0;">'+t.label+'</button>';
  });
  html += '</div><div id="personel-content"></div>';
  body.innerHTML = html;
  openPersonelTab('overview');
}

function openPersonelTab(tab) {
  ['overview','pilot','steward','mechanic','engineer'].forEach(function(t){
    var el=document.getElementById('ptab-'+t); if(!el) return;
    el.style.background  = t===tab?'rgba(0,212,255,0.15)':'rgba(255,255,255,0.05)';
    el.style.color       = t===tab?'#00d4ff':'#5580a0';
    el.style.borderColor = t===tab?'rgba(0,212,255,0.4)':'rgba(255,255,255,0.1)';
  });
  var c=document.getElementById('personel-content'); if(!c) return;
  if(tab==='overview') renderOverview(c); else renderStaffType(c,tab);
}

function renderOverview(el) {
  initStaff();
  var totalSalary=0;
  Object.keys(G.staff).forEach(function(t){(G.staff[t]||[]).forEach(function(e){totalSalary+=e.salary;});});
  var totalStaff=Object.keys(G.staff).reduce(function(s,t){return s+(G.staff[t]||[]).length;},0);

  var html =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">'
    +'<div style="background:linear-gradient(135deg,rgba(0,212,255,0.12),rgba(26,86,219,0.08));border:1px solid rgba(0,212,255,0.25);border-radius:14px;padding:14px;text-align:center;">'
    +'<div style="font-size:28px;font-weight:900;color:#00d4ff;">'+totalStaff+'</div>'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:1px;margin-top:3px;">PRACOWNIKOW</div></div>'
    +'<div style="background:linear-gradient(135deg,rgba(230,57,70,0.1),rgba(230,57,70,0.05));border:1px solid rgba(230,57,70,0.25);border-radius:14px;padding:14px;text-align:center;">'
    +'<div style="font-size:22px;font-weight:900;color:#e63946;">$'+totalSalary.toLocaleString()+'</div>'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:1px;margin-top:3px;">PENSJE / 24H</div></div></div>';

  Object.keys(STAFF_TYPES).forEach(function(type){
    var st=STAFF_TYPES[type];
    var count=(G.staff[type]||[]).length;
    var needed=getNeeded(type);
    var pct=needed>0?Math.min(100,Math.round(count/needed*100)):100;
    var ok=count>=needed;
    var col=ok?'#00e676':pct>50?'#f5a623':'#e63946';
    html +=
      '<div onclick="openPersonelTab(\''+type+'\')" style="background:rgba(255,255,255,0.03);'
      +'border:1px solid rgba(255,255,255,0.07);border-left:3px solid '+col+';'
      +'border-radius:14px;padding:14px;margin-bottom:8px;cursor:pointer;">'
      +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">'
      +'<div style="width:40px;height:40px;border-radius:11px;background:rgba(255,255,255,0.05);'
      +'display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;">'+st.icon+'</div>'
      +'<div style="flex:1;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+st.label+'</div>'
      +'<div style="font-size:13px;font-weight:900;color:'+col+';">'+count+'/'+needed+'</div></div>'
      +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'+st.desc+'</div>'
      +'</div></div>'
      +'<div style="height:5px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;">'
      +'<div style="height:100%;width:'+pct+'%;background:'+col+';border-radius:3px;transition:width 0.4s;"></div></div>'
      +(!ok?'<div style="margin-top:8px;font-size:10px;color:#f5a623;background:rgba(245,166,35,0.08);'
        +'border-radius:6px;padding:5px 8px;">&#9888; Potrzeba jeszcze '+(needed-count)+' osob</div>':'')
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
  var ok=employed.length>=needed;

  var html =
    '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);'
    +'border-radius:14px;padding:14px;margin-bottom:14px;">'
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">'
    +'<div style="font-size:26px;">'+st.icon+'</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:14px;font-weight:800;color:#e0f0ff;">'+st.label+'</div>'
    +'<div style="font-size:11px;margin-top:2px;">Zatrudnieni: '
    +'<span style="color:'+(ok?'#00e676':'#e63946')+';font-weight:700;">'+employed.length+'/'+needed+'</span></div>'
    +(type==='pilot'   ?'<div style="font-size:10px;color:#5580a0;margin-top:2px;">do 6500km: 2 | do 12000km: 3 | dalej: 4</div>':'')
    +(type==='steward' ?'<div style="font-size:10px;color:#5580a0;margin-top:2px;">1 FA na kazde 50 foteli (EASA)</div>':'')
    +(type==='engineer'?'<div style="font-size:10px;color:#5580a0;margin-top:2px;">1 inzynier obsluguje do 3 samolotow</div>':'')
    +(type==='mechanic'?'<div style="font-size:10px;color:#5580a0;margin-top:2px;">1 mechanik na 1 samolot</div>':'')
    +'</div>'
    +'<button onclick="refreshMarket(\''+type+'\')" style="padding:7px 10px;background:rgba(0,212,255,0.1);'
    +'border:1px solid rgba(0,212,255,0.2);border-radius:8px;color:#00d4ff;font-size:11px;'
    +'font-weight:700;cursor:pointer;font-family:Arial,sans-serif;flex-shrink:0;">&#8635; Odswiez</button>'
    +'</div>';

  if(G.fleet&&G.fleet.length>0) {
    html += '<div style="background:rgba(0,0,0,0.25);border-radius:10px;padding:10px;">'
      +'<div style="font-size:9px;color:#5580a0;letter-spacing:2px;margin-bottom:8px;">WYMAGANIA NA SAMOLOT</div>';
    G.fleet.forEach(function(ac){
      var req=getSlotsPerAc(type,ac);
      var has=((ac.crew||{})[type]||[]).length;
      var acOk=has>=req;
      html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);">'
        +'<div style="font-size:12px;color:#e0f0ff;font-weight:600;">'+ac.model+' ('+ac.reg+')</div>'
        +'<div style="font-size:12px;font-weight:800;color:'+(acOk?'#00e676':'#e63946')+';">'+has+'/'+req+'</div>'
        +'</div>';
    });
    html += '</div>';
  }
  html += '</div>';

  // Zatrudnieni
  if(employed.length>0) {
    html += '<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin-bottom:10px;">ZATRUDNIENI</div>';
    employed.forEach(function(emp, i){
      var assignedAcs=G.fleet?G.fleet.filter(function(ac){return ac.crew&&ac.crew[type]&&ac.crew[type].indexOf(emp.id)>=0;}):[]; 
      var isAssigned=assignedAcs.length>0;
      var stars='';
      for(var s=0;s<5;s++) stars+=s<emp.rating?'<span style="color:#f5a623;">&#9733;</span>':'<span style="color:#2a3f5a;">&#9733;</span>';

      html +=
        '<div style="background:'+(isAssigned?'rgba(0,230,118,0.05)':'rgba(255,255,255,0.03)')+';'
        +'border:1px solid '+(isAssigned?'rgba(0,230,118,0.2)':'rgba(255,255,255,0.08)')+';'
        +'border-radius:14px;padding:14px;margin-bottom:8px;">'
        +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">'
        +'<div style="width:42px;height:42px;border-radius:50%;flex-shrink:0;'
        +'background:'+(isAssigned?'rgba(0,230,118,0.15)':'rgba(255,255,255,0.07)')+';'
        +'border:2px solid '+(isAssigned?'rgba(0,230,118,0.5)':'rgba(255,255,255,0.15)')+';'
        +'display:flex;align-items:center;justify-content:center;font-size:18px;">'+st.icon+'</div>'
        +'<div style="flex:1;min-width:0;">'
        +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+emp.name+'</div>'
        +'<div style="font-size:11px;margin-top:2px;">'+stars+'</div>'
        +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'
        +'Dosw: <b style="color:#e0f0ff;">'+emp.experience+' lat</b> &nbsp;|&nbsp; '
        +'Pensja: <b style="color:#00e676;">$'+emp.salary+'/24h</b></div>'
        +'</div></div>'
        +'<div style="padding:8px 10px;border-radius:9px;margin-bottom:10px;font-size:11px;font-weight:600;'
        +'background:'+(isAssigned?'rgba(0,230,118,0.1)':'rgba(245,166,35,0.08)')+';'
        +'border:1px solid '+(isAssigned?'rgba(0,230,118,0.25)':'rgba(245,166,35,0.2)')+';'
        +'color:'+(isAssigned?'#00e676':'#f5a623')+'">'
        +(isAssigned
          ?'&#10003; Przypisany do: '+assignedAcs.map(function(a){return a.model+' ('+a.reg+')';}).join(', ')
          :'&#9888; Nieprzypisany')
        +'</div>'
        +'<div style="display:flex;gap:6px;">'
        +(G.fleet&&G.fleet.length>0
          ?'<button onclick="assignStaff(\''+type+'\',\''+emp.id+'\')" '
            +'style="flex:1;padding:9px;border-radius:9px;font-size:11px;font-weight:700;'
            +'cursor:pointer;font-family:Arial,sans-serif;'
            +(isAssigned
              ?'background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.25);color:#00d4ff;">&#8635; Zmien przypisanie'
              :'background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;color:#fff;">&#43; Przypisz')
            +'</button>'
          :'')
        +'<button onclick="fireStaff(\''+type+'\','+i+')" '
        +'style="padding:9px 14px;background:rgba(230,57,70,0.08);border:1px solid rgba(230,57,70,0.2);'
        +'border-radius:9px;color:#e63946;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Zwolnij</button>'
        +'</div></div>';
    });
  }

  // Rynek pracy
  html += '<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin:16px 0 10px;">RYNEK PRACY</div>';
  if(!market.length) {
    html += '<div style="padding:20px;text-align:center;color:#5580a0;font-size:12px;">Brak kandydatow - kliknij Odswiez</div>';
  } else {
    market.forEach(function(c,i){
      var stars='';
      for(var s=0;s<5;s++) stars+=s<c.rating?'<span style="color:#f5a623;">&#9733;</span>':'<span style="color:#2a3f5a;">&#9733;</span>';
      html +=
        '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
        +'border-radius:14px;padding:14px;margin-bottom:8px;">'
        +'<div style="display:flex;align-items:center;gap:12px;">'
        +'<div style="width:42px;height:42px;border-radius:50%;flex-shrink:0;'
        +'background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.25);'
        +'display:flex;align-items:center;justify-content:center;font-size:18px;">'+st.icon+'</div>'
        +'<div style="flex:1;min-width:0;">'
        +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+c.name+'</div>'
        +'<div style="font-size:11px;margin-top:3px;">'+stars+' <span style="color:#5580a0;font-size:10px;">'+c.experience+' lat dosw.</span></div>'
        +'<div style="font-size:12px;font-weight:700;color:#00e676;margin-top:2px;">$'+c.salary+' / 24h</div>'
        +'</div>'
        +'<button onclick="hireStaff(\''+type+'\','+i+')" '
        +'style="padding:10px 16px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;'
        +'border-radius:10px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;'
        +'font-family:Arial,sans-serif;white-space:nowrap;flex-shrink:0;'
        +'box-shadow:0 3px 10px rgba(0,212,255,0.25);">Zatrudnij</button>'
        +'</div></div>';
    });
  }
  el.innerHTML = html;
}

function refreshMarket(type) {
  initStaff();
  G.jobMarket[type]=[];
  for(var i=0;i<6;i++) G.jobMarket[type].push(generateCandidate(type));
  save();
  var c=document.getElementById('personel-content'); if(c) renderStaffType(c,type);
  showMsg('Odswiezono rynek pracy!');
}

function hireStaff(type, idx) {
  initStaff();
  var market = G.jobMarket[type];
  if(!market||idx>=market.length){showMsg('Blad: nie znaleziono kandydata!');return;}
  var c = market[idx];
  if(!c){showMsg('Blad: kandydat nie istnieje!');return;}
  // Dodaj do zatrudnionych
  var newEmp = {id:c.id, name:c.name, experience:c.experience, salary:c.salary, rating:c.rating, type:type};
  G.staff[type].push(newEmp);
  // Usun z rynku i dodaj nowego
  G.jobMarket[type].splice(idx,1);
  G.jobMarket[type].push(generateCandidate(type));
  save();
  showMsg('&#10003; '+c.name+' zatrudniony/a!');
  var el=document.getElementById('personel-content');
  if(el) renderStaffType(el,type);
}

function fireStaff(type, idx) {
  initStaff();
  var emp=G.staff[type][idx]; if(!emp) return;
  if(!confirm('Zwolnic '+emp.name+'?')) return;
  if(G.fleet) {
    G.fleet.forEach(function(ac){
      if(ac.crew&&ac.crew[type]) ac.crew[type]=ac.crew[type].filter(function(id){return id!==emp.id;});
    });
  }
  G.staff[type].splice(idx,1);
  save();
  showMsg(emp.name+' zwolniony/a.');
  var el=document.getElementById('personel-content'); if(el) renderStaffType(el,type);
}

function assignStaff(type, empId) {
  initStaff();
  if(!G.fleet||!G.fleet.length){showMsg('Brak samolotow!');return;}
  var emp=null;
  (G.staff[type]||[]).forEach(function(e){if(e.id===empId)emp=e;});
  if(!emp){showMsg('Blad: pracownik nie znaleziony!');return;}

  var assignedAcs=G.fleet.filter(function(ac){return ac.crew&&ac.crew[type]&&ac.crew[type].indexOf(empId)>=0;});
  var maxAssign=getMaxAssignments(type);

  var html =
    '<div style="font-size:15px;font-weight:800;color:#e0f0ff;margin-bottom:4px;">Przypisz pracownika</div>'
    +'<div style="font-size:12px;color:#00d4ff;font-weight:700;margin-bottom:4px;">'+emp.name+'</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:14px;">'
    +(type==='engineer'?'Inzynier - max 3 samoloty (aktualnie: '+assignedAcs.length+')'
      :'Przypisz do 1 samolotu')
    +'</div>';

  G.fleet.forEach(function(ac){
    var slots=getSlotsPerAc(type,ac);
    var crew=(ac.crew||{})[type]||[];
    var already=crew.indexOf(empId)>=0;
    var full=crew.length>=slots&&!already;

    html +=
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px;'
      +'background:'+(already?'rgba(0,230,118,0.06)':'rgba(255,255,255,0.03)')+';'
      +'border:1px solid '+(already?'rgba(0,230,118,0.2)':'rgba(255,255,255,0.07)')+';'
      +'border-radius:12px;margin-bottom:6px;">'
      +'<div>'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+ac.model+'</div>'
      +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'+ac.reg+' &bull; obsada: '+crew.length+'/'+slots+'</div>'
      +'</div>'
      +(already
        ?'<div style="display:flex;align-items:center;gap:6px;">'
          +'<div style="font-size:11px;color:#00e676;font-weight:700;">&#10003; Przypisany</div>'
          +'<button onclick="doUnassign(\''+type+'\',\''+empId+'\',\''+ac.id+'\')" '
          +'style="padding:5px 10px;background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.2);'
          +'border-radius:7px;color:#e63946;font-size:10px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Odepnij</button>'
          +'</div>'
        :full
          ?'<div style="font-size:10px;color:#e63946;">Pelna obsada</div>'
          :(assignedAcs.length>=maxAssign&&type!=='engineer')
            ?'<div style="font-size:10px;color:#5580a0;">Juz przypisany</div>'
            :'<button onclick="doAssign(\''+type+'\',\''+empId+'\',\''+ac.id+'\')" '
              +'style="padding:7px 14px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;'
              +'border-radius:8px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Przypisz</button>'
      )
      +'</div>';
  });

  document.getElementById('modal-body').innerHTML=html;
  document.getElementById('modal').style.display='flex';
}

function doAssign(type, empId, acId) {
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac) return;
  if(!ac.crew) ac.crew={};
  if(!ac.crew[type]) ac.crew[type]=[];
  var slots=getSlotsPerAc(type,ac);
  if(ac.crew[type].indexOf(empId)>=0){showMsg('Juz przypisany!');return;}
  if(ac.crew[type].length>=slots){showMsg('Pelna obsada na tym samolocie!');return;}
  if(type==='engineer') {
    var cnt=G.fleet.filter(function(a){return a.crew&&a.crew.engineer&&a.crew.engineer.indexOf(empId)>=0;}).length;
    if(cnt>=3){showMsg('Inzynier moze obslugy max 3 samoloty!');return;}
  }
  if(type!=='engineer') {
    G.fleet.forEach(function(a){
      if(a.id!==acId&&a.crew&&a.crew[type])
        a.crew[type]=a.crew[type].filter(function(id){return id!==empId;});
    });
  }
  ac.crew[type].push(empId);
  save();
  showMsg('&#10003; Przypisano do '+ac.model+'!');
  assignStaff(type,empId);
  var el=document.getElementById('personel-content'); if(el) renderStaffType(el,type);
}

function doUnassign(type, empId, acId) {
  var ac=G.fleet.filter(function(a){return a.id===acId;})[0]; if(!ac||!ac.crew||!ac.crew[type]) return;
  ac.crew[type]=ac.crew[type].filter(function(id){return id!==empId;});
  save();
  showMsg('Odpięto od '+ac.model+'.');
  assignStaff(type,empId);
  var el=document.getElementById('personel-content'); if(el) renderStaffType(el,type);
}

function canAircraftDepart(ac) {
  if(!G.staff) return {ok:true};
  var crew=ac.crew||{};
  var reqP=getRequiredPilots(ac.range);
  var reqS=getRequiredStewards(ac.seats);
  if((crew.pilot||[]).length<reqP)    return {ok:false,reason:'Brak pilotow ('+(crew.pilot||[]).length+'/'+reqP+') - Personel'};
  if((crew.steward||[]).length<reqS)  return {ok:false,reason:'Brak stewardow ('+(crew.steward||[]).length+'/'+reqS+') - Personel'};
  if((crew.mechanic||[]).length<1)    return {ok:false,reason:'Brak mechanika - Personel'};
  if((crew.engineer||[]).length<1)    return {ok:false,reason:'Brak inzyniera - Personel'};
  return {ok:true};
}

function paySalaries() {
  if(!G.staff) return;
  if(!G.lastSalaryPay) G.lastSalaryPay=Date.now();
  var now=Date.now();
  if(now-G.lastSalaryPay<86400000) return;
  var total=0;
  Object.keys(G.staff).forEach(function(t){(G.staff[t]||[]).forEach(function(e){total+=e.salary;});});
  if(total>0){ G.cash-=total; G.lastSalaryPay=now; save(); showMsg('Pensje wyplacone: -$'+total.toLocaleString()); }
}
