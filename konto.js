/* -- KONTO -- */

function getPlayer() {
  try { return JSON.parse(localStorage.getItem('fm_player') || 'null'); } catch(e) { return null; }
}
function savePlayer(p) { localStorage.setItem('fm_player', JSON.stringify(p)); }

function openAccount() {
  if(typeof _currentUser !== 'undefined' && _currentUser) {
    var player = {
      name: _currentUser.displayName || _currentUser.email || 'Gracz',
      email: _currentUser.email,
      airline: G.airline ? G.airline.name : 'VIS Airlines'
    };
    renderAccountPanel(player);
    return;
  }
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
    '<div style="background:linear-gradient(135deg,rgba(6,182,212,0.1),rgba(139,92,246,0.1));border:1px solid rgba(6,182,212,0.2);border-radius:16px;padding:16px;margin-bottom:14px;">'
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">'
    +'<div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#ec4899);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">&#9992;</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:16px;font-weight:900;color:#fff;">'+displayName+'</div>'
    +'<div style="font-size:11px;color:rgba(6,182,212,0.7);font-weight:700;letter-spacing:2px;">'+code+' &bull; LVL '+level+'</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:2px;">'+email+'</div>'
    +'</div></div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">'
    +'<div style="text-align:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:10px;">'
    +'<div style="font-size:18px;font-weight:900;color:#10b981;">$'+Math.round(cash/1000)+'K</div>'
    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:1px;">SALDO</div></div>'
    +'<div style="text-align:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:10px;">'
    +'<div style="font-size:18px;font-weight:900;color:#06b6d4;">'+fleetSize+'</div>'
    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:1px;">SAMOLOTOW</div></div>'
    +'<div style="text-align:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:10px;">'
    +'<div style="font-size:18px;font-weight:900;color:#f97316;">'+flights+'</div>'
    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:1px;">LOTOW</div></div>'
    +'</div></div>'

    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:3px;margin-bottom:10px;">OPCJE KONTA</div>'

    +'<div onclick="openMapStyle()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:18px;">&#128506;</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#f1f5f9;">Styl mapy</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Zmien wyglad mapy</div></div>'
    +'<div style="margin-left:auto;color:#94a3b8;">&#8250;</div></div>'

    +'<div onclick="openSettings()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:18px;">&#9881;</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#f1f5f9;">Ustawienia</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Dzwiek, powiadomienia</div></div>'
    +'<div style="margin-left:auto;color:#94a3b8;">&#8250;</div></div>'

    +'<div onclick="G.tutorialDone=false;closeModal();if(typeof startTutorial!==\'undefined\')startTutorial();" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(6,182,212,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;">&#128214;</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#f1f5f9;">Samouczek</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Uruchom samouczek ponownie</div></div>'
    +'<div style="margin-left:auto;color:#94a3b8;">&#8250;</div></div>'

    +'<div onclick="confirmReset()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.15);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(239,68,68,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;">&#128260;</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#ef4444;">Zresetuj postepy</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Usun zapis gry i zacznij od nowa</div></div>'
    +'<div style="margin-left:auto;color:#94a3b8;">&#8250;</div></div>'

    +'<button onclick="logoutPlayer()" style="width:100%;padding:13px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#94a3b8;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-top:4px;">Wyloguj sie</button>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function openSettings() {
  var savedVol = parseFloat(localStorage.getItem('fm_music_vol') || '0.10');
  var savedMuted = localStorage.getItem('fm_music_muted') === 'true';
  var volPct = Math.round(savedVol * 100);

  document.getElementById('modal-body').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#06b6d4;">Ustawienia</div></div>'

    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:3px;margin-bottom:10px;">DZWIEK</div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:8px;">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">'
    +'<div>'
    +'<div style="font-size:13px;font-weight:700;color:#f1f5f9;">&#127925; Muzyka w tle</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Chopin - Nokturn op.9</div>'
    +'</div>'
    +'<button id="settings-music-toggle" onclick="settingsToggleMusic()" style="padding:6px 14px;background:'
    +(savedMuted?'rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;':'rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);color:#06b6d4;')
    +'border-radius:8px;cursor:pointer;font-size:12px;font-weight:700;font-family:Arial,sans-serif;">'
    +(savedMuted?'&#128264; Wyl.':'&#127925; Wl.')+'</button>'
    +'</div>'
    +'<div style="display:flex;align-items:center;gap:10px;">'
    +'<span style="font-size:12px;color:#94a3b8;">&#128264;</span>'
    +'<input type="range" id="settings-music-vol" min="0" max="100" value="'+volPct+'" '
    +'oninput="settingsSetVol(this.value)" style="flex:1;accent-color:#06b6d4;cursor:pointer;">'
    +'<span id="settings-vol-label" style="font-size:12px;color:#06b6d4;font-weight:700;min-width:35px;text-align:right;">'+volPct+'%</span>'
    +'<span style="font-size:12px;color:#94a3b8;">&#128266;</span>'
    +'</div>'
    +'</div>'

    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:3px;margin-bottom:10px;margin-top:14px;">POWIADOMIENIA</div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:8px;">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;">'
    +'<div><div style="font-size:13px;font-weight:700;color:#f1f5f9;">&#128276; Ladowanie</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Powiadom gdy samolot wyladuje</div></div>'
    +'<div style="padding:6px 14px;background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);border-radius:8px;font-size:12px;font-weight:700;color:#06b6d4;">Wl.</div>'
    +'</div></div>'

    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;">'
    +'<div><div style="font-size:13px;font-weight:700;color:#f1f5f9;">&#9881; Awarie</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Powiadom o awariach samolotow</div></div>'
    +'<div style="padding:6px 14px;background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);border-radius:8px;font-size:12px;font-weight:700;color:#06b6d4;">Wl.</div>'
    +'</div></div>';

  document.getElementById('modal').style.display = 'flex';
}

