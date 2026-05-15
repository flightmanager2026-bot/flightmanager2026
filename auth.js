/* -- FIREBASE AUTH -- */

var FIREBASE_CONFIG = {
  apiKey: "AIzaSyDfiq0yR8XkeUKSFyxLxnhUEHq_oDgWyms",
  authDomain: "flightmanager2026-9fc57.firebaseapp.com",
  projectId: "flightmanager2026-9fc57",
  storageBucket: "flightmanager2026-9fc57.firebasestorage.app",
  messagingSenderId: "1067851905039",
  appId: "1:1067851905039:web:6a8f0178acb8dfe78d4b7a"
};

var _fbApp = null, _fbAuth = null, _fbDb = null, _currentUser = null;

function initFirebase() {
  if(_fbApp) return;
  try {
    _fbApp = firebase.initializeApp(FIREBASE_CONFIG);
    _fbAuth = firebase.auth();
    _fbDb = firebase.firestore();
    console.log('Firebase OK');
    // Sprawdz czy wracamy z Google redirect
    checkGoogleRedirect();
  } catch(e) {
    console.error('Firebase error:', e);
  }
}

/* ── SHOW AUTH SCREEN ─────────────────────────────────── */
function showAuthScreen() {
  initFirebase();
  var el = document.createElement('div');
  el.id = 'authScreen';
  el.style.cssText = 'position:fixed;inset:0;z-index:500;background:#060d1a;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;overflow-y:auto;';

  el.innerHTML =
    // Logo
    '<div style="text-align:center;margin-bottom:32px;">'
    +'<div style="font-size:11px;font-weight:700;letter-spacing:6px;color:rgba(0,212,255,0.5);margin-bottom:6px;">WELCOME TO</div>'
    +'<div style="font-size:34px;font-weight:900;color:#fff;letter-spacing:3px;line-height:1;">FLIGHT</div>'
    +'<div style="font-size:34px;font-weight:900;background:linear-gradient(135deg,#00d4ff,#1a56db);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:3px;line-height:1;">MANAGER</div>'
    +'<div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.3);letter-spacing:4px;margin-top:4px;">2026</div>'
    +'</div>'

    // Card
    +'<div style="width:100%;max-width:400px;background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.15);border-radius:20px;padding:24px;">'

    // Tabs
    +'<div style="display:flex;background:rgba(0,0,0,0.3);border-radius:12px;padding:4px;margin-bottom:20px;">'
    +'<button onclick="switchAuthTab(\'login\')" id="tab-login" style="flex:1;padding:9px;border:none;border-radius:9px;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;background:linear-gradient(135deg,#1a56db,#00d4ff);color:#fff;transition:all 0.2s;">Zaloguj się</button>'
    +'<button onclick="switchAuthTab(\'register\')" id="tab-register" style="flex:1;padding:9px;border:none;border-radius:9px;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;background:transparent;color:#5580a0;transition:all 0.2s;">Zarejestruj</button>'
    +'</div>'

    // Login form
    +'<div id="form-login">'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:6px;">EMAIL</div>'
    +'<input id="auth-email" type="email" placeholder="twoj@email.com" style="width:100%;background:#0a1628;border:1px solid rgba(0,212,255,0.2);border-radius:10px;padding:12px;color:#fff;font-size:14px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;margin-bottom:12px;">'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:6px;">HASŁO</div>'
    +'<input id="auth-pass" type="password" placeholder="••••••••" style="width:100%;background:#0a1628;border:1px solid rgba(0,212,255,0.2);border-radius:10px;padding:12px;color:#fff;font-size:14px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;margin-bottom:16px;">'
    +'<button onclick="doLogin()" style="width:100%;padding:13px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:12px;color:#fff;font-size:15px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:8px;">Zaloguj się</button>'
    +'<div style="text-align:right;margin-bottom:12px;"><span onclick="showForgotPassword()" style="font-size:11px;color:#5580a0;cursor:pointer;text-decoration:underline;">Zapomniałem hasła</span></div>'
    +'<div style="text-align:center;color:#5580a0;font-size:11px;margin-bottom:12px;">lub</div>'
    +'<button onclick="doGoogleLogin()" style="width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;color:#e0f0ff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;">'
    +'<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>'
    +'Kontynuuj z Google</button>'
    +'</div>'

    // Register form (hidden)
    +'<div id="form-register" style="display:none;">'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:6px;">EMAIL</div>'
    +'<input id="reg-email" type="email" placeholder="twoj@email.com" style="width:100%;background:#0a1628;border:1px solid rgba(0,212,255,0.2);border-radius:10px;padding:12px;color:#fff;font-size:14px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;margin-bottom:12px;">'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:6px;">HASŁO (min. 6 znaków)</div>'
    +'<input id="reg-pass" type="password" placeholder="••••••••" style="width:100%;background:#0a1628;border:1px solid rgba(0,212,255,0.2);border-radius:10px;padding:12px;color:#fff;font-size:14px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;margin-bottom:12px;">'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:6px;">POWTÓRZ HASŁO</div>'
    +'<input id="reg-pass2" type="password" placeholder="••••••••" style="width:100%;background:#0a1628;border:1px solid rgba(0,212,255,0.2);border-radius:10px;padding:12px;color:#fff;font-size:14px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;margin-bottom:16px;">'
    +'<button onclick="doRegister()" style="width:100%;padding:13px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:12px;color:#fff;font-size:15px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:12px;">Utwórz konto</button>'
    +'<div style="text-align:center;color:#5580a0;font-size:11px;margin-bottom:12px;">lub</div>'
    +'<button onclick="doGoogleLogin()" style="width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;color:#e0f0ff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;">'
    +'<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>'
    +'Kontynuuj z Google</button>'
    +'</div>'

    // Error
    +'<div id="auth-error" style="display:none;margin-top:12px;padding:10px 14px;background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.3);border-radius:10px;font-size:12px;color:#e63946;text-align:center;"></div>'
    +'</div>';

  document.body.appendChild(el);
}

