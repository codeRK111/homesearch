import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const RowSelect = ({ heading, children }) => {
	return (
		<Box p="0.5rem">
			<Grid container>
				<Grid item xs={12} md={12} lg={4}>
					<Box p="0.3rem">{heading}</Box>
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
