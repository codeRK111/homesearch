const axios = require('axios');

module.exports = (number, otp) => {
	console.log(number);
	let url = `http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=homesearch&Passwd=lvadda@413&Sid=GROVIS&Mobilenumber=${number}&message=Your Homesearchindia mobile verification code is ${otp}&Mtype=N&DR=Y`;
	console.log(url);
	return axios.get(url);
};
