import * as Yup from 'yup';

import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';

import FTextField from '../Formik/text-field';
import React from 'react';
import { RoutePath } from '../../router';
import { useNavigate } from 'react-router-dom';

export interface ILoginData {
	email: string;
	password: string;
}

export const LoginForm: React.FC = () => {
	const navigation = useNavigate();
	const validationSchema = Yup.object({
		email: Yup.string().required('email required'),
		password: Yup.string().required('password required'),
	});

	const initialValues: ILoginData = {
		email: '',
		password: '',
	};

	// State

	// Callbacks
	const onSubmit = async (
		values: ILoginData,
		helpers: FormikHelpers<ILoginData>
	) => {
		try {
			if (
				values.email === 'test@gmail.com' &&
				values.password === 'homesearch123'
			) {
				navigation(RoutePath.Home);
			}
		} catch (err: any) {}
	};

	return (
		<div>
			<Typography gutterBottom variant="h5" align="center">
				Sign In
			</Typography>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ errors, setFieldValue, isSubmitting }) => (
					<Form>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<FTextField
									name={'email'}
									label="Email"
									type="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'password'}
									label="Password"
									type="password"
								/>
							</Grid>

							<Grid item xs={12}>
								<Button
									fullWidth
									variant={'contained'}
									color={'primary'}
									size={'large'}
									type={'submit'}
									disabled={isSubmitting}
									endIcon={
										isSubmitting ? (
											<CircularProgress
												size={20}
												color={'inherit'}
											/>
										) : (
											<></>
										)
									}
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};
