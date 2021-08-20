// STRETCH
exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert([
        {
          vin: "11111111111111111",
          make: "Ford",
          model: "Fusion",
          mileage: 50000,
          title: "Clean",
          transmission: "Automatic"
        },
        {
          vin: "11111111111111112",
          make: "Volkswagen",
          model: "Jetta",
          mileage: 30000,
          title: "Salvage",
          transmission: "Manual"
        }
      ]);
    });
  };