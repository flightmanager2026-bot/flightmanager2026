/* -- LOTNISKO -- */

function getTerminalCost(level) { return 300000 * level; }
function getTerminalCapacity() {
  var ap = G.homeAirport;
  if(!ap||!ap.upgrades) return 1000;
  return (ap.upgrades.terminal||1)*1000;
}
function getPassengersLast2h() {
  var now=Date.now(), two=7200000;
  if(!G.departurelog) G.departurelog=[];
  G.departurelog=G.departurelog.filter(function(e){return now-e.time<two;});
  return G.departurelog.reduce(function(s,e){return s+e.pax;},0);
}
function getTerminalResetTime() {
  if(!G.departurelog||!G.departurelog.length) return 0;
  return Math.max(0, G.departurelog[0].time+7200000-Date.now());
}
function canDepart(pax) { return getPassengersLast2h()+pax<=getTerminalCapacity(); }
function logDeparture(pax) {
  if(!G.departurelog) G.departurelog=[];
  G.departurelog.push({time:Date.now(),pax:pax}); save();
}
function formatTimer(ms) {
  if(ms<=0) return '00:00';
  var s=Math.ceil(ms/1000),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
  if(h>0) return h+'h '+String(m).padStart(2,'0')+'min';
  return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');
}
function getHangarCapacity() {
  var ap=G.homeAirport;
  if(!ap||!ap.upgrades) return 10;
  return 10+((ap.upgrades.hangar||1)-1)*5;
}

