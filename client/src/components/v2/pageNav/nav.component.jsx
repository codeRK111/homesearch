import {
	Avatar,
	Box,
	CircularProgress,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import {
	selectAuthenticated,
	selectUser,
} from '../../../redux/auth/auth.selectors';
import {
	selectCurrentTab,
	selectSelectedCity,
} from '../../../redux/actionTab/actionTab.selectors';
import {
	setCurrentTab,
	setSelectedCity,
} from '../../../redux/actionTab/actionTab.actions';

import Drawer from '../drawer';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import logoIcon from '../../../assets/icons/logo.svg';
import { profile } from '../../../utils/statc';
import { searchCities } from '../../../redux/city/city.actions';
import searchIcon from '../../../assets/search.svg';
import { selectSearchCityLoading } from '../../../redux/city/city.selectors';
import { signOut } from '../../../redux/auth/auth.actions';
import { toggleLoginPopup } from '../../../redux/ui/ui.actions';
import useGlobalStyles from '../../../common.style';
import { useHistory } from 'react-router-dom';
import useStyles from './nav.style';
import { withStyles } from '@material-ui/core/styles';

const StyledMenu = withStyles({
	paper: {
		background: '#e3e3e3',
		boxShadow: '20px 20px 35px #9f9f9f,-20px -20px 35px #ffffff',
		borderRadius: 30,
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const NavBar = ({
	searchCityLoading,
	searchCities,
	currentTab,
	selectedCity,
	setCurrentTab,
	setSelectedCity,
	isAuthenticated,
	toggleLoginPopup,
	signOut,
	user,
}) => {
	const history = useHistory();
	const classes = useStyles();
	const menuParrent = React.useRef(null);
	const globalClasses = useGlobalStyles();
	const input = React.useRef(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [searchAnchorEl, setSearchAnchorEl] = React.useState(null);
	const [cities, setCities] = React.useState([]);
	const [userTypedCity, setUserTypedCity] = React.useState('');
	const [asyncError, setAsyncError] = React.useState(null);
	const [noResults, setNoResults] = React.useState(false);
	const [openDrawer, setOpenDrawer] = React.useState(false);

	const goToTenantPackages = () => {
		history.push('/tenant-packages');
	};
	const handleClickOpenDrawer = (event) => {
		setOpenDrawer(true);
	};
	const handleCloseDrawer = () => {
		setOpenDrawer(false);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleSearchClick = (event) => {
		setSearchAnchorEl(menuParrent.current);
	};

	const handleSearchClose = () => {
		setSearchAnchorEl(null);
	};
	const redirectToLogIn = (_) => {
		toggleLoginPopup(true);
	};

	const redirectToPostPage = () => {
		history.push('/v2/post-property');
	};
	const redirectToHomePage = () => {
		history.push('/');
	};
	const goToProfile = () => {
		history.push('/profile');
	};

	const handleAssetType = (asset) => (e) => {
		setCurrentTab(asset);
	};

	const onLogOut = () => {
		signOut();
		handleClose();
	};

	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			setCities(data);
			if (data.length === 0) {
				setNoResults(true);
			} else {
				setNoResults(false);
			}
			handleSearchClick();
			input.current.focus();
		} else {
			setNoResults(false);
			setAsyncError(data);
			handleSearchClose();
		}
	};

	const handleCity = (e) => {
		const { value } = e.target;
		setUserTypedCity(value);
		if (value.length === 3 || value.length >= 5) {
			searchCities(handleFetchCities, value);
		}
	};

	const handleSelectedCity = (city) => (e) => {
		setSelectedCity(city);
		handleSearchClose();
	};

	const clearSelectedCity = () => {
		setSelectedCity({
			id: null,
			name: null,
		});
		setUserTypedCity('');
	};

	const onSearch = () => {
		if (!selectedCity.id) return;
		const data = {
			city: selectedCity.id,
			cityName: selectedCity.name,
		};
		let link = `/v2/search?f=${currentTab}&c=${
			data.city
		}&cn=${encodeURIComponent(data.cityName)}`;
		history.push(link);
	};

	const renderLogo = {
		'homesearch18.com': (
			<span className={classes.logoTitle}>
				HOMESEARCH<span>18</span>.COM
			</span>
		),
		'homesearchindia.com': (
			<span className={classes.logoTitle}>
				HOMESEARCH<span>INDIA</span>.COM
			</span>
		),
		localhost: (
			<span className={classes.logoTitle}>
				HOMESEARCH<span>INDIA</span>.COM
			</span>
		),
	};
	return (
		<>
			<Drawer open={openDrawer} handleClose={handleCloseDrawer} />
			<Box className={classes.wrapper}>
				<div
					className={clsx(classes.logoWrapper, globalClasses.pointer)}
					onClick={redirectToHomePage}
				>
					<img src={logoIcon} alt="" className={classes.logo} />
					<Box ml="0.5rem">
						{renderLogo[window.location.hostname]}
					</Box>
				</div>
				<IconButton
					className={classes.smMenu}
					size="small"
					onClick={handleClickOpenDrawer}
				>
					<MenuIcon />
				</IconButton>
				<div
					className={clsx(classes.logoWrapper, globalClasses.smHide)}
				>
					<Box
						className={clsx(
							globalClasses.bold,
							globalClasses.pointer,
							globalClasses.smText,
							currentTab === 'project' && classes.selected
						)}
						onClick={handleAssetType('project')}
					>
						Project{' '}
					</Box>
					<Box
						ml="1rem"
						className={clsx(
							globalClasses.colorPrimary,
							globalClasses.bold,
							globalClasses.pointer,
							globalClasses.smText,
							currentTab === 'sale' && classes.selected
						)}
						onClick={handleAssetType('sale')}
					>
						Resale{' '}
					</Box>
					<Box
						ml="1rem"
						className={clsx(
							globalClasses.colorPrimary,
							globalClasses.bold,
							globalClasses.pointer,
							globalClasses.smText,
							currentTab === 'rent' && classes.selected
						)}
						onClick={handleAssetType('rent')}
					>
						Rent{' '}
					</Box>
					<Box
						ml="2rem"
						pl="1rem"
						className={classes.searchWrapper}
						ref={menuParrent}
					>
						{selectedCity.id ? (
							<div className={classes.selectedLocation}>
								<span>{selectedCity.name}</span>
								<Box ml="1rem" onClick={clearSelectedCity}>
									<span
										className={clsx(
											classes.clearIcon,
											globalClasses.pointer
										)}
									>
										X
									</span>
								</Box>
							</div>
						) : (
							<input
								type="text"
								placeholder="Enter City Name"
								onChange={handleCity}
								value={userTypedCity}
								ref={input}
								onFocus={(e) => {
									if (input.current) {
										input.current.placeholder = '';
									}
								}}
								onBlur={(e) => {
									if (input.current) {
										input.current.placeholder =
											'Enter City Name';
									}
								}}
							/>
						)}
					</Box>
					<StyledMenu
						id="customized-menu"
						anchorEl={searchAnchorEl}
						keepMounted
						open={Boolean(searchAnchorEl)}
						onClose={handleSearchClose}
					>
						<Box className={classes.menuWrapper}>
							{!!asyncError && (
								<Typography
									align="center"
									className={globalClasses.colorWarning}
								>
									{asyncError}
								</Typography>
							)}
							{!!noResults ? (
								<Typography align="center">
									No City Found
								</Typography>
							) : (
								cities.map((c) => (
									<Box
										key={c.id}
										className={classes.cityWrapper}
										onClick={handleSelectedCity(c)}
									>
										<LocationOnIcon
											className={classes.locationIcon}
										/>
										<Typography variant="subtitle2">
											{c.name}
										</Typography>
									</Box>
								))
							)}
						</Box>
					</StyledMenu>
					{searchCityLoading ? (
						<Box className={classes.searchButton}>
							<CircularProgress size={20} />
						</Box>
					) : (
						<Box
							ml="1rem"
							onClick={onSearch}
							className={clsx(
								classes.searchButton,
								globalClasses.pointer
							)}
						>
							<img
								src={searchIcon}
								alt="Search"
								className={classes.searchLogo}
							/>
						</Box>
					)}
				</div>
				<div className={clsx(classes.rightSide)}>
					<Box
						mr="1rem"
						className={clsx(
							classes.listButton,
							globalClasses.smHide,
							globalClasses.smText
						)}
						onClick={goToTenantPackages}
					>
						Packages
					</Box>
					<div
						className={clsx(
							classes.listButton,
							globalClasses.smHide,
							globalClasses.smText
						)}
						onClick={redirectToPostPage}
					>
						List Property & Projects
					</div>
					{!!isAuthenticated ? (
						<div>
							<Box
								className={clsx(
									classes.profileWrapper,
									globalClasses.smHide
								)}
								aria-controls="customized-menu"
								aria-haspopup="true"
								onClick={handleClick}
							>
								<Avatar
									src={
										user.photo
											? `/profile/${user.photo}`
											: profile
									}
								>
									{user.name[0].toUpperCase()}
								</Avatar>
							</Box>
							<Menu
								id="customized-menu"
								getContentAnchorEl={null}
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
							>
								<MenuItem onClick={goToProfile}>
									Profile
								</MenuItem>

								<MenuItem onClick={onLogOut}>Logout</MenuItem>
							</Menu>
						</div>
					) : (
						<Box ml="1rem">
							<div
								className={clsx(
									classes.listButton,
									globalClasses.smHide,
									globalClasses.smText
								)}
								onClick={redirectToLogIn}
							>
								Sign In
							</div>
						</Box>
					)}
				</div>
			</Box>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	searchCityLoading: selectSearchCityLoading,
	currentTab: selectCurrentTab,
	selectedCity: selectSelectedCity,
	isAuthenticated: selectAuthenticated,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
	setCurrentTab: (tab) => dispatch(setCurrentTab(tab)),
	setSelectedCity: (tab) => dispatch(setSelectedCity(tab)),
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
