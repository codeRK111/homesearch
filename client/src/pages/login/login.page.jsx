import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Custom
import useStyles from './login.styles';
import Copyright from '../../components/copyright/copyright.component';
import LoginWrapper from '../../components/loginwrapper/loginwrapper.component';

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
							<LockOutlinedIcon />
						</Avatar>
						<div className={classes.signInText}>Sign in</div>
					</Box>
					<LoginWrapper />
					<Box mt={5} width="100%">
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							classes={{
								label: 'text-normal',
							}}
							startIcon={
								<img
									src={require('../../assets/g-logo.png')}
									height="30px"
									alt="google-logo"
								/>
							}
						>
							Login via google
						</Button>
					</Box>

					<Box mt={1} width="100%">
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="default"
							classes={{
								label: 'text-normal',
							}}
							startIcon={
								<img
									src={require('../../assets/f-logo.png')}
									height="30px"
									alt="facebook-logo"
								/>
							}
						>
							Login via facebook
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
