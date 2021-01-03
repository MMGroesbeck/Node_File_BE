exports.up = function (knex) {
  return knex.schema.createTable("user", (tbl) => {
    tbl.increments();
    tbl.text("username", 128).unique().notNullable().index();
    tbl.text("email").notNullable();
    tbl.text("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
