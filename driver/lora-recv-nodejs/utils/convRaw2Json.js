module.exports.convRaw2Json = (rawData) => {
  const none = 'none';
  // 770521,52,230119,43437,35708392,139754784,59,35.06,100876,35,8,216,1,43427,35708392,139754688,23
  const data = rawData.replace(/\r/g, '');
  const cs = data.split(',');

  const payload = parseInt(cs[12]) || -1;

  let json = {}

  if (1 !== payload && 2 !== payload) {
    json = {
      payload: payload,
      rawdata: data
    }
    return json;
  }
  
  json.rx_obcTime = cs[0];
  json.rx_recvCnt = cs[1];
  json.rx_gpsDate = cs[2];
  json.rx_gpsTime = cs[3];

  //json.rx_lat = (0 === cs[4]) ? null : parseInt(cs[4])/1e6 - 4294.967286;
  json.rx_lat = (0 === cs[4]) ? null : parseInt(cs[4])/1e6;

  json.rx_long = (0 === cs[5]) ? null : parseInt(cs[5])/1e6;
  json.rx_alt = cs[6];
  json.rx_temp = cs[7];
  json.rx_airP = cs[8];
  json.rx_bSize = cs[9];
  json.tx_id = cs[10];
  json.tx_cnt = cs[11];
  json.payload = payload;

  if (1 === payload) {
    json.tx_gpsTime = cs[13];
    json.tx_lat = parseInt(cs[14])/1e6;
    json.tx_long = parseInt(cs[15])/1e6;
    json.tx_alt  = parseInt(cs[16]);
    //json.tx_alt  = json.rx_lat - json.tx_lat;
  }

  if (2 === payload) {
    json.tx_temp = parseInt(cs[13]);
    json.tx_airP = parseInt(cs[14]);
    json.tx_volt = parseInt(cs[15])/10.0;
  }

  let isBroken = false;

  if (1 === payload) {
    if((null === json.rx_lat) ||
       (null === json.rx_long) ||
       (null === json.tx_lat) ||
       (null === json.tx_long) ||
       (null === json.tx_volt)) {
      isBroken = true;
    }
    if((0 === json.rx_lat) ||
       (0 === json.rx_long) ||
       (0 === json.tx_lat) ||
       (0 === json.tx_long) ||
       (0 === json.tx_volt)) {
      isBroken = true;
    }
  }

  if (2 === payload) {
    if((null === json.tx_temp) ||
       (null === json.tx_airP) ||
       (null === json.tx_volt)) {
      isBroken = true;
    }
    if((0 === json.tx_temp) ||
       (0 === json.tx_airP) ||
       (0 === json.tx_volt)) {
      isBroken = true;
    }
  }

  // for Bali excersise 2019/02/28
  if (2 === payload) {
    isBroken = true;
  }

  if (isBroken) {
    json = {
      payload: -2,
      rawdata: data
    }
  }

  return json;
}

