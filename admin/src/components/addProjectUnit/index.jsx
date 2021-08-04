import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import {
	addProjectSpeciality,
	getProjectSpecialities,
} from '../../utils/asyncFunctions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProjectUnitApartment from './apartment';
import ProjectUnitLand from './land';
import axios from 'axios';

const initialStateApartment = {
	title: '',
	description: '',
	numberOfUnits: '',
	superBuiltupArea: '',
	carpetArea: '',
	indianToilet: '',
	westernToilet: '',
	furnished: 'unfurnished',
	availability: 'immediately',
	availableDate: Date.now(),
	priceOver: 'superBuiltUpArea',
	pricePerSqFtMin: '',
	pricePerSqFtMax: '',
	minPrice: '',
	maxPrice: '',
	bookingAmount: 0,
	numberOfBedrooms: 0,
	numberOflivingAreas: 0,
	furnishes: [],
	speciality: null,
	tower: '',
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
}) {
	const cancelToken = React.useRef(undefined);
	const descriptionElementRef = React.useRef(null);
	const [loading, setLoading] = useState(false);
	const [addLoading, setAddLoading] = useState(false);
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

	return (
		<div>
			<Formik initialValues={formikState}>
				{({ values, setFieldValue, errors }) => (
					<Form>
						<Dialog
							fullWidth={true}
							maxWidth="md"
							open={open}
							onClose={handleClose}
							scroll={'paper'}
							aria-labelledby="scroll-dialog-title"
							aria-describedby="scroll-dialog-description"
						>
							<DialogTitle id="scroll-dialog-title">
								Add Unit
							</DialogTitle>
							<DialogContent dividers={true}>
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
									/>
								)}
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose} color="primary">
									Cancel
								</Button>
								<Button onClick={handleClose} color="primary">
									Save
								</Button>
							</DialogActions>
						</Dialog>
					</Form>
				)}
			</Formik>
		</div>
	);
}
