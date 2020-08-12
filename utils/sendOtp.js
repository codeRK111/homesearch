const axios = require('axios');

module.exports = (number, otp) => {
	console.log(number);
	let url = `http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=homesearch&Passwd=lvadda@413&Sid=COADDA&Mobilenumber=${number}&message=Your Homesearch18 mobile verification code is ${otp}&Mtype=N&DR=Y`;
	return axios.get(url);
};
