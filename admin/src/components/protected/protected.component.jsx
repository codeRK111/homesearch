import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectIsAuthenticated } from '../../redux/user/user.selector';

const Authenticated = ({
	component: Component,
	history,
	isAuthenticated,
	...otherProps
}) => {
	if (!isAuthenticated) {
		history.push('/');
	}
	return (
		<>
			<Component />
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectIsAuthenticated,
});

export default withRouter(connect(mapStateToProps, null)(Authenticated));
