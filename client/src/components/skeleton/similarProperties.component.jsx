import { Grid, Paper } from '@material-ui/core';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const SimilarPropertiesSkeleton = () => {
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
	return smallScreen ? (
		<Grid>
			{' '}
			<Grid item xs={12} md={3}>
				<Paper elevation={5}>
					<Skeleton variant="rect" width={'100%'} height={'20rem'} />
				</Paper>
			</Grid>
		</Grid>
	) : (
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

export default SimilarPropertiesSkeleton;
