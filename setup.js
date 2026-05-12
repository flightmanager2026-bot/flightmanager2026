/* -- SETUP -- */
var _setupFiltered=[], _setupPicked=null, _setupCountry=null;

var REAL_AIRPORTS_ICAO = ['EPWA','EPMO','EPRA','EPKK','EPGD','EPWR','EPPO','EPKT','EPRZ','EPSC','EPLL','EPBY','EPLU','EPCP'];

var WORLD_CITIES = {
  'Polska': {flag:'🇵🇱', cities:[
    {name:'Warszawa',lat:52.229,lng:21.012},{name:'Krakow',lat:50.061,lng:19.937},
    {name:'Lodz',lat:51.759,lng:19.457},{name:'Wroclaw',lat:51.107,lng:17.038},
    {name:'Poznan',lat:52.406,lng:16.925},{name:'Gdansk',lat:54.352,lng:18.646},
    {name:'Szczecin',lat:53.428,lng:14.553},{name:'Bydgoszcz',lat:53.123,lng:18.008},
    {name:'Lublin',lat:51.246,lng:22.568},{name:'Katowice',lat:50.259,lng:19.022},
    {name:'Bialystok',lat:53.130,lng:23.168},{name:'Gdynia',lat:54.518,lng:18.531},
    {name:'Czestochowa',lat:50.811,lng:19.120},{name:'Radom',lat:51.403,lng:21.146},
    {name:'Sosnowiec',lat:50.286,lng:19.104},{name:'Torun',lat:53.013,lng:18.598},
    {name:'Kielce',lat:50.866,lng:20.628},{name:'Rzeszow',lat:50.041,lng:22.004},
    {name:'Gliwice',lat:50.294,lng:18.665},{name:'Zabrze',lat:50.325,lng:18.786},
    {name:'Olsztyn',lat:53.778,lng:20.480},{name:'Bytom',lat:50.348,lng:18.918},
    {name:'Bielsko-Biala',lat:49.822,lng:19.044},{name:'Zielona Gora',lat:51.935,lng:15.506},
    {name:'Rybnik',lat:50.097,lng:18.541},{name:'Ruda Slaska',lat:50.259,lng:18.856},
    {name:'Opole',lat:50.675,lng:17.921},{name:'Tychy',lat:50.132,lng:18.979},
    {name:'Plock',lat:52.546,lng:19.706},{name:'Walbrzych',lat:50.785,lng:16.284},
    {name:'Wloclawek',lat:52.648,lng:19.065},{name:'Tarnow',lat:50.013,lng:20.986},
    {name:'Chorzow',lat:50.297,lng:18.954},{name:'Koszalin',lat:54.194,lng:16.172},
    {name:'Kalisz',lat:51.757,lng:18.091},{name:'Legnica',lat:51.207,lng:16.156},
    {name:'Grudziadz',lat:53.484,lng:18.753},{name:'Jaworzno',lat:50.205,lng:19.274},
    {name:'Slupsk',lat:54.464,lng:17.029},{name:'Jastrzebie-Zdroj',lat:49.957,lng:18.598},
    {name:'Nowy Sacz',lat:49.626,lng:20.692},{name:'Jelenia Gora',lat:50.904,lng:15.742},
    {name:'Siedlce',lat:52.167,lng:22.290},{name:'Mysłowice',lat:50.224,lng:19.167},
    {name:'Konin',lat:52.228,lng:18.251},{name:'Piotrkow Trybunalski',lat:51.405,lng:19.703},
    {name:'Inowroclaw',lat:52.797,lng:18.253},{name:'Lubin',lat:51.399,lng:16.199},
    {name:'Oswiecim',lat:50.035,lng:19.211},{name:'Suwalki',lat:54.112,lng:22.930},
    {name:'Ustka',lat:54.583,lng:16.861},{name:'Wyszków',lat:52.594,lng:21.459},
    {name:'Mielec',lat:50.288,lng:21.421},{name:'Stalowa Wola',lat:50.582,lng:22.053},
    {name:'Sanok',lat:49.559,lng:22.204},{name:'Przemysl',lat:49.783,lng:22.768}
  ]},
  'Niemcy': {flag:'🇩🇪', cities:[
    {name:'Berlin',lat:52.520,lng:13.405},{name:'Hamburg',lat:53.551,lng:9.993},
    {name:'Monachium',lat:48.137,lng:11.575},{name:'Kolonia',lat:50.938,lng:6.960},
    {name:'Frankfurt',lat:50.110,lng:8.682},{name:'Stuttgart',lat:48.775,lng:9.182},
    {name:'Dusseldorf',lat:51.227,lng:6.773},{name:'Dortmund',lat:51.514,lng:7.465},
    {name:'Essen',lat:51.455,lng:7.011},{name:'Lipsk',lat:51.340,lng:12.374},
    {name:'Drezno',lat:51.050,lng:13.737},{name:'Hanower',lat:52.374,lng:9.738},
    {name:'Norymberga',lat:49.453,lng:11.077},{name:'Brema',lat:53.079,lng:8.801},
    {name:'Karlsruhe',lat:49.006,lng:8.404},{name:'Rostock',lat:54.092,lng:12.099},
    {name:'Erfurt',lat:50.984,lng:11.030},{name:'Saarbrucken',lat:49.240,lng:6.997}
  ]},
  'Francja': {flag:'🇫🇷', cities:[
    {name:'Paryz',lat:48.856,lng:2.352},{name:'Marsylia',lat:43.296,lng:5.381},
    {name:'Lyon',lat:45.748,lng:4.847},{name:'Tuluza',lat:43.605,lng:1.444},
    {name:'Nicea',lat:43.710,lng:7.262},{name:'Nantes',lat:47.218,lng:-1.553},
    {name:'Strasburg',lat:48.574,lng:7.752},{name:'Montpellier',lat:43.611,lng:3.877},
    {name:'Bordeaux',lat:44.837,lng:-0.580},{name:'Lille',lat:50.630,lng:3.057},
    {name:'Rennes',lat:48.117,lng:-1.678},{name:'Reims',lat:49.259,lng:4.032}
  ]},
  'Wielka Brytania': {flag:'🇬🇧', cities:[
    {name:'Londyn',lat:51.507,lng:-0.128},{name:'Birmingham',lat:52.486,lng:-1.890},
    {name:'Manchester',lat:53.483,lng:-2.244},{name:'Glasgow',lat:55.860,lng:-4.251},
    {name:'Liverpool',lat:53.408,lng:-2.991},{name:'Leeds',lat:53.800,lng:-1.549},
    {name:'Sheffield',lat:53.381,lng:-1.470},{name:'Edinburgh',lat:55.953,lng:-3.189},
    {name:'Bristol',lat:51.455,lng:-2.595},{name:'Cardiff',lat:51.481,lng:-3.179},
    {name:'Belfast',lat:54.597,lng:-5.930},{name:'Newcastle',lat:54.978,lng:-1.613}
  ]},
  'Hiszpania': {flag:'🇪🇸', cities:[
    {name:'Madryt',lat:40.416,lng:-3.703},{name:'Barcelona',lat:41.385,lng:2.173},
    {name:'Walencja',lat:39.470,lng:-0.376},{name:'Sewilla',lat:37.389,lng:-5.984},
    {name:'Saragossa',lat:41.649,lng:-0.889},{name:'Malaga',lat:36.720,lng:-4.420},
    {name:'Murcia',lat:37.984,lng:-1.130},{name:'Palma',lat:39.569,lng:2.650},
    {name:'Bilbao',lat:43.263,lng:-2.935},{name:'Alicante',lat:38.346,lng:-0.490},
    {name:'Kordoba',lat:37.884,lng:-4.779},{name:'Valladolid',lat:41.652,lng:-4.724}
  ]},
  'Wlochy': {flag:'🇮🇹', cities:[
    {name:'Rzym',lat:41.902,lng:12.496},{name:'Mediolan',lat:45.464,lng:9.190},
    {name:'Neapol',lat:40.851,lng:14.268},{name:'Turyn',lat:45.070,lng:7.687},
    {name:'Palermo',lat:38.116,lng:13.362},{name:'Genua',lat:44.407,lng:8.934},
    {name:'Bolonia',lat:44.494,lng:11.343},{name:'Florencja',lat:43.769,lng:11.256},
    {name:'Bari',lat:41.118,lng:16.872},{name:'Wenecja',lat:45.441,lng:12.316}
  ]},
  'USA': {flag:'🇺🇸', cities:[
    {name:'Nowy Jork',lat:40.713,lng:-74.006},{name:'Los Angeles',lat:34.052,lng:-118.244},
    {name:'Chicago',lat:41.878,lng:-87.630},{name:'Houston',lat:29.760,lng:-95.370},
    {name:'Filadelfia',lat:39.953,lng:-75.165},{name:'Phoenix',lat:33.449,lng:-112.074},
    {name:'San Antonio',lat:29.424,lng:-98.494},{name:'San Diego',lat:32.715,lng:-117.157},
    {name:'Dallas',lat:32.783,lng:-96.807},{name:'San Francisco',lat:37.774,lng:-122.419},
    {name:'Jacksonville',lat:30.332,lng:-81.656},{name:'Austin',lat:30.267,lng:-97.743},
    {name:'Miami',lat:25.774,lng:-80.194},{name:'Denver',lat:39.740,lng:-104.984},
    {name:'Seattle',lat:47.606,lng:-122.332},{name:'Las Vegas',lat:36.175,lng:-115.137},
    {name:'Nashville',lat:36.165,lng:-86.784},{name:'Boston',lat:42.360,lng:-71.059}
  ]},
  'Kanada': {flag:'🇨🇦', cities:[
    {name:'Toronto',lat:43.653,lng:-79.383},{name:'Montreal',lat:45.501,lng:-73.567},
    {name:'Vancouver',lat:49.283,lng:-123.121},{name:'Calgary',lat:51.045,lng:-114.058},
    {name:'Edmonton',lat:53.546,lng:-113.490},{name:'Ottawa',lat:45.421,lng:-75.697},
    {name:'Winnipeg',lat:49.899,lng:-97.138},{name:'Quebec',lat:46.813,lng:-71.208}
  ]},
  'Japonia': {flag:'🇯🇵', cities:[
    {name:'Tokio',lat:35.689,lng:139.692},{name:'Osaka',lat:34.694,lng:135.502},
    {name:'Nagoja',lat:35.183,lng:136.907},{name:'Sapporo',lat:43.062,lng:141.355},
    {name:'Fukuoka',lat:33.590,lng:130.402},{name:'Kobe',lat:34.691,lng:135.196},
    {name:'Kioto',lat:35.012,lng:135.768},{name:'Hiroszima',lat:34.385,lng:132.455}
  ]},
  'Chiny': {flag:'🇨🇳', cities:[
    {name:'Pekin',lat:39.905,lng:116.391},{name:'Szanghaj',lat:31.224,lng:121.469},
    {name:'Guangzhou',lat:23.130,lng:113.264},{name:'Shenzhen',lat:22.543,lng:114.058},
    {name:'Tianjin',lat:39.125,lng:117.191},{name:'Chengdu',lat:30.658,lng:104.066},
    {name:'Wuhan',lat:30.593,lng:114.305},{name:'Xian',lat:34.341,lng:108.940}
  ]},
  'Australia': {flag:'🇦🇺', cities:[
    {name:'Sydney',lat:-33.868,lng:151.209},{name:'Melbourne',lat:-37.814,lng:144.963},
    {name:'Brisbane',lat:-27.469,lng:153.025},{name:'Perth',lat:-31.950,lng:115.861},
    {name:'Adelaide',lat:-34.929,lng:138.601},{name:'Gold Coast',lat:-28.017,lng:153.400},
    {name:'Canberra',lat:-35.282,lng:149.129},{name:'Darwin',lat:-12.463,lng:130.844}
  ]},
  'Brazylia': {flag:'🇧🇷', cities:[
    {name:'Sao Paulo',lat:-23.550,lng:-46.634},{name:'Rio de Janeiro',lat:-22.906,lng:-43.173},
    {name:'Brasilia',lat:-15.780,lng:-47.930},{name:'Salvador',lat:-12.971,lng:-38.501},
    {name:'Fortaleza',lat:-3.717,lng:-38.543},{name:'Belo Horizonte',lat:-19.918,lng:-43.939},
    {name:'Manaus',lat:-3.119,lng:-60.022},{name:'Curitiba',lat:-25.429,lng:-49.271}
  ]},
  'Indie': {flag:'🇮🇳', cities:[
    {name:'Mumbai',lat:19.076,lng:72.878},{name:'Delhi',lat:28.614,lng:77.209},
    {name:'Bangalore',lat:12.972,lng:77.594},{name:'Hyderabad',lat:17.385,lng:78.487},
    {name:'Chennai',lat:13.083,lng:80.270},{name:'Kolkata',lat:22.573,lng:88.364},
    {name:'Pune',lat:18.520,lng:73.857},{name:'Ahmedabad',lat:23.023,lng:72.572}
  ]},
  'ZEA': {flag:'🇦🇪', cities:[
    {name:'Dubaj',lat:25.204,lng:55.270},{name:'Abu Zabi',lat:24.453,lng:54.377},
    {name:'Szardza',lat:25.357,lng:55.403},{name:'Adżman',lat:25.412,lng:55.435}
  ]},
  'Turcja': {flag:'🇹🇷', cities:[
    {name:'Stambuł',lat:41.015,lng:28.979},{name:'Ankara',lat:39.920,lng:32.854},
    {name:'Izmir',lat:38.424,lng:27.143},{name:'Bursa',lat:40.182,lng:29.061},
    {name:'Antalya',lat:36.898,lng:30.713},{name:'Adana',lat:36.989,lng:35.329}
  ]},
  'Rosja': {flag:'🇷🇺', cities:[
    {name:'Moskwa',lat:55.751,lng:37.618},{name:'Petersburg',lat:59.939,lng:30.316},
    {name:'Nowosybirsk',lat:54.989,lng:82.904},{name:'Jekaterynburg',lat:56.838,lng:60.597},
    {name:'Kazań',lat:55.796,lng:49.106},{name:'Nizhny Novgorod',lat:56.296,lng:43.936}
  ]},
  'Portugalia': {flag:'🇵🇹', cities:[
    {name:'Lizbona',lat:38.717,lng:-9.139},{name:'Porto',lat:41.157,lng:-8.629},
    {name:'Braga',lat:41.550,lng:-8.426},{name:'Coimbra',lat:40.211,lng:-8.430},
    {name:'Faro',lat:37.016,lng:-7.935},{name:'Funchal',lat:32.660,lng:-16.914}
  ]},
  'Holandia': {flag:'🇳🇱', cities:[
    {name:'Amsterdam',lat:52.374,lng:4.898},{name:'Rotterdam',lat:51.924,lng:4.470},
    {name:'Haga',lat:52.078,lng:4.312},{name:'Utrecht',lat:52.090,lng:5.121},
    {name:'Eindhoven',lat:51.442,lng:5.479},{name:'Groningen',lat:53.219,lng:6.567}
  ]},
  'Belgia': {flag:'🇧🇪', cities:[
    {name:'Bruksela',lat:50.851,lng:4.352},{name:'Antwerpia',lat:51.221,lng:4.400},
    {name:'Gandawa',lat:51.054,lng:3.721},{name:'Liege',lat:50.633,lng:5.566}
  ]},
  'Szwajcaria': {flag:'🇨🇭', cities:[
    {name:'Zurich',lat:47.377,lng:8.541},{name:'Genewa',lat:46.204,lng:6.144},
    {name:'Bazylea',lat:47.560,lng:7.589},{name:'Berno',lat:46.948,lng:7.447}
  ]},
  'Austria': {flag:'🇦🇹', cities:[
    {name:'Wiedeń',lat:48.210,lng:16.363},{name:'Graz',lat:47.070,lng:15.440},
    {name:'Linz',lat:48.306,lng:14.286},{name:'Salzburg',lat:47.800,lng:13.045}
  ]},
  'Czechy': {flag:'🇨🇿', cities:[
    {name:'Praga',lat:50.075,lng:14.438},{name:'Brno',lat:49.195,lng:16.608},
    {name:'Ostrawa',lat:49.821,lng:18.263},{name:'Pilzno',lat:49.738,lng:13.374}
  ]},
  'Korea Poludniowa': {flag:'🇰🇷', cities:[
    {name:'Seul',lat:37.566,lng:126.978},{name:'Busan',lat:35.179,lng:129.076},
    {name:'Incheon',lat:37.456,lng:126.706},{name:'Daegu',lat:35.871,lng:128.602}
  ]},
  'Tajlandia': {flag:'🇹🇭', cities:[
    {name:'Bangkok',lat:13.756,lng:100.502},{name:'Chiang Mai',lat:18.787,lng:98.993},
    {name:'Phuket',lat:7.890,lng:98.398},{name:'Pattaya',lat:12.928,lng:100.877}
  ]},
  'Singapur': {flag:'🇸🇬', cities:[
    {name:'Singapur',lat:1.352,lng:103.820}
  ]},
  'RPA': {flag:'🇿🇦', cities:[
    {name:'Johannesburg',lat:-26.204,lng:28.046},{name:'Kapsztad',lat:-33.925,lng:18.424},
    {name:'Durban',lat:-29.858,lng:31.030},{name:'Pretoria',lat:-25.746,lng:28.187}
  ]},
  'Meksyk': {flag:'🇲🇽', cities:[
    {name:'Meksyk',lat:19.433,lng:-99.133},{name:'Guadalajara',lat:20.677,lng:-103.347},
    {name:'Monterrey',lat:25.687,lng:-100.314},{name:'Puebla',lat:19.044,lng:-98.197}
  ]},
  'Argentyna': {flag:'🇦🇷', cities:[
    {name:'Buenos Aires',lat:-34.614,lng:-58.444},{name:'Kordoba',lat:-31.415,lng:-64.183},
    {name:'Rosario',lat:-32.944,lng:-60.651},{name:'Mendoza',lat:-32.890,lng:-68.829}
  ]}
};

