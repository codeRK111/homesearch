import { Box, Divider, Modal, Paper } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	validateEmail,
	validateMobileNumber,
} from '../../utils/validation.utils';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../formik/textField.component';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { makeStyles } from '@material-ui/core/styles';

const initialValues = {
	name: '',
	email: '',
	phoneNumber: '',
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
		boxShadow: theme.shadows[5],
		width: 600,
		outline: 'none',
		padding: theme.spacing(2, 4, 3),
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
const PropertyShare = ({ status, handleClose, id }) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [copySuccess, setCopySuccess] = React.useState('Copy');
	const textAreaRef = React.useRef(null);

	function copyToClipboard(e) {
		textAreaRef.current.select();
		document.execCommand('copy');
		// This is just personal preference.
		// I prefer to not show the whole text area selected.
		e.target.focus();
		setCopySuccess('Copied!');
	}
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
		window.location.href =
			'https://wa.me/919853325956?text=I%27m%20interested%20in%20your%20car%20for%20sale';
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
					<Paper>
						<Box display="flex" width="100%" alignItems="center">
							<Box flexGrow={1} className={classes.inputWrapper}>
								<input
									type="text"
									ref={textAreaRef}
									className={classes.input}
									value={`www.homesearch18.com/#/property-details/${id}`}
								/>
							</Box>
							<Box>
								<button
									className={classes.button}
									onClick={copyToClipboard}
								>
									{copySuccess}
								</button>
							</Box>
						</Box>
					</Paper>
					<Box p="1rem">
						<Box display="flex" alignItems="center">
							<Box flexGrow={2}>
								<Divider />
							</Box>
							<Box flexGrow={1}>
								<h3 className={classes.heading}>
									Chat with owner
								</h3>
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
									<TextField
										formLabel="Full Name"
										name="name"
										fullWidth
									/>
									<TextField
										formLabel="Email"
										type="email"
										name="email"
										fullWidth
									/>
									<TextField
										formLabel="Phone Number"
										type="number"
										name="phoneNumber"
										fullWidth
									/>
									<Box
										mt="2rem"
										mb="2rem"
										display="flex"
										justifyContent="center"
									>
										<button
											className={classes.button}
											type="submit"
										>
											<Box
												display="flex"
												alignItems="center"
											>
												<WhatsAppIcon
													className={classes.iconWh}
													onClick={handleClose}
												/>
												CHAT NOW
											</Box>
										</button>
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

export default PropertyShare;
