import React from 'react';
import * as Yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles as usePageStyle } from './project.style';
import { Formik, Form } from 'formik';
import TextField from '../../components/formik/textField.component';
import {
	selectAuthenticated,
	selectUser,
} from '../../redux/auth/auth.selectors';
import {
	Button,
	Box,
	Typography,
	DialogTitle as MuiDialogTitle,
	Slide,
	Dialog,
} from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bool } from 'yup';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
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
	name,
	user,
	isAuthenticated,
}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const classes = usePageStyle();

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

	const initialValues = {
		name: user.name,
		email: user.email,
		phoneNumber: user.number,
		message: '',
	};

	const submitForm = (values) => {};
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
					{`Contact ${name}`}
				</DialogTitle>
				<div className={classes.formWrapper}>
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
										Submit
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				</div>
			</Dialog>
		</div>
	);
}

AlertDialogSlide.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	user: PropTypes.shape({
		name: PropTypes.string,
		email: PropTypes.string.isRequired,
		number: PropTypes.string.isRequired,
	}),
	isAuthenticated: bool,
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
	isAuthenticated: selectAuthenticated,
});

export default connect(mapStateToProps)(AlertDialogSlide);
