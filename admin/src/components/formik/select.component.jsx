import {
	Box,
	FormControl,
	FormHelperText,
	MenuItem,
	Select,
} from '@material-ui/core';

import React from 'react';
import { useField } from 'formik';
import useStyles from './formik.styles';

const FSelect = ({ formLabel, options, ...otherProps }) => {
	const classes = useStyles();
	const [field, meta] = useField(otherProps);
	let helperText = meta.touched && meta.error;
	return (
		<Box p="0.5rem">
			<Box className={classes.label}>{formLabel}</Box>
			<Box mt="0.3rem">
				<FormControl
					size="small"
					variant="filled"
					fullWidth
					error={!!helperText}
				>
					<Select
						error={!!helperText}
						helperText={helperText}
						{...field}
						{...otherProps}
					>
						{options.map((c, i) => (
							<MenuItem value={c.value} key={i}>
								{c.label}
							</MenuItem>
						))}
					</Select>
					{!!helperText && (
						<FormHelperText>{helperText}</FormHelperText>
					)}
				</FormControl>
			</Box>
		</Box>
	);
};

export default FSelect;
