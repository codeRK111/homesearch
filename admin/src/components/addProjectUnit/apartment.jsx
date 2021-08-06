import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import {
	availabilityMenuItems,
	furnishMenuItems,
} from '../../utils/staticData';

import DatePicker from '../formik/datePicker.component';
import FSelect from '../formik/select.component';
import FTextField from '../formik/textField.component';
import { Field } from 'formik';
import React from 'react';
import useGlobalStyles from '../../common.style';

const ProjectUnitApartment = ({
	values,
	setFieldValue,
	resources,
	name,
	setName,
	addSpeciality,
	fetchSpecialities,
	loading,
	addLoading,
	specialities,
	errors,
	onSubmit,
}) => {
	const buttonProps = {};
	if (addLoading) {
		buttonProps.endIcon = <CircularProgress size={20} />;
	}

	const gClasses = useGlobalStyles();
	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Enter Property Title"
						label="Property Title"
						name="title"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Number Of Bedrooms"
						label="Enter Number"
						name="numberOfBedrooms"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Number Of Living Areas"
						label="Enter Number"
						name="numberOflivingAreas"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Enter number of units"
						label="Units"
						name="numberOfUnits"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Super Builtup Area"
						label="In Sq.Ft"
						name="superBuiltupArea"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Carpet Area"
						label="In Sq.Ft"
						name="carpetArea"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Toilets"
						label="Enter Number"
						name="numberOfToilets"
					/>
				</Grid>

				<Grid item xs={12} md={6}>
					<FSelect
						formLabel="Furnishing Status"
						label="status"
						name="furnished"
						options={furnishMenuItems.map((c) => ({
							value: c.value,
							label: c.label,
						}))}
					/>
				</Grid>
				{values.furnished !== 'unfurnished' && (
					<Grid item xs={12}>
						<h3>Furnishes</h3>
						<Grid container>
							{resources.furnishes.map((c, i) => {
								return (
									<Grid item lg={3}>
										<label>
											<Field
												type="checkbox"
												name="furnishes"
												value={c.id}
											/>
											{c.name}
										</label>
									</Grid>
								);
							})}
						</Grid>
					</Grid>
				)}
				<Grid item xs={12} md={6}>
					<FSelect
						formLabel="Availability"
						label="status"
						name="availability"
						options={availabilityMenuItems.map((c) => ({
							value: c.value,
							label: c.label,
						}))}
					/>
				</Grid>
				{values.availability === 'specificdate' && (
					<Grid item xs={12} md={6}>
						<DatePicker
							formLabel="Select date"
							name="availableDate"
							value={values.availableDate}
							onChange={(value) =>
								setFieldValue('availableDate', value)
							}
						/>
					</Grid>
				)}

				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Price"
						label="Enter Number"
						name="price"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl variant="filled" fullWidth>
						<InputLabel htmlFor="filled-age-native-simple">
							Select Speciality
						</InputLabel>
						<Select
							// native
							value={values.speciality}
							onChange={(e) =>
								setFieldValue('speciality', e.target.value)
							}
							inputProps={{
								name: 'age',
								id: 'filled-age-native-simple',
							}}
							onOpen={() => fetchSpecialities()}
						>
							{loading ? (
								<MenuItem value={10} disabled>
									Loading...
								</MenuItem>
							) : (
								specialities.map((c) => (
									<MenuItem value={c.id}>{c.name}</MenuItem>
								))
							)}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={9}>
							<TextField
								size="small"
								id="filled-basic"
								label="Speciality Name"
								variant="filled"
								name="name"
								value={name}
								fullWidth
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12} md={3}>
							<Button
								variant="contained"
								type="button"
								size="large"
								className={gClasses.buttonFullHeight}
								onClick={addSpeciality}
								{...buttonProps}
							>
								Add
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<FTextField
						formLabel="Description"
						label="Enter Description"
						name="description"
						multiline
						rows={10}
					/>
				</Grid>
				<Grid item xs={12}>
					{errors.floorPlan && (
						<Box>
							<Typography
								variant="caption"
								className={gClasses.errorColor}
							>
								{errors.floorPlan}
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
							setFieldValue('floorPlan', files[0]);
						}}
					/>
					<br />
					<label htmlFor="thumbnail-image">Typical floor plan</label>

					{values.floorPlan && (
						<Box>
							<img
								src={URL.createObjectURL(values.floorPlan)}
								alt="Thumbnail"
								style={{
									height: 100,
									width: 100,
									objectFit: 'contain',
								}}
							/>
						</Box>
					)}
				</Grid>
			</Grid>
		</div>
	);
};

export default ProjectUnitApartment;
