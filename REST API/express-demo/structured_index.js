const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const { log, authenticate } = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");

const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(helmet());

// Configuration based on the environment
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Password: " + config.get("mail.password"));

// custom middleware
app.use(log);

// router
app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
