/* -- KONTO -- */

function getPlayer() {
  try { return JSON.parse(localStorage.getItem('fm_player') || 'null'); } catch(e) { return null; }
}
function savePlayer(p) { localStorage.setItem('fm_player', JSON.stringify(p)); }

function openAccount() {
  if(typeof _currentUser !== 'undefined' && _currentUser) {
    var player = { name: _currentUser.displayName || _currentUser.email || 'Gracz', email: _currentUser.email, airline: G.airline ? G.airline.name : 'VIS Airlines' };
    renderAccountPanel(player); return;
  }
  var player = getPlayer();
  if(!player) { openLogin(); return; }
  renderAccountPanel(player);
}

function renderAccountPanel(player) {
  var email = _currentUser ? (_currentUser.email||'') : (player.email||'');
  var displayName = G.airline ? G.airline.name : (player.name||'Pilot');
  var code = G.airline ? G.airline.iata : '??';
  var level = G.level||1, flights = G.totalFlights||0, cash = G.cash||0, fleetSize = G.fleet.length;
  var html =
    '<div style="background:linear-gradient(135deg,rgba(0,212,255,0.1),rgba(26,86,219,0.1));border:1px solid rgba(0,212,255,0.2);border-radius:16px;padding:16px;margin-bottom:14px;">'
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">'
    +'<div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#1a56db,#00d4ff);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">✈</div>'
    +'<div style="flex:1;"><div style="font-size:16px;font-weight:900;color:#fff;">'+displayName+'</div>'
    +'<div style="font-size:11px;color:rgba(0,212,255,0.7);font-weight:700;letter-spacing:2px;">'+code+' &bull; LVL '+level+'</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'+email+'</div></div></div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">'
    +'<div style="text-align:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:10px;"><div style="font-size:18px;font-weight:900;color:#00e676;">$'+Math.round(cash/1000)+'K</div><div style="font-size:9px;color:#5580a0;letter-spacing:1px;">SALDO</div></div>'
    +'<div style="text-align:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:10px;"><div style="font-size:18px;font-weight:900;color:#00d4ff;">'+fleetSize+'</div><div style="font-size:9px;color:#5580a0;letter-spacing:1px;">SAMOLOTÓW</div></div>'
    +'<div style="text-align:center;padding:8px;background:rgba(0,0,0,0.2);border-radius:10px;"><div style="font-size:18px;font-weight:900;color:#f5a623;">'+flights+'</div><div style="font-size:9px;color:#5580a0;letter-spacing:1px;">LOTÓW</div></div>'
    +'</div></div>'
    +'<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin-bottom:10px;">OPCJE KONTA</div>'
    +'<div onclick="openMapStyle()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:18px;">🗺️</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#e0f0ff;">Styl mapy</div><div style="font-size:11px;color:#5580a0;">Zmień wygląd mapy</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">›</div></div>'
    +'<div onclick="openSettings()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:18px;">⚙️</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#e0f0ff;">Ustawienia</div><div style="font-size:11px;color:#5580a0;">Dźwięk, powiadomienia</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">›</div></div>'
    +'<div onclick="G.tutorialDone=false;closeModal();if(typeof startTutorial!==\'undefined\')startTutorial();" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(0,212,255,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;">📖</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#e0f0ff;">Samouczek</div><div style="font-size:11px;color:#5580a0;">Uruchom samouczek ponownie</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">›</div></div>'
    +'<div onclick="confirmReset()" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;cursor:pointer;background:rgba(230,57,70,0.05);border:1px solid rgba(230,57,70,0.15);margin-bottom:8px;">'
    +'<div style="width:36px;height:36px;border-radius:10px;background:rgba(230,57,70,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;">🔄</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#e63946;">Zresetuj postępy</div><div style="font-size:11px;color:#5580a0;">Usuń zapis gry i zacznij od nowa</div></div>'
    +'<div style="margin-left:auto;color:#5580a0;">›</div></div>'
    +'<button onclick="logoutPlayer()" style="width:100%;padding:13px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#5580a0;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-top:4px;">Wyloguj się</button>';
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
  var player = { name: name, airline: airline, joined: now.toLocaleDateString('pl-PL'), alliance: null, mapStyle: 'standard' };
  savePlayer(player);
  if(G.airline) { G.airline.name = airline; save(); }
  closeModal(); showMsg('Witaj, '+name+'!');
}

