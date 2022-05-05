console.log(__filename)
console.log(__dirname)

var url = 'http://mylogger.io/log';

function log(message) {
    // send an HTTP request
    console.log(message);
}

// module.exports.log = log;   // exporting as a method of an object
module.exports = log;       // exporting only the method
// module.exports.endPoint = url;
