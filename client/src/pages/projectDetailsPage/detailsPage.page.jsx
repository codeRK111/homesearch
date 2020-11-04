import ProjectApartment from '../propertyDetails/projectPropertyApartment.page';
import ProjectLand from '../propertyDetails/projectPropertyLand.page';
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
			{propertyFor === 'project' && type === 'land' && <ProjectLand />}
		</div>
	);
};

export default DetailsPage;
