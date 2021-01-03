const db = require("../../data/db-config.js");

module.exports = {
    add,
    findBy,
    findByEmail,
    findById
}

async function add(user) {
    const [id] = await db("user").insert(user, "id");
    return findById(id);
}

function findBy(filter, select){
    return db("user").select(select).where(filter);
}

function findByEmail(email) {
    return db("user")
        .where({ email: email })
        .first();
}

function findById(id) {
    return db("user")
        .where({ id })
        .first();
}