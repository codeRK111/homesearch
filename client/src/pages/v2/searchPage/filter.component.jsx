import { Box, Grid } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './searchPage.style';
import { useTheme } from '@material-ui/core/styles';

const Filter = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setOpen(open);
	};
	return (
		<>
			{!matches ? (
				<Box>
					<Button
						onClick={toggleDrawer(true)}
						variant="contained"
						fullWidth
					>
						Filter
					</Button>
					<Drawer
						anchor={'top'}
						open={open}
						onClose={toggleDrawer(false)}
					>
						<Box p="1rem">
							<Grid container spacing={1}>
								<Grid
									item
									xs={12}
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
									xs={12}
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
									xs={12}
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
									xs={12}
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
									xs={12}
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
									xs={12}
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
									xs={12}
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
									xs={12}
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
						</Box>
					</Drawer>
				</Box>
			) : (
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
			)}
		</>
	);
};

export default Filter;
