/* ===== SYSTEM EVENTOW / KATASTROF / MISJI ===== */

/* -- EVENTY -- */
var EVENT_TYPES = [
  {
    id:'engine_failure', weight:15,
    icon:'🔧', title:'AWARIA SILNIKA!',
    severity:'warning',
    getDesc: function(ac){ return 'Silnik w ' + (ac?ac.model:'samolocie') + ' (' + (ac?ac.reg:'?') + ') wymaga natychmiastowej inspekcji. Koszt naprawy: $' + (ac ? Math.round((FUEL_COSTS[ac.model]||5000)*1.5).toLocaleString() : '7,500') + '.'; },
    getPenalty: function(ac){ return Math.round((FUEL_COSTS[ac?ac.model:'Boeing 737-800']||5000)*1.5); },
    adRewardDesc: 'Obejrzyj reklamę żeby pokryć część kosztów',
  },
  {
    id:'bird_strike', weight:10,
    icon:'🐦', title:'UDERZENIE PTAKA!',
    severity:'warning',
    getDesc: function(ac){ return 'Ptak uderzył w silnik ' + (ac?ac.model:'samolotu') + ' podczas startu. Lot opóźniony o 2h, koszt inspekcji: $3,000.'; },
    getPenalty: function(){ return 3000; },
    adRewardDesc: 'Obejrzyj reklamę żeby uniknąć opóźnienia',
  },
  {
    id:'strike', weight:8,
    icon:'✊', title:'STRAJK PERSONELU!',
    severity:'danger',
    getDesc: function(){ return 'Personel naziemny ogłosił strajk! WSZYSTKIE loty wstrzymane przez 1 godzinę. Strata przychodów: $' + Math.round(getTotalFuelCost24h()/24*3).toLocaleString() + '.'; },
    getPenalty: function(){ return Math.round(getTotalFuelCost24h()/24*3); },
    adRewardDesc: 'Obejrzyj reklamę żeby skrócić strajk do 15 minut',
    globalEffect: true,
  },
  {
    id:'weather', weight:12,
    icon:'⛈', title:'BURZA NAWAŁNICOWA!',
    severity:'warning',
    getDesc: function(ac){ return 'Ekstremalne warunki pogodowe wstrzymują operacje na 30 minut. Pasażerowie otrzymają voucher $50. Koszt: $' + (ac ? Math.round((G.fleet.length||1)*1500).toLocaleString() : '1,500') + '.'; },
    getPenalty: function(){ return (G.fleet.length||1)*1500; },
    adRewardDesc: 'Obejrzyj reklamę żeby przyspieszyć odprawę',
  },
  {
    id:'fuel_spike', weight:10,
    icon:'⛽', title:'GWAŁTOWNY WZROST CEN PALIWA!',
    severity:'warning',
    getDesc: function(){ var extra = Math.round(getTotalFuelCost24h()*0.3); return 'Ceny ropy wzrosły o 30% z powodu kryzysu geopolitycznego! Dodatkowy koszt dziś: $' + extra.toLocaleString() + '.'; },
    getPenalty: function(){ return Math.round(getTotalFuelCost24h()*0.3); },
    adRewardDesc: 'Obejrzyj reklamę żeby zredukować wzrost o połowę',
    fuelEffect: true,
  },
  {
    id:'vip_passenger', weight:15,
    icon:'⭐', title:'PASAŻER VIP!',
    severity:'success',
    getDesc: function(){ return 'Celebryta zarezerwował lot first class! Dodatkowy przychód: $' + Math.round(5000 + Math.random()*10000).toLocaleString() + '.'; },
    getPenalty: function(){ return -Math.round(5000 + Math.random()*10000); }, // negatywna kara = nagroda
    adRewardDesc: null,
  },
  {
    id:'media_coverage', weight:8,
    icon:'📺', title:'MEDIA O TWOJEJ LINII!',
    severity:'success',
    getDesc: function(){ return 'Telewizyjna relacja o Twojej linii lotniczej! Bonus do reputacji i przychód: +$' + (8000).toLocaleString() + ' +100 PKT.'; },
    getPenalty: function(){ return -8000; },
    adRewardDesc: null,
    bonusPoints: 100,
  },
  {
    id:'inspection', weight:10,
    icon:'🔍', title:'INSPEKCJA ULC!',
    severity:'warning',
    getDesc: function(){ return 'Urząd Lotnictwa Cywilnego przeprowadza nieplanowaną inspekcję. Grzywna za brak dokumentacji: $' + (4000).toLocaleString() + '.'; },
    getPenalty: function(){ return 4000; },
    adRewardDesc: 'Obejrzyj reklamę żeby zmniejszyć grzywnę o połowę',
  },
];

