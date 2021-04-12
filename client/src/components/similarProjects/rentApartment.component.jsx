import { Box, Grid } from '@material-ui/core';

import React from 'react';
import RentApartment from './rentApartmentCard.component';
import RentHostel from './rentHostelCard.component';
import Skeleton from '../skeleton/similarProperties.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchProperties } from '../../redux/property/property.actions';
import { selectPropertyLoading } from '../../redux/property/property.selectors';

const Apartment = ({
	searchProperties,
	propertyLoading,
	city,
	type,
	exclude,
}) => {
	const [data, setData] = React.useState([]);
	const [asyncError, setAsyncError] = React.useState(null);
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data.properties.filter((c) => c.id !== exclude));
			setData(data.properties.filter((c) => c.id !== exclude));
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		const body = {
			for: 'rent',
			city: city.id,
			type: [type],
			limit: 4,
		};

		searchProperties(handleFetchCities, body);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchProperties]);

	const renderRentItems = (data) => {
		switch (data.type) {
			case 'flat':
			case 'independenthouse':
				return <RentApartment data={data} key={data.id} />;
			case 'hostel':
			case 'pg':
				return <RentHostel data={data} key={data.id} />;

			default:
				break;
		}
	};

	return (
		<Box>
			{propertyLoading ? (
				<Box>
					<Skeleton />
				</Box>
			) : (
				!asyncError &&
				data.length > 0 && (
					<div>
						<h3>Similar Properties</h3>
						<Grid container spacing={3}>
							{data.map((c) => renderRentItems(c))}
						</Grid>
					</div>
				)
			)}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	propertyLoading: selectPropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchProperties: (callback, body) =>
		dispatch(searchProperties({ callback, body })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Apartment);
