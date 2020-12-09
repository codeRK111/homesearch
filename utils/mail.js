const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
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
		from: 'rakesh@singhamventures.com',
		to,
		subject,
		text,
	});
};

module.exports = sendEmail;
