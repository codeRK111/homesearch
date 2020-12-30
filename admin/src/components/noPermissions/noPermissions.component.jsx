import { Box, Paper } from '@material-ui/core';

import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';

const NoPermissions = () => {
	return (
		<Box m="1rem">
			<Paper>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="50vh"
					flexDirection="column"
				>
					<ErrorIcon style={{ fontSize: 40, color: 'red' }} />
					<h3>You have no permissions for this task</h3>
				</Box>
			</Paper>
		</Box>
	);
};

export default NoPermissions;
