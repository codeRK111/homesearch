var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
const util = require('util');

const nodemailer = require('nodemailer');
const readFile = util.promisify(fs.readFile);
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use TLS
	auth: {
		// user: 'payment@homesearchindia.com',
		// pass: 'hdf@876R',
		user: 'rakeshchandra.offcl@gmail.com',
		// pass: 'igtkjswmuwozrizk',
		pass: 'SfR2$3!#',
	},
	tls: {
		rejectUnauthorized: false,
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

const htmlPath = path.join(__dirname, '../', 'static', 'html', 'feedback.html');

const sendEmailInvoice = async (to, subject, url) => {
	try {
		const html = await readHTMLFile(htmlPath);
		var template = handlebars.compile(html);

		var replacements = {
			url,
		};
		var htmlToSend = template(replacements);
		var mailOptions = {
			from: 'rakeshchandra.offcl@gmail.com',
			to,
			subject,
			html: htmlToSend,
		};
		const resp = await transporter.sendMail(mailOptions);
		return resp;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = sendEmailInvoice;
