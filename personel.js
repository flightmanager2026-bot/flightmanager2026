/* -- PERSONEL -- */
var _personelTab='piloci';
function renderPersonel(body) {
  var subtabs=[{id:'piloci',label:'Piloci'},{id:'obsluga',label:'Obsluga'},{id:'zarzad',label:'Zarzad'},{id:'szkolenia',label:'Szkolenia'}];
  var tabs='<div style="display:flex;gap:6px;margin-bottom:14px;overflow-x:auto;">';
  subtabs.forEach(function(t){
    var active=_personelTab===t.id;
    tabs+='<button onclick="setPersonelTab(this)" data-tab="'+t.id+'" style="flex-shrink:0;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:700;font-family:Arial,sans-serif;cursor:pointer;border:1px solid;'+(active?'background:#e63946;border-color:#e63946;color:#fff;':'background:transparent;border-color:#1e3a5f;color:#5580a0;')+'">'+t.label+'</button>';
  });
  tabs+='</div>';
  body.innerHTML=tabs+buildWkrotce(subtabs.filter(function(t){return t.id===_personelTab;})[0].label);
}
function setPersonelTab(el){ var tab=el.dataset?el.dataset.tab:el;_personelTab=tab;var body=document.getElementById('panel-body');if(body)renderPersonel(body);}

