import {
	AppBar,
	Box,
	Button,
	Checkbox,
	Chip,
	FormControl,
	FormControlLabel,
	IconButton,
	InputLabel,
	Paper,
	Select,
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CityDropDown from '../../components/cityMenu/cityMenu.component';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PropertyTab from '../../components/propertyTab/propertyTab.component';
import React from 'react';
import SearchLocation from '../../components/location/location.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';
import { useHistory } from 'react-router-dom';
import { useStyles } from './mobileSearch.styles';

// Custom components

// Styles

// Redux

const MobileSearch = ({ currentTab }) => {
	const history = useHistory();
	const [state, setState] = React.useState({
		flat: false,
		independenthouse: false,
		guesthouse: false,
		hostel: false,
		pg: false,
		land: false,
	});
	const [showBedRooms, setShowBedRooms] = React.useState(false);
	const [city, setCity] = React.useState({
		_id: '5f2cf831ab6d0b12da114161',
		name: 'Bhubaneswar',
		state: 'Odisha',
		id: '5f2cf831ab6d0b12da114161',
	});
	const [showAvailability, setShowAvailability] = React.useState(false);
	const [availability, setAvailability] = React.useState(false);
	const [locations, setLocations] = React.useState([]);
	const [price, setPrice] = React.useState('');
	const [bedrooms, setBedRooms] = React.useState(1);

	React.useEffect(() => {
		setState({
			flat: false,
			independenthouse: false,
			land: false,
			guesthouse: false,
			hostel: false,
			pg: false,
		});

		setAvailability(false);
		setPrice('');
		setBedRooms(1);
	}, [currentTab]);

	const goBack = (_) => {
		history.goBack();
	};

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	const handleChangeAvailability = (event) => {
		setAvailability(event.target.checked);
	};

	const handlePriceChange = (e) => {
		setPrice(e.target.value);
	};
	const handleBedroomsChange = (e) => {
		setBedRooms(e.target.value);
	};

	const onSelect = (data) => {
		if (locations.length < 3) {
			if (!locations.find((c) => c.id === data.id)) {
				setLocations([...locations, data]);
			}
		}
	};

	const handleCity = (city) => {
		setCity(city);
	};

	const onSearch = (_) => {
		const type = Object.keys(state).filter(function (c) {
			if (state[c]) {
				return true;
			} else {
				return false;
			}
		});
		const data = {
			city: city.id,
			cityName: city.name,
			locations: locations.map((c) => c.id),
			type,
		};
		if (price) {
			const budgetValue =
				currentTab === 'rent' ? price * 1000 : price * 100000;
			data.budget = budgetValue;
		}
		if (showAvailability) {
			data.availability = 'immediately';
		}
		if (showBedRooms) {
			data.bedRooms = bedrooms;
		}
		console.log(data);
		let link = `/search-results?f=${currentTab}&c=${
			data.city
		}&cn=${encodeURIComponent(data.cityName)}`;
		if (data.budget) {
			link += `&b=${data.budget}`;
		}
		if (data.locations.length > 0) {
			link += `&l=${data.locations.join(',')}`;
		}
		if (data.type.length > 0) {
			link += `&t=${data.type.join(',')}`;
		}
		if (data.availability) {
			link += `&av=${data.availability}`;
		}
		if (data.bedRooms) {
			link += `&br=${data.bedRooms}`;
		}
		console.log(link);
		history.push(link);
		// history.push('/search-results');
	};

	const onDelete = (data) => () => {
		setLocations(locations.filter((c) => c.id !== data.id));
	};

	React.useEffect(() => {
		if (state.flat) {
			if (currentTab !== 'rent') {
				setShowBedRooms(true);
			} else {
				setShowBedRooms(false);
			}
		} else {
			setShowBedRooms(false);
		}
	}, [state.flat, currentTab]);

	React.useEffect(() => {
		if (!state.land) {
			setShowAvailability(true);
		} else {
			setShowAvailability(false);
		}
	}, [state.land]);

	const rentType = () => (
		<div>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							name="flat"
							checked={state.flat}
							onChange={handleChange}
						/>
					}
					label="Apartment"
				/>
			</div>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							name="independenthouse"
							checked={state.independenthouse}
							onChange={handleChange}
						/>
					}
					label="Independent House"
				/>
			</div>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							name="guesthouse"
							checked={state.guesthouse}
							onChange={handleChange}
						/>
					}
					label="Guest House"
				/>
			</div>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							name="hostel"
							checked={state.hostel}
							onChange={handleChange}
						/>
					}
					label="Hostel"
				/>
			</div>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							name="pg"
							checked={state.pg}
							onChange={handleChange}
						/>
					}
					label="PG"
				/>
			</div>
		</div>
	);

	const saleType = () => (
		<div>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							name="flat"
							checked={state.flat}
							onChange={handleChange}
						/>
					}
					label="Apartment"
				/>
			</div>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							name="land"
							checked={state.land}
							onChange={handleChange}
						/>
					}
					label="Land"
				/>
			</div>
			<div>
				<FormControlLabel
					control={
						<Checkbox
							name="independenthouse"
							checked={state.independenthouse}
							onChange={handleChange}
						/>
					}
					label="Independent House"
				/>
			</div>
		</div>
	);

	const {
		searchWrapper,

		filterWrapper,
		root,
		positionFixed,
		iconWrapper,
		chip,
		selectedCityWrapper,
	} = useStyles();
	return (
		<div>
			<Box mb="8rem">
				<AppBar position="fixed" color="transparent">
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						className={iconWrapper}
					>
						<IconButton onClick={goBack}>
							<ArrowBackIcon />
						</IconButton>
						<CityDropDown city={city} handleCity={handleCity} />
					</Box>
					<PropertyTab />
				</AppBar>
			</Box>
			<Box pl="1rem">
				<h4>Locality</h4>
			</Box>
			{locations.length !== 0 && (
				<Box mt="2rem">
					<Paper className={selectedCityWrapper} square={true}>
						{locations.map((c) => (
							<Chip
								key={c.id}
								icon={<LocationCityIcon />}
								label={c.name}
								variant="outlined"
								className={chip}
								onDelete={onDelete(c)}
							/>
						))}
					</Paper>
				</Box>
			)}
			<Box pl="1rem" pr="1rem">
				<Paper className={searchWrapper} elevation={3}>
					<Box display="flex" alignItems="center">
						<SearchLocation onSelect={onSelect} city={city} />
					</Box>
				</Paper>
			</Box>

			<Box className={filterWrapper}>
				<h4>Budget</h4>
				<Box>
					<Box>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="filled-age-native-simple">
								Price
							</InputLabel>
							<Select
								native
								label="Min"
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
								value={price}
								onChange={handlePriceChange}
							>
								<option aria-label="None" value="" />
								{currentTab === 'rent'
									? [2, 5, 10, 20, 40, 60, 80, 100].map(
											(c) => (
												<option value={c} key={c}>
													{c}K
												</option>
											)
									  )
									: [
											2,
											5,
											10,
											20,
											40,
											60,
											80,
											100,
											200,
											300,
											400,
											500,
									  ].map((c) => (
											<option value={c} key={c}>
												{c}L
											</option>
									  ))}
							</Select>
						</FormControl>
					</Box>
				</Box>
				<Box mt="2rem">
					<h4>Property Type</h4>
					{(() => {
						switch (currentTab) {
							case 'rent':
								return rentType();

							default:
								return saleType();
						}
					})()}
				</Box>
				{showBedRooms && (
					<Box mt="2rem">
						<h4>Number of bedrooms</h4>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel
								htmlFor="filled-age-native-simple"
								classes={{ root }}
							>
								Choose
							</InputLabel>
							<Select
								native
								label="Min"
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
								value={bedrooms}
								onChange={handleBedroomsChange}
							>
								<option aria-label="None" value="" />
								{Array.from(Array(3).keys()).map((c) => (
									<option value={c + 1} key={c}>
										{c + 1}
									</option>
								))}
							</Select>
						</FormControl>
					</Box>
				)}
				{showAvailability && (
					<Box mt="2rem">
						<h4>Availability</h4>
						<FormControlLabel
							control={
								<Checkbox
									checked={availability}
									onChange={handleChangeAvailability}
								/>
							}
							label="Ready to move"
						/>
					</Box>
				)}
			</Box>

			<Box mt="2rem">
				<AppBar
					position="fixed"
					classes={{
						positionFixed: positionFixed,
					}}
				>
					<Button
						fullWidth
						color="primary"
						variant="contained"
						onClick={onSearch}
					>
						Search
					</Button>
				</AppBar>
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
});

export default connect(mapStateToProps, null)(MobileSearch);
