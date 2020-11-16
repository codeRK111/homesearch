import {
	selectSignInError,
	selectUserProfileLoading,
} from '../../redux/auth/auth.selectors';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchUserProfile } from '../../redux/auth/auth.actions';
import { makeStyles } from '@material-ui/core/styles';
import { selectAuthenticated } from '../../redux/auth/auth.selectors';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const Authenticated = ({
	component: Component,
	history,
	isAuthenticated,
	fetchUser,
	userProfileLoading,
	signInError,
	redirect,
	...otherProps
}) => {
	const classes = useStyles();
	React.useEffect(() => {
		if (!isAuthenticated) {
			const jwt = localStorage.getItem('JWT_CLIENT');
			if (!jwt) {
				if (redirect) {
					return history.push('/login');
				}
			}
			fetchUser(jwt, console.log);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, fetchUser, history]);

	React.useEffect(() => {
		if (signInError) {
			if (redirect) {
				history.push('/login');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signInError, history]);

	return (
		<>
			<Backdrop className={classes.backdrop} open={userProfileLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			{!redirect && !userProfileLoading && <Component {...otherProps} />}
			{isAuthenticated && !userProfileLoading && (
				<Component {...otherProps} />
			)}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
	userProfileLoading: selectUserProfileLoading,
	signInError: selectSignInError,
});

const mapActionToProps = (dispatch) => ({
	fetchUser: (token, callback) =>
		dispatch(fetchUserProfile({ token, callback })),
});

export default withRouter(
	connect(mapStateToProps, mapActionToProps)(Authenticated)
);
