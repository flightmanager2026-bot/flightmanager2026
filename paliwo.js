/* ===== SYSTEM PALIWA ===== */

// Ceny paliwa per model samolotu (USD/24h)
var FUEL_COSTS = {
  'ATR-72':           2800,
  'Embraer E175':     3200,
  'Embraer E175-E2':  3000,
  'Embraer E190':     3800,
  'Embraer E190-E2':  3500,
  'Embraer E195-E2':  3800,
  'Boeing 737-800':   5500,
  'Boeing 737 MAX 8': 5000,
  'Boeing 737 MAX 10':5800,
  'Airbus A220-100':  4200,
  'Airbus A220-300':  4600,
  'Airbus A320neo':   5200,
  'Airbus A321neo':   6000,
  'Airbus A321XLR':   6500,
  'Airbus A330-300':  12000,
  'Airbus A350-900':  14000,
  'Airbus A380-800':  22000,
  'Boeing 787-8':     11000,
  'Boeing 787-9':     12500,
  'Boeing 787-10':    14000,
  'Boeing 777-300ER': 18000,
};

var DEFAULT_FUEL_COST = 5000;

// Aktualna cena paliwa (mnoznik, domyslnie 1.0)
// Rynkowa zmiennosc: co jakis czas losowo skacze
function getFuelMultiplier() {
  return G.fuelMultiplier || 1.0;
}

function getTotalFuelCost24h() {
  if(!G.fleet || !G.fleet.length) return 0;
  var mult = getFuelMultiplier();
  var total = 0;
  G.fleet.forEach(function(ac){
    var base = FUEL_COSTS[ac.model] || DEFAULT_FUEL_COST;
    total += Math.round(base * mult);
  });
  return total;
}

function getFuelCostForAc(model) {
  return Math.round((FUEL_COSTS[model] || DEFAULT_FUEL_COST) * getFuelMultiplier());
}

/* -- Inicjalizacja paliwa -- */
function initFuel() {
  if(!G.fuel) G.fuel = {};
  if(!G.fuel.lastPaid) G.fuel.lastPaid = Date.now();
  if(!G.fuel.nextDue) G.fuel.nextDue = G.fuel.lastPaid + 86400000;
  if(!G.fuelMultiplier) G.fuelMultiplier = 1.0;
  if(!G.fuel.priceHistory) G.fuel.priceHistory = [1.0];
}

/* -- Losowa zmiana ceny paliwa (wywolywana co jakis czas) -- */
function updateFuelPrice() {
  initFuel();
  var old = G.fuelMultiplier || 1.0;
  // Losowa zmiana -15% do +20%
  var change = (Math.random() * 0.35) - 0.15;
  var newMult = Math.max(0.6, Math.min(2.5, old + change));
  newMult = Math.round(newMult * 100) / 100;
  G.fuelMultiplier = newMult;

  // Zapisz historię (max 7 wpisów)
  if(!G.fuel.priceHistory) G.fuel.priceHistory = [];
  G.fuel.priceHistory.push(newMult);
  if(G.fuel.priceHistory.length > 7) G.fuel.priceHistory.shift();

  save();

  // Powiadom o duzej zmianie
  var pct = Math.round(Math.abs(change) * 100);
  if(Math.abs(change) > 0.1) {
    var dir = change > 0 ? '📈 WZROST' : '📉 SPADEK';
    showMsg('⛽ ' + dir + ' cen paliwa: ' + (newMult * 100).toFixed(0) + '% normy (' + (change > 0 ? '+' : '') + pct + '%)');
  }
}

/* -- Plac za paliwo -- */
function payFuel(force) {
  initFuel();
  var now = Date.now();
  var due = G.fuel.nextDue || (G.fuel.lastPaid + 86400000);

  // Jesli nie minelo 24h i nie force
  if(!force && now < due) {
    var remaining = due - now;
    var h = Math.floor(remaining / 3600000);
    var m = Math.floor((remaining % 3600000) / 60000);
    showMsg('Paliwo oplacone. Nastepna oplata za ' + h + 'h ' + m + 'm');
    return;
  }

  var cost = getTotalFuelCost24h();
  if(!cost) { showMsg('Brak samolotow - brak oplaty za paliwo'); return; }

  if(G.cash < cost) {
    showMsg('⚠ Za malo kasy na paliwo! Brakuje $' + (cost - G.cash).toLocaleString());
    // Zdarzenie: kryzys paliwowy
    triggerFuelCrisis();
    return;
  }

  G.cash -= cost;
  G.fuel.lastPaid = now;
  G.fuel.nextDue = now + 86400000;
  save();
  updateHUD();
  showMsg('✅ Paliwo oplacone: -$' + cost.toLocaleString());
}

function payFuelNow() {
  payFuel(true);
  openFuelPanel();
}

