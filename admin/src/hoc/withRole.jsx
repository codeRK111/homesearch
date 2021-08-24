import {
	selectCurrentUser,
	selectIsAuthenticated,
} from '../redux/user/user.selector';

import EmptyComponent from '../components/emptyComponent';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

const withRole = (Component, info) => {
	const Comp = ({ isAuthenticated, user, ...otherProps }) => {
		let showMain = true;
		if (info.includes(user.type)) {
			showMain = true;
		} else {
			showMain = false;
		}

		console.log(showMain);
		const renderPage = () => {
			return showMain ? (
				<Component {...otherProps} />
			) : (
				<EmptyComponent />
			);
		};

		return isAuthenticated ? renderPage() : <EmptyComponent />;
	};

	const mapStateToProps = createStructuredSelector({
		isAuthenticated: selectIsAuthenticated,
		user: selectCurrentUser,
	});

	return withRouter(connect(mapStateToProps)(Comp));
};

export default withRole;