function showSetupScreen() {
  var el=document.createElement('div');
  el.id='setupScreen';
  el.style.cssText='position:fixed;inset:0;z-index:400;background:rgba(5,10,20,0.98);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;font-family:Arial,sans-serif;overflow-y:auto;';
  el.innerHTML=
    '<div style="font-size:28px;font-weight:900;color:#00d4ff;letter-spacing:4px;">FLIGHT</div>'
    +'<div style="font-size:28px;font-weight:900;color:#fff;letter-spacing:4px;margin-bottom:20px;">MANAGER 2026</div>'
    +'<div id="setup-box" style="width:100%;max-width:440px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.2);border-radius:16px;padding:20px;">'
    +'</div>';
  document.body.appendChild(el);
  renderCountryStep();
}

function renderCountryStep() {
  var box = document.getElementById('setup-box');
  if(!box) return;
  var countries = Object.keys(WORLD_CITIES);
  var html = '<div style="font-size:11px;color:#5580a0;letter-spacing:2px;margin-bottom:12px;">WYBIERZ KRAJ BAZY</div>'
    +'<input id="sq-country" type="text" placeholder="Szukaj kraju..." oninput="filterCountries()" '
    +'style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:10px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:10px;outline:none;box-sizing:border-box;">'
    +'<div id="country-list" style="max-height:380px;overflow-y:auto;"></div>';
  box.innerHTML = html;
  renderCountryList2(countries);
}

