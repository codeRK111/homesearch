import { Box, Grid, Paper } from '@material-ui/core';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from './searchCardSkeleton.styles';

const SearchCardSkeleton = () => {
	const classes = useStyles();
	return (
		<Paper className={classes.wrapper} elevation={0}>
			<Grid container spacing={1} className={classes.fullArea}>
				<Grid item xs={8} className={classes.fullArea}>
					<Skeleton
						variant="rect"
						width={'100%'}
						height={'170px'}
						animation="wave"
					/>
				</Grid>
				<Grid item xs={4} className={classes.fullArea}>
					<Grid container spacing={1} className={classes.fullArea}>
						<Grid item xs={6}>
							<Skeleton
								variant="rect"
								width={'100%'}
								height={'30px'}
								animation="wave"
							/>
						</Grid>
						<Grid item xs={6}>
							<Skeleton
								variant="rect"
								width={'100%'}
								height={'30px'}
								animation="wave"
							/>
						</Grid>
						<Grid item xs={12}>
							<Box mt="0.1rem" mb="0.1rem">
								<Skeleton
									variant="rect"
									width={'100%'}
									height={'90px'}
									animation="wave"
								/>
							</Box>
						</Grid>
						<Grid item xs={8}>
							<Skeleton
								variant="rect"
								width={'100%'}
								height={'30px'}
								animation="wave"
							/>
						</Grid>
						<Grid item xs={2}>
							<Skeleton
								variant="rect"
								width={'100%'}
								height={'30px'}
								animation="wave"
							/>
						</Grid>
						<Grid item xs={2}>
							<Skeleton
								variant="rect"
								width={'100%'}
								height={'30px'}
								animation="wave"
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default SearchCardSkeleton;
