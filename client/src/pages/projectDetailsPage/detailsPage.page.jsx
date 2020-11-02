import ProjectApartment from '../propertyDetails/projectPropertyApartment.page';
import React from 'react';

const DetailsPage = ({
	match: {
		params: { propertyFor, type },
	},
}) => {
	return (
		<div>
			{propertyFor === 'project' && type === 'apartment' && (
				<ProjectApartment />
			)}
		</div>
	);
};

export default DetailsPage;