function switchAuthTab(tab) {
  var isLogin = tab === 'login';
  document.getElementById('form-login').style.display = isLogin ? 'block' : 'none';
  document.getElementById('form-register').style.display = isLogin ? 'none' : 'block';
  document.getElementById('tab-login').style.background = isLogin ? 'linear-gradient(135deg,#1a56db,#00d4ff)' : 'transparent';
  document.getElementById('tab-login').style.color = isLogin ? '#fff' : '#5580a0';
  document.getElementById('tab-register').style.background = isLogin ? 'transparent' : 'linear-gradient(135deg,#1a56db,#00d4ff)';
  document.getElementById('tab-register').style.color = isLogin ? '#5580a0' : '#fff';
  document.getElementById('auth-error').style.display = 'none';
}

function showForgotPassword() {
  var el = document.getElementById('authScreen');
  if(!el) return;
  var card = el.querySelector('div[style*="max-width:400px"]');
  if(!card) return;
  card.innerHTML =
    '<div style="text-align:center;margin-bottom:20px;">'
    +'<div style="font-size:16px;font-weight:900;color:#e0f0ff;">Resetuj hasło</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-top:4px;">Wyślemy link na Twój email</div>'
    +'</div>'
    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:6px;">EMAIL</div>'
    +'<input id="reset-email" type="email" placeholder="twoj@email.com" style="width:100%;background:#0a1628;border:1px solid rgba(0,212,255,0.2);border-radius:10px;padding:12px;color:#fff;font-size:14px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;margin-bottom:16px;">'
    +'<button onclick="doPasswordReset()" style="width:100%;padding:13px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:12px;color:#fff;font-size:15px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:12px;">Wyślij link</button>'
    +'<button onclick="showAuthScreen2()" style="width:100%;padding:10px;background:transparent;border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#5580a0;font-size:13px;font-family:Arial,sans-serif;cursor:pointer;">Wróć do logowania</button>'
    +'<div id="reset-msg" style="display:none;margin-top:12px;padding:10px 14px;border-radius:10px;font-size:12px;text-align:center;"></div>';
}

