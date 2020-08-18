import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { toggleUserInfo } from '../../redux/users/users.actions';

const CustomSelect = ({ value, toggleUserInfo, userId, items = [] }) => {
	const [change, setChange] = React.useState(value);
	const handleMobileStatus = (e) => {
		setChange(e.target.value);
		toggleUserInfo({ mobileStatus: e.target.value }, userId, console.log);
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
	toggleUserInfo: (user, userId, callback) =>
		dispatch(toggleUserInfo({ user, userId, callback })),
});

export default connect(null, mapDispatchToProps)(CustomSelect);
