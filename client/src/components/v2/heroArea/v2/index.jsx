import {
	Box,
	CircularProgress,
	ClickAwayListener,
	Divider,
	Grid,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { agent, loan, news, valuation } from '../../../../utils/statc';
import {
	selectCurrentTab,
	selectSelectedCity,
} from '../../../../redux/actionTab/actionTab.selectors';
import {
	setCurrentTab,
	setSelectedCity,
} from '../../../../redux/actionTab/actionTab.actions';

import ApartmentIcon from '@material-ui/icons/Apartment';
import Skeleton from '@material-ui/lab/Skeleton';
import builderLogo from '../../../../assets/icons/builder.svg';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchCities } from '../../../../redux/city/city.actions';
import searchIcon from '../../../../assets/search.svg';
import { selectSearchCityLoading } from '../../../../redux/city/city.selectors';
import useGlobalStyles from '../../../../common.style';
import { useHistory } from 'react-router-dom';
import useParentStyles from '../heroArea.style';
import useStyles from './heroArea.style';
import { withAsync } from '../../../../hoc/withAsync';

const HeroArea = ({
	currentTab,
	selectedCity,
	setCurrentTab,
	setSelectedCity,
	loading,
	initialLoading,
	searchCityLoading,
	searchCities,
	topCities,
}) => {
	const history = useHistory();
	// Style
	const style = useStyles();
	const classes = useParentStyles();
	const globalClasses = useGlobalStyles();

	// Refs
	const input = useRef(null);
	const menuParrent = useRef(null);

	// States
	const [userTypedCity, setUserTypedCity] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [noResults, setNoResults] = React.useState(false);
	const [types, setTypes] = React.useState([]);
	const [cities, setCities] = React.useState([]);

	const isSelected = (asset) => {
		return types.includes(asset);
	};

	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setError(null);
			setCities(data);
			if (data.length === 0) {
				setNoResults(true);
			} else {
				setNoResults(false);
			}
			input.current.focus();
		} else {
			setNoResults(false);
			setError(data);
		}
	};

	// Callbacks
	const handleAssetType = (asset) => (e) => {
		setCurrentTab(asset);
	};
	const handlePropertyType = (asset) => (e) => {
		setTypes((prevState) => {
			if (prevState.includes(asset)) {
				return prevState.filter((c) => c !== asset);
			} else {
				return [...prevState, asset];
			}
		});
	};
	const clearSelectedCity = () => {
		setSelectedCity({
			id: null,
			name: null,
		});
		setUserTypedCity('');
	};
	const handleCity = (e) => {
		const { value } = e.target;
		setUserTypedCity(value);
		if (value.length === 2 || value.length >= 4) {
			searchCities(handleFetchCities, value);
		}
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
		if (types.length > 0) {
			link += `&t=${types.join(',')}`;
		}
		history.push(link);
	};

	const handleSelectedCity = (city) => (e) => {
		setSelectedCity(city);
	};

	const handleClickAway = () => {
		setOpen(false);
	};

	// Effects
	useEffect(() => {
		setTypes([]);
	}, [currentTab]);
	return (
		<div className={style.wrapper}>
			<div className={style.center}>
				<div className={style.categoryWrapper}>
					<button
						className={clsx(
							style.categoryButton,
							currentTab === 'project' &&
								style.categorySelectedButton
						)}
						onClick={handleAssetType('project')}
					>
						Project
					</button>
					<button
						className={clsx(
							style.categoryButton,
							currentTab === 'sale' &&
								style.categorySelectedButton
						)}
						onClick={handleAssetType('sale')}
					>
						Resale
					</button>
					<button
						className={clsx(
							style.categoryButton,
							currentTab === 'rent' &&
								style.categorySelectedButton
						)}
						onClick={handleAssetType('rent')}
					>
						Rent
					</button>
				</div>
			</div>
			<div className={style.center}>
				<ClickAwayListener onClickAway={handleClickAway}>
					<div className={style.menuParent}>
						<Box
							className={classes.searchWrapper}
							// onClick={handleClick}
							ref={menuParrent}
						>
							{selectedCity.id ? (
								<div className={classes.selectedLocation}>
									<span>{selectedCity.name}</span>
									<Box ml="1rem" onClick={clearSelectedCity}>
										<span className={classes.clearIcon}>
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
											setOpen(true);
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
							{loading ? (
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
						<div
							className={clsx(
								style.menuWrapper,
								open && style.menuWrapperOpen
							)}
						>
							<Grid container spacing={3}>
								<Grid
									item
									xs={12}
									md={6}
									className={style.citiesWrapper}
								>
									{noResults && (
										<Box mb="1rem">
											<Typography
												gutterBottom
												variant="caption"
											>
												No results
											</Typography>
										</Box>
									)}
									<Grid container spacing={1}>
										{initialLoading || searchCityLoading ? (
											Array.from(
												{ length: 4 },
												(_, i) => i + 1
											).map((_, i) => (
												<Grid key={i} item xs={3}>
													<Skeleton
														width={'100%'}
														height={50}
													/>
												</Grid>
											))
										) : cities.length > 0 ? (
											cities.map((c) => (
												<Grid item xs={3} key={c.id}>
													<button
														className={
															style.cityWrapper
														}
														onClick={handleSelectedCity(
															c
														)}
													>
														{c.name}
													</button>
												</Grid>
											))
										) : (
											<>
												{topCities.map((c) => (
													<Grid
														item
														xs={3}
														key={c.id}
													>
														<button
															className={
																style.cityWrapper
															}
															onClick={handleSelectedCity(
																c
															)}
														>
															{c.name}
														</button>
													</Grid>
												))}
											</>
										)}
									</Grid>
								</Grid>
								<Grid
									item
									xs={12}
									md={1}
									className={style.center}
								>
									<Divider orientation="vertical" />
								</Grid>
								<Grid item xs={12} md={5}>
									<Grid
										container
										spacing={1}
										justify="center"
									>
										<Grid item xs={3}>
											<button
												className={clsx(
													style.propertyTypeWrapper,
													isSelected('flat') &&
														style.typeSelected
												)}
												onClick={handlePropertyType(
													'flat'
												)}
											>
												<ApartmentIcon
													className={clsx(
														isSelected('flat') &&
															style.typeSelected
													)}
												/>
												Apartment
											</button>
										</Grid>
										<Grid item xs={3}>
											<button
												className={clsx(
													style.propertyTypeWrapper,
													isSelected(
														'independenthouse'
													) && style.typeSelected
												)}
												onClick={handlePropertyType(
													'independenthouse'
												)}
											>
												<ApartmentIcon
													className={clsx(
														isSelected(
															'independenthouse'
														) && style.typeSelected
													)}
												/>
												Villa
											</button>
										</Grid>
										{currentTab !== 'rent' && (
											<Grid item xs={3}>
												<button
													className={clsx(
														style.propertyTypeWrapper,
														isSelected('land') &&
															style.typeSelected
													)}
													onClick={handlePropertyType(
														'land'
													)}
												>
													<ApartmentIcon
														className={clsx(
															isSelected(
																'land'
															) &&
																style.typeSelected
														)}
													/>
													Land
												</button>
											</Grid>
										)}
										{currentTab === 'rent' && (
											<Grid item xs={3}>
												<button
													className={clsx(
														style.propertyTypeWrapper,
														isSelected('hostel') &&
															style.typeSelected
													)}
													onClick={handlePropertyType(
														'hostel'
													)}
												>
													<ApartmentIcon
														className={clsx(
															isSelected(
																'hostel'
															) &&
																style.typeSelected
														)}
													/>
													Hostel
												</button>
											</Grid>
										)}
										{currentTab === 'rent' && (
											<Grid item xs={3}>
												<button
													className={clsx(
														style.propertyTypeWrapper,
														isSelected('pg') &&
															style.typeSelected
													)}
													onClick={handlePropertyType(
														'pg'
													)}
												>
													<ApartmentIcon
														className={clsx(
															isSelected('pg') &&
																style.typeSelected
														)}
													/>
													PG
												</button>
											</Grid>
										)}
									</Grid>
								</Grid>
							</Grid>
							<Box mt="2rem" className={style.center}>
								<button
									className={style.searchButton}
									onClick={onSearch}
								>
									Search
								</button>
							</Box>
						</div>
					</div>
				</ClickAwayListener>
			</div>
			<Box className={style.center} mt="2rem">
				<Grid container spacing={7} justify="center">
					<Grid item>
						<div className={style.iconWraper}>
							<div className={classes.iconShadow}>
								<img
									src={builderLogo}
									alt=""
									className={classes.svgWrapper}
								/>
							</div>
							<p
								className={clsx(
									globalClasses.textCenter,
									style.iconText
								)}
							>
								Builders
							</p>
						</div>
					</Grid>
					<Grid item>
						<div className={style.iconWraper}>
							<div className={classes.iconShadow}>
								<img
									src={agent}
									alt=""
									className={classes.svgWrapper}
								/>
							</div>
							<p
								className={clsx(
									globalClasses.textCenter,
									style.iconText
								)}
							>
								Find Realtors
							</p>
						</div>
					</Grid>
					<Grid item>
						<div className={style.iconWraper}>
							<div className={classes.iconShadow}>
								<img
									src={valuation}
									alt=""
									className={classes.svgWrapper}
								/>
							</div>
							<p
								className={clsx(
									globalClasses.textCenter,
									style.iconText
								)}
							>
								Property Valuation
							</p>
						</div>
					</Grid>
					<Grid item>
						<div className={style.iconWraper}>
							<div className={classes.iconShadow}>
								<img
									src={loan}
									alt=""
									className={classes.svgWrapper}
								/>
							</div>
							<p
								className={clsx(
									globalClasses.textCenter,
									style.iconText
								)}
							>
								Loan
							</p>
						</div>
					</Grid>
					<Grid item>
						<div className={style.iconWraper}>
							<div className={classes.iconShadow}>
								<img
									src={news}
									alt=""
									className={classes.svgWrapper}
								/>
							</div>
							<p
								className={clsx(
									globalClasses.textCenter,
									style.iconText
								)}
							>
								News
							</p>
						</div>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
	selectedCity: selectSelectedCity,
	searchCityLoading: selectSearchCityLoading,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentTab: (tab) => dispatch(setCurrentTab(tab)),
	setSelectedCity: (tab) => dispatch(setSelectedCity(tab)),
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withAsync(HeroArea));