function showAuthScreen2() {
  var el = document.getElementById('authScreen');
  if(el) document.body.removeChild(el);
  showAuthScreen();
}

function doPasswordReset() {
  var email = document.getElementById('reset-email').value.trim();
  if(!email) return;
  _fbAuth.sendPasswordResetEmail(email)
    .then(function() {
      var msg = document.getElementById('reset-msg');
      if(msg) {
        msg.style.display='block';
        msg.style.background='rgba(0,230,118,0.1)';
        msg.style.border='1px solid rgba(0,230,118,0.3)';
        msg.style.color='#00e676';
        msg.textContent='Link wysłany! Sprawdź skrzynkę email.';
      }
    })
    .catch(function(e) {
      var msg = document.getElementById('reset-msg');
      if(msg) {
        msg.style.display='block';
        msg.style.background='rgba(230,57,70,0.1)';
        msg.style.border='1px solid rgba(230,57,70,0.3)';
        msg.style.color='#e63946';
        msg.textContent=getAuthError(e.code);
      }
    });
}

function showAuthError(msg) {
  var el = document.getElementById('auth-error');
  if(el) { el.textContent = msg; el.style.display = 'block'; }
}

function doLogin() {
  var email = document.getElementById('auth-email').value.trim();
  var pass = document.getElementById('auth-pass').value;
  if(!email || !pass) { showAuthError('Wpisz email i hasło'); return; }
  _fbAuth.signInWithEmailAndPassword(email, pass)
    .then(function(result) { onAuthSuccess(result.user, false); })
    .catch(function(e) { showAuthError(getAuthError(e.code)); });
}

function doRegister() {
  var email = document.getElementById('reg-email').value.trim();
  var pass = document.getElementById('reg-pass').value;
  var pass2 = document.getElementById('reg-pass2').value;
  if(!email || !pass) { showAuthError('Wpisz email i hasło'); return; }
  if(pass !== pass2) { showAuthError('Hasła nie są identyczne'); return; }
  if(pass.length < 6) { showAuthError('Hasło musi mieć min. 6 znaków'); return; }
  _fbAuth.createUserWithEmailAndPassword(email, pass)
    .then(function(result) { onAuthSuccess(result.user, true); })
    .catch(function(e) { showAuthError(getAuthError(e.code)); });
}

function doGoogleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  _fbAuth.signInWithPopup(provider)
    .then(function(result) {
      var isNew = result.additionalUserInfo && result.additionalUserInfo.isNewUser;
      onAuthSuccess(result.user, isNew);
    })
    .catch(function(e) {
      // Jesli popup zablokowany - sprobuj redirect
      if(e.code === 'auth/popup-blocked' || e.code === 'auth/popup-closed-by-user') {
        _fbAuth.signInWithRedirect(provider);
      } else {
        showAuthError(getAuthError(e.code));
      }
    });
}

function checkGoogleRedirect() {
  _fbAuth.getRedirectResult()
    .then(function(result) {
      if(result && result.user) {
        var isNew = result.additionalUserInfo && result.additionalUserInfo.isNewUser;
        onAuthSuccess(result.user, isNew);
      }
    })
    .catch(function(e) {
      if(e.code && e.code !== 'auth/no-auth-event') {
        console.warn('Redirect error:', e.code);
      }
    });
}