function renderCountryList2(list) {
  var el = document.getElementById('country-list');
  if(!el) return;
  var html = '';
  list.forEach(function(name) {
    var c = WORLD_CITIES[name];
    html += '<div data-c="'+name+'" onclick="selectCountry(this.dataset.c)" '
      +'style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);margin-bottom:6px;cursor:pointer;">'
      +'<span style="font-size:24px;">'+c.flag+'</span>'
      +'<div style="flex:1;">'
      +'<div style="font-size:14px;font-weight:700;color:#e0f0ff;">'+name+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+c.cities.length+' miast</div>'
      +'</div>'
      +'<span style="color:#5580a0;font-size:18px;">&#8250;</span>'
      +'</div>';
  });
  el.innerHTML = html || '<div style="padding:14px;color:#5580a0;">Brak wynikow</div>';
}

function filterCountries() {
  var q = (document.getElementById('sq-country').value||'').toLowerCase();
  var all = Object.keys(WORLD_CITIES);
  var filtered = q ? all.filter(function(n){ return n.toLowerCase().indexOf(q)>=0; }) : all;
  renderCountryList2(filtered);
}

function selectCountry(country) {
  _setupCountry = country;
  var c = WORLD_CITIES[country];
  if(!c) return;
  _setupFiltered = c.cities.map(function(city){ return {name:city.name,lat:city.lat,lng:city.lng,icao:'',voiv:country,airport:''}; });
  _setupPicked = null;

  var box = document.getElementById('setup-box');
  box.innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="renderCountryStep()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;padding:0;">&#8592;</button>'
    +'<span style="font-size:22px;">'+c.flag+'</span>'
    +'<div style="font-size:13px;font-weight:700;color:#00d4ff;">'+country+'</div>'
    +'</div>'
    +'<div style="font-size:11px;color:#5580a0;letter-spacing:2px;margin-bottom:10px;">WYBIERZ MIASTO</div>'
    +'<input id="sq" type="text" placeholder="Szukaj miasta..." oninput="setupFilter()" '
    +'style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:10px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:8px;outline:none;box-sizing:border-box;">'
    +'<div id="slist" style="max-height:260px;overflow-y:auto;border-radius:8px;border:1px solid rgba(255,255,255,0.07);margin-bottom:10px;"></div>'
    +'<div id="spicked" style="display:none;margin-bottom:10px;padding:10px;background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.2);border-radius:8px;font-size:13px;color:#00d4ff;font-weight:700;"></div>'
    +'<button id="sbtn" onclick="setupGo()" disabled style="width:100%;padding:13px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:10px;color:#fff;font-size:15px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;opacity:0.4;">Rozpocznij</button>';

  renderSetupList();
  setTimeout(function(){ var sq=document.getElementById('sq'); if(sq) sq.focus(); },100);
}

