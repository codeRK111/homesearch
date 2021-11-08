import { Grid } from '@material-ui/core';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadSubscriptionSkeleton = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Skeleton variant="rect" width="50%" height="3rem" />
			</Grid>
			<Grid item xs={12}>
				<Skeleton variant="rect" width="100%" height="9rem" />
			</Grid>
			<Grid item xs={12}>
				<Skeleton variant="rect" width="5rem" height="2rem" />
			</Grid>
		</Grid>
	);
};

export default LoadSubscriptionSkeleton;
