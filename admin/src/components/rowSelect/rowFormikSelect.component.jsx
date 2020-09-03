import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from '../select/select.component';
import { useField } from 'formik';

const RowSelect = ({ heading, ...otherProps }) => {
	const [field, meta] = useField(otherProps);
	let helperText = meta.touched && meta.error;
	return (
		<Box p="0.5rem">
			<Grid container>
				<Grid item xs={12} md={12} lg={4}>
					<Box p="0.3rem">{heading}</Box>
				</Grid>
				<Grid item xs={12} md={12} lg={8}>
					<Box p="0.3rem">
						<Select
							error={!!helperText}
							helperText={helperText}
							{...field}
							{...otherProps}
						/>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default RowSelect;
