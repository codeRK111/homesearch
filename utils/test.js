const axios = require('axios');

// exports.sendOtpMessageTest = async () => {
// let url = `http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=homesearch&Passwd=lvadda@413&Sid=GROVIS&Mobilenumber=9853325956&message=Your Homesearch18 mobile verification code is 4556&Mtype=N&DR=Y`;
// console.log(url);
// const result = await axios.get(url);
// 	console.log(result);
// 	return result;
// };
exports.sendOtpMessageTest = async (number, otp) => {
	return new Promise(async (resolve, reject) => {
		try {
			let url = `http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=homesearch&Passwd=lvadda@413&Sid=GROVIS&Mobilenumber=${number}&message=Your Homesearch18 mobile verification code is ${otp}&Mtype=N&DR=Y`;
			console.log(url);
			const result = await axios.get(url);
			if (result.data.includes('OK')) {
				resolve(result.data);
			} else {
				throw new Error(result.data);
			}
		} catch (error) {
			reject(error);
		}
	});
};
