import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { apiUrl } from '../../utils/render.utils';
import { Form, Formik } from 'formik';
import { Box, Button, CircularProgress } from '@material-ui/core';
import TextField from '../../components/formik/textField.component';
import { yupValidation } from '../../utils/validation.utils';
import { connect } from 'react-redux';
import { setUser } from '../../redux/auth/auth.actions';

const UpdatePassword = ({ setUser, showMessage }) => {
	// Cancel Axios Token
	let cancelToken;

	// Async Error
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});

	// Validation Schema
	const validationSchema = Yup.object({
		password: Yup.string().required('Current Password'),
		newPassword: yupValidation.passwordNew
			.notOneOf(
				[Yup.ref('password'), null],
				'Cannot update to same password'
			)
			.required('New password is required'),
	});

	const onSubmit = async (values, { setErrors }) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			const token = localStorage.getItem('JWT_CLIENT');
			cancelToken = axios.CancelToken.source();
			const response = await axios.post(
				apiUrl('/users/update-my-password'),
				{
					oldPassword: values.password,
					newPassword: values.newPassword,
				},
				{
					cancelToken: cancelToken.token,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const responseData = response.data;
			localStorage.setItem('JWT_CLIENT', responseData.token);
			setUser({
				token: responseData.token,
				user: responseData.data.user,
			});

			setAsyncState({
				error: null,
				loading: false,
			});
			showMessage('Password updated successfully');
		} catch (error) {
			if (error.response) {
				if (error.response.data.message.includes('Incorrect')) {
					setErrors({ password: error.response.data.message });
				} else {
					setErrors({ newPassword: error.response.data.message });
				}
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
			} else {
				setErrors({
					number: 'We are having some issues, please try again later',
				});
				setAsyncState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};

	// Cancel Request
	React.useEffect(() => {
		return () => {
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		};
	}, []);

	// Button Props
	const buttonProps = {};
	if (asyncState.loading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}
	return (
		<Box width="100%">
			<Formik
				initialValues={{
					password: '',
					newPassword: '',
				}}
				enableReinitialize
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{() => (
					<Form>
						<TextField
							formLabel="Current Password"
							name="password"
						/>
						<TextField
							formLabel="New Password"
							name="newPassword"
						/>
						<Box mt="1rem">
							<Button
								color="primary"
								variant="contained"
								type="submit"
								fullWidth
								{...buttonProps}
							>
								Next
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setUser: (data) => dispatch(setUser(data)),
});

export default connect(null, mapDispatchToProps)(UpdatePassword);
