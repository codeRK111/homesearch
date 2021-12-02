const axios = require('axios');

module.exports = (domainType = '18', id, number) => {
	console.log(number);
	let url = `http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=homesearch&Passwd=lvadda@413&Sid=GROVIS&Mobilenumber=${number}&message=Dear Customer Kindly send your acceptance or declination by using the following link https://homesearch${domainType}.com/manage-proposal/${id}&Mtype=N&DR=Y`;
	console.log(url);
	return axios.get(url);
};
