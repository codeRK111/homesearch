import Apartment from './highlights/apartmentHeighlights.component';
import PropTypes from 'prop-types';
import React from 'react';

const HighlightsWrapper = ({ project, info }) => {
	const renderHighlights = (project) => {
		switch (project.projectType) {
			case 'independenthouse':
			case 'flat':
			case 'land':
				return <Apartment project={project} info={info} />;

			default:
				break;
		}
	};
	return <React.Fragment>{renderHighlights(project)}</React.Fragment>;
};

HighlightsWrapper.propTypes = {
	project: PropTypes.object.isRequired,
};

export default HighlightsWrapper;
