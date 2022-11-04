const express = require('express');
const { movieRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use('/movies', movieRouter);

module.exports = app;
