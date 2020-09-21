import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { selectIsAuthenticated } from '../../redux/user/user.selector';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getAdminInfo } from '../../redux/user/user.actions';
import {
	selectAdminFetchLoading as adminFetchLoading,
	selectFetchAdminError as fetchAdminError,
} from '../../redux/user/user.selector';

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
			{isAuthenticated && !adminFetchLoading && (
				<Component {...otherProps} />
			)}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectIsAuthenticated,
	adminFetchLoading,
	fetchAdminError,
});

const mapActionToProps = (dispatch) => ({
	fetchAdmin: () => dispatch(getAdminInfo()),
});

export default withRouter(
	connect(mapStateToProps, mapActionToProps)(Authenticated)
);
