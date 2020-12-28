import Apartment from './projectPropertyApartmentHeighlights.component';
import Land from './projectPropertyLandHeighlights.component';
import PropTypes from 'prop-types';
import React from 'react';

const HighlightsWrapper = ({ property }) => {
	const renderHighlights = (property) => {
		switch (property.type) {
			case 'independenthouse':
			case 'flat':
				return <Apartment property={property} />;
			case 'land':
				return <Land property={property} />;

			default:
				break;
		}
	};
	return <React.Fragment>{renderHighlights(property)}</React.Fragment>;
};

HighlightsWrapper.propTypes = {
	property: PropTypes.object.isRequired,
};

export default HighlightsWrapper;
