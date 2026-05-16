/* -- PANELS -- */
var _activeTab=null;

function tabClick(name) {
  var tabs=['lotnisko','trasy','flota','personel','ranking','naprawy'];
  tabs.forEach(function(t){
    var el=document.getElementById('tab-'+t);
    if(!el) return;
    if(t===name){el.style.color='#00d4ff';el.style.borderTop='2.5px solid #00d4ff';}
    else{el.style.color='#4a6070';el.style.borderTop='2.5px solid transparent';}
  });
  if(_activeTab===name){closePanel();return;}
  _activeTab=name;
  openPanel(name);
}

function openPanel(name) {
  var p=document.getElementById('panel');
  var body=document.getElementById('panel-body');
  var title=document.getElementById('panel-title');
  p.style.transform='translateY(0)';
  if(name==='flota'){title.textContent='FLOTA';renderFlotaMain(body);}
  else if(name==='trasy'){title.textContent='TRASY';renderTrasy(body);}
  else if(name==='lotnisko'){title.textContent='LOTNISKO';renderLotnisko(body);}
  else if(name==='personel'){title.textContent='PERSONEL';renderPersonel(body);}
  else if(name==='ranking'){title.textContent='RANKING';updateRankingValue();renderRanking(body);}
  else if(name==='naprawy'){title.textContent='NAPRAWY';renderNaprawy(body);}
  else if(name==='bonus'){title.textContent='BONUS';renderBonus(body);}
  else{title.textContent=name.toUpperCase();body.innerHTML='<div style="padding:20px;color:#5580a0;text-align:center;">Wkrotce!</div>';}
}

function closePanel() {
  _activeTab=null;
  document.getElementById('panel').style.transform='translateY(100%)';
  ['lotnisko','trasy','flota','personel','ranking','naprawy'].forEach(function(t){
    var el=document.getElementById('tab-'+t);
    if(el){el.style.color='#4a6070';el.style.borderTop='2.5px solid transparent';}
  });
}


function renderBonus(body) {
  if(typeof showRewardedAd === 'function') { showRewardedAd(); }
  body.innerHTML = '<div style="padding:20px;text-align:center;">'
    +'<div style="font-size:40px;margin-bottom:12px;">🎁</div>'
    +'<div style="font-size:15px;font-weight:700;color:#e0f0ff;margin-bottom:8px;">Bonus</div>'
    +'<button onclick="showRewardedAd()" style="padding:12px 24px;background:linear-gradient(135deg,#f5a623,#e63946);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Obejrzyj reklamę +50 PKT +$5,000</button>'
    +'</div>';
}

function renderNaprawy(body) {
  var html =
    '<div style="background:linear-gradient(135deg,rgba(245,166,35,0.08),rgba(245,166,35,0.03));border:1px solid rgba(245,166,35,0.2);border-radius:14px;padding:16px;margin-bottom:12px;">'
    +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">'
    +'<div style="font-size:32px;">🔧</div>'
    +'<div><div style="font-size:15px;font-weight:700;color:#e0f0ff;">Centrum Napraw</div>'
    +'<div style="font-size:11px;color:#5580a0;">Konserwacja i naprawy floty</div></div></div>'
    +'</div>';

  if(!G.fleet.length) {
    html += '<div style="padding:30px;text-align:center;color:#5580a0;">Brak samolotów we flocie</div>';
    body.innerHTML = html;
    return;
  }

  html += '<div style="font-size:9px;color:#5580a0;letter-spacing:3px;margin-bottom:10px;">STAN FLOTY</div>';

  G.fleet.forEach(function(ac) {
    if(!ac.maintenance) ac.maintenance = {condition:100, lastService:Date.now()};
    var cond = ac.maintenance.condition || 100;
    var condColor = cond>75?'#00e676':cond>50?'#f5a623':'#e63946';
    var repairCost = Math.round((100-cond) * ac.seats * 50);

    html +=
      '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">'
      +'<div style="font-size:20px;">✈</div>'
      +'<div style="flex:1;">'
      +'<div style="font-size:13px;font-weight:700;color:#e0f0ff;">'+ac.model+'</div>'
      +'<div style="font-size:10px;color:#5580a0;">'+ac.reg+' &bull; Stan: <span style="color:'+condColor+';font-weight:700;">'+cond+'%</span></div>'
      +'</div>'
      +(cond<100
        ?'<button onclick="repairAircraft(this.dataset.id)" data-id='+ac.id+' style="padding:6px 12px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Napraw $'+repairCost.toLocaleString()+'</button>'
        :'<div style="font-size:10px;color:#00e676;font-weight:700;">✓ Sprawny</div>'
      )
      +'</div>'
      +'<div style="height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">'
      +'<div style="height:100%;width:'+cond+'%;background:'+condColor+';border-radius:2px;"></div>'
      +'</div></div>';
  });

  body.innerHTML = html;
}

function repairAircraft(acId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0];
  if(!ac) return;
  if(!ac.maintenance) ac.maintenance={condition:100,lastService:Date.now()};
  var cond = ac.maintenance.condition||100;
  var cost = Math.round((100-cond)*ac.seats*50);
  if(G.cash < cost){showMsg('Za mało gotówki! Potrzebujesz $'+cost.toLocaleString());return;}
  G.cash -= cost;
  ac.maintenance.condition = 100;
  ac.maintenance.lastService = Date.now();
  save(); updateHUD();
  showMsg('✓ '+ac.model+' naprawiony! Koszt: $'+cost.toLocaleString());
  var body=document.getElementById('panel-body');
  if(body) renderNaprawy(body);
}
