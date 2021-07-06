import { Box, Checkbox, FormControlLabel } from '@material-ui/core';

import React from 'react';
import { useField } from 'formik';
import useStyles from './formik.styles';

const RowSelect = ({ formLabel, ...otherProps }) => {
	const classes = useStyles();
	const [field] = useField(otherProps);
	return (
		<Box>
			<Box mt="0.3rem">
				<FormControlLabel
					classes={{
						label: classes.label,
					}}
					control={
						<Checkbox
							classes={{
								root: classes.root,
								colorSecondary: classes.colorSecondary,
							}}
							size="small"
							{...field}
							{...otherProps}
						/>
					}
					label={formLabel}
				/>
			</Box>
		</Box>
	);
};

export default RowSelect;
