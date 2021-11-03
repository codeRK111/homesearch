import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import BlogCard from '../blogCard/blogCard.component';
import SimilarPropertiesSkeleton from '../../skeleton/similarProperties.component';
import axios from 'axios';
import { getBlogs } from '../../../utils/asyncBlog';

const RecentBlogs = () => {
	//  State
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	// Refs

	useEffect(() => {
		const source = axios.CancelToken.source();
		(async () => {
			try {
				const resp = await getBlogs(source, setLoading, {
					page: 1,
					limit: 3,
				});
				setBlogs(resp);
				setError(null);
			} catch (error) {
				setError(error);
			}
		})();
		return () => {
			if (source) {
				source.cancel();
			}
		};
	}, []);
	return (
		<div>
			{error ? (
				<Typography variant="h6" align="center" color="error">
					{error}
				</Typography>
			) : loading ? (
				<SimilarPropertiesSkeleton />
			) : (
				<Grid container spacing={5}>
					{blogs.map((c) => (
						<Grid item xs={12} md={4}>
							<BlogCard key={c.id} data={c} />
						</Grid>
					))}
				</Grid>
			)}
		</div>
	);
};

export default RecentBlogs;
