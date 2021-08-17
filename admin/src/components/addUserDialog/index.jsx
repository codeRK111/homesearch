import {
	Box,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { addUser, updateUser } from '../../utils/asyncUsers';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FSelect from '../formik/select.component';
import FTextField from '../formik/textField.component';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { renderImage } from '../../utils/render.utils';
import { userRoleMenuItems } from '../../utils/staticData';
import { validateNumber } from '../../utils/validation.utils';
import { withStyles } from '@material-ui/core/styles';

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

export default function AddUserDialog({
	open,
	handleClose,
	initialValues,
	fetchUsers,
	type = 'add',
	resetState = null,
}) {
	const cancelToken = React.useRef(undefined);
	const descriptionElementRef = React.useRef(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [formikState, setFormikState] = useState(null);

	const validate = (values) => {
		const error = {};
		if (!values.name) {
			error.name = 'Enter user name';
		}
		if (!values.email) {
			error.email = 'Enter user name';
		}

		if (!validateNumber(values.number)) {
			error.number = 'Please enter a number';
		}

		if (values.number.length !== 10) {
			error.number = '10 digits required';
		}

		return error;
	};

	useEffect(() => {
		setFormikState(initialValues);
	}, [initialValues]);
	useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	const onAddUser = async (values) => {
		try {
			const formData = new FormData();
			formData.append('name', values.name);
			formData.append('email', values.email);
			formData.append('number', values.number);
			formData.append('role', values.role);
			if (values.photo) {
				formData.append('photo', values.photo);
			}
			cancelToken.current = axios.CancelToken.source();
			await addUser(formData, cancelToken.current, setLoading);
			setError(null);
			fetchUsers();
			handleClose();
		} catch (error) {
			setError(error);
		}
	};
	const onUpdateUser = async (values) => {
		try {
			const formData = new FormData();
			formData.append('name', values.name);
			formData.append('email', values.email);
			formData.append('number', values.number);
			formData.append('role', values.role);
			if (values.photo) {
				formData.append('photo', values.photo);
			}
			cancelToken.current = axios.CancelToken.source();
			await updateUser(
				values.id,
				formData,
				cancelToken.current,
				setLoading
			);
			setError(null);
			if (resetState) {
				resetState();
			}
			fetchUsers();
			handleClose();
		} catch (error) {
			setError(error);
		}
	};

	const onSubmit = async (values) => {
		if (type === 'add') {
			onAddUser(values);
		} else {
			onUpdateUser(values);
		}
	};
	const buttonProps = {};
	if (loading) {
		buttonProps.endIcon = <CircularProgress size={20} color="inherit" />;
	}

	return (
		<div>
			<Dialog
				fullWidth={true}
				maxWidth="md"
				open={open}
				onClose={handleClose}
				scroll={'paper'}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle id="scroll-dialog-title" onClose={handleClose}>
					{`${type === 'add' ? 'Add' : 'Update'} user`}
				</DialogTitle>
				<DialogContent dividers={true}>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					{formikState && (
						<Formik
							initialValues={formikState}
							onSubmit={onSubmit}
							validate={validate}
						>
							{({ values, setFieldValue, errors }) => (
								<Form>
									{/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
									<Grid container spacing={3}>
										<Grid item xs={12} md={6}>
											<FTextField
												formLabel="Enter Name"
												label="Enter user name"
												name="name"
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<FTextField
												formLabel="Enter Email"
												label="Enter user email"
												name="email"
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<FTextField
												formLabel="Enter Number"
												label="Enter user number"
												name="number"
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<FSelect
												formLabel="User Role"
												label="Select user role"
												name="role"
												options={userRoleMenuItems}
											/>
										</Grid>
										<Grid item xs={12}>
											{errors.photo && (
												<Box>
													<Typography variant="caption">
														{errors.photo}
													</Typography>
												</Box>
											)}
											<input
												type="file"
												id="thumbnail-image"
												onChange={(e) => {
													const {
														target: { files },
													} = e;
													setFieldValue(
														'photo',
														files[0]
													);
												}}
											/>
											<br />
											<label htmlFor="thumbnail-image">
												Profile Photo
											</label>
											<br />
											{values.photo && (
												<Box>
													<img
														src={renderImage(
															values.photo,
															'/profile'
														)}
														alt="Thumbnail"
														style={{
															height: 100,
															width: 100,
															objectFit:
																'contain',
														}}
													/>
												</Box>
											)}
										</Grid>
									</Grid>

									<Box m="1rem">
										<Button
											variant="contained"
											color="primary"
											type="submit"
											disabled={loading}
											{...buttonProps}
										>
											submit
										</Button>
									</Box>
								</Form>
							)}
						</Formik>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}
