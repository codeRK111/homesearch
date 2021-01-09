import { Box } from '@material-ui/core';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const DetailsStack = () => {
	return (
		<Box>
			<Box>
				<Skeleton variant="rect" height={'40px'} width="400px" />
			</Box>
			<Box mt="2rem">
				<Skeleton variant="rect" height={'40px'} width="400px" />
			</Box>
			<Box mt="2rem">
				<Skeleton variant="rect" height={'40px'} width="400px" />
			</Box>
		</Box>
	);
};

export default DetailsStack;
