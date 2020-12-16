import { Box, Button, Divider, Modal, Paper } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	validateEmail,
	validateMobileNumber,
} from '../../utils/validation.utils';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { selectUser } from '../../redux/auth/auth.selectors';

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
}));
const PropertyShare = ({
	user,
	status,
	handleClose,
	title,
	buttonLabel = 'Submit',
	onSubmit = () => {},
	name = null,
}) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const initialValues = {
		name: user.name,
		email: user.email,
		phoneNumber: user.number,
	};
	const validateForm = (values) => {
		const error = {};
		if (!values.name) {
			error.name = 'Name required';
		}
		if (!values.email) {
			error.email = 'Email required';
		}
		if (values.email) {
			if (!validateEmail(values.email)) {
				error.email = 'Invalid email';
			}
		}
		if (!values.phoneNumber) {
			error.phoneNumber = 'Phone number required';
		}
		if (values.phoneNumber) {
			if (!validateMobileNumber(values.phoneNumber)) {
				error.phoneNumber = 'Invalid Phone number';
			}
		}

		return error;
	};
	const submitForm = (values) => {
		onSubmit(values);
		handleClose();
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
								<h3 className={classes.heading}>{title}</h3>
							</Box>
							<Box flexGrow={2}>
								<Divider />
							</Box>
						</Box>
						<Formik
							initialValues={initialValues}
							validate={validateForm}
							onSubmit={submitForm}
						>
							{() => (
								<Form>
									<TextField name="name" formLabel="Name" />
									<TextField name="email" formLabel="Email" />
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
});

export default connect(mapStateToProps)(PropertyShare);