function getAuthError(code) {
  var errors = {
    'auth/user-not-found': 'Nie znaleziono konta z tym emailem',
    'auth/wrong-password': 'Błędne hasło',
    'auth/email-already-in-use': 'Ten email jest już zajęty',
    'auth/invalid-email': 'Nieprawidłowy format emaila',
    'auth/weak-password': 'Hasło jest za słabe',
    'auth/too-many-requests': 'Za dużo prób — spróbuj później',
    'auth/network-request-failed': 'Brak połączenia z internetem',
    'auth/popup-closed-by-user': 'Zamknięto okno logowania'
  };
  return errors[code] || 'Błąd: ' + code;
}

function onAuthSuccess(user, isNewUser) {
  _currentUser = user;
  var authEl = document.getElementById('authScreen');

  if(isNewUser) {
    // Nowy gracz - usun auth screen i pokaz setup
    if(authEl) document.body.removeChild(authEl);
    showSetupScreen();
  } else {
    // Istniejacy gracz - zaladuj dane z Firestore
    loadPlayerData(user.uid, function(hasData) {
      if(authEl) document.body.removeChild(authEl);
      if(hasData) {
        // Zaladowano dane - start gry
        startGame();
      } else {
        // Brak danych w chmurze - nowy setup
        showSetupScreen();
      }
    });
  }
}

function loadPlayerData(uid, callback) {
  _fbDb.collection('players').doc(uid).get()
    .then(function(doc) {
      console.log('Firebase load - doc exists:', doc.exists, 'uid:', uid);
    if(doc.exists) {
        var data = doc.data();
        // Zaladuj dane do G
        if(data.cash) G.cash = data.cash;
        if(data.fleet) G.fleet = data.fleet;
        if(data.routes) G.routes = data.routes;
        if(data.slots) G.slots = data.slots;
        if(data.airports) G.airports = data.airports;
        if(data.homeAirport) G.homeAirport = data.homeAirport;
        if(data.airline) G.airline = data.airline;
        if(data.points) G.points = data.points;
        if(data.level) G.level = data.level;
        if(data.totalFlights) G.totalFlights = data.totalFlights;
        if(data.departurelog) G.departurelog = data.departurelog;
        if(data.lastShopPayout) G.lastShopPayout = data.lastShopPayout;
        callback(true);
      } else {
        callback(false);
      }
    })
    .catch(function(e) {
      console.error('Load error:', e);
      callback(false);
    });
}

function saveToCloud() {
  if(!_currentUser || !_fbDb) return;
  var uid = _currentUser.uid;
  var data = {
    cash: G.cash,
    fleet: G.fleet,
    routes: G.routes,
    slots: G.slots,
    airports: G.airports,
    homeAirport: G.homeAirport,
    airline: G.airline,
    points: G.points || 0,
    level: G.level || 1,
    totalFlights: G.totalFlights || 0,
    departurelog: G.departurelog || [],
    lastShopPayout: G.lastShopPayout || 0,
    updatedAt: Date.now()
  };
  _fbDb.collection('players').doc(uid).set(data)
    .then(function(){ console.log('Saved to Firebase OK, uid:', uid); })
    .catch(function(e) { console.error('Save error:', e.code, e.message); });
}

function startGame() {
  // Filtruj fałszywe lotniska
  G.slots = G.slots.filter(function(icao){
    return ADB.some(function(a){return a.icao===icao;});
  });
  G.airports = G.airports.filter(function(ap){
    if(ap.isHome) return true;
    return ADB.some(function(a){return a.icao===ap.icao;});
  });

  initMap();
  setTimeout(function(){
    LMAP.invalidateSize({animate:false});
    LMAP.setView([G.homeAirport.lat, G.homeAirport.lng], 6);
    renderMarkers(); renderRoutes(); restoreFlights(); startTick(); updateHUD();
    showMsg('Witaj z powrotem!');
  }, 50);
}

function logoutPlayer() {
  if(!confirm('Na pewno chcesz się wylogować?')) return;
  if(_fbAuth) {
    _fbAuth.signOut().then(function() {
      location.reload();
    });
  }
}
