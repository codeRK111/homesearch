const axios = require('axios');

module.exports = (number, data) => {
	console.log(number);
	let url = `http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=homesearch&Passwd=lvadda@413&Sid=GROVIS&Mobilenumber=${number}&message=${data.userName} , ${data.userNumber}(Verified) has requested to visit you prop id ${data.propertyId}: Rs ${data.propertyPrice}- ${data.type} in ${data.propertyCity} - ${data.propertyLocation} .www.homesearchindia.com&Mtype=N&DR=Y`;
	console.log(url);
	return axios.get(url);
};
