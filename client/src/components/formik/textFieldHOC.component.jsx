import React from 'react';
import { useField } from 'formik';

const FormikField = ({ Component, ...otherProps }) => {
	const [field, meta] = useField(otherProps);
	let helperText = (meta.value || meta.touched) && meta.error;

	return <Component error={helperText} {...field} {...otherProps} />;
};

export default FormikField;
