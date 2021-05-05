import BlogCard from '../blogCard/blogCard.component';
import { Grid } from '@material-ui/core';
import React from 'react';

const RecentBlogs = () => {
	return (
		<div>
			<Grid container spacing={5}>
				{Array.from({ length: 3 }, (_, idx) => `${++idx}`).map((c) => (
					<Grid item xs={12} md={4}>
						<BlogCard key={c} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default RecentBlogs;
