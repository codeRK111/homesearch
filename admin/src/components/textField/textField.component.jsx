import React from 'react';
import TextField from '@material-ui/core/TextField';

const CTextField = ({
	value,
	onChange,
	name,
	label,
	error,
	helperText,
	...otherProps
}) => {
	const memoValue = React.useMemo(() => value, [value]);
	const handleChange = React.useCallback(onChange, []);
	return (
		<TextField
			error={error}
			id="outlined-basic"
			label={label}
			variant="outlined"
			name={name}
			value={memoValue}
			onChange={handleChange}
			fullWidth
			helperText={helperText}
			size="small"
			{...otherProps}
		/>
	);
};

export default CTextField;
