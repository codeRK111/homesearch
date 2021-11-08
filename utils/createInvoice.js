const pdfKit = require('pdfkit');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

let companyLogo = path.join(__dirname, '../static', 'images', 'logo.jpg');
let fileName = path.join(
	__dirname,
	'../static',
	'invoices',
	`${Date.now()}.pdf`
);
let fontNormal = 'Helvetica';
let fontBold = 'Helvetica-Bold';

const todayDate = moment().format('DD-MMM-YYYY, h:mm a');

let sellerInfo = {
	companyName: 'Homesearchindia',
	address: '2nd, Floor, JSS STP Tower 1, Infocity, Patia',
	city: 'Bhubaneswar',
	state: 'Odisha ',
	pincode: '751024',
	country: 'India',
	contactNo: '+91 9090-91-7676',
};

function createInvoice(customerInfo, orderInfo) {
	try {
		let pdfDoc = new pdfKit();

		let stream = fs.createWriteStream(fileName);
		pdfDoc.pipe(stream);

		pdfDoc.image(companyLogo, 25, 20, { width: 50, height: 50 });
		pdfDoc.font(fontBold).text('Homesearchindia', 7, 75);
		pdfDoc
			.font(fontNormal)
			.fontSize(14)
			.text('Package Invoice', 400, 30, { width: 200 });
		pdfDoc.fontSize(10).text(todayDate, 400, 46, { width: 200 });

		pdfDoc.font(fontBold).text('Package provided by:', 7, 100);
		pdfDoc
			.font(fontNormal)
			.text(sellerInfo.companyName, 7, 115, { width: 250 });
		pdfDoc.text(sellerInfo.address, 7, 130, { width: 250 });
		pdfDoc.text(sellerInfo.city + ' ' + sellerInfo.pincode, 7, 145, {
			width: 250,
		});
		pdfDoc.text(sellerInfo.state + ' ' + sellerInfo.country, 7, 160, {
			width: 250,
		});

		pdfDoc.font(fontBold).text('Customer details:', 400, 100);
		pdfDoc
			.font(fontNormal)
			.text(customerInfo.name, 400, 115, { width: 250 });
		pdfDoc.text(customerInfo.email, 400, 130, { width: 250 });
		pdfDoc.text(customerInfo.number, 400, 145, { width: 250 });

		pdfDoc.text('Payment ID:' + orderInfo.paymentID, 7, 195, {
			width: 250,
		});
		pdfDoc.text('Date:' + todayDate, 7, 225, { width: 250 });

		pdfDoc.rect(7, 250, 560, 20).fill('#2AAAAC').stroke('#FC427B');
		pdfDoc.fillColor('#fff').text('ID', 20, 256, { width: 90 });
		pdfDoc.text('Package', 110, 256, { width: 190 });
		pdfDoc.text('Amount', 400, 256, { width: 100 });
		pdfDoc.text('Amount Paid', 500, 256, { width: 100 });

		let productNo = 1;

		orderInfo.products.forEach((element) => {
			console.log('adding', element.name);
			let y = 256 + productNo * 20;
			pdfDoc.fillColor('#000').text(element.id, 20, y, { width: 90 });
			pdfDoc.text(element.package, 110, y, { width: 190 });
			pdfDoc.text(element.totalAmount, 400, y, { width: 100 });
			pdfDoc.text(element.amountPaid, 500, y, { width: 100 });
			productNo++;
		});

		pdfDoc
			.rect(7, 256 + productNo * 20, 560, 0.2)
			.fillColor('#000')
			.stroke('#000');
		productNo++;

		pdfDoc.font(fontBold).text('Total:', 400, 256 + productNo * 17);
		pdfDoc
			.font(fontBold)
			.text(orderInfo.totalValue, 500, 256 + productNo * 17);

		pdfDoc.end();
		console.log('pdf generate successfully');
		return fileName;
	} catch (error) {
		throw new Error(error.message);
	}
}

module.exports = createInvoice;
