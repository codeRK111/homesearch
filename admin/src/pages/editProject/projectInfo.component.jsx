import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import RowTextField from '../../components/rowTextField/rowFormikTextField.component';
import {
	complitionStatusMenuItems,
	projectTypeMenuItens,
	statusMenuItems,
	configureIntial,
	validate,
	configureForUpdate,
	showReraId,
	showNumber,
} from './projectInfo.constant';
import RowSelect from '../../components/rowSelect/rowFormikSelect.component';
import Checkbox from '../../components/checkbox/checkbox.component';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import {
	Box,
	Backdrop,
	CircularProgress,
	Button,
	Switch,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	selectAmenities,
	selectLoading as resourcesLoading,
} from '../../redux/property/property.selector';
import { selectUpdateProjectDetailsLoading } from '../../redux/project/project.selector';
import { fetchAllPropertyResourcesStart } from '../../redux/property/property.actions';
import { updateProjectDetails } from '../../redux/project/project.action';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const ProjectInfo = ({
	initialValue,
	amenities,
	resourcesLoading,
	fetchResourcesStart,
	id,
	updateProjectDetailsLoading,
	updateProjectDetails,
}) => {
	// Declaration
	const classes = useStyles();
	const history = useHistory();
	// State hook
	const [visible, setVisible] = React.useState({
		amenities: false,
		legalClearance: false,
	});
	const [asyncError, setAsyncError] = React.useState(null);

	// Api response handler
	const handleFetchResources = (type, data) => {
		if (type === 'fail') {
			setAsyncError(data);
		} else {
			setAsyncError(null);
		}
	};

	const handleUpdateProjectDetails = (type, data) => {
		if (type === 'fail') {
			setAsyncError(data);
		} else {
			setAsyncError(null);
			history.push('/projects/active');
		}
	};

	// Event handler
	const handleChangeSwitch = (e) => {
		const { name, checked } = e.target;
		setVisible({ ...visible, [name]: checked });
	};

	const updateProject = (data) => {
		const clone = { ...data };
		if (clone.amenities.length === 0) {
			if (clone.initialAmenities) {
				clone.amenities = clone.initialAmenities;
			}
		} else {
			clone.amenities = clone.amenities
				.filter((c) => c.value)
				.map((b) => b.id);
		}
		configureForUpdate(clone);
		console.log(clone);
		updateProjectDetails(handleUpdateProjectDetails, id, clone);
	};

	// UseEffect hooks
	React.useEffect(() => {
		if (visible.amenities) {
			if (amenities.length === 0) {
				fetchResourcesStart(handleFetchResources);
			}
		}
	}, [visible.amenities]);
	return (
		<Box>
			<Backdrop
				className={classes.backdrop}
				open={updateProjectDetailsLoading}
			>
				<CircularProgress color="secondary" />
			</Backdrop>
			<FormHeader text="Project Info" />
			<Box p="1rem">
				<p className="color-red">{asyncError}</p>
				<Formik
					initialValues={configureIntial(initialValue, amenities)}
					validate={validate}
					enableReinitialize={true}
					onSubmit={updateProject}
				>
					{({ values }) => (
						<Form>
							<RowTextField
								heading="Title"
								name="title"
								value={values.title}
							/>
							<RowTextField
								heading="Description"
								name="description"
								value={values.description}
							/>
							<RowSelect
								heading="Complition status"
								name="complitionStatus"
								value={values.complitionStatus}
								menuItems={complitionStatusMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Project type"
								name="projectType"
								value={values.projectType}
								menuItems={projectTypeMenuItens}
								label="Choose"
							/>
							<RowTextField
								heading="Distance from School"
								name="distanceSchool"
								value={values.distanceSchool}
							/>
							<RowTextField
								heading="Distance from bus stop"
								name="distanceSchool"
								value={values.distanceBusStop}
							/>
							<RowTextField
								heading="Distance from railway station"
								name="distanceSchool"
								value={values.distanceRailwayStation}
							/>
							<RowTextField
								heading="Distance from airport"
								name="distanceSchool"
								value={values.distanceAirport}
							/>
							<RowTextField
								heading="Distance from hospital"
								name="distanceHospital"
								value={values.distanceHospital}
							/>
							<RowSelect
								heading="Status"
								name="status"
								value={values.status}
								menuItems={statusMenuItems}
								label="Choose"
							/>
							{values.showAmenities && (
								<RowHOC heading="Show amenities">
									<Switch
										checked={visible.amenities}
										onChange={handleChangeSwitch}
										color="primary"
										name="amenities"
										inputProps={{
											'aria-label': 'primary checkbox',
										}}
									/>
								</RowHOC>
							)}
							{visible.amenities && (
								<RowHOC heading="Amenities">
									{resourcesLoading ? (
										<p>Loading amenities...</p>
									) : (
										<FieldArray name="amenities">
											{(arrayHelpers) => (
												<div>
													{values.amenities.map(
														(c, i) => {
															return (
																<Checkbox
																	key={i}
																	heading="test"
																	type="checkbox"
																	name={`amenities.${i}.value`}
																	label={
																		c.name
																	}
																/>
															);
														}
													)}
												</div>
											)}
										</FieldArray>
									)}
								</RowHOC>
							)}
							<RowHOC heading="Show legal clearance">
								<Switch
									checked={visible.legalClearance}
									onChange={handleChangeSwitch}
									color="primary"
									name="legalClearance"
									inputProps={{
										'aria-label': 'primary checkbox',
									}}
								/>
							</RowHOC>
							{visible.legalClearance && (
								<RowHOC heading="Legal clearance">
									<FieldArray name="legalClearance">
										{(arrayHelpers) => (
											<div>
												{values.legalClearance.map(
													(c, i) => {
														return (
															<Checkbox
																key={i}
																heading="test"
																type="checkbox"
																name={`legalClearance.${i}.value`}
																label={c.label}
															/>
														);
													}
												)}
											</div>
										)}
									</FieldArray>
								</RowHOC>
							)}
							{showReraId(values, visible) && (
								<RowTextField
									heading="RERA ID"
									name="reraId"
									value={values.reraId}
								/>
							)}
							{showNumber(values, visible) && (
								<RowTextField
									heading="Owner number"
									name="numberOfOwner"
									value={values.numberOfOwner}
								/>
							)}
							<Box display="flex" justifyContent="flex-end">
								<Button
									type="submit"
									color="primary"
									variant="contained"
									classes={{
										label: 'transform-none',
									}}
									size="large"
								>
									Update
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	amenities: selectAmenities,
	resourcesLoading,
	updateProjectDetailsLoading: selectUpdateProjectDetailsLoading,
});

const mapActionToProps = (dispatch) => ({
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	updateProjectDetails: (callback, projectId, project) =>
		dispatch(updateProjectDetails({ callback, projectId, project })),
});

export default connect(mapStateToProps, mapActionToProps)(ProjectInfo);
