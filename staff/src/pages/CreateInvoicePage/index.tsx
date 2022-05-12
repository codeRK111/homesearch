import { Box, Container, Typography } from '@material-ui/core';

import { CreateInvoiceForm } from '../../components/Forms/createInvoice';
import React from 'react';

const CreateInvoicePage = () => {
	return (
		<Container>
			<Box p="1rem">
				<Typography variant="h5" align="center">
					Create Invoice
				</Typography>
				<Box mt="1rem">
					<CreateInvoiceForm />
				</Box>
			</Box>
		</Container>
	);
};

export default CreateInvoicePage;