function logoutPlayer() {
  if(confirm('Na pewno chcesz sie wylogowac?')) {
    closeModal();
    if(typeof _fbAuth !== 'undefined' && _fbAuth) { _fbAuth.signOut().then(function(){ location.reload(); }); }
    else { localStorage.removeItem('sb_v3'); location.reload(); }
  }
}

function confirmReset() {
  if(confirm('Na pewno chcesz zresetowac postepy? Tego nie mozna cofnac!')) {
    localStorage.removeItem('sb_v3'); localStorage.removeItem('fm_player');
    if(typeof _fbDb !== 'undefined' && _fbDb && typeof _currentUser !== 'undefined' && _currentUser) {
      _fbDb.collection('players').doc(_currentUser.uid).delete().then(function(){
        G.cash=500000; G.fleet=[]; G.routes=[]; G.slots=[]; G.airports=[];
        G.homeAirport=null; G.points=0; G.level=1; G.totalFlights=0; G.departurelog=[]; G.lastShopPayout=0;
        G.airline={name:'',iata:'',color:'#00d4ff'};
        document.getElementById('modal').style.display='none';
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
      +'<div style="font-size:13px;font-weight:600;color:#e0f0ff;">'+s.name+'</div><div style="font-size:11px;color:#5580a0;">&#8250;</div></div>';
  });
  document.getElementById('modal-body').innerHTML = html;
  window._mapStyles = styles;
}

function changeMapStyle(idx) {
  if(!LMAP || !window._mapStyles) return;
  var style = window._mapStyles[idx];
  LMAP.eachLayer(function(layer) { if(layer._url) LMAP.removeLayer(layer); });
  L.tileLayer(style.url, {maxZoom:19, subdomains:['a','b','c']}).addTo(LMAP);
  var player = getPlayer();
  if(player) { player.mapStyle = style.name; savePlayer(player); }
  closeModal(); showMsg('Zmieniono styl mapy: '+style.name);
}

function openAlliance() {
  document.getElementById('modal-body').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Sojusz</div></div>'
    +'<div style="color:#5580a0;font-size:13px;text-align:center;padding:20px;">Sojusze - wkrotce!</div>';
}

function openRanking() {
  document.getElementById('modal-body').innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openAccount()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:20px;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Ranking</div></div>'
    +'<div style="background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.15);border-radius:12px;padding:14px;margin-bottom:12px;">'
    +'<div style="font-size:11px;color:#5580a0;margin-bottom:4px;">TWOJ WYNIK</div>'
    +'<div style="font-size:20px;font-weight:900;color:#f5a623;">'+G.points+' PKT</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">Poziom '+G.level+' &bull; '+G.totalFlights+' lotow</div></div>'
    +'<div style="color:#5580a0;font-size:12px;text-align:center;padding:10px;">Ranking globalny - wkrotce!</div>';
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
      +'<div style="font-size:22px;">'+(r.done?'&#9989;':'&#9744;')+'</div><div style="flex:1;">'
      +'<div style="font-size:13px;font-weight:600;color:'+(r.done?'#00e676':'#e0f0ff')+';">'+r.name+'</div>'
      +'<div style="font-size:11px;color:#5580a0;">'+r.desc+'</div></div>'
      +'<div style="font-size:12px;font-weight:700;color:#f5a623;">+'+r.pts+' PKT</div></div>';
  });
  document.getElementById('modal-body').innerHTML = html;
}

