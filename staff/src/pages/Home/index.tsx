import { Box, Container, Typography } from '@material-ui/core';

import ASMHome from './asm';
import AccountantHome from './accountat';
import ClientSupportHome from './clientSupport';
import GmHome from './gm';
import LeadStrategistHome from './leadStrategist';
import React from 'react';
import SEHome from './se';
import { StaffType } from '../../model/staff.interface';
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
			case StaffType.GM:
				return <GmHome />;
			case StaffType.ClientSupport:
				return <ClientSupportHome />;
			case StaffType.AssistantSalesManager:
				return <ASMHome />;
			case StaffType.SalesExecutive:
				return <SEHome />;
			case StaffType.Accountant:
				return <AccountantHome />;

			default:
				return <LeadStrategistHome />;
		}
	};
	return (
		<Container maxWidth="xl">
			<Box mt="1rem">{renderPage()}</Box>
		</Container>
	);
};

export default HomePage;
