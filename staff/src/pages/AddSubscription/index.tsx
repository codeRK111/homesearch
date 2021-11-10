import { Box, Container, Typography } from '@material-ui/core';

import CreateSubscriptionForm from '../../components/Forms/createSubscription';
import GoBack from '../../components/GoBack';
import React from 'react';
import { StaffType } from '../../model/staff.interface';
import { withAccess } from '../../components/HOC/withRole';

const AddSubscriptionPage = () => {
	return (
		<Container>
			<Box mt="2rem">
				<GoBack />

				<Typography variant="h5" gutterBottom>
					Add Subscription
				</Typography>
				<CreateSubscriptionForm />
			</Box>
		</Container>
	);
};

export default withAccess(AddSubscriptionPage, [StaffType.Accountant]);
