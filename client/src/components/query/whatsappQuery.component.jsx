import * as Yup from 'yup';

import {
	Box,
	CircularProgress,
	Dialog,
	DialogTitle as MuiDialogTitle,
	Slide,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useTheme, withStyles } from '@material-ui/core/styles';

import { Button } from '../customMaterialComponents/button.component';
import CloseIcon from '@material-ui/icons/Close';
import DividerHeading from '../DividerHeadinng/dividerHeading.component';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import PhoneLockedIcon from '@material-ui/icons/PhoneLocked';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../../components/formik/textField.component';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { apiUrl } from '../../utils/render.utils';
import axios from 'axios';
import { capitalizeFirstLetter } from '../../utils/render.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selectors';
import useGlobalStyle from '../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles as usePageStyle } from '../../pages/projectPage/project.style';

// Redux

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	closeButton: {
		color: theme.palette.grey[500],
	},
	heading: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '1rem',
		},
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6" className={classes.heading}>
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

function AlertDialogSlide({
	open,
	handleClose,
	id,
	user,
	type,
	propertyFor,
	url,
	whatsAppNumber,
	title,
	projectTitle,
	role,
}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = usePageStyle();
	const globalClasses = useGlobalStyle();
	let cancelToken;

	// Async State
	const [asyncState, setAsyncState] = React.useState({
		loading: false,
		error: null,
	});

	// Copy Status
	const [copySuccess, setCopySuccess] = React.useState('Copy');

	// Query ID
	const [queryId, setQueryID] = React.useState(null);
	const [details, setDetails] = React.useState({
		name: '',
		phoneNumber: '',
	});
	const [successMessage, setSuccessMessage] = React.useState(null);

	const validationSchema = Yup.object({
		name: Yup.string('Invalid name')
			.matches(/^[a-zA-Z ]+$/, 'Invalid Name')
			.required('Name required'),
		email: Yup.string('Invalid email')
			.email('Invalid email')
			.required('Email required'),
		phoneNumber: Yup.string('Invalid number')
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('Phone number required'),
	});

	const validationSchemaOTP = Yup.object({
		otp: Yup.string('Invalid OTP')
			.length(4, '4 digits required')
			.matches(/^[0-9]+$/, 'Invalid OTP')
			.required('OTP Required'),
	});

	const initialValues = {
		name: user.name,
		email: user.email,
		phoneNumber: user.number,
		open,
	};

	React.useEffect(() => {
		if (!open) {
			setSuccessMessage(null);
			setQueryID(null);
			setDetails({
				name: '',
				phoneNumber: '',
			});
			setAsyncState({
				loading: false,
				error: null,
			});
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		}
	}, [open]);

	const renderPostedBy = () => {
		if (type === 'project' || type === 'projectProperty') {
			return 'Builder';
		} else {
			return capitalizeFirstLetter(role);
		}
	};

	const redirectToWhatsapp = (values) => {
		const number = `91${whatsAppNumber}`;
		let text = `Hello, I am ${values.name} (Homesearch User) and I am interested for ${title}`;

		if (type === 'projectProperty') {
			text += ` in ${projectTitle}`;
		}
		console.log(`https://wa.me/${number}?text=${encodeURI(text)}`);
		window.location.href = `https://wa.me/${number}?text=${encodeURI(
			text
		)}`;
		// showSnackbar('We will get back to you soon');
	};

	// Copy To Clipboard
	const copyToClipBoard = (copyMe) => async () => {
		try {
			await navigator.clipboard.writeText(copyMe);
			setCopySuccess('Copied!');
		} catch (err) {
			setCopySuccess('Failed to copy!');
		}
	};

	const submitForm = async (values) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken = axios.CancelToken.source();
			const res = await axios.post(
				apiUrl('/wh-queries'),
				{
					userName: values.name,
					email: values.email,
					phoneNumber: values.phoneNumber,
					sendOTP: values.phoneNumber !== user.number,
					type,
					[type]: id,
					propertyFor,
				},
				{
					cancelToken: cancelToken.token,
				}
			);
			if (values.phoneNumber !== user.number) {
				setQueryID(res.data.data.query.id);
				setDetails({
					name: values.name,
					phoneNumber: values.phoneNumber,
				});
			} else {
				setSuccessMessage('Thank you for showing interest');
				redirectToWhatsapp({ name: values.name });
			}
			setAsyncState({
				error: null,
				loading: false,
			});
		} catch (error) {
			setQueryID(null);
			setDetails(null);
			if (error.response) {
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
			} else {
				setAsyncState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};
	const submitFormOTP = async (values) => {
		try {
			setAsyncState({
				error: null,
				loading: true,
			});
			cancelToken = axios.CancelToken.source();
			const resp = await axios.post(
				apiUrl('/wh-queries/validate-query'),
				{
					id: queryId,
					otp: values.otp,
				},
				{
					cancelToken: cancelToken.token,
				}
			);

			setAsyncState({
				error: null,
				loading: false,
			});
			redirectToWhatsapp(details);
		} catch (error) {
			setDetails(null);
			// setQueryID(null);
			setSuccessMessage(null);
			if (error.response) {
				setAsyncState({
					error: error.response.data.message,
					loading: false,
				});
			} else {
				setAsyncState({
					error: 'We are having some issues, please try again later',
					loading: false,
				});
			}
		}
	};

	const shareUrl = url
		? url
		: `https://homesearch18.com/#/${
				type === 'project' ? 'project' : 'property-details'
		  }/${id}`;

	const buttonProps = {};

	if (asyncState.loading) {
		buttonProps.endIcon = <CircularProgress color="inherit" size={20} />;
	}
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				fullScreen={fullScreen}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Chat with {renderPostedBy()}
				</DialogTitle>

				<div className={classes.formWrapper}>
					{asyncState.error && (
						<p className={globalClasses.errorMessage}>
							{asyncState.error}
						</p>
					)}
					<Box mb="1rem">
						<DividerHeading>Copy Link</DividerHeading>
					</Box>
					<Box width="100%" display="flex" alignItems="stretch">
						<Box
							flex={1}
							className={globalClasses.lightBackground}
							display="flex"
							alignItems="center"
							p="0.5rem"
						>
							<span style={{ wordBreak: 'break-all' }}>
								{shareUrl}
							</span>
						</Box>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							startIcon={<FileCopyIcon />}
							onClick={copyToClipBoard(shareUrl)}
						>
							{copySuccess}
						</Button>
					</Box>
					<Box mt="1rem" mb="1rem">
						<DividerHeading>Chat On Whatsapp</DividerHeading>
					</Box>

					{queryId ? (
						<Formik
							initialValues={{ otp: '' }}
							validationSchema={validationSchemaOTP}
							onSubmit={submitFormOTP}
							enableReinitialize
						>
							{() => (
								<Form>
									<TextField
										name="otp"
										formLabel={`Enter OTP sent to ${details.phoneNumber}`}
										type="text"
										disabled={asyncState.loading}
									/>

									<Box
										mt="1rem"
										display="flex"
										justifyContent="center"
									>
										<Button
											color="primary"
											variant="contained"
											type="submit"
											size="large"
											startIcon={<WhatsAppIcon />}
											{...buttonProps}
										>
											Chat Now
										</Button>
									</Box>
								</Form>
							)}
						</Formik>
					) : (
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={submitForm}
							enableReinitialize
						>
							{() => (
								<Form>
									<TextField
										name="name"
										formLabel="Name *"
										type="text"
										disabled={asyncState.loading}
									/>
									<TextField
										name="email"
										formLabel="Email *"
										disabled={asyncState.loading}
									/>
									<TextField
										formLabel="Phone Number *"
										name="phoneNumber"
										disabled={asyncState.loading}
									/>

									<Box
										mt="1rem"
										display="flex"
										justifyContent="center"
									>
										<Button
											color="primary"
											variant="contained"
											type="submit"
											disabled={asyncState.loading}
											size="large"
											startIcon={<PhoneLockedIcon />}
											{...buttonProps}
										>
											Validate Number
										</Button>
									</Box>
								</Form>
							)}
						</Formik>
					)}
				</div>
			</Dialog>
		</div>
	);
}

AlertDialogSlide.propTypes = {
	open: PropTypes.bool.isRequired,
	url: PropTypes.string,
	whatsAppNumber: PropTypes.string,
	projectTitle: PropTypes.string,
	role: PropTypes.string,
	title: PropTypes.string,
	handleClose: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	type: PropTypes.oneOf(['property', 'project', 'projectProperty'])
		.isRequired,
	propertyFor: PropTypes.oneOf(['rent', 'resale']),
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(AlertDialogSlide);
