import React from 'react';
import {
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	Box,
	Paper,
} from '@material-ui/core';
import RowTextField from '../rowTextField/rowFormikTextField.component';
import RowSelect from '../rowSelect/rowFormikSelect.component';
import RowHOC from '../rowCheckBox/rowCheckbox.component';
import { Formik, Form } from 'formik';
import './oneBHK.style.scss';

const furnishMenuItems = [
	{
		label: 'Furnished',
		value: 'furnished',
	},
	{
		label: 'Unfurnished',
		value: 'unfuenished',
	},
	{
		label: 'Semifurnished',
		value: 'semifurnished',
	},
];

const availabilityMenuItems = [
	{
		label: 'Ready to move',
		value: 'immediately',
	},
	{
		label: 'Available from',
		value: 'specificdate',
	},
];

const initialState = {
	title: '',
	description: '',
	units: '',
	builtUpArea: '',
	carpetArea: '',
	indianToilet: '',
	westernToilet: '',
	furnished: 'unfuenished',
	availability: 'immediately',
	salePriceOver: 'superBuiltUpArea',
	pricePerSqFt: '',
	price: '',
};

const OneBHK = () => {
	return (
		<Paper>
			<Formik initialValues={initialState}>
				{({ values, handleChange }) => (
					<Form>
						<RowTextField
							heading="Title"
							name="title"
							type="text"
							label="Enter title"
						/>
						<RowTextField
							heading="Description"
							name="description"
							type="text"
							label="Enter description"
							multiline={true}
							rows={5}
						/>
						<RowTextField
							heading="Number of units"
							name="units"
							type="number"
							label="Enter number"
						/>
						<RowTextField
							heading="Super builtup area"
							name="builtUpArea"
							type="number"
							label="Enter number"
						/>
						<RowTextField
							heading="Carpet Area"
							name="carpetArea"
							type="number"
							label="Enter number"
						/>
						<RowTextField
							heading="Number of indian toilet"
							name="indianToilet"
							type="number"
							label="Enter number"
						/>
						<RowTextField
							heading="Number of western toilet"
							name="westernToilet"
							type="number"
							label="Enter number"
						/>
						<RowSelect
							heading="Furnished"
							name="furnished"
							label="Choose"
							menuItems={furnishMenuItems}
						/>
						<RowSelect
							heading="Property availability"
							name="availability"
							label="Choose"
							menuItems={availabilityMenuItems}
						/>
						<RowTextField
							heading="Price"
							name="price"
							type="number"
							label="Enter price"
						/>
						{values.builtUpArea && values.price && (
							<RowTextField
								heading="Price per sqFt"
								name="pricePerSqFt"
								type="number"
								value={(
									values.price / values.builtUpArea
								).toFixed(2)}
								label="Price per SqFt"
								disabled={true}
							/>
						)}
						<RowHOC heading="Price over">
							<FormControl component="fieldset">
								<RadioGroup
									aria-label="salePriceOver"
									name="salePriceOver"
									value={values.salePriceOver}
									onChange={handleChange}
								>
									<Box display="flex">
										<FormControlLabel
											value="superBuiltUpArea"
											control={<Radio />}
											label="Super builtup area"
										/>
										<FormControlLabel
											value="carpetArea"
											control={<Radio />}
											label="Carpet area"
										/>
									</Box>
								</RadioGroup>
							</FormControl>
						</RowHOC>
					</Form>
				)}
			</Formik>
		</Paper>
	);
};

export default OneBHK;
