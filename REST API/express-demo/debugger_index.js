const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const morgan = require("morgan");
const express = require("express");
const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled....");
}

// DB work...
dbDebugger("Connected to the database...");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//   export DEBUG=app:startup or DEBUG=app:startup
//   export DEBUG=app:startup, app:db
//   export DEBUG=app:*
//   export DEBUG=
//   DEBUG=app:db node debugger_index.js
