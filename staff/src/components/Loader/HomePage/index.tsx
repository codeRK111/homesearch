import { Grid } from '@material-ui/core';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

interface IFetchCountLoader {
	count: number;
}

export const FetchCountLoader = ({ count }: IFetchCountLoader) => {
	return (
		<Grid container spacing={3} justifyContent="center">
			{Array.from({ length: count }, (_, i) => i++).map((_, i) => (
				<Grid item xs={12} md={2} key={i}>
					<Skeleton variant="rect" width={'100%'} height={118} />
				</Grid>
			))}
		</Grid>
	);
};
export const FetchTargetLoader = ({ count }: IFetchCountLoader) => {
	return (
		<Grid container spacing={3} justifyContent="space-between">
			{Array.from({ length: count }, (_, i) => i++).map((_, i) => (
				<Grid item xs={12} md={3} key={i}>
					<Skeleton variant="rect" width={'100%'} height={118} />
				</Grid>
			))}
		</Grid>
	);
};
