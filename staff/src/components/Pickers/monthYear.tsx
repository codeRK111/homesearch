import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import React from 'react';

// import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface IDateTimePickerComponent {
	label: string;
	date?: Date | null;
	handleDateChange: (date: Date | null) => void;
	disablePast?: boolean;
}

export function MonthYearPicker({
	label,
	handleDateChange,
	date = new Date(),
	disablePast = true,
}: IDateTimePickerComponent) {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DateTimePicker
				fullWidth
				disablePast={disablePast}
				label={label}
				value={date}
				onChange={handleDateChange}
				views={['year', 'month']}
			/>
		</MuiPickersUtilsProvider>
	);
}
