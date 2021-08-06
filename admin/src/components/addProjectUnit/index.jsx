import { Box, Button, CircularProgress } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import {
	addProjectSpeciality,
	getProjectSpecialities,
} from '../../utils/asyncFunctions';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProjectUnitApartment from './apartment';
import ProjectUnitLand from './land';
import { addProjectProperty } from '../../utils/asyncProject';
import axios from 'axios';

const initialStateApartment = {
	title: '',
	description: '',
	numberOfUnits: '',
	superBuiltupArea: '',
	carpetArea: '',
	numberOfToilets: '',
	furnished: 'unfurnished',
	availability: 'immediately',
	availableDate: Date.now(),
	price: '',
	numberOfBedrooms: 0,
	numberOflivingAreas: 0,
	furnishes: [],
	speciality: null,
	floorPlan: null,
};
const initialStateLand = {
	title: '',
	description: '',
	numberOfUnits: '',
	length: '',
	width: '',
	plotFrontage: '',
	plotArea: [0],
	widthOfRoad: '',
	facing: 'east', //dropdown,
	constructionDone: false, //drop,
	boundaryWallMade: false, //drop
	gatedCommunity: false, //drop,
	landUsingZoning: 'yellow', //drop
	govermentValuation: '',
	pricePerSqFtMin: '',
	pricePerSqFtMax: '',
	minPrice: '',
	maxPrice: '',
	carParking: 'open',
	verified: true,
	transactionType: 'newbooking',
	furnishes: [],
	speciality: null,
};

export default function AddPropertyUnit({
	open,
	handleClose,
	projectType,
	resources,
	fetchProject,
	project,
	tower,
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
					values.furnishes.forEach((c) => {
						formData.append('furnishes', c);
					});
				} else {
					formData.append(key, values[key]);
				}
			}
		}
		formData.append('tower', JSON.stringify(tower));
		addProjectProperty(
			project,
			formData,
			cancelTokenAdd.current,
			setAddPropertyLoading
		)
			.then((resp) => {
				fetchProject();
			})
			.catch((error) => {
				console.log(error);
				// setAddProjectError(error);
			});
	};

	const fetchSpecialities = (forRefresh = false) => {
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
	};

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
	const formikState =
		projectType === 'land' ? initialStateLand : initialStateApartment;

	const buttonProps = {};
	if (addPropertyLoading) {
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
				<DialogTitle id="scroll-dialog-title">Add Unit</DialogTitle>
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
