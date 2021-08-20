const router = require('express').Router();
const Cars = require('./cars-model.js');

const mw = require('./cars-middleware.js');

router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', mw.checkCarId, async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

router.post('/', mw.checkVinNumberValid, mw.checkVinNumberUnique, mw.checkCarPayload, async (req, res, next) => {
  try {
    const car = await Cars.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    next(err);
  }
});

module.exports = router;