function setupFilter() {
  var q=(document.getElementById('sq').value||'').toLowerCase();
  var base = _setupCountry && WORLD_CITIES[_setupCountry]
    ? WORLD_CITIES[_setupCountry].cities.map(function(c){ return {name:c.name,lat:c.lat,lng:c.lng,icao:'',voiv:_setupCountry,airport:''}; })
    : [];
  _setupFiltered = q ? base.filter(function(c){ return c.name.toLowerCase().indexOf(q)>=0; }) : base;
  renderSetupList();
}

function renderSetupList() {
  var shown=_setupFiltered.slice(0,60), out='';
  for(var j=0;j<shown.length;j++){
    var c=shown[j];
    var active=_setupPicked&&_setupPicked.name===c.name;
    out+='<div onclick="setupPick('+j+')" style="padding:11px 14px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);background:'+(active?'rgba(0,212,255,0.12)':'transparent')+';border-radius:'+(active?'8px':'0')+';color:'+(active?'#00d4ff':'#cce4ff')+';font-size:14px;font-family:Arial,sans-serif;">'
      +c.name+'<span style="font-size:10px;color:#5580a0;margin-left:8px;">'+c.voiv+'</span></div>';
  }
  if(!out) out='<div style="padding:14px;color:#5580a0;font-family:Arial,sans-serif;">Brak wynikow</div>';
  var sl=document.getElementById('slist'); if(sl) sl.innerHTML=out;
}

