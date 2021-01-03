const router = require('express').Router();
const bcrypt = require("bcryptjs");

const Hash_tools = require("../tools/hash_tools");
const TokenGen = require("../tools/token-gen");
const secrets = require("../secrets");

const Image = require('../models/imageModel');
const User = require('../models/userModel');

router.post("/register", (req, res) => {
    let user = req.body;
    const hash = Hash_tools.hasher(user.password);
    let username = user.username
    User.findBy({ username }).then( found => {
        if (found) {
            res
                .status(400)
                .json({ message: "Username already taken." });
        } else {
            User.add(user)
            .then(saved => {
                const token = tokenGen.generateToken(saved);
                const newUser = {
                    id: saved.id,
                    username: saved.username,
                    email: saved.email
                };
                res.status(201).json({ user: newUser, token });
            })
            .catch(error => {
                res.status(500).json({ errorMessage: error.message });
            })
        }
    })
})

module.exports = router;

// Hash_tools.hasher(string)