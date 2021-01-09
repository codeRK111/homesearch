import {
	selectAllAdmins,
	selectAllAdminsLoading,
} from '../../redux/admins/admins.selector';

import CheckBox from '../formik/checkbox.component';
import { Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAllAdminsStart } from '../../redux/admins/admins.actions';

const StaffManagement = ({
	fetchAllAdminsStart,
	allAdmins,
	adminLoading,
	id = null,
}) => {
	React.useEffect(() => {
		fetchAllAdminsStart();
	}, [fetchAllAdminsStart]);
	return (
		<Grid container spacing={1}>
			{allAdmins
				.filter((b) => b.type === 'staff' && b.id !== id)
				.map((c) => (
					<Grid item xs={12} md={4} key={c.id}>
						<CheckBox
							name="staffAccess"
							value={c.id}
							formLabel={c.name}
							type="checkbox"
						/>
					</Grid>
				))}
		</Grid>
	);
};

const mapStateToProps = createStructuredSelector({
	allAdmins: selectAllAdmins,
	adminLoading: selectAllAdminsLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAllAdminsStart: () => dispatch(fetchAllAdminsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StaffManagement);
