import { Box, Container, Typography } from '@material-ui/core';

import React from 'react';
import { StaffType } from '../../model/staff.interface';
import { withAccess } from '../../components/HOC/withRole';

const ManagePaymentPage = () => {
	return (
		<Container>
			<Box mt="2rem">
				<Typography variant="h5" align="center" gutterBottom>
					Subscriptions
				</Typography>
			</Box>
		</Container>
	);
};

export default withAccess(ManagePaymentPage, [StaffType.ClientSupport]);
