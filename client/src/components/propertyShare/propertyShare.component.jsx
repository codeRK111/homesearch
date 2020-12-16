import * as Yup from 'yup';

import { Box, Divider, Modal, Paper } from '@material-ui/core';
import { Form, Formik } from 'formik';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '../formik/textField.component';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { capitalizeFirstLetter } from '../../utils/render.utils';
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
const PropertyShare = ({
	user,
	status,
	handleClose,
	data,
	project = false,
	whatsAppNumber = null,
	url = null,
	projectInfo = null,
}) => {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [copySuccess, setCopySuccess] = React.useState('Copy');
	const textAreaRef = React.useRef(null);
	const initialValues = {
		name: user.name,
		email: user.email,
		phoneNumber: user.number,
	};
	const renderPostedBy = () => {
		if (project || projectInfo) {
			return 'Builder';
		} else {
			return data.postedBy
				? capitalizeFirstLetter(data.postedBy)
				: capitalizeFirstLetter(data.userId.role);
		}
	};

	function copyToClipboard(e) {
		textAreaRef.current.select();
		document.execCommand('copy');
		// This is just personal preference.
		// I prefer to not show the whole text area selected.
		e.target.focus();
		setCopySuccess('Copied!');
	}
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
	const submitForm = (values) => {
		const userNumber = whatsAppNumber
			? whatsAppNumber
			: project
			? data.builder.phoneNumber
			: data.userId.number;
		const number = `91${userNumber}`;
		let text = `Hello, I am ${values.name} and I am interested for ${data.title}`;
		if (projectInfo) {
			text += ` in ${projectInfo.title}`;
		}
		console.log(`https://wa.me/${number}?text=${encodeURI(text)}`);
		window.location.href = `https://wa.me/${number}?text=${encodeURI(
			text
		)}`;
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
									value={
										url
											? url
											: `www.homesearch18.com/#/${
													project
														? 'project'
														: 'property-details'
											  }/${data.id}`
									}
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
					<Box>
						<Box display="flex" alignItems="center">
							<Box flexGrow={2}>
								<Divider />
							</Box>
							<Box flexGrow={1}>
								<h3 className={classes.heading}>
									Chat with {renderPostedBy()}
								</h3>
							</Box>
							<Box flexGrow={2}>
								<Divider />
							</Box>
						</Box>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
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
										mt="1rem"
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
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(PropertyShare);
