import {
	addAdmin,
	resetAddAdminError,
} from '../../redux/admins/admins.actions';
import {
	selectAddAdminError,
	selectAddAdminLoading,
} from '../../redux/admins/admins.selector';
import {
	selectAllStates,
	selectLoading as stateLoading,
} from '../../redux/city/city.selector';

import AddAdminForm from './addAdminForm.component';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAllStatesStart } from '../../redux/city/city.actions';
import { useHistory } from 'react-router-dom';

const EditUser = ({ addLoading, addError, addAdmin }) => {
	const history = useHistory();

	const redirectToAdmins = () => history.push('/admins');

	const buttonClick = (data) => {
		addAdmin(data, redirectToAdmins);
	};

	return (
		<Box p="1rem">
			<IconButton
				aria-label="back"
				onClick={() => history.push('/admins')}
			>
				<ArrowBackIcon />
			</IconButton>
			<div>
				<h3>Add admin / staff</h3>
				<p className="color-red">{addError}</p>

				<AddAdminForm onSubmit={buttonClick} loading={addLoading} />
			</div>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	allStates: selectAllStates,
	stateLoading,
	addLoading: selectAddAdminLoading,
	addError: selectAddAdminError,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	addAdmin: (admin, callback) => dispatch(addAdmin({ admin, callback })),
	resetAddAdminError: () => dispatch(resetAddAdminError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
