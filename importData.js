const fs = require('fs');
const mongoose = require('mongoose');
const Location = require('./models/locationModel');

const users = JSON.parse(
	fs.readFileSync(`${__dirname}/LocalityTable.json`, 'utf-8')
);

const data = (id, name) => {
	return users
		.filter((e) => e.City === name)
		.map((c) => ({ name: c.LocalityName, city: id }));
};

console.log(data('5f2cf831ab6d0b12da114161', 'Bhubaneswar'));

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
		Location.insertMany(data('5f2cf831ab6d0b12da114161', 'Bhubaneswar'))
			.then((d) => console.log(d))
			.catch((e) => console.log(e));
	});
