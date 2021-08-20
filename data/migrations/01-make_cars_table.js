exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id').primary();
    tbl.text('vin', 128).notNullable().unique();
    tbl.text('make');
    tbl.text('model');
    tbl.numeric('mileage');
    tbl.text('title');
    tbl.text('transmission');

    tbl.integer('year');
    tbl.integer('owner_id').references('id').inTable('owners');
    tbl.timestamps();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
