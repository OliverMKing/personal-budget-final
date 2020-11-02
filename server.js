const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
require("dotenv").config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

const PORT = 3001;

const jwtMW = exjwt({
  secret: process.env.jwt_secret,
  algorithms: ["HS256"],
});

// Logs in user
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  for (let user of [{ username: "test", password: "test" }]) {
    if (username === user.username && password === user.password) {
      let token = jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: "7d" }
      );
      res.json({
        success: true,
        err: null,
        token,
      });
      break;
    } else {
      res.status(401).json({
        success: false,
        token: null,
        err: "Username or password is incorrect",
      });
    }
  }
});

app.get("/api/isLoggedIn", jwtMW, (req, res) => {
  res.json({
    success: true,
    loggedIn: true,
  });
});

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      success: false,
      officialError: err,
      err: "You must be logged in",
    });
  } else {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
