import React, { useCallback, useEffect, useRef, useState } from 'react';

import ErrorCard from '../../components/errorCard';
import JoinRequestTable from '../../components/tables/requests.component';
import TablePagination from '../builders/pagination.component';
import axios from 'axios';
import { getJoinRequests } from '../../utils/asyncRequest';
import useStyles from './joinRequest.style';
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
		requests: [],
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

			const resp = await getJoinRequests(
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

	/* Show error if type is other than builder or agent */
	useEffect(() => {
		if (type !== 'builder' && type !== 'agent') {
			setError('Invalid join type');
		} else {
			setError(null);
		}
	}, [type, setError]);

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
			<h1>
				{type === 'builder' ? 'Builder Requests' : 'Realtors Requests'}
			</h1>
			{error && <ErrorCard error={error} />}
			{!loading && (
				<p>
					<b>{data.totalDocs}</b> request found
				</p>
			)}
			<JoinRequestTable loading={loading} requests={data.requests} />
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
