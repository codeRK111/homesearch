import React, { useCallback, useEffect, useRef, useState } from 'react';

import ErrorCard from '../../components/errorCard';
import TablePagination from '../builders/pagination.component';
import UserQueriesTable from '../../components/tables/userQueries.component';
import axios from 'axios';
import { getUserQueries } from '../../utils/asyncQueries';
import useStyles from './agentQueries.style';
import { withAsync } from '../../hoc/withAsync';

const RequestPage = ({
	loading,
	setLoading,
	error,
	setError,
	match: {
		params: { type },
	},
}) => {
	// Style
	const style = useStyles();

	// Async Token
	const cancelToken = useRef(null);

	// State
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [data, setData] = useState({
		totalDocs: 0,
		queries: [],
	});

	// Callback
	const handlePage = (_, pageNumber) => {
		setPage(pageNumber);
	};

	// Fetch reviews
	const fetchRequests = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const filter = {
				page,
				limit,
				type,
			};

			const resp = await getUserQueries(
				filter,
				cancelToken.current,
				setLoading
			);
			setData(resp);
			setError(null);
		} catch (error) {
			setError(error);
			setData([]);
		}
	}, [page, limit, type, setError, setLoading]);

	// Effects

	/* Reset page after filter change */
	useEffect(() => {
		setPage(1);
	}, [limit]);

	/* Fetch join requests */
	useEffect(() => {
		fetchRequests();

		// Cancel request on unmount
		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchRequests]);
	return (
		<div className={style.wrapper}>
			<h1>User Queries</h1>
			{error && <ErrorCard error={error} />}
			{!loading && (
				<p>
					<b>{data.totalDocs}</b> queries found
				</p>
			)}
			<UserQueriesTable loading={loading} queries={data.queries} />
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

export default withAsync(RequestPage);
