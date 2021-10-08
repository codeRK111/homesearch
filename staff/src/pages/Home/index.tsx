import { Box, Container, Typography } from '@material-ui/core';

import ClientSupportHome from './clientSupport';
import GmHome from './gm';
import React from 'react';
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
