import { FormControlLabel, Switch } from '@material-ui/core';

import React from 'react';

const Filter = ({ today, setToday }) => {
	const handleChange = (event) => {
		setToday(event.target.checked);
	};
	return (
		<div>
			<FormControlLabel
				control={
					<Switch
						checked={today}
						onChange={handleChange}
						name="checkedA"
					/>
				}
				label="Only Today"
			/>
		</div>
	);
};

export default Filter;
