const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const path = require("path");
const router = require("./routes/Router");
const env = require("./config/env");

const viewsPath = path.join(__dirname, "views");
const staticFiles = path.join(__dirname, "public");
const faviconPath = path.join(__dirname, "public", "favicon_io", "favicon.ico");

const app = express();

app.set("view engine", "pug");
app.set("views", viewsPath);
app.use(favicon(faviconPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticFiles));
app.use(session({ secret: env.KEY, saveUninitialized: false, resave: true }));

app.use((req, res, next) => {
  if (!req.session.todos) {
    req.session.todos = [];
  }

  next();
});

app.use(router);

app.use((req, res, next) => {
  res.status(404).render("error", {
    errHead: "Not Found",
    errBody: `The requested URL ${req.url} was not found on this server.`,
  });
});

app.listen(env.PORT);
