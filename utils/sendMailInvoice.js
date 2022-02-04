var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
const util = require('util');

const nodemailer = require('nodemailer');
const readFile = util.promisify(fs.readFile);
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: true, // use TLS
	auth: {
		user: 'payment@homesearchindia.com',
		pass: 'hdf@876R',
	},
});

const readHTMLFile = async (path) => {
	try {
		const html = await readFile(path, { encoding: 'utf-8' });
		return html;
	} catch (error) {
		throw new Error(error.message);
	}
};

const htmlPath = path.join(__dirname, '../', 'static', 'html', 'invoice.html');

const sendEmailOTP = async (to, subject, invoicePath, invoiceName) => {
	try {
		const html = await readHTMLFile(htmlPath);
		var template = handlebars.compile(html);
		var replacements = {
			otp: '',
		};
		var htmlToSend = template(replacements);
		var mailOptions = {
			from: 'payment@homesearchindia.com',
			to,
			subject,
			html: htmlToSend,
			attachments: [
				{
					filename: invoiceName,
					path: invoicePath,
					cid: 'uniq-mailtrap.png',
				},
			],
		};
		const resp = await transporter.sendMail(mailOptions);
		return resp;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = sendEmailOTP;
