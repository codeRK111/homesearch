var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
const util = require('util');

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const readFile = util.promisify(fs.readFile);

const oauth2Client = new OAuth2(
	process.env.OAUTH_CLIENT_ID,
	process.env.OAUTH_CLIENT_SECRET, // Client Secret
	'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
	refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
	// host: 'smtp.gmail.com',
	// port: 465,
	// secure: true, // use TLS
	// auth: {
	// 	// user: 'payment@homesearchindia.com',
	// 	// pass: 'hdf@876R',
	// 	user: 'rakeshchandra.offcl@gmail.com',
	// 	// pass: 'igtkjswmuwozrizk',
	// 	pass: 'SfR2$3!#',
	// },
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		type: 'OAuth2',
		user: 'rakeshchandra.offcl@gmail.com',
		clientId: process.env.OAUTH_CLIENT_ID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
		accessToken: accessToken,
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
