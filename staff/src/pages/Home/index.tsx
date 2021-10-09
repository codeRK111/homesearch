import { Box, Container, Typography } from '@material-ui/core';

import ASMHome from './asm';
import ClientSupportHome from './clientSupport';
import GmHome from './gm';
import React from 'react';
import SEHome from './se';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const HomePage = () => {
	const { user } = useTypedSelector((state) => state.auth);

	const renderPage = (): JSX.Element => {
		if (!user) {
			return (
				<Typography variant="h5" color="error">
					Invalid User
				</Typography>
			);
		}

		switch (user.type) {
			case 'gm':
				return <GmHome />;
			case 'clientSupport':
				return <ClientSupportHome />;
			case 'assistantSalesManager':
				return <ASMHome />;
			case 'salesExecutive':
				return <SEHome />;

			default:
				return <h1>Work in progress</h1>;
		}
	};
	return (
		<Container maxWidth="xl">
			<Box mt="1rem">{renderPage()}</Box>
		</Container>
	);
};

export default HomePage;
