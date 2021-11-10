const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

let companyLogo = path.join(__dirname, '../static', 'images', 'gr-logo.png');
const docName = Date.now();
let fileName = path.join(__dirname, '../static', 'invoices', `${docName}.pdf`);
let fontNormal = 'Helvetica';
let fontBold = 'Helvetica-Bold';

const todayDate = moment().format('DD-MMM-YYYY');
function pad(num, size) {
	num = num.toString();
	while (num.length < size) num = '0' + num;
	return num;
}

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
		let pdfDoc = new PDFDocument({ autoFirstPage: false });
		pdfDoc.addPage({ margin: 36 });
		pdfDoc.pipe(fs.createWriteStream(fileName));
		pdfDoc.image(companyLogo, { width: 100, height: 40 });

		pdfDoc.font(fontBold).fontSize(16).text('Tax  Invoice', 200, 50);
		pdfDoc
			.font(fontNormal)
			.fontSize(12)
			.text('Invoice Number:', 400, 40, {
				continued: true,
			})
			.font(fontBold)
			.text(`GT-${pad(orderInfo.id, 6)}`);
		pdfDoc
			.font(fontNormal)
			.fontSize(12)
			.text('Invoice Date:', 400, 55, {
				continued: true,
			})
			.font(fontBold)
			.text(todayDate);
		pdfDoc.rect(32, 80, 560, 3).fill('#2AAAAC').stroke('#FC427B');
		pdfDoc.font(fontBold).fontSize(10).text('To:', 32, 100, {
			width: 300,
		});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text(`Name - ${customerInfo.name}`, 32, 115, {
				width: 200,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text(
				`Email - ${customerInfo.email ? customerInfo.email : ''}`,
				32,
				140,
				{
					width: 200,
				}
			);
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text(`Phone - ${customerInfo.number}`, 32, 155, {
				width: 200,
			});

		pdfDoc
			.fillColor('#2AAAAC')
			.font(fontBold)
			.fontSize(10)
			.text('From:', 220, 100, {
				width: 220,
			});

		pdfDoc
			.fillColor('#000000')
			.font(fontBold)
			.fontSize(10)
			.text('Grovis Technologies Pvt. Ltd', 220, 115, {
				width: 150,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontBold)
			.fontSize(10)
			.text('Registered Office:', 220, 135);

		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('#363,19th Main Road,1st Block', 220, 150, {
				width: 150,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('Rajajinagar,Banglore-560010', 220, 165, {
				width: 150,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontBold)
			.fontSize(10)
			.text('Eastern and Central Zone office:', 220, 185, {
				width: 170,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('2nd, Floor, JSS STP Tower 1,', 220, 200, {
				width: 150,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('Infocity, Patia', 220, 215, {
				width: 150,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('Bhubbaneswar 751024', 220, 230, {
				width: 150,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('Odisha India', 220, 245, {
				width: 150,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('PAN - AAICG873C', 220, 260, {
				width: 150,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('TAN - BLRG25733B', 220, 275, {
				width: 150,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('Status: ', 400, 100, {
				width: 70,
				continued: true,
			})
			.font(fontBold)
			.fontSize(10)
			.text('Paid', 400, 100, {
				width: 70,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontNormal)
			.fontSize(10)
			.text('Invoice Amount:  ', 400, 115, {
				continued: true,
			})
			.font(fontBold)
			.fontSize(10)
			.text(
				`INR ${Number(orderInfo.amountPaid).toLocaleString('en-IN')}`,
				400,
				115,
				{}
			);

		pdfDoc
			.font(fontNormal)
			.fontSize(10)
			.text('Package Provided By:', 32, 330, {
				width: 300,
				continued: true,
			});
		pdfDoc
			.fillColor('#000000')
			.font(fontBold)
			.fontSize(10)
			.text('Homesearchindia', 32, 330, {
				width: 150,
			});
		pdfDoc.rect(32, 350, 560, 20).fill('#2AAAAC').stroke('#FC427B');
		pdfDoc.fillColor('#fff').text('ID', 35, 356, { width: 90 });
		pdfDoc.text('Package', 140, 356, { width: 190 });
		pdfDoc.text('Amount', 300, 356, { width: 75 });
		pdfDoc.text('Discount Amount', 380, 356, { width: 100 });
		pdfDoc.text('Amount Paid', 500, 356, { width: 100 });

		// Data
		pdfDoc
			.fillColor('#000')
			.font(fontNormal)
			.text(`HS-${pad(orderInfo.id, 6)}`, 35, 380, { width: 90 });
		pdfDoc.text(orderInfo.package, 140, 380, { width: 190 });
		pdfDoc.text(orderInfo.totalAmount, 300, 380, { width: 100 });
		pdfDoc.text(orderInfo.discount, 400, 380, { width: 100 });
		pdfDoc.text(orderInfo.amountPaid, 500, 380, { width: 100 });
		pdfDoc.rect(32, 400, 560, 1).fill('#000').stroke('#FC427B');
		pdfDoc.text('Total', 400, 420, { width: 100 });
		pdfDoc
			.font(fontBold)
			.text(orderInfo.totalAmount, 540, 420, { width: 100 });
		pdfDoc.font(fontNormal).text('Discount', 400, 440, { width: 100 });
		pdfDoc
			.font(fontBold)
			.text(orderInfo.discount, 540, 440, { width: 100 });
		pdfDoc.font(fontNormal).text('SGST (9%)', 400, 460, { width: 100 });
		pdfDoc.font(fontBold).text('0', 540, 460, { width: 100 });
		pdfDoc.font(fontNormal).text('CGST (9%)', 400, 480, { width: 100 });
		pdfDoc.font(fontBold).text('0', 540, 480, { width: 100 });
		pdfDoc.font(fontNormal).text('IGST (9%)', 400, 500, { width: 100 });
		pdfDoc.font(fontBold).text('0', 540, 500, { width: 100 });
		pdfDoc.rect(400, 520, 170, 1).fill('#000').stroke('#FC427B');
		pdfDoc.font(fontBold).text('Total', 400, 530, { width: 100 });
		const totalAmount =
			Number(orderInfo.totalAmount) - Number(orderInfo.discount);
		pdfDoc
			.font(fontBold)
			.text(`${Number(totalAmount).toLocaleString('en-IN')}`, 540, 530, {
				width: 100,
			});

		pdfDoc
			.font(fontNormal)
			.fontSize(9)
			.text(
				'PAN: AAICG873C | TAN: BLRG25733B | CIN: U74999KA2019PTC129880 ',
				32,
				610,
				{ width: 560, align: 'center', lineGap: 3 }
			);
		pdfDoc
			.font(fontNormal)
			.fontSize(8)
			.text(
				'This is a computer generated invouce. Please contact payment@homesearchindia.com for more information',
				32,
				625,
				{ width: 560, align: 'center', lineGap: 3 }
			);

		pdfDoc.rect(32, 640, 560, 1).fill('#000').stroke('#FC427B');

		pdfDoc
			.font(fontNormal)
			.fillColor('red')
			.fontSize(9)
			.text(
				'Kindly make payments in favour of Grovis Technologies Pvt. Ltd',
				32,
				650,
				{ width: 560, align: 'center', lineGap: 3 }
			);
		pdfDoc
			.font(fontNormal)
			.fillColor('#000000')
			.fontSize(9)
			.text(
				'Bank: HDFC | Type: Current | Account: 50200046398570 | Branch : BENGALURU-560010 | IFSC : HDFC0001373 |  MICR : 560240044',
				32,
				670,
				{ width: 560, align: 'center', lineGap: 3 }
			);

		// );
		pdfDoc.end();
		console.log('pdf generate successfully');
		return { fileName, docName };
	} catch (error) {
		throw new Error(error.message);
	}
}

module.exports = createInvoice;