function closeModal(){ document.getElementById("modal").style.display="none"; }

/* ── STRIPE CONFIG ── */
var STRIPE_PUBLISHABLE_KEY = 'pk_live_51TAoPjJpSjRIQcXxCJUCG9DUZj4VGRkj6xAYVdy25O7xl4qN0cFmLe16Hr88ZdOoB8oLyRFtMtvEwvcu3jxXEQaD004R9IlEeS';
var STRIPE_FUNCTIONS_URL   = 'https://us-central1-flightmanager2026-9fc57.cloudfunctions.net';

var TOPUP_PACKAGES = [
  { id:'cash_50k',   type:'cash',   icon:'💵', label:'$50 000',    badge:'',                  amount:50000,    pricePLN:'1,99 zł',  priceCents:199,  color:'#00e676', bg:'rgba(0,230,118,0.07)', border:'rgba(0,230,118,0.18)' },
  { id:'cash_200k',  type:'cash',   icon:'💰', label:'$200 000',   badge:'',                  amount:200000,   pricePLN:'4,99 zł',  priceCents:499,  color:'#00e676', bg:'rgba(0,230,118,0.08)', border:'rgba(0,230,118,0.22)' },
  { id:'cash_500k',  type:'cash',   icon:'💳', label:'$500 000',   badge:'POPULARNY',         amount:500000,   pricePLN:'9,99 zł',  priceCents:999,  color:'#00d4ff', bg:'rgba(0,212,255,0.07)', border:'rgba(0,212,255,0.2)'  },
  { id:'cash_2m',    type:'cash',   icon:'🏦', label:'$2 000 000', badge:'BESTSELLER',        amount:2000000,  pricePLN:'24,99 zł', priceCents:2499, color:'#f5a623', bg:'rgba(245,166,35,0.07)', border:'rgba(245,166,35,0.22)' },
  { id:'cash_5m',    type:'cash',   icon:'🏛️', label:'$5 000 000', badge:'VIP',               amount:5000000,  pricePLN:'49,99 zł', priceCents:4999, color:'#f5a623', bg:'rgba(245,166,35,0.09)', border:'rgba(245,166,35,0.28)' },
  { id:'cash_15m',   type:'cash',   icon:'💎', label:'$15 000 000',badge:'PREMIUM',           amount:15000000, pricePLN:'99,99 zł', priceCents:9999, color:'#a78bfa', bg:'rgba(168,139,250,0.07)', border:'rgba(168,139,250,0.22)' },
  { id:'cash_50m',   type:'cash',   icon:'🚀', label:'$50 000 000',badge:'MEGA',              amount:50000000, pricePLN:'249,99 zł',priceCents:24999,color:'#ffd700', bg:'rgba(255,215,0,0.06)', border:'rgba(255,215,0,0.2)'  },
  { id:'pts_200',    type:'points', icon:'⭐', label:'200 PKT',    badge:'',                  amount:200,      pricePLN:'0,99 zł',  priceCents:99,   color:'#a78bfa', bg:'rgba(168,139,250,0.06)', border:'rgba(168,139,250,0.16)' },
  { id:'pts_1000',   type:'points', icon:'🌟', label:'1 000 PKT',  badge:'',                  amount:1000,     pricePLN:'3,99 zł',  priceCents:399,  color:'#a78bfa', bg:'rgba(168,139,250,0.07)', border:'rgba(168,139,250,0.2)'  },
  { id:'pts_5000',   type:'points', icon:'💫', label:'5 000 PKT',  badge:'POPULARNY',         amount:5000,     pricePLN:'14,99 zł', priceCents:1499, color:'#f5a623', bg:'rgba(245,166,35,0.07)', border:'rgba(245,166,35,0.22)' },
  { id:'pts_15000',  type:'points', icon:'🔮', label:'15 000 PKT', badge:'BESTSELLER',        amount:15000,    pricePLN:'34,99 zł', priceCents:3499, color:'#f5a623', bg:'rgba(245,166,35,0.09)', border:'rgba(245,166,35,0.28)' },
  { id:'pts_50000',  type:'points', icon:'👑', label:'50 000 PKT', badge:'NAJLEPSZA WARTOŚĆ', amount:50000,    pricePLN:'79,99 zł', priceCents:7999, color:'#ffd700', bg:'rgba(255,215,0,0.06)', border:'rgba(255,215,0,0.2)'  },
  { id:'pack_start', type:'combo',  icon:'🎁', label:'Pakiet Startowy', badge:'$500K + 500 PKT',   cash:500000,  pts:500,   pricePLN:'12,99 zł', priceCents:1299, color:'#00d4ff', bg:'rgba(0,212,255,0.07)', border:'rgba(0,212,255,0.22)' },
  { id:'pack_pro',   type:'combo',  icon:'✈️', label:'Pakiet Pro',      badge:'$3M + 3 000 PKT',   cash:3000000, pts:3000,  pricePLN:'59,99 zł', priceCents:5999, color:'#a78bfa', bg:'rgba(168,139,250,0.08)', border:'rgba(168,139,250,0.25)' },
  { id:'pack_elite', type:'combo',  icon:'🛩️', label:'Pakiet Elite',    badge:'$15M + 15 000 PKT', cash:15000000,pts:15000, pricePLN:'149,99 zł',priceCents:14999,color:'#ffd700', bg:'rgba(255,215,0,0.07)', border:'rgba(255,215,0,0.22)' }
];

