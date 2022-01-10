import { Box, Container, Typography } from '@material-ui/core';

import React from 'react';

const MyDealsPage = () => {
	return (
		<Container>
			<Box mt="1rem">
				<Typography variant="h5" gutterBottom>
					My Deals
				</Typography>
			</Box>
		</Container>
	);
};

export default MyDealsPage;
