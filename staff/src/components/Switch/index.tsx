import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React from 'react';
import Switch from '@material-ui/core/Switch';

interface ISwitchLabels {
	value: boolean;
	setValue: (value: boolean) => void;
	label?: string;
}

export default function SwitchLabels({
	value,
	setValue,
	label = 'Hold Leads',
}: ISwitchLabels) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.checked);
	};

	return (
		<FormGroup row>
			<FormControlLabel
				control={
					<Switch
						checked={value}
						onChange={handleChange}
						name="checkedB"
						color="primary"
					/>
				}
				label={label}
			/>
		</FormGroup>
	);
}
