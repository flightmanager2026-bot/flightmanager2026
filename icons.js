var ICONS = {
  nav_lotnisko: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  nav_trasy:    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  nav_flota:    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
  nav_bonus:    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  nav_personel: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  plane: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="COLOR"/></svg>',
  pin: '<svg width="22" height="30" viewBox="0 0 28 38"><path d="M14 0C6.27 0 0 6.27 0 14c0 9.8 14 24 14 24S28 23.8 28 14C28 6.27 21.73 0 14 0z" fill="COLOR" stroke="rgba(255,255,255,0.9)" stroke-width="2"/><circle cx="14" cy="14" r="6" fill="white"/></svg>'
};

function getIcon(name, color) {
  var icon = ICONS[name] || '';
  if(color) icon = icon.replace(/COLOR/g, color);
  return icon;
}

function makePinIcon(color, label, isHome) {
  var sz = isHome ? 26 : 22;
  var h = sz * 30 / 22;
  return L.divIcon({
    className: '',
    html: '<div style="position:relative;display:inline-block;text-align:center;">'
      + getIcon('pin', color).replace('width="22" height="30"', 'width="'+sz+'" height="'+h+'"')
      + '<div style="position:absolute;top:'+(h+2)+'px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:'+color+';font-family:Arial,sans-serif;white-space:nowrap;text-shadow:0 0 3px #fff,0 0 3px #fff;">'+label+'</div>'
      + '</div>',
    iconSize: [sz, h], iconAnchor: [sz/2, h], popupAnchor: [0, -(h+2)]
  });
}
