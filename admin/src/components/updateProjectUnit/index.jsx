import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import {
	addProjectSpeciality,
	getProjectSpecialities,
} from '../../utils/asyncFunctions';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import ProjectUnitApartment from './apartment';
import ProjectUnitLand from './land';
import axios from 'axios';
import { updateProjectProperty } from '../../utils/asyncProject';
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

export default function UpdateProjectUnitDialog({
	open,
	handleClose,
	projectType,
	resources,
	fetchProject,
	project,
	tower,
	state,
}) {
	const cancelToken = React.useRef(undefined);
	const cancelTokenAdd = React.useRef(undefined);
	const descriptionElementRef = React.useRef(null);
	const [loading, setLoading] = useState(false);

	const [addLoading, setAddLoading] = useState(false);
	const [addPropertyLoading, setAddPropertyLoading] = useState(false);
	const [name, setName] = useState('');
	const [specialities, setSpecialities] = useState([]);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	const onSubmit = (values) => {
		cancelTokenAdd.current = axios.CancelToken.source();
		const formData = new FormData();
		for (const key in values) {
			if (values.hasOwnProperty(key)) {
				if (key === 'furnishes') {
					if (values.furnished !== 'unfurnished') {
						values.furnishes.forEach((c) => {
							formData.append('furnishes', c);
						});
					}
				} else {
					formData.append(key, values[key]);
				}
			}
		}
		// formData.append('tower', JSON.stringify(tower));
		if (typeof values.floorPlan === 'string') {
			formData.delete('floorPlan');
		}
		formData.delete('tower');
		console.log(JSON.stringify(tower));
		updateProjectProperty(
			values.id,
			formData,
			cancelTokenAdd.current,
			setAddPropertyLoading
		)
			.then((resp) => {
				handleClose();
				fetchProject();
			})
			.catch((error) => {
				console.log(error);
				// setAddProjectError(error);
			});
	};

	const fetchSpecialities = React.useCallback(
		(forRefresh = false) => {
			if (specialities.length === 0 || forRefresh) {
				cancelToken.current = axios.CancelToken.source();
				getProjectSpecialities(cancelToken.current, setLoading, {
					page: 1,
					limit: 200,
					status: 'active',
				})
					.then((resp) => {
						console.log({ resp });
						setSpecialities(resp.specialities);
					})
					.catch((err) => {
						console.log({ err });
					});
			}
		},
		[specialities.length]
	);

	const addSpeciality = () => {
		cancelToken.current = axios.CancelToken.source();
		addProjectSpeciality({ name }, cancelToken.current, setAddLoading)
			.then((resp) => {
				console.log(resp);
				setName('');
				fetchSpecialities(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const formikState = {
		...state,
		speciality: state.speciality._id,
	};

	const buttonProps = {};
	if (addPropertyLoading) {
		buttonProps.endIcon = <CircularProgress size={20} color="inherit" />;
	}

	React.useEffect(() => {
		fetchSpecialities(true);
	}, [fetchSpecialities]);

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
					Update Unit
				</DialogTitle>
				<DialogContent dividers={true}>
					<Formik initialValues={formikState} onSubmit={onSubmit}>
						{({ values, setFieldValue, errors }) => (
							<Form>
								{/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
								{projectType === 'land' ? (
									<ProjectUnitLand
										values={values}
										setFieldValue={setFieldValue}
										resources={resources}
										name={name}
										setName={setName}
										addSpeciality={addSpeciality}
										fetchSpecialities={fetchSpecialities}
										loading={loading}
										addLoading={addLoading}
										specialities={specialities}
										errors={errors}
										onSubmit={onSubmit}
									/>
								) : (
									<ProjectUnitApartment
										values={values}
										setFieldValue={setFieldValue}
										resources={resources}
										name={name}
										setName={setName}
										addSpeciality={addSpeciality}
										fetchSpecialities={fetchSpecialities}
										loading={loading}
										addLoading={addLoading}
										specialities={specialities}
										errors={errors}
										onSubmit={onSubmit}
									/>
								)}
								<Box m="1rem">
									<Button
										variant="contained"
										color="primary"
										type="submit"
										{...buttonProps}
									>
										submit
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				</DialogContent>
			</Dialog>
		</div>
	);
}
