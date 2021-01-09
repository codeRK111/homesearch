import { Box, Button, Grid } from '@material-ui/core';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React from 'react';
import { useHistory } from 'react-router-dom';

const ManageTask = ({
	match: {
		params: { id },
	},
}) => {
	const history = useHistory();

	const onClick = () => {
		history.push('/add-project-advertisement-leads');
	};
	return (
		<Box p="1rem">
			<Grid container spacing={2}>
				<Grid item xs={12} md={10}>
					<h3>Project Advertisement</h3>
				</Grid>
				<Grid item xs={12} md={2}>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddCircleOutlineIcon />}
						onClick={onClick}
					>
						Add Details
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ManageTask;
