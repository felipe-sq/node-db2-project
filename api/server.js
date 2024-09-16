const express = require("express");
const morgan = require("morgan");

const CarRouter = require('./cars/cars-router.js');

const server = express();
server.use(express.json());
server.use(morgan("dev"));

server.use('/api/cars', CarRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  });
});

module.exports = server;
