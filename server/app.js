const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

require("dotenv").config();

require("./config/mongoConfig")();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000","https://ecommercerob.netlify.app"],
  })
);

app.use(
  session({
    secret: process.env.SECRET_COOKIE,
    resave: true,
    saveUninitialized: true,
    cookie: {
      expires: new Date(Date.now() + (24 * 60 * 60 * 1000)),
      sameSite: 'none',
    }
  })
);

app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/routesItems"));
app.use("/api", require("./routes/routesAuth"));

module.exports = app;