function setupPick(j) {
  _setupPicked=_setupFiltered[j]; if(!_setupPicked) return;
  var sp=document.getElementById('spicked');
  if(sp){ sp.textContent='📍 '+_setupPicked.name+', '+_setupPicked.voiv; sp.style.display='block'; }
  var btn=document.getElementById('sbtn'); if(btn){ btn.disabled=false; btn.style.opacity='1'; }
  renderSetupList();
}

function setupGo() {
  var c=_setupPicked; if(!c) return;
  var cleanName = c.name.replace(/[^a-zA-Z]/g,'').toUpperCase().substring(0,2);
  var prefix = _setupCountry==='Polska'?'EP':_setupCountry==='Niemcy'?'ED':_setupCountry==='Francja'?'LF':_setupCountry==='UK'?'EG':'ZZ';
  var icao = prefix+cleanName;
  var ap={id:'AP_HOME',name:'Port Lotniczy '+c.name,icao:icao,city:c.name,country:_setupCountry||'Polska',lat:c.lat,lng:c.lng,isHome:true,level:1,maxSlots:10,usedSlots:0,upgrades:{runways:1,terminal:1,hangar:1,shops:0,parking:0},income:0};
  G.airports.push(ap); G.homeAirport=ap;
  G.airline.name='VIS Airlines'; G.airline.iata='VS';
  save();
  var _ss=document.getElementById('setupScreen');
  if(_ss) document.body.removeChild(_ss);
  initMap();
  setTimeout(function(){
    LMAP.invalidateSize({animate:false});
    LMAP.setView([c.lat,c.lng],7);
    renderMarkers(); renderRoutes();
    restoreFlights(); startTick(); updateHUD();
    showMsg('Baza w '+c.name+' gotowa!');
  }, 50);
}
