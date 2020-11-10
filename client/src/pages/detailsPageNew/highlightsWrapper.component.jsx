import PropTypes from 'prop-types';
import React from 'react';
import ResaleLand from './resaleLandDetails.component';
import ResaleVillHighlights from './resaleApartmenrtDetails';

const HighlightsWrapper = ({ property }) => {
	const renderSaleHighlights = (property) => {
		switch (property.sale_type) {
			case 'independenthouse':
			case 'flat':
				return <ResaleVillHighlights property={property} />;
			case 'land':
				return <ResaleLand property={property} />;
			default:
				break;
		}
	};
	const renderHighlights = (property) => {
		switch (property.for) {
			case 'sale':
				return renderSaleHighlights(property);

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
