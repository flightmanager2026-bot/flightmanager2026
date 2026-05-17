/* -- WIADOMOŚCI -- */

var _gameNotifications = [];

function addGameNotification(msg, type) {
  type = type || 'info';
  _gameNotifications.unshift({
    id: Date.now()+'_'+Math.random().toString(36).substr(2,4),
    msg: msg,
    type: type,
    time: Date.now(),
    read: false
  });
  // Keep max 50
  if(_gameNotifications.length > 50) _gameNotifications.pop();
  // Update badge
  updateMsgBadge();
}

function updateMsgBadge() {
  var unread = _gameNotifications.filter(function(n){return !n.read;}).length;
  var btn = document.querySelector('#navbar button[onclick*="msg"]') ||
            document.querySelector('button[onclick*="hudAction(\'msg\')"]');
  // Badge on HUD msg button
  var msgBadge = document.getElementById('msg-badge');
  if(!msgBadge && unread > 0) {
    var msgBtn = document.querySelector('button[onclick*="msg"]');
    if(msgBtn) {
      msgBadge = document.createElement('div');
      msgBadge.id = 'msg-badge';
      msgBadge.style.cssText = 'position:absolute;top:-4px;right:-4px;background:#e63946;color:#fff;'
        +'font-size:9px;font-weight:700;padding:2px 5px;border-radius:10px;min-width:16px;text-align:center;';
      msgBtn.style.position = 'relative';
      msgBtn.appendChild(msgBadge);
    }
  }
  if(msgBadge) {
    msgBadge.textContent = unread > 9 ? '9+' : unread;
    msgBadge.style.display = unread > 0 ? 'block' : 'none';
  }
}

function timeAgo(ts) {
  var diff = Date.now() - ts;
  var min = Math.floor(diff/60000);
  var h   = Math.floor(diff/3600000);
  var d   = Math.floor(diff/86400000);
  if(d > 0)   return d+'d temu';
  if(h > 0)   return h+'h temu';
  if(min > 0) return min+'min temu';
  return 'teraz';
}

function openMessages() {
  // Mark all game notifications as read
  _gameNotifications.forEach(function(n){ n.read=true; });
  updateMsgBadge();

  var html =
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">'
    +'<div style="font-size:15px;font-weight:900;color:#e0f0ff;">Wiadomości</div>'
    +'<div style="margin-left:auto;">'
    +'<button onclick="openSendMessage()" '
    +'style="padding:7px 14px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;'
    +'border-radius:10px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">'
    +'✉ Wyślij wiadomość</button>'
    +'</div></div>'

    // Tabs
    +'<div style="display:flex;gap:6px;margin-bottom:12px;">'
    +'<button onclick="showMsgTab(\'system\')" id="mtab-system" '
    +'style="flex:1;padding:7px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;border-radius:8px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">🎮 System</button>'
    +'<button onclick="showMsgTab(\'inbox\')" id="mtab-inbox" '
    +'style="flex:1;padding:7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#5580a0;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">📥 Odebrane</button>'
    +'<button onclick="showMsgTab(\'sent\')" id="mtab-sent" '
    +'style="flex:1;padding:7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#5580a0;font-size:11px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">📤 Wysłane</button>'
    +'</div>'

    +'<div id="msg-tab-content"></div>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';
  showMsgTab('system');
}

function showMsgTab(tab) {
  ['system','inbox','sent'].forEach(function(t){
    var el=document.getElementById('mtab-'+t);
    if(!el) return;
    el.style.background = t===tab?'linear-gradient(135deg,#1a56db,#00d4ff)':'rgba(255,255,255,0.05)';
    el.style.color = t===tab?'#fff':'#5580a0';
    el.style.border = t===tab?'none':'1px solid rgba(255,255,255,0.1)';
  });

  var content = document.getElementById('msg-tab-content');
  if(!content) return;

  if(tab==='system') renderSystemMessages(content);
  else if(tab==='inbox') renderInboxMessages(content);
  else renderSentMessages(content);
}

