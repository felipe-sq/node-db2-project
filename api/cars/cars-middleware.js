const Cars = require("./cars-model.js");
const vinValidator = require('vin-validator');
const db = require('../../data/db-config.js');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if (car) {
      req.car = car;
      next();
    } else {
      return res.status(404).json({message: `Car with id ${req.params.id} is not found`});
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin) {
    return res.status(400).json({message: `${req.body.vin} is missing`});
  } else if (!req.body.make) {
    return res.status(400).json({message: `${req.body.make} is missing`});
  } else if (!req.body.model) {
    return res.status(400).json({message: `${req.body.model} is missing`});
  } else if (!req.body.milage) {
    return res.status(400).json({message: `${req.body.milage} is missing`});
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.params.vin);

  // below may need to be isValidVin === true ?
  
  if (isValidVin === false) {
    return res.status(400).json({message: `vin ${req.body.vin} is invalid`});
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingVins = await db('cars').where('vin', req.body.vin).first();
    if (existingVins) {
      return res.status(400).json({message: `vin ${req.body.vin} already exists`});
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}