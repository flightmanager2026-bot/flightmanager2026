/* ===== SYSTEM POPYTU ===== */

// Bazowe obłożenie 70%, boosty mogą podnieść do 100%
// Popyt per trasa resetuje się o północy

function initDemand() {
  if(!G.demand) G.demand = {};
  if(!G.demandBoost) G.demandBoost = {};
  if(!G.demandAdUsed) G.demandAdUsed = 0;
}

// Wywolaj initDemand od razu przy zaladowaniu pliku
initDemand();

// Bazowe obłożenie dla trasy (70% + boosty)
function getOccupancy(routeId) {
  initDemand();
  var base = 0.70;
  if(!G.demandBoost) G.demandBoost = {};
  // Boost per trasa
  var boost = G.demandBoost[routeId];
  if(boost && boost.expires > Date.now()) {
    base = Math.min(1.0, base + boost.pct);
  }
  // Globalny boost (reklama lub kampania)
  var globalBoost = G.demandBoost['_global'];
  if(globalBoost && globalBoost.expires > Date.now()) {
    base = Math.min(1.0, base + globalBoost.pct);
  }
  return base;
}

// Pobierz pulę popytu dla trasy (reset co 24h)
function getDemandPool(route, ac) {
  initDemand();
  var key = route.id;
  var now = Date.now();
  var pool = G.demand[key];

  // Reset jeśli minęło 24h lub brak
  if(!pool || now - pool.resetAt >= 86400000) {
    var seats = ac ? ac.seats : (route.seats || 150);
    var cfg = ac ? (ac.config || {}) : {};
    var eco   = cfg.eco   || Math.round(seats * 0.80);
    var biz   = cfg.biz   || Math.round(seats * 0.15);
    var prem  = cfg.prem  || Math.round(seats * 0.04);
    var first = cfg.first || Math.round(seats * 0.01);
    // Pula = seats × 4 (wystarczy na kilka lotów dziennie)
    pool = {
      eco:   eco   * 4,
      biz:   biz   * 4,
      prem:  prem  * 4,
      first: first * 4,
      resetAt: now
    };
    G.demand[key] = pool;
  }
  return pool;
}

// Oblicz przychód lotu z uwzględnieniem popytu
function calcRevenueWithDemand(route, ac) {
  initDemand();
  var mins = route.durationMin || 40;
  var occ  = getOccupancy(route.id);
  var pool = getDemandPool(route, ac);
  var cfg  = ac ? (ac.config || {}) : {};
  var seats = ac ? ac.seats : 150;

  var eco   = cfg.eco   || Math.round(seats * 0.80);
  var biz   = cfg.biz   || Math.round(seats * 0.15);
  var prem  = cfg.prem  || Math.round(seats * 0.04);
  var first = cfg.first || Math.round(seats * 0.01);

  // Ile pasażerów leci = min(popyt w puli, seats × obłożenie)
  var ecoP   = Math.min(pool.eco,   Math.round(eco   * occ));
  var bizP   = Math.min(pool.biz,   Math.round(biz   * occ));
  var premP  = Math.min(pool.prem,  Math.round(prem  * occ));
  var firstP = Math.min(pool.first, Math.round(first * occ));

  // Pobierz z puli
  pool.eco   = Math.max(0, pool.eco   - ecoP);
  pool.biz   = Math.max(0, pool.biz   - bizP);
  pool.prem  = Math.max(0, pool.prem  - premP);
  pool.first = Math.max(0, pool.first - firstP);

  var totalPax = ecoP + bizP + premP + firstP;

  // Przychód
  var revenue = Math.round(
    firstP * mins * 4.0 +
    premP  * mins * 3.0 +
    bizP   * mins * 2.0 +
    ecoP   * mins * 1.6
  );

  // Dodaj pasażerów do statystyk
  G.totalPassengers = (G.totalPassengers || 0) + totalPax;

  return {
    revenue: revenue,
    pax: totalPax,
    eco: ecoP, biz: bizP, prem: premP, first: firstP,
    occupancy: Math.round(occ * 100),
    poolLeft: { eco: pool.eco, biz: pool.biz, prem: pool.prem, first: pool.first }
  };
}

// Reset popytu o północy
function scheduleDemandReset() {
  var now = new Date();
  var midnight = new Date(now);
  midnight.setHours(24,0,0,0);
  var ms = midnight - now;
  setTimeout(function(){
    resetAllDemand();
    setInterval(resetAllDemand, 86400000);
  }, ms);
}

function resetAllDemand() {
  initDemand();
  G.demand = {};
  G.demandAdUsed = 0;
  save();
  showMsg('🔄 Popyt pasażerski zresetowany!');
}

// ── BOOSTY OBŁOŻENIA ──────────────────────────────────────