function renderSystemMessages(el) {
  if(!_gameNotifications.length) {
    el.innerHTML = '<div style="padding:40px;text-align:center;color:#5580a0;font-size:13px;">Brak powiadomień systemowych</div>';
    return;
  }

  var html = '';
  _gameNotifications.forEach(function(n) {
    var icon = n.type==='warning'?'⚠️':n.type==='error'?'🚨':n.type==='success'?'✅':'ℹ️';
    var color = n.type==='warning'?'#f5a623':n.type==='error'?'#e63946':n.type==='success'?'#00e676':'#00d4ff';
    var bg = n.type==='warning'?'rgba(245,166,35,0.06)':n.type==='error'?'rgba(230,57,70,0.06)':n.type==='success'?'rgba(0,230,118,0.06)':'rgba(0,212,255,0.06)';
    var border = n.type==='warning'?'rgba(245,166,35,0.2)':n.type==='error'?'rgba(230,57,70,0.2)':n.type==='success'?'rgba(0,230,118,0.2)':'rgba(0,212,255,0.2)';

    html +=
      '<div style="background:'+bg+';border:1px solid '+border+';border-radius:12px;padding:12px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start;">'
      +'<div style="font-size:18px;flex-shrink:0;">'+icon+'</div>'
      +'<div style="flex:1;">'
      +'<div style="font-size:12px;color:#e0f0ff;line-height:1.5;">'+n.msg+'</div>'
      +'<div style="font-size:10px;color:#5580a0;margin-top:4px;">'+timeAgo(n.time)+'</div>'
      +'</div></div>';
  });

  el.innerHTML = html;
}

function renderInboxMessages(el) {
  if(!_currentUser || !_fbDb) {
    el.innerHTML = '<div style="padding:40px;text-align:center;color:#5580a0;">Wymagane logowanie</div>';
    return;
  }

  el.innerHTML = '<div style="padding:20px;text-align:center;color:#5580a0;">Ładowanie...</div>';

  _fbDb.collection('messages')
    .where('to','==',_currentUser.uid)
    .orderBy('timestamp','desc')
    .limit(20)
    .get()
    .then(function(snap) {
      if(snap.empty) {
        el.innerHTML = '<div style="padding:40px;text-align:center;color:#5580a0;font-size:13px;">Brak wiadomości</div>';
        return;
      }
      var html = '';
      snap.forEach(function(doc) {
        var d = doc.data();
        html +=
          '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
          +'border-radius:12px;padding:12px;margin-bottom:8px;">'
          +'<div style="display:flex;justify-content:space-between;margin-bottom:6px;">'
          +'<div style="font-size:12px;font-weight:700;color:#00d4ff;">✉ Od: '+d.fromAirline+' ('+d.fromCode+')</div>'
          +'<div style="font-size:10px;color:#5580a0;">'+timeAgo(d.timestamp)+'</div>'
          +'</div>'
          +'<div style="font-size:13px;color:#e0f0ff;line-height:1.5;margin-bottom:8px;">'+escapeHtml(d.text)+'</div>'
          +'<button onclick="replyMessage(\''+d.fromUid+'\',\''+escapeHtml(d.fromAirline)+'\')" '
          +'style="padding:5px 12px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);'
          +'border-radius:6px;color:#00d4ff;font-size:10px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">↩ Odpowiedz</button>'
          +'</div>';
      });
      el.innerHTML = html;
    })
    .catch(function(e) {
      el.innerHTML = '<div style="padding:20px;text-align:center;color:#e63946;">Błąd: '+e.message+'</div>';
    });
}

function renderSentMessages(el) {
  if(!_currentUser || !_fbDb) {
    el.innerHTML = '<div style="padding:40px;text-align:center;color:#5580a0;">Wymagane logowanie</div>';
    return;
  }

  el.innerHTML = '<div style="padding:20px;text-align:center;color:#5580a0;">Ładowanie...</div>';

  _fbDb.collection('messages')
    .where('from','==',_currentUser.uid)
    .orderBy('timestamp','desc')
    .limit(20)
    .get()
    .then(function(snap) {
      if(snap.empty) {
        el.innerHTML = '<div style="padding:40px;text-align:center;color:#5580a0;font-size:13px;">Brak wysłanych wiadomości</div>';
        return;
      }
      var html = '';
      snap.forEach(function(doc) {
        var d = doc.data();
        html +=
          '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);'
          +'border-radius:12px;padding:12px;margin-bottom:8px;">'
          +'<div style="display:flex;justify-content:space-between;margin-bottom:6px;">'
          +'<div style="font-size:12px;font-weight:700;color:#a78bfa;">📤 Do: '+d.toAirline+'</div>'
          +'<div style="font-size:10px;color:#5580a0;">'+timeAgo(d.timestamp)+'</div>'
          +'</div>'
          +'<div style="font-size:13px;color:#e0f0ff;line-height:1.5;">'+escapeHtml(d.text)+'</div>'
          +'</div>';
      });
      el.innerHTML = html;
    })
    .catch(function() {
      el.innerHTML = '<div style="padding:40px;text-align:center;color:#5580a0;">Brak wysłanych</div>';
    });
}

