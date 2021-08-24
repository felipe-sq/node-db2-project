const Cars = require("./cars-model.js");
const vinValidator = require('vin-validator');
// const db = require('../../data/db-config.js');

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
  //updated code based on solution video. modified to check for valid vin number correctly
  
  try {
    if (vinValidator.validate(req.body.vin)) {
      next();
    } else {
      next({
        status: 400,
        message: `vin ${req.body.vin} is invalid`,
      });
    }
  } catch (err) {
    next(err);
  }

};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingVins = await Cars.getByVin(req.body.vin);

    if (!existingVins) {
      next();
    } else {
      next({
        status: 400, 
        message: `vin ${req.body.vin} already exists`,
      });
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