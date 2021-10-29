import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useField, useFormikContext } from 'formik';

import useStyles from './formik.styles';

// import clsx from 'clsx';

// import useGlobalClasses from '../../common.style';

const RowSelect = ({ spacing = true, iType = 'input', ...otherProps }) => {
	const classes = useStyles();
	// const globalClasses = useGlobalClasses();
	const [field, meta] = useField(otherProps);
	const formikBag = useFormikContext();
	const fieldRef = useRef(null);
	let helperText = (meta.value || meta.touched) && meta.error;

	const padding = {};
	const margin = {};
	if (spacing) {
		padding.p = '0.5rem';
		margin.mt = '0.3rem';
	}

	useEffect(() => {
		const firstError = Object.keys(formikBag.errors)[0];

		if (formikBag.isSubmitting && firstError === otherProps.name) {
			fieldRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}, [meta.error, formikBag.isSubmitting, otherProps.name, formikBag.errors]);

	return (
		<Box ref={fieldRef} {...padding}>
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
