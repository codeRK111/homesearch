import { Box, Paper } from '@material-ui/core';

import AppBar from '../../components/appBar/appBar.component';
import EditSkeleton from '../../components/skeleton/editPropertySkeleton.component';
import ErrorCard from '../../components/errorCard/errorCard.component';
import Footer from '../../components/footer/footer.component';
import React from 'react';
import RentApartment from './rentApartmentEdit.page';
import RentHostel from './rentHostelEdit.page';
import ResaleApartment from './resaleApartmentEdit.page';
import ResaleLand from './resaleLandEdit.page';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPropertyDetails } from '../../redux/property/property.actions';
import { selectGetPropertyDetailsLoading } from '../../redux/property/property.selectors';
import useStyles from './postPropertyDetails.styles';

const DetailsPage = ({
	propertyDetailsLoading,
	getPropertyDetails,
	match: { params },
}) => {
	const [data, setData] = React.useState(null);
	const [asyncError, setAsyncError] = React.useState(null);
	const classes = useStyles();
	const handleFetchPropertyDetails = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			const propertyDetails = {
				...data,
				toiletIndian:
					data.toiletTypes.length > 0
						? data.toiletTypes.find(
								(c) => c.toiletType === 'indian'
						  )['numbers']
						: '',
				toiletWestern:
					data.toiletTypes.length > 0
						? data.toiletTypes.find(
								(c) => c.toiletType === 'western'
						  )['numbers']
						: '',
			};
			if (
				propertyDetails.legalClearance.find(
					(c) => c.name === 'numberOfOwner'
				)['value']
			) {
				propertyDetails[
					'ownerNumber'
				] = propertyDetails.legalClearance.find(
					(c) => c.name === 'numberOfOwner'
				)['details'];
			}
			setData(propertyDetails);
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		if (params.id) {
			getPropertyDetails(params.id, handleFetchPropertyDetails);
		}
	}, [params.id, getPropertyDetails]);

	const filterTypes = (property) => {
		switch (property.sale_type) {
			case 'flat':
			case 'independenthouse':
				return (
					<ResaleApartment
						pType={params.pType}
						initialValues={property}
					/>
				);
			case 'land':
				return <ResaleLand initialValues={property} />;

			default:
				break;
		}
	};

	const filterRentTypes = (property) => {
		switch (property.type) {
			case 'flat':
			case 'independenthouse':
				return (
					<RentApartment
						pType={params.pType}
						initialValues={property}
					/>
				);
			case 'hostel':
			case 'pg':
				return (
					<RentHostel pType={params.pType} initialValues={property} />
				);

			default:
				break;
		}
	};

	const filterFor = (property) => {
		switch (property.for) {
			case 'sale':
				return filterTypes(property);
			case 'rent':
				return filterRentTypes(property);

			default:
				break;
		}
	};
	return (
		<Box>
			<AppBar />
			<Box
				mt="5rem"
				mb="5rem"
				width="100%"
				display="flex"
				justifyContent="center"
			>
				{propertyDetailsLoading && (
					<Box className={classes.wrapper}>{<EditSkeleton />}</Box>
				)}
				{asyncError && <ErrorCard message={asyncError} />}
				{data && (
					<Paper className={classes.wrapper}>{filterFor(data)}</Paper>
				)}
			</Box>
			<Footer />
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	propertyDetailsLoading: selectGetPropertyDetailsLoading,
});

const mapDispatchToProps = (dispatch) => ({
	getPropertyDetails: (id, callback) =>
		dispatch(getPropertyDetails({ id, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
