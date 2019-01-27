//"tx_lat": 35.708332,
//"tx_long": 139.75488,

module.exports.checkPacket = (packet) => {
  const payload = packet.body.payload;
  let status = false;

  status = (1 === payload || 2 === payload);

  if (1 === payload) {
    const tx_lat = packet.body.tx_lat;
    const tx_long = packet.body.tx_long;
    status = !((tx_lat < 1e-6) && (tx_long < 1e-6));
  }

  return status;
}


