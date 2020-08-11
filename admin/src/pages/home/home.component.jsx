import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import './home.styles.scss';

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}));

function Dashboard() {
	const classes = useStyles();

	return (
		<Container maxWidth="lg" className={classes.container}>
			<Grid container spacing={3}>
				{/* Chart */}
				<Grid item xs={12}>
					<Paper>
						<Box p="1rem">
							<h3>Add User</h3>
						</Box>
					</Paper>
				</Grid>
				{/* Recent Deposits */}

				{/* Recent Orders */}
				<Grid item xs={12}>
					<Paper></Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Dashboard;
