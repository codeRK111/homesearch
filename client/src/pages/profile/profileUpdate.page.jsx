import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	ClickAwayListener,
	Grid,
	TextField as MTextField,
	Paper,
	Popper,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	changePassword,
	changeProfileInfo,
	sendOtp,
	validateOtp,
} from '../../redux/auth/auth.actions';
import {
	selectChangePasswordLoading,
	selectChangeUserProfileInfoLoading,
	selectSendOtpLoading,
	selectUser,
	selectValidateOtpLoading,
} from '../../redux/auth/auth.selectors';

import AppBar from '../../components/appBar/appBar.component';
import DividerHeading from '../../components/DividerHeadinng/dividerHeading.component';
import Footer from '../../components/footer/footer.component';
import ImageUpload from './imageUpload.component';
import { JustifyCenter } from '../../components/flexContainer/flexContainer.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import Snackbar from '../../components/snackbar/snackbar.component';
import TextField from '../../components/formik/textField.component';
import UpdateMobileNumber from './updateMobileNumber.component';
import UpdatePassword from './updatePasword.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchCities } from '../../redux/city/city.actions';
import { selectSearchCityLoading } from '../../redux/city/city.selectors';
import useStyles from './profile.styles';
import { validateProfile } from '../../utils/validation.utils';

const UpdateProfile = ({
	user,
	searchCities,
	searchCityLoading,
	changeProfileLoading,
	changeProfileInfo,
	sendOtpLoading,
	validateOtpLoading,
	passwordLoading,
}) => {
	const initialValues = {
		name: user.name,
		email: user.email,
		mobileStatus: user.mobileStatus,
	};
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [otpHandler, setOtpHandler] = React.useState({
		show: false,
		buttonLabel: 'Send OTP',
	});
	const [asyncError, setAsyncError] = React.useState({
		number: null,
		password: null,
		info: null,
	});
	const anchorRef = React.useRef(null);
	const [cityText, setCityText] = React.useState(user.city?.name);
	const [selectedCity, setSelectedCity] = React.useState(user.city?.id);
	const [cities, setCities] = React.useState([]);
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setCities(data);
			console.log(data);
			setOpen(true);
		} else {
		}
	};
	const handleChange = (e) => setCityText(e.target.value);
	const onKeyUp = (e) => {
		if (e.target.value.trim().length > 3) {
			console.log(cityText);
			searchCities(handleFetchCities, cityText);
		}
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const onClick = (data) => (e) => {
		handleClose(e);
		setCityText(data.name);
		setSelectedCity(data.id);
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);
	const updateProfile = (data) => {
		console.log(data);
		changeProfileInfo({ ...data, city: selectedCity }, handleUpdateInfo);
	};

	const showSnackbar = (message) => {
		setSnackbarMessage(message);
		setOpenSnackBar(true);
	};

	const handleUpdateInfo = (status, data = null) => {
		if (status === 'success') {
			showSnackbar('Profile updated successfulyy');
			setAsyncError((prevState) => ({ ...prevState, info: null }));
		} else {
			setAsyncError((prevState) => ({ ...prevState, info: data }));
		}
	};

	const closeSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackBar(false);
	};

	return (
		<Box>
			<Snackbar
				status={openSnackBar}
				handleClose={closeSnackbar}
				severity="success"
				message={snackbarMessage}
			/>
			<Backdrop
				className={classes.backdrop}
				open={
					changeProfileLoading ||
					sendOtpLoading ||
					validateOtpLoading ||
					passwordLoading
				}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<AppBar />
			<Box mt="5rem" display="flex" width="100%" justifyContent="center">
				<Box className={classes.wrapper}>
					<Box mb="1rem" display="flex" justifyContent="center">
						<ImageUpload image={user.photo} />
					</Box>
					<Box>{asyncError.info}</Box>
					<Formik
						initialValues={initialValues}
						enableReinitialize
						validate={validateProfile}
						onSubmit={updateProfile}
					>
						{() => (
							<Form>
								<Grid container spacing={1}>
									<Grid item xs={12} md={6}>
										<TextField
											name="name"
											formLabel="Name *"
										/>
									</Grid>

									<Grid item xs={12} md={6}>
										<TextField
											name="email"
											type="email"
											formLabel="Email *"
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										<Box p="0.5rem" ref={anchorRef}>
											<Box className={classes.label}>
												City *
											</Box>
											<Box mt="0.3rem">
												<MTextField
													fullWidth
													size="small"
													variant="filled"
													name="city"
													placeholder="Enter 4 letter 0f the city"
													value={cityText}
													onChange={handleChange}
													onKeyUp={onKeyUp}
												/>
											</Box>
										</Box>
										<Popper
											open={open}
											anchorEl={anchorRef.current}
											keepMounted={true}
										>
											<Paper
												elevation={3}
												className={classes.parent}
											>
												<ClickAwayListener
													onClickAway={handleClose}
												>
													<Box id="menu-list-grow">
														{searchCityLoading && (
															<Typography
																component="h5"
																align="center"
															>
																Loading...
															</Typography>
														)}
														{cities.map((c) => (
															<div
																key={c.id}
																onClick={onClick(
																	c
																)}
																className={
																	classes.item
																}
															>
																{c.name}
															</div>
														))}
													</Box>
												</ClickAwayListener>
											</Paper>
										</Popper>
									</Grid>

									<Grid item xs={12} md={6}>
										<Select
											name="mobileStatus"
											formLabel="Mobile Status *"
											options={[
												{
													value: 'semi-private',
													label: 'Semiprivate',
												},
												{
													value: 'private',
													label: 'Private',
												},
												{
													value: 'public',
													label: 'Public',
												},
											]}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											fullWidth
											variant="contained"
											color="primary"
											size="large"
											className={classes.uploadButton}
											type="submit"
										>
											Update
										</Button>
									</Grid>
								</Grid>
							</Form>
						)}
					</Formik>
					<Box mt="2rem">
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<DividerHeading>
									<h3>Update Mobile Number</h3>
								</DividerHeading>
								<JustifyCenter width="100%">
									<UpdateMobileNumber
										existingNumber={user.number}
										showMessage={showSnackbar}
									/>
								</JustifyCenter>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>

			<Footer />
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
	searchCityLoading: selectSearchCityLoading,
	changeProfileLoading: selectChangeUserProfileInfoLoading,
	sendOtpLoading: selectSendOtpLoading,
	validateOtpLoading: selectValidateOtpLoading,
	passwordLoading: selectChangePasswordLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
	changeProfileInfo: (data, callback) =>
		dispatch(changeProfileInfo({ data, callback })),
	changePassword: (data, callback) =>
		dispatch(changePassword({ data, callback })),
	sendOtp: (callback, number) => dispatch(sendOtp({ number, callback })),
	validateOtp: (callback, number, otp) =>
		dispatch(validateOtp({ number, callback, otp })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
