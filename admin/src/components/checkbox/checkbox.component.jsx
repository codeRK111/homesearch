import React from 'react';
import { useField } from 'formik';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const RowSelect = ({ heading, label, ...otherProps }) => {
	const [field] = useField(otherProps);
	return <FormControlLabel control={<Checkbox {...field} />} label={label} />;
};

export default RowSelect;
