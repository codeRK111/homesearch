import React from 'react';
import { Box, Paper, Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchProjectDetails } from '../../redux/project/project.action';
import { selectFetchProjectDetailsLoading } from '../../redux/project/project.selector';

import ProjectInfo from './projectInfo.component';
import Flat from './projectFlat.component';
import IndependentHouse from './projectIndependentHouse.component';
import Land from './projectLand.component';
import { initialProjectDetails } from './projectInfo.constant';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const EditProject = ({
	match: { params },
	fetchProjectDetails,
	fetchProjectDetailsLoading,
}) => {
	// Constants
	const classes = useStyles();

	// State Hooks
	const [asyncError, setAsyncError] = React.useState(null);
	const [projectDetails, setProjectDetails] = React.useState(
		initialProjectDetails
	);
	const [propertyDetails, setPropertyDetails] = React.useState([]);
	// API Response handler
	const handleFetchProjects = (status, responseData) => {
		if (status === 'success') {
			setAsyncError(null);
			setProjectDetails(responseData.project);
			setPropertyDetails(responseData.properties);
			console.log(responseData);
		} else {
			setAsyncError(responseData);
		}
	};
	// Hooks
	React.useEffect(() => {
		const id = params.id;
		if (id) {
			fetchProjectDetails(handleFetchProjects, id);
		}
	}, [params.id]);

	// views
	const renderProperties = (property) => {
		switch (property.type) {
			case 'flat':
				return <Flat initialValue={property} id={property.id} />;
				break;
			case 'independenthouse':
				return (
					<IndependentHouse
						initialValue={property}
						id={property.id}
					/>
				);
				break;
			case 'land':
				return <Land initialValue={property} id={property.id} />;
				break;

			default:
				break;
		}
	};
	return (
		<Box p="1rem">
			<Backdrop
				className={classes.backdrop}
				open={fetchProjectDetailsLoading}
				// onClick={handleClose}
			>
				<CircularProgress color="secondary" />
			</Backdrop>
			<h3>Edit project</h3>
			<Paper>
				<Box p="1rem">
					<p className="color-red">{asyncError}</p>
					{projectDetails && (
						<ProjectInfo
							initialValue={projectDetails}
							id={params.id}
						/>
					)}
				</Box>
			</Paper>
			{propertyDetails.map((c) => (
				<Box mt="1rem" key={c.id}>
					<Paper>
						<Box p="1rem">{renderProperties(c)}</Box>
					</Paper>
				</Box>
			))}
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	fetchProjectDetailsLoading: selectFetchProjectDetailsLoading,
});

const mapActionToProps = (dispatch) => ({
	fetchProjectDetails: (callback, projectId) =>
		dispatch(fetchProjectDetails({ callback, projectId })),
});

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(EditProject));
