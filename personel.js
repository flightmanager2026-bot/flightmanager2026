/* -- PERSONEL -- */

var STAFF_TYPES = {
  pilot: {
    label: 'Pilot', icon: '✈️',
    salaryBase: 8000, needed: 2, // per aircraft
    desc: 'Wymagany do wykonywania lotów',
    names: ['Adam Kowalski','Piotr Nowak','Marek Wiśniewski','Tomasz Dąbrowski','Paweł Lewandowski',
            'Michał Wójcik','Andrzej Kamiński','Grzegorz Kowalczyk','Zbigniew Zieliński','Rafał Szymański',
            'John Smith','James Wilson','Robert Johnson','Michael Brown','David Miller']
  },
  steward: {
    label: 'Stewardesa/Steward', icon: '👩‍✈️',
    salaryBase: 4000, needed: 4, // per aircraft
    desc: 'Obsługa pasażerów na pokładzie',
    names: ['Anna Kowalska','Maria Nowak','Katarzyna Wiśniewska','Agnieszka Dąbrowska','Monika Lewandowska',
            'Karolina Wójcik','Magdalena Kamińska','Joanna Kowalczyk','Natalia Zielińska','Aleksandra Szymańska',
            'Sophie Martin','Emma Wilson','Laura Johnson','Olivia Brown','Isabella Miller']
  },
  mechanic: {
    label: 'Mechanik', icon: '🔧',
    salaryBase: 6000, needed: 1, // per aircraft
    desc: 'Utrzymanie i naprawa samolotów',
    names: ['Stanisław Kowalski','Władysław Nowak','Tadeusz Wiśniewski','Henryk Dąbrowski','Eugeniusz Lewandowski',
            'Ryszard Wójcik','Zygmunt Kamiński','Mirosław Kowalczyk','Bronisław Zieliński','Wiesław Szymański']
  },
  engineer: {
    label: 'Inżynier', icon: '👷',
    salaryBase: 9000, needed: 1, // per 3 aircraft
    desc: 'Nadzór techniczny i certyfikacja',
    names: ['Prof. Andrzej Nowak','Dr Piotr Kowalski','Mgr Marek Wiśniewski','Ing. Tomasz Dąbrowski','Dr Paweł Wójcik',
            'Prof. John Smith','Dr James Wilson','Eng. Robert Johnson','Dr Michael Brown','Prof. David Miller']
  }
};

function initStaff() {
  if(!G.staff) G.staff = {pilot:[], steward:[], mechanic:[], engineer:[]};

  // Generate job market if empty
  if(!G.jobMarket) {
    G.jobMarket = {};
    Object.keys(STAFF_TYPES).forEach(function(type) {
      var st = STAFF_TYPES[type];
      G.jobMarket[type] = [];
      for(var i=0; i<8; i++) {
        var name = st.names[Math.floor(Math.random()*st.names.length)];
        var exp = Math.floor(Math.random()*20)+1;
        var salary = st.salaryBase + (exp*200) + Math.floor(Math.random()*1000);
        G.jobMarket[type].push({
          id: type+'_market_'+i,
          name: name,
          experience: exp,
          salary: salary,
          rating: Math.min(5, Math.floor(exp/4)+1)
        });
      }
    });
  }
}

function renderPersonel(body) {
  initStaff();
  var html =
    '<div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;">'
    +'<button onclick="renderPersonelTab(\'overview\')" id="ptab-overview" class="sub-tab-btn active">Przegląd</button>'
    +'<button onclick="renderPersonelTab(\'pilot\')" id="ptab-pilot" class="sub-tab-btn">✈️ Piloci</button>'
    +'<button onclick="renderPersonelTab(\'steward\')" id="ptab-steward" class="sub-tab-btn">👩‍✈️ Stewardzi</button>'
    +'<button onclick="renderPersonelTab(\'mechanic\')" id="ptab-mechanic" class="sub-tab-btn">🔧 Mechanicy</button>'
    +'<button onclick="renderPersonelTab(\'engineer\')" id="ptab-engineer" class="sub-tab-btn">👷 Inżynierowie</button>'
    +'</div>'
    +'<div id="personel-content"></div>';
  body.innerHTML = html;
  renderPersonelTab('overview');
}