function openSendMessage(toUid, toAirlineName) {
  var html =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
    +'<button onclick="openMessages()" style="background:none;border:none;color:#5580a0;cursor:pointer;font-size:22px;padding:0;">&#8592;</button>'
    +'<div style="font-size:15px;font-weight:700;color:#00d4ff;">Wyślij wiadomość</div></div>'

    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:6px;">NAZWA LINII LOTNICZEJ ODBIORCY</div>'
    +'<input id="msg-to-airline" type="text" placeholder="np. Sky Airlines" value="'+(toAirlineName||'')+'" '
    +'style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:10px;padding:11px;'
    +'color:#fff;font-size:13px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;margin-bottom:12px;">'

    +'<div style="font-size:10px;color:#5580a0;letter-spacing:2px;margin-bottom:6px;">WIADOMOŚĆ</div>'
    +'<textarea id="msg-text" placeholder="Wpisz wiadomość..." rows="5" '
    +'style="width:100%;background:#0d1b2a;border:1px solid rgba(0,212,255,0.3);border-radius:10px;padding:11px;'
    +'color:#fff;font-size:13px;font-family:Arial,sans-serif;outline:none;box-sizing:border-box;resize:none;margin-bottom:14px;"></textarea>'

    +'<div id="send-status" style="display:none;font-size:12px;margin-bottom:10px;padding:8px;border-radius:8px;text-align:center;"></div>'

    +'<button onclick="sendMessage()" '
    +'style="width:100%;padding:12px;background:linear-gradient(135deg,#1a56db,#00d4ff);border:none;'
    +'border-radius:12px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:Arial,sans-serif;">Wyślij ✉</button>';

  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal').style.display = 'flex';

  if(toUid) {
    var el = document.getElementById('msg-to-uid');
    if(!el) {
      el = document.createElement('input');
      el.id = 'msg-to-uid';
      el.type = 'hidden';
      el.value = toUid;
      document.getElementById('modal-body').appendChild(el);
    }
  }
}

function replyMessage(toUid, toAirline) {
  openSendMessage(toUid, toAirline);
  // Pre-fill uid
  setTimeout(function(){
    var el=document.getElementById('modal-body');
    var hidden=document.createElement('input');
    hidden.type='hidden'; hidden.id='msg-to-uid'; hidden.value=toUid;
    el.appendChild(hidden);
  },100);
}

function sendMessage() {
  if(!_currentUser || !_fbDb) { showMsg('Wymagane logowanie'); return; }

  var toAirline = (document.getElementById('msg-to-airline')||{}).value.trim();
  var text = (document.getElementById('msg-text')||{}).value.trim();
  var prefilledUid = (document.getElementById('msg-to-uid')||{}).value;

  if(!toAirline) { setMsgStatus('Wpisz nazwę linii odbiorcy', 'error'); return; }
  if(!text) { setMsgStatus('Wpisz treść wiadomości', 'error'); return; }
  if(text.length > 500) { setMsgStatus('Wiadomość max 500 znaków', 'error'); return; }

  setMsgStatus('Wysyłanie...', 'info');

  function doSend(toUid, toAirlineName) {
    _fbDb.collection('messages').add({
      from: _currentUser.uid,
      fromAirline: G.airline ? G.airline.name : 'Unknown',
      fromCode: G.airline ? G.airline.iata : '??',
      to: toUid,
      toAirline: toAirlineName,
      text: text,
      timestamp: Date.now(),
      read: false
    }).then(function(){
      setMsgStatus('✓ Wysłano do '+toAirlineName+'!', 'success');
      setTimeout(function(){ openMessages(); }, 1500);
    }).catch(function(e){
      setMsgStatus('Błąd: '+e.message, 'error');
    });
  }

  if(prefilledUid) {
    doSend(prefilledUid, toAirline);
  } else {
    // Find player by airline name
    _fbDb.collection('ranking').where('airline','==',toAirline).limit(1).get()
      .then(function(snap) {
        if(snap.empty) {
          setMsgStatus('Nie znaleziono linii "'+toAirline+'"', 'error');
          return;
        }
        var d = snap.docs[0].data();
        doSend(d.uid, d.airline);
      })
      .catch(function(e){ setMsgStatus('Błąd wyszukiwania: '+e.message, 'error'); });
  }
}

function setMsgStatus(msg, type) {
  var el = document.getElementById('send-status');
  if(!el) return;
  el.style.display='block';
  el.style.color = type==='error'?'#e63946':type==='success'?'#00e676':'#00d4ff';
  el.style.background = type==='error'?'rgba(230,57,70,0.1)':type==='success'?'rgba(0,230,118,0.1)':'rgba(0,212,255,0.1)';
  el.style.border = '1px solid '+(type==='error'?'rgba(230,57,70,0.3)':type==='success'?'rgba(0,230,118,0.3)':'rgba(0,212,255,0.3)');
  el.textContent = msg;
}

function escapeHtml(str) {
  return (str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
