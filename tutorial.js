/* -- SAMOUCZEK -- */

var TUTORIAL_STEPS = [
  {
    id: 'welcome',
    title: '👋 Witaj w Flight Manager 2026!',
    text: 'Jesteś właścicielem linii lotniczej. Twoim celem jest budowanie floty, otwieranie tras i zdobywanie pierwszego miejsca w rankingu. Przejdźmy przez podstawy.',
    action: null,
    actionLabel: 'Zacznijmy! →',
    highlight: null
  },
  {
    id: 'hud',
    title: '💰 Panel górny (HUD)',
    text: 'Na górze widzisz swoje <b>saldo</b> w dolarach, <b>PKT</b> (punkty doświadczenia) oraz <b>poziom (LVL)</b> z paskiem postępu. Za każde 10 lotów dostajesz nowy poziom!',
    action: null,
    actionLabel: 'Dalej →',
    highlight: 'hud'
  },
  {
    id: 'map',
    title: '🗺️ Mapa świata',
    text: 'Na mapie widzisz swoją <b>czerwoną bazę</b> i <b>niebieskie lotniska</b> na których masz sloty. Samoloty w locie poruszają się po mapie w czasie rzeczywistym.',
    action: null,
    actionLabel: 'Dalej →',
    highlight: 'map'
  },
  {
    id: 'fleet',
    title: '✈️ Kliknij FLOTA na dole',
    text: 'Kliknij zakładkę <b>FLOTA</b> na dolnym pasku nawigacji. Tam zobaczysz swoje samoloty i możesz zarządzać nimi.',
    action: 'tabClick("flota")',
    actionLabel: 'Kliknij FLOTA →',
    highlight: 'tab-flota',
    waitForTab: 'flota'
  },
  {
    id: 'fleet_info',
    title: '✈️ Twoja flota',
    text: 'Tutaj widzisz wszystkie swoje samoloty pogrupowane według producenta. Możesz <b>konfigurować układ siedzeń</b> (Konfig) i <b>nadawać trasy</b> (+Trasa). Ale najpierw musisz skonfigurować samolot!',
    action: null,
    actionLabel: 'Dalej →',
    highlight: null
  },
  {
    id: 'slots',
    title: '🎫 Kup slot lotniskowy',
    text: 'Zanim nadasz trasę, musisz kupić <b>slot na lotnisko docelowe</b>. Kliknij ikonkę 🛍️ sklepu w górnym rogu, wybierz <b>Kup Slot</b> i zakup dostęp do lotniska w swoim kraju.',
    action: null,
    actionLabel: 'Rozumiem →',
    highlight: null
  },
  {
    id: 'route',
    title: '🛫 Nadaj pierwszą trasę',
    text: 'Po zakupie slotu wejdź do <b>Flota</b>, skonfiguruj układ siedzeń samolotu, potem kliknij <b>+Trasa</b>. Wybierz lotnisko, ustaw ceny biletów i kliknij "Dodaj trasę".',
    action: null,
    actionLabel: 'Dalej →',
    highlight: null
  },
  {
    id: 'depart',
    title: '🚀 Kliknij TRASY na dole',
    text: 'Kliknij zakładkę <b>TRASY</b> aby zobaczyć swoje trasy. Kliknij <b>Odleć</b> przy trasie aby wysłać samolot. Dostaniesz kasę od razu przy odlocie!',
    action: 'tabClick("trasy")',
    actionLabel: 'Kliknij TRASY →',
    highlight: 'tab-trasy',
    waitForTab: 'trasy'
  },
  {
    id: 'airport',
    title: '🏢 Rozwijaj lotnisko',
    text: 'Kliknij <b>LOTNISKO</b> na dole. Ulepszaj terminal (więcej pasażerów/2h), hangar (więcej samolotów), pasy startowe i sklepy lotniskowe za PKT. Terminal ma limit przepustowości — ulepsz go gdy masz dużo samolotów!',
    action: 'tabClick("lotnisko")',
    actionLabel: 'Kliknij LOTNISKO →',
    highlight: 'tab-lotnisko',
    waitForTab: 'lotnisko'
  },
  {
    id: 'staff',
    title: '👨‍✈️ Zatrudnij personel',
    text: 'Kliknij <b>PERSONEL</b>. Każdy samolot potrzebuje <b>2 pilotów</b>, <b>2 stewardów</b> i <b>1 mechanika</b>. Bez nich samolot nie odleci! Zatrudniaj ze strony "Rynek Pracy".',
    action: 'tabClick("personel")',
    actionLabel: 'Kliknij PERSONEL →',
    highlight: 'tab-personel',
    waitForTab: 'personel'
  },
  {
    id: 'maintenance',
    title: '🔧 Naprawy i konserwacja',
    text: 'Kliknij <b>NAPRAWY</b>. Samoloty wymagają konserwacji co ~2000h lotu. Możesz też dostać losowe awarie! Zawsze sprawdzaj stan floty.',
    action: 'tabClick("naprawy")',
    actionLabel: 'Kliknij NAPRAWY →',
    highlight: 'tab-naprawy',
    waitForTab: 'naprawy'
  },
  {
    id: 'ranking',
    title: '🏆 Ranking globalny',
    text: 'Kliknij <b>RANKING</b>. Wartość Twojej floty decyduje o miejscu w rankingu. Im droższe samoloty, tym wyżej! Rywalizuj z innymi graczami z całego świata.',
    action: 'tabClick("ranking")',
    actionLabel: 'Kliknij RANKING →',
    highlight: 'tab-ranking',
    waitForTab: 'ranking'
  },
  {
    id: 'done',
    title: '🎉 Gotowy do gry!',
    text: 'Znasz już podstawy Flight Manager 2026! Pamiętaj:<br>• Kupuj sloty → Konfiguruj samolot → Nadaj trasę → Odleć<br>• Zatrudniaj personel przed lotami<br>• Rozwijaj lotnisko i flotę<br>• Pnij się w rankingu!<br><br><b>Powodzenia, Prezesie! ✈️</b>',
    action: null,
    actionLabel: '🚀 Zacznij grać!',
    highlight: null,
    isLast: true
  }
];