function openDemandBoostPanel() {
  initDemand();
  var now = Date.now();
  var globalBoost = G.demandBoost['_global'];
  var globalActive = globalBoost && globalBoost.expires > now;
  var adUsedToday = G.demandAdUsed && (now - G.demandAdUsed) < 86400000;

  var timeLeft = function(expires) {
    var ms = Math.max(0, expires - now);
    var h = Math.floor(ms/3600000);
    var m = Math.floor((ms%3600000)/60000);
    return h+'h '+m+'m';
  };

  var html =
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">'
    +'<div style="width:48px;height:48px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;">📈</div>'
    +'<div>'
    +'<div style="font-size:16px;font-weight:900;color:#f1f5f9;">Popyt pasażerski</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Bazowe obłożenie 70% • boosty do 100%</div>'
    +'</div></div>'

    // Aktualny status
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px;margin-bottom:14px;">'
    +'<div style="font-size:11px;color:#94a3b8;margin-bottom:10px;">AKTUALNE OBŁOŻENIE</div>'
    +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">'
    +'<div style="flex:1;height:8px;background:rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;">'
    +'<div style="height:100%;width:'+(globalActive?Math.min(100,70+globalBoost.pct*100):70)+'%;background:linear-gradient(90deg,#8b5cf6,#ec4899);border-radius:4px;"></div>'
    +'</div>'
    +'<div style="font-size:16px;font-weight:900;color:#8b5cf6;min-width:45px;text-align:right;">'+(globalActive?Math.min(100,70+Math.round(globalBoost.pct*100)):70)+'%</div>'
    +'</div>'
    +(globalActive
      ?'<div style="font-size:11px;color:#10b981;">✓ Boost aktywny — wygasa za '+timeLeft(globalBoost.expires)+'</div>'
      :'<div style="font-size:11px;color:#94a3b8;">Brak aktywnego boostu</div>'
    )
    +'</div>'

    // Popyt per trasa
    +(G.routes && G.routes.length
      ? '<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;margin-bottom:8px;">PULA POPYTU TRAS</div>'
      + G.routes.map(function(r){
          var ac = G.fleet.filter(function(a){return a.id===r.acId;})[0];
          var pool = G.demand[r.id];
          var occ = Math.round(getOccupancy(r.id)*100);
          var from = typeof getApName==='function'?getApName(r.from):r.from;
          var to   = typeof getApName==='function'?getApName(r.to):r.to;
          return '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px 12px;margin-bottom:6px;">'
            +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">'
            +'<div style="font-size:12px;font-weight:700;color:#f1f5f9;">'+from+' → '+to+'</div>'
            +'<div style="font-size:12px;font-weight:900;color:#8b5cf6;">'+occ+'%</div>'
            +'</div>'
            +(pool
              ?'<div style="font-size:10px;color:#94a3b8;">Eco: '+pool.eco+' • Biz: '+pool.biz+(pool.prem?' • Prem: '+pool.prem:'')+(pool.first?' • First: '+pool.first:'')+'</div>'
              :'<div style="font-size:10px;color:#94a3b8;">Pula zostanie załadowana przy odlocie</div>'
            )
            +'</div>';
        }).join('')
      : ''
    )

    // Darmowa reklama
    +'<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;margin:14px 0 8px;">BOOSTY</div>'
    +'<div style="background:rgba(255,215,0,0.06);border:1px solid rgba(255,215,0,0.2);border-radius:12px;padding:14px;margin-bottom:10px;">'
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">'
    +'<div style="font-size:28px;">📺</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:13px;font-weight:700;color:#ffd700;">Reklama — +10% na 5h</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Raz dziennie bezpłatnie</div>'
    +'</div>'
    +(adUsedToday
      ?'<div style="padding:6px 12px;background:rgba(255,255,255,0.05);border-radius:8px;font-size:11px;color:#94a3b8;">Użyto dziś</div>'
      :'<button onclick="useDemandAd()" style="padding:8px 14px;background:linear-gradient(135deg,#f97316,#eab308);border:none;border-radius:8px;color:#000;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">▶ Oglądaj</button>'
    )
    +'</div></div>'

    // Płatny boost
    +'<div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:14px;margin-bottom:10px;">'
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">'
    +'<div style="font-size:28px;">💎</div>'
    +'<div style="flex:1;">'
    +'<div style="font-size:13px;font-weight:700;color:#8b5cf6;">Kampania reklamowa — +20% na 12h</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Koszt: $50,000</div>'
    +'</div>'
    +'<button onclick="buyDemandBoost()" style="padding:8px 14px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border:none;border-radius:8px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Kup</button>'
    +'</div></div>'

    +'<button onclick="closeModal()" style="width:100%;padding:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#94a3b8;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zamknij</button>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function useDemandAd() {
  initDemand();
  var now = Date.now();
  if(G.demandAdUsed && (now - G.demandAdUsed) < 86400000) {
    showMsg('Reklama już użyta dziś!'); return;
  }
  G.demandAdUsed = now;
  G.demandBoost['_global'] = { pct: 0.10, expires: now + 18000000 }; // 5h
  save();
  showMsg('📺 +10% obłożenia przez 5h!');
  openDemandBoostPanel();
}

function buyDemandBoost() {
  initDemand();
  var cost = 50000;
  if(G.cash < cost) { showMsg('Za mało kasy! Potrzebujesz $'+cost.toLocaleString()); return; }
  G.cash -= cost;
  var now = Date.now();
  G.demandBoost['_global'] = { pct: 0.20, expires: now + 43200000 }; // 12h
  save(); updateHUD();
  showMsg('💎 +20% obłożenia przez 12h!');
  openDemandBoostPanel();
}
