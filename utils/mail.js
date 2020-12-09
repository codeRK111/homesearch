const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	auth: {
		user: 'rakesh@singhamventures.com',
		pass: 'rajk@72h',
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
