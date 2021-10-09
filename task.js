const Lead = require('./models/leadsModel');

Lead.updateMany(
	{
		bdm: '615c528ab653662e4099dba0',
	},
	{
		saleStaffType: 'assistantSalesManager',
	}
)
	.then((c) => console.log(c))
	.catch((e) => console.log(e));
