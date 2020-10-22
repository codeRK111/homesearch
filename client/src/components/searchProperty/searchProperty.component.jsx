import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, Paper } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import Popper from '@material-ui/core/Popper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

// Custom components
import PropertyTab from '../propertyTab/propertyTab.component';
import SearchButton from '../searchButton/searchButton.component';
import SearchLocation from '../searchLocation/searchLocation.component';

// Style
import { useStyles } from './searchProperty.styles';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchLocations } from '../../redux/city/city.actions';
import { selectSearchLocationLoading } from '../../redux/city/city.selectors';

const SearchProperty = ({ searchLocationLoading, searchLocations }) => {
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
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
				<Box mt="2rem" display="flex" className={classes.wrapper}>
					{!mobile && (
						<FormControl
							variant="outlined"
							className={classes.formControl}
						>
							<Select
								native
								inputProps={{
									name: 'age',
									id: 'filled-age-native-simple',
								}}
							>
								<option value={10}>Bhubaneswar</option>
								<option value={20}>Nayagarh</option>
								<option value={30}>Cuttack</option>
							</Select>
						</FormControl>
					)}
					<Box className={classes.searchBoxWrapper}>
						<SearchIcon />
						<SearchLocation
							className={classes.searchField}
							onClick={checkMobile}
							placeholder="Search Location"
						/>
					</Box>

					{!mobile && (
						<div
							className={classes.budgetWrapper}
							onClick={handleClick}
						>
							<div className={classes.budget}>
								Budget <ArrowDropDownOutlinedIcon />
							</div>
						</div>
					)}
					{!mobile && (
						<Popper
							id={id}
							open={open}
							anchorEl={anchorEl}
							placement="top-start"
							popperOptions={{
								positionFixed: true,
							}}
							keepMounted={true}
							disablePortal={true}
						>
							<Paper className={classes.budgetPopper}>
								<BudgetItems />
							</Paper>
						</Popper>
					)}
					{!mobile && (
						<div
							className={classes.budgetWrapper}
							onClick={handleClickProperty}
						>
							<div className={classes.property}>
								Property Type <ArrowDropDownOutlinedIcon />
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
								<PropertyItems />
							</Paper>
						</Popper>
					)}
					<div className={classes.buttonWrapper}>
						<SearchButton text="Search" />
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
		height: '500px',
		overflowY: 'scroll',
	},
	priceWrapper: {
		padding: '0.2rem',
		cursor: 'pointer',
	},
});

const BudgetItems = () => {
	const classes = styles();
	return (
		<Paper width="250px" className={classes.wrapper}>
			<Box display="flex" justifyContent="space-between">
				<input
					type="text"
					className={classes.input}
					placeholder="Min"
				/>
				<input
					type="text"
					className={classes.input}
					placeholder="Max"
				/>
			</Box>
			<Box mt="1rem">
				{Array.from(Array(20).keys()).map((c) => (
					<div key={c} className={classes.priceWrapper}>
						{c + 1}L
					</div>
				))}
			</Box>
		</Paper>
	);
};

const PropertyItems = () => {
	return (
		<Paper>
			<Box p="1rem">
				{' '}
				<div>
					<FormControlLabel
						control={<Checkbox name="checkedC" />}
						label="Flat / Apartment"
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
						label="PG"
					/>
				</div>
			</Box>
		</Paper>
	);
};

const mapStateToProps = createStructuredSelector({
	searchLocationLoading: selectSearchLocationLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchLocations: (callback, name) =>
		dispatch(searchLocations({ name, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchProperty);
