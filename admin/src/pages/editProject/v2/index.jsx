import React, { useCallback } from 'react';

import EditProjectInfo from './information';
import ErrorCard from '../../../components/errorCard';
import LoaderBackdrop from '../../../components/backdrop';
import axios from 'axios';
import { getAddProjectPageInfo } from '../../../utils/asyncFunctions';
import { getProject } from '../../../utils/asyncProject';
import useStyles from './style';

const EditProject = ({
	match: {
		params: { id },
	},
}) => {
	const classes = useStyles();
	const cancelTokenFetchProject = React.useRef(undefined);
	const cancelToken = React.useRef(undefined);
	const [loading, setLoading] = React.useState(false);
	const [resourcesLoading, setResourcesLoading] = React.useState(false);
	const [fetchError, setFetchError] = React.useState(null);
	const [projectInfo, setProjectInfo] = React.useState(null);
	const [resources, setResources] = React.useState(null);

	const fetchProject = useCallback(() => {
		cancelTokenFetchProject.current = axios.CancelToken.source();
		getProject(id, cancelTokenFetchProject.current, setLoading)
			.then((data) => {
				setProjectInfo(data.project);
				setFetchError(null);
			})
			.catch((error) => {
				setFetchError(error);
			});
	}, [id]);

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

	React.useEffect(() => {
		fetchProject();
	}, [id, fetchProject]);
	React.useEffect(() => {
		fetchPageDetails();
	}, [id, fetchPageDetails]);
	return (
		<div className={classes.wrapper}>
			<LoaderBackdrop open={loading || resourcesLoading} />
			<h1>Edit Project</h1>
			{fetchError && <ErrorCard error={fetchError} />}
			{!!projectInfo && resources && (
				<EditProjectInfo
					resources={resources}
					projectType={projectInfo.projectType}
					projectData={projectInfo}
					fetchProject={fetchProject}
				/>
			)}
		</div>
	);
};

export default EditProject;
