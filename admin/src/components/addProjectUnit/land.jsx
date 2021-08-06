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
	booleanMenuItems,
	facingMenuItems,
	landUsingZoningMenuItems,
} from '../../utils/staticData';

import FSelect from '../formik/select.component';
import FTextField from '../formik/textField.component';
import React from 'react';
import useGlobalStyles from '../../common.style';

const ProjectUnitLand = ({
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
						formLabel="Enter number of units"
						label="Units"
						name="numberOfUnits"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Length"
						label="In Ft"
						name="length"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField formLabel="Width" label="In Ft" name="width" />
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Plot Frontage"
						label="In Sq. Ft"
						name="plotFrontage"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Plot Area"
						label="In Sq. Ft"
						name="plotArea"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FTextField
						formLabel="Width of the road"
						label="In  Ft"
						name="widthOfRoad"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FSelect
						formLabel="Facing"
						label="Select"
						name="facing"
						options={facingMenuItems.map((c) => ({
							value: c.value,
							label: c.label,
						}))}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FSelect
						formLabel="Is construction Done"
						label="Select"
						name="constructionDone"
						options={booleanMenuItems.map((c) => ({
							value: c.value,
							label: c.label,
						}))}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FSelect
						formLabel="Is Boundry Wall Made"
						label="Select"
						name="boundaryWallMade"
						options={booleanMenuItems.map((c) => ({
							value: c.value,
							label: c.label,
						}))}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FSelect
						formLabel="Is Boundry Wall Made"
						label="Select"
						name="boundaryWallMade"
						options={booleanMenuItems.map((c) => ({
							value: c.value,
							label: c.label,
						}))}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FSelect
						formLabel="Is Gated Community"
						label="Select"
						name="gatedCommunity"
						options={booleanMenuItems.map((c) => ({
							value: c.value,
							label: c.label,
						}))}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FSelect
						formLabel="Land Using Zoning"
						label="Select"
						name="landUsingZoni ng"
						options={landUsingZoningMenuItems.map((c) => ({
							value: c.value,
							label: c.label,
						}))}
					/>
				</Grid>

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

export default ProjectUnitLand;