/* -- Automatyczna oplata co 24h -- */
function checkFuelPayment() {
  initFuel();
  var now = Date.now();
  if(now >= (G.fuel.nextDue || 0)) {
    var cost = getTotalFuelCost24h();
    if(cost > 0) {
      if(G.cash >= cost) {
        G.cash -= cost;
        G.fuel.lastPaid = now;
        G.fuel.nextDue = now + 86400000;
        save(); updateHUD();
        showMsg('⛽ Auto-oplata paliwa: -$' + cost.toLocaleString());
      } else {
        triggerFuelCrisis();
      }
    }
  }
}

function triggerFuelCrisis() {
  // Zdarzenie kryzys paliwowy - blokuje loty
  G.fuelCrisis = true;
  save();
  showEventModal({
    icon: '⛽',
    title: 'KRYZYS PALIWOWY!',
    desc: 'Nie masz wystarczajaco kasy na paliwo dla floty! Wszystkie loty wstrzymane do czasu oplacenia.',
    severity: 'danger',
    adButton: true,
    adReward: function() { G.fuelCrisis = false; G.cash += getTotalFuelCost24h(); save(); updateHUD(); showMsg('Reklama pomogl! Paliwo oplacone.'); },
    actions: [
      { label: 'Idź do sklepu', fn: function(){ closeModal(); openTopUp(); } }
    ]
  });
}

/* -- Panel paliwa -- */
function openFuelPanel() {
  initFuel();
  var now = Date.now();
  var due = G.fuel.nextDue || (G.fuel.lastPaid + 86400000);
  var remaining = Math.max(0, due - now);
  var h = Math.floor(remaining / 3600000);
  var m = Math.floor((remaining % 3600000) / 60000);
  var cost24h = getTotalFuelCost24h();
  var mult = getFuelMultiplier();
  var multPct = Math.round(mult * 100);
  var multColor = mult > 1.2 ? '#e63946' : mult > 1.0 ? '#f5a623' : '#00e676';
  var crisis = G.fuelCrisis ? true : false;

  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    + '<div style="font-size:28px;">⛽</div>'
    + '<div><div style="font-size:16px;font-weight:900;color:#e0f0ff;">System paliwa</div>'
    + '<div style="font-size:11px;color:#5580a0;">Oplata automatyczna co 24h</div></div></div>';

  // Status
  if(crisis) {
    html += '<div style="background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.3);border-radius:12px;padding:12px;margin-bottom:12px;text-align:center;">'
      + '<div style="font-size:14px;font-weight:900;color:#e63946;">⚠ KRYZYS PALIWOWY</div>'
      + '<div style="font-size:11px;color:#5580a0;margin-top:4px;">Loty wstrzymane - opłać natychmiast</div></div>';
  }

  // Cena rynkowa
  html += '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:10px;">'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
    + '<div style="font-size:12px;color:#5580a0;">Cena rynkowa</div>'
    + '<div style="font-size:16px;font-weight:900;color:' + multColor + ';">' + multPct + '% normy</div></div>'
    + '<div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">'
    + '<div style="height:100%;width:' + Math.min(100, multPct/2) + '%;background:' + multColor + ';border-radius:3px;"></div></div>'
    + '<div style="font-size:10px;color:#5580a0;margin-top:6px;">Norma = $' + DEFAULT_FUEL_COST + '/samolot/24h (Boeing 737-800)</div>'
    + '</div>';

  // Nastepna oplata
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
    + '<div style="background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.15);border-radius:10px;padding:12px;text-align:center;">'
    + '<div style="font-size:18px;font-weight:900;color:#e63946;">$' + cost24h.toLocaleString() + '</div>'
    + '<div style="font-size:9px;color:#5580a0;margin-top:2px;">OPLATA / 24H</div></div>'
    + '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;text-align:center;">'
    + '<div style="font-size:18px;font-weight:900;color:#f5a623;">' + h + 'h ' + m + 'm</div>'
    + '<div style="font-size:9px;color:#5580a0;margin-top:2px;">DO OPLAATY</div></div>'
    + '</div>';

  // Per samolot
  if(G.fleet && G.fleet.length) {
    html += '<div style="font-size:9px;color:#5580a0;letter-spacing:2px;margin-bottom:8px;">KOSZTY PER SAMOLOT</div>';
    G.fleet.forEach(function(ac){
      var acCost = getFuelCostForAc(ac.model);
      html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">'
        + '<div><div style="font-size:12px;font-weight:700;color:#e0f0ff;">' + ac.model + '</div>'
        + '<div style="font-size:10px;color:#5580a0;">' + ac.reg + '</div></div>'
        + '<div style="font-size:13px;font-weight:700;color:#f5a623;">$' + acCost.toLocaleString() + '/24h</div>'
        + '</div>';
    });
    html += '<div style="margin-top:12px;"></div>';
  }

  // Przyciski
  html += '<button onclick="payFuelNow()" style="width:100%;padding:13px;background:linear-gradient(135deg,#e67e22,#f5a623);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:8px;">⛽ Zapłać teraz za 24h</button>';
  html += '<button onclick="closeModal()" style="width:100%;padding:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zamknij</button>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}
