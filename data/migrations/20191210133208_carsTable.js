
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('VIN', 17).notNullable().unique();
      tbl.string('Make', 50).notNullable();
      tbl.string('Model', 256).notNullable();
      tbl.integer('Mileage', 6).notNullable();
      tbl.string('Transmission', 10);
      tbl.string('Title', 10);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
