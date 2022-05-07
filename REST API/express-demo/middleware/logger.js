function log(req, res, next) {
  console.log("Logging...");
  next();
}

function authenticate(req, res, next) {
  console.log("Authenticating...");
  next();
}

module.exports.log = log;
module.exports.authenticate = authenticate;
// module.exports = log;
// module.exports = authenticate;
