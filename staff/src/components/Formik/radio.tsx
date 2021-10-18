import {
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	RadioGroupProps,
	Typography,
} from '@material-ui/core';
import { FieldHookConfig, useField, useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';

interface IFSelect {
	options: Array<{
		value: any;
		label: string;
	}>;
	groupLabel: string;
}

const FRadio: React.FC<IFSelect & RadioGroupProps & FieldHookConfig<string>> = (
	props
) => {
	const [field, meta] = useField(props);
	let helperText = (meta.value || meta.touched) && meta.error;
	const formikBag = useFormikContext();
	const fieldRef = useRef<HTMLDivElement>(null);

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
		<Box>
			{helperText ? (
				<Typography
					color="error"
					variant="caption"
					display="block"
					gutterBottom
				>
					{helperText}
				</Typography>
			) : (
				<Typography variant="caption" display="block" gutterBottom>
					{props.groupLabel}
				</Typography>
			)}

			<RadioGroup id={field.name} ref={fieldRef} {...field} {...props}>
				{props.options.map((c, i) => (
					<FormControlLabel
						key={i}
						control={<Radio />}
						label={c.label}
						value={c.value}
					/>
				))}
			</RadioGroup>
		</Box>
	);
};

export default FRadio;