function renderPersonelTab(tab) {
  // Update active tab
  ['overview','pilot','steward','mechanic','engineer'].forEach(function(t){
    var el=document.getElementById('ptab-'+t);
    if(el){ el.classList.toggle('active', t===tab); }
  });

  var content = document.getElementById('personel-content');
  if(!content) return;

  if(tab === 'overview') {
    renderPersonelOverview(content);
  } else {
    renderPersonelType(content, tab);
  }
}

function renderPersonelOverview(el) {
  initStaff();
  var totalSalary = 0;
  Object.keys(G.staff).forEach(function(type){
    G.staff[type].forEach(function(s){ totalSalary += s.salary; });
  });

  var html =
    '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;margin-bottom:10px;">'
    +'<div style="font-size:11px;color:#5580a0;letter-spacing:2px;margin-bottom:10px;">STAN PERSONELU</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';

  Object.keys(STAFF_TYPES).forEach(function(type){
    var st = STAFF_TYPES[type];
    var count = G.staff[type] ? G.staff[type].length : 0;
    // Calculate needed
    var needed = 0;
    if(type==='pilot') needed = G.fleet.length * 2;
    else if(type==='steward') needed = G.fleet.length * 4;
    else if(type==='mechanic') needed = G.fleet.length;
    else if(type==='engineer') needed = Math.ceil(G.fleet.length/3);

    var ok = count >= needed;
    html +=
      '<div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px;">'
      +'<div style="font-size:18px;margin-bottom:4px;">'+st.icon+'</div>'
      +'<div style="font-size:12px;font-weight:700;color:#e0f0ff;">'+st.label+'</div>'
      +'<div style="font-size:13px;font-weight:900;color:'+(ok?'#00e676':'#e63946')+';margin-top:2px;">'+count+'/'+needed+'</div>'
      +'<div style="font-size:9px;color:#5580a0;">'+st.desc+'</div>'
      +'</div>';
  });

  html += '</div></div>';

  // Salary info
  html +=
    '<div style="background:rgba(230,57,70,0.06);border:1px solid rgba(230,57,70,0.15);border-radius:12px;padding:12px;margin-bottom:10px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;">'
    +'<div style="font-size:12px;color:#5580a0;">Miesięczne pensje</div>'
    +'<div style="font-size:15px;font-weight:900;color:#e63946;">$'+totalSalary.toLocaleString()+'/mies.</div>'
    +'</div></div>';

  // Warning if missing staff
  Object.keys(STAFF_TYPES).forEach(function(type){
    var count = G.staff[type] ? G.staff[type].length : 0;
    var needed = 0;
    if(type==='pilot') needed = G.fleet.length * 2;
    else if(type==='steward') needed = G.fleet.length * 4;
    else if(type==='mechanic') needed = G.fleet.length;
    else if(type==='engineer') needed = Math.ceil(G.fleet.length/3);
    if(count < needed) {
      html += '<div style="background:rgba(245,166,35,0.08);border:1px solid rgba(245,166,35,0.2);border-radius:10px;padding:10px 12px;margin-bottom:6px;font-size:11px;color:#f5a623;">'
        +'⚠️ Brakuje '+(needed-count)+' '+STAFF_TYPES[type].label.toLowerCase()+'(ów). Samoloty bez '+STAFF_TYPES[type].label.toLowerCase()+'(ów) nie odlecą!'
        +'</div>';
    }
  });

  el.innerHTML = html;
}

