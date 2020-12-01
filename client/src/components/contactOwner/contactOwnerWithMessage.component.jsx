import * as Yup from 'yup';

import { Box, Button, Divider, Modal, Paper } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	selectAuthenticated,
	selectUser,
} from '../../redux/auth/auth.selectors';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { queryOnProperty } from '../../redux/property/property.actions';
import { selectQueryOnPropertyLoading } from '../../redux/property/property.selectors';

const initialValues = {
	name: '',
	email: '',
	phoneNumber: '',
	message: '',
};

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: 'absolute',
		width: 600,
		outline: 'none',
		[theme.breakpoints.down('sm')]: {
			width: 300,
		},
	},
	icon: {
		color: '#ffffff',
		fontSize: '2rem',
		cursor: 'pointer',
	},
	iconWh: {
		color: '#ffffff',
		cursor: 'pointer',
		marginRight: '0.5rem',
	},
	paper: {
		padding: '1rem',
		width: '100%',
		boxSizing: 'border-box',
	},
	inputWrapper: {
		boxSizing: 'border-box',
	},
	input: {
		width: '100%',
		padding: '1rem 0 1rem 0.5rem',
		border: '1px solid #cccccc',
		boxSizing: 'border-box',
		fontWeight: '700',
	},
	button: {
		padding: '1rem',
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		border: 'none',
		textDecoration: 'none',
	},
	heading: {
		textAlign: 'center',
	},
	cRed: {
		color: 'red',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));
const PropertyShare = ({
	user,
	isAuthenticated,
	loading,
	queryOnProperty,
	status,
	handleClose,
	title,
	property,
	buttonLabel = 'Submit',
	onSubmit = () => {},
	name = null,
}) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [asyncError, setAsyncError] = React.useState(null);
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

	const handleQuery = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			handleClose();
		} else {
			setAsyncError(data);
		}
	};

	const submitForm = (values) => {
		// onSubmit(values);
		// handleClose();
		const data = {
			userName: values.name,
			email: values.email,
			property: property.id,
			owner: property.userId.id,
			user: isAuthenticated ? user.id : null,
			phoneNumber: values.phoneNumber,
			message: values.message,
		};
		queryOnProperty(data, handleQuery);
		// showSnackbar('We will get back to you soon');
	};
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
				<Backdrop className={classes.backdrop} open={loading}>
					<CircularProgress color="inherit" />
				</Backdrop>
				<Box display="flex" justifyContent="flex-end" width="100%">
					<HighlightOffIcon
						className={classes.icon}
						onClick={handleClose}
					/>
				</Box>
				<Paper className={classes.paper}>
					<Box>
						<Box display="flex" alignItems="center">
							<Box flexGrow={2}>
								<Divider />
							</Box>
							<Box
								flexGrow={1}
								display="flex"
								justifyContent="center"
							>
								<b className={classes.heading}>{title}</b>
							</Box>
							<Box flexGrow={2}>
								<Divider />
							</Box>
						</Box>
						{asyncError && (
							<p className={classes.cRed}>{asyncError}</p>
						)}
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={submitForm}
							validateOnChange={true}
							validateOnMount={true}
						>
							{() => (
								<Form>
									<TextField
										name="name"
										formLabel="Name"
										type="text"
									/>
									<TextField name="email" formLabel="Email" />
									<TextField
										formLabel="Phone Number"
										name="phoneNumber"
									/>
									<TextField
										formLabel="Message"
										name="message"
										rows={4}
										multiline
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
										>
											{buttonLabel}
										</Button>
									</Box>
								</Form>
							)}
						</Formik>
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
	isAuthenticated: selectAuthenticated,
	loading: selectQueryOnPropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
	queryOnProperty: (data, callback) =>
		dispatch(queryOnProperty({ data, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyShare);
