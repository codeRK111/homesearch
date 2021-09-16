import { FieldHookConfig, useField } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

import React from 'react';

const FTextField = (props: TextFieldProps & FieldHookConfig<string>) => {
	const [field, meta] = useField(props);
	let helperText = (meta.value || meta.touched) && meta.error;
	return (
		<TextField
			focused={Boolean(helperText)}
			fullWidth
			size="small"
			variant="filled"
			error={!!helperText}
			helperText={helperText}
			{...field}
			{...props}
		/>
	);
};

export default FTextField;
