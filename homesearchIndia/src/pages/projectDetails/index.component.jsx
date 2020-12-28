import AppBar from '../../components/appBar/appBar.component';
import { Box } from '@material-ui/core';
import ErrorCard from '../../components/errorCard/errorCard.component';
import Footer from '../../components/footer/footer.component';
import ProjectApartment from './projectApartment.page';
import React from 'react';
import Skeleton from '../../components/propertyDetailsSkeleton/propertyDetailsSkeleton.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getProjectDetails } from '../../redux/property/property.actions';
import { selectGetProjectDetailsLoading } from '../../redux/property/property.selectors';
import useStyles from './propertyDetails.style';

// import ProjectLand from '../propertyDetails/projectLand.page';
// import RentApartment from '../propertyDetails/rentApartment.page';
// import RentHostel from '../propertyDetails/rentHostel.page';
// import RentLand from '../rentLand/rentLand.page';
// import RentVilla from '../rentVilla/rentVilla.page';
// import ResaleApartment from '../propertyDetails/propertyDetails.page';

const DetailsPage = ({
	match: {
		params: { id },
	},
	projectDetailsLoading,
	getProjectDetails,
}) => {
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState(null);
	const [project, setProject] = React.useState(null);
	const [properties, setProperties] = React.useState(null);
	const [info, setInfo] = React.useState(null);
	const handleFetchProjectDetails = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			setProject(data.project);
			setProperties(data.properties);
			setInfo(data.projectInfo);
		} else {
			setAsyncError(data);
			setProject(null);
			setProperties(null);
			setInfo(null);
		}
	};

	React.useEffect(() => {
		getProjectDetails(id, handleFetchProjectDetails);
	}, [id, getProjectDetails]);
	return (
		<div className={classes.pageWrapper}>
			<AppBar />
			<Box className={classes.detailsWrapper}>
				{asyncError && <ErrorCard message={asyncError} />}
				{projectDetailsLoading ? (
					<Box>
						<Skeleton />
					</Box>
				) : (
					project &&
					properties &&
					properties.length &&
					info &&
					info.length && (
						<ProjectApartment
							project={project}
							properties={properties}
							info={info[0]}
						/>
					)
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
	projectDetailsLoading: selectGetProjectDetailsLoading,
});

const mapDispatchToProps = (dispatch) => ({
	getProjectDetails: (id, callback) =>
		dispatch(getProjectDetails({ id, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
