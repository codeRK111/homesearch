import { Box, Divider, Typography } from '@material-ui/core';

import Button from '../appBarButton/appBarButton.component';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from '../../redux/auth/auth.selectors';
import { signOut } from '../../redux/auth/auth.actions';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../appBar/appBar.styles';

function TemporaryDrawer({ open, handleDrawer, isAuthenticated, signOut }) {
	const history = useHistory();
	const classes = useStyles();
	const redirectToPostProperty = (_) => history.push('/post-property');
	const goToHomePage = (_) => history.push('/');
	const redirectToLogIn = (_) => history.push('/login');
	const logOut = () => {
		signOut();
		history.push('/login');
	};
	const goToProfilePage = (e) => {
		history.push('/profile');
	};
	return (
		<div>
			<React.Fragment>
				<Drawer anchor={'left'} open={open} onClose={handleDrawer}>
					<Box p="1rem">
						<Typography
							variant="h6"
							onClick={goToHomePage}
							className={classes.titleWrapper}
						>
							Homesearch
							<span className={classes.lastWord}>18</span>
						</Typography>
						<Box mt="0.5rem" mb="0.5rem">
							<Divider />
						</Box>
						<Box mt="1rem">
							<Button
								text="Post Property"
								onClick={redirectToPostProperty}
							/>
						</Box>
						<Box mt="1rem">
							{isAuthenticated ? (
								<Box>
									<Box
										p="0.5rem"
										display="flex"
										justifyContent="center"
										onClick={goToProfilePage}
									>
										<b>Profile</b>
									</Box>
									<Box
										p="0.5rem"
										display="flex"
										justifyContent="center"
										onClick={logOut}
									>
										<b>Logout</b>
									</Box>
								</Box>
							) : (
								<Box ml="1rem">
									<Button
										text="Login / Signup"
										onClick={redirectToLogIn}
									/>
								</Box>
							)}
						</Box>
					</Box>
				</Drawer>
			</React.Fragment>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
	signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);
