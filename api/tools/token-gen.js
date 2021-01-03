const jwt = require("jsonwebtoken");

const secrets = require("../secrets.js");

module.exports = {
    generateToken
}

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
        email: user.email
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, secret, options);
}