var _tutStep = 0;
var _tutActive = false;

function startTutorial() {
  if(G.tutorialDone) return;
  _tutStep = 0;
  _tutActive = true;
  showTutorialStep();
}

function showTutorialStep() {
  var existing = document.getElementById('tut-overlay');
  if(existing) document.body.removeChild(existing);

  if(_tutStep >= TUTORIAL_STEPS.length) {
    endTutorial(); return;
  }

  var step = TUTORIAL_STEPS[_tutStep];
  var el = document.createElement('div');
  el.id = 'tut-overlay';
  el.style.cssText = 'position:fixed;inset:0;z-index:9000;pointer-events:none;';

  // Backdrop
  var backdrop = '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(2px);"></div>';

  // Highlight element
  var highlightHtml = '';
  if(step.highlight) {
    var highlighted = document.getElementById(step.highlight);
    if(highlighted) {
      var rect = highlighted.getBoundingClientRect();
      highlightHtml = '<div style="position:absolute;'
        +'top:'+(rect.top-4)+'px;left:'+(rect.left-4)+'px;'
        +'width:'+(rect.width+8)+'px;height:'+(rect.height+8)+'px;'
        +'border:2px solid #00d4ff;border-radius:12px;box-shadow:0 0 0 4px rgba(0,212,255,0.3);'
        +'animation:tutPulse 1.5s infinite;background:transparent;"></div>';
    }
  }

  // Card position
  var cardStyle = 'position:absolute;left:50%;transform:translateX(-50%);'
    +'width:calc(100% - 32px);max-width:420px;'
    +'background:#0a1628;border:1px solid rgba(0,212,255,0.3);border-radius:20px;padding:24px;'
    +'pointer-events:all;box-shadow:0 20px 60px rgba(0,0,0,0.8);';

  // Position card based on highlight
  if(step.highlight === 'tab-lotnisko' || step.highlight === 'tab-trasy' ||
     step.highlight === 'tab-flota' || step.highlight === 'tab-personel' ||
     step.highlight === 'tab-naprawy' || step.highlight === 'tab-ranking') {
    cardStyle += 'bottom:80px;';
  } else if(step.highlight === 'hud') {
    cardStyle += 'top:70px;';
  } else {
    cardStyle += 'top:50%;transform:translate(-50%,-50%);';
  }

  var progress = '<div style="display:flex;gap:4px;margin-bottom:16px;">';
  TUTORIAL_STEPS.forEach(function(s,i){
    progress += '<div style="flex:1;height:3px;border-radius:2px;background:'+(i<=_tutStep?'#00d4ff':'rgba(255,255,255,0.1)')+'"></div>';
  });
  progress += '</div>';

  el.innerHTML = backdrop + highlightHtml +
    '<div style="'+cardStyle+'">'
    + progress
    +'<div style="font-size:16px;font-weight:900;color:#e0f0ff;margin-bottom:10px;">'+step.title+'</div>'
    +'<div style="font-size:13px;color:#a0b8cc;line-height:1.6;margin-bottom:18px;">'+step.text+'</div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;">'
    +'<button onclick="skipTutorial()" style="background:none;border:none;color:#5580a0;font-size:11px;cursor:pointer;font-family:Arial,sans-serif;padding:0;">Pomiń samouczek</button>'
    +(step.action
      ?'<button onclick="tutAction()" id="tut-btn" style="padding:10px 20px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">'+step.actionLabel+'</button>'
      :'<button onclick="tutNext()" style="padding:10px 20px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:12px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">'+step.actionLabel+'</button>'
    )
    +'</div></div>';

  // Add pulse animation
  var style = document.createElement('style');
  style.textContent = '@keyframes tutPulse{0%,100%{box-shadow:0 0 0 4px rgba(0,212,255,0.3);}50%{box-shadow:0 0 0 8px rgba(0,212,255,0.1);}}';
  el.appendChild(style);

  document.body.appendChild(el);
}

function tutNext() {
  _tutStep++;
  showTutorialStep();
}

function tutAction() {
  var step = TUTORIAL_STEPS[_tutStep];
  if(step.action) eval(step.action);
  // Wait for tab change then advance
  if(step.waitForTab) {
    var interval = setInterval(function(){
      if(_activeTab === step.waitForTab) {
        clearInterval(interval);
        setTimeout(function(){ _tutStep++; showTutorialStep(); }, 500);
      }
    }, 200);
  } else {
    _tutStep++;
    showTutorialStep();
  }
}

function skipTutorial() {
  if(confirm('Na pewno chcesz pominąć samouczek? Możesz go uruchomić ponownie z ustawień konta.')) {
    endTutorial();
  }
}

function endTutorial() {
  var el = document.getElementById('tut-overlay');
  if(el) document.body.removeChild(el);
  _tutActive = false;
  G.tutorialDone = true;
  save();
  showMsg('🎉 Samouczek zakończony! Miłej gry!');
  closePanel();
}
