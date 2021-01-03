const bcrypt = require('bcryptjs');

module.exports = {
    hasher
}

function hasher(hashable) {
    const rounds = process.env.HASH_ROUNDS || 12;
    const hash = bcrypt.hashSync(hashable, rounds);
    return hash;
}