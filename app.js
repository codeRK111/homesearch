const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const timeout = require('connect-timeout');
const compression = require('compression');
const globalErrorHandler = require('./controllers/errorController');
const adminUserRoute = require('./routes/adminUsersRoute');
const userRouter = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const propertyRoute = require('./routes/propertyRoute');
const cityRouter = require('./routes/cityRoute');
const featureRouter = require('./routes/siteFeaturesRoute');
const AppError = require('./utils/appError');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const basicAuth = require('express-basic-auth');

const app = express();

app.use(cors());

// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
		limits: {
			fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
		},
	})
);

// SET HTTP SECURITY HEADER
// app.use(helmet());

// RESPONSE TIMEOUT
app.use(timeout('30s'));

// function haltOnTimedout(req, res, next) {
//   if (!req.timedout) return next();
// }

// LIMIT NUMBER OF REQUESTS
const limiter = rateLimit({
	max: 10000,
	windowMs: 60 * 60 * 60 * 1000,
	message: 'Too many request',
});

app.use('/api', limiter);

// SET NODE_ENV
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// ADD REQUEST BODY TO <req.body> AND LIMIT SIZE OF INCOMING DATA
app.use(express.json({ limit: '10kb' }));

// SANITIZE DATA AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize());
// SANITIZE DATA AGAINST XSS
app.use(xss());
// PREVENT PARAMETER POLLUTION
app.use(
	hpp({
		whitelist: [
			'duration',
			'ratingsAverage',
			'ratingsQuantity',
			'maxGroupSize',
			'price',
			'difficulty',
		],
	})
);

app.use(compression());

app.use(
	'/profile',
	express.static(path.join(__dirname, 'images', 'profile_images'))
);
// app.use(
// 	basicAuth({
// 		users: { admin: 'admin@123' },
// 		challenge: true,
// 		realm: 'Imb4T3st4pp',
// 	})
// );
app.use('/admin', express.static(path.join(__dirname, 'admin', 'build')));

// 3) ROUTES
app.use('/api/v1/admin/users', adminUserRoute);
app.use('/api/v1/admin/features', featureRouter);
app.use('/api/v1/admins', adminRoute);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/properties', propertyRoute);

app.all('*', (req, res, next) => {
	next(new AppError(`cannot find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
