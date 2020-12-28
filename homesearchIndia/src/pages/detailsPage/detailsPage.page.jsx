import ProjectApartment from '../propertyDetails/projectApartment.page';
import ProjectLand from '../propertyDetails/projectLand.page';
import React from 'react';
import RentApartment from '../propertyDetails/rentApartment.page';
import RentHostel from '../propertyDetails/rentHostel.page';
import RentLand from '../rentLand/rentLand.page';
import RentVilla from '../rentVilla/rentVilla.page';
import ResaleApartment from '../propertyDetails/propertyDetails.page';

const DetailsPage = ({
	match: {
		params: { propertyFor, type },
	},
}) => {
	return (
		<div>
			<ProjectApartment />
			{/* {propertyFor === 'sale' && type === 'apartment' && (
				<ResaleApartment />
			)}
			{propertyFor === 'rent' && type === 'apartment' && (
				<RentApartment />
			)}
			{propertyFor === 'rent' && type === 'villa' && (
				<RentApartment independent />
			)}
			{propertyFor === 'rent' && type === 'hostel' && <RentHostel />}
			{propertyFor === 'rent' && type === 'pg' && <RentHostel pg />}
			{propertyFor === 'sale' && type === 'villa' && <RentVilla />}
			{propertyFor === 'sale' && type === 'land' && <RentLand />}
			{propertyFor === 'project' && type === 'apartment' && (
				<ProjectApartment />
			)}
			{propertyFor === 'project' && type === 'land' && <ProjectLand />} */}
		</div>
	);
};

export default DetailsPage;
