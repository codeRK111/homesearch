import AvailableForFilter from './availableFor';
import BudgetFilter from './budget';
import { Grid } from '@material-ui/core';
import LocationFilter from './location';
import PropertyTypeFilter from './propertyType';
import React from 'react';

const PropertyFilterMedium = ({
	city,
	existingLocations,
	handleLocations,
	pFor,
	types,
	setTypes,
	rentItems,
	setRentItems,
	otherItems,
	setOtherItems,
	availableFor,
	setAvailableFor,
}) => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={2}>
				<LocationFilter
					city={city}
					existingLocations={existingLocations}
					handleLocations={handleLocations}
				/>
			</Grid>
			<Grid item xs={2}>
				<PropertyTypeFilter
					pFor={pFor}
					types={types}
					setTypes={setTypes}
				/>
			</Grid>
			<Grid item xs={2}>
				<BudgetFilter
					pFor={pFor}
					rentItems={rentItems}
					setRentItems={setRentItems}
					otherItems={otherItems}
					setOtherItems={setOtherItems}
				/>
			</Grid>
			{pFor === 'rent' && (
				<Grid item xs={2}>
					<AvailableForFilter
						availableFor={availableFor}
						setAvailableFor={setAvailableFor}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default PropertyFilterMedium;
