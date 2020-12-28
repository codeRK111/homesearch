import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

const FormInput = ({ ...otherProps }) => {
	const [field, meta] = useField(otherProps);
	let helperText = meta.touched && meta.error;
	return (
		<TextField
			error={!!helperText}
			helperText={helperText}
			{...field}
			{...otherProps}
		/>
	);
};

export default FormInput;
