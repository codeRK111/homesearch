// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const Agenda = require('agenda');
// const Property = require('./models/propertyModel');
// const moment = require('moment');

// // HANDLE GLOBAL UNHANDLED EXCEPTION
// process.on('uncaughtException', (error) => {
// 	console.log('UNHANDLED REJECTION');
// 	console.log(error.name, error.message);
// 	process.exit(1);
// });

// dotenv.config({ path: './config.env' });

// const dbString = process.env.REMOTE_DATABASE_URL;
// const agenda = new Agenda({ db: { address: dbString } });

// mongoose
// 	.connect(dbString, {
// 		useCreateIndex: true,
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	// eslint-disable-next-line no-unused-vars
// 	.then((conn) => {
// 		console.log('DB connected');
// 	})
// 	.catch((err) => console.log(err));

// agenda.define('handleExpired', async (job) => {
// 	await Property.updateMany(
// 		{
// 			expiresAt: { $lte: moment() },
// 		},
// 		{ status: 'expired' }
// 	);
// });

// (async function () {
// 	await agenda.start();
// 	await agenda.every('24 hours', 'handleExpired');
// })();

// const app = require('./app');

// const port = process.env.PORT || 5000;
// const server = app.listen(port, () => {
// 	console.log(`App running on port ${port}...`);
// });

// // HANDLE GLOBAL UNHANDLED REJECTION
// process.on('unhandledRejection', (error) => {
// 	console.log('UNHANDLED REJECTION');
// 	console.log(error.name, error.message);
// 	server.close(() => process.exit(1));
// });

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/test', (req, res, next) => {
	res.send('<h1>Hello</h1>');
});

app.listen(3000, '0.0.0.0', () => {
	console.log(`App running on port 5000...`);
});
