import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

const CSelectField = ({
	value,
	onChange,
	name,
	label,
	menuItems,
	error,
	helperText,
	variant,
	loading = false,
	...otherProps
}) => {
	return (
		<FormControl
			variant={variant ? variant : 'outlined'}
			fullWidth
			size="small"
			error={error}
		>
			<InputLabel id="demo-simple-select-outlined-label">
				{label}
			</InputLabel>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={value}
				onChange={onChange}
				name={name}
				label="type"
				{...otherProps}
			>
				{loading ? (
					<MenuItem value={''}>
						<em>{'loading...'}</em>
					</MenuItem>
				) : (
					menuItems.map((c, i) => (
						<MenuItem key={i} value={c.value}>
							{c.label}
						</MenuItem>
					))
				)}
			</Select>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
};

export default CSelectField;
