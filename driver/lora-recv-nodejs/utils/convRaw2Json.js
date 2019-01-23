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
  json.rx_lat = cs[4];
  json.rx_long = cs[5];
  json.rx_alt = cs[6];
  json.rx_temp = cs[7];
  json.rx_airP = cs[8];
  json.rx_bSize = cs[9];
  json.tx_id = cs[10];
  json.tx_cnt = cs[11];
  json.payload = payload;

  if (1 === payload) {
    json.tx_gpsTime = cs[13] || none;
    json.tx_lat = cs[14] || none;
    json.tx_long = cs[15] || none;
    json.tx_alt  = cs[16] || none;
  }

  if (2 === payload) {
    json.tx_temp = cs[13] || none;
    json.tx_airP = cs[14] || none;
    json.tx_volt = cs[15] || none;
  }

  const isBroken = false;
  if (1 === payload) {
    if((none === json.tx_gpsTime) ||
       (none === json.tx_lat) ||
       (none === json.tx_long) ||
       (none === json.tx_alt)) {
      isBroken = true;
    }
  }

  if (2 === payload) {
    if((none === json.tx_temp) ||
       (none === json.tx_airP) ||
       (none === json.tx_volt)) {
      isBroken = true;
    }
  }

  if (isBroken) {
    json = {
      payload: -2,
      rawdata: data
    }
  }

  return json;
}
