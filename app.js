const path = require('path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const patientRouter = require('./routes/patientRouter');
const referralRouter = require('./routes/referralRoutes');
const patientRecordRouter = require('./routes/patientRecordRoutes');
const doctorReportRouter = require('./routes/doctorReportRoutes');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // <-- this allows cookies to be sent
  }),
);

//GLOBAL MIDDLEWARE
//SET SECURITY HTTP HEADERS
app.use(helmet());

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//IMPLEMENT RATE LIMITING : LIMIT REQUESTS FROM SAME API TO PREVENT BRUTE FORCE ATTACK
// const limiter = rateLimit({
//   max: 300,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, Please try again in an hour! ',
// });
// app.use('/api', limiter);

// BODY PARSER, READING DATA FROM BODY INTO req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' })); //In order to parse data coming from form (req.body)
app.use(cookieParser());

// DATA SANITIZATION AGAINST NoSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XXS
app.use(xss());

// PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    // whitelist: 'duraion' allow QUERY field like ?duration=3&duraion=9 and ?sort=duration&sort=price it works, if not only allow the last one after &
    whitelist: ['flyersQuantity', 'category', 'hasNew'],
  }),
);

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// TEST MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  // console.log(req.cookies);
  next();
});

// ROUTE MOUNT
app.use('/api/v1/users', userRouter);
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/refrral', referralRouter);
app.use('/api/v1/patient-record', patientRecordRouter);
app.use('/api/v1/doctor-report', doctorReportRouter);

// UNHANDLED ROUTE
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
