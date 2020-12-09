const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	service: 'Gmail',
	secure: false, // use SSL
	port: 25, // port for secure SMTP
	auth: {
		user: 'rakesh@singhamventures.com',
		pass: 'rajk@72h',
	},
	tls: {
		rejectUnauthorized: false,
	},
});

const sendEmail = async (to, subject, text) => {
	return await transporter.sendMail({
		from: 'Homesearch18',
		to,
		subject,
		text,
	});
};

module.exports = sendEmail;
