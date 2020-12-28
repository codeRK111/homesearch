import { Box, Grid } from '@material-ui/core';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SearchCardSkeleton = () => {
	return (
		<Box width={'100%'}>
			<Grid container spacing={3}>
				{Array.from(Array(12).keys()).map((c) => (
					<Grid item xs={12} md={6} key={c}>
						<Skeleton
							variant="rect"
							width={'100%'}
							height={'50px'}
							animation="wave"
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default SearchCardSkeleton;
