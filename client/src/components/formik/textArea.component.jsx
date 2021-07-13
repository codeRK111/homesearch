import { Box, Typography } from '@material-ui/core';

import React from 'react';
import { useField } from 'formik';
import useStyles from './formik.styles';

const RowSelect = ({ formLabel, spacing = true, ...otherProps }) => {
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
			{!!helperText && (
				<Typography color="error" variant="caption">
					{helperText}
				</Typography>
			)}
			<Box {...margin}>
				<textarea
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
		</Box>
	);
};

export default RowSelect;
