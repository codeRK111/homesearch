import Apartment from './apartmentUnitConfiguration.component';
import Land from './landUnitConfiguration.component';
import PropTypes from 'prop-types';
import React from 'react';

const UnitWrapper = ({ project, properties }) => {
	const renderHighlights = (project) => {
		switch (project.projectType) {
			case 'independenthouse':
			case 'flat':
				return <Apartment project={project} properties={properties} />;
			case 'land':
				return <Land project={project} properties={properties} />;

			default:
				break;
		}
	};
	return <React.Fragment>{renderHighlights(project)}</React.Fragment>;
};

UnitWrapper.propTypes = {
	project: PropTypes.object.isRequired,
};

export default UnitWrapper;
