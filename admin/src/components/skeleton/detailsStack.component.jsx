import { Box } from '@material-ui/core';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const DetailsStack = () => {
	return (
		<Box>
			<Box>
				<Skeleton variant="rect" height={'20vh'} />
			</Box>
			<Box mt="2rem">
				<Skeleton variant="rect" height={'20vh'} />
			</Box>
			<Box mt="2rem">
				<Skeleton variant="rect" height={'20vh'} />
			</Box>
		</Box>
	);
};

export default DetailsStack;
