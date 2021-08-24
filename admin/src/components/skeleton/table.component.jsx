import { Box } from '@material-ui/core';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const TableSkeleton = () => {
	return (
		<Box>
			<Skeleton variant="rect" width={'100%'} height={50} />
			<Box mt="1rem">
				<Skeleton variant="rect" width={'100%'} height={300} />
			</Box>
		</Box>
	);
};

export default TableSkeleton;
