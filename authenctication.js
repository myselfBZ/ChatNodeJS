const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("./models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

router.post("/sign-up/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await User.findByUsername(username);
    if (exists) {
      return res
        .status(404)
        .json({ message: "Username has already been taken" });
    }
    const hash = await bcrypt.hash(password, 10);
    const result = await User.createUser(username, hash);
    const token = jwt.sign({ id: result.user_id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    res.status(201).json({ message: "user created", token: token });
  } catch (err) {
    console.error(err);
  }
});

router.post("/log-in/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const passMatch = await bcrypt.compare(password, user.password_hash);
    if (passMatch) {
      const token = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      return res.json({ message: "You are logged in", token: token });
    }
    return res.status(401).json({ message: "Invalid password or username" });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Server is broken");
  }
});

module.exports = {
  router,
};
