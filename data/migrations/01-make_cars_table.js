exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id').primary();
    tbl.text('vin', 128).notNullable().unique().required();
    tbl.text('make').required();
    tbl.text('model').required();
    tbl.numeric('mileage').required();
    tbl.text('title');
    tbl.text('transmission');

    tbl.integer('year');
    tbl.integer('owner_id').references('id').inTable('owners');
    tbl.timestamps();
  }
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
