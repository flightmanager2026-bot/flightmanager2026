/* -- PANELS -- */
var _activeTab=null;

function tabClick(name) {
  var tabs=['lotnisko','trasy','flota','personel','ranking','naprawy'];
  tabs.forEach(function(t){
    var el=document.getElementById('tab-'+t);
    if(!el) return;
    if(t===name){
      el.style.color='#8b5cf6';
      el.style.borderTopColor='#8b5cf6';
      el.classList.add('active-tab');
    } else {
      el.style.color='#4b4b6b';
      el.style.borderTopColor='transparent';
      el.classList.remove('active-tab');
    }
  });
  if(_activeTab===name){closePanel();return;}
  _activeTab=name;
  openPanel(name);
}

function openPanel(name) {
  var p=document.getElementById('panel');
  var body=document.getElementById('panel-body');
  var title=document.getElementById('panel-title');
  if(!p||!body||!title) return;
  p.style.transform='translateY(0)';

  if(name==='lotnisko'){
    title.textContent='BAZA';
    if(typeof renderLotnisko==='function') renderLotnisko(body);
    else body.innerHTML='<div style="padding:20px;color:#94a3b8;text-align:center;">Błąd: brak renderLotnisko</div>';
  }
  else if(name==='trasy'){
    title.textContent='TRASY';
    if(typeof renderTrasy==='function') renderTrasy(body);
    else body.innerHTML='<div style="padding:20px;color:#94a3b8;text-align:center;">Błąd: brak renderTrasy</div>';
  }
  else if(name==='flota'){
    title.textContent='FLOTA';
    if(typeof renderFlotaMain==='function') renderFlotaMain(body);
    else body.innerHTML='<div style="padding:20px;color:#94a3b8;text-align:center;">Błąd: brak renderFlotaMain</div>';
  }
  else if(name==='personel'){
    title.textContent='ZAŁOGA';
    if(typeof renderPersonel==='function') renderPersonel(body);
    else body.innerHTML='<div style="padding:20px;color:#94a3b8;text-align:center;">Błąd: brak renderPersonel</div>';
  }
  else if(name==='ranking'){
    title.textContent='RANKING';
    if(typeof updateRankingValue==='function') updateRankingValue();
    if(typeof renderRanking==='function') renderRanking(body);
    else body.innerHTML='<div style="padding:20px;color:#94a3b8;text-align:center;">Błąd: brak renderRanking</div>';
  }
  else if(name==='naprawy'){
    title.textContent='SERWIS';
    if(typeof renderNaprawy==='function') renderNaprawy(body);
    else body.innerHTML='<div style="padding:20px;color:#94a3b8;text-align:center;">Błąd: brak renderNaprawy</div>';
  }
  else {
    title.textContent=name.toUpperCase();
    body.innerHTML='<div style="padding:20px;color:#94a3b8;text-align:center;">Wkrótce!</div>';
  }
}

function closePanel() {
  _activeTab=null;
  var p=document.getElementById('panel');
  if(p) p.style.transform='translateY(100%)';
  ['lotnisko','trasy','flota','personel','ranking','naprawy'].forEach(function(t){
    var el=document.getElementById('tab-'+t);
    if(el){
      el.style.color='#4b4b6b';
      el.style.borderTopColor='transparent';
      el.classList.remove('active-tab');
    }
  });
}

function repairAircraft(acId) {
  var ac = G.fleet.filter(function(a){return a.id===acId;})[0];
  if(!ac) return;
  if(!ac.maintenance) ac.maintenance={condition:100,lastService:Date.now()};
  var cond = ac.maintenance.condition||100;
  var cost = Math.round((100-cond)*ac.seats*50);
  if(G.cash<cost){showMsg('Za mało gotówki! $'+cost.toLocaleString());return;}
  G.cash-=cost;
  ac.maintenance.condition=100;
  ac.maintenance.lastService=Date.now();
  save(); updateHUD();
  showMsg('✓ '+ac.model+' naprawiony! -$'+cost.toLocaleString());
  var body=document.getElementById('panel-body');
  if(body&&_activeTab==='naprawy') renderNaprawy(body);
}
