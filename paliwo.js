/* ===== SYSTEM PALIWA ===== */

// Spalanie wg modelu (koszt na km lotu)
var FUEL_PER_KM = {
  'A380':      8, 'B747-8':    8, 'B747-400':  8,
  'B777-300ER':6, 'B777-200ER':6, 'A350-1000': 6,
  'A350-900':  5, 'B787-10':   5, 'B787-9':    5,
  'B787-8':    4, 'A330-900':  5, 'A330-300':  5,
  'A330-200':  4, 'A321XLR':   3, 'A321neo':   3,
  'A321ceo':   3, 'A320neo':   2, 'A320ceo':   2,
  'A319neo':   2, 'B737 MAX 10':2,'B737 MAX 9':2,
  'B737 MAX 8':2, 'B737-800':  2, 'A220-300':  2,
  'A220-100':  1, 'E195-E2':   1, 'E190-E2':   1,
  'E175-E2':   1, 'ATR 72':    1, 'ATR 42':    1,
};

function getFuelPerKm(model) {
  if(FUEL_PER_KM[model]) return FUEL_PER_KM[model];
  // Fallback po wielkości samolotu
  var n = model.toLowerCase();
  if(n.indexOf('380')>=0||n.indexOf('747')>=0) return 8;
  if(n.indexOf('777')>=0||n.indexOf('350')>=0) return 6;
  if(n.indexOf('787')>=0||n.indexOf('330')>=0) return 5;
  if(n.indexOf('321')>=0||n.indexOf('737')>=0) return 3;
  if(n.indexOf('320')>=0) return 2;
  if(n.indexOf('220')>=0||n.indexOf('190')>=0||n.indexOf('195')>=0) return 1;
  if(n.indexOf('175')>=0||n.indexOf('atr')>=0) return 1;
  return 2;
}

function initFuel() {
  if(!G.fuel) G.fuel = {};
  if(!G.fuel.lastPaid)   G.fuel.lastPaid = 0;
  if(!G.fuel.nextDue)    G.fuel.nextDue  = 0;
  if(G.fuelDebt===undefined) G.fuelDebt = 0;
  if(!G.fuelMultiplier)  G.fuelMultiplier = 1.0;
}

// Wywołaj po każdym odlocie samolotu
function addFuelDebt(distKm, model) {
  initFuel();
  if(!distKm || distKm <= 0) return;
  var costPerKm = getFuelPerKm(model);
  var cost = Math.round(distKm * costPerKm * (G.fuelMultiplier||1.0));
  G.fuelDebt = (G.fuelDebt||0) + cost;
  // Aktualizuj HUD jezeli widoczny
  var hudFuel = document.getElementById('hud-fuel-debt');
  if(hudFuel) hudFuel.textContent = '$'+(G.fuelDebt).toLocaleString();
}

// Automatyczna opłata o północy
function scheduleMidnightFuel() {
  var now = new Date();
  var midnight = new Date(now);
  midnight.setHours(24,0,0,0);
  var msToMidnight = midnight - now;
  setTimeout(function(){
    collectFuelDebt();
    setInterval(collectFuelDebt, 86400000); // co 24h
  }, msToMidnight);
}

function collectFuelDebt() {
  initFuel();
  var debt = G.fuelDebt || 0;
  if(debt <= 0) { G.fuel.lastPaid=Date.now(); G.fuel.nextDue=Date.now()+86400000; save(); return; }
  if(G.cash >= debt) {
    G.cash -= debt;
    G.fuelDebt = 0;
    G.fuel.lastPaid = Date.now();
    G.fuel.nextDue  = Date.now() + 86400000;
    G.fuel.paidToday = true;
    G.fuelCrisis = false;
    save(); updateHUD();
    showMsg('⛽ Paliwo pobrane o północy: -$'+debt.toLocaleString());
  } else {
    G.fuelCrisis = true;
    save();
    showMsg('⛽ KRYZYS! Brak kasy na paliwo ($'+debt.toLocaleString()+')!');
  }
}

// Ręczna opłata — gracz może zapłacić w dowolnej chwili
function payFuelNow() {
  initFuel();
  var debt = G.fuelDebt || 0;
  if(debt <= 0) { showMsg('Brak długu paliwowego!'); openFuelPanel(); return; }
  if(G.cash < debt) { showMsg('Za mało kasy! Dług: $'+debt.toLocaleString()); openFuelPanel(); return; }
  G.cash -= debt;
  G.fuelDebt = 0;
  G.fuel.lastPaid = Date.now();
  G.fuelCrisis = false;
  save(); updateHUD();
  showMsg('✅ Paliwo opłacone: -$'+debt.toLocaleString());
  openFuelPanel();
}

