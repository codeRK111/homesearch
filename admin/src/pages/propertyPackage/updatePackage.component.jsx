import * as Yup from 'yup';

import {
	Box,
	CircularProgress,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';

import Button from '@material-ui/core/Button';
import DatePicker from '../../components/formik/datePicker.component';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import TextField from '../../components/formik/textField.component';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';
import moment from 'moment';
import useStyles from './builderPackage.style';

export default function ScrollDialog({
	open,
	handleClose,
	propertyPackage,
	fetchPackages,
}) {
	let cancelToken = React.useRef();
	const classes = useStyles();
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
	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

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
			const jwt = localStorage.getItem('JWT');
			await axios.patch(
				apiUrl(
					`/utility/property-package/${propertyPackage._id}`,
					'v2'
				),
				{
					name: values.name,
					price: Number(values.price),
					packageDetails: values.packageDetails,
					expiresAt: values.expiresAt,
				},
				{
					cancelToken: cancelToken.current.token,
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);

			setAsyncState({
				error: null,
				loading: false,
			});
			resetForm();
			fetchPackages();
			handleClose();
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
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				scroll={'paper'}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<Formik
					initialValues={{
						name: propertyPackage.name,
						price: propertyPackage.price,
						packageDetails: propertyPackage.packageDetails,
						packageDetailsText: '',
						expiresAt: moment(propertyPackage.expiresAt).format(
							'YYYY-MM-DD'
						),
					}}
					validationSchema={validationSchema}
					onSubmit={submitFormOTP}
					enableReinitialize
				>
					{({ values, setFieldValue, errors }) => (
						<Form>
							<DialogTitle
								id="scroll-dialog-title"
								className={classes.editWrapper}
							>
								{propertyPackage.name}
							</DialogTitle>
							<DialogContent dividers={true}>
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
								<DatePicker
									name="expiresAt"
									formLabel={`Enter Expiry Date *`}
									value={values.expiresAt}
									onChange={(value) => {
										setFieldValue('expiresAt', value);
									}}
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
													if (
														values.packageDetailsText
													) {
														arrayHelpers.push({
															detail: values.packageDetailsText,
														});
														setFieldValue(
															'packageDetailsText',
															''
														);
													}
												}} // insert an empty string at a position
											>
												Add Package Details
											</Button>
											<Box
												display="flex"
												justifyContent="center"
												mt="1.5rem"
											>
												<Typography variant="caption">
													Package Specifications
												</Typography>
											</Box>
											<List>
												{values.packageDetails.map(
													(c, i) => (
														<ListItem
															key={c.id}
															divider
															dense
														>
															{/* <ListItemText
																primary={
																	c.detail
																}
															/> */}
															<Box width="100%">
																<TextField
																	name={`packageDetails[${i}].detail`}
																	formLabel={``}
																	type="text"
																/>
															</Box>
															<ListItemSecondaryAction>
																<IconButton
																	edge="end"
																	aria-label="delete"
																	onClick={() => {
																		arrayHelpers.remove(
																			i
																		);
																	}}
																>
																	<DeleteIcon />
																</IconButton>
															</ListItemSecondaryAction>
														</ListItem>
													)
												)}
											</List>
										</div>
									)}
								/>
							</DialogContent>
							<DialogActions>
								<Button
									onClick={handleClose}
									type="button"
									color="primary"
								>
									Cancel
								</Button>
								<Button
									color="primary"
									type="submit"
									{...buttonProps}
								>
									Update
								</Button>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>
		</div>
	);
}
