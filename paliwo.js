/* ===== SYSTEM PALIWA ===== */

// Dynamiczny koszt paliwa oparty o AIRCRAFT_CATALOG
// Kazdy samolot z katalogu automatycznie dostaje koszt na podstawie zasięgu i miejsc
function getFuelCostForModel(model) {
  // Szukaj w katalogu
  if(typeof AIRCRAFT_CATALOG !== 'undefined') {
    var found = null;
    Object.keys(AIRCRAFT_CATALOG).forEach(function(brand){
      AIRCRAFT_CATALOG[brand].forEach(function(ac){
        if(ac.model === model) found = ac;
      });
    });
    if(found) {
      // Oblicz koszt na podstawie zasięgu i liczby miejsc
      var seats = found.seats || 150;
      var range = found.range || 3000;
      // Baza: $20/miejsce + $0.5/km zasięgu, skalowane do 24h
      var base = Math.round((seats * 20) + (range * 0.5));
      // Zaokrągl do setek
      return Math.round(base / 100) * 100;
    }
  }
  // Fallback jesli nie ma katalogu - szacuj po nazwie
  var n = model.toLowerCase();
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
  G.fleet.forEach(function(ac){
    total += Math.round(getFuelCostForModel(ac.model) * mult);
  });
  return total;
}

function initFuel() {
  if(!G.fuel) G.fuel = {};
  if(!G.fuel.lastPaid) G.fuel.lastPaid = Date.now();
  if(!G.fuel.nextDue)  G.fuel.nextDue  = G.fuel.lastPaid + 86400000;
  if(!G.fuelMultiplier) G.fuelMultiplier = 1.0;
}

function updateFuelPrice() {
  initFuel();
  var old = G.fuelMultiplier || 1.0;
  var change = (Math.random()*0.35)-0.15;
  var n = Math.max(0.6, Math.min(2.5, Math.round((old+change)*100)/100));
  G.fuelMultiplier = n;
  save();
  if(Math.abs(change)>0.1) {
    showMsg('⛽ Cena paliwa: '+(n*100).toFixed(0)+'% normy ('+(change>0?'+':'')+Math.round(change*100)+'%)');
  }
}

function checkFuelPayment() {
  initFuel();
  if(Date.now() >= G.fuel.nextDue) {
    var cost = getTotalFuelCost24h();
    if(!cost) return;
    if(G.cash >= cost) {
      G.cash -= cost;
      G.fuel.lastPaid = Date.now();
      G.fuel.nextDue  = Date.now() + 86400000;
      save(); updateHUD();
      showMsg('⛽ Paliwo ('+G.fleet.length+' szt): -$'+cost.toLocaleString());
    } else {
      G.fuelCrisis = true; save();
      showEventModal({
        icon:'⛽', title:'KRYZYS PALIWOWY!',
        desc:'Brak kasy na paliwo dla '+G.fleet.length+' samolotów! Potrzebujesz $'+cost.toLocaleString()+'. Loty wstrzymane.',
        severity:'danger',
        adButton:true,
        adReward:function(){ G.fuelCrisis=false; G.cash+=cost; G.fuel.lastPaid=Date.now(); G.fuel.nextDue=Date.now()+86400000; save(); updateHUD(); closeModal(); showMsg('Kryzys zażegnany!'); },
        actions:[{label:'Idź do sklepu',fn:function(){closeModal();openTopUp();}}]
      });
    }
  }
}

function payFuelNow() {
  initFuel();
  var cost = getTotalFuelCost24h();
  if(!cost){ showMsg('Brak samolotów'); return; }
  if(G.cash < cost){ showMsg('Za mało kasy! Potrzebujesz $'+cost.toLocaleString()); return; }
  G.cash -= cost;
  G.fuel.lastPaid = Date.now();
  G.fuel.nextDue  = Date.now() + 86400000;
  G.fuelCrisis = false;
  save(); updateHUD();
  showMsg('✅ Paliwo oplacone: -$'+cost.toLocaleString());
  openFuelPanel();
}

function openFuelPanel() {
  initFuel();
  var now  = Date.now();
  var due  = G.fuel.nextDue || (G.fuel.lastPaid+86400000);
  var rem  = Math.max(0, due-now);
  var h    = Math.floor(rem/3600000);
  var m    = Math.floor((rem%3600000)/60000);
  var cost = getTotalFuelCost24h();
  var mult = getFuelMultiplier();
  var pct  = Math.round(mult*100);
  var col  = mult>1.2?'#e63946':mult>1.0?'#f5a623':'#00e676';
  var crisis = G.fuelCrisis;

  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<div style="font-size:28px;">⛽</div>'
    +'<div><div style="font-size:16px;font-weight:900;color:#e0f0ff;">Paliwo</div>'
    +'<div style="font-size:11px;color:#5580a0;">Jedna oplata za cala flote co 24h</div></div></div>';

  if(crisis) {
    html += '<div style="background:rgba(230,57,70,0.1);border:1px solid rgba(230,57,70,0.3);border-radius:12px;padding:12px;margin-bottom:12px;text-align:center;">'
      +'<div style="font-size:14px;font-weight:900;color:#e63946;">⚠ KRYZYS PALIWOWY — loty wstrzymane</div></div>';
  }

  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">'
    +'<div style="background:rgba(245,166,35,0.08);border:1px solid rgba(245,166,35,0.2);border-radius:12px;padding:14px;text-align:center;">'
    +'<div style="font-size:20px;font-weight:900;color:#f5a623;">$'+cost.toLocaleString()+'</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;">OPLATA / 24H</div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:2px;">'+G.fleet.length+' samolotów</div></div>'
    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;text-align:center;">'
    +'<div style="font-size:20px;font-weight:900;color:'+(rem<3600000?'#e63946':'#00d4ff')+';">'+h+'h '+m+'m</div>'
    +'<div style="font-size:9px;color:#5580a0;margin-top:2px;">DO OPLATY</div></div></div>'

    +'<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;margin-bottom:14px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">'
    +'<div style="font-size:11px;color:#5580a0;">Cena rynkowa</div>'
    +'<div style="font-size:14px;font-weight:900;color:'+col+';">'+pct+'% normy</div></div>'
    +'<div style="height:5px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">'
    +'<div style="height:100%;width:'+Math.min(100,pct/2)+'%;background:'+col+';border-radius:3px;"></div></div></div>'

    +'<button onclick="payFuelNow()" style="width:100%;padding:14px;background:linear-gradient(135deg,#e67e22,#f5a623);border:none;border-radius:12px;color:#fff;font-size:15px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:8px;">⛽ Zapłać teraz $'+cost.toLocaleString()+'</button>'
    +'<button onclick="closeModal()" style="width:100%;padding:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Zamknij</button>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}