function showEventModal(opts) {
  var severityColors = {
    danger:  {bg:'rgba(230,57,70,0.1)',  border:'rgba(230,57,70,0.3)',  text:'#e63946'},
    warning: {bg:'rgba(245,166,35,0.08)',border:'rgba(245,166,35,0.25)',text:'#f5a623'},
    success: {bg:'rgba(0,230,118,0.08)', border:'rgba(0,230,118,0.25)', text:'#00e676'},
  };
  var col = severityColors[opts.severity] || severityColors.warning;

  var html = '<div style="text-align:center;margin-bottom:16px;">'
    + '<div style="font-size:48px;margin-bottom:8px;">' + opts.icon + '</div>'
    + '<div style="font-size:18px;font-weight:900;color:' + col.text + ';margin-bottom:6px;">' + opts.title + '</div>'
    + '</div>'
    + '<div style="background:' + col.bg + ';border:1px solid ' + col.border + ';border-radius:12px;padding:14px;margin-bottom:16px;">'
    + '<div style="font-size:13px;color:#e0f0ff;line-height:1.6;">' + opts.desc + '</div>'
    + '</div>';

  if(opts.adButton && opts.adReward) {
    html += '<button onclick="eventWatchAd(' + JSON.stringify(opts).replace(/"/g,"'") + ')" style="width:100%;padding:12px;background:linear-gradient(135deg,#f5a623,#ffd700);border:none;border-radius:12px;color:#000;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:8px;">🎬 Obejrzyj reklamę i uniknij kary</button>';
  }

  if(opts.actions) {
    opts.actions.forEach(function(a){
      html += '<button onclick="(' + a.fn.toString() + ')()" style="width:100%;padding:11px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;color:#e0f0ff;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-bottom:8px;">' + a.label + '</button>';
    });
  }

  html += '<button onclick="closeModal()" style="width:100%;padding:11px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;color:#5580a0;font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">Akceptuj i zamknij</button>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

function triggerRandomEvent() {
  if(!G.fleet || !G.fleet.length) return;
  if(G.lastEvent && Date.now() - G.lastEvent < 600000) return; // min 10 min między eventami

  // Losuj event
  var totalWeight = EVENT_TYPES.reduce(function(s,e){return s+e.weight;},0);
  var rand = Math.random() * totalWeight;
  var cumulative = 0;
  var event = EVENT_TYPES[0];
  for(var i=0;i<EVENT_TYPES.length;i++){
    cumulative += EVENT_TYPES[i].weight;
    if(rand <= cumulative){ event = EVENT_TYPES[i]; break; }
  }

  G.lastEvent = Date.now();

  // Losuj samolot
  var ac = G.fleet[Math.floor(Math.random()*G.fleet.length)];
  var penalty = event.getPenalty(ac);
  var desc = event.getDesc(ac);

  // Efekty specjalne
  if(event.fuelEffect) {
    G.fuelMultiplier = Math.min(2.5, (G.fuelMultiplier||1.0) + 0.3);
    save();
  }
  if(event.globalEffect) {
    G.strikeActive = true;
    setTimeout(function(){ G.strikeActive=false; save(); }, 3600000);
  }

  // Sukces - od razu aplikuj nagrodę
  if(event.severity === 'success') {
    G.cash -= penalty; // penalty jest ujemna = nagroda
    if(event.bonusPoints) G.points = (G.points||0) + event.bonusPoints;
    save(); updateHUD();
  }

  showEventModal({
    icon: event.icon,
    title: event.title,
    desc: desc,
    severity: event.severity,
    adButton: event.severity !== 'success' && !!event.adRewardDesc,
    adReward: event.severity !== 'success' ? function(){
      // polowa kary za reklame
      G.cash -= Math.round(penalty/2);
      save(); updateHUD();
      closeModal();
      showMsg('Reklama pomogla! Kara zmniejszona o 50%!');
    } : null,
    actions: event.severity !== 'success' ? [
      { label: 'Zapłać $' + Math.round(penalty).toLocaleString(), fn: function(){
        G.cash -= penalty; save(); updateHUD(); closeModal();
        showMsg('Zapłacono karę: -$' + Math.round(penalty).toLocaleString());
      }}
    ] : []
  });
}

/* -- MISJE DZIENNE -- */
var DAILY_MISSION_TYPES = [
  { id:'flights_5',   icon:'✈', title:'Wykonaj 5 lotów',        target: 5,   type:'flights',  reward:{cash:25000,  pts:20}  },
  { id:'flights_10',  icon:'✈', title:'Wykonaj 10 lotów',       target: 10,  type:'flights',  reward:{cash:50000,  pts:40}  },
  { id:'flights_20',  icon:'✈', title:'Wykonaj 20 lotów',       target: 20,  type:'flights',  reward:{cash:100000, pts:80}  },
  { id:'earn_50k',    icon:'💰',title:'Zarobij $50,000',         target: 50000,  type:'earn',  reward:{cash:10000,  pts:30}  },
  { id:'earn_100k',   icon:'💰',title:'Zarobij $100,000',        target: 100000, type:'earn',  reward:{cash:20000,  pts:60}  },
  { id:'fleet_3',     icon:'🛫',title:'Miej 3 samoloty w locie', target: 3,   type:'flying',   reward:{cash:30000,  pts:25}  },
  { id:'buy_slot',    icon:'🎯',title:'Kup nowy slot',           target: 1,   type:'slots',    reward:{cash:15000,  pts:50}  },
  { id:'hire_staff',  icon:'👤',title:'Zatrudnij 2 pracowników', target: 2,   type:'staff',    reward:{cash:20000,  pts:35}  },
];

function initDailyMissions() {
  if(!G.missions) G.missions = {};
  var today = new Date().toDateString();
  if(G.missions.date !== today) {
    // Nowy dzień - losuj 3 misje
    var shuffled = DAILY_MISSION_TYPES.slice().sort(function(){return Math.random()-0.5;});
    G.missions = {
      date: today,
      list: shuffled.slice(0,3).map(function(m){
        return { id:m.id, icon:m.icon, title:m.title, target:m.target, type:m.type, reward:m.reward, progress:0, done:false, claimed:false };
      })
    };
    save();
  }
}

function updateMissionProgress(type, amount) {
  initDailyMissions();
  var changed = false;
  (G.missions.list||[]).forEach(function(m){
    if(m.done || m.type !== type) return;
    m.progress = (m.progress||0) + (amount||1);
    if(m.progress >= m.target) {
      m.done = true;
      changed = true;
      showMsg('🎯 Misja ukończona: ' + m.title + '! Odbierz nagrodę!');
    }
  });
  if(changed) save();
}

function claimMissionReward(idx) {
  initDailyMissions();
  var m = G.missions.list[idx];
  if(!m || !m.done || m.claimed) return;
  m.claimed = true;
  G.cash += m.reward.cash;
  G.points = (G.points||0) + m.reward.pts;
  save(); updateHUD();
  showMsg('🎁 Nagrodę odebrano! +$' + m.reward.cash.toLocaleString() + ' +' + m.reward.pts + ' PKT');
  openMissionsPanel();
}

function openMissionsPanel() {
  initDailyMissions();
  var html = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    + '<div style="font-size:24px;">🎯</div>'
    + '<div><div style="font-size:16px;font-weight:900;color:#e0f0ff;">Misje dzienne</div>'
    + '<div style="font-size:11px;color:#5580a0;">Resetują się o północy</div></div></div>';

  (G.missions.list||[]).forEach(function(m, idx){
    var pct = Math.min(100, Math.round((m.progress||0)/m.target*100));
    var statusColor = m.claimed ? '#5580a0' : m.done ? '#00e676' : '#00d4ff';
    var statusText = m.claimed ? '✓ Odebrano' : m.done ? '✓ Ukończono!' : pct + '%';

    html += '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px;margin-bottom:10px;opacity:' + (m.claimed?'0.5':'1') + '">'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">'
      + '<div style="font-size:24px;">' + m.icon + '</div>'
      + '<div style="flex:1;">'
      + '<div style="font-size:13px;font-weight:700;color:#e0f0ff;">' + m.title + '</div>'
      + '<div style="font-size:11px;color:#5580a0;margin-top:2px;">+$' + m.reward.cash.toLocaleString() + ' +' + m.reward.pts + ' PKT</div>'
      + '</div>'
      + '<div style="font-size:12px;font-weight:700;color:' + statusColor + ';">' + statusText + '</div>'
      + '</div>'
      + '<div style="height:5px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;margin-bottom:8px;">'
      + '<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#00d4ff,#a78bfa);border-radius:3px;transition:width 0.4s;"></div></div>'
      + '<div style="font-size:10px;color:#5580a0;">' + Math.min(m.progress||0, m.target) + ' / ' + m.target + '</div>'
      + (m.done && !m.claimed
        ? '<button onclick="claimMissionReward(' + idx + ')" style="width:100%;margin-top:10px;padding:10px;background:linear-gradient(135deg,#00e676,#00b894);border:none;border-radius:10px;color:#000;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;">🎁 Odbierz nagrodę</button>'
        : '')
      + '</div>';
  });

  html += '<button onclick="closeModal()" style="width:100%;padding:11px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#5580a0;font-size:13px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;margin-top:4px;">Zamknij</button>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
}

/* -- AUTO EVENTY -- */
function startEventSystem() {
  // Event co 15-30 minut losowo
  function scheduleNext() {
    var delay = (15 + Math.random()*15) * 60000;
    setTimeout(function(){
      triggerRandomEvent();
      scheduleNext();
    }, delay);
  }
  scheduleNext();

  // Cena paliwa zmienia sie co 6h
  setInterval(updateFuelPrice, 6*3600000);

  // Sprawdz paliwo co 5 minut
  setInterval(checkFuelPayment, 5*60000);

  // Inicjalizuj misje
  initDailyMissions();
}
