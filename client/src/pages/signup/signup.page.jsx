import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Custom
import useStyles from '../login/login.styles';
import Copyright from '../../components/copyright/copyright.component';
import SignUpForm from '../../components/signupform/signupform.component';

export default function SignInSide() {
	const classes = useStyles();

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<div className={classes.paper}>
					<SignUpForm />

					<Box mt={5}>
						<Copyright />
					</Box>
				</div>
			</Grid>
		</Grid>
	);
}
