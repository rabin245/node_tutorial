const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  // process.on("uncaughtException", (ex) => {
  //   console.log("we got an uncaught exception");
  //   console.log(ex.message);
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughExceptions.log" })
  );
  // winston.rejections.handle(
  //   new winston.transports.File({ filename: "unhandledRejections.log" })
  // );
  winston.add(
    new winston.transports.File({ filename: "unhandledRejections.log" })
  );

  process.on("unhandledRejection", (ex) => {
    console.log("we got an unhandled rejection");
    console.log(ex.message);
    winston.error(ex.message, ex);
    // process.exit(1);
  });

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: false,
      handleRejections: false,
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27047/vidly", // in real world apps, seperate operational db and logging db
      options: { useNewUrlParser: true },
      level: "info",
      handleExceptions: true,
      handleRejections: true,
    })
  );

  // throw new Error("Something failed during startup.");
  // const p = Promise.reject(new Error("Something failed miserably!"));
  // p.then(() => console.log("Done"));
};