function renderLotnisko(body) {
  var ap=G.homeAirport;
  if(!ap){body.innerHTML='<div style="padding:20px;color:#5580a0;text-align:center;">Brak bazy</div>';return;}
  if(!ap.upgrades) ap.upgrades={runways:1,terminal:1,hangar:1,shops:0};
  var u=ap.upgrades;
  var used=getPassengersLast2h(), cap=getTerminalCapacity();
  var pct=Math.min(100,Math.round(used/cap*100));
  var barColor=pct>=100?'#e63946':pct>=75?'#f5a623':'#00d4ff';
  var resetMs=getTerminalResetTime();
  var shopIncome=(u.shops||0)*1000;
  var nextPayout=G.lastShopPayout?Math.max(0,G.lastShopPayout+3600000-Date.now()):0;
  var hangarCap=getHangarCapacity();
  var fleetUsed=G.fleet.length;

  body.innerHTML=

  // ── HEADER CARD ──────────────────────────────────────────
  '<div style="position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(0,212,255,0.12) 0%,rgba(26,86,219,0.18) 100%);border:1px solid rgba(0,212,255,0.25);border-radius:18px;padding:18px;margin-bottom:10px;">'
  +'<div style="position:absolute;top:-20px;right:-20px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(0,212,255,0.15),transparent 70%);pointer-events:none;"></div>'
  +'<div style="display:flex;align-items:flex-start;gap:14px;">'
  +'<div style="width:52px;height:52px;border-radius:14px;background:rgba(0,212,255,0.15);border:1px solid rgba(0,212,255,0.3);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;">&#9992;</div>'
  +'<div style="flex:1;">'
  +'<div style="font-size:18px;font-weight:900;color:#fff;letter-spacing:0.5px;">'+ap.city+'</div>'
  +'<div style="font-size:11px;color:rgba(0,212,255,0.7);font-weight:600;letter-spacing:2px;margin-top:2px;">'+ap.icao+' &nbsp;•&nbsp; '+ap.country+'</div>'
  +'</div>'
  +'<div style="text-align:right;">'
  +(shopIncome>0
    ?'<div style="font-size:16px;font-weight:900;color:#00e676;">$'+shopIncome.toLocaleString()+'<span style="font-size:10px;font-weight:500;color:rgba(0,230,118,0.6);">/h</span></div>'
    +'<div style="font-size:10px;color:#5580a0;margin-top:1px;">dochód ze sklepów</div>'
    :'<div style="font-size:11px;color:#5580a0;">brak dochodu</div>'
  )
  +'</div></div>'
  +'<div style="display:flex;gap:16px;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.07);">'
  +'<div style="flex:1;text-align:center;"><div style="font-size:20px;font-weight:900;color:#f5a623;">LVL '+u.terminal+'</div><div style="font-size:9px;color:#5580a0;letter-spacing:1px;margin-top:1px;">TERMINAL</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,0.07);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:20px;font-weight:900;color:#00d4ff;">'+fleetUsed+'/'+hangarCap+'</div><div style="font-size:9px;color:#5580a0;letter-spacing:1px;margin-top:1px;">HANGAR</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,0.07);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:20px;font-weight:900;color:#a78bfa;">'+u.runways+'/5</div><div style="font-size:9px;color:#5580a0;letter-spacing:1px;margin-top:1px;">PASY</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,0.07);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:20px;font-weight:900;color:#00e676;">'+(u.shops||0)+'/10</div><div style="font-size:9px;color:#5580a0;letter-spacing:1px;margin-top:1px;">SKLEPY</div></div>'
  +'</div></div>'

  // ── TERMINAL CAPACITY ────────────────────────────────────
  +'<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;margin-bottom:10px;">'
  +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
  +'<div style="display:flex;align-items:center;gap:8px;">'
  +'<div style="width:8px;height:8px;border-radius:50%;background:'+barColor+';box-shadow:0 0 6px '+barColor+';"></div>'
  +'<div style="font-size:12px;font-weight:700;color:#e0f0ff;">Przepustowość terminala</div>'
  +'</div>'
  +'<div style="font-size:13px;font-weight:900;color:'+barColor+';">'+used+' / '+cap+' pax</div>'
  +'</div>'
  +'<div style="height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;margin-bottom:10px;">'
  +'<div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,'+barColor+',rgba(0,212,255,0.5));border-radius:4px;transition:width 0.4s ease;box-shadow:0 0 8px '+barColor+'44;"></div>'
  +'</div>'
  +'<div style="display:flex;justify-content:space-between;align-items:center;">'
  +'<div style="font-size:10px;color:#5580a0;">Okno: 2 godziny</div>'
  +(resetMs>0
    ?'<div style="font-size:11px;font-weight:700;color:#f5a623;background:rgba(245,166,35,0.08);padding:3px 10px;border-radius:20px;border:1px solid rgba(245,166,35,0.2);" id="terminal-timer">&#8987; '+formatTimer(resetMs)+'</div>'
    :'<div style="font-size:11px;color:#00e676;font-weight:700;">&#10003; Limit wolny</div>'
  )
  +'</div>'
  +(pct>=100?'<div style="margin-top:8px;padding:8px 12px;background:rgba(230,57,70,0.08);border:1px solid rgba(230,57,70,0.2);border-radius:8px;font-size:11px;color:#e63946;display:flex;align-items:center;gap:6px;"><span>&#9888;</span><span>Terminal pełny — ulepsz aby wysłać więcej samolotów</span></div>':'')
  +'</div>'

  // ── SECTION LABEL ─────────────────────────────────────────
  +'<div style="font-size:9px;font-weight:700;color:#5580a0;letter-spacing:3px;margin:14px 0 8px;padding-left:2px;">ULEPSZENIA INFRASTRUKTURY</div>'

  // ── TERMINAL ──────────────────────────────────────────────
  +buildCard({
    icon:'&#127963;', label:'Terminal', sublabel:'LVL '+u.terminal,
    desc:'Przepustowość: <b style="color:#e0f0ff">'+(u.terminal*1000)+' pax/2h</b> &nbsp;→&nbsp; '+(u.terminal+1)*1000+' po ulepszeniu',
    cost:'$'+(getTerminalCost(u.terminal)).toLocaleString(), costRaw:getTerminalCost(u.terminal),
    key:'terminal', afford:G.cash>=getTerminalCost(u.terminal),
    maxed:false, accentColor:'#00d4ff'
  })

  // ── HANGAR ────────────────────────────────────────────────
  +buildCard({
    icon:'&#128295;', label:'Hangar', sublabel:'LVL '+u.hangar,
    desc:'Miejsca: <b style="color:#e0f0ff">'+hangarCap+' samolotów</b> &nbsp;→&nbsp; '+(hangarCap+5)+' po ulepszeniu',
    extra:'<div style="margin-bottom:8px;"><div style="display:flex;justify-content:space-between;font-size:10px;color:#5580a0;margin-bottom:4px;"><span>Flota</span><span style="color:'+(fleetUsed>=hangarCap?'#e63946':'#00e676')+';font-weight:700;">'+fleetUsed+'/'+hangarCap+'</span></div>'
      +'<div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">'
      +'<div style="height:100%;width:'+Math.min(100,Math.round(fleetUsed/hangarCap*100))+'%;background:'+(fleetUsed>=hangarCap?'#e63946':'linear-gradient(90deg,#00d4ff,#1a56db)')+';border-radius:2px;"></div>'
      +'</div></div>',
    cost:'$'+((u.hangar*200000)).toLocaleString(), costRaw:u.hangar*200000,
    key:'hangar', afford:G.cash>=u.hangar*200000,
    maxed:false, accentColor:'#a78bfa'
  })

  // ── PASY STARTOWE ─────────────────────────────────────────
  +(u.runways<5
    ?buildCard({
      icon:'&#128747;', label:'Pas startowy', sublabel:u.runways+'/5',
      desc:'Więcej pasów = więcej równoczesnych startów',
      cost:'$'+([0,500000,1500000,4000000,10000000][u.runways]||0).toLocaleString(),
      costRaw:[0,500000,1500000,4000000,10000000][u.runways]||0,
      key:'runways', afford:G.cash>=([0,500000,1500000,4000000,10000000][u.runways]||0),
      maxed:false, accentColor:'#a78bfa'
    })
    :'<div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">'
    +'<div style="width:40px;height:40px;border-radius:10px;background:rgba(0,230,118,0.1);border:1px solid rgba(0,230,118,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;">&#128747;</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#e0f0ff;">Pas startowy <span style="color:#00e676;font-size:10px;">MAX</span></div><div style="font-size:11px;color:#5580a0;margin-top:2px;">5/5 pasów — pełna przepustowość startów</div></div>'
    +'</div>'
  )

  // ── SKLEPY (PKT) ──────────────────────────────────────────
  +'<div style="font-size:9px;font-weight:700;color:#5580a0;letter-spacing:3px;margin:14px 0 8px;padding-left:2px;">DOCHÓD PASYWNY</div>'
  +'<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(245,166,35,0.2);border-radius:14px;padding:14px;margin-bottom:8px;">'
  +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">'
  +'<div style="width:44px;height:44px;border-radius:12px;background:rgba(245,166,35,0.12);border:1px solid rgba(245,166,35,0.25);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">&#128722;</div>'
  +'<div style="flex:1;">'
  +'<div style="display:flex;align-items:center;gap:8px;">'
  +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">Sklepy lotniskowe</div>'
  +'<div style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:rgba(245,166,35,0.15);color:#f5a623;">LVL '+(u.shops||0)+'/10</div>'
  +'</div>'
  +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'
  +(u.shops>0
    ?'Dochód: <b style="color:#00e676">$'+shopIncome.toLocaleString()+'/h</b>'
    +'&nbsp;•&nbsp;Następny LVL: $'+((u.shops+1)*1000)+'/h'
    :'Brak — ulepsz aby generować dochód co godzinę'
  )
  +'</div></div></div>'
  // Shop payout timer
  +(u.shops>0
    ?'<div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:10px 12px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;">'
    +'<div style="font-size:11px;color:#5580a0;">Następna wypłata</div>'
    +(nextPayout>0
      ?'<div style="font-size:13px;font-weight:900;color:#f5a623;" id="shop-timer">'+formatTimer(nextPayout)+'</div>'
      :'<div style="font-size:12px;font-weight:700;color:#00e676;" id="shop-timer">&#10003; Gotowe!</div>'
    )
    +'</div>'
    :''
  )
  // Progress bar shops
  +'<div style="margin-bottom:10px;">'
  +'<div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">'
  +'<div style="height:100%;width:'+Math.round((u.shops||0)/10*100)+'%;background:linear-gradient(90deg,#f5a623,#ffd700);border-radius:2px;"></div>'
  +'</div></div>'
  +(u.shops<10
    ?'<button onclick="upgradeShops()" style="width:100%;padding:10px;background:'
    +((G.points||0)>=1000?'linear-gradient(135deg,#b8860b,#f5a623)':'rgba(255,255,255,0.04)')
    +';border:none;border-radius:10px;color:'
    +((G.points||0)>=1000?'#fff':'#5580a0')
    +';font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:'
    +((G.points||0)>=1000?'pointer':'not-allowed')
    +';">&#11088; Ulepsz za 1000 PKT &nbsp;<span style="opacity:0.7;">(masz '+(G.points||0)+')</span></button>'
    :'<div style="padding:10px;text-align:center;font-size:12px;color:#f5a623;font-weight:700;background:rgba(245,166,35,0.06);border-radius:10px;">&#10003; Maks. poziom sklepów (LVL 10)</div>'
  )
  +'</div>';

  // Start timers
  clearInterval(window._termTimer);
  clearInterval(window._shopTimer);
  if(resetMs>0) {
    window._termTimer=setInterval(function(){
      var el=document.getElementById('terminal-timer');
      if(!el){clearInterval(window._termTimer);return;}
      var ms=getTerminalResetTime();
      if(ms<=0){clearInterval(window._termTimer);var b=document.getElementById('panel-body');if(b&&_activeTab==='lotnisko')renderLotnisko(b);}
      else el.innerHTML='&#8987; '+formatTimer(ms);
    },1000);
  }
  if(u.shops>0) {
    window._shopTimer=setInterval(function(){
      var el=document.getElementById('shop-timer');
      if(!el){clearInterval(window._shopTimer);return;}
      var ms=G.lastShopPayout?Math.max(0,G.lastShopPayout+3600000-Date.now()):0;
      if(ms<=0) el.innerHTML='&#10003; Gotowe!';
      else el.textContent=formatTimer(ms);
    },1000);
  }
}

