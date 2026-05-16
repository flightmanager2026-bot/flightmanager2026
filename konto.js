/* -- KONTO -- */

/* Simple local auth system */
function getPlayer() {
  try { return JSON.parse(localStorage.getItem('fm_player') || 'null'); } catch(e) { return null; }
}
function savePlayer(p) { localStorage.setItem('fm_player', JSON.stringify(p)); }

function openAccount() {
  // Jeśli zalogowany przez Firebase - pokaż panel konta
  if(typeof _currentUser !== 'undefined' && _currentUser) {
    var player = {
      name: _currentUser.displayName || _currentUser.email || 'Gracz',
      email: _currentUser.email,
      airline: G.airline ? G.airline.name : 'VIS Airlines'
    };
    renderAccountPanel(player);
    return;
  }
  // Fallback - stary system
  var player = getPlayer();
  if(!player) { openLogin(); return; }
  renderAccountPanel(player);
}

function renderAccountPanel(player) {
  var email = _currentUser ? (_currentUser.email||'') : (player.email||'');
  var displayName = G.airline ? G.airline.name : (player.name||'Pilot');
  var code = G.airline ? G.airline.iata : '??';
  var level = G.level||1;
  var flights = G.totalFlights||0;
  var cash = G.cash||0;
  var fleetSize = G.fleet.length;
  var fleetVal = typeof getFleetValue==='function' ? getFleetValue() : 0;

  var html =
    // Header
    '<div style="background:linear-gradient(135deg,rgba(0,212,255,0.1),rgba(26,86,219,0.1));border:1px solid rgba(0,212,255,0.2);border-radius:16px;padding:16px;margin-bottom:14px;">'
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">'
    +'<div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#1a56db,#00d4ff);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">✈</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:16px;font-weight:900;color:#fff;">'+displayName+'</div>'
    +'<div style="font-size:11px;color:rgba(0,212,255,0.7);font-weight:700;letter-spacing:2px;">'+code+' &bull; LVL '+level+'</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'+email+'</div>'
    +'</div></div>'
    // Stats grid
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">'
    +'<div style="text-align:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:10px;">'
    +'<div style="font-size:18px;font-weight:900;color:#00e676;">$'+Math.round(cash/1000)+'K</div>'
    +'<div style="font-size:9px;color:#5580a0;letter-spacing:1px;">SALDO</div></div>'
    +'<div style="text-align:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:10px;">'
    +'<div style="font-size:18px;font-weight:900;color:#00d4ff;">'+fleetSize+'</div>'
    +'<div style="font-size:9px;color:#5580a0;letter-spacing:1px;">SAMOLOTÓW</div></div>'
    +'<div style="text-align:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:10px;">'
    +'<div style="font-size:18px;font-weight:900;color:#f5a623;">'+flights+'</div>'
    +'<div style="font-size:9px;color:#5580a0;letter-spacing:1px;">LOTÓW</div></div>'
    +'</div></div>'

    // Actions
    +'<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin-bottom:10px;">OPCJE KONTA</div>'

    // Top up
    +'<div onclick="openTopUp()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;'
    +'background:linear-gradient(135deg,rgba(0,230,118,0.08),rgba(0,230,118,0.03));border:1px solid rgba(0,230,118,0.2);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(0,230,118,0.15);display:flex;align-items:center;justify-content:center;font-size:18px;">💳</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#00e676;">Doładuj konto</div>'
    +'<div style="font-size:11px;color:#5580a0;">Kup walutę gry i PKT</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">›</div></div>'

    // Map style
    +'<div onclick="openMapStyle()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;'
    +'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:18px;">🗺️</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#e0f0ff;">Styl mapy</div>'
    +'<div style="font-size:11px;color:#5580a0;">Zmień wygląd mapy</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">›</div></div>'
    // Settings
    +'<div onclick="openSettings()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;'
    +'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:18px;">⚙️</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#e0f0ff;">Ustawienia</div>'
    +'<div style="font-size:11px;color:#5580a0;">Dźwięk, powiadomienia</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">›</div></div>'
    +'<div onclick="G.tutorialDone=false;closeModal();if(typeof startTutorial!==\'undefined\')startTutorial();" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;'
    +'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(0,212,255,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;">📖</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#e0f0ff;">Samouczek</div>'
    +'<div style="font-size:11px;color:#5580a0;">Uruchom samouczek ponownie</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">›</div></div>'

    // Reset
    +'<div onclick="confirmReset()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;'
    +'background:rgba(230,57,70,0.05);border:1px solid rgba(230,57,70,0.15);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(230,57,70,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;">🔄</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#e63946;">Zresetuj postępy</div>'
    +'<div style="font-size:11px;color:#5580a0;">Usuń zapis gry i zacznij od nowa</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">›</div></div>'

    // Logout
    +'<button onclick="logoutPlayer()" style="width:100%;padding:13px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);'
    +'border-radius:12px;color:#5580a0;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-top:4px;">Wyloguj się</button>';

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
    closeModal();
    if(typeof _fbAuth !== 'undefined' && _fbAuth) {
      _fbAuth.signOut().then(function(){ location.reload(); });
    } else {
      localStorage.removeItem('sb_v3');
      location.reload();
    }
  }
}

