import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import React from 'react';

// import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface IDateTimePickerComponent {
	label: string;
	date?: Date | null;
	handleDateChange: (date: Date | null) => void;
	disablePast?: boolean;
}

function DatePickerComponent({
	label,
	handleDateChange,
	date = new Date(),
	disablePast = false,
}: IDateTimePickerComponent) {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DatePicker
				fullWidth
				disablePast={disablePast}
				label={label}
				value={date}
				onChange={handleDateChange}
			/>
		</MuiPickersUtilsProvider>
	);
}

export default DatePickerComponent;
