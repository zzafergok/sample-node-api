const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.s8xtto2.mongodb.net/?retryWrites=true&w=majority`,
  (e) => {
    if (e) {
      console.log(e);
    } else {
      console.log("Connected to Database");
    }
  }
);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/auth", authRouter);
// app.use("/profile", verifyToken, usersRouter); // verifyToken is middleware
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