function settingsToggleMusic() {
  var bg = document.getElementById('bgMusic');
  if(!bg) return;
  var btn = document.getElementById('settings-music-toggle');
  var mb = document.getElementById('music-btn');
  if(window._musicPlaying) {
    bg.pause();
    window._musicPlaying = false;
    localStorage.setItem('fm_music_muted','true');
    if(btn){btn.textContent='&#128264; Wyl.';btn.style.color='#94a3b8';btn.style.background='rgba(255,255,255,0.05)';btn.style.borderColor='rgba(255,255,255,0.1)';}
    if(mb) mb.textContent='&#128264;';
  } else {
    bg.play().then(function(){
      window._musicPlaying=true;
      localStorage.setItem('fm_music_muted','false');
      if(btn){btn.textContent='&#127925; Wl.';btn.style.color='#06b6d4';btn.style.background='rgba(6,182,212,0.15)';btn.style.borderColor='rgba(6,182,212,0.3)';}
      if(mb) mb.textContent='&#127925;';
    }).catch(function(){});
  }
}

function settingsSetVol(val) {
  var bg = document.getElementById('bgMusic');
  var v = parseInt(val)/100;
  if(bg) bg.volume = v;
  localStorage.setItem('fm_music_vol', String(v));
  var lbl = document.getElementById('settings-vol-label');
  if(lbl) lbl.textContent = val+'%';
  var slider = document.getElementById('music-vol');
  if(slider) slider.value = val;
  var mb = document.getElementById('music-btn');
  if(mb) mb.textContent = parseInt(val)===0?'&#128264;':(window._musicPlaying?'&#127925;':'&#128264;');
}

function openLogin() {
  document.getElementById('modal-body').innerHTML =
    '<div style="font-size:18px;font-weight:900;color:#06b6d4;text-align:center;margin-bottom:4px;">FLIGHT</div>'
    +'<div style="font-size:18px;font-weight:900;color:#fff;text-align:center;margin-bottom:20px;">MANAGER 2026</div>'
    +'<div style="font-size:10px;color:#94a3b8;letter-spacing:2px;margin-bottom:8px;">NAZWA GRACZA</div>'
    +'<input id="login-name" type="text" placeholder="Twoje imie..." maxlength="20" style="width:100%;background:#0f0f1a;border:1px solid rgba(6,182,212,0.3);border-radius:8px;padding:11px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:10px;outline:none;box-sizing:border-box;">'
    +'<div style="font-size:10px;color:#94a3b8;letter-spacing:2px;margin-bottom:8px;">NAZWA LINII LOTNICZEJ</div>'
    +'<input id="login-airline" type="text" placeholder="Nazwa linii..." maxlength="30" style="width:100%;background:#0f0f1a;border:1px solid rgba(6,182,212,0.3);border-radius:8px;padding:11px;color:#fff;font-size:14px;font-family:Arial,sans-serif;margin-bottom:16px;outline:none;box-sizing:border-box;">'
    +'<button onclick="registerPlayer()" style="width:100%;padding:13px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;border-radius:10px;color:#fff;font-size:15px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zarejestruj i graj</button>'
    +'<button onclick="closeModal()" style="width:100%;padding:10px;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#94a3b8;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-top:8px;">Anuluj</button>';
  document.getElementById('modal').style.display = 'flex';
}

