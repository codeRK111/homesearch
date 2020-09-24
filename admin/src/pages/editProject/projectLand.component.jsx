import React from 'react';
import { Formik, Form } from 'formik';
import RowTextField from '../../components/rowTextField/rowFormikTextField.component';
import {
	configureIntialLand,
	configureForUpdateLand,
	validateLand,
	renderTypes,
	carParkingMenuItems,
	transactionTypeMenuItems,
	verifiedMenuItems,
	boundaryWallMadeMenuItems,
	facingMenuItems,
	constructionDoneMenuItems,
	gatedCommunityMadeMenuItems,
	landUsingZoningMenuItems,
} from './properties.constant';
import RowSelect from '../../components/rowSelect/rowFormikSelect.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import { Box, Backdrop, CircularProgress, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	selectAmenities,
	selectFurnishes,
	selectLoading as resourcesLoading,
} from '../../redux/property/property.selector';
import { selectUpdateProjectPropertyDetailsLoading } from '../../redux/project/project.selector';
import { fetchAllPropertyResourcesStart } from '../../redux/property/property.actions';
import { updateProjectPropertyDetails } from '../../redux/project/project.action';
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
	furnishes,
	fetchResourcesStart,
	id,
	updateProjectPropertyDetailsLoading,
	updateProjectPropertyDetails,
}) => {
	// Declaration
	const classes = useStyles();
	const history = useHistory();
	// State hook
	const [visible, setVisible] = React.useState({
		furnishes: false,
	});
	const [asyncError, setAsyncError] = React.useState(null);

	// Api response handler
	const handleFetchResources = (type, data) => {
		// if (type === 'fail') {
		// 	setAsyncError(data);
		// } else {
		// 	setAsyncError(null);
		// }
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
		configureForUpdateLand(clone);
		console.log(clone);
		updateProjectPropertyDetails(handleUpdateProjectDetails, id, clone);
	};

	// UseEffect hooks
	React.useEffect(() => {
		if (visible.furnishes) {
			if (furnishes.length === 0) {
				fetchResourcesStart(handleFetchResources);
			}
		}
	}, [visible.furnishes]);
	return (
		<Box>
			<Backdrop
				className={classes.backdrop}
				open={updateProjectPropertyDetailsLoading}
			>
				<CircularProgress color="secondary" />
			</Backdrop>
			<FormHeader
				text={`Property Info (${renderTypes(initialValue.type)})`}
			/>
			<Box p="1rem">
				<p className="color-red">{asyncError}</p>
				<Formik
					initialValues={configureIntialLand(initialValue)}
					validate={validateLand}
					enableReinitialize={true}
					onSubmit={updateProject}
				>
					{({ values, handleChange, setFieldValue }) => (
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
							<RowTextField
								heading="Number of units"
								type="number"
								name="numberOfUnits"
								value={values.numberOfUnits}
							/>

							<RowTextField
								heading="Plot area"
								type="number"
								name="plotArea"
								value={values.plotArea}
							/>
							<RowTextField
								heading="Plot frontage"
								type="number"
								name="plotFrontage"
								value={values.plotFrontage}
							/>
							<RowTextField
								heading="Length"
								type="number"
								name="length"
								value={values.length}
							/>
							<RowTextField
								heading="Width"
								type="number"
								name="width"
								value={values.width}
							/>
							<RowTextField
								heading="Width of road"
								type="number"
								name="widthOfRoad"
								value={values.widthOfRoad}
							/>
							<RowSelect
								heading="Facing"
								name="facing"
								value={values.facing}
								menuItems={facingMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Boundary wall made"
								name="boundaryWallMade"
								value={values.boundaryWallMade}
								menuItems={boundaryWallMadeMenuItems}
								label="Choose"
							/>

							<RowSelect
								heading="Car parking"
								name="carParking"
								value={values.carParking}
								menuItems={carParkingMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Construction done"
								name="constructionDone"
								value={values.constructionDone}
								menuItems={constructionDoneMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Gated community"
								name="gatedCommunity"
								value={values.gatedCommunity}
								menuItems={gatedCommunityMadeMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Land using zoining"
								name="landUsingZoning"
								value={values.landUsingZoning}
								menuItems={landUsingZoningMenuItems}
								label="Choose"
							/>

							<RowSelect
								heading="Transaction Type"
								name="transactionType"
								value={values.transactionType}
								menuItems={transactionTypeMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Verified"
								name="verified"
								value={values.verified}
								menuItems={verifiedMenuItems}
								label="Choose"
							/>

							{/* <RowTextField
								heading="Booking Amount"
								type="number"
								name="bookingAmount"
								value={values.bookingAmount}
							/> */}
							<RowTextField
								heading="Goverment valuation"
								type="number"
								name="govermentValuation"
								value={values.govermentValuation}
							/>
							<RowTextField
								heading="Max price"
								type="number"
								name="maxPrice"
								value={values.maxPrice}
							/>
							<RowTextField
								heading="Min price"
								type="number"
								name="minPrice"
								value={values.minPrice}
							/>
							<Box>
								<RowTextField
									heading="Price per sqFt (Min)"
									name="pricePerSqFtMin"
									onChange={handleChange}
									type="number"
									value={(
										values.minPrice / values.plotArea
									).toFixed(2)}
									label="Price per SqFt"
									disabled={true}
								/>
								<RowTextField
									heading="Price per sqFt(Max)"
									name="pricePerSqFtMax"
									onChange={handleChange}
									type="number"
									value={(
										values.maxPrice / values.plotArea
									).toFixed(2)}
									label="Price per SqFt"
									disabled={true}
								/>
							</Box>
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
	furnishes: selectFurnishes,
	resourcesLoading,
	updateProjectPropertyDetailsLoading: selectUpdateProjectPropertyDetailsLoading,
});

const mapActionToProps = (dispatch) => ({
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	updateProjectPropertyDetails: (callback, projectId, project) =>
		dispatch(
			updateProjectPropertyDetails({ callback, projectId, project })
		),
});

export default connect(mapStateToProps, mapActionToProps)(ProjectInfo);
