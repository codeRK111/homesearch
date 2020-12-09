const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'rakesh@singhamventures.com',
		pass: 'rajk@72h',
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
