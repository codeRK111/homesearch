import { Redirect, withRouter } from 'react-router-dom';
import {
	selectCurrentUser,
	selectIsAuthenticated,
} from '../../redux/user/user.selector';

import NoPermissions from '../noPermissions/noPermissions.component';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import withDrawer from '../drawer/drawer.component';

const HOC = (components) => {
	const Comp = ({ isAuthenticated, user }) => {
		const renderComp = () => {
			switch (user.type) {
				case 'super-admin':
					console.log('yes admin');
					return components['super-admin']
						? components['super-admin']
						: null;
				case 'admin':
					return components['admin'] ? components['admin'] : null;
				case 'staff':
					return components['staff'] ? components['staff'] : null;

				default:
					return null;
			}
		};

		return renderComp();
	};

	const mapStateToProps = createStructuredSelector({
		isAuthenticated: selectIsAuthenticated,
		user: selectCurrentUser,
	});

	return withRouter(connect(mapStateToProps)(Comp));
};

export default HOC;
