import { Box, Grid } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useStyles from './searchPage.style';

const Filter = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<div className={classes.filterWrapper}>
			<Grid container spacing={1}>
				<Grid
					item
					xs={1}
					className={clsx(
						globalClasses.flexCenter,
						globalClasses.colorPrimary,
						globalClasses.bold,
						classes.filter
					)}
				>
					<span>BHK Type </span>
					<ExpandMoreIcon />
				</Grid>
				<Grid
					item
					xs={1}
					className={clsx(
						globalClasses.flexCenter,
						globalClasses.colorPrimary,
						globalClasses.bold,
						classes.filter
					)}
				>
					<span>₹0 - 2 Cr </span>
					<ExpandMoreIcon />
				</Grid>
				<Grid
					item
					xs={1}
					className={clsx(
						globalClasses.flexCenter,
						globalClasses.colorPrimary,
						globalClasses.bold,
						classes.filter
					)}
				>
					<span>Listed By </span>
					<ExpandMoreIcon />
				</Grid>
				<Grid
					item
					xs={2}
					className={clsx(
						globalClasses.flexCenter,
						globalClasses.colorPrimary,
						globalClasses.bold,
						classes.filter
					)}
				>
					<span>Property Type </span>
					<ExpandMoreIcon />
				</Grid>
				<Grid
					item
					xs={2}
					className={clsx(
						globalClasses.flexCenter,
						globalClasses.colorPrimary,
						globalClasses.bold,
						classes.filter
					)}
				>
					<span>Delivery Status</span>
					<ExpandMoreIcon />
				</Grid>
				<Grid
					item
					xs={1}
					className={clsx(
						globalClasses.flexCenter,
						globalClasses.colorPrimary,
						globalClasses.bold,
						classes.filter
					)}
				>
					<span>Posted By</span>
					<ExpandMoreIcon />
				</Grid>
				<Grid
					item
					xs={2}
					className={clsx(
						globalClasses.flexCenter,
						globalClasses.colorPrimary,
						globalClasses.bold,
						classes.filter
					)}
				>
					<span>More Filters</span>
					<ExpandMoreIcon />
				</Grid>
				<Grid
					item
					xs={1}
					className={clsx(
						globalClasses.flexCenter,
						globalClasses.colorPrimary,
						globalClasses.bold,
						classes.filter
					)}
				>
					<span>Short By</span>
					<ExpandMoreIcon />
				</Grid>
			</Grid>
		</div>
	);
};

export default Filter;
