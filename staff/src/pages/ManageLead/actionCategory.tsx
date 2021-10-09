import { ActionType } from './asm';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';

interface IActionTypeRadio {
	value: null | ActionType;
	setValue: (value: null | ActionType) => void;
}

export default function ActionTypeRadio({ value, setValue }: IActionTypeRadio) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value as any);
	};

	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">Select Action</FormLabel>
			<RadioGroup value={value} onChange={handleChange} row>
				<FormControlLabel
					value={ActionType.Close}
					control={<Radio />}
					label="Close"
				/>
				<FormControlLabel
					value={ActionType.Forward}
					control={<Radio />}
					label="Forward"
				/>
			</RadioGroup>
		</FormControl>
	);
}
