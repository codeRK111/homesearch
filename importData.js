const fs = require('fs');
const mongoose = require('mongoose');
const Location = require('./models/locationModel');

const users = JSON.parse(
	fs.readFileSync(`${__dirname}/bengaluru.json`, 'utf-8')
);

console.log(users);

mongoose
	.connect(
		'mongodb+srv://homesearch_user:8pvHPLsbAP92faq2@cluster0.uj89e.mongodb.net/homesearch18',
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		}
	)
	.then(() => {
		console.log('db successfully');
		Location.insertMany(users)
			.then((d) => console.log(d))
			.catch((e) => console.log(e));
	})
	.catch((error) => {
		console.log(error);
	});