function buildCard(o) {
  var icon=o.icon,label=o.label,sublabel=o.sublabel,desc=o.desc,extra=o.extra||'',cost=o.cost,key=o.key,afford=o.afford,accentColor=o.accentColor||'#00d4ff';
  return '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;margin-bottom:8px;">'
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">'
    +'<div style="width:44px;height:44px;border-radius:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">'+icon+'</div>'
    +'<div style="flex:1;">'
    +'<div style="display:flex;align-items:center;gap:8px;">'
    +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+label+'</div>'
    +'<div style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:rgba(255,255,255,0.07);color:'+accentColor+';">'+sublabel+'</div>'
    +'</div>'
    +'<div style="font-size:11px;color:#5580a0;margin-top:2px;">'+desc+'</div>'
    +'</div></div>'
    +extra
    +'<button data-key="'+key+'" onclick="upgradeAirport(this.dataset.key)" '
    +'style="width:100%;padding:10px;background:'+(afford?'linear-gradient(135deg,#1a56db,'+accentColor+')':'rgba(255,255,255,0.04)')+';'
    +'border:none;border-radius:10px;color:'+(afford?'#fff':'#5580a0')+';font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:'+(afford?'pointer':'not-allowed')+';">'
    +(afford?'':'&#128274; ')+'Ulepsz za '+cost
    +'</button>'
    +'</div>';
}

