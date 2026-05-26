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
  if(!ap){body.innerHTML='<div style="padding:20px;color:#94a3b8;text-align:center;">Brak bazy</div>';return;}
  if(!ap.upgrades) ap.upgrades={runways:1,terminal:1,hangar:1,shops:0};
  var u=ap.upgrades;
  var used=getPassengersLast2h(), cap=getTerminalCapacity();
  var pct=Math.min(100,Math.round(used/cap*100));
  var barColor=pct>=100?'#ef4444':pct>=75?'#f97316':'#06b6d4';
  var resetMs=getTerminalResetTime();
  var shopIncome=(u.shops||0)*1000;
  var nextPayout=G.lastShopPayout?Math.max(0,G.lastShopPayout+3600000-Date.now()):0;
  var hangarCap=getHangarCapacity();
  var fleetUsed=G.fleet.length;

  body.innerHTML=

  '<div style="position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(6,182,212,0.08));border:1px solid rgba(139,92,246,0.25);border-radius:18px;padding:18px;margin-bottom:10px;">'
  +'<div style="display:flex;align-items:flex-start;gap:14px;">'
  +'<div style="width:52px;height:52px;border-radius:14px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;">✈️</div>'
  +'<div style="flex:1;">'
  +'<div style="font-size:18px;font-weight:900;color:#f1f5f9;">'+ap.city+'</div>'
  +'<div style="font-size:11px;color:rgba(6,182,212,0.8);font-weight:600;letter-spacing:2px;margin-top:2px;">'+ap.icao+' • '+ap.country+'</div>'
  +'</div>'
  +'<div style="text-align:right;">'
  +(shopIncome>0
    ?'<div style="font-size:16px;font-weight:900;color:#10b981;">$'+shopIncome.toLocaleString()+'<span style="font-size:10px;font-weight:500;color:rgba(16,185,129,0.6);">/h</span></div>'
    +'<div style="font-size:10px;color:#94a3b8;margin-top:1px;">dochód sklepów</div>'
    :'<div style="font-size:11px;color:#94a3b8;">brak dochodu</div>'
  )
  +'</div></div>'
  +'<div style="display:flex;gap:16px;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.07);">'
  +'<div style="flex:1;text-align:center;"><div style="font-size:20px;font-weight:900;color:#f97316;">LVL '+u.terminal+'</div><div style="font-size:9px;color:#94a3b8;letter-spacing:1px;margin-top:1px;">TERMINAL</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,0.07);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:20px;font-weight:900;color:#06b6d4;">'+fleetUsed+'/'+hangarCap+'</div><div style="font-size:9px;color:#94a3b8;letter-spacing:1px;margin-top:1px;">HANGAR</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,0.07);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:20px;font-weight:900;color:#8b5cf6;">'+u.runways+'/5</div><div style="font-size:9px;color:#94a3b8;letter-spacing:1px;margin-top:1px;">PASY</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,0.07);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:20px;font-weight:900;color:#10b981;">'+(u.shops||0)+'/10</div><div style="font-size:9px;color:#94a3b8;letter-spacing:1px;margin-top:1px;">SKLEPY</div></div>'
  +'</div></div>'

  +'<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;margin-bottom:10px;">'
  +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
  +'<div style="display:flex;align-items:center;gap:8px;">'
  +'<div style="width:8px;height:8px;border-radius:50%;background:'+barColor+';box-shadow:0 0 6px '+barColor+';"></div>'
  +'<div style="font-size:12px;font-weight:700;color:#f1f5f9;">Przepustowość terminala</div>'
  +'</div>'
  +'<div style="font-size:13px;font-weight:900;color:'+barColor+';">'+used+' / '+cap+' pax</div>'
  +'</div>'
  +'<div style="height:8px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;margin-bottom:10px;">'
  +'<div style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,'+barColor+',rgba(6,182,212,0.5));border-radius:4px;"></div>'
  +'</div>'
  +'<div style="display:flex;justify-content:space-between;align-items:center;">'
  +'<div style="font-size:10px;color:#94a3b8;">Okno: 2 godziny</div>'
  +(resetMs>0
    ?'<div style="font-size:11px;font-weight:700;color:#f97316;background:rgba(249,115,22,0.08);padding:3px 10px;border-radius:20px;border:1px solid rgba(249,115,22,0.2);" id="terminal-timer">⌛ '+formatTimer(resetMs)+'</div>'
    :'<div style="font-size:11px;color:#10b981;font-weight:700;">✓ Limit wolny</div>'
  )
  +'</div>'
  +(pct>=100?'<div style="margin-top:8px;padding:8px 12px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:8px;font-size:11px;color:#ef4444;">⚠ Terminal pełny — ulepsz aby wysyłać więcej samolotów</div>':'')
  +'</div>'

  +'<div style="font-size:9px;font-weight:700;color:#94a3b8;letter-spacing:3px;margin:14px 0 8px;">ULEPSZENIA</div>'

  +buildCard({
    icon:'🏢',label:'Terminal',sublabel:'LVL '+u.terminal,
    desc:'Przepustowość: <b style="color:#f1f5f9">'+(u.terminal*1000)+' pax/2h</b> → '+(u.terminal+1)*1000+' po ulepszeniu',
    cost:'$'+getTerminalCost(u.terminal+1).toLocaleString(),costRaw:getTerminalCost(u.terminal+1),
    key:'terminal',afford:G.cash>=getTerminalCost(u.terminal+1),accentColor:'#06b6d4'
  })

  +buildCard({
    icon:'🏗',label:'Hangar',sublabel:'LVL '+u.hangar,
    desc:'Miejsca: <b style="color:#f1f5f9">'+hangarCap+' sam.</b> → '+(hangarCap+5)+' po ulepszeniu',
    extra:'<div style="margin-bottom:8px;"><div style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:4px;"><span>Flota</span><span style="color:'+(fleetUsed>=hangarCap?'#ef4444':'#10b981')+';font-weight:700;">'+fleetUsed+'/'+hangarCap+'</span></div>'
      +'<div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">'
      +'<div style="height:100%;width:'+Math.min(100,Math.round(fleetUsed/hangarCap*100))+'%;background:'+(fleetUsed>=hangarCap?'#ef4444':'linear-gradient(90deg,#06b6d4,#8b5cf6)')+';border-radius:2px;"></div>'
      +'</div></div>',
    cost:'$'+((u.hangar)*200000).toLocaleString(),costRaw:u.hangar*200000,
    key:'hangar',afford:G.cash>=u.hangar*200000,accentColor:'#8b5cf6'
  })

  +(u.runways<5
    ?buildCard({
      icon:'🛫',label:'Pas startowy',sublabel:u.runways+'/5',
      desc:'Więcej pasów = więcej równoczesnych startów',
      cost:'$'+([0,500000,1500000,4000000,10000000][u.runways]||0).toLocaleString(),
      costRaw:[0,500000,1500000,4000000,10000000][u.runways]||0,
      key:'runways',afford:G.cash>=([0,500000,1500000,4000000,10000000][u.runways]||0),accentColor:'#ec4899'
    })
    :'<div style="background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);border-radius:14px;padding:14px;margin-bottom:8px;display:flex;align-items:center;gap:10px;">'
    +'<div style="width:40px;height:40px;border-radius:10px;background:rgba(16,185,129,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;">🛫</div>'
    +'<div><div style="font-size:13px;font-weight:700;color:#f1f5f9;">Pas startowy <span style="color:#10b981;font-size:10px;">MAX</span></div>'
    +'<div style="font-size:11px;color:#94a3b8;margin-top:2px;">5/5 pasów</div></div></div>'
  )

  +'<div style="font-size:9px;font-weight:700;color:#94a3b8;letter-spacing:3px;margin:14px 0 8px;">DOCHÓD PASYWNY</div>'
  +'<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(249,115,22,0.2);border-radius:14px;padding:14px;margin-bottom:8px;">'
  +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">'
  +'<div style="width:44px;height:44px;border-radius:12px;background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.25);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🛒</div>'
  +'<div style="flex:1;">'
  +'<div style="display:flex;align-items:center;gap:8px;">'
  +'<div style="font-size:13px;font-weight:700;color:#f1f5f9;">Sklepy lotniskowe</div>'
  +'<div style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:rgba(249,115,22,0.15);color:#f97316;">LVL '+(u.shops||0)+'/10</div>'
  +'</div>'
  +'<div style="font-size:11px;color:#94a3b8;margin-top:2px;">'
  +(u.shops>0?'Dochód: <b style="color:#10b981">$'+shopIncome.toLocaleString()+'/h</b> • Następny: $'+((u.shops+1)*1000)+'/h':'Brak — ulepsz aby generować dochód')
  +'</div></div></div>'
  +(u.shops>0
    ?'<div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:10px 12px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;">'
    +'<div style="font-size:11px;color:#94a3b8;">Następna wypłata</div>'
    +(nextPayout>0
      ?'<div style="font-size:13px;font-weight:900;color:#f97316;" id="shop-timer">'+formatTimer(nextPayout)+'</div>'
      :'<div style="font-size:12px;font-weight:700;color:#10b981;" id="shop-timer">✓ Gotowe!</div>'
    )+'</div>'
    :''
  )
  +'<div style="margin-bottom:10px;"><div style="height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">'
  +'<div style="height:100%;width:'+Math.round((u.shops||0)/10*100)+'%;background:linear-gradient(90deg,#f97316,#eab308);border-radius:2px;"></div></div></div>'
  +(u.shops<10
    ?'<button onclick="upgradeShops()" style="width:100%;padding:10px;background:'
    +((G.points||0)>=1000?'linear-gradient(135deg,#f97316,#eab308)':'rgba(255,255,255,0.04)')
    +';border:none;border-radius:10px;color:'
    +((G.points||0)>=1000?'#000':'#94a3b8')
    +';font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:'
    +((G.points||0)>=1000?'pointer':'not-allowed')
    +';">⭐ Ulepsz za 1000 PKT <span style="opacity:0.7;">(masz '+(G.points||0)+')</span></button>'
    :'<div style="padding:10px;text-align:center;font-size:12px;color:#f97316;font-weight:700;background:rgba(249,115,22,0.06);border-radius:10px;">✓ Maks. poziom sklepów</div>'
  )
  +'</div>';

  clearInterval(window._termTimer);
  clearInterval(window._shopTimer);
  if(resetMs>0){
    window._termTimer=setInterval(function(){
      var el=document.getElementById('terminal-timer');
      if(!el){clearInterval(window._termTimer);return;}
      var ms=getTerminalResetTime();
      if(ms<=0){clearInterval(window._termTimer);var b=document.getElementById('panel-body');if(b&&typeof _activeTab!=='undefined'&&_activeTab==='lotnisko')renderLotnisko(b);}
      else el.innerHTML='⌛ '+formatTimer(ms);
    },1000);
  }
  if(u.shops>0){
    window._shopTimer=setInterval(function(){
      var el=document.getElementById('shop-timer');
      if(!el){clearInterval(window._shopTimer);return;}
      var ms=G.lastShopPayout?Math.max(0,G.lastShopPayout+3600000-Date.now()):0;
      if(ms<=0) el.innerHTML='✓ Gotowe!';
      else el.textContent=formatTimer(ms);
    },1000);
  }
}

