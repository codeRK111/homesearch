import { Center } from '../../components/UI/center';
import { Container } from '@mui/material';
import { LoginForm } from '../../components/Form/login';
import React from 'react';

export const LogInPage = () => {
	return (
		<>
			<Container sx={{ height: '100vh' }}>
				<Center>
					<LoginForm />
				</Center>
			</Container>
		</>
	);
};
