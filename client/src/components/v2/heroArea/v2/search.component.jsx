import {
	Box,
	CircularProgress,
	ClickAwayListener,
	Divider,
	Grid,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import {
	selectCurrentTab,
	selectSelectedCity,
} from '../../../../redux/actionTab/actionTab.selectors';

import ApartmentIcon from '@material-ui/icons/Apartment';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchCities } from '../../../../redux/city/city.actions';
import searchIcon from '../../../../assets/search.svg';
import { selectSearchCityLoading } from '../../../../redux/city/city.selectors';
import { setSelectedCity } from '../../../../redux/actionTab/actionTab.actions';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useParentStyles from '../heroArea.style';
import useStyles from './heroArea.style';
import { useTheme } from '@material-ui/core/styles';
import { withAsync } from '../../../../hoc/withAsync';

const SearchComponent = ({
	currentTab,
	selectedCity,
	setSelectedCity,
	loading,
	initialLoading,
	searchCityLoading,
	searchCities,
	topCities,
	placeholder = 'Enter City Name',
}) => {
	const history = useHistory();
	const theme = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

	// Ref
	const menuParrent = useRef(null);
	const input = useRef(null);

	// Style
	const style = useStyles();
	const classes = useParentStyles();

	// State
	const [open, setOpen] = useState(false);
	const [userTypedCity, setUserTypedCity] = React.useState('');
	const [error, setError] = React.useState(null);
	const [noResults, setNoResults] = React.useState(false);
	const [types, setTypes] = React.useState([]);
	const [cities, setCities] = React.useState([]);

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

	const isSelected = (asset) => {
		return types.includes(asset);
	};

	// Callback
	const handleClickAway = () => {
		setOpen(false);
	};

	const handleSelectedCity = (city) => (e) => {
		setSelectedCity(city);
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

	const handleCity = (e) => {
		const { value } = e.target;
		setUserTypedCity(value);
		if (value.length === 2 || value.length >= 4) {
			searchCities(handleFetchCities, value);
		}
	};

	// Effects
	useEffect(() => {
		setTypes([]);
	}, [currentTab]);

	return (
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
								<span className={classes.clearIcon}>X</span>
							</Box>
						</div>
					) : (
						<input
							type="text"
							placeholder={placeholder}
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
									<Typography gutterBottom variant="caption">
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
										<Grid item xs={6} md={3} key={c.id}>
											<button
												className={style.cityWrapper}
												onClick={handleSelectedCity(c)}
											>
												{c.name}
											</button>
										</Grid>
									))
								) : (
									<>
										{topCities.map((c) => (
											<Grid item xs={6} md={3} key={c.id}>
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
						{!smallScreen && (
							<Grid item xs={12} md={1} className={style.center}>
								<Divider orientation="vertical" />
							</Grid>
						)}
						{!smallScreen && (
							<Grid item xs={12} md={5}>
								<Grid container spacing={1} justify="center">
									<Grid item xs={3}>
										<button
											className={clsx(
												style.propertyTypeWrapper,
												isSelected('flat') &&
													style.typeSelected
											)}
											onClick={handlePropertyType('flat')}
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
														isSelected('land') &&
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
														isSelected('hostel') &&
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
						)}
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
	);
};

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
	selectedCity: selectSelectedCity,
	searchCityLoading: selectSearchCityLoading,
});

const mapDispatchToProps = (dispatch) => ({
	setSelectedCity: (tab) => dispatch(setSelectedCity(tab)),
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withAsync(SearchComponent));
