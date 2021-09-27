import { Box, Typography } from '@material-ui/core';

import React from 'react';
import { useField } from 'formik';
import useStyles from './formik.styles';

// import clsx from 'clsx';

// import useGlobalClasses from '../../common.style';

const RowSelect = ({ spacing = true, iType = 'input', ...otherProps }) => {
	const classes = useStyles();
	// const globalClasses = useGlobalClasses();
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
			{!helperText && otherProps.label && (
				<Typography variant="caption">{otherProps.label}</Typography>
			)}
			<Box {...margin}>
				{iType === 'input' ? (
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
				) : (
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
				)}
			</Box>
		</Box>
	);
};

export default RowSelect;
