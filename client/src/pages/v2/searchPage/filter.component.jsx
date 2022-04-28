import { AppBar, Box, IconButton, Menu } from '@material-ui/core';
import {
	capitalizeFirstLetter,
	getBrandName,
} from '../../../utils/render.utils';
import { useTheme, withStyles } from '@material-ui/core/styles';

import Budget from './budget.component';
import Button from '@material-ui/core/Button';
import ChipHeader from '../../../components/v2/chipHeader/chipHeader.component';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import Locations from './locations.component';
import PropertyFilterMedium from './Filter/md';
import PropertyTypes from './propertyTypes.component';
import React from 'react';
import SortIcon from '@material-ui/icons/Sort';
import clsx from 'clsx';
import useGlobalStyles from '../../../common.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './searchPage.style';

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
	availableFor,
	setAvailableFor,
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
		if (!!typesAnchorEl) {
			setTypesAnchorEl(null);
		} else {
			setTypesAnchorEl(event.currentTarget);
		}
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
						startIcon={<SortIcon />}
					>
						Filter
					</Button>
					<Drawer
						anchor={'left'}
						open={open}
						onClose={toggleDrawer(false)}
					>
						<Box className={classes.mobileFilterWrapper}>
							<AppBar
								position="sticky"
								color="default"
								elevation={0}
							>
								<Box
									className={clsx(
										globalClasses.alignCenter,
										globalClasses.smJustifyBetween
									)}
								>
									<span>
										{capitalizeFirstLetter(
											getBrandName[
												window.location.hostname
											]
										)}
									</span>
									<IconButton
										size="small"
										onClick={toggleDrawer(false)}
									>
										<CloseIcon
											className={globalClasses.colorUtil}
										/>
									</IconButton>
								</Box>
							</AppBar>
							<ChipHeader title="Locations" />
							<Locations
								city={city}
								existingLocations={existingLocations}
								handleLocations={handleLocations}
								setLocationData={setLocationData}
							/>
							<ChipHeader title="Property Type" />
							<PropertyTypes
								pFor={pFor}
								types={types}
								setTypes={setTypes}
							/>
							<ChipHeader title="Budget Type" />
							<Budget
								pFor={pFor}
								rentItems={rentItems}
								setRentItems={setRentItems}
								otherItems={otherItems}
								setOtherItems={setOtherItems}
							/>
						</Box>
					</Drawer>
				</Box>
			) : (
				<div>
					<Box mb="1rem">
						<PropertyFilterMedium
							city={city}
							existingLocations={existingLocations}
							handleLocations={handleLocations}
							pFor={pFor}
							types={types}
							setTypes={setTypes}
							rentItems={rentItems}
							setRentItems={setRentItems}
							otherItems={otherItems}
							setOtherItems={setOtherItems}
							availableFor={availableFor}
							setAvailableFor={setAvailableFor}
						/>
					</Box>
				</div>
			)}
		</>
	);
};

export default Filter;
