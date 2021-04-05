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
import { store } from '../../redux/store';

const HOC = (components) => {
	const currentUser = store.getState().user.currentUser;
	const type = currentUser ? currentUser.type : null;
	console.log({ type });
	switch (type) {
		case 'super-admin':
			return components['super-admin'] ? components['super-admin'] : null;
		case 'admin':
			return components['admin'] ? components['admin'] : null;
		case 'staff':
			return components['staff'] ? components['staff'] : null;

		default:
			return null;
	}
};

export default HOC;
