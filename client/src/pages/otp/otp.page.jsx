import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Custom
import useStyles from '../login/login.styles';
import Copyright from '../../components/copyright/copyright.component';
import OtpForm from '../../components/validateNumber/validateNumber.component';

export default function SignInSide() {
	const classes = useStyles();
	const matches = useMediaQuery('(min-width:600px)');

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image}>
				{matches && (
					<div className={classes.overlay}>
						<div className={classes.textWrapper}>
							<Box>
								<img
									src={require('../../assets/logo.png')}
									alt="logo"
								/>
							</Box>
							<h1>
								Welcome to{' '}
								<span className={classes.title}>
									homesearch18
								</span>
							</h1>
						</div>
					</div>
				)}
			</Grid>
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
					<Box
						mb="3rem"
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<Avatar className={classes.avatar}>
							<PhoneAndroidIcon />
						</Avatar>
						<div className={classes.signInText}>Verify Number</div>
					</Box>
					<OtpForm />

					<Box mt={5}>
						<Copyright />
					</Box>
				</div>
			</Grid>
		</Grid>
	);
}
