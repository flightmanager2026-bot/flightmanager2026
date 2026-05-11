function openManufacturerByName(el){ openManufacturer(el.getAttribute("data-brand")); }

if(typeof showMsg === 'undefined') {
  var _nT;
  function showMsg(msg) {
    var n=document.getElementById('msg'); if(!n) return;
    n.textContent=msg; n.style.transform='translateX(-50%) translateY(0)';
    clearTimeout(_nT); _nT=setTimeout(function(){n.style.transform='translateX(-50%) translateY(-80px)';},3000);
  }
}

function closeModal(){ document.getElementById("modal").style.display="none"; }

var AIRCRAFT_CATALOG = {
  'Airbus': [
    {model:'Airbus A220-100',img:null,seats:108,range:6300,price:89000000,desc:'Nowoczesny waski kadlub, 108 miejsc',engines:'PW1500G',level:1},
    {model:'Airbus A320neo',img:null,seats:180,range:6300,price:110000000,desc:'Najpopularniejszy samolot swiata, 180 miejsc',engines:'CFM LEAP-1A / PW1100G',level:1},
    {model:'Airbus A321neo',img:'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A321_Neo.png',seats:244,range:7400,price:130000000,desc:'Wydluzony A320, 244 miejsca, zasieg 7400km',engines:'CFM LEAP-1A / PW1100G',level:1},
    {model:'Airbus A330-300',img:null,seats:335,range:11750,price:230000000,desc:'Szeroki kadlub sredniodystansowy, 335 miejsc',engines:'CF6-80E / PW4000 / Trent 700',level:3},
    {model:'Airbus A340-300',img:'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A340-300-removebg-preview.png',seats:295,range:13500,price:250000000,desc:'Czteroslilnikowy dlugi zasieg, 295 miejsc',engines:'CFM56-5C4',level:4},
    {model:'Airbus A350-900',img:'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A350-900_XWB-removebg-preview.png',seats:369,range:15000,price:320000000,desc:'Nowoczesny szeroki kadlub, 369 miejsc',engines:'Rolls-Royce Trent XWB',level:4},
    {model:'Airbus A380-800',img:'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/A380-removebg-preview.png',seats:555,range:15200,price:450000000,desc:'Dwupokladowy gigant, 555 miejsc',engines:'Rolls-Royce Trent 970',level:5}
  ],
  'Boeing': [
    {model:'Boeing 737-800',img:'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',seats:162,range:5765,price:90000000,desc:'Klasyczny waski kadlub, 162 miejsca',engines:'CFM56-7B',level:1},
    {model:'Boeing 737 MAX 8',img:'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/B737-7-8-9.png',seats:178,range:6570,price:105000000,desc:'Nowa generacja 737, 178 miejsc',engines:'CFM LEAP-1B',level:2},
    {model:'Boeing 767-300ER',img:null,seats:218,range:11090,price:190000000,desc:'Sredni szeroki kadlub, 218 miejsc',engines:'CF6-80C2 / PW4000',level:3},
    {model:'Boeing 777-300ER',img:null,seats:396,range:13650,price:350000000,desc:'Dlugi zasieg, 396 miejsc',engines:'GE90-115B',level:4},
    {model:'Boeing 787-9',img:null,seats:296,range:14140,price:280000000,desc:'Dreamliner, 296 miejsc, zasieg 14140km',engines:'GEnx-1B / RR Trent 1000',level:3},
    {model:'Boeing 787-10',img:null,seats:336,range:11910,price:310000000,desc:'Dluzszy Dreamliner, 336 miejsc',engines:'GEnx-1B / RR Trent 1000',level:4}
  ],
  'Embraer': [
    {model:'Embraer E175',img:null,seats:80,range:3735,price:42000000,desc:'Regionalny odrzutowiec, 80 miejsc',engines:'CF34-8E',level:1},
    {model:'Embraer E190',img:null,seats:100,range:4537,price:55000000,desc:'Popularny regionalny, 100 miejsc',engines:'CF34-10E',level:1},
    {model:'Embraer E195-E2',img:null,seats:146,range:4315,price:70000000,desc:'Nowa generacja E-Jet, 146 miejsc',engines:'PW1900G',level:2}
  ],
  'Bombardier': [
    {model:'Bombardier CRJ-200',img:null,seats:50,range:3148,price:22000000,desc:'Maly regionalny odrzutowiec, 50 miejsc',engines:'CF34-3B1',level:1},
    {model:'Bombardier CRJ-900',img:null,seats:90,range:2956,price:45000000,desc:'Wiekszy regionalny, 90 miejsc',engines:'CF34-8C5',level:1},
    {model:'Bombardier Q400',img:null,seats:78,range:2040,price:32000000,desc:'Turbosmiglowiec, 78 miejsc',engines:'PW150A',level:1}
  ],
  'ATR': [
    {model:'ATR-42',img:null,seats:48,range:1326,price:18000000,desc:'Maly turbosmiglowiec, 48 miejsc',engines:'PW120',level:1},
    {model:'ATR-72',img:null,seats:72,range:1528,price:25000000,desc:'Turbosmiglowiec regionalny, 72 miejsca',engines:'PW127M',level:1}
  ],
  'Suchoj': [
    {model:'Superjet 100',img:null,seats:98,range:4578,price:35000000,desc:'Rosyjski odrzutowiec regionalny, 98 miejsc',engines:'SaM146',level:1}
  ],
  'Iliuszyn': [
    {model:'Iliuszyn Il-96-300',img:null,seats:300,range:11500,price:80000000,desc:'Rosyjski szeroki kadlub, 300 miejsc',engines:'PS-90A',level:3}
  ],
  'Tupolew': [
    {model:'Tupolew Tu-204',img:null,seats:210,range:6500,price:45000000,desc:'Rosyjski waski kadlub, 210 miejsc',engines:'PS-90A',level:2}
  ],
  'Havilland Canada': [
    {model:'DHC-8 Q400',img:null,seats:78,range:2040,price:30000000,desc:'Turbosmiglowiec De Havilland, 78 miejsc',engines:'PW150A',level:1},
    {model:'DHC-6 Twin Otter',img:null,seats:19,range:1705,price:7000000,desc:'Maly turbosmiglowiec, 19 miejsc',engines:'PT6A-27',level:1}
  ],
  'Dornier': [
    {model:'Dornier 328',img:null,seats:32,range:1850,price:12000000,desc:'Maly odrzutowiec regionalny, 32 miejsca',engines:'PW306B',level:1}
  ],
  'McDonnell Douglas': [
    {model:'MD-82',img:null,seats:155,range:4635,price:20000000,desc:'Klasyczny waski kadlub, 155 miejsc',engines:'JT8D-217',level:1},
    {model:'MD-11',img:null,seats:323,range:12455,price:35000000,desc:'Szeroki kadlub dlugi zasieg, 323 miejsca',engines:'CF6-80C2 / PW4460',level:2}
  ],
  'Fokker': [
    {model:'Fokker 70',img:null,seats:79,range:2010,price:15000000,desc:'Holenderski regionalny, 79 miejsc',engines:'Tay 620',level:1},
    {model:'Fokker 100',img:null,seats:107,range:3170,price:20000000,desc:'Holenderski sredni, 107 miejsc',engines:'Tay 650',level:1}
  ],
  'British Aerospace': [
    {model:'BAe 146-300',img:null,seats:128,range:2965,price:18000000,desc:'Cichy odrzutowiec, 128 miejsc',engines:'ALF502R-5',level:1},
    {model:'ATP',img:null,seats:68,range:1610,price:12000000,desc:'Turbosmiglowiec British Aerospace, 68 miejsc',engines:'PW126A',level:1}
  ],
  'Cessna': [
    {model:'Cessna 208 Caravan',img:null,seats:14,range:1982,price:2500000,desc:'Maly turbosmiglowiec, 14 miejsc',engines:'PT6A-114A',level:1}
  ],
  'Dassault': [
    {model:'Dassault Falcon 7X',img:null,seats:16,range:11020,price:55000000,desc:'Luksusowy biznesjet, 16 miejsc',engines:'PW307A',level:2}
  ],
  'Antonow': [
    {model:'Antonow An-24',img:null,seats:50,range:2400,price:5000000,desc:'Radziecki turbosmiglowiec, 50 miejsc',engines:'AI-24',level:1},
    {model:'Antonow An-148',img:null,seats:75,range:5100,price:28000000,desc:'Ukrainski odrzutowiec, 75 miejsc',engines:'D-436-148',level:1}
  ]
};