function buildCard(o) {
  var icon=o.icon,label=o.label,sublabel=o.sublabel,desc=o.desc,extra=o.extra||'',cost=o.cost,key=o.key,afford=o.afford,accentColor=o.accentColor||'#06b6d4';
  return '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px;margin-bottom:8px;">'
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">'
    +'<div style="width:44px;height:44px;border-radius:12px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">'+icon+'</div>'
    +'<div style="flex:1;">'
    +'<div style="display:flex;align-items:center;gap:8px;">'
    +'<div style="font-size:13px;font-weight:700;color:#f1f5f9;">'+label+'</div>'
    +'<div style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:rgba(255,255,255,0.07);color:'+accentColor+';">'+sublabel+'</div>'
    +'</div>'
    +'<div style="font-size:11px;color:#94a3b8;margin-top:2px;">'+desc+'</div>'
    +'</div></div>'
    +extra
    +'<button data-key="'+key+'" onclick="upgradeAirport(this.dataset.key)" '
    +'style="width:100%;padding:10px;background:'+(afford?'linear-gradient(135deg,'+accentColor+','+accentColor+'aa)':'rgba(255,255,255,0.04)')+';'
    +'border:none;border-radius:10px;color:'+(afford?'#fff':'#94a3b8')+';font-size:12px;font-weight:700;font-family:Arial,sans-serif;cursor:'+(afford?'pointer':'not-allowed')+';">'
    +(afford?'':'🔒 ')+'Ulepsz za '+cost
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

  if(key==='terminal') {
    var cost=getTerminalCost(u.terminal+1);
    if(G.cash<cost){showMsg('Za mało gotówki! $'+cost.toLocaleString());return;}
    G.cash-=cost; u.terminal++;
    save(); updateHUD();
    showMsg('Terminal LVL '+u.terminal+'! Przepustowość: '+(u.terminal*1000)+' pax/2h');
  } else if(key==='hangar') {
    var hcost=(u.hangar)*200000;
    if(G.cash<hcost){showMsg('Za mało gotówki!');return;}
    G.cash-=hcost; u.hangar++;
    save(); updateHUD();
    showMsg('Hangar LVL '+u.hangar+'! Miejsca: '+getHangarCapacity());
  } else if(key==='runways') {
    var rcosts=[0,500000,1500000,4000000,10000000];
    var lvl=u.runways||1;
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
    G.lastShopPayout=now;
    save();
    showMsg('🛒 Sklepy wypłaciły $'+payout.toLocaleString()+'!');
    if(typeof _activeTab!=='undefined'&&_activeTab==='lotnisko'){
      var body=document.getElementById('panel-body');
      if(body) renderLotnisko(body);
    }
  }
}
