/* -- KONTO -- */

/* Simple local auth system */
function getPlayer() {
  try { return JSON.parse(localStorage.getItem('fm_player') || 'null'); } catch(e) { return null; }
}
function savePlayer(p) { localStorage.setItem('fm_player', JSON.stringify(p)); }

function openAccount() {
  var player = getPlayer();
  if(!player) { openLogin(); return; }
  renderAccountPanel(player);
}

function renderAccountPanel(player) {
  var allianceColors = ['#e63946','#00d4ff','#00e676','#f5a623','#a78bfa','#ff6b6b'];
  var mapStyles = [
    {name:'Standardowa', val:'standard'},
    {name:'Ciemna', val:'dark'},
    {name:'Satelita', val:'satellite'},
    {name:'Kolejowa', val:'transport'}
  ];

  var html = '<div style="font-size:16px;font-weight:700;color:#00d4ff;margin-bottom:4px;">&#128100; '+player.name+'</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:16px;">'+player.airline+' &bull; Dolaczono: '+player.joined+'</div>'

    // Menu items
    +'<div style="display:flex;flex-direction:column;gap:2px;">'

    // Ustawienia
    +'<div onclick="openSettings()" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">'
    +'<div style="width:32px;height:32px;border-radius:8px;background:rgba(0,212,255,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;">&#9881;</div>'
    +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">Ustawienia</div><div style="font-size:11px;color:#5580a0;">Dzwiek, powiadomienia, jezyk</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">&#8250;</div></div>'

    // Zmiana koloru mapy
    +'<div onclick="openMapStyle()" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">'
    +'<div style="width:32px;height:32px;border-radius:8px;background:rgba(0,212,255,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;">&#127760;</div>'
    +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">Styl mapy</div><div style="font-size:11px;color:#5580a0;">Standardowa, ciemna, satelita...</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">&#8250;</div></div>'

    // Sojusz
    +'<div onclick="openAlliance()" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">'
    +'<div style="width:32px;height:32px;border-radius:8px;background:rgba(245,166,35,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;">&#9992;</div>'
    +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">Sojusz</div><div style="font-size:11px;color:#5580a0;">'+(player.alliance||'Brak sojuszu')+'</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">&#8250;</div></div>'

    // Ranking
    +'<div onclick="openRanking()" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">'
    +'<div style="width:32px;height:32px;border-radius:8px;background:rgba(167,139,250,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;">&#127942;</div>'
    +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">Ranking</div><div style="font-size:11px;color:#5580a0;">Porownaj z innymi graczami</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">&#8250;</div></div>'

    // Nagrody
    +'<div onclick="openRewards()" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">'
    +'<div style="width:32px;height:32px;border-radius:8px;background:rgba(0,230,118,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;">&#127873;</div>'
    +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">Nagrody</div><div style="font-size:11px;color:#5580a0;">Osiagniecia i bonusy dzienne</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">&#8250;</div></div>'

    +'<div style="height:1px;background:rgba(255,255,255,0.07);margin:8px 0;"></div>'

    // Zresetuj postepy
    +'<div onclick="confirmReset()" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;cursor:pointer;background:rgba(230,57,70,0.05);border:1px solid rgba(230,57,70,0.15);">'
    +'<div style="width:32px;height:32px;border-radius:8px;background:rgba(230,57,70,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;">&#128465;</div>'
    +'<div><div style="font-size:13px;font-weight:600;color:#e63946;">Zresetuj postepy</div><div style="font-size:11px;color:#5580a0;">Usun zapis gry</div></div></div>'

    // Wyloguj
    +'<div onclick="logoutPlayer()" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);">'
    +'<div style="width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:16px;">&#128682;</div>'
    +'<div><div style="font-size:13px;font-weight:600;color:#e0f0ff;">Wyloguj sie</div><div style="font-size:11px;color:#5580a0;">Powrot do ekranu logowania</div></div></div>'

    +'</div>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function openLogin() {
  document.getElementById('modal-body').innerHTML =
    '<div style="font-size:18px;font-weight:900;color:#00d4ff;text-align:center;margin-bottom:4px;">FLIGHT</div>'
    +'<div style="font-size:18px;font-weight:900;color:#fff;text-align:center;margin-bottom:20px;">MANAGER 2026</div>'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:8px;">NAZWA GRACZA</div>'
    +'<input id="login-name" type="text" placeholder="Twoje imie..." maxlength="20" style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:11px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:10px;outline:none;box-sizing:border-box;">'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:8px;">NAZWA LINII LOTNICZEJ</div>'
    +'<input id="login-airline" type="text" placeholder="Nazwa linii..." maxlength="30" style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:8px;padding:11px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:16px;outline:none;box-sizing:border-box;">'
    +'<button onclick="registerPlayer()" style="width:100%;padding:13px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:10px;color:#fff;font-size:15px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zarejestruj i graj</button>'
    +'<button onclick="closeModal()" style="width:100%;padding:10px;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-top:8px;">Anuluj</button>';
  document.getElementById('modal').style.display = 'flex';
}

