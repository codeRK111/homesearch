const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false, // use TLS
	auth: {
		user: 'payment@homesearchindia.com',
		pass: 'hdf@876R',
	},
});

const sendEmail = async (to, subject, text) => {
	return await transporter.sendMail({
		from: 'payment@homesearchindia.com',
		to,
		subject,
		text,
	});
};

module.exports = sendEmail;
