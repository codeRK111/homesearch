import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import {
	updateProjectDetails,
	fetchProjects,
} from '../../redux/project/project.action';
import { withRouter } from 'react-router-dom';

const CustomSelect = ({
	value,
	updateBuilder,
	fetchBuilders,
	builderId,
	match: {
		params: { status },
	},
	items = [],
}) => {
	const callBack = (type) => {
		if (type === 'success') {
			fetchBuilders(console.log, status);
		}
	};
	const handleMobileStatus = (e) => {
		console.log(builderId);
		updateBuilder(builderId, { status: e.target.value }, callBack);
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
	updateBuilder: (projectId, project, callback) =>
		dispatch(updateProjectDetails({ projectId, project, callback })),
	fetchBuilders: (callback, status) =>
		dispatch(fetchProjects({ callback, param: { status } })),
});

export default withRouter(connect(null, mapDispatchToProps)(CustomSelect));
