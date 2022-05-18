import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useField, useFormikContext } from 'formik';

import useStyles from './formik.styles';

const RowTextArea = ({ formLabel, spacing = true, ...otherProps }) => {
	const classes = useStyles();
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

export default RowTextArea;
