/* ===== SYSTEM PALIWA ===== */

function getFuelCostForModel(model) {
  if(typeof AIRCRAFT_CATALOG !== 'undefined') {
    var found = null;
    Object.keys(AIRCRAFT_CATALOG).forEach(function(brand){
      AIRCRAFT_CATALOG[brand].forEach(function(ac){ if(ac.model===model) found=ac; });
    });
    if(found) {
      var base = Math.round(((found.seats||150)*20) + ((found.range||3000)*0.5));
      return Math.round(base/100)*100;
    }
  }
  var n=model.toLowerCase();
  if(n.indexOf('a380')>=0) return 22000;
  if(n.indexOf('777')>=0)  return 18000;
  if(n.indexOf('a350')>=0||n.indexOf('787-10')>=0) return 14000;
  if(n.indexOf('787-9')>=0||n.indexOf('a330')>=0)  return 12000;
  if(n.indexOf('787-8')>=0) return 11000;
  if(n.indexOf('a321')>=0) return 6000;
  if(n.indexOf('a320')>=0||n.indexOf('737')>=0) return 5200;
  if(n.indexOf('a220')>=0||n.indexOf('e19')>=0) return 4500;
  if(n.indexOf('e17')>=0||n.indexOf('atr')>=0)  return 3800;
  return 5000;
}

function getFuelMultiplier() { return G.fuelMultiplier || 1.0; }

function getTotalFuelCost24h() {
  if(!G.fleet||!G.fleet.length) return 0;
  var mult = getFuelMultiplier();
  var total = 0;
  G.fleet.forEach(function(ac){ total += Math.round(getFuelCostForModel(ac.model)*mult); });
  return total;
}

function initFuel() {
  if(!G.fuel) G.fuel = {};
  if(!G.fuel.lastPaid) G.fuel.lastPaid = 0;
  if(!G.fuel.nextDue)  G.fuel.nextDue  = 0;
  if(!G.fuelMultiplier) G.fuelMultiplier = 1.0;
}

function updateFuelPrice() {
  initFuel();
  var old = G.fuelMultiplier || 1.0;
  var change = (Math.random()*0.35)-0.15;
  G.fuelMultiplier = Math.max(0.6, Math.min(2.5, Math.round((old+change)*100)/100));
  save();
  if(Math.abs(change)>0.1) showMsg('⛽ Cena paliwa: '+(G.fuelMultiplier*100).toFixed(0)+'% normy');
}

/* -- Automatyczna oplata co 24h -- */
function checkFuelPayment() {
  initFuel();
  var now = Date.now();
  if(G.fuel.nextDue && now < G.fuel.nextDue) return; // Jeszcze nie czas
  var cost = getTotalFuelCost24h();
  if(!cost) return;
  if(G.cash >= cost) {
    G.cash -= cost;
    G.fuel.lastPaid = now;
    G.fuel.nextDue  = now + 86400000;
    G.fuel.paidToday = true;
    G.fuelCrisis = false;
    save(); updateHUD();
    showMsg('⛽ Paliwo ('+(G.fleet.length)+' sam): -$'+cost.toLocaleString());
  } else {
    G.fuelCrisis = true; save();
    if(typeof showEventModal==='function') {
      showEventModal({
        icon:'⛽', title:'KRYZYS PALIWOWY!',
        desc:'Brak kasy na paliwo dla '+G.fleet.length+' samolotów! Potrzebujesz $'+cost.toLocaleString()+'. Loty wstrzymane.',
        severity:'danger',
        adButton:true,
        adReward:function(){
          G.fuelCrisis=false;
          G.fuel.lastPaid=Date.now(); G.fuel.nextDue=Date.now()+86400000; G.fuel.paidToday=true;
          save(); updateHUD(); closeModal(); showMsg('Kryzys zażegnany!');
        },
        actions:[{label:'Idź do sklepu',fn:function(){closeModal();openTopUp();}}]
      });
    }
  }
}

/* -- Reczna oplata (raz dziennie) -- */
function payFuelNow() {
  initFuel();
  var now = Date.now();
  var nextDue = G.fuel.nextDue || 0;

  // Czy juz zaplacono dzisiaj? (jesli nextDue jest w przyszlosci)
  if(nextDue > now) {
    var rem = nextDue - now;
    var h = Math.floor(rem/3600000);
    var m = Math.floor((rem%3600000)/60000);
    showMsg('Już opłacono! Następna opłata za '+h+'h '+m+'m');
    return;
  }

  var cost = getTotalFuelCost24h();
  if(!cost){ showMsg('Brak samolotów'); return; }
  if(G.cash < cost){ showMsg('Za mało kasy! Potrzebujesz $'+cost.toLocaleString()); return; }
  G.cash -= cost;
  G.fuel.lastPaid = now;
  G.fuel.nextDue  = now + 86400000;
  G.fuelCrisis = false;
  save(); updateHUD();
  showMsg('✅ Paliwo opłacone: -$'+cost.toLocaleString());
  openFuelPanel();
}

