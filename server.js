const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const exJwt = require("express-jwt");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3001;

const dbConnect = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_pass,
  database: process.env.db,
});
dbConnect.connect();

const jwtMW = exJwt({
  secret: process.env.jwt_secret,
  algorithms: ["HS256"],
});

// Creates user account
app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;

  const sql = `INSERT INTO user (username, password) VALUES ('${username}', '${password}')`;
  dbConnect.query(sql, (error, result) => {
    if (error) throw error;
    console.log("1 new account added");
  });
  res.json({ success: true, err: null });
});

// Logs in user
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  dbConnect.query("SELECT * FROM user", (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    for (let user of result) {
      if (user.username === username && user.password === password) {
        console.log("User is valid");
        let token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.jwt_secret,
          { expiresIn: "7d" }
        );
        res.json({
          success: true,
          err: null,
          token,
        });
        return;
      }
    }
    console.log("User is invalid");
    res.status(401).json({
      success: false,
      token: null,
      err: "Username or password is incorrect",
    });
  });
});

// Return user's budget
app.get("/api/budget", jwtMW, (req, res) => {
  dbConnect.query(
    `SELECT * FROM budget 
      WHERE id IN 
        (SELECT budget_id FROM budget_user WHERE user_id=${req.user.id})`,
    (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      res.json({
        budget: result,
      });
    }
  );
});

// Deletes budget item
app.get("/api/budget/:id", jwtMW, (req, res) => {
  dbConnect.query(
    `DELETE FROM budget WHERE id=${req.params.id}`,
    (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(result);
      res.json({
        deleted: true,
      });
    }
  );
});

// Adds budget item
app.post("/api/budget", jwtMW, (req, res) => {
  const { name, value } = req.body;
  const user_id = req.user.id;
  const sql = `INSERT INTO budget (title, budget) VALUES ('${name}', ${value})`;
  dbConnect.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    const budget_id = result.insertId;
    dbConnect.query(
      `INSERT INTO budget_user (budget_id, user_id) VALUES (${budget_id}, ${user_id})`,
      (errorMessage, resultMessage) => {
        if (errorMessage) {
          console.log(errorMessage);
          return;
        }
        res.json({
          added: true,
          budgetId: budget_id,
        });
      }
    );
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
