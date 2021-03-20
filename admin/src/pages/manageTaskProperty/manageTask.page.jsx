import { Box, Button, Grid } from '@material-ui/core';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React from 'react';
import Schedule from './schedule.component';
import Table from './leadsTable.component';
import { useHistory } from 'react-router-dom';
import useStyles from './task.styles';

const ManageTask = ({
	match: {
		params: { id },
	},
}) => {
	const history = useHistory();
	const classes = useStyles();

	const onClick = () => {
		history.push('/add-property-advertisement-leads');
	};
	return (
		<Box p="1rem">
			<Box display="flex" width="100%" justifyContent="center" mb="1rem">
				<h3>Project Advertisement</h3>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={12} md={10}>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddCircleOutlineIcon />}
						onClick={onClick}
					>
						Add Details
					</Button>
				</Grid>
				<Grid item xs={12} md={2}>
					<Box className={classes.addButtonWrapper}>
						<Schedule />
					</Box>
				</Grid>
			</Grid>
			<Table projectAdvertisementId={id} />
		</Box>
	);
};

export default ManageTask;
