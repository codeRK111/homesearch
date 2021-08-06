import React from 'react';
import axios from 'axios';
import { getProject } from '../../../utils/asyncProject';
import useStyles from './style';

const EditProject = ({ match: { params: id } }) => {
	const classes = useStyles();
	const cancelTokenFetchProject = React.useRef(undefined);
	const [loading, setLoading] = React.useState(false);
	const [projectInfo, setProjectInfo] = React.useState(null);

	const fetchProject = () => {
		if (id) {
			cancelTokenFetchProject.current = axios.CancelToken.source();
			getProject(id, cancelTokenFetchProject.current, setLoading).then(
				(data) => {
					setProjectInfo(data.project);
					console.log({ data });
				}
			);
		}
	};

	React.useEffect(() => {
		fetchProject();
	}, [id]);
	return (
		<div className={classes.wrapper}>
			<h1>Edit Project</h1>
		</div>
	);
};

export default EditProject;
