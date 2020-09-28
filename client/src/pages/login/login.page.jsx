import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Custom
import useStyles from './login.styles';
import Copyright from '../../components/copyright/copyright.component';
import LoginWrapper from '../../components/loginwrapper/loginwrapper.component';

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
					<LoginWrapper />
					<Box mt={5} width="100%">
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							login via google
						</Button>
					</Box>
					<Box mt={1} width="100%">
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="default"
						>
							login via facebook
						</Button>
					</Box>
					<Box mt={5}>
						<Copyright />
					</Box>
				</div>
			</Grid>
		</Grid>
	);
}
