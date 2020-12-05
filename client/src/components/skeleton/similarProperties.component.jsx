import { Grid, Paper } from '@material-ui/core';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SimilarProperties = () => {
	return (
		<Grid container spacing={5}>
			<Grid item xs={12} md={3}>
				<Paper elevation={5}>
					<Skeleton variant="rect" width={'100%'} height={'20rem'} />
				</Paper>
			</Grid>
			<Grid item xs={12} md={3}>
				<Paper elevation={5}>
					<Skeleton variant="rect" width={'100%'} height={'20rem'} />
				</Paper>
			</Grid>
			<Grid item xs={12} md={3}>
				<Paper elevation={5}>
					<Skeleton variant="rect" width={'100%'} height={'20rem'} />
				</Paper>
			</Grid>
			<Grid item xs={12} md={3}>
				<Paper elevation={5}>
					<Skeleton variant="rect" width={'100%'} height={'20rem'} />
				</Paper>
			</Grid>
		</Grid>
	);
};

export default SimilarProperties;
