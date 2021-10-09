import { Box, Container, Typography } from '@material-ui/core';

import ASMManageLead from './asm';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { StaffType } from '../../model/staff.interface';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IParam {
	id: string;
}

const ManageLeadPage: React.FC<RouteComponentProps<IParam>> = ({
	match: {
		params: { id },
	},
}) => {
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
			case StaffType.AssistantSalesManager:
				return <ASMManageLead id={id} />;

			default:
				return <h1>Work in progress</h1>;
		}
	};
	return (
		<Container>
			<Box mt="1rem">
				<Typography variant="h5" gutterBottom align="center">
					Update Lead
				</Typography>
				<Box mt="1rem">{renderPage()}</Box>
			</Box>
		</Container>
	);
};

export default ManageLeadPage;
