const Cars = require("./cars-model.js");
// const vinValidator = require('vin-validator');
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
    return res.status(400).json({message: `vin is missing`});
    // next();
  } else if (!req.body.make) {
    return res.status(400).json({message: `make is missing`});
  } else if (!req.body.model) {
    return res.status(400).json({message: `model is missing`});
  } else if (!req.body.mileage) {
    return res.status(400).json({message: `mileage is missing`});
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // const isValidVin = vinValidator.validate(req.params.vin);
  // unable to use vinValidator.validate() because it does not recognize req.params.vin; error message is: cannot read property 'toLowerCase' of undefined
  try {
    if (!req.body.vin) {
    // if (!isValidVin) {
      return res.status(400).json({message: `vin ${req.body.vin} is invalid`});
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingVins = await db('cars').where('vin', req.body.vin).first();

    if (existingVins) {
    // if (!req.body.vin) {
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