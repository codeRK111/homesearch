import { Box, TextField } from '@material-ui/core';

import React from 'react';
import { useField } from 'formik';
import useStyles from './formik.styles';

const RowSelect = ({ formLabel, ...otherProps }) => {
	const classes = useStyles();
	const [field, meta] = useField(otherProps);
	let helperText = meta.touched && meta.error;
	return (
		<Box p="0.5rem">
			<Box className={classes.label}>{formLabel}</Box>
			<Box mt="0.3rem">
				<TextField
					fullWidth
					size="small"
					variant="filled"
					error={!!helperText}
					helperText={helperText}
					{...field}
					{...otherProps}
				/>
			</Box>
		</Box>
	);
};

export default RowSelect;