function openShop() {
  function sec(title, rows) {
    return '<div style="margin-bottom:16px;"><div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:6px;">'+title+'</div>'+rows+'</div>';
  }
  function row(label, sub, fn) {
    return '<div onclick="'+fn+'" style="display:flex;justify-content:space-between;align-items:center;padding:11px 0;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);">'
      +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+label+'</div>'
      +(sub?'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'+sub+'</div>':'')+'</div>'
      +'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  }
  document.getElementById('modal-body').innerHTML =
    '<div style="font-size:15px;font-weight:700;color:#00d4ff;margin-bottom:16px;">SKLEP</div>'
    +sec('KUP SAMOLOT',
      row('Nowy','Airbus, Boeing, Embraer...','openNewAircraftShop()')
      +row('Uzywany','Tansze, wieksze ryzyko','showMsg("Uzywane - wkrotce!")')
      +row('Leasing','Nizsza oplata poczatkowa','showMsg("Leasing - wkrotce!")')
    )
    +sec('KUP SLOT',row('Slot na lotnisku','Dodaj lotnisko docelowe','openSlotShop()'))
    +sec('PREMIUM',row('Doladuj konto','Zakup waluty premium','showMsg("Premium - wkrotce!")'))
    +'<div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:12px;margin-top:4px;">'
    +'<div onclick="shopWatchAd()" style="background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.3);border-radius:12px;padding:13px;cursor:pointer;">'
    +'<div style="font-size:13px;font-weight:700;color:#f5a623;">&#128253; Obejrzyj reklame</div>'
    +'<div style="font-size:11px;color:#a07040;margin-top:2px;">+50 punktow i +$5,000</div>'
    +'</div></div>';
  document.getElementById('modal').style.display='flex';
}

function openNewAircraftShop() {
  var brands = Object.keys(AIRCRAFT_CATALOG);
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Wybierz producenta</div></div>';
  var BRAND_LOGOS = {
    'Boeing':'https://raw.githubusercontent.com/flightmanager2026-bot/flightmanager2026/main/img/logo.boeing.png'
  };
  brands.forEach(function(brand) {
    var planes = AIRCRAFT_CATALOG[brand];
    var imgSrc = BRAND_LOGOS[brand] || null;
    if(!imgSrc) planes.forEach(function(p){ if(!imgSrc && p.img) imgSrc = p.img; });
    html += '<div data-brand="'+brand+'" onclick="openManufacturerByName(this)" '
      +'style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);margin-bottom:6px;cursor:pointer;">'
      +(imgSrc?'<img src="'+imgSrc+'" style="width:70px;height:38px;object-fit:contain;background:#000;border-radius:6px;flex-shrink:0;">':'<div style="width:70px;height:38px;background:#0d1b2a;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px;">&#9992;</div>')
      +'<div style="flex:1;"><div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+brand+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+planes.length+' model'+(planes.length>1?'i':'')+'</div></div>'
      +'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
      +'</div>';
  });
  document.getElementById('modal-body').innerHTML = html;
}

function openManufacturer(brand) {
  var aircraft = AIRCRAFT_CATALOG[brand] || [];
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openNewAircraftShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">'+brand+'</div></div>';
  aircraft.forEach(function(ac) {
    var canBuy = G.level >= (ac.level||1);
    var img = ac.img
      ? '<img src="'+ac.img+'" style="width:100%;max-height:110px;object-fit:contain;background:#000;border-radius:8px;margin-bottom:10px;">'
      : '';
    html += '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;margin-bottom:8px;">'
      +img
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;margin-bottom:3px;">'+ac.model+'</div>'
      +'<div style="font-size:10px;color:#5580a0;margin-bottom:6px;">'+ac.desc+'</div>'
      +'<div style="display:flex;gap:12px;font-size:10px;color:#5580a0;margin-bottom:8px;">'
      +'<span>&#128cadeiras; '+ac.seats+' miejsc</span>'
      +'<span>&#9992; '+ac.range+' km</span>'
      +'<span>'+ac.engines+'</span></div>'
      +(canBuy
        ? '<button data-model="'+ac.model+'" onclick="buyAircraftByEl(this)" style="width:100%;padding:9px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Kup za $'+ac.price.toLocaleString()+'</button>'
        : '<div style="padding:8px;background:rgba(255,255,255,0.03);border-radius:8px;text-align:center;font-size:11px;color:#5580a0;">Wymagany poziom '+ac.level+'</div>'
      )
      +'</div>';
  });
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function buyAircraftByEl(el) { buyAircraft(el.getAttribute('data-model')); }

function buyAircraft(model) {
  var ac = null;
  Object.keys(AIRCRAFT_CATALOG).forEach(function(brand) {
    AIRCRAFT_CATALOG[brand].forEach(function(a){ if(a.model===model) ac=a; });
  });
  if(!ac) return;
  if(G.cash < ac.price){ showMsg('Za malo gotowki!'); return; }
  if(G.level < (ac.level||1)){ showMsg('Za niski poziom!'); return; }
  G.cash -= ac.price;
  G.fleet.push({id:'ac_'+Date.now(),model:ac.model,reg:'VS-'+(100+G.fleet.length),seats:ac.seats,status:'ground',routeId:null});
  save(); updateHUD(); closeModal();
  showMsg('Kupiono '+model+'!');
}

function shopWatchAd() {
  closeModal();
  showRewardedAd(function() {
    G.points+=50; G.cash+=5000; save(); updateHUD();
    showMsg('+50 PKT i +$5,000 za reklame!');
  });
}

function showRewardedAd(callback) {
  window._adCallback = callback;
  var container = document.getElementById('ad-container');
  if(!container){ showMsg('Reklama niedostepna'); return; }
  container.style.display='flex';
  var wrapper = document.getElementById('ad-slot-wrapper');
  if(wrapper) {
    wrapper.innerHTML='<ins class="adsbygoogle" style="display:block;width:300px;height:200px;" data-ad-client="ca-pub-3572597201441656" data-ad-slot="7126799672" data-ad-format="fixed"></ins>';
    try{ (window.adsbygoogle=window.adsbygoogle||[]).push({}); }catch(e){}
  }
  var t=5,te=document.getElementById('ad-timer-txt'),cb=document.getElementById('ad-close-btn');
  if(te) te.textContent='Zamknij za '+t+'s';
  if(cb){ cb.disabled=true; cb.style.background='#333'; cb.style.color='#888'; cb.style.cursor='not-allowed'; }
  var ti=setInterval(function(){
    t--;
    if(te) te.textContent=t>0?'Zamknij za '+t+'s':'Mozesz zamknac!';
    if(t<=0){ clearInterval(ti); if(cb){ cb.disabled=false; cb.style.background='linear-gradient(135deg,#1a56db,#00d4ff)'; cb.style.color='#fff'; cb.style.cursor='pointer'; } }
  },1000);
}

function closeAd() {
  var c=document.getElementById('ad-container'); if(c) c.style.display='none';
  if(window._adCallback){ window._adCallback(); window._adCallback=null; }
}

/* Kraje i poziomy odblokowania */
var COUNTRY_LEVELS = {
  'Polska':     {lvl:1,  cost:50000,  flag:'🇵🇱'},
  'Niemcy':     {lvl:2,  cost:80000,  flag:'🇩🇪'},
  'Czechy':     {lvl:3,  cost:75000,  flag:'🇨🇿'},
  'Austria':    {lvl:4,  cost:75000,  flag:'🇦🇹'},
  'Francja':    {lvl:5,  cost:100000, flag:'🇫🇷'},
  'Hiszpania':  {lvl:6,  cost:90000,  flag:'🇪🇸'},
  'Portugalia': {lvl:7,  cost:85000,  flag:'🇵🇹'},
  'UK':         {lvl:8,  cost:110000, flag:'🇬🇧'},
  'Irlandia':   {lvl:9,  cost:100000, flag:'🇮🇪'},
  'Wlochy':     {lvl:10, cost:95000,  flag:'🇮🇹'},
  'Holandia':   {lvl:11, cost:95000,  flag:'🇳🇱'},
  'Belgia':     {lvl:12, cost:90000,  flag:'🇧🇪'},
  'Szwajcaria': {lvl:13, cost:120000, flag:'🇨🇭'},
  'Turcja':     {lvl:14, cost:100000, flag:'🇹🇷'},
  'Egipt':      {lvl:15, cost:120000, flag:'🇪🇬'},
  'UAE':        {lvl:16, cost:150000, flag:'🇦🇪'},
  'Skandynawia':{lvl:17, cost:110000, flag:'🌍'},
  'Indie':      {lvl:18, cost:160000, flag:'🇮🇳'},
  'Tajlandia':  {lvl:19, cost:150000, flag:'🇹🇭'},
  'Singapore':  {lvl:20, cost:200000, flag:'🇸🇬'},
  'Japonia':    {lvl:21, cost:190000, flag:'🇯🇵'},
  'Korea':      {lvl:22, cost:180000, flag:'🇰🇷'},
  'Chiny':      {lvl:23, cost:200000, flag:'🇨🇳'},
  'Etiopia':    {lvl:24, cost:150000, flag:'🇪🇹'},
  'RPA':        {lvl:25, cost:170000, flag:'🇿🇦'},
  'Australia':  {lvl:26, cost:220000, flag:'🇦🇺'},
  'Kanada':     {lvl:27, cost:180000, flag:'🇨🇦'},
  'Brazylia':   {lvl:28, cost:200000, flag:'🇧🇷'},
  'USA':        {lvl:29, cost:200000, flag:'🇺🇸'},
};

/* Mapowanie country z ADB na klucze COUNTRY_LEVELS */
function getCountryKey(country) {
  var map = {
    'Niemcy':'Niemcy','Francja':'Francja','UK':'UK','Hiszpania':'Hiszpania',
    'Portugalia':'Portugalia','Irlandia':'Irlandia','USA':'USA',
    'Italy':'Wlochy','Switzerland':'Szwajcaria','Netherlands':'Holandia',
    'Belgium':'Belgia','Turkey':'Turcja','UAE':'UAE','India':'Indie',
    'China':'Chiny','Japan':'Japonia','Korea':'Korea','Thailand':'Tajlandia',
    'Australia':'Australia','Brazil':'Brazylia','Egypt':'Egipt',
    'S.Africa':'RPA','Ethiopia':'Etiopia','Singapore':'Singapore',
    'Polska':'Polska'
  };
  return map[country] || country;
}

function openSlotShop() {
  var lvl = G.level || 1;
  
  // Get all unique countries from ADB
  var countries = {};
  ADB.forEach(function(ap){
    var key = getCountryKey(ap.country);
    if(!countries[key]) countries[key] = {key:key, country:ap.country, airports:[]};
    countries[key].airports.push(ap);
  });

  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">KUP SLOT</div></div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:12px;">Twoj poziom: <span style="color:#f5a623;font-weight:700;">'+lvl+'</span></div>';

  // Sort by required level
  var sorted = Object.keys(countries).sort(function(a,b){
    var la = (COUNTRY_LEVELS[a]||{lvl:9}).lvl;
    var lb = (COUNTRY_LEVELS[b]||{lvl:9}).lvl;
    return la-lb;
  });

  sorted.forEach(function(key){
    var info = COUNTRY_LEVELS[key] || {lvl:3, cost:100000, flag:'🌍'};
    var unlocked = lvl >= info.lvl;
    var c = countries[key];
    // Count available slots
    var available = c.airports.filter(function(ap){
      return G.slots.indexOf(ap.icao)<0 && !(G.homeAirport&&G.homeAirport.icao===ap.icao);
    }).length;

    html += '<div '+(unlocked?'data-ckey="'+key+'" onclick="openCountrySlots(this.dataset.ckey)"':'')
      +' style="display:flex;align-items:center;gap:12px;padding:11px 12px;border-radius:10px;background:'+(unlocked?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.02)')+';border:1px solid '+(unlocked?'rgba(255,255,255,0.08)':'rgba(255,255,255,0.03)')+';margin-bottom:6px;cursor:'+(unlocked?'pointer':'default')+';opacity:'+(unlocked?'1':'0.5')+'">'
      +'<div style="font-size:22px;">'+info.flag+'</div>'
      +'<div style="flex:1;">'
      +'<div style="font-size:13px;font-weight:700;color:'+(unlocked?'#e0f0ff':'#5580a0')+';">'+key+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+available+' lotnisk &bull; $'+info.cost.toLocaleString()+'/slot</div>'
      +'</div>'
      +(unlocked
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5580a0" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
        : '<div style="font-size:10px;color:#e63946;font-weight:700;">LVL '+info.lvl+'</div>'
      )
      +'</div>';
  });

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function openCountrySlots(countryKey) {
  var info = COUNTRY_LEVELS[countryKey] || {lvl:1, cost:100000, flag:'🌍'};
  var lvl = G.level || 1;
  if(lvl < info.lvl) { showMsg('Wymagany poziom '+info.lvl+'!'); return; }

  var slots = [];
  ADB.forEach(function(ap){
    var key = getCountryKey(ap.country);
    if(key !== countryKey) return;
    if(G.slots.indexOf(ap.icao)>=0||(G.homeAirport&&G.homeAirport.icao===ap.icao)) return;
    slots.push(ap);
  });

  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openSlotShop()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">'+info.flag+' '+countryKey+'</div></div>';

  if(!slots.length) {
    html += '<div style="padding:20px;text-align:center;color:#5580a0;">Brak dostepnych lotnisk lub wszystkie kupione</div>';
  } else {
    slots.forEach(function(ap){
      html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">'
        +'<div>'
        +'<div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+ap.icao+' - '+ap.city+'</div>'
        +'<div style="font-size:10px;color:#5580a0;">$'+info.cost.toLocaleString()+'</div>'
        +'</div>'
        +'<button data-icao="'+ap.icao+'" data-cost="'+info.cost+'" onclick="buySlotByEl(this)" style="padding:6px 14px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:6px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Kup</button>'
        +'</div>';
    });
  }

  document.getElementById('modal-body').innerHTML = html;
}

function buySlotByEl(el){ buySlot(el.dataset.icao,parseInt(el.dataset.cost)); }

function buySlot(icao,cost) {
  if(G.cash<cost){ showMsg('Za malo gotowki!'); return; }
  G.cash-=cost; G.slots.push(icao);
  var ap=null; ADB.forEach(function(a){if(a.icao===icao)ap=a;});
  if(ap) G.airports.push({id:'AP_'+icao,name:ap.city,icao:icao,city:ap.city,country:ap.country,lat:ap.lat,lng:ap.lng,isHome:false,level:1});
  save(); updateHUD(); renderMarkers();
  closeModal(); showMsg('Kupiono slot '+icao+'!');
}

function resetGame(){ localStorage.removeItem('sb_v3'); location.reload(); }
function saveSettings(){ closeModal(); showMsg('Zapisano!'); }
