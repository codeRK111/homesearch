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
import { loginDialogStatus } from '../../redux/ui/ui.selectors';
import { makeStyles } from '@material-ui/core/styles';
import { selectAuthenticated } from '../../redux/auth/auth.selectors';
import { toggleLoginPopup } from '../../redux/ui/ui.actions';
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
	userProfileLoading,
	signInError,
	redirect,
	redirectTo = null,
	fetchUser,
	toggleLoginPopup,
	open,
	...otherProps
}) => {
	const classes = useStyles();
	const ref = React.useRef();
	React.useEffect(() => {
		if (open) {
			ref.current = open;
		}
	}, [open]);
	// console.log('redirect--->', redirectTo);
	React.useEffect(() => {
		if (!isAuthenticated) {
			const jwt = localStorage.getItem('JWT_CLIENT');
			if (!jwt) {
				return toggleLoginPopup(true);
			}
			fetchUser(jwt, console.log);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, fetchUser, history]);

	React.useEffect(() => {
		if (signInError) {
			toggleLoginPopup(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signInError, history]);
	React.useEffect(() => {
		console.log({ open, c: ref.current });
		if (!isAuthenticated) {
			if (open === false && ref.current === true) {
				history.goBack();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, isAuthenticated]);

	return (
		<>
			<Backdrop className={classes.backdrop} open={userProfileLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			{/* {!redirect && !userProfileLoading && <Component {...otherProps} />} */}
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
	open: loginDialogStatus,
});

const mapActionToProps = (dispatch) => ({
	fetchUser: (token, callback) =>
		dispatch(fetchUserProfile({ token, callback })),
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
});

export default withRouter(
	connect(mapStateToProps, mapActionToProps)(Authenticated)
);
