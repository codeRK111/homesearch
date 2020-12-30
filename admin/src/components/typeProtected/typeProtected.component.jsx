import { Redirect, withRouter } from 'react-router-dom';
import {
	selectAdminFetchLoading as adminFetchLoading,
	selectFetchAdminError as fetchAdminError,
} from '../../redux/user/user.selector';
import {
	selectCurrentUser,
	selectIsAuthenticated,
} from '../../redux/user/user.selector';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAdminInfo } from '../../redux/user/user.actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const Authenticated = ({
	baseComponent: Component,
	currentUser,
	type,
	history,
	isAuthenticated,
	fetchAdmin,
	adminFetchLoading,
	fetchAdminError,
	...otherProps
}) => {
	const classes = useStyles();
	React.useEffect(() => {
		if (!isAuthenticated) {
			const jwt = localStorage.getItem('JWT');
			if (!jwt) {
				return history.push('/');
			}
			fetchAdmin();
		}
	}, [isAuthenticated]);

	React.useEffect(() => {
		if (fetchAdminError.status === 401) {
			history.push('/');
		}
	}, [fetchAdminError.status]);

	return (
		<>
			<Backdrop className={classes.backdrop} open={adminFetchLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			{isAuthenticated &&
			!adminFetchLoading &&
			currentUser.type === type ? (
				<Component {...otherProps} />
			) : (
				<Redirect to="/" />
			)}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectIsAuthenticated,
	adminFetchLoading,
	fetchAdminError,
	currentUser: selectCurrentUser,
});

const mapActionToProps = (dispatch) => ({
	fetchAdmin: () => dispatch(getAdminInfo()),
});

export default withRouter(
	connect(mapStateToProps, mapActionToProps)(Authenticated)
);