function confirmReset() {
  if(confirm('Na pewno chcesz zresetowac postepy? Tego nie mozna cofnac!')) {
    // Wyczysc lokalne dane
    localStorage.removeItem('sb_v3');
    localStorage.removeItem('fm_player');
    // Wyczysc dane Firebase
    if(typeof _fbDb !== 'undefined' && _fbDb && typeof _currentUser !== 'undefined' && _currentUser) {
      _fbDb.collection('players').doc(_currentUser.uid).delete().then(function(){
        // Reset stanu gry
        G.cash=500000; G.fleet=[]; G.routes=[]; G.slots=[]; G.airports=[];
        G.homeAirport=null; G.points=0; G.level=1; G.totalFlights=0;
        G.departurelog=[]; G.lastShopPayout=0;
        G.airline={name:'',iata:'',color:'#00d4ff'};
        // Zamknij modal i pokaz setup
        document.getElementById('modal').style.display='none';
        // Usun mape jesli jest
        if(typeof LMAP !== 'undefined' && LMAP) { LMAP.remove(); window.LMAP=null; }
        showSetupScreen();
      }).catch(function(){ location.reload(); });
    } else {
      G.cash=500000; G.fleet=[]; G.routes=[]; G.slots=[]; G.airports=[];
      G.homeAirport=null; G.points=0; G.level=1; G.totalFlights=0;
      G.airline={name:'',iata:'',color:'#00d4ff'};
      document.getElementById('modal').style.display='none';
      if(typeof LMAP !== 'undefined' && LMAP) { LMAP.remove(); window.LMAP=null; }
      showSetupScreen();
    }
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
  L.tileLayer(style.url, {maxZoom:19, subdomains:['a','b','c']}).addTo(LMAP);
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

function openTopUp() {
  document.getElementById('modal-body').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;padding:0;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Doładuj konto</div></div>'

    +'<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin-bottom:10px;">WALUTA GRY ($)</div>'

    +makeTopUpCard('💵','$100,000','4,99 zł','addCash(100000,499)','rgba(0,230,118,0.08)','rgba(0,230,118,0.2)','#00e676')
    +makeTopUpCard('💰','$500,000','19,99 zł','addCash(500000,1999)','rgba(0,230,118,0.1)','rgba(0,230,118,0.25)','#00e676')
    +makeTopUpCard('🏦','$2,000,000 <span style="font-size:10px;color:#f5a623;">BESTSELLER</span>','49,99 zł','addCash(2000000,4999)','rgba(245,166,35,0.08)','rgba(245,166,35,0.25)','#f5a623')

    +'<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin:14px 0 10px;">PUNKTY (PKT ⭐)</div>'

    +makeTopUpCard('⭐','500 PKT','2,99 zł','addPoints(500,299)','rgba(168,139,250,0.08)','rgba(168,139,250,0.2)','#a78bfa')
    +makeTopUpCard('🌟','2,000 PKT','9,99 zł','addPoints(2000,999)','rgba(168,139,250,0.1)','rgba(168,139,250,0.25)','#a78bfa')
    +makeTopUpCard('💫','10,000 PKT <span style="font-size:10px;color:#f5a623;">NAJLEPSZA WARTOŚĆ</span>','29,99 zł','addPoints(10000,2999)','rgba(245,166,35,0.08)','rgba(245,166,35,0.25)','#f5a623')

    +'<div style="margin-top:14px;padding:10px;background:rgba(255,255,255,0.03);border-radius:10px;font-size:10px;color:#5580a0;text-align:center;">'
    +'Płatności wkrótce dostępne. Teraz w trybie demonstracyjnym.</div>';

  document.getElementById('modal').style.display='flex';
}

function makeTopUpCard(icon, label, price, action, bg, border, color) {
  return '<div onclick="'+action+'" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;cursor:pointer;'
    +'background:'+bg+';border:1px solid '+border+';margin-bottom:8px;">'
    +'<div style="font-size:24px;flex-shrink:0;">'+icon+'</div>'
    +'<div style="flex:1;"><div style="font-size:13px;font-weight:700;color:'+color+';">'+label+'</div></div>'
    +'<div style="padding:6px 14px;background:'+border+';border-radius:8px;font-size:12px;font-weight:700;color:'+color+';white-space:nowrap;">'+price+'</div>'
    +'</div>';
}

function addCash(amount, priceCents) {
  // Demo mode - just add cash
  G.cash += amount;
  save(); updateHUD();
  showMsg('✓ Dodano $'+amount.toLocaleString()+' (tryb demo)');
  closeModal();
}

function addPoints(amount, priceCents) {
  G.points = (G.points||0) + amount;
  save(); updateHUD();
  showMsg('✓ Dodano '+amount+' PKT (tryb demo)');
  closeModal();
}
