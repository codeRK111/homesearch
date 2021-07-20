import { Box, CircularProgress, Menu, Typography } from '@material-ui/core';
import {
	selectCurrentTab,
	selectSelectedCity,
} from '../../../redux/actionTab/actionTab.selectors';
import {
	setCurrentTab,
	setSelectedCity,
} from '../../../redux/actionTab/actionTab.actions';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import agentIcon from '../../../assets/icons/agent.svg';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import loanIcon from '../../../assets/icons/loan.svg';
import newsIcon from '../../../assets/icons/news.svg';
import queryString from 'query-string';
import { searchCities } from '../../../redux/city/city.actions';
import searchIcon from '../../../assets/search.svg';
import { selectSearchCityLoading } from '../../../redux/city/city.selectors';
import useGlobalStyles from '../../../common.style';
import { useHistory } from 'react-router-dom';
import useStyles from './heroArea.style';
import valuationIcon from '../../../assets/icons/valuation.svg';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';
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

const HeroArea = ({
	searchCityLoading,
	searchCities,
	currentTab,
	selectedCity,
	setCurrentTab,
	setSelectedCity,
}) => {
	const history = useHistory();
	const menuParrent = React.useRef(null);
	const input = React.useRef(null);
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [assetType, setAssetType] = React.useState('project');
	const [cities, setCities] = React.useState([]);
	const [userTypedCity, setUserTypedCity] = React.useState('');
	const [asyncError, setAsyncError] = React.useState(null);
	const [noResults, setNoResults] = React.useState(false);
	const handleClick = () => {
		setAnchorEl(menuParrent.current);
	};

	const handleClose = () => {
		setAnchorEl(null);
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
			handleClick();
			input.current.focus();
		} else {
			setNoResults(false);
			setAsyncError(data);
			handleClose();
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
		handleClose();
		const data = {
			city: city.id,
			cityName: city.name,
		};
		let link = `/v2/search?f=${currentTab}&c=${
			city.id
		}&cn=${encodeURIComponent(city.name)}`;
		history.push(link);
	};

	const handleAssetType = (asset) => (e) => {
		setCurrentTab(asset);
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

	return (
		<div className={classes.topMargin}>
			<div className={classes.wrapper}>
				<Box width="100%">
					<div className={classes.tabWrapper}>
						<span
							className={clsx(
								classes.tabText,
								classes.mr,
								currentTab === 'project' && classes.selected
							)}
							onClick={handleAssetType('project')}
						>
							Project
						</span>
						<span
							className={clsx(
								classes.tabText,
								classes.mr,
								currentTab === 'sale' && classes.selected
							)}
							onClick={handleAssetType('sale')}
						>
							Resale
						</span>
						<span
							className={clsx(
								classes.tabText,
								currentTab === 'rent' && classes.selected
							)}
							onClick={handleAssetType('rent')}
						>
							Rent
						</span>
					</div>
					<Box
						className={classes.searchWrapper}
						// onClick={handleClick}
						ref={menuParrent}
					>
						{selectedCity.id ? (
							<div className={classes.selectedLocation}>
								<span>{selectedCity.name}</span>
								<Box ml="1rem" onClick={clearSelectedCity}>
									<span className={classes.clearIcon}>X</span>
								</Box>
							</div>
						) : (
							<input
								type="text"
								placeholder="Search For City"
								onChange={handleCity}
								value={userTypedCity}
								ref={input}
							/>
						)}
						{searchCityLoading ? (
							<Box className={classes.searchButton}>
								<CircularProgress size={20} />
							</Box>
						) : (
							<Box
								className={classes.searchButton}
								onClick={onSearch}
							>
								<img src={searchIcon} alt="" />
							</Box>
						)}
					</Box>
					<StyledMenu
						id="customized-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
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
				</Box>
			</div>
			<div className={classes.whatsAppWrapper}>
				<div className={classes.whatsappShadow}>
					<img
						src={whatsappIcon}
						alt=""
						className={classes.whatsappIcon}
					/>
				</div>
			</div>
			<div className={classes.iconsContainer}>
				<div className={classes.iconsWrapper}>
					<div>
						<div className={classes.iconShadow}>
							<img
								src={valuationIcon}
								alt=""
								className={classes.svgWrapper}
							/>
						</div>
						<p className={globalClasses.textCenter}>
							Property <br /> Valuation
						</p>
					</div>
					<div>
						<div className={classes.iconShadow}>
							<img
								src={agentIcon}
								alt=""
								className={classes.svgWrapper}
							/>
						</div>
						<p className={globalClasses.textCenter}>Find Agent</p>
					</div>
					<div>
						<div className={classes.iconShadow}>
							<img
								src={loanIcon}
								alt=""
								className={classes.svgWrapper}
							/>
						</div>
						<p className={globalClasses.textCenter}>Loan</p>
					</div>
					<div>
						<div className={classes.iconShadow}>
							<img
								src={newsIcon}
								alt=""
								className={classes.svgWrapper}
							/>
						</div>
						<p className={globalClasses.textCenter}>News</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	searchCityLoading: selectSearchCityLoading,
	currentTab: selectCurrentTab,
	selectedCity: selectSelectedCity,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
	setCurrentTab: (tab) => dispatch(setCurrentTab(tab)),
	setSelectedCity: (tab) => dispatch(setSelectedCity(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroArea);
