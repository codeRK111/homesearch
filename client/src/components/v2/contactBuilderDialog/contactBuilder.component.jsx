import { Form, Formik } from 'formik';

import { Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import FormInput from '../../formik/textField.component';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
		backgroundColor: '#e0e0e0',
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant="h6">{children}</Typography>
				{onClose ? (
					<IconButton aria-label="close" onClick={onClose}>
						<CloseIcon />
					</IconButton>
				) : null}
			</Box>
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

export default function CustomizedDialogs({
	open,
	handleClickOpen,
	handleClose,
}) {
	const onSubmitForm = () => {};
	return (
		<div>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				TransitionComponent={Transition}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Please share your details
				</DialogTitle>
				<DialogContent
					style={{
						backgroundColor: '#e0e0e0',
					}}
				>
					<Formik
						initialValues={{
							number: '',
							otp: '',
							name: '',
							email: '',
						}}
						enableReinitialize
						onSubmit={onSubmitForm}
					>
						{({ errors }) => (
							<Form>
								<FormInput name="name" formLabel="Name" />
								<FormInput name="email" formLabel="Email" />
								<FormInput
									name="number"
									formLabel="Phone Number"
								/>

								<Box mt="1rem">
									<button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										size="large"
										style={{
											cursor: 'pointer',
											background: '#e0e0e0',
											display: 'flex',
											minWidth: '75px',
											justifyContent: 'center',
											borderRadius: '20px',
											boxShadow:
												'10px 10px 20px #acacac,-10px -10px 20px #ffffff',
											padding: '1rem 3rem',
											border: 'none',
										}}
									>
										Send OTP
									</button>
								</Box>
							</Form>
						)}
					</Formik>
				</DialogContent>
			</Dialog>
		</div>
	);
}
