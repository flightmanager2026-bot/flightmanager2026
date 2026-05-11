function showSetupScreen() {
  var el=document.createElement('div');
  el.id='setupScreen';
  el.style.cssText='position:fixed;inset:0;z-index:400;background:rgba(5,10,20,0.98);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;';
  el.innerHTML='<div style="font-size:36px;font-weight:900;color:#00d4ff;letter-spacing:5px;margin-bottom:0;">FLIGHT</div>'
    +'<div style="font-size:36px;font-weight:900;color:#fff;letter-spacing:5px;margin-bottom:24px;">MANAGER 2026</div>'
    +'<div style="width:100%;max-width:420px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.2);border-radius:16px;padding:24px;">'
    +'<div style="font-size:11px;color:#5580a0;letter-spacing:2px;margin-bottom:12px;">WYBIERZ MIASTO BAZY</div>'
    +'<input id="sq" type="text" placeholder="Szukaj miasta..." oninput="setupFilter()" style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:12px;color:#fff;font-size:15px;font-family:Arial,sans-serif;margin-bottom:10px;outline:none;box-sizing:border-box;">'
    +'<div id="slist" style="max-height:260px;overflow-y:auto;border-radius:8px;border:1px solid rgba(255,255,255,0.08);margin-bottom:10px;"></div>'
    +'<div id="spicked" style="display:none;margin-bottom:10px;padding:10px;background:rgba(0,212,255,0.1);border-radius:8px;font-size:13px;color:#00d4ff;font-weight:700;"></div>'
    +'<button id="sbtn" onclick="setupGo()" disabled style="width:100%;padding:14px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:10px;color:#fff;font-size:16px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;opacity:0.5;">Rozpocznij</button>'
    +'</div>';
  document.body.appendChild(el);
  _setupFiltered=POLISH_CITIES.filter(function(c){ return (typeof REAL_AIRPORTS_ICAO==='undefined'||REAL_AIRPORTS_ICAO.indexOf(c.icao)<0); });
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
