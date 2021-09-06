import 'dayjs';

import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/dayjs';
import React from 'react';
import Test from './test';
import useStyles from './formik.styles';

const RowSelect = ({ formLabel, ...otherProps }) => {
	const classes = useStyles();
	return (
		<Box p="0.5rem">
			<Box className={classes.label}>{formLabel}</Box>
			<Box>
				<MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
					<DatePicker
						fullWidth
						disablePast
						id="date-picker-dialog"
						format="MM/DD/YYYY"
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
						style={{
							backgroundColor: '#e8e8e8',
							padding: '0.5rem 0',
						}}
						TextFieldComponent={Test}
						{...otherProps}
					/>
				</MuiPickersUtilsProvider>
			</Box>
		</Box>
	);
};

export default RowSelect;
