import React from 'react';

const useForm = (initialState) => {
	const [values, setValues] = React.useState(initialState);

	return [
		values,
		(e) => {
			setValues({
				...values,
				[e.target.name]: e.target.value,
			});
		},
	];
};

export default useForm;
