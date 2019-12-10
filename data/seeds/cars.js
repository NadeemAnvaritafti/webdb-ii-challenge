
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: '111222333444555AA', make: 'Ford', model: 'Taurus', mileage: '1000'},
        {VIN: '111222333444555BB', make: 'Chevy', model: 'Camaro', mileage: '2000', transmission: 'manual'},
        {VIN: '111222333444555CC', make: 'Dodge', model: 'Charger', mileage: '3000', title: 'clean'}
      ]);
    });
};
