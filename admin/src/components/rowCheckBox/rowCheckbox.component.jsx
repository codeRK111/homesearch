import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const RowSelect = ({ heading, children, center = false }) => {
	const boxProps = {};
	if (center) {
		boxProps.height = '100%';
		boxProps.display = 'flex';
		boxProps.alignItems = 'center';
	}
	return (
		<Box p="0.5rem">
			<Grid container>
				<Grid item xs={12} md={12} lg={4}>
					<Box p="0.3rem" {...boxProps}>
						{heading}
					</Box>
				</Grid>
				<Grid item xs={12} md={12} lg={8}>
					<Box p="0.3rem">
						<Grid container>{children}</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default RowSelect;
