import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';

import React from 'react';
import { useField } from 'formik';

const RowSelect = ({ formLabel, options, ...otherProps }) => {
	const [field, meta] = useField(otherProps);
	let helperText = meta.touched && meta.error;
	return (
		<Box mt="1rem">
			<Box>
				<FormControl variant="outlined" fullWidth>
					<InputLabel id="demo-simple-select-readonly-label">
						{formLabel}
					</InputLabel>
					<Select
						error={!!helperText}
						helperText={helperText}
						{...field}
						{...otherProps}
					>
						{options.map((c, i) => (
							<MenuItem value={c.value} key={i}>
								{c.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</Box>
	);
};

export default RowSelect;
