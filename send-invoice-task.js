const createInvoice = require('./utils/createTenantInvoice');
const sendEmailInvoice = require('./utils/sendMailInvoice');

const executeTask = async () => {
	try {
		const invoiceName = await createInvoice(
			{
				name: 'Jayanath',
				email: 'jayantasaho@gmail.com',
				number: '7008341880',
			},
			{
				id: 162,
				package: '2999',
				totalAmount: 3499,
				amountPaid: 2999,
				discount: 500,
				tax: 0,
			}
		);
		console.log(`${invoiceName.docName}.pdf`);
		const respEmail = await sendEmailInvoice(
			'jayantasaho@gmail.com',
			'Homesearch package invoice',
			invoiceName.fileName,
			`${invoiceName.docName}.pdf`
		);
		console.log(respEmail);
	} catch (error) {
		console.log(error);
	}
};

executeTask();
