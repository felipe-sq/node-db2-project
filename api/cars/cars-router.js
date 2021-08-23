const router = require('express').Router();
const Cars = require('./cars-model.js');

const {checkCarId, checkVinNumberUnique, checkVinNumberValid, checkCarPayload} = require('./cars-middleware.js');

router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkCarId, async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique,
async (req, res, next) => {
  // const car = await Cars.create(req.body);

  try {
    // if (car) {

    const car = await Cars.create(req.body);
    if (car) {
    console.log(car);
    res.status(201).json(car);
    } else {
      res.status(500).json({message: 'Could not create car'});
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;