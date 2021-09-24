import { Box, Grid, Paper } from '@material-ui/core';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'flex',

		boxSizing: 'border-box',
		borderRadius: 20,
		background: theme.shadowColor,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	imageWrapper: {
		height: 75,
		width: 75,
	},
	contentWrapper: {
		flexGrow: 1,
		marginLeft: '1rem',
	},
}));

const RealtorLoader = () => {
	const style = useStyles();
	const renderSkeleton = () => {
		return Array.from({ length: 2 }, (_, i) => i++).map((c, i) => (
			<Grid item xs={12} md={6} key={i}>
				<Paper
					component={Box}
					elevation={5}
					height={200}
					width="100%"
					p="1rem"
					className={style.wrapper}
				>
					<Skeleton className={style.imageWrapper} variant="circle" />
					<Skeleton
						className={style.contentWrapper}
						variant="rect"
						height="100%"
					/>
				</Paper>
			</Grid>
		));
	};
	return (
		<Grid container spacing={5}>
			{renderSkeleton()}
		</Grid>
	);
};

export default RealtorLoader;
