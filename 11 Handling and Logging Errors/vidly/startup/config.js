const config = require("config");

module.exports = function () {
  // export vidly_jwtPrivateKey=mySecureKey
  if (!config.get("jwtPrivateKey")) {
    // console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    // process.exit(1);
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
