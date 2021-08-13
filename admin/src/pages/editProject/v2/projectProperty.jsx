import { Box, Typography } from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import { getProject, updateProjectProperty } from '../../../utils/asyncProject';

import AddPhaseButton from './addPhase.component';
import AddPropertyUnit from '../../../components/addProjectUnit';
import ErrorCard from '../../../components/errorCard';
import LoaderBackdrop from '../../../components/backdrop';
import ProjectPhases from './phases.component';
import UpdateProjectUnitDialog from '../../../components/updateProjectUnit';
import axios from 'axios';
import { getAddProjectPageInfo } from '../../../utils/asyncFunctions';
import { renderPropertyTypes } from '../../../utils/render.utils';
import useStyles from '../../addProject/addProject.style';

const UpdateProjectProperty = ({
	match: {
		params: { pId, pType },
	},
}) => {
	// Styles
	const classes = useStyles();

	// Cancel Token
	const cancelTokenFetchProject = useRef(undefined);
	const cancelToken = useRef(undefined);
	const cancelTokenChangeStatus = useRef(undefined);

	// UI
	const [fetchError, setFetchError] = useState(null);
	const [open, setOpen] = React.useState(false);
	const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);

	// Data
	const [project, setProject] = useState(null);
	const [properties, setProperties] = useState([]);
	const [selectedTower, setSelectedTower] = React.useState(null);
	const [property, setProperty] = React.useState(null);
	const [resources, setResources] = React.useState(null);

	// Loading State
	const [loading, setLoading] = useState(false);
	const [resourcesLoading, setResourcesLoading] = useState(false);
	const [changeStatusLoading, setChangeStatusLoading] = React.useState(false);

	const toggleDialog = (status) => () => {
		setOpen(status);
	};
	const toggleUpdateDialog = (status) => () => {
		setUpdateDialogOpen(status);
	};

	const onAddClick = (towerDetails) => () => {
		setSelectedTower(towerDetails);
		toggleDialog(true)();
	};
	const onEditClick = (propertyDetails) => () => {
		setProperty(propertyDetails);
		toggleUpdateDialog(true)();
	};

	const fetchProject = useCallback(() => {
		cancelTokenFetchProject.current = axios.CancelToken.source();
		getProject(pId, cancelTokenFetchProject.current, setLoading)
			.then((data) => {
				setProject(data.project);
				setProperties(data.properties);
				setFetchError(null);
			})
			.catch((error) => {
				setFetchError(error);
			});
	}, [pId]);

	const fetchPageDetails = useCallback(() => {
		cancelToken.current = axios.CancelToken.source();
		getAddProjectPageInfo(
			cancelToken.current,
			setResourcesLoading,
			setFetchError
		).then((data) => {
			setResources(data);
			console.log({ data });
		});
	}, []);

	const onStatusChange = (details) => () => {
		const formData = new FormData();
		if (details.status === 'active') {
			formData.append('status', 'expired');
		} else {
			formData.append('status', 'active');
		}
		cancelTokenChangeStatus.current = axios.CancelToken.source();
		updateProjectProperty(
			details.id,
			formData,
			cancelTokenChangeStatus.current,
			setChangeStatusLoading
		)
			.then((resp) => {
				fetchProject();
			})
			.catch((error) => {
				console.log(error);
				// setAddProjectError(error);
			});
	};

	// Effects
	React.useEffect(() => {
		fetchProject();
	}, [pId, fetchProject]);

	React.useEffect(() => {
		fetchPageDetails();
	}, [pId, fetchPageDetails]);

	return (
		<div className={classes.wrapper}>
			<LoaderBackdrop
				open={loading || resourcesLoading || changeStatusLoading}
			/>
			<h1>Manage Project Property</h1>
			{project && (
				<Box mb="1rem">
					<Typography variant="caption" display="block" gutterBottom>
						Project Name - <b>{project.title}</b>
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						Project Type -{' '}
						<b>{renderPropertyTypes(project.projectType)}</b>
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						Phases - <b>{project.phases.length}</b>
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						Towers - <b>{project.towerNames.length}</b>
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						Properties - <b>{properties.length}</b>
					</Typography>
				</Box>
			)}
			{fetchError && <ErrorCard error={fetchError} />}
			{!!project && !!resources && (
				<>
					<AddPropertyUnit
						open={open}
						handleClose={toggleDialog(false)}
						projectType={pType}
						resources={resources}
						project={pId}
						tower={selectedTower}
						fetchProject={fetchProject}
					/>
					{!!property && (
						<UpdateProjectUnitDialog
							open={updateDialogOpen}
							handleClose={toggleUpdateDialog(false)}
							projectType={pType}
							resources={resources}
							project={pId}
							tower={selectedTower}
							fetchProject={fetchProject}
							state={property}
						/>
					)}
					{project && (
						<Box mb="2rem">
							<AddPhaseButton
								project={project}
								fetchProject={fetchProject}
							/>
						</Box>
					)}

					{project && (
						<ProjectPhases
							project={project}
							fetchProject={fetchProject}
							properties={properties}
							onAddClick={onAddClick}
							onEditClick={onEditClick}
							onStatusChange={onStatusChange}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default UpdateProjectProperty;
