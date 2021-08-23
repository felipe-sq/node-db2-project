const db = require('../../data/db-config.js');

async function getAll(){
  return db('cars');
}

async function getById(id) {
  return db('cars').where('id', id).first();
}

async function create({vin, make, model, mileage, title, transmission}) {
  const [id] = await db('cars').insert({vin, make, model, mileage, title, transmission});
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create
};
