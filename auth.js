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
    +'<button onclick="doAppleLogin()" style="width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;color:#e0f0ff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;margin-top:8px;"><svg width="18" height="18" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.5c-43-81.5-69.7-202-69.7-315.8 0-187.8 122.5-287.5 243.4-287.5 64.4 0 117.8 42.5 157.8 42.5 38.3 0 98.1-45 170.9-45 27.4 0 108.2 2.6 168.6 76.5zm-134.5-115.8c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>Kontynuuj z Apple</button>'
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
    +'<button onclick="doAppleLogin()" style="width:100%;padding:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;color:#e0f0ff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;margin-top:8px;"><svg width="18" height="18" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.5c-43-81.5-69.7-202-69.7-315.8 0-187.8 122.5-287.5 243.4-287.5 64.4 0 117.8 42.5 157.8 42.5 38.3 0 98.1-45 170.9-45 27.4 0 108.2 2.6 168.6 76.5zm-134.5-115.8c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>Kontynuuj z Apple</button>'
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
        msg.textContent='Link wysłany! Sprawdź skrzynkę email — jeśli nie widzisz, zajrzyj do folderu SPAM.';
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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function doLogin() {
  var email = document.getElementById('auth-email').value.trim();
  var pass = document.getElementById('auth-pass').value;
  if(!email) { showAuthError('Wpisz adres email'); return; }
  if(!isValidEmail(email)) { showAuthError('Nieprawidłowy format emaila (np. jan@gmail.com)'); return; }
  if(!pass) { showAuthError('Wpisz hasło'); return; }
  if(pass.length < 6) { showAuthError('Hasło musi mieć min. 6 znaków'); return; }
  _fbAuth.signInWithEmailAndPassword(email, pass)
    .then(function(result) { onAuthSuccess(result.user, false); })
    .catch(function(e) { showAuthError(getAuthError(e.code)); });
}

function doRegister() {
  var email = document.getElementById('reg-email').value.trim();
  var pass = document.getElementById('reg-pass').value;
  var pass2 = document.getElementById('reg-pass2').value;
  if(!email) { showAuthError('Wpisz adres email'); return; }
  if(!isValidEmail(email)) { showAuthError('Nieprawidłowy format emaila (np. jan@gmail.com)'); return; }
  if(!pass) { showAuthError('Wpisz hasło'); return; }
  if(pass.length < 6) { showAuthError('Hasło musi mieć min. 6 znaków'); return; }
  if(pass !== pass2) { showAuthError('Hasła nie są identyczne'); return; }
  if(!/[A-Z]/.test(pass) && !/[0-9]/.test(pass)) { showAuthError('Hasło powinno zawierać wielką literę lub cyfrę'); return; }
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

function doAppleLogin() {
  // Pokazuje komunikat że wkrótce
  var err = document.getElementById('auth-error');
  if(err) {
    err.style.display='block';
    err.style.background='rgba(245,166,35,0.1)';
    err.style.border='1px solid rgba(245,166,35,0.3)';
    err.style.color='#f5a623';
    err.textContent='Logowanie przez Apple — wkrótce dostępne!';
  }
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
  if(authEl) document.body.removeChild(authEl);
  // Dla nowych graczy pokaż setup (boot.js onAuthStateChanged też to zrobi, guard blokuje duplikat)
  if(isNewUser) showSetupScreen();
  // Dla istniejących graczy boot.js onAuthStateChanged obsługuje ładowanie i start gry
}

function loadPlayerData(uid, callback) {
  _fbDb.collection('players').doc(uid).get()
    .then(function(doc) {
      console.log('Firebase load - doc exists:', doc.exists, 'uid:', uid);
    if(doc.exists) {
        var data = doc.data();
        // Zaladuj dane do G
        if(data.cash !== undefined) G.cash = data.cash;
        if(data.fleet && data.fleet.length) G.fleet = data.fleet;
        if(data.routes) G.routes = data.routes;
        if(data.slots) G.slots = data.slots;
        if(data.airports) G.airports = data.airports;
        if(data.homeAirport) G.homeAirport = data.homeAirport;
        if(data.airline) G.airline = data.airline;
        if(data.points !== undefined) G.points = data.points;
        if(data.level) G.level = data.level;
        if(data.totalFlights) G.totalFlights = data.totalFlights;
        if(data.departurelog) G.departurelog = data.departurelog;
        if(data.lastShopPayout) G.lastShopPayout = data.lastShopPayout;
        if(data.staff) G.staff = data.staff;
        if(data.jobMarket) G.jobMarket = data.jobMarket;
        if(data.tutorialDone !== undefined) G.tutorialDone = data.tutorialDone;
        if(data.lastSalaryPay) G.lastSalaryPay = data.lastSalaryPay;
        if(data.totalPassengers !== undefined) G.totalPassengers = data.totalPassengers;
        if(data.cargolicence !== undefined) G.cargolicence = data.cargolicence;
        if(data.foundedAt) G.foundedAt = data.foundedAt;
        // Fallback: użyj daty rejestracji z Firebase Auth jeśli foundedAt nie ustawiono
        if(!G.foundedAt && _currentUser && _currentUser.metadata && _currentUser.metadata.creationTime) {
          G.foundedAt = new Date(_currentUser.metadata.creationTime).getTime();
        }
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
    staff: G.staff || {},
    jobMarket: G.jobMarket || null,
    tutorialDone: G.tutorialDone || false,
    lastSalaryPay: G.lastSalaryPay || 0,
    reset_version: G.reset_version || 0,
    totalPassengers: G.totalPassengers || 0,
    cargolicence: G.cargolicence || false,
    foundedAt: G.foundedAt || 0,
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
    paySalaries();
    setInterval(paySalaries, 3600000);
    // Zaktualizuj ranking doc przy każdym starcie (uzupełnia nowe pola dla starych graczy)
    if(typeof updateRankingValue === 'function') updateRankingValue();
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
