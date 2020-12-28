import { Box, FilledInput, FormControl, TextField } from '@material-ui/core';
import { IconButton, InputAdornment } from '@material-ui/core';

import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useField } from 'formik';
import useStyles from './formik.styles';

const RowSelect = ({ formLabel, ...otherProps }) => {
	const classes = useStyles();
	const [field, meta] = useField(otherProps);
	let helperText = (meta.value || meta.touched) && meta.error;
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<Box p="0.5rem">
			<Box className={classes.label}>{formLabel}</Box>
			<Box mt="0.3rem">
				<FormControl variant="filled" fullWidth>
					<FilledInput
						focused={Boolean(helperText)}
						fullWidth
						size="small"
						variant="filled"
						error={!!helperText}
						helperText={helperText}
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							</InputAdornment>
						}
						{...field}
						{...otherProps}
					/>
				</FormControl>
			</Box>
		</Box>
	);
};

export default RowSelect;
