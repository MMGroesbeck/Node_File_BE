exports.up = function (knex) {
  return knex.schema.createTable("image", (tbl) => {
    tbl.increments();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("user")
      .onUpdate("CASCADE")
      .onDelete("RESTRICT");
    tbl.uuid("file_uuid");
    tbl.integer("public").defaultTo(0);
    tbl.json("metadata");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("image");
};