function openTopUp() {
  var stripeReady = !!(STRIPE_PUBLISHABLE_KEY && STRIPE_FUNCTIONS_URL);
  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">'
    +'<button onclick="openShop()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#e0f0ff;cursor:pointer;font-size:17px;padding:4px 11px;border-radius:8px;line-height:1.4;font-family:Arial,sans-serif;">&#8592;</button>'
    +'<div style="flex:1;"><div style="font-size:15px;font-weight:800;color:#e0f0ff;">Doładuj konto</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:1px;">Saldo: <span style="color:#00e676;font-weight:700;">$'+Math.round(G.cash).toLocaleString()+'</span> &nbsp;&bull;&nbsp; <span style="color:#a78bfa;font-weight:700;">'+(G.points||0)+' PKT</span></div></div>'
    +(stripeReady ? '<div style="padding:3px 8px;background:rgba(0,230,118,0.1);border:1px solid rgba(0,230,118,0.2);border-radius:20px;font-size:9px;color:#00e676;font-weight:700;">&#128274; Stripe</div>'
                  : '<div style="padding:3px 8px;background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.2);border-radius:20px;font-size:9px;color:#f5a623;font-weight:700;">DEMO</div>')
    +'</div>';
  var activeTab = window._topupTab || 'cash';
  html += '<div style="display:flex;gap:5px;margin-bottom:14px;">'
    +['cash','points','combo'].map(function(t){
      var labels={cash:'💵 Gotówka',points:'⭐ Punkty',combo:'🎁 Paczki'};
      var active = t===activeTab;
      return '<button onclick="window._topupTab=\''+t+'\';openTopUp()" style="flex:1;padding:8px 4px;font-size:11px;font-weight:700;border-radius:9px;cursor:pointer;font-family:Arial,sans-serif;'
        +(active?'background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;color:#fff;':'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#5580a0;')+'">'+labels[t]+'</button>';
    }).join('')+'</div>';
  TOPUP_PACKAGES.filter(function(p){ return p.type===activeTab; }).forEach(function(pkg) {
    var badgeHtml = pkg.badge ? '<span style="font-size:9px;font-weight:700;padding:1px 7px;background:rgba(255,215,0,0.15);color:#ffd700;border-radius:20px;margin-left:6px;">'+pkg.badge+'</span>' : '';
    html += '<div onclick="purchasePackage(\''+pkg.id+'\')" style="display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:13px;cursor:pointer;background:'+pkg.bg+';border:1px solid '+pkg.border+';margin-bottom:8px;" onmouseover="this.style.opacity=\'0.85\'" onmouseout="this.style.opacity=\'1\'">'
      +'<div style="font-size:26px;flex-shrink:0;">'+pkg.icon+'</div>'
      +'<div style="flex:1;min-width:0;"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;"><span style="font-size:13px;font-weight:800;color:'+pkg.color+';">'+pkg.label+'</span>'+badgeHtml+'</div>'
      +(pkg.type==='combo'?'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'+pkg.badge+'</div>':'')+'</div>'
      +'<div style="padding:7px 14px;background:'+pkg.border+';border-radius:9px;font-size:12px;font-weight:800;color:'+pkg.color+';white-space:nowrap;flex-shrink:0;">'+pkg.pricePLN+'</div></div>';
  });
  html += '<div style="margin-top:10px;padding:10px 12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;font-size:10px;color:#5580a0;text-align:center;">'
    +(stripeReady?'&#128274; Bezpieczna płatność przez Stripe &bull; Karta &bull; BLIK &bull; Apple Pay':'Tryb demonstracyjny')+'</div>';
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function purchasePackage(packageId) {
  var pkg = null;
  TOPUP_PACKAGES.forEach(function(p){ if(p.id===packageId) pkg=p; });
  if(!pkg) return;
  if(STRIPE_PUBLISHABLE_KEY && STRIPE_FUNCTIONS_URL) {
    startStripeCheckout(pkg);
  } else {
    if(pkg.type==='cash')   { G.cash += pkg.amount; showMsg('✓ Demo: +$'+pkg.amount.toLocaleString()); }
    if(pkg.type==='points') { G.points=(G.points||0)+pkg.amount; showMsg('✓ Demo: +'+pkg.amount+' PKT'); }
    if(pkg.type==='combo')  { G.cash += pkg.cash; G.points=(G.points||0)+pkg.pts; showMsg('✓ Demo: +$'+pkg.cash.toLocaleString()+' i +'+pkg.pts+' PKT'); }
    save(); updateHUD(); closeModal();
  }
}

function startStripeCheckout(pkg) {
  if(!_currentUser) { showMsg('Zaloguj się, aby dokonać zakupu!'); return; }
  var modal = document.getElementById('modal-body');
  if(modal) modal.innerHTML = '<div style="padding:40px;text-align:center;color:#5580a0;">&#128274; Łączenie ze Stripe...</div>';
  _currentUser.getIdToken().then(function(token) {
    return fetch(STRIPE_FUNCTIONS_URL + '/createCheckoutSession', {
      method: 'POST',
      headers: {'Content-Type':'application/json','Authorization':'Bearer '+token},
      body: JSON.stringify({ packageId: pkg.id })
    });
  })
  .then(function(r){ return r.json(); })
  .then(function(data) {
    if(data.url) { window.location.href = data.url; }
    else { throw new Error(data.error || 'Brak URL sesji'); }
  })
  .catch(function(e) { showMsg('Błąd płatności: '+e.message); openTopUp(); });
}

function addCash(amount) { G.cash += amount; save(); updateHUD(); showMsg('✓ Dodano $'+amount.toLocaleString()); closeModal(); }
function addPoints(amount) { G.points=(G.points||0)+amount; save(); updateHUD(); showMsg('✓ Dodano '+amount+' PKT'); closeModal(); }

function checkStripeReturn() {
  var params = new URLSearchParams(window.location.search);
  var status = params.get('payment');
  if(status === 'success') {
    showMsg('✅ Płatność zakończona! Środki zostaną naliczone automatycznie.');
    history.replaceState({}, '', window.location.pathname);
  } else if(status === 'cancelled') {
    showMsg('Płatność anulowana.');
    history.replaceState({}, '', window.location.pathname);
  }
}