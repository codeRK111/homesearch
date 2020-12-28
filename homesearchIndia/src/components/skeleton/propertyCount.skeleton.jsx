import { Box } from '@material-ui/core';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const Count = ({ count }) => {
	return (
		<Box display="flex" width="100%" justifyContent="space-between">
			{Array.from(Array(count).keys()).map((c) => (
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					width="100%"
				>
					<Skeleton variant="circle" width={80} height={80} />
					<Skeleton width="50%" />
					<Skeleton width="40%" />
					<Skeleton width="30%" />
				</Box>
			))}
		</Box>
	);
};

export default Count;
