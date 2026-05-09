/* -- LOTNISKO -- */
function renderLotnisko(body) {
  var ap=G.homeAirport;
  if(!ap){body.innerHTML='<div style="padding:20px;color:#5580a0;text-align:center;">Brak bazy.</div>';return;}
  var slots=G.airports.filter(function(a){return !a.isHome;});
  var sh=slots.map(function(s){return '<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="font-size:13px;color:#e0f0ff;">'+s.icao+' - '+s.city+'</span><span style="font-size:11px;color:#5580a0;">'+s.country+'</span></div>';}).join('');
  body.innerHTML='<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(229,57,70,0.4);border-radius:12px;padding:14px;margin-bottom:14px;">'
    +'<div style="font-size:11px;color:#e63946;font-weight:700;margin-bottom:4px;">BAZA GLOWNA</div>'
    +'<div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:2px;">'+ap.city+'</div>'
    +'<div style="font-size:12px;color:#5580a0;">'+ap.icao+' &bull; '+ap.country+'</div>'
    +'</div>'
    +'<div style="font-size:11px;color:#5580a0;letter-spacing:1px;margin-bottom:8px;">SLOTY ('+slots.length+')</div>'
    +(sh||'<div style="color:#5580a0;font-size:12px;">Brak. Kup w Sklepie.</div>');
}

