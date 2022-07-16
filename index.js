const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const isLoggedIn = true;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.s8xtto2.mongodb.net/?retryWrites=true&w=majority`,
  (e) => {
    if (e) {
      console.log(e);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.use((req, res, next) => {
  if (!isLoggedIn) {
    res.send("You are not logged in");
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
