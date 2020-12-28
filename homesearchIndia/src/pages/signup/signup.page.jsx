import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Copyright from '../../components/copyright/copyright.component';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import SignUpForm from '../../components/signupform/signupform.component';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from '../login/login.styles';

// Custom

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
									homesearchIndia
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
				className={classes.contentWrapper}
			>
				<div className={classes.paper}>
					<Box
						mb="3rem"
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<Avatar className={classes.avatar}>
							<PersonAddIcon />
						</Avatar>
						<div className={classes.signInText}>Sign up</div>
					</Box>
					<SignUpForm />

					<Box mt={5}>
						<Copyright />
					</Box>
				</div>
			</Grid>
		</Grid>
	);
}
