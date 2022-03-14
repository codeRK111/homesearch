import Nav from '../pageNav/nav.component';
import React from 'react';
import { USER_ROLE } from '../../../utils/render.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../redux/auth/auth.selectors';

export const RenderByRole = (Component, role = USER_ROLE.Tenant) => {
	const D = ({ user, ...otherProps }) => {
		return user.role === role ? (
			<Component user={user} {...otherProps} />
		) : (
			<>
				<Nav />
				<h1>Not Authorized</h1>
			</>
		);
	};

	const mapStateToProps = createStructuredSelector({
		user: selectUser,
	});

	return connect(mapStateToProps)(D);
};
