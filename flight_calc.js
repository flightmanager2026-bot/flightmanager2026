/* -- FLIGHT CALCULATOR -- */

/* Predkosci przelotowe (km/h) */
var AC_SPEEDS = {
  'Boeing 737-800':  840,
  'Airbus A320neo':  833,
  'Airbus A321neo':  833,
  'Airbus A380-800': 903,
  'Boeing 787-9':    903,
  'ATR-72':          510
};

/* Zasieg (km) */
var AC_RANGE = {
  'Boeing 737-800':  5765,
  'Airbus A320neo':  6300,
  'Airbus A321neo':  7400,
  'Airbus A380-800': 15200,
  'Boeing 787-9':    14140,
  'ATR-72':          1528
};

/* Konfiguracja miejsc */
var AC_SEATS = {
  'Boeing 737-800':  {eco:162, biz:0, prem:0, first:0, total:162},
  'Airbus A320neo':  {eco:180, biz:0, prem:0, first:0, total:180},
  'Airbus A321neo':  {eco:244, biz:0, prem:0, first:0, total:244},
  'Airbus A380-800': {eco:400, biz:0, prem:0, first:0, total:400},
  'Boeing 787-9':    {eco:296, biz:0, prem:0, first:0, total:296},
  'ATR-72':          {eco:72,  biz:0, prem:0, first:0, total:72}
};

/* Oblicz dystans miedzy dwoma punktami (Haversine) w km */
function calcDistance(lat1, lng1, lat2, lng2) {
  var R = 6371;
  var dLat = (lat2-lat1) * Math.PI/180;
  var dLng = (lng2-lng1) * Math.PI/180;
  var a = Math.sin(dLat/2)*Math.sin(dLat/2)
    + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)
    * Math.sin(dLng/2)*Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

/* Oblicz czas lotu w minutach */
function calcFlightTime(dist, model) {
  var speed = AC_SPEEDS[model] || 800;
  var taxiTime = 20; // kołowanie + start + lądowanie
  return Math.round(dist/speed * 60) + taxiTime;
}

/* Oblicz realny czas lotu jako string "1h 25min" */
function formatFlightTime(minutes) {
  var h = Math.floor(minutes/60);
  var m = minutes % 60;
  if(h === 0) return m + 'min';
  if(m === 0) return h + 'h';
  return h + 'h ' + m + 'min';
}

/* Oblicz dystans trasy */
function getRouteDist(route) {
  if(route.distKm) return route.distKm;
  if(route.fromLat && route.toLat)
    return Math.round(calcDistance(route.fromLat, route.fromLng, route.toLat, route.toLng));
  return 0;
}

/* Sprawdz czy samolot ma zasieg na trase */
function checkRange(model, distKm) {
  var range = AC_RANGE[model] || 2000;
  return distKm <= range;
}

/* Oblicz zarobek z trasy */
function calcRouteRevenue(route, ac) {
  if(!ac) return 0;

  // Get flight duration in minutes
  var minutes = route.durationMin || 0;
  if(!minutes && route.duration) minutes = route.duration / 60000;
  if(!minutes) minutes = 40; // fallback

  // Rate per passenger per minute (80-100 zł/h = 1.33-1.67 zł/min)
  var ratePerMin = 1.6;

  // Seat config
  var cfg = ac.config || AC_SEATS[ac.model] || {eco: ac.seats||150, biz:0};
  var ecoSeats  = cfg.eco   || 0;
  var bizSeats  = cfg.biz   || 0;
  var premSeats = cfg.prem  || 0;
  var firstSeats= cfg.first || 0;

  // Load factor based on ticket price
  var ecoLF  = calcLoadFactor(route.ticketPriceEco || 0, route.distKm || 500, minutes);
  var bizLF  = calcLoadFactor(route.ticketPriceBiz || 0, route.distKm || 500, minutes) * 0.85;

  // Revenue
  var revenue = 0;
  revenue += ecoSeats   * minutes * ratePerMin * 1.0  * ecoLF;
  revenue += bizSeats   * minutes * ratePerMin * 2.5  * bizLF;
  revenue += premSeats  * minutes * ratePerMin * 1.7  * ecoLF;
  revenue += firstSeats * minutes * ratePerMin * 4.0  * bizLF;

  return Math.round(revenue);
}

/* Oblicz wspolczynnik wypelnienia na podstawie ceny */
function calcLoadFactor(ticketPrice, distKm, minutes) {
  if(!ticketPrice || ticketPrice <= 0) return 0.85; // domyslny
  
  var hours = minutes / 60;
  var fairPrice = 85 * hours; // srednia uczciwa cena
  
  if(ticketPrice <= fairPrice * 0.8) return 0.99;      // bardzo tanio - prawie pelny
  if(ticketPrice <= fairPrice)       return 0.85;      // normalna cena
  if(ticketPrice <= fairPrice * 1.3) return 0.65;      // troche za drogo
  if(ticketPrice <= fairPrice * 1.6) return 0.30;      // za drogo
  if(ticketPrice <= fairPrice * 2.0) return 0.10;      // bardzo drogo
  return 0;                                             // nikt nie kupuje
}

/* Pobierz info o trasie do wyswietlenia */
function getRouteInfo(fromIcao, toIcao, model) {
  var fromAp = null, toAp = null;
  ADB.forEach(function(a){ if(a.icao===fromIcao) fromAp=a; if(a.icao===toIcao) toAp=a; });
  if(!fromAp || !toAp) return null;

  var dist = Math.round(calcDistance(fromAp.lat, fromAp.lng, toAp.lat, toAp.lng));
  var minutes = calcFlightTime(dist, model);
  var range = AC_RANGE[model] || 2000;
  var inRange = dist <= range;

  return {
    dist: dist,
    minutes: minutes,
    timeStr: formatFlightTime(minutes),
    inRange: inRange,
    range: range,
    fromAp: fromAp,
    toAp: toAp
  };
}