function registerPlayer() {
  var name = (document.getElementById('login-name').value||'').trim();
  var airline = (document.getElementById('login-airline').value||'').trim();
  if(!name){ showMsg('Podaj nazwe gracza!'); return; }
  if(!airline){ showMsg('Podaj nazwe linii!'); return; }
  var player = {name:name,airline:airline,joined:new Date().toLocaleDateString('pl-PL'),alliance:null,mapStyle:'standard'};
  savePlayer(player);
  if(G.airline){G.airline.name=airline;save();}
  closeModal();
  showMsg('Witaj, '+name+'!');
}

function logoutPlayer() {
  if(confirm('Na pewno chcesz sie wylogowac?')) {
    closeModal();
    if(typeof _fbAuth!=='undefined'&&_fbAuth){
      _fbAuth.signOut().then(function(){location.reload();});
    } else {
      localStorage.removeItem('sb_v3');
      location.reload();
    }
  }
}

function confirmReset() {
  if(confirm('Na pewno chcesz zresetowac postepy? Tego nie mozna cofnac!')) {
    localStorage.removeItem('sb_v3');
    localStorage.removeItem('fm_player');
    if(typeof _fbDb!=='undefined'&&_fbDb&&typeof _currentUser!=='undefined'&&_currentUser){
      _fbDb.collection('players').doc(_currentUser.uid).delete().then(function(){
        G.cash=500000;G.fleet=[];G.routes=[];G.slots=[];G.airports=[];
        G.homeAirport=null;G.points=0;G.level=1;G.totalFlights=0;
        G.departurelog=[];G.lastShopPayout=0;
        G.airline={name:'',iata:'',color:'#06b6d4'};
        document.getElementById('modal').style.display='none';
        if(typeof LMAP!=='undefined'&&LMAP){LMAP.remove();window.LMAP=null;}
        showSetupScreen();
      }).catch(function(){location.reload();});
    } else {
      G.cash=500000;G.fleet=[];G.routes=[];G.slots=[];G.airports=[];
      G.homeAirport=null;G.points=0;G.level=1;G.totalFlights=0;
      G.airline={name:'',iata:'',color:'#06b6d4'};
      document.getElementById('modal').style.display='none';
      if(typeof LMAP!=='undefined'&&LMAP){LMAP.remove();window.LMAP=null;}
      showSetupScreen();
    }
  }
}

