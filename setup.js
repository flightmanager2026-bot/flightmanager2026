/* -- SETUP -- */
var _setupFiltered=[], _setupPicked=null;

function setupFilter() {
  var q=(document.getElementById('sq').value||'').toLowerCase();
  _setupFiltered=[];
  for(var i=0;i<POLISH_CITIES.length;i++){
    var c=POLISH_CITIES[i];
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
  var ap={id:'AP_HOME',name:c.airport!=='brak lotniska'?c.airport:c.name,icao:c.icao,city:c.name,country:'Polska',lat:c.lat,lng:c.lng,isHome:true,level:1,maxSlots:10,usedSlots:0};
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