function registerPlayer() {
  var name = (document.getElementById('login-name').value||'').trim();
  var airline = (document.getElementById('login-airline').value||'').trim();
  if(!name){ showMsg('Podaj nazwe gracza!'); return; }
  if(!airline){ showMsg('Podaj nazwe linii!'); return; }
  var now = new Date();
  var player = {
    name: name,
    airline: airline,
    joined: now.toLocaleDateString('pl-PL'),
    alliance: null,
    mapStyle: 'standard'
  };
  savePlayer(player);
  if(G.airline) { G.airline.name = airline; save(); }
  closeModal();
  showMsg('Witaj, '+name+'!');
}

function logoutPlayer() {
  if(confirm('Na pewno chcesz sie wylogowac?')) {
    localStorage.removeItem('fm_player');
    closeModal();
    showMsg('Wylogowano!');
  }
}

function confirmReset() {
  if(confirm('Na pewno chcesz zresetowac postepy? Tego nie mozna cofnac!')) {
    localStorage.removeItem('sb_v3');
    localStorage.removeItem('fm_player');
    location.reload();
  }
}

function openSettings() {
  document.getElementById('modal-body').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Ustawienia</div></div>'
    +'<div style="color:#5580a0;font-size:13px;text-align:center;padding:20px;">Wkrotce: dzwiek, powiadomienia, jezyk...</div>';
}

function openMapStyle() {
  var styles = [
    {name:'Standardowa (OSM)', url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'},
    {name:'Ciemna (CartoDB)', url:'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'},
    {name:'Jasna (CartoDB)', url:'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'},
    {name:'Rowerowa (Cycle)', url:'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'},
  ];
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Styl mapy</div></div>';
  styles.forEach(function(s,i) {
    html += '<div onclick="changeMapStyle('+i+')" style="padding:12px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">'
      +'<div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+s.name+'</div>'
      +'<div style="font-size:11px;color:#5580a0;">&#8250;</div></div>';
  });
  document.getElementById('modal-body').innerHTML = html;

  window._mapStyles = styles;
}

function changeMapStyle(idx) {
  if(!LMAP || !window._mapStyles) return;
  var style = window._mapStyles[idx];
  LMAP.eachLayer(function(layer) {
    if(layer._url) LMAP.removeLayer(layer);
  });
  L.tileLayer(style.url, {maxZoom:19, subdomains:['a','b','c','d']}).addTo(LMAP);
  var player = getPlayer();
  if(player) { player.mapStyle = style.name; savePlayer(player); }
  closeModal();
  showMsg('Zmieniono styl mapy: '+style.name);
}

function openAlliance() {
  document.getElementById('modal-body').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Sojusz</div></div>'
    +'<div style="color:#5580a0;font-size:13px;text-align:center;padding:20px;">Sojusze - wkrotce!<br><br>Dolacz do grupy graczy,<br>wspolnie rozwijajcie siec tras.</div>';
}

function openRanking() {
  document.getElementById('modal-body').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Ranking</div></div>'
    +'<div style="background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.15);border-radius:12px;padding:14px;margin-bottom:12px;">'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:4px;">TWOJ WYNIK</div>'
    +'<div style="font-size:20px;font-weight:900;color:#f5a623;">'+G.points+' PKT</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">Poziom '+G.level+' &bull; '+G.totalFlights+' lotow</div>'
    +'</div>'
    +'<div style="color:#5580a0;font-size:12px;text-align:center;padding:10px;">Ranking globalny - wkrotce!<br>Porownaj sie z graczami z calego swiata.</div>';
}

function openRewards() {
  var rewards = [
    {name:'Pierwszy lot', desc:'Wykonaj pierwszy lot', pts:100, done: G.totalFlights>=1},
    {name:'10 lotow', desc:'Wykonaj 10 lotow', pts:500, done: G.totalFlights>=10},
    {name:'Milioner', desc:'Zgromadz $1,000,000', pts:1000, done: G.cash>=1000000},
    {name:'Rozbudowa', desc:'Ulepsz pas startowy', pts:200, done: G.homeAirport&&G.homeAirport.upgrades&&G.homeAirport.upgrades.runways>1},
    {name:'Flota x5', desc:'Posiadaj 5 samolotow', pts:750, done: G.fleet.length>=5},
  ];
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Nagrody</div></div>';
  rewards.forEach(function(r) {
    html += '<div style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:10px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);margin-bottom:8px;">'
      +'<div style="font-size:22px;">'+(r.done?'&#9989;':'&#9744;')+'</div>'
      +'<div style="flex:1;">'
      +'<div style="font-size:13px;font-weight:600;color:'+(r.done?'#00e676':'#e0f0ff')+';">'+r.name+'</div>'
      +'<div style="font-size:11px;color:#5580a0;">'+r.desc+'</div>'
      +'</div>'
      +'<div style="font-size:12px;font-weight:700;color:#f5a623;">+'+r.pts+' PKT</div>'
      +'</div>';
  });
  document.getElementById('modal-body').innerHTML = html;
}

function closeModal(){ document.getElementById("modal").style.display="none"; }
