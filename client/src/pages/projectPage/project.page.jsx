import React from 'react';
import AppBar from '../../components/appBar/appBar.component';
import { useStyles } from './project.style';
import axios from 'axios';
import { apiUrl } from '../../utils/render.utils';
import ErrorCard from '../../components/errorCard/errorCard.component';
import BackDrop from '../../components/backdrop/backdrop.component';
import useGlobalStyles from '../../common.style';

const ProjectPage = ({
	match: {
		params: { projectId },
	},
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	let cancelToken;

	// States
	const [asyncState, setAsyncState] = React.useState({
		error: null,
		loading: false,
	});
	const [data, setData] = React.useState({
		project: null,
		properties: [],
	});

	React.useEffect(() => {
		(async () => {
			try {
				setAsyncState({
					error: null,
					loading: true,
				});
				cancelToken = axios.CancelToken.source();
				const res = await axios.get(
					apiUrl(`/projects/get-details-by-slug/${projectId}`),
					{
						cancelToken: cancelToken.token,
					}
				);
				setData(res.data.data);
				setAsyncState({
					error: null,
					loading: false,
				});
			} catch (error) {
				if (error.response) {
					setAsyncState({
						error: error.response.data.message,
						loading: false,
					});
				} else {
					setAsyncState({
						error:
							'We are having some issues, please try again later',
						loading: false,
					});
				}
			}
		})();

		return () => {
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		};
	}, [projectId]);
	return (
		<div>
			<AppBar />
			<BackDrop open={asyncState.loading} />
			{/* Page Wrapper  */}
			<div className={classes.wrapper}>
				{!!asyncState.error && <ErrorCard message={asyncState.error} />}
				{!!data.project && (
					<div>
						<h1 className={globalClasses.flexCenter}>
							{data.project.title}
						</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectPage;
