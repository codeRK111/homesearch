import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import {
	updateProperty,
	fetchProperties,
} from '../../redux/property/property.actions';
import { withRouter } from 'react-router-dom';

const CustomSelect = ({
	value,
	updateProperty,
	fetchProperties,
	propertyId,
	match: {
		params: { status },
	},
	items = [],
}) => {
	const callBack = (type) => {
		if (type === 'success') {
			fetchProperties(console.log, status);
		}
	};
	const handleMobileStatus = (e) => {
		console.log(propertyId);
		updateProperty(propertyId, { status: e.target.value }, callBack);
	};

	return (
		<FormControl>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={value}
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
	updateProperty: (propertyId, property, callback) =>
		dispatch(updateProperty({ propertyId, property, callback })),
	fetchProperties: (callback, status) =>
		dispatch(fetchProperties({ callback, status })),
});

export default withRouter(connect(null, mapDispatchToProps)(CustomSelect));
