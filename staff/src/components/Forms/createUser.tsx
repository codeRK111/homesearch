import { Formik } from 'formik';
import React from 'react';

export type CreateUserFormData = {
	name: string;
	email: string;
	number: string;
	role: 'builder' | 'agent' | 'owner' | 'tenant';
};

const CreateUserForm = () => {
	const initialData: CreateUserFormData = {
		name: '',
		email: '',
		number: '',
		role: 'tenant',
	};

	const onSubmit = async () => {};

	return (
		<Formik
			initialValues={initialData}
			onSubmit={onSubmit}
			enableReinitialize
		></Formik>
	);
};

export default CreateUserForm;
