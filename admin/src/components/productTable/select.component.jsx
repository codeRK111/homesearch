import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { toggleAdminInfo } from '../../redux/admins/admins.actions';

const CustomSelect = ({ value, toggleAdminInfo, userId, items = [] }) => {
	const [change, setChange] = React.useState(value);
	const handleMobileStatus = (e) => {
		setChange(e.target.value);
		toggleAdminInfo({ type: e.target.value }, userId, console.log);
	};

	return (
		<FormControl>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={change}
				onChange={handleMobileStatus}
			>
				{items.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

const mapDispatchToProps = (dispatch) => ({
	toggleAdminInfo: (admin, adminId, callback) =>
		dispatch(toggleAdminInfo({ admin, adminId, callback })),
});

export default connect(null, mapDispatchToProps)(CustomSelect);
