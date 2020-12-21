const axios = require('axios');
exports.sendQueryToOwner = (data, number) => {
	const url = `http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=homesearch&Passwd=lvadda@413&Sid=COADDA&Mobilenumber=91${number}&message=${data.name} , ${data.number} has requested to visit you property ${data.property} : Rs ${data.price} in ${data.city} *.www.homesearch18.com`;
	return axios.get(url);
};