/* -- Panel paliwa -- */
function openFuelPanel() {
  initFuel();
  var now  = Date.now();
  var due  = G.fuel.nextDue || 0;
  var rem  = Math.max(0, due - now);
  var paid = due > now; // czy juz zaplacono na ten okres
  var h    = Math.floor(rem/3600000);
  var m    = Math.floor((rem%3600000)/60000);
  var s    = Math.floor((rem%60000)/1000);
  var cost = getTotalFuelCost24h();
  var mult = getFuelMultiplier();
  var pct  = Math.round(mult*100);
  var multCol = mult>1.2?'#ef4444':mult>1.0?'#f97316':'#10b981';
  var crisis = G.fuelCrisis;

  var html = '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">'
    +'<div style="width:48px;height:48px;background:linear-gradient(135deg,#f97316,#eab308);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;">⛽</div>'
    +'<div>'
    +'<div style="font-size:16px;font-weight:900;color:#f1f5f9;">System Paliwa</div>'
    +'<div style="font-size:11px;color:#94a3b8;">Automatyczna opłata co 24 godziny</div>'
    +'</div></div>';

  if(crisis) {
    html += '<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:12px;margin-bottom:12px;text-align:center;">'
      +'<div style="font-size:14px;font-weight:900;color:#ef4444;">⚠ KRYZYS PALIWOWY — loty wstrzymane</div></div>';
  }

  // Licznik i koszt
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
    +'<div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:12px;padding:14px;text-align:center;">'
    +'<div style="font-size:20px;font-weight:900;color:#ef4444;">$'+cost.toLocaleString()+'</div>'
    +'<div style="font-size:9px;color:#94a3b8;margin-top:2px;">OPŁATA / 24H</div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:2px;">'+G.fleet.length+' samolotów</div>'
    +'</div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px;text-align:center;" id="fuel-countdown-box">'
    +'<div id="fuel-countdown" style="font-size:20px;font-weight:900;color:'+(paid?'#10b981':'#ef4444')+';">'
    +(paid ? h+'h '+String(m).padStart(2,'0')+'m' : 'NALEŻNA')
    +'</div>'
    +'<div style="font-size:9px;color:#94a3b8;margin-top:2px;">'+(paid?'DO KOLEJNEJ OPŁATY':'OPŁAĆ TERAZ')+'</div>'
    +'</div></div>'

    // Cena rynkowa
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;margin-bottom:14px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">'
    +'<div style="font-size:11px;color:#94a3b8;">Cena rynkowa paliwa</div>'
    +'<div style="font-size:14px;font-weight:900;color:'+multCol+';">'+pct+'% normy</div></div>'
    +'<div style="height:5px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">'
    +'<div style="height:100%;width:'+Math.min(100,pct/2)+'%;background:'+multCol+';border-radius:3px;transition:width 0.3s;"></div></div></div>';

  // Przycisk - szary jesli juz zaplacono
  if(paid) {
    html += '<div style="width:100%;padding:14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#94a3b8;font-size:14px;font-weight:700;text-align:center;margin-bottom:8px;box-sizing:border-box;">'
      +'✅ Opłacono — następna opłata za '+h+'h '+String(m).padStart(2,'0')+'m</div>';
  } else {
    html += '<button onclick="payFuelNow()" style="width:100%;padding:14px;background:linear-gradient(135deg,#f97316,#eab308);border:none;border-radius:12px;color:#000;font-size:15px;font-weight:800;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:8px;">⛽ Zapłać teraz $'+cost.toLocaleString()+'</button>';
  }

  html += '<button onclick="closeModal()" style="width:100%;padding:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#94a3b8;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zamknij</button>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';

  // Odliczanie w czasie rzeczywistym
  if(paid && rem > 0) {
    clearInterval(window._fuelCountdown);
    window._fuelCountdown = setInterval(function(){
      var r = Math.max(0, (G.fuel.nextDue||0) - Date.now());
      var el = document.getElementById('fuel-countdown');
      if(!el){ clearInterval(window._fuelCountdown); return; }
      if(r <= 0) {
        clearInterval(window._fuelCountdown);
        el.textContent = 'NALEŻNA';
        el.style.color = '#ef4444';
        // Otwórz panel ponownie żeby pokazac przycisk
        openFuelPanel();
        return;
      }
      var hh = Math.floor(r/3600000);
      var mm = Math.floor((r%3600000)/60000);
      var ss = Math.floor((r%60000)/1000);
      el.textContent = hh+'h '+String(mm).padStart(2,'0')+'m '+String(ss).padStart(2,'0')+'s';
    }, 1000);
  }
}
