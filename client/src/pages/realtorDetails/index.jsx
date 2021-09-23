import { Box, Container, Typography } from '@material-ui/core';

import Nav from '../../components/v2/pageNav/nav.component';
import React from 'react';

const RealtorDetailsPage = ({
	match: {
		params: { id },
	},
}) => {
	return (
		<div>
			<Nav />
			<Box mt="2rem" mb="2rem">
				<Container>
					<Typography>{id}</Typography>
				</Container>
			</Box>
		</div>
	);
};

export default RealtorDetailsPage;
