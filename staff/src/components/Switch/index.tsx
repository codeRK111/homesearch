import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels() {
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: false,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	return (
		<FormGroup row>
			<FormControlLabel
				control={
					<Switch
						checked={state.checkedB}
						onChange={handleChange}
						name="checkedB"
						color="primary"
					/>
				}
				label="Hold Leads"
			/>
		</FormGroup>
	);
}
