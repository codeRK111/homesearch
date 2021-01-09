import 'date-fns';

import {
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { Box } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import useStyles from './formik.styles';

const RowSelect = ({ formLabel, ...otherProps }) => {
	const classes = useStyles();
	return (
		<Box p="0.5rem">
			<Box className={classes.label}>{formLabel}</Box>
			<Box>
				<MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
					<KeyboardDateTimePicker
						fullWidth
						disablePast
						format="yyyy/MM/dd hh:mm a"
						style={{
							backgroundColor: '#e8e8e8',
							padding: '0.5rem 0',
						}}
						{...otherProps}
					/>
				</MuiPickersUtilsProvider>
			</Box>
		</Box>
	);
};

export default RowSelect;
