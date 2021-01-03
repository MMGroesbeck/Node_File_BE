const fs = require("fs");

module.exports = {
    add,
    unlink
}

async function add(img, id) {
    try {
        img.mv("/images/" + id);
        return (false);
    } catch (err) {
        return (err);
    }
}

async function unlink(id) {
    try {
        await fs.unlink("/images/" + id);
        return true;
    } catch (error) {
        return false;
    }
}