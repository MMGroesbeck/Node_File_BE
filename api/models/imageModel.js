const db = require("../../data/db-config.js");

module.exports = {
    add,
    findBy,
    findById,
    remove
}

async function add(image) {
    const [id] = await db("image").insert(image, "id");
    return findById(id);
}

function findBy(filter){
    return db("image").where(filter);
}

function findById(id){
    return db("image")
        .where({ id })
        .first();
}

function remove(id){
    return db("image")
        .where({ id })
        .del();
}