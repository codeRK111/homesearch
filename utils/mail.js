const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	service: 'Gmail',
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
