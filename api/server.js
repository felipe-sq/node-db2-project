const express = require("express");

const CarRouter = require('./cars/cars-router.js');

const server = express();

server.use('/api/cars', CarRouter);

// server.get('/', (req, res) => {
//     res.send('Hello World!');
// });

module.exports = server;
