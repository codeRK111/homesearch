import { FieldHookConfig, useField, useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const FTextField = (props: TextFieldProps & FieldHookConfig<string>) => {
	const [field, meta] = useField(props);
	const formikBag = useFormikContext();
	const fieldRef = useRef<HTMLDivElement>(null);
	let helperText = (meta.value || meta.touched) && meta.error;

	useEffect(() => {
		const firstError = Object.keys(formikBag.errors)[0];
		if (formikBag.isSubmitting && firstError === props.name) {
			fieldRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}, [meta.error, formikBag.isSubmitting, props.name, formikBag.errors]);
	return (
		<TextField
			id={field.name}
			ref={fieldRef}
			focused={Boolean(helperText)}
			fullWidth
			size="small"
			variant="outlined"
			error={!!helperText}
			helperText={helperText}
			{...field}
			{...props}
		/>
	);
};

export default FTextField;
