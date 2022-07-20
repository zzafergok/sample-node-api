const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerSchema = joi
  .object({
    name: joi.string().required().min(3).max(255),
    email: joi.string().required().min(9).max(255).email(),
    password: joi.string().required().min(6).max(255),
  })
  .options({ stripUnknown: true });

const loginSchema = joi
  .object({
    email: joi.string().required(),
    password: joi.string().required(),
  })
  .options({ stripUnknown: true });

router.post("/register", (req, res) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new User({ ...req.body, password: hash });
  user
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(400).send("Invalid email or password");
        return;
      }

      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        res.status(400).send("Invalid email or password");
        return;
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      res.header("Authorization", token).json({ accessToken: token });
    })
    .catch(() => {
      res.status(400).send("Invalid email or password");
    });
});

module.exports = router;
