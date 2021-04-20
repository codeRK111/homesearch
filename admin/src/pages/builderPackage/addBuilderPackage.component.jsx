import React from 'react';
import {
	Paper,
	Button,
	Box,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import useStyles from './builderPackage.style';
import { Form, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/formik/textField.component';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';

const AddBuilderPackage = ({ fetchPackages }) => {
	let cancelToken = React.useRef();

	// Async State
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});

	const validationSchema = Yup.object({
		name: Yup.string('Invalid name')
			.matches(/^[a-zA-Z ]+$/, 'Invalid Name')
			.required('Name required'),
		price: Yup.string('Invalid price')
			.matches(/^[0-9]+$/, 'Invalid price')
			.required('Price Required'),
	});

	const classes = useStyles();

	React.useEffect(() => {
		return () => {
			if (typeof cancelToken.current != typeof undefined) {
				cancelToken.current.cancel('Operation canceled');
			}
		};
	}, []);

	const submitFormOTP = async (values, { setErrors, resetForm }) => {
		if (values.packageDetails.length === 0) {
			setErrors({ packageDetailsText: 'Package details required' });
			return;
		}
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken.current = axios.CancelToken.source();
			const formData = new FormData();
			formData.append('name', values.name);
			formData.append('price', Number(values.price));
			formData.append(
				'packageDetails',
				JSON.stringify(values.packageDetails)
			);
			if (values.file) {
				formData.append('photo', values.file);
			}
			await axios.post(
				apiUrl('/utility/builder-package', 'v2'),
				formData,
				{
					cancelToken: cancelToken.current.token,
				}
			);

			setAsyncState({
				error: null,
				loading: false,
			});
			resetForm();
			fetchPackages();
		} catch (error) {
			console.log(error);
			setAsyncState({
				error: error.response.data.message,
				loading: false,
			});
		}
	};

	const buttonProps = {};
	if (asyncState.loading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
		buttonProps.disabled = true;
	}
	return (
		<Paper className={classes.addPackageWrapper}>
			<div>
				{asyncState.error && (
					<Typography color="error">{asyncState.error}</Typography>
				)}
				<Formik
					initialValues={{
						name: '',
						price: '',
						packageDetails: [],
						packageDetailsText: '',
						file: null,
					}}
					validationSchema={validationSchema}
					onSubmit={submitFormOTP}
					enableReinitialize
				>
					{({ values, setFieldValue, errors }) => (
						<Form>
							<TextField
								name="name"
								formLabel={`Enter Package Name*`}
								type="text"
							/>
							<TextField
								name="price"
								formLabel={`Enter Package Price*`}
								type="text"
							/>
							<FieldArray
								name="packageDetails"
								render={(arrayHelpers) => (
									<div>
										<TextField
											name="packageDetailsText"
											formLabel={`Package Details (Min 1 required)*`}
											type="text"
										/>
										<Button
											type="button"
											size="small"
											variant="outlined"
											onClick={() => {
												if (values.packageDetailsText) {
													arrayHelpers.push(
														values.packageDetailsText
													);
													setFieldValue(
														'packageDetailsText',
														''
													);
												}
											}} // insert an empty string at a position
										>
											Add Package Details
										</Button>
									</div>
								)}
							/>
							<ul>
								{values.packageDetails.map((c, i) => (
									<li key={c}>{c}</li>
								))}
							</ul>
							<Box mt="1rem">
								<Box>
									<Typography variant="caption">
										Upload Image
									</Typography>
								</Box>
								<input
									id="file"
									name="file"
									type="file"
									onChange={(event) => {
										setFieldValue(
											'file',
											event.currentTarget.files[0]
										);
									}}
								/>
							</Box>

							<Box
								mt="1rem"
								display="flex"
								justifyContent="center"
							>
								<Button
									color="primary"
									variant="contained"
									type="submit"
									{...buttonProps}
								>
									Submit
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</div>
		</Paper>
	);
};

export default AddBuilderPackage;
