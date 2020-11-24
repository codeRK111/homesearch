import { Box, Grid, Paper } from '@material-ui/core';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SearchCardSkeleton = () => {
	return (
		<Box width={'100%'}>
			<Paper>
				{Array.from(Array(3).keys()).map((c) => (
					<Box mt="1rem">
						<Skeleton
							variant="rect"
							width={'100%'}
							height={'30px'}
							animation="wave"
						/>
					</Box>
				))}
			</Paper>
		</Box>
	);
};

export default SearchCardSkeleton;
