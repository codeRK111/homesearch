import 'date-fns';

import { Box, TextField } from '@material-ui/core';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import useStyles from './formik.styles';

const FormikFilledDatePicker = ({
	formLabel,
	disablePast = true,
	...otherProps
}) => {
	const classes = useStyles();
	return (
		<Box p="0.5rem">
			<Box className={classes.label}>{formLabel}</Box>
			<Box>
				<MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
					<KeyboardDatePicker
						fullWidth
						disablePast={disablePast}
						id="date-picker-dialog"
						format="MM/dd/yyyy"
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
						style={{
							backgroundColor: '#e8e8e8',
							padding: '0.5rem 0',
						}}
						TextFieldComponent={TextField}
						{...otherProps}
					/>
				</MuiPickersUtilsProvider>
			</Box>
		</Box>
	);
};

export default FormikFilledDatePicker;
