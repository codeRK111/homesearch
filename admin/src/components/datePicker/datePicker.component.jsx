import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = ({ ...props }) => {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
			<KeyboardDatePicker
				margin="normal"
				fullWidth
				id="date-picker-dialog"
				label="Select Date"
				format="MM/dd/yyyy"
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
				{...props}
			/>
		</MuiPickersUtilsProvider>
	);
};

export default DatePicker;
