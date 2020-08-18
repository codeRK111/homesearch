import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserTable from '../../components/userTable/userTable.component';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Filter from '../../components/filter/filter.component';
import AddIcon from '@material-ui/icons/Add';

// import './home.styles.scss';

const useStyles = makeStyles((theme) => ({
	container: {
		// paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
}));

function Dashboard() {
	const classes = useStyles();
	const history = useHistory();

	const buttonClick = () => history.push('/users/add');

	return (
		<Box>
			<Box m="1rem">
				<Paper>
					<Filter />
				</Paper>
			</Box>
			<Container maxWidth="lg" className={classes.container}>
				<Grid container spacing={3}>
					{/* Chart */}

					<Grid item xs={12}>
						<Box display="flex" justifyContent="flex-end">
							<Button
								variant="contained"
								color="default"
								classes={{
									label: 'tranform-none',
								}}
								startIcon={<AddIcon />}
								size="small"
								onClick={buttonClick}
							>
								Add User
							</Button>
						</Box>
					</Grid>
					{/* Recent Deposits */}

					{/* Recent Orders */}
					<Grid item xs={12}>
						<Paper>
							<Box p="1rem">
								<UserTable />
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Dashboard;
