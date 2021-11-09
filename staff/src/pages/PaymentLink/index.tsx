import { Box, Container, Typography } from '@material-ui/core';

import CreatePaymentLinkForm from '../../components/Forms/createSubscription';
import React from 'react';

const PaymentLinkPage = () => {
	return (
		<Container>
			<Box mt="2rem">
				<Typography variant="h6" gutterBottom>
					Create a payment link
				</Typography>
				<CreatePaymentLinkForm />
			</Box>
		</Container>
	);
};

export default PaymentLinkPage;
