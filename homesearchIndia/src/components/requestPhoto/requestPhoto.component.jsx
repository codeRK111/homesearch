import * as Yup from 'yup';

import {
	Box,
	Button,
	CircularProgress,
	Divider,
	Modal,
	Paper,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	addRequestPhoto,
	validateRequestPhoto,
} from '../../redux/request/request.actions';
import {
	selectAddRequestPhotoLoading,
	selectValidateRequestPhotoLoading,
} from '../../redux/request/request.selectors';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selectors';
import useStyles from './requestPhoto.styles';
import { yupValidation } from '../../utils/validation.utils';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const keyValue = {
	property: 'property',
	project: 'project',
	projectproperty: 'projectProperty',
};

const PropertyShare = ({
	user,
	addLoading,
	validateLoading,
	addRequestPhoto,
	validateRequestPhoto,
	status,
	handleClose,
	type,
	propertyId,
}) => {
	const classes = useStyles();
	const [id, setId] = React.useState(null);
	const [asyncError, setAsyncError] = React.useState(null);
	const [modalStyle] = React.useState(getModalStyle);
	const initialValues = {
		userName: user.name,
		email: user.email,
		phoneNumber: user.number,
	};
	const schema = Yup.object({
		userName: yupValidation.name,
		email: yupValidation.email,
		phoneNumber: yupValidation.number,
	});
	const validationSchemaOTP = Yup.object({
		otp: Yup.string('Invalid OTP')
			.length(4, '4 digits required')
			.matches(/^[0-9]+$/, 'Invalid OTP')
			.required('OTP Required'),
	});

	const handleAddRequestPhoto = (status, data) => {
		if (status === 'success') {
			setAsyncError(null);
			setId(data.id);
		} else {
			setAsyncError(data);
			setId(null);
		}
	};

	const handleValidatePhoto = (status, data) => {
		if (status === 'success') {
			setId(null);
			setAsyncError(null);
			handleClose();
		} else {
			setAsyncError(data);
		}
	};

	const addRequestPhotoOnSubmit = (values) => {
		addRequestPhoto(
			{ ...values, propertyType: type, [keyValue[type]]: propertyId },
			handleAddRequestPhoto
		);
	};

	const validatePhoto = (values) => {
		validateRequestPhoto({ id, otp: values.otp }, handleValidatePhoto);
	};

	const otpButtonProps = {};
	const addButtonProps = {};
	if (addLoading)
		addButtonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	if (validateLoading)
		otpButtonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	return (
		<Modal
			open={status}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			style={{
				backgroundColor: 'rgba(0,0,0,0.7)',
			}}
		>
			<Box style={modalStyle} className={classes.wrapper}>
				<Box display="flex" justifyContent="flex-end" width="100%">
					<HighlightOffIcon
						className={classes.icon}
						onClick={handleClose}
					/>
				</Box>
				<Paper className={classes.paper}>
					<Box p="1rem">
						<Box display="flex" alignItems="center">
							<Box flexGrow={2}>
								<Divider />
							</Box>
							<Box flexGrow={1}>
								<h3 className={classes.heading}>
									Request Photo
								</h3>
							</Box>
							<Box flexGrow={2}>
								<Divider />
							</Box>
						</Box>
						{asyncError && <p className="cRed">{asyncError}</p>}
						{id ? (
							<Formik
								initialValues={{ otp: '' }}
								enableReinitialize
								onSubmit={validatePhoto}
								validationSchema={validationSchemaOTP}
							>
								{() => (
									<Form>
										<TextField
											name="otp"
											type="text"
											formLabel="OTP"
											inputProps={{
												autocomplete: 'off',
												form: {
													autocomplete: 'off',
												},
											}}
										/>

										<Box
											mt="2rem"
											mb="2rem"
											display="flex"
											justifyContent="center"
										>
											<Button
												color="primary"
												variant="contained"
												type="submit"
												{...otpButtonProps}
											>
												Verify
											</Button>
										</Box>
									</Form>
								)}
							</Formik>
						) : (
							<Formik
								initialValues={initialValues}
								onSubmit={addRequestPhotoOnSubmit}
								validationSchema={schema}
							>
								{() => (
									<Form>
										<TextField
											name="userName"
											formLabel="Name"
										/>
										<TextField
											name="email"
											formLabel="Email"
										/>
										<TextField
											formLabel="Phone Number"
											type="number"
											name="phoneNumber"
										/>
										<Box
											mt="2rem"
											mb="2rem"
											display="flex"
											justifyContent="center"
										>
											<Button
												color="primary"
												variant="contained"
												type="submit"
												{...addButtonProps}
											>
												Submit
											</Button>
										</Box>
									</Form>
								)}
							</Formik>
						)}
					</Box>
				</Paper>
			</Box>
		</Modal>
	);
};

PropertyShare.propTypes = {
	status: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
};
const mapStateToProps = createStructuredSelector({
	user: selectUser,
	addLoading: selectAddRequestPhotoLoading,
	validateLoading: selectValidateRequestPhotoLoading,
});

const mapDispatchToProps = (dispatch) => ({
	addRequestPhoto: (body, callback) =>
		dispatch(addRequestPhoto({ body, callback })),
	validateRequestPhoto: (body, callback) =>
		dispatch(validateRequestPhoto({ body, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyShare);
