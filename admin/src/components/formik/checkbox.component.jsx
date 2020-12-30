import { Box, Checkbox, FormControlLabel } from '@material-ui/core';

import React from 'react';
import { useField } from 'formik';
import useStyles from './formik.styles';

const RowSelect = ({ formLabel, ...otherProps }) => {
	const classes = useStyles();
	const [field] = useField(otherProps);
	return (
		<Box>
			<Box mt="0.3rem">
				<FormControlLabel
					control={<Checkbox {...field} {...otherProps} />}
					label={formLabel}
				/>
			</Box>
		</Box>
	);
};

export default RowSelect;
