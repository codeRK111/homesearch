import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, Paper, Chip } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import Popper from '@material-ui/core/Popper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { useHistory } from 'react-router-dom';

// Custom components
import PropertyTab from '../propertyTab/propertyTab.component';
import SearchButton from '../searchButton/searchButton.component';
import SearchLocation from '../location/location.component';

// Style
import { useStyles } from './searchProperty.styles';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchLocations } from '../../redux/city/city.actions';
import { selectSearchLocationLoading } from '../../redux/city/city.selectors';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';

const SearchProperty = ({
	searchLocationLoading,
	searchLocations,
	currentTab,
}) => {
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [budget, setBudget] = React.useState('Budget');
	const [locations, setLocations] = React.useState([]);
	const [anchorElProperty, setAnchorElProperty] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	const handleClickProperty = (event) => {
		setAnchorElProperty(anchorElProperty ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const openProperty = Boolean(anchorElProperty);
	const id = open ? 'simple-popper' : undefined;
	const idP = open ? 'simple-popper-Type' : undefined;

	const checkMobile = () => {
		if (mobile) {
			history.push('/m/search');
		}
	};

	const onSelect = (data) => {
		if (locations.length < 3) {
			if (!locations.find((c) => c.id === data.id)) {
				setLocations([...locations, data]);
			}
		}
	};

	const onDelete = (data) => () => {
		setLocations(locations.filter((c) => c.id !== data.id));
	};

	const budgetClose = (data) => {
		if (!data) {
			setAnchorEl(null);
			return;
		}
		setBudget(data);
		setAnchorEl(null);
	};

	const typeClosed = () => {
		setAnchorElProperty(null);
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			flexDirection="column"
			p={'1rem'}
			className={classes.bg}
			position="relative"
		>
			<div className={classes.overlay}>
				<h1 className={classes.title}>
					Lorem ipsum dolor sit amet consectetur.
				</h1>
				<PropertyTab />
				{locations.length && (
					<Box mt="2rem">
						<Paper
							className={classes.selectedCityWrapper}
							square={true}
						>
							{locations.map((c) => (
								<Chip
									key={c.id}
									icon={<LocationCityIcon />}
									label={c.name}
									variant="outlined"
									className={classes.chip}
									onDelete={onDelete(c)}
								/>
							))}
						</Paper>
					</Box>
				)}
				<Box display="flex" className={classes.wrapper}>
					{!mobile && (
						<FormControl
							variant="outlined"
							className={classes.formControl}
							fullWidth
						>
							<Select
								native
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option value={10}>Bhubaneswar</option>
								<option value={20}>Mumbai</option>
								<option value={30}>Pune</option>
								<option value={10}>Delhi</option>
								<option value={20}>Hyderabad</option>
								<option value={30}>Banglore</option>
								<option value={30}>Noida</option>
								<option value={30}>Kolkata</option>
							</Select>
						</FormControl>
					)}
					<Box className={classes.searchBoxWrapper}>
						<SearchLocation
							className={classes.searchField}
							onClick={checkMobile}
							onSelect={onSelect}
						/>
					</Box>

					{!mobile && (
						<div
							className={classes.budgetWrapper}
							onClick={handleClick}
						>
							<div className={classes.budget}>
								{budget} <ArrowDropDownOutlinedIcon />
							</div>
						</div>
					)}
					{!mobile && (
						<Popper
							id={id}
							open={open}
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							keepMounted={true}
							disablePortal={true}
						>
							<Paper className={classes.budgetPopper}>
								<Box className={classes.wrapper}>
									<BudgetItems
										currentTab={currentTab}
										close={budgetClose}
									/>
								</Box>
							</Paper>
						</Popper>
					)}
					{!mobile && (
						<div
							className={classes.budgetWrapper}
							onClick={handleClickProperty}
						>
							<div className={classes.property}>
								{currentTab === 'project'
									? 'Project'
									: 'Property'}{' '}
								Type <ArrowDropDownOutlinedIcon />
							</div>
						</div>
					)}
					{!mobile && (
						<Popper
							id={idP}
							open={openProperty}
							anchorEl={anchorElProperty}
							placement="bottom-start"
							popperOptions={{
								positionFixed: true,
							}}
							keepMounted={true}
							disablePortal={true}
						>
							<Paper className={classes.budgetPopper}>
								<PropertyItems
									currentTab={currentTab}
									close={typeClosed}
								/>
							</Paper>
						</Popper>
					)}
					<div className={classes.buttonWrapper}>
						<SearchButton
							text="Search"
							onClick={() => history.push('/search-results')}
						/>
					</div>
				</Box>
			</div>
		</Box>
	);
};

const styles = makeStyles({
	input: {
		width: '50px',
		padding: '0.5rem',
	},
	wrapper: {
		backgroundColor: '#ffffff',
		padding: '1rem',
		maxHeight: '300px',
		overflowY: 'scroll',
		minWidth: '100px',
	},
	priceWrapper: {
		padding: '0.2rem',
		cursor: 'pointer',
		textAlign: 'center',
		'&:hover': {
			backgroundColor: '#cccccc',
		},
	},
});

const BudgetItems = ({ currentTab, close }) => {
	const classes = styles();
	const click = (data) => () => {
		close(data);
	};
	return (
		<Paper
			width="250px"
			className={classes.wrapper}
			onMouseLeave={() => close()}
		>
			<Box>
				{currentTab === 'rent'
					? [2, 5, 10, 20, 40, 60, 80, 100].map((c) => (
							<div
								key={c}
								className={classes.priceWrapper}
								onClick={click(`${c}k`)}
							>
								{c}k
							</div>
					  ))
					: Array.from(Array(20).keys()).map((c) => (
							<div
								key={c}
								className={classes.priceWrapper}
								onClick={click(`${c}L`)}
							>
								{c * 5}L
							</div>
					  ))}
			</Box>
		</Paper>
	);
};

const PropertyItems = ({ currentTab, close }) => {
	return (
		<Paper onMouseLeave={() => close()}>
			{currentTab !== 'rent' ? (
				<Box p="1rem">
					{' '}
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="Apartment"
						/>
					</div>
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="Independent House"
						/>
					</div>
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="Land"
						/>
					</div>
				</Box>
			) : (
				<Box p="1rem">
					{' '}
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="Apartment"
						/>
					</div>
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="Independent House"
						/>
					</div>
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="Guest House"
						/>
					</div>
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="Hostel"
						/>
					</div>
					<div>
						<FormControlLabel
							control={<Checkbox name="checkedC" />}
							label="PG"
						/>
					</div>
				</Box>
			)}
		</Paper>
	);
};

const mapStateToProps = createStructuredSelector({
	searchLocationLoading: selectSearchLocationLoading,
	currentTab: selectCurrentTab,
});

const mapDispatchToProps = (dispatch) => ({
	searchLocations: (callback, name) =>
		dispatch(searchLocations({ name, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchProperty);
