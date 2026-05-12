var GERMAN_CITIES = [
  {name:'Berlin',lat:52.520,lng:13.405},
  {name:'Hamburg',lat:53.551,lng:9.993},
  {name:'Monachium',lat:48.137,lng:11.575},
  {name:'Kolonia',lat:50.938,lng:6.960},
  {name:'Frankfurt nad Menem',lat:50.110,lng:8.682},
  {name:'Stuttgart',lat:48.775,lng:9.182},
  {name:'Dusseldorf',lat:51.227,lng:6.773},
  {name:'Dortmund',lat:51.514,lng:7.465},
  {name:'Essen',lat:51.455,lng:7.011},
  {name:'Lipsk',lat:51.340,lng:12.374},
  {name:'Drezno',lat:51.050,lng:13.737},
  {name:'Hanower',lat:52.374,lng:9.738},
  {name:'Norymberga',lat:49.453,lng:11.077},
  {name:'Duisburg',lat:51.434,lng:6.762},
  {name:'Bochum',lat:51.482,lng:7.216},
  {name:'Wuppertal',lat:51.257,lng:7.151},
  {name:'Bielefeld',lat:52.021,lng:8.532},
  {name:'Bonn',lat:50.733,lng:7.099},
  {name:'Munster',lat:51.962,lng:7.626},
  {name:'Karlsruhe',lat:49.006,lng:8.404},
  {name:'Mannheim',lat:49.488,lng:8.466},
  {name:'Augsburg',lat:48.370,lng:10.898},
  {name:'Wiesbaden',lat:50.082,lng:8.240},
  {name:'Gelsenkirchen',lat:51.517,lng:7.085},
  {name:'Monchengladbach',lat:51.180,lng:6.441},
  {name:'Braunschweig',lat:52.268,lng:10.526},
  {name:'Brema',lat:53.079,lng:8.801},
  {name:'Halle',lat:51.483,lng:11.970},
  {name:'Krefeld',lat:51.337,lng:6.585},
  {name:'Magdeburg',lat:52.131,lng:11.640},
  {name:'Rostock',lat:54.092,lng:12.099},
  {name:'Erfurt',lat:50.984,lng:11.030},
  {name:'Kassel',lat:51.312,lng:9.479},
  {name:'Freiburg',lat:47.999,lng:7.842},
  {name:'Lubeka',lat:53.865,lng:10.687},
  {name:'Oberhausen',lat:51.470,lng:6.851},
  {name:'Hagen',lat:51.358,lng:7.475},
  {name:'Hamm',lat:51.680,lng:7.815},
  {name:'Saarbrucken',lat:49.240,lng:6.997},
  {name:'Mülheim',lat:51.426,lng:6.882}
];

var SETUP_COUNTRIES = [
  {name:'Polska', flag:'🇵🇱', cities:null},
  {name:'Niemcy', flag:'🇩🇪', cities:'GERMAN'}
];
var _setupCountry = null;

function showSetupScreen() {
  var el=document.createElement('div');
  el.id='setupScreen';
  el.style.cssText='position:fixed;inset:0;z-index:400;background:rgba(5,10,20,0.98);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;overflow-y:auto;';
  el.innerHTML='<div style="font-size:32px;font-weight:900;color:#00d4ff;letter-spacing:4px;margin-bottom:0;">FLIGHT</div>'
    +'<div style="font-size:32px;font-weight:900;color:#fff;letter-spacing:4px;margin-bottom:20px;">MANAGER 2026</div>'
    +'<div style="width:100%;max-width:420px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.2);border-radius:16px;padding:20px;">'
    +'<div style="font-size:11px;color:#5580a0;letter-spacing:2px;margin-bottom:14px;">WYBIERZ KRAJ BAZY</div>'
    +'<div id="country-list"></div>'
    +'</div>';
  document.body.appendChild(el);
  renderCountryList();
}

function renderCountryList() {
  var el = document.getElementById('country-list');
  if(!el) return;
  var countries = [
    {name:'Polska', flag:'🇵🇱'},
    {name:'Niemcy', flag:'🇩🇪'}
  ];
  var html = '';
  countries.forEach(function(c) {
    html += '<div data-c="'+c.name+'" onclick="selectCountry(this.dataset.c)" style="display:flex;align-items:center;gap:14px;padding:14px;border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);margin-bottom:8px;cursor:pointer;">'
      +'<div style="font-size:28px;">'+c.flag+'</div>'
      +'<div style="font-size:15px;font-weight:700;color:#e0f0ff;">'+c.name+'</div>'
      +'<div style="margin-left:auto;color:#5580a0;font-size:20px;">&#8250;</div>'
      +'</div>';
  });
  el.innerHTML = html;
}

