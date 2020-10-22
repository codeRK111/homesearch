import React from 'react';
import {
	IconButton,
	Box,
	FormControlLabel,
	Button,
	FormControl,
	Select,
	InputLabel,
	Paper,
	Checkbox,
	AppBar,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

// Custom components
import PropertyTab from '../../components/propertyTab/propertyTab.component';
import CityDropDown from '../../components/cityDropdown/cityDropdown.component';
import SearchLocation from '../../components/searchLocation/searchLocation.component';

// Styles
import { useStyles } from './mobileSearch.styles';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';

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
	const [showAvailability, setShowAvailability] = React.useState(false);
	const [availability, setAvailability] = React.useState(false);

	const goBack = (_) => {
		history.goBack();
	};

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	const handleChangeAvailability = (event) => {
		setAvailability(event.target.checked);
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
					label="Flat"
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
					label="Flat"
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
		searchInput,
		searchIcon,
		filterWrapper,
		root,
		positionFixed,
		iconWrapper,
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
						<CityDropDown />
					</Box>
					<PropertyTab />
				</AppBar>
			</Box>
			<Box pl="1rem">
				<h4>Locality</h4>
			</Box>
			<Box pl="1rem" pr="1rem">
				<Paper className={searchWrapper} elevation={3}>
					<Box display="flex" alignItems="center">
						<SearchIcon className={searchIcon} />
						<SearchLocation
							className={searchInput}
							placeholder="Search locality"
						/>
					</Box>
				</Paper>
			</Box>

			<Box className={filterWrapper}>
				<h4>Budget</h4>
				<Box>
					<Box>
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="filled-age-native-simple">
								Min
							</InputLabel>
							<Select
								native
								label="Min"
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option aria-label="None" value="" />
								{Array.from(Array(20).keys()).map((c) => (
									<option value={c} key={c}>
										{c + 1}L
									</option>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box mt="1rem">
						<FormControl variant="outlined" fullWidth size="small">
							<InputLabel htmlFor="filled-age-native-simple">
								Max
							</InputLabel>
							<Select
								native
								label="Max"
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option aria-label="None" value="" />
								{Array.from(Array(20).keys()).map((c) => (
									<option value={c} key={c}>
										{c + 1}L
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
							>
								<option aria-label="None" value="" />
								{Array.from(Array(3).keys()).map((c) => (
									<option value={c} key={c}>
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
					<Button fullWidth color="primary" variant="contained">
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
