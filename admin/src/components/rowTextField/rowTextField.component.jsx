import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '../textField/textField.component';

const RowSelect = ({ heading, ...otherProps }) => {
	return (
		<Box p="0.5rem">
			<Grid container>
				<Grid item xs={12} md={12} lg={4}>
					<Box p="0.3rem">{heading}</Box>
				</Grid>
				<Grid item xs={12} md={12} lg={8}>
					<Box p="0.3rem">
						<TextField {...otherProps} />
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default RowSelect;