function upgradeShops() {
  var ap=G.homeAirport;
  if(!ap||!ap.upgrades) return;
  var lvl=ap.upgrades.shops||0;
  if(lvl>=10){showMsg('Maks. poziom sklepów!');return;}
  if((G.points||0)<1000){showMsg('Za mało PKT! Potrzebujesz 1000 PKT');return;}
  G.points=(G.points||0)-1000;
  ap.upgrades.shops=lvl+1;
  if(!G.lastShopPayout) G.lastShopPayout=Date.now();
  save(); updateHUD();
  showMsg('Sklepy LVL '+(lvl+1)+'! Dochód: $'+((lvl+1)*1000)+'/h');
  var body=document.getElementById('panel-body');
  if(body) renderLotnisko(body);
}

function upgradeAirport(key) {
  var ap=G.homeAirport;
  if(!ap) return;
  if(!ap.upgrades) ap.upgrades={runways:1,terminal:1,hangar:1,shops:0};
  var u=ap.upgrades;
  var lvl=u[key]||0;

  if(key==='terminal') {
    var cost=getTerminalCost(lvl);
    if(G.cash<cost){showMsg('Za mało gotówki! $'+cost.toLocaleString());return;}
    G.cash-=cost; u.terminal=lvl+1;
    save(); updateHUD();
    showMsg('Terminal LVL '+u.terminal+'! Przepustowość: '+(u.terminal*1000)+' pax/2h');
  } else if(key==='hangar') {
    var hcost=lvl*200000;
    if(G.cash<hcost){showMsg('Za mało gotówki!');return;}
    G.cash-=hcost; u.hangar=lvl+1;
    save(); updateHUD();
    showMsg('Hangar LVL '+u.hangar+'! Miejsca: '+getHangarCapacity());
  } else if(key==='runways') {
    var rcosts=[0,500000,1500000,4000000,10000000];
    if(lvl>=5){showMsg('Maks. poziom!');return;}
    var rcost=rcosts[lvl]||0;
    if(G.cash<rcost){showMsg('Za mało gotówki!');return;}
    G.cash-=rcost; u.runways=lvl+1;
    save(); updateHUD();
    showMsg('Pas startowy LVL '+u.runways+'!');
  }
  var body=document.getElementById('panel-body');
  if(body) renderLotnisko(body);
}

function tickAirportIncome() {
  var ap=G.homeAirport;
  if(!ap||!ap.upgrades||!ap.upgrades.shops) return;
  var now=Date.now();
  if(!G.lastShopPayout) G.lastShopPayout=now;
  if(now-G.lastShopPayout>=3600000) {
    var payout=ap.upgrades.shops*1000;
    G.cash+=payout;
    if(!ap.income) ap.income=0;
    ap.income+=payout;
    G.lastShopPayout=now;
    save();
    showMsg('&#128722; Sklepy wypłaciły $'+payout.toLocaleString()+'!');
    if(typeof _activeTab!=='undefined'&&_activeTab==='lotnisko'){
      var body=document.getElementById('panel-body');
      if(body) renderLotnisko(body);
    }
  }
}
