import React, { useCallback, useEffect, useRef, useState } from 'react';

import FilterSurvay from './filter.component';
import ProjectSurvaysTable from '../../components/tables/survays.component';
import TablePagination from '../builders/pagination.component';
import axios from 'axios';
import { getAllSurvays } from '../../utils/asyncProject';
import useStyles from './projectSurvay.style';
import { withAsync } from '../../hoc/withAsync';

const ProjectSurvey = ({ error, loading, setLoading, setError }) => {
	// Style
	const style = useStyles();

	// Cancel Token
	const cancelToken = useRef();

	// State
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState({
		totalDocs: 0,
		opinions: [],
	});
	const [project, setProject] = useState(null);
	const [user, setUser] = useState(null);

	// Callback
	const handlePage = (_, pageNumber) => {
		setPage(pageNumber);
	};

	// Fetch Opinions
	const fetchOpinions = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const filter = { page, limit };
			if (project) {
				filter.project = project.id;
			}
			if (user) {
				filter.user = user.id;
			}
			const resp = await getAllSurvays(
				filter,
				cancelToken.current,
				setLoading
			);
			setData(resp);
			setError(null);
		} catch (error) {
			setError(error);
		}
	}, [page, limit, project, user, setLoading, setError]);

	useEffect(() => {
		setPage(1);
	}, [limit, project, user]);

	useEffect(() => {
		fetchOpinions();
		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchOpinions]);

	return (
		<div className={style.wrapper}>
			<h1>Project Survay</h1>
			<FilterSurvay
				project={project}
				setProject={setProject}
				user={user}
				setUser={setUser}
			/>
			{!loading && (
				<p>
					<b>{data.totalDocs}</b> survays found
				</p>
			)}
			<ProjectSurvaysTable loading={loading} opinions={data.opinions} />
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
		</div>
	);
};

export default withAsync(ProjectSurvey);