function openMapStyle() {
  var styles = [
    {name:'Standardowa (OSM)',url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'},
    {name:'Ciemna (CartoDB)',url:'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'},
    {name:'Jasna (CartoDB)',url:'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'},
    {name:'Rowerowa (Cycle)',url:'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'},
  ];
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#06b6d4;">Styl mapy</div></div>';
  styles.forEach(function(s,i){
    html+='<div onclick="changeMapStyle('+i+')" style="padding:12px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">'
      +'<div style="font-size:13px;font-weight:600;color:#f1f5f9;">'+s.name+'</div>'
      +'<div style="font-size:11px;color:#94a3b8;">&#8250;</div></div>';
  });
  document.getElementById('modal-body').innerHTML = html;
  window._mapStyles = styles;
}

function changeMapStyle(idx) {
  if(!LMAP||!window._mapStyles) return;
  var style = window._mapStyles[idx];
  LMAP.eachLayer(function(layer){if(layer._url) LMAP.removeLayer(layer);});
  L.tileLayer(style.url,{maxZoom:19,subdomains:['a','b','c']}).addTo(LMAP);
  closeModal();
  showMsg('Zmieniono styl mapy: '+style.name);
}

function closeModal(){ document.getElementById("modal").style.display="none"; }

/* ---- STRIPE / TOPUP ---- */
var STRIPE_PUBLISHABLE_KEY = 'pk_live_51TAoPjJpSjRIQcXxCJUCG9DUZj4VGRkj6xAYVdy25O7xl4qN0cFmLe16Hr88ZdOoB8oLyRFtMtvEwvcu3jxXEQaD004R9IlEeS';
var STRIPE_FUNCTIONS_URL = 'https://us-central1-flightmanager2026-9fc57.cloudfunctions.net';

var TOPUP_PACKAGES = [
  {id:'cash_50k',  type:'cash',  icon:'&#128181;',label:'$50 000',   badge:'',          amount:50000,    pricePLN:'1,99 zl',  color:'#10b981',bg:'rgba(16,185,129,0.07)',border:'rgba(16,185,129,0.18)'},
  {id:'cash_200k', type:'cash',  icon:'&#128176;',label:'$200 000',  badge:'',          amount:200000,   pricePLN:'4,99 zl',  color:'#10b981',bg:'rgba(16,185,129,0.08)',border:'rgba(16,185,129,0.22)'},
  {id:'cash_500k', type:'cash',  icon:'&#128179;',label:'$500 000',  badge:'POPULARNY', amount:500000,   pricePLN:'9,99 zl',  color:'#06b6d4',bg:'rgba(6,182,212,0.07)',border:'rgba(6,182,212,0.2)'},
  {id:'cash_2m',   type:'cash',  icon:'&#127974;',label:'$2 000 000',badge:'BESTSELLER',amount:2000000,  pricePLN:'24,99 zl', color:'#f97316',bg:'rgba(249,115,22,0.07)',border:'rgba(249,115,22,0.22)'},
  {id:'cash_5m',   type:'cash',  icon:'&#127963;',label:'$5 000 000',badge:'VIP',       amount:5000000,  pricePLN:'49,99 zl', color:'#f97316',bg:'rgba(249,115,22,0.09)',border:'rgba(249,115,22,0.28)'},
  {id:'cash_15m',  type:'cash',  icon:'&#128142;',label:'$15 000 000',badge:'PREMIUM',  amount:15000000, pricePLN:'99,99 zl', color:'#8b5cf6',bg:'rgba(139,92,246,0.07)',border:'rgba(139,92,246,0.22)'},
  {id:'cash_50m',  type:'cash',  icon:'&#128640;',label:'$50 000 000',badge:'MEGA',     amount:50000000, pricePLN:'249,99 zl',color:'#ffd700',bg:'rgba(255,215,0,0.06)',border:'rgba(255,215,0,0.2)'},
  {id:'pts_200',   type:'points',icon:'&#11088;', label:'200 PKT',   badge:'',          amount:200,      pricePLN:'0,99 zl',  color:'#8b5cf6',bg:'rgba(139,92,246,0.06)',border:'rgba(139,92,246,0.16)'},
  {id:'pts_1000',  type:'points',icon:'&#127775;',label:'1 000 PKT', badge:'',          amount:1000,     pricePLN:'3,99 zl',  color:'#8b5cf6',bg:'rgba(139,92,246,0.07)',border:'rgba(139,92,246,0.2)'},
  {id:'pts_5000',  type:'points',icon:'&#128171;',label:'5 000 PKT', badge:'POPULARNY', amount:5000,     pricePLN:'14,99 zl', color:'#f97316',bg:'rgba(249,115,22,0.07)',border:'rgba(249,115,22,0.22)'},
  {id:'pts_15000', type:'points',icon:'&#128302;',label:'15 000 PKT',badge:'BESTSELLER',amount:15000,    pricePLN:'34,99 zl', color:'#f97316',bg:'rgba(249,115,22,0.09)',border:'rgba(249,115,22,0.28)'},
  {id:'pts_50000', type:'points',icon:'&#128081;',label:'50 000 PKT',badge:'TOP WARTOSC',amount:50000,   pricePLN:'79,99 zl', color:'#ffd700',bg:'rgba(255,215,0,0.06)',border:'rgba(255,215,0,0.2)'},
  {id:'pack_start',type:'combo', icon:'&#127873;',label:'Pakiet Startowy',badge:'$500K + 500 PKT',  cash:500000, pts:500,   pricePLN:'12,99 zl', color:'#06b6d4',bg:'rgba(6,182,212,0.07)',border:'rgba(6,182,212,0.22)'},
  {id:'pack_pro',  type:'combo', icon:'&#9992;',  label:'Pakiet Pro',     badge:'$3M + 3 000 PKT',  cash:3000000,pts:3000,  pricePLN:'59,99 zl', color:'#8b5cf6',bg:'rgba(139,92,246,0.08)',border:'rgba(139,92,246,0.25)'},
  {id:'pack_elite',type:'combo', icon:'&#128745;',label:'Pakiet Elite',   badge:'$15M + 15 000 PKT',cash:15000000,pts:15000,pricePLN:'149,99 zl',color:'#ffd700',bg:'rgba(255,215,0,0.07)',border:'rgba(255,215,0,0.22)'}
];

function openTopUp() {
  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="openShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#f1f5f9;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;font-family:Arial,sans-serif;">&#8592;</button>'
    +'<div style="flex:1;"><div style="font-size:15px;font-weight:800;color:#f1f5f9;">Doladuj konto</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:1px;">Saldo: <span style="color:#10b981;font-weight:700;">$'+Math.round(G.cash).toLocaleString()+'</span> &bull; <span style="color:#8b5cf6;font-weight:700;">'+(G.points||0)+' PKT</span></div></div>'
    +'<div style="padding:3px 8px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:20px;font-size:9px;color:#10b981;font-weight:700;">&#128274; Stripe</div>'
    +'</div>';
  var activeTab = window._topupTab || 'cash';
  html += '<div style="display:flex;gap:5px;margin-bottom:14px;">'
    +['cash','points','combo'].map(function(t){
      var labels={cash:'&#128181; Gotowka',points:'&#11088; Punkty',combo:'&#127873; Paczki'};
      var active=t===activeTab;
      return '<button onclick="window._topupTab=\''+t+'\';openTopUp()" style="flex:1;padding:8px 4px;font-size:11px;font-weight:700;border-radius:9px;cursor:pointer;font-family:Arial,sans-serif;'
        +(active?'background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;color:#fff;':'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#94a3b8;')+'">'+labels[t]+'</button>';
    }).join('')+'</div>';
  TOPUP_PACKAGES.filter(function(p){return p.type===activeTab;}).forEach(function(pkg){
    var badgeHtml=pkg.badge?'<span style="font-size:9px;font-weight:700;padding:1px 7px;background:rgba(255,215,0,0.15);color:#ffd700;border-radius:20px;margin-left:6px;">'+pkg.badge+'</span>':'';
    html+='<div onclick="purchasePackage(\''+pkg.id+'\')" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:13px;cursor:pointer;background:'+pkg.bg+';border:1px solid '+pkg.border+';margin-bottom:8px;">'
      +'<div style="font-size:26px;flex-shrink:0;">'+pkg.icon+'</div>'
      +'<div style="flex:1;"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;"><span style="font-size:13px;font-weight:800;color:'+pkg.color+';">'+pkg.label+'</span>'+badgeHtml+'</div></div>'
      +'<div style="padding:7px 14px;background:'+pkg.border+';border-radius:9px;font-size:12px;font-weight:800;color:'+pkg.color+';white-space:nowrap;flex-shrink:0;">'+pkg.pricePLN+'</div></div>';
  });
  html+='<div style="margin-top:10px;padding:10px 12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;font-size:10px;color:#94a3b8;text-align:center;">&#128274; Bezpieczna platnosc przez Stripe &bull; Karta &bull; BLIK &bull; Przelewy24</div>';
  document.getElementById('modal-body').innerHTML=html;
  document.getElementById('modal').style.display='flex';
}

function purchasePackage(packageId) {
  var pkg=null;
  TOPUP_PACKAGES.forEach(function(p){if(p.id===packageId)pkg=p;});
  if(!pkg) return;
  startStripeCheckout(pkg);
}

function startStripeCheckout(pkg) {
  if(!_currentUser){showMsg('Zaloguj sie, aby dokonac zakupu!');return;}
  var modal=document.getElementById('modal-body');
  if(modal) modal.innerHTML='<div style="padding:40px;text-align:center;color:#94a3b8;">&#128274; Laczenie ze Stripe...</div>';
  _currentUser.getIdToken().then(function(token){
    return fetch(STRIPE_FUNCTIONS_URL+'/createCheckoutSession',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
      body:JSON.stringify({packageId:pkg.id})
    });
  })
  .then(function(r){return r.json();})
  .then(function(data){
    if(data.url){window.location.href=data.url;}
    else{throw new Error(data.error||'Brak URL sesji');}
  })
  .catch(function(e){showMsg('Blad: '+e.message);openTopUp();});
}

function checkStripeReturn() {
  var params=new URLSearchParams(window.location.search);
  var status=params.get('payment');
  if(status==='success'){
    showMsg('Platnosc zakonczona! Srodki zostana naliczone automatycznie.');
    history.replaceState({},'',window.location.pathname);
  } else if(status==='cancelled'){
    showMsg('Platnosc anulowana.');
    history.replaceState({},'',window.location.pathname);
  }
}
