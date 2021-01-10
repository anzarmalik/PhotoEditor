function getIPAddress(req) {
  let IPADDRESS = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  IPADDRESS = IPADDRESS === '::1' ? '127.0.0.1' : IPADDRESS.replace(/^.*:/, '');
  return IPADDRESS;
}

module.exports = {
  getIPAddress,
};
