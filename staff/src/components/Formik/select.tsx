import { FieldHookConfig, useField } from 'formik';
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	SelectProps,
} from '@material-ui/core';

import React from 'react';

interface IFSelect {
	label: string;
	showNone?: boolean;
}

const FSelect: React.FC<IFSelect & SelectProps & FieldHookConfig<string>> = ({
	showNone = true,
	...props
}) => {
	const [field, meta] = useField(props);
	let helperText = (meta.value || meta.touched) && meta.error;
	return (
		<FormControl error={!!helperText} fullWidth size="small">
			<InputLabel id="demo-simple-select-error-label">
				{props.label}
			</InputLabel>
			<Select
				variant="filled"
				labelId="demo-simple-select-error-label"
				id="demo-simple-select-error"
				{...field}
				{...props}
			>
				{showNone && (
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
				)}
				{props.children}
			</Select>
			{!!helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default FSelect;
