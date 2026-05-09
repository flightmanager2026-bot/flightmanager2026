var AC_DEFS={
  'Boeing 737-800':{rows:26,bizRowSeats:6,ecoRowSeats:6,bizRowCost:2,maxBizRows:13},
  'Airbus A320neo':{rows:28,bizRowSeats:6,ecoRowSeats:6,bizRowCost:2,maxBizRows:14},
  'Airbus A321neo':{rows:36,bizRowSeats:6,ecoRowSeats:6,bizRowCost:2,maxBizRows:18},
  'ATR-72':{rows:18,bizRowSeats:4,ecoRowSeats:4,bizRowCost:2,maxBizRows:9},
  'Boeing 787-9':{rows:36,bizRowSeats:6,ecoRowSeats:9,bizRowCost:2,maxBizRows:18}
};

function getAcSeats(ac) {
  var def=AC_DEFS[ac.model];
  if(!def) return {biz:0,eco:ac.seats||150,total:ac.seats||150};
  var bizRows=ac.bizRows||0;
  var ecoRows=def.rows-bizRows*def.bizRowCost;
  var biz=bizRows*def.bizRowSeats;
  var eco=Math.max(0,ecoRows)*def.ecoRowSeats;
  return {biz:biz,eco:eco,total:biz+eco};
}
