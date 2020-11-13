import PropTypes from 'prop-types';
import React from 'react';
import RentAppartment from './rentApartmentHeader.component';
import ResaleLandHeader from './resaleLandHeader.component';
import ResaleVillHeader from './resaleVillaHeader.component';

const HeaderWrapper = ({ property }) => {
	const renderSaleHeader = (property) => {
		switch (property.sale_type) {
			case 'independenthouse':
			case 'flat':
				return <ResaleVillHeader property={property} />;
			case 'land':
				return <ResaleLandHeader property={property} />;

			default:
				break;
		}
	};
	const renderRentHeader = (property) => {
		switch (property.type) {
			case 'flat':
				return <RentAppartment property={property} />;

			default:
				break;
		}
	};
	const renderHeader = (property) => {
		switch (property.for) {
			case 'sale':
				return renderSaleHeader(property);

			case 'rent':
				return renderRentHeader(property);

			default:
				break;
		}
	};
	return <React.Fragment>{renderHeader(property)}</React.Fragment>;
};

HeaderWrapper.propTypes = {
	property: PropTypes.object.isRequired,
};

export default HeaderWrapper;
