const express = require('express');
const fs = require('fs');

const hpp = require('hpp');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const compression = require('compression');
const globalErrorHandler = require('./controllers/errorController');
const adminUserRoute = require('./routes/adminUsersRoute');
const userRouter = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const propertyRoute = require('./routes/propertyRoute');
const cityRouter = require('./routes/cityRoute');
const featureRouter = require('./routes/siteFeaturesRoute');
const userFeatureRouter = require('./routes/userFeatureRoute');
const builderRouter = require('./routes/builderRoute');
const projectRoute = require('./routes/projectRoute');
const kraRoute = require('./routes/kraRoute');
const kpiRoute = require('./routes/kpiRoute');
const pageRoute = require('./routes/pageRoute');
const BlogModel = require('./models/blogModel');

const queryRoute = require('./routes/propertyQueryRoute');
const whatsappQueryRoute = require('./routes/whatsappQueryRoute');
const propertyReviewRoute = require('./routes/propertyReviewRoute');
const feedbackRoute = require('./routes/feedbackRoute');
const requestPhotoRoute = require('./routes/requestPhotoRoute');
const contactRoute = require('./routes/contactRoute');
const testRoute = require('./routes/testRoute');
const AppError = require('./utils/appError');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const basicAuth = require('express-basic-auth');
// V2 Routes
const builderRouteV2 = require('./routesV2/builderRoute');
const utilityRouteV2 = require('./routesV2/packageRoute');
const packageRouteV2 = require('./routesV2/packageRoute');
const queryRouteV2 = require('./routesV2/queryRoute');
const v2PropertyRoute = require('./routesV2/propertyRoute');
const v2SavePropertyRoute = require('./routesV2/savePropertyRoute');
const v2LikePropertyRoute = require('./routesV2/likePropertyRoute');
const v2PageRoute = require('./routesV2/pageRoute');
const v2ProjectRoute = require('./routesV2/projectRoute');
const v2UserRoute = require('./routesV2/userRoute');
const v2AdminRoute = require('./routesV2/adminRoute');
const v2CityRoute = require('./routesV2/cityRoute');
const v2ReviewRoute = require('./routesV2/reviewRoute');
const v2JoinRequestRoute = require('./routesV2/joinRequestRoute');
const leadRoute = require('./routesV2/leadRoute');
const leadStrategyRoute = require('./routesV2/leadStrategyRoute');
const testimonialRoute = require('./routesV2/testimonialRoute');
const staffRoute = require('./routesV2/staffRoute');
const blogRoute = require('./routesV2/blogRoute');
const paymentRoute = require('./routesV2/paymentRoute');
const testRoutev2 = require('./routesV2/testRoute');

const app = express();

require('./utils/createInvoice');

app.use(cors());

// app.use(expressValidator());
const options = {
	setHeaders: function (res, path, stat) {
		res.set(
			'Cache-Control',
			'no-store, no-cache, must-revalidate, proxy-revalidate'
		);
	},
};

// enable files upload
// app.use(
// 	fileUpload({
// 		createParentPath: true,
// 		limits: {
// 			fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
// 		},
// 	})
// );

// SET HTTP SECURITY HEADER
// app.use(helmet());

// RESPONSE TIMEOUT
// app.use(timeout('30s'));

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
app.use(
	'/assets/builders',
	express.static(path.join(__dirname, 'images', 'builder_images'))
);
app.use(
	'/assets/leads',
	express.static(path.join(__dirname, 'images', 'lead_images'))
);
app.use(
	'/assets/lead-strategies',
	express.static(path.join(__dirname, 'images', 'lead_strategy_images'))
);
app.use(
	'/assets/testimonial',
	express.static(path.join(__dirname, 'images', 'testimonial_images'))
);
app.use(
	'/assets/blogs',
	express.static(path.join(__dirname, 'images', 'blog_images'))
);
app.use(
	'/assets/cities',
	express.static(path.join(__dirname, 'images', 'city_images'))
);
app.use(
	'/assets/projects',
	express.static(path.join(__dirname, 'images', 'project_images'))
);
app.use(
	'/assets/properties',
	express.static(path.join(__dirname, 'images', 'property_images'))
);
app.use(
	'/assets/static',
	express.static(path.join(__dirname, 'static', 'images'))
);
// app.use(
// 	basicAuth({
// 		users: { admin: 'admin@123' },
// 		challenge: true,
// 		realm: 'Imb4T3st4pp',
// 	})
// );
app.use('/admin', express.static(path.join(__dirname, 'admin', 'build')));
app.use('/workspace', express.static(path.join(__dirname, 'staff', 'build')));
app.use(
	'/homesearchIndia',
	express.static(path.join(__dirname, 'homesearchIndia', 'build'))
);
app.use(express.static(path.join(__dirname, 'client', 'build'), options));

