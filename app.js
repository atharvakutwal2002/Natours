const express = require('express');

const morgan = require('morgan');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

console.log(process.env.NODE_ENV);

//middleware

app.use(helmet()); //set security http headers

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    'Too many requests from this IP , please try again later in an hour .',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
