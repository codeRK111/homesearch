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

const NoPermissionWithDrawer = withDrawer(NoPermissions);

const HOC = (Component, info, OtherComponent = null) => {
	const Comp = ({ isAuthenticated, user, ...otherProps }) => {
		let showMain = true;
		for (let index = 0; index < info.length; index++) {
			const element = info[index];
			console.log(element);
			if (user[element.type].includes(element.value)) {
				showMain = true;
			} else {
				showMain = false;
				break;
			}
		}
		console.log('role', showMain);

		const renderPage = () => {
			// Check login status
			if (isAuthenticated) {
				// Allow all pages  if user is super admin
				if (user.type === 'super-admin') {
					return Component;
				} else {
					// check permission
					if (showMain) {
						return Component;
					} else {
						return OtherComponent ? OtherComponent : null;
					}
				}
			} else {
				return <Redirect to="/" />;
			}
		};

		return renderPage();
	};

	const mapStateToProps = createStructuredSelector({
		isAuthenticated: selectIsAuthenticated,
		user: selectCurrentUser,
	});

	return withRouter(connect(mapStateToProps)(Comp));
};

export default HOC;
