const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	host: 'smtp.sendgrid.net',
	port: 587,
	secure: false, // use TLS
	auth: {
		user: 'apikey',
		pass: process.env.SENDGRID_API_KEY,
	},
});

const sendEmail = async (to, subject, text) => {
	return await transporter.sendMail({
		from: 'rakesh@singhamventures.com',
		to,
		subject,
		text,
	});
};

module.exports = sendEmail;
