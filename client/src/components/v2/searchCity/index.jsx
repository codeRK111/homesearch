import {
	Box,
	CircularProgress,
	ClickAwayListener,
	Grid,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchCities } from '../../../redux/city/city.actions';
import searchIcon from '../../../assets/search.svg';
import { selectCurrentTab } from '../../../redux/actionTab/actionTab.selectors';
import { selectSearchCityLoading } from '../../../redux/city/city.selectors';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useParentStyles from '../../v2/heroArea/heroArea.style';
import useStyles from '../../v2/heroArea/v2/heroArea.style';
import { useTheme } from '@material-ui/core/styles';
import { withAsync } from '../../../hoc/withAsync';

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

	const onSearch = () => {};

	// Callback
	const handleClickAway = () => {
		setOpen(false);
	};

	const handleSelectedCity = (city) => (e) => {
		setSelectedCity(city);
		setOpen(false);
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
			setOpen(true);
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
					style={{ width: '100%' }}
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
								}
							}}
							onBlur={(e) => {
								if (input.current) {
									input.current.placeholder = placeholder;
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
					style={{
						zIndex: 100000,
					}}
				>
					<Grid container spacing={3}>
						<Grid item xs={12} className={style.citiesWrapper}>
							{noResults && (
								<Box mb="1rem">
									<Typography gutterBottom variant="caption">
										No results
									</Typography>
								</Box>
							)}
							<Grid container spacing={1}>
								{searchCityLoading ? (
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
									<></>
								)}
							</Grid>
						</Grid>
					</Grid>
				</div>
			</div>
		</ClickAwayListener>
	);
};

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
	searchCityLoading: selectSearchCityLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchCities: (callback, name) =>
		dispatch(searchCities({ name, callback })),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withAsync(SearchComponent));