// 3) ROUTES V!
app.use('/api/v1/admin/users', adminUserRoute);
app.use('/api/v1/admin/features', featureRouter);
app.use('/api/v1/admins', adminRoute);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/properties', propertyRoute);
app.use('/api/v1/reviews', propertyReviewRoute);
app.use('/api/v1/builders', builderRouter);
app.use('/api/v1/projects', projectRoute);
app.use('/api/v1/queries', queryRoute);
app.use('/api/v1/wh-queries', whatsappQueryRoute);
app.use('/api/v1/feedbacks', feedbackRoute);
app.use('/api/v1/requests', requestPhotoRoute);
app.use('/api/v1/contacts', contactRoute);
app.use('/api/v1/features', userFeatureRouter);
app.use('/api/v1/kra', kraRoute);
app.use('/api/v1/kpi', kpiRoute);
app.use('/api/v1/page', pageRoute);
app.use('/api/v1/api-test', testRoute);

// v2 Routes
app.use('/api/v2/builder', builderRouteV2);
app.use('/api/v2/utility', utilityRouteV2);
app.use('/api/v2/property', v2PropertyRoute);
app.use('/api/v2/save-property', v2SavePropertyRoute);
app.use('/api/v2/like-property', v2LikePropertyRoute);
app.use('/api/v2/page', v2PageRoute);
app.use('/api/v2/query', queryRouteV2);
app.use('/api/v2/project', v2ProjectRoute);
app.use('/api/v2/user', v2UserRoute);
app.use('/api/v2/admin', v2AdminRoute);
app.use('/api/v2/city', v2CityRoute);
app.use('/api/v2/review', v2ReviewRoute);
app.use('/api/v2/join', v2JoinRequestRoute);
app.use('/api/v2/lead', leadRoute);
app.use('/api/v2/lead-strategy', leadStrategyRoute);
app.use('/api/v2/testimonial', testimonialRoute);
app.use('/api/v2/staff', staffRoute);
app.use('/api/v2/blog', blogRoute);
app.use('/api/v2/payment', paymentRoute);
app.use('/api/v2/package', packageRouteV2);
app.use('/api/v2/test', testRoutev2);

app.all('/api/*', (req, res, next) => {
	next(new AppError(`cannot find ${req.originalUrl} on this server`, 404));
});

app.get('/workspace/*', function (req, res) {
	res.sendFile(
		require('path').resolve(__dirname, 'client', 'staff', 'index.html')
	);
});
app.get('/news/:slug', function (req, res) {
	fs.readFile(
		require('path').resolve(__dirname, 'client', 'build', 'index.html'),
		'utf8',
		(err, htmlData) => {
			if (err) {
				console.error('Error during file reading', err);
				return res.status(404).end();
			}
			BlogModel.findOne({ slug: req.params.slug }).then((blog) => {
				if (blog) {
					htmlData = htmlData
						.replace(
							`<title>Villas, Houses, Apartments for Rent, Buy, Sale Without Brokerage in India</title>`,
							`<title>${blog.title}</title>`
						)
						.replace('__META_OG_TITLE__', blog.title)
						.replace('__META_OG_DESCRIPTION__', blog.shortDesc)
						.replace('__META_DESCRIPTION__', blog.shortDesc)
						.replace(
							'__META_OG_IMAGE__',
							`/assets/blogs/${blog.photo}`
						);
					return res.send(htmlData);
				}
			});
		}
	);
});
app.get('/*', function (req, res) {
	res.sendFile(
		require('path').resolve(__dirname, 'client', 'build', 'index.html')
	);
});

// require('./task');
// require('./send-invoice-task');
// require('./property-lead-task');

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
