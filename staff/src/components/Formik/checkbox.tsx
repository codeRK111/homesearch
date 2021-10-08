import { Checkbox, CheckboxProps, FormControlLabel } from '@material-ui/core';
import { FieldHookConfig, useField } from 'formik';

import React from 'react';

interface IFSelect {
	label: string;
}

const FCheckbox: React.FC<IFSelect & CheckboxProps & FieldHookConfig<string>> =
	(props) => {
		const [field] = useField(props);

		return (
			<FormControlLabel
				control={
					<Checkbox
						type="checkbox"
						color="primary"
						{...field}
						{...props}
					/>
				}
				label={props.label}
			/>
		);
	};

export default FCheckbox;
