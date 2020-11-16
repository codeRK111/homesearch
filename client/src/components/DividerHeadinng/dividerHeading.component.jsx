import { Box } from '@material-ui/core';
import React from 'react';

const DividerHeading = ({ children }) => {
	return (
		<Box display="flex" width="100%" alignItems="center">
			<Box flexGrow={1}>
				<hr />
			</Box>
			<Box ml="0.5rem" mr="0.5rem">
				{children}
			</Box>
			<Box flexGrow={1}>
				<hr />
			</Box>
		</Box>
	);
};

export default DividerHeading;
