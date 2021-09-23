import { Box, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { Blog } from '../../model/blog.interface';
import BlogsTable from '../../components/Table/blogs';
import { ListFilter } from '../../model/apiResponse.interface';
import { PageWrapper } from '../../components/UI/Container';
import TablePagination from '../../components/Table/pagination';
import { asyncFetchBlogs } from '../../API/blog';

const BlogsPage = () => {
	// State
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<{
		totalDocs: number;
		blogs: Blog[];
	}>({
		totalDocs: 0,
		blogs: [],
	});

	// Callback
	const handlePage = (
		event: React.ChangeEvent<unknown>,
		pageNumber: number
	) => {
		setPage(pageNumber);
	};

	// Fetch leads
	const fetchLeads = useCallback(async () => {
		try {
			setLoading(true);
			const filter: ListFilter = { page, limit };

			const resp = await asyncFetchBlogs(filter);
			setData(resp);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setData({
				totalDocs: 0,
				blogs: [],
			});
			setLoading(false);
		}
	}, [page, limit]);
	useEffect(() => {
		setPage(1);
	}, [limit]);
	useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);
	return (
		<PageWrapper>
			<Typography variant="h5">Blogs</Typography>
			<Box mt="2rem">
				<BlogsTable loading={loading} blogs={data.blogs} />
				<TablePagination
					limit={limit}
					setLimit={setLimit}
					page={page}
					setPage={handlePage}
					totalDocs={data.totalDocs}
				/>
			</Box>
		</PageWrapper>
	);
};

export default BlogsPage;
