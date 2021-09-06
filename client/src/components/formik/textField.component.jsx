import { Box, Typography } from '@material-ui/core';

import React from 'react';
import { useField } from 'formik';
import useStyles from './formik.styles';

const RowSelect = ({ formLabel, spacing = true, error, ...otherProps }) => {
	const classes = useStyles();
	const [field, meta] = useField(otherProps);
	let helperText = (meta.value || meta.touched) && meta.error;

	const padding = {};
	const margin = {};
	if (spacing) {
		padding.p = '0.5rem';
		margin.mt = '0.3rem';
	}

	return (
		<Box {...padding}>
			<Box className={classes.label}>{formLabel}</Box>
			<Box {...margin}>
				<input
					className={classes.input}
					focused={Boolean(helperText)}
					fullWidth
					size="small"
					variant="filled"
					error={!!helperText}
					helperText={helperText}
					onBlur={() => {}}
					{...field}
					{...otherProps}
				/>
			</Box>
			{error && (
				<Typography style={{ color: 'red' }} variant="caption">
					{error}
				</Typography>
			)}
		</Box>
	);
};

export default RowSelect;
