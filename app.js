const express = require('express');

const morgan = require('morgan');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

console.log(process.env.NODE_ENV)
//middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

module.exports = app;
