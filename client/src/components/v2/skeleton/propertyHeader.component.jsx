import { Box, Grid } from '@material-ui/core';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './skeleton.style';

const PropertyHeader = () => {
	const classes = useStyles();
	const { alignCenter, justifySpaceBetween, justifyCenter } =
		useGlobalStyles();
	return (
		<div className={classes.propertyHeaderWrapper}>
			<Grid container spacing={5}>
				<Grid item xs={12} md={8}>
					<Skeleton variant="rect" className={classes.imageWrapper} />
				</Grid>
				<Grid item xs={12} md={4}>
					<Box className={clsx(alignCenter, justifySpaceBetween)}>
						<Skeleton variant="circle" width={50} height={50} />
						<Skeleton variant="rect" width={'80%'} height={50} />
					</Box>
					<Box mt="1rem" className={justifyCenter}>
						<Skeleton variant="text" width={'50%'} />
					</Box>
					<Box mt="1rem" className={justifyCenter}>
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<Skeleton
									variant="rect"
									width={'100%'}
									height={70}
								/>
							</Grid>
							<Grid item xs={6}>
								<Skeleton
									variant="rect"
									width={'100%'}
									height={70}
								/>
							</Grid>
							<Grid item xs={6}>
								<Skeleton
									variant="rect"
									width={'100%'}
									height={70}
								/>
							</Grid>
							<Grid item xs={6}>
								<Skeleton
									variant="rect"
									width={'100%'}
									height={70}
								/>
							</Grid>
						</Grid>
					</Box>
					<Box mt="1rem">
						<Skeleton variant="text" width={'30%'} />
					</Box>
					<Box mt="1rem">
						<Grid container spacing={1}>
							{Array.from(
								{ length: 8 },
								(_, idx) => `${++idx}`
							).map((c) => (
								<Grid key={c} item xs={3}>
									<Skeleton
										variant="rect"
										width={'100%'}
										height={30}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
};

export default PropertyHeader;