function selectCountry(country) {
  _setupCountry = country;
  var box = document.querySelector('#setupScreen > div');
  if(!box) return;
  box.innerHTML = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="goBackToCountrySelect()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;">&#8592;</button>'
    +'<div style="font-size:11px;color:#5580a0;letter-spacing:2px;">WYBIERZ MIASTO W: '+country+'</div>'
    +'</div>'
    +'<input id="sq" type="text" placeholder="Szukaj miasta..." oninput="setupFilter()" style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:12px;color:#fff;font-size:15px;font-family:Arial,sans-serif;margin-bottom:10px;outline:none;box-sizing:border-box;">'
    +'<div id="slist" style="max-height:280px;overflow-y:auto;border-radius:8px;border:1px solid rgba(255,255,255,0.08);margin-bottom:10px;"></div>'
    +'<div id="spicked" style="display:none;margin-bottom:10px;padding:10px;background:rgba(0,212,255,0.1);border-radius:8px;font-size:13px;color:#00d4ff;font-weight:700;"></div>'
    +'<button id="sbtn" onclick="setupGo()" disabled style="width:100%;padding:14px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:10px;color:#fff;font-size:16px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;opacity:0.5;">Rozpocznij</button>';

  // Load cities for selected country
  if(country === 'Polska') {
    _setupFiltered = POLISH_CITIES.filter(function(c){ return (typeof REAL_AIRPORTS_ICAO==='undefined'||REAL_AIRPORTS_ICAO.indexOf(c.icao)<0); });
  } else if(country === 'Niemcy') {
    _setupFiltered = GERMAN_CITIES.map(function(c){ return {name:c.name,lat:c.lat,lng:c.lng,icao:'',voiv:'Niemcy',airport:''}; });
  }
  renderSetupList();
  setTimeout(function(){var sq=document.getElementById('sq');if(sq)sq.focus();},100);
}
/* -- SETUP -- */
var _setupFiltered=[], _setupPicked=null;

/* ICAOs ktore sa prawdziwymi lotniskami - nie mozna jako baza */
var REAL_AIRPORTS_ICAO = ['EPWA','EPMO','EPRA','EPKK','EPGD','EPWR','EPPO','EPKT','EPRZ','EPSC','EPLL','EPBY','EPLU','EPCP'];

function setupFilter() {
  var q=(document.getElementById('sq').value||'').toLowerCase();
  _setupFiltered=[];
  for(var i=0;i<POLISH_CITIES.length;i++){
    var c=POLISH_CITIES[i];
    // Skip cities that are real airports (they appear on map separately)
    if(REAL_AIRPORTS_ICAO.indexOf(c.icao)>=0) continue;
    if(!q||c.name.toLowerCase().indexOf(q)>=0||c.voiv.toLowerCase().indexOf(q)>=0) _setupFiltered.push(c);
  }
  renderSetupList();
}

function renderSetupList() {
  var shown=_setupFiltered.slice(0,40), out='';
  for(var j=0;j<shown.length;j++){
    var c=shown[j];
    var active=_setupPicked&&_setupPicked.name===c.name;
    out+='<div onclick="setupPick('+j+')" style="padding:10px 14px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.06);background:'+(active?'rgba(0,212,255,0.15)':'transparent')+';color:'+(active?'#00d4ff':'#cce4ff')+';font-size:14px;font-family:Arial,sans-serif;">'
      +c.name+'<span style="font-size:10px;color:#5580a0;margin-left:8px;">'+c.voiv+' &bull; '+c.airport+'</span></div>';
  }
  if(!out) out='<div style="padding:14px;color:#5580a0;font-family:Arial,sans-serif;">Brak wynikow</div>';
  var sl=document.getElementById('slist'); if(sl) sl.innerHTML=out;
}

function setupPick(j) {
  _setupPicked=_setupFiltered[j]; if(!_setupPicked) return;
  var sp=document.getElementById('spicked'); if(sp){sp.textContent=_setupPicked.name+' - '+_setupPicked.airport;sp.style.display='block';}
  var btn=document.getElementById('sbtn'); btn.disabled=false; btn.style.opacity='1';
  renderSetupList();
}

function setupGo() {
  var c=_setupPicked; if(!c) return;
  // Uzyj istniejacego kodu ICAO z bazy miast lub stworz wlasny
  var icao = c.icao && c.icao !== '' ? c.icao : 'EP'+c.name.substring(0,2).toUpperCase().replace(/[^A-Z]/g,'X');
  var ap={id:'AP_HOME',name:'Port Lotniczy '+c.name,icao:icao,city:c.name,country:'Polska',lat:c.lat,lng:c.lng,isHome:true,level:1,maxSlots:10,usedSlots:0,upgrades:{runways:1,terminal:1,hangar:1,shops:0,parking:0},income:0};
  G.airports.push(ap); G.homeAirport=ap;
  G.airline.name='VIS Airlines'; G.airline.iata='VS';
  save();
  var _ss=document.getElementById('setupScreen');
  if(_ss) document.body.removeChild(_ss);
  // Mapa inicjuje sie PO usunieciu setup screena - wtedy ma poprawny rozmiar
  initMap();
  // invalidateSize() - upewniamy sie ze Leaflet zna prawdziwy rozmiar kontenera
  setTimeout(function(){
    LMAP.invalidateSize({animate:false});
    LMAP.setView([c.lat,c.lng],7);
    renderMarkers(); renderRoutes();
    restoreFlights(); startTick(); updateHUD();
    showMsg('Baza w '+c.name+' gotowa!');
  }, 50);
}


function goBackToCountrySelect() {
  var box = document.querySelector('#setupScreen > div');
  if(!box) return;
  box.innerHTML = '<div style="font-size:11px;color:#5580a0;letter-spacing:2px;margin-bottom:14px;">WYBIERZ KRAJ BAZY</div><div id="country-list"></div>';
  renderCountryList();
}