function renderPersonelType(el, type) {
  initStaff();
  var st = STAFF_TYPES[type];
  var employed = G.staff[type] || [];
  var market = (G.jobMarket && G.jobMarket[type]) || [];

  var html =

  // Employed
  '<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:8px;">ZATRUDNIENI ('+employed.length+')</div>';

  if(employed.length === 0) {
    html += '<div style="padding:12px;text-align:center;color:#5580a0;font-size:12px;margin-bottom:14px;">Brak zatrudnionych '+st.label.toLowerCase()+'ów</div>';
  } else {
    employed.forEach(function(emp, i) {
      // Find assigned aircraft
      var assignedAc = null;
      G.fleet.forEach(function(ac){
        if(ac.crew && ac.crew[type] && ac.crew[type].indexOf(emp.id) >= 0) assignedAc = ac;
      });

      html +=
        '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;margin-bottom:6px;">'
        +'<div style="display:flex;align-items:center;gap:10px;">'
        +'<div style="width:36px;height:36px;border-radius:50%;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);display:flex;align-items:center;justify-content:center;font-size:16px;">'+st.icon+'</div>'
        +'<div style="flex:1;">'
        +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+emp.name+'</div>'
        +'<div style="font-size:10px;color:#5580a0;">Dośw: '+emp.experience+' lat &bull; $'+emp.salary.toLocaleString()+'/mies.</div>'
        +'<div style="font-size:10px;color:'+(assignedAc?'#00e676':'#f5a623')+';">'
        +(assignedAc?'✓ Przypisany: '+assignedAc.model+' ('+assignedAc.reg+')':'⚠ Nieprzypisany')
        +'</div></div>'
        +'<div style="display:flex;flex-direction:column;gap:4px;">'
        +'<button onclick="assignStaff(\''+type+'\',\''+emp.id+'\')" style="padding:5px 8px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);border-radius:6px;color:#00d4ff;font-size:10px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Przypisz</button>'
        +'<button onclick="fireStaff(\''+type+'\','+i+')" style="padding:5px 8px;background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.2);border-radius:6px;color:#e63946;font-size:10px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Zwolnij</button>'
        +'</div></div></div>';
    });
  }

  // Job market
  html += '<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin:14px 0 8px;">RYNEK PRACY</div>';

  market.forEach(function(candidate, i) {
    var stars = '';
    for(var s=0;s<5;s++) stars += s<candidate.rating ? '⭐' : '☆';
    html +=
      '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;margin-bottom:6px;">'
      +'<div style="display:flex;align-items:center;gap:10px;">'
      +'<div style="width:36px;height:36px;border-radius:50%;background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.2);display:flex;align-items:center;justify-content:center;font-size:16px;">'+st.icon+'</div>'
      +'<div style="flex:1;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+candidate.name+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+stars+' &bull; Dośw: '+candidate.experience+' lat</div>'
      +'<div style="font-size:11px;color:#f5a623;font-weight:700;">$'+candidate.salary.toLocaleString()+'/mies.</div>'
      +'</div>'
      +'<button onclick="hireStaff(\''+type+'\','+i+')" style="padding:8px 12px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;white-space:nowrap;">Zatrudnij</button>'
      +'</div></div>';
  });

  el.innerHTML = html;
}

function hireStaff(type, marketIdx) {
  initStaff();
  var candidate = G.jobMarket[type][marketIdx];
  if(!candidate) return;

  // Add to employed
  G.staff[type].push({
    id: type+'_'+Date.now(),
    name: candidate.name,
    experience: candidate.experience,
    salary: candidate.salary,
    rating: candidate.rating,
    assignedAcId: null
  });

  // Remove from market
  G.jobMarket[type].splice(marketIdx, 1);

  save();
  showMsg(candidate.name+' zatrudniony/a! $'+candidate.salary.toLocaleString()+'/mies.');

  var content = document.getElementById('personel-content');
  if(content) renderPersonelType(content, type);
}

