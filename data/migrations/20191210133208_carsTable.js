
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('VIN', 17).notNullable().unique();
      tbl.string('make', 50).notNullable();
      tbl.string('model', 256).notNullable();
      tbl.integer('mileage', 6).notNullable();
      tbl.string('transmission', 10);
      tbl.string('title', 10);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
