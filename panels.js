/* -- PANELS -- */
var _activeTab=null;

function tabClick(name) {
  var tabs=['lotnisko','trasy','flota','bonus','personel'];
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
  else{title.textContent=name.toUpperCase();body.innerHTML='<div style="padding:20px;color:#5580a0;text-align:center;">Wkrotce!</div>';}
}

function closePanel() {
  _activeTab=null;
  document.getElementById('panel').style.transform='translateY(100%)';
  ['lotnisko','trasy','flota','bonus','personel'].forEach(function(t){
    var el=document.getElementById('tab-'+t);
    if(el){el.style.color='#4a6070';el.style.borderTop='2.5px solid transparent';}
  });
}