function fireStaff(type, idx) {
  initStaff();
  var emp = G.staff[type][idx];
  if(!emp) return;
  if(!confirm('Zwolnić '+emp.name+'?')) return;

  // Remove from all aircraft crews
  G.fleet.forEach(function(ac){
    if(ac.crew && ac.crew[type]) {
      ac.crew[type] = ac.crew[type].filter(function(id){ return id !== emp.id; });
    }
  });

  G.staff[type].splice(idx, 1);
  save();
  showMsg(emp.name+' zwolniony/a.');

  var content = document.getElementById('personel-content');
  if(content) renderPersonelType(content, type);
}

function assignStaff(type, empId) {
  initStaff();
  if(!G.fleet.length) { showMsg('Brak samolotów we flocie!'); return; }

  // Show aircraft list modal
  var emp = null;
  G.staff[type].forEach(function(e){ if(e.id===empId) emp=e; });
  if(!emp) return;

  var html =
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:4px;">Przypisz do samolotu</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:14px;">'+emp.name+'</div>';

  G.fleet.forEach(function(ac){
    var crew = ac.crew || {};
    var typeCrew = crew[type] || [];
    var maxCrew = type==='pilot'?2:type==='steward'?4:type==='mechanic'?1:1;
    var hasSlot = typeCrew.length < maxCrew;
    var alreadyAssigned = typeCrew.indexOf(empId) >= 0;

    html +=
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;margin-bottom:6px;">'
      +'<div>'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+ac.model+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+ac.reg+' &bull; '+STAFF_TYPES[type].label+': '+typeCrew.length+'/'+maxCrew+'</div>'
      +'</div>'
      +(alreadyAssigned
        ?'<div style="font-size:10px;color:#00e676;">✓ Już przypisany</div>'
        :hasSlot
          ?'<button onclick="doAssignStaff(\''+type+'\',\''+empId+'\',\''+ac.id+'\')" style="padding:6px 12px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Przypisz</button>'
          :'<div style="font-size:10px;color:#e63946;">Pełna obsada</div>'
      )
      +'</div>';
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display='flex';
}

function doAssignStaff(type, empId, acId) {
  var ac = G.fleet.filter(function(a){ return a.id===acId; })[0];
  if(!ac) return;
  if(!ac.crew) ac.crew={};
  if(!ac.crew[type]) ac.crew[type]=[];

  var maxCrew = type==='pilot'?2:type==='steward'?4:type==='mechanic'?1:1;
  if(ac.crew[type].length >= maxCrew) { showMsg('Pełna obsada!'); return; }
  if(ac.crew[type].indexOf(empId) >= 0) { showMsg('Już przypisany!'); return; }

  // Remove from previous aircraft
  G.fleet.forEach(function(a){
    if(a.id!==acId && a.crew && a.crew[type]) {
      a.crew[type] = a.crew[type].filter(function(id){ return id!==empId; });
    }
  });

  ac.crew[type].push(empId);

  // Update employee record
  G.staff[type].forEach(function(e){ if(e.id===empId) e.assignedAcId=acId; });

  save();
  closeModal();
  showMsg('Przypisano do '+ac.model+'!');
}

function canAircraftDepart(ac) {
  if(!G.staff || !G.fleet) return true; // backward compat
  if(!G.staff.pilot || G.staff.pilot.length === 0) return true; // no staff system yet

  var crew = ac.crew || {};

  // Check pilots (need 2)
  var pilots = (crew.pilot||[]).length;
  if(pilots < 2) return {ok:false, reason:'Brak pilotów ('+pilots+'/2)'};

  // Check stewards (need at least 2)
  var stewards = (crew.steward||[]).length;
  if(stewards < 2) return {ok:false, reason:'Brak stewardów ('+stewards+'/2)'};

  // Check mechanic (need 1)
  var mechanics = (crew.mechanic||[]).length;
  if(mechanics < 1) return {ok:false, reason:'Brak mechanika (0/1)'};

  return {ok:true};
}
