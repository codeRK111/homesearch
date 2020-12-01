import AppBar from '../../components/appBar/appBar.component';
import { Box } from '@material-ui/core';
import ErrorCard from '../../components/errorCard/errorCard.component';
import Footer from '../../components/footer/footer.component';
import ProjectApartment from './projectPropertyApartment.page';
import React from 'react';
import Skeleton from '../../components/propertyDetailsSkeleton/propertyDetailsSkeleton.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getProjectPropertyDetails } from '../../redux/property/property.actions';
import { selectGetProjectPropertyDetailsLoading } from '../../redux/property/property.selectors';
import useStyles from './propertyDetails.style';

const DetailsPage = ({
	match: {
		params: { id },
	},
	projectPropertyDetailsLoading,
	getProjectPropertyDetails,
}) => {
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState(null);
	const [property, setProperty] = React.useState(null);
	const handleFetchProjectDetails = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			setProperty(data);
		} else {
			setAsyncError(data);
			setProperty(null);
		}
	};

	React.useEffect(() => {
		getProjectPropertyDetails(id, handleFetchProjectDetails);
	}, [id, getProjectPropertyDetails]);
	return (
		<div className={classes.pageWrapper}>
			<AppBar />
			<Box className={classes.detailsWrapper}>
				{asyncError && <ErrorCard message={asyncError} />}
				{projectPropertyDetailsLoading ? (
					<Box>
						<Skeleton />
					</Box>
				) : (
					property && <ProjectApartment property={property} />
				)}
			</Box>
			<Footer />
			{/* {propertyFor === 'sale' && type === 'apartment' && (
				<ResaleApartment />
			)}
			{propertyFor === 'rent' && type === 'apartment' && (
				<RentApartment />
			)}
			{propertyFor === 'rent' && type === 'villa' && (
				<RentApartment independent />
			)}
			{propertyFor === 'rent' && type === 'hostel' && <RentHostel />}
			{propertyFor === 'rent' && type === 'pg' && <RentHostel pg />}
			{propertyFor === 'sale' && type === 'villa' && <RentVilla />}
			{propertyFor === 'sale' && type === 'land' && <RentLand />}
			{propertyFor === 'project' && type === 'apartment' && (
				<ProjectApartment />
			)}
			{propertyFor === 'project' && type === 'land' && <ProjectLand />} */}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	projectPropertyDetailsLoading: selectGetProjectPropertyDetailsLoading,
});

const mapDispatchToProps = (dispatch) => ({
	getProjectPropertyDetails: (id, callback) =>
		dispatch(getProjectPropertyDetails({ id, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
