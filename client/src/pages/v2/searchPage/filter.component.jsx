import { Box, Grid, IconButton, Menu } from '@material-ui/core';

import Budget from './budget.component';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Locations from './locations.component';
import PropertyTypes from './propertyTypes.component';
import React from 'react';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './searchPage.style';
import { useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({
	paper: {
		background: '#e3e3e3',
		// boxShadow: '20px 20px 35px #9f9f9f,-20px -20px 35px #ffffff',
		borderRadius: 20,
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'left',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'left',
		}}
		{...props}
	/>
));

const Filter = ({
	city,
	existingLocations,
	handleLocations,
	setLocationData,
	pFor,
	types,
	setTypes,
	rentItems,
	setRentItems,
	otherItems,
	setOtherItems,
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));
	const [open, setOpen] = React.useState(false);
	const [locationAnchorEl, setLocationAnchorEl] = React.useState(null);
	const [typesAnchorEl, setTypesAnchorEl] = React.useState(null);
	const [budgetAnchorEl, setBudgetAnchorEl] = React.useState(null);
	const handleBudgetClick = (event) => {
		setBudgetAnchorEl(event.currentTarget);
	};

	const handleBudgetClose = () => {
		setBudgetAnchorEl(null);
	};
	const handleTypesClick = (event) => {
		setTypesAnchorEl(event.currentTarget);
	};

	const handleTypesClose = () => {
		setTypesAnchorEl(null);
	};
	const handleLocationClick = (event) => {
		setLocationAnchorEl(event.currentTarget);
	};

	const handleLocationClose = () => {
		setLocationAnchorEl(null);
	};

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
								<Grid item xs={12}>
									<Box
										className={clsx(
											globalClasses.flexCenter,
											globalClasses.colorPrimary,
											globalClasses.bold,
											classes.filter
										)}
									>
										<span>Locations </span>
										<ExpandMoreIcon />
									</Box>
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
				<div>
					<Grid container spacing={1}>
						<Grid item xs={2}>
							<Box
								onClick={handleLocationClick}
								className={clsx(
									globalClasses.flexCenter,
									globalClasses.colorPrimary,
									globalClasses.bold,
									classes.filter,
									globalClasses.pointer,
									classes.filterWrapper
								)}
							>
								<span>Locations </span>
								<ExpandMoreIcon />
							</Box>
							<StyledMenu
								id="customized-menu"
								anchorEl={locationAnchorEl}
								keepMounted
								open={Boolean(locationAnchorEl)}
								onClose={handleLocationClose}
								elevation={5}
							>
								<Box className={globalClasses.justifyCenter}>
									<IconButton onClick={handleLocationClose}>
										<HighlightOffIcon />
									</IconButton>
								</Box>
								<Locations
									city={city}
									existingLocations={existingLocations}
									handleLocations={handleLocations}
									setLocationData={setLocationData}
								/>
							</StyledMenu>
						</Grid>
						<Grid item xs={2}>
							<Box
								onClick={handleTypesClick}
								className={clsx(
									globalClasses.flexCenter,
									globalClasses.colorPrimary,
									globalClasses.bold,
									classes.filter,
									globalClasses.pointer,
									classes.filterWrapper
								)}
							>
								<span>Property Type</span>
								<ExpandMoreIcon />
							</Box>
							<StyledMenu
								id="customized-menu"
								anchorEl={typesAnchorEl}
								keepMounted
								open={Boolean(typesAnchorEl)}
								onClose={handleTypesClick}
								elevation={5}
							>
								<Box className={globalClasses.justifyCenter}>
									<IconButton onClick={handleTypesClose}>
										<HighlightOffIcon />
									</IconButton>
								</Box>
								<PropertyTypes
									pFor={pFor}
									types={types}
									setTypes={setTypes}
								/>
							</StyledMenu>
						</Grid>
						<Grid item xs={2}>
							<Box
								onClick={handleBudgetClick}
								className={clsx(
									globalClasses.flexCenter,
									globalClasses.colorPrimary,
									globalClasses.bold,
									classes.filter,
									globalClasses.pointer,
									classes.filterWrapper
								)}
							>
								<span>Budget Type</span>
								<ExpandMoreIcon />
							</Box>
							<StyledMenu
								id="customized-menu"
								anchorEl={budgetAnchorEl}
								keepMounted
								open={Boolean(budgetAnchorEl)}
								onClose={handleBudgetClose}
								elevation={5}
							>
								<Box className={globalClasses.justifyCenter}>
									<IconButton onClick={handleBudgetClose}>
										<HighlightOffIcon />
									</IconButton>
								</Box>
								<Budget
									pFor={pFor}
									rentItems={rentItems}
									setRentItems={setRentItems}
									otherItems={otherItems}
									setOtherItems={setOtherItems}
								/>
							</StyledMenu>
						</Grid>
					</Grid>
				</div>
			)}
		</>
	);
};

export default Filter;
