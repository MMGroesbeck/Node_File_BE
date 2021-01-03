const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Hash_tools = require("../tools/hash_tools");
const TokenGen = require("../tools/token-gen");
const secrets = require("../secrets");

const User = require("../models/userModel");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = Hash_tools.hasher(user.password);
  let username = user.username;
  User.findBy({ username })
    .then((found) => {
      if (found) {
        res.status(400).json({ message: "Username already taken." });
      } else {
        User.add(user)
          .then((saved) => {
            const token = TokenGen.generateToken(saved);
            const newUser = {
              id: saved.id,
              username: saved.username,
              email: saved.email,
            };
            res.status(201).json({ user: newUser, token });
          })
          .catch((error) => {
            res.status(500).json({ errorMessage: error.message });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = TokenGen.generateToken(user);
        const thisUser = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        res.status(200).json({ user: thisUser, token });
      } else {
        res.status(401).json({ message: "Invalid password." });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;

// Hash_tools.hasher(string)
