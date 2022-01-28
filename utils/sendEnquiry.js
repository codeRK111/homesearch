const axios = require('axios');

module.exports = ({ name, number, id, price, pType, location, city }) => {
	console.log(number);
	let url = `http://api.smscountry.com/SMSCwebservice_bulk.aspx?User=homesearch&Passwd=lvadda@413&Sid=GROVIS&Mobilenumber=${number}&message=${name} , ${number}(Verified) has requested to visit you prop id ${id}: Rs ${price}- ${pType} in ${location} ${city}.www.homesearch18.com&Mtype=N&DR=Y`;
	console.log(url);
	return axios.get(url);
};
