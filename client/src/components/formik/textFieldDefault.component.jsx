import { Box } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { useField } from 'formik';
import useGlobalClasses from '../../common.style';
import useStyles from './formik.styles';

const RowSelect = ({ spacing = true, ...otherProps }) => {
	const classes = useStyles();
	const globalClasses = useGlobalClasses();
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
				<Box
					className={clsx(classes.label, globalClasses.colorWarning)}
				>
					{helperText}
				</Box>
			)}
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
		</Box>
	);
};

export default RowSelect;
