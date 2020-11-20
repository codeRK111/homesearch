import { Box, Paper } from '@material-ui/core';

import ErrorCard from '../../components/errorCard/errorCard.component';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import RentApartment from '../../components/searchResultCardNewRentApartment/searchResultCard.component';
import RentHostel from '../../components/searchResultCardNewRentHostel/searchResultCard.component';
import ResaleApartment from '../../components/searchResultCardNew/searchResultCard.component';
import ResaleLand from '../../components/searchResultCardNewLand/searchResultCard.component';
import ResaleVilla from '../../components/searchResultCardNewIndHouse/searchResultCard.component';
import Skeleton from '../../components/searchCardSkeleton/searchCardSkeleton.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getMyProperties } from '../../redux/property/property.actions';
import { selectMyPropertiesLoading } from '../../redux/property/property.selectors';

const MyProperties = ({ getMyProperties, myPropertiesLoading }) => {
	const [asyncError, setAsyncError] = React.useState(null);
	const [totalDos, setTotalDocs] = React.useState(0);
	const [data, setData] = React.useState([]);

	const handleFetchProperties = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data.properties);
			setData(data.properties);
			setTotalDocs(data.count);
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		getMyProperties(handleFetchProperties);
	}, []);
	const filterTypes = (property) => {
		switch (property.type) {
			case 'flat':
				return <RentApartment property={property} edit={true} />;
			case 'independenthouse':
				return <RentApartment property={property} edit={true} />;
			case 'hostel':
			case 'pg':
				return <RentHostel property={property} edit={true} />;

			default:
				break;
		}
	};
	const filterTypesSale = (property) => {
		switch (property.sale_type) {
			case 'flat':
				return <ResaleApartment property={property} edit={true} />;

			case 'land':
				return <ResaleLand property={property} edit={true} />;

			case 'independenthouse':
				return <ResaleVilla property={property} edit={true} />;

			default:
				break;
		}
	};

	const renderProperties = (property) => {
		switch (property.for) {
			case 'rent':
				return filterTypes(property);
			case 'sale':
				return filterTypesSale(property);

			default:
		}
	};
	return (
		<div>
			{asyncError && <ErrorCard message={asyncError} />}
			{myPropertiesLoading ? (
				<Box>
					<Skeleton />
				</Box>
			) : (
				!asyncError &&
				data.map((p) => (
					<Box mt="1rem" key={p.id}>
						{renderProperties(p)}
					</Box>
				))
			)}
			{!asyncError && data.length > 0 && (
				<Box mt="2rem">
					<Paper>
						<Box p="1rem" display="flex" justifyContent="center">
							<Pagination
								count={totalDos / data.length}
								color="primary"
							/>
						</Box>
					</Paper>
				</Box>
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	myPropertiesLoading: selectMyPropertiesLoading,
});

const mapDispatchToProps = (dispatch) => ({
	getMyProperties: (callback) => dispatch(getMyProperties({ callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProperties);
