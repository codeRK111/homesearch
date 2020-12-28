import { Box, Grid, Paper } from '@material-ui/core';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const arr = Array.from(Array(12).keys());

const PropertyDetailsSkeleton = () => {
	return (
		<Paper>
			<Skeleton variant="rect" height={'10vh'} />
			<Box mt="1rem">
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<Skeleton variant="rect" height={'30vh'} />
					</Grid>
					<Grid item xs={12} md={8}>
						<Grid container spacing={2}>
							{arr.map((c) => (
								<Grid item xs={6} md={3} key={c}>
									<Box display="flex" alignItems="center">
										<Skeleton
											variant="circle"
											height={50}
											width={50}
										/>
										<Box ml="0.5rem" width="100%">
											<Skeleton
												variant="rect"
												height={30}
												width={'100%'}
											/>
										</Box>
									</Box>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
				<Box mt="1rem">
					<Skeleton variant="rect" height={'10vh'} />
				</Box>
				<Box mt="1rem">
					<Skeleton variant="rect" height={'10vh'} />
				</Box>
				<Box mt="1rem">
					<Skeleton variant="rect" height={'20vh'} />
				</Box>
			</Box>
		</Paper>
	);
};

export default PropertyDetailsSkeleton;