// Panel paliwa
function openFuelPanel() {
  initFuel();
  var debt = G.fuelDebt || 0;
  var mult = G.fuelMultiplier || 1.0;
  var pct  = Math.round(mult*100);
  var multCol = mult>1.3?'#ef4444':mult>1.0?'#f97316':'#10b981';
  var crisis = G.fuelCrisis;

  // Oblicz dzisiejsze zuzycie - na podstawie lotow
  var fleetInfo = '';
  if(G.fleet && G.fleet.length) {
    fleetInfo = '<div style="margin-bottom:12px;">'
      +'<div style="font-size:9px;color:#94a3b8;letter-spacing:2px;margin-bottom:8px;">SPALANIE FLOTYY</div>';
    G.fleet.forEach(function(ac){
      var cpk = getFuelPerKm(ac.model);
      fleetInfo += '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">'
        +'<span style="font-size:12px;color:#f1f5f9;">'+ac.model+' <span style="color:#94a3b8;font-size:10px;">('+ac.reg+')</span></span>'
        +'<span style="font-size:11px;color:#f97316;font-weight:700;">$'+cpk+'/km</span>'
        +'</div>';
    });
    fleetInfo += '</div>';
  }

  var html =
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">'
    +'<div style="width:48px;height:48px;background:linear-gradient(135deg,#f97316,#eab308);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;">⛽</div>'
    +'<div>'
    +'<div style="font-size:16px;font-weight:900;color:#f1f5f9;">System Paliwa</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Dług rośnie z każdym lotem • Auto-pobór o 00:00</div>'
    +'</div></div>';

  if(crisis) {
    html += '<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:12px;margin-bottom:12px;text-align:center;">'
      +'<div style="font-size:14px;font-weight:900;color:#ef4444;">⚠ KRYZYS PALIWOWY — loty wstrzymane</div></div>';
  }

  // Aktualny dług
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
    +'<div style="background:'+(debt>0?'rgba(239,68,68,0.08)':'rgba(16,185,129,0.08)')+';border:1px solid '+(debt>0?'rgba(239,68,68,0.2)':'rgba(16,185,129,0.2)')+';border-radius:12px;padding:14px;text-align:center;">'
    +'<div style="font-size:20px;font-weight:900;color:'+(debt>0?'#ef4444':'#10b981')+';">$'+(debt).toLocaleString()+'</div>'
    +'<div style="font-size:9px;color:#94a3b8;margin-top:2px;">AKTUALNY DŁUG</div>'
    +'</div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px;text-align:center;">'
    +'<div style="font-size:20px;font-weight:900;color:'+multCol+';">'+pct+'%</div>'
    +'<div style="font-size:9px;color:#94a3b8;margin-top:2px;">CENA PALIWA</div>'
    +'</div></div>'

    // Pasek ceny
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;margin-bottom:14px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">'
    +'<div style="font-size:11px;color:#94a3b8;">Cena rynkowa paliwa</div>'
    +'<div style="font-size:13px;font-weight:700;color:'+multCol+';">'+pct+'% normy</div></div>'
    +'<div style="height:5px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">'
    +'<div style="height:100%;width:'+Math.min(100,pct/2.5)+'%;background:'+multCol+';border-radius:3px;"></div></div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:6px;">Zmienia się losowo • niski = taniej latać</div>'
    +'</div>'

    + fleetInfo

    // Jak działa
    +'<div style="background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.15);border-radius:12px;padding:12px;margin-bottom:14px;">'
    +'<div style="font-size:11px;font-weight:700;color:#8b5cf6;margin-bottom:6px;">Jak działa?</div>'
    +'<div style="font-size:11px;color:#94a3b8;line-height:1.7;">'
    +'• Każdy lot dodaje koszt paliwa do długu<br>'
    +'• Koszt = dystans (km) × spalanie modelu<br>'
    +'• O 00:00 system automatycznie pobiera dług<br>'
    +'• Możesz też zapłacić ręcznie w dowolnej chwili'
    +'</div></div>';

  // Przycisk
  if(debt > 0) {
    html += '<button onclick="payFuelNow()" style="width:100%;padding:14px;background:linear-gradient(135deg,#f97316,#eab308);border:none;border-radius:12px;color:#000;font-size:15px;font-weight:800;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:8px;">⛽ Zapłać teraz $'+debt.toLocaleString()+'</button>';
  } else {
    html += '<div style="width:100%;padding:14px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;color:#10b981;font-size:14px;font-weight:700;text-align:center;margin-bottom:8px;box-sizing:border-box;">✅ Brak długu — nie musisz nic płacić</div>';
  }

  html += '<button onclick="closeModal()" style="width:100%;padding:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#94a3b8;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zamknij</button>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}
