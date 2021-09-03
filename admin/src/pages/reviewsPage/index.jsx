import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box } from '@material-ui/core';
import Filter from './filter.component';
import ReviewsTable from '../../components/tables/reviews.component';
import TablePagination from '../builders/pagination.component';
import axios from 'axios';
import { getReviews } from '../../utils/asyncReview';
import useGlobalStyles from '../../common.style';
import useStyles from './reviews.style';
import { withAsync } from '../../hoc/withAsync';

const ReviewsPage = ({
	loading,
	error,
	setLoading,
	setError,
	match: {
		params: { pFor },
	},
}) => {
	// Style
	const style = useStyles();
	const globalStyle = useGlobalStyles();

	// Cancel Token
	const cancelToken = useRef(null);

	// State
	const [page, setPage] = useState(1);
	const [project, setProject] = useState(null);
	const [property, setProperty] = useState(null);
	const [limit, setLimit] = useState(10);
	const [propertyItemType, setPropertyItemType] = useState('');
	const [status, setStatus] = useState('');
	const [top, setTop] = useState(false);
	const [data, setData] = useState({
		totalDocs: 0,
		reviews: [],
	});

	useEffect(() => {
		if (pFor !== 'project') {
			setProject(null);
		} else {
			setProperty(null);
		}
	}, [pFor]);
	useEffect(() => {
		setPage(1);
	}, [limit, propertyItemType, status, top]);

	// Fetch reviews
	const fetchReviews = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const filter = {
				page,
				limit,
			};
			if (pFor) {
				filter.pFor = pFor;
			}
			if (project) {
				filter.project = project.id;
			}
			if (property) {
				filter.property = property.id;
			}
			if (propertyItemType) {
				filter.propertyItemType = propertyItemType;
			}
			if (status) {
				filter.status = status;
			}

			filter.top = top;

			const resp = await getReviews(
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
	}, [
		project,
		property,
		page,
		limit,
		pFor,
		propertyItemType,
		status,
		top,
		setError,
		setLoading,
	]);

	// Callback
	const handlePage = (_, pageNumber) => {
		setPage(pageNumber);
	};

	useEffect(() => {
		fetchReviews();

		// Cancel request on unmount
		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchReviews]);

	return (
		<div className={style.wrapper}>
			<h1>Comments</h1>
			{error && <p className={globalStyle.errorColor}>{error}</p>}
			<Filter
				pFor={pFor}
				project={project}
				setProject={setProject}
				property={property}
				setProperty={setProperty}
				propertyItemType={propertyItemType}
				setPropertyItemType={setPropertyItemType}
				status={status}
				setStatus={setStatus}
				top={top}
				setTop={setTop}
			/>
			{!loading && (
				<p>
					<b>{data.totalDocs}</b> comments found
				</p>
			)}
			<Box mt="1rem">
				<ReviewsTable loading={loading} reviews={data.reviews} />
			</Box>
			<TablePagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				setPage={handlePage}
				totalDocs={data.totalDocs}
			/>
			{/* <pre>{JSON.stringify(data.reviews, null, 2)}</pre> */}
		</div>
	);
};

export default withAsync(ReviewsPage);
