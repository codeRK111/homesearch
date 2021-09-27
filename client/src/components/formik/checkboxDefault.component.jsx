import { Box, Checkbox, FormControlLabel } from '@material-ui/core';

import React from 'react';
import { useField } from 'formik';
import useStyles from './formik.styles';

const FormikCheckbox = ({ formLabel, ...otherProps }) => {
	const classes = useStyles();
	const [field] = useField(otherProps);
	return (
		<Box>
			<FormControlLabel
				// classes={{
				// 	label: classes.label,
				// }}
				control={<Checkbox {...field} {...otherProps} />}
				label={formLabel}
			/>
		</Box>
	);
};

export default FormikCheckbox;
