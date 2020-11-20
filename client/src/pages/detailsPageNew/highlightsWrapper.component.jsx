import PropTypes from 'prop-types';
import React from 'react';
import RentApartmentHighlights from './rentApartmenrtDetails';
import RentHostelHeighlights from './rentHostelDetails';
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

	const renderRentHighlights = (property) => {
		switch (property.type) {
			case 'flat':
			case 'independenthouse':
				return <RentApartmentHighlights property={property} />;
			case 'hostel':
			case 'pg':
				return <RentHostelHeighlights property={property} />;
			default:
				break;
		}
	};
	const renderHighlights = (property) => {
		switch (property.for) {
			case 'sale':
				return renderSaleHighlights(property);
			case 'rent':
				return renderRentHighlights(property);

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
