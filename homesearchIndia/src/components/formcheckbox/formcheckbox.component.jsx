import React from 'react';
import { useField } from 'formik';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const FormInput = ({ label, ...otherProps }) => {
	const [field] = useField(otherProps);
	return (
		<FormControlLabel
			control={<Checkbox color="primary" {...field} {...otherProps} />}
			label={label}
		/>
	);
};

export default FormInput;
