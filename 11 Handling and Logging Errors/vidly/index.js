require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();

require("./startup/routes")(app);

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
const p = Promise.reject(new Error("Something failed miserably!"));
p.then(() => console.log("Done"));

// export vidly_jwtPrivateKey=mySecureKey
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27047/vidly", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb..."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
