import { Center } from '../../components/UI/center';
import Container from '@mui/material/Container';
import React from 'react';
import Typography from '@mui/material/Typography';

export const NotFoundPage = () => {
	return (
		<React.Fragment>
			<Container maxWidth="md" sx={{ height: '100vh' }}>
				<Center>
					<Typography align="center" variant="h4">
						Page Not Found
					</Typography>
				</Center>
			</Container>
		</React.Fragment>
	);
};
