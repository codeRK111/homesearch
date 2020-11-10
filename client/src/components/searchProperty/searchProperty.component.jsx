import { Box, Chip, Divider, Paper } from '@material-ui/core';

import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Menu from '../city/city.component';
import Popper from '@material-ui/core/Popper';
import PropertyTab from '../propertyTab/propertyTab.component';
import React from 'react';
import SearchButton from '../searchButton/searchButton.component';
import SearchLocation from '../location/location.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { searchLocations } from '../../redux/city/city.actions';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';
import { selectSearchLocationLoading } from '../../redux/city/city.selectors';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles } from './searchProperty.styles';

const SearchProperty = ({ currentTab }) => {
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [city, setCity] = React.useState({
		_id: '5f2cf831ab6d0b12da114161',
		name: 'Bhubaneswar',
		state: 'Odisha',
		id: '5f2cf831ab6d0b12da114161',
	});
	const [budget, setBudget] = React.useState({
		value: null,
		label: null,
	});
	const [locations, setLocations] = React.useState([]);
	const [budgetList, setBudgetList] = React.useState([]);
	const [anchorElProperty, setAnchorElProperty] = React.useState(null);
	const [types, setTypes] = React.useState({
		flat: false,
		independenthouse: false,
		land: false,
		guesthouse: false,
		hostel: false,
		pg: false,
	});
	React.useEffect(() => {
		setLocations([]);
	}, [city.id]);
	React.useEffect(() => {
		setTypes({
			flat: false,
			independenthouse: false,
			land: false,
			guesthouse: false,
			hostel: false,
			pg: false,
		});
		setBudget({
			value: null,
			label: null,
		});
	}, [currentTab]);

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	const handleCity = (city) => {
		setCity(city);
	};
	const handleClickProperty = (event) => {
		setAnchorElProperty(anchorElProperty ? null : event.currentTarget);
	};
	const handleTypes = (event) => {
		const { checked, name } = event.target;
		setTypes((prevState) => ({ ...prevState, [name]: checked }));
	};

	const onSearch = (_) => {
		const type = Object.keys(types).filter(function (c) {
			if (types[c]) {
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
		if (budget.value) {
			const budgetValue =
				budget.label === 'K'
					? budget.value * 1000
					: budget.value * 100000;
			data.budget = budgetValue;
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
		console.log(link);
		history.push(link);
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

	const budgetClose = (data, label) => {
		if (!data) {
			setAnchorEl(null);
			return;
		}
		setBudget({ value: data, label });
		setAnchorEl(null);
	};

	const typeClosed = () => {
		setAnchorElProperty(null);
	};

	console.log('budget', budgetList);

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
				{(locations.length || budgetList.length) && (
					<Box mt="2rem">
						<Paper
							className={classes.selectedCityWrapper}
							square={true}
						>
							<Box className={classes.bRight} width="100%">
								<Box>
									{locations.length > 0 && (
										<b className={classes.filterHeading}>
											Locations
										</b>
									)}
								</Box>
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
							</Box>

							<Box>
								{budgetList.length > 0 && (
									<b className={classes.filterHeading}>
										Budgets
									</b>
								)}
							</Box>
							{budgetList.map((c, i) => (
								<Box width="100%">
									<Chip
										key={i}
										icon={<LocationCityIcon />}
										label={c.name}
										variant="outlined"
										className={classes.chip}
										onDelete={onDelete(c)}
									/>
								</Box>
							))}
						</Paper>
					</Box>
				)}
				<Box display="flex" className={classes.wrapper}>
					{!mobile && <Menu city={city} handleCity={handleCity} />}
					<Box className={classes.searchBoxWrapper}>
						<SearchLocation
							className={classes.searchField}
							onClick={checkMobile}
							onSelect={onSelect}
							city={city}
						/>
					</Box>

					{!mobile && (
						<div
							className={classes.budgetWrapper}
							onClick={handleClick}
						>
							<div className={classes.budget}>
								{budget.value
									? `${budget.value}${budget.label}`
									: 'Budget'}{' '}
								<ArrowDropDownOutlinedIcon />
							</div>
						</div>
					)}
					{!mobile && (
						<Popper
							id={id}
							open={open}
							anchorEl={anchorEl}
							keepMounted={true}
							disablePortal={true}
						>
							<Paper className={classes.budgetPopper}>
								<Box className={classes.wrapper}>
									<BudgetItems
										currentTab={currentTab}
										close={budgetClose}
										budgetList={budgetList}
										setBudgetList={setBudgetList}
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
									types={types}
									handleTypes={handleTypes}
								/>
							</Paper>
						</Popper>
					)}
					<div className={classes.buttonWrapper}>
						<SearchButton text="Search" onClick={onSearch} />
					</div>
				</Box>
			</div>
		</Box>
	);
};

const styles = makeStyles((theme) => ({
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
		// cursor: 'pointer',
		// textAlign: 'center',
		// '&:hover': {
		// 	backgroundColor: '#cccccc',
		// },
		display: 'flex',
		alignItems: 'center',
	},
	checked: {
		color: theme.colorOne,
	},
}));

const BudgetItems = ({ currentTab, close, budgetList, setBudgetList }) => {
	const classes = styles();
	const click = (data, label) => () => {
		close(data, label);
	};

	const [selectAll, setSelectAll] = React.useState(false);

	const [rentItems, setRentItems] = React.useState(
		Array.from({ length: 20 }, (_, i) => i + 1).map((c) => ({
			name: `${(c - 1) * 5}-${c * 5}K`,
			val: { min: (c - 1) * 5 * 1000, max: c * 5 * 1000 },
			checked: false,
		}))
	);

	const [otherItems, setOtherItems] = React.useState(
		Array.from({ length: 20 }, (_, i) => i + 2).map((c) => ({
			name: `${(c - 2) * 10}-${c * 5}L`,
			val: { min: (c - 2) * 10 * 100000, max: c * 5 * 100000 },
			checked: false,
		}))
	);

	const handleSelectAll = (e) => {
		const { checked } = e.target;
		setSelectAll(checked);
		if (checked) {
			setBudgetList([{ name: 'All' }]);
		} else {
			setBudgetList([]);
		}

		if (currentTab === 'rent') {
			setRentItems((prevState) =>
				prevState.map((c) => {
					c.checked = checked;
					return c;
				})
			);
		} else {
			setOtherItems((prevState) =>
				prevState.map((c) => {
					c.checked = checked;
					return c;
				})
			);
		}
	};

	React.useEffect(() => {
		setRentItems((prevState) =>
			prevState.map((c) => {
				c.checked = false;
				return c;
			})
		);
		setOtherItems((prevState) =>
			prevState.map((c) => {
				c.checked = false;
				return c;
			})
		);
		setSelectAll(false);
	}, [currentTab]);

	const handleRent = (e) => {
		const { name, checked } = e.target;
		setRentItems((prevState) =>
			prevState.map((c) => {
				if (name === c.name) {
					c.checked = checked;
				}
				return c;
			})
		);
	};

	const handleOtherItems = (e) => {
		const { name, checked } = e.target;
		setOtherItems((prevState) =>
			prevState.map((c) => {
				if (name === c.name) {
					c.checked = checked;
				}
				return c;
			})
		);
	};

	return (
		<Paper
			width="250px"
			className={classes.wrapper}
			onMouseLeave={() => close()}
		>
			<Box>
				<div
					className={classes.priceWrapper}
					// onClick={click(c, 'L')}
				>
					<FormControlLabel
						control={
							<Checkbox
								name="flat"
								checked={selectAll}
								onChange={handleSelectAll}
								color="secondary"
								classes={{
									checked: classes.checked,
									colorSecondary: classes.checked,
								}}
							/>
						}
						label="Select All"
					/>
				</div>
				<Divider />
				{currentTab === 'rent'
					? rentItems.map((c) => (
							<div
								key={c}
								className={classes.priceWrapper}
								// onClick={click(c, 'L')}
							>
								<FormControlLabel
									control={
										<Checkbox
											name={c.name}
											checked={c.checked}
											onChange={handleRent}
										/>
									}
									label={c.name}
								/>
							</div>
					  ))
					: otherItems.map((c) => (
							<div
								key={c}
								className={classes.priceWrapper}
								// onClick={click(c, 'L')}
							>
								<FormControlLabel
									control={
										<Checkbox
											name={c.name}
											checked={c.checked}
											onChange={handleOtherItems}
										/>
									}
									label={c.name}
								/>
							</div>
					  ))}
			</Box>
		</Paper>
	);
};

const PropertyItems = ({ currentTab, close, types, handleTypes }) => {
	return (
		<Paper onMouseLeave={() => close()}>
			{currentTab !== 'rent' ? (
				<Box p="1rem">
					{' '}
					<div>
						<FormControlLabel
							control={
								<Checkbox
									name="flat"
									checked={types.flat}
									onChange={handleTypes}
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
									checked={types.independenthouse}
									onChange={handleTypes}
								/>
							}
							label="Independent House"
						/>
					</div>
					<div>
						<FormControlLabel
							control={
								<Checkbox
									name="land"
									checked={types.land}
									onChange={handleTypes}
								/>
							}
							label="Land"
						/>
					</div>
				</Box>
			) : (
				<Box p="1rem">
					{' '}
					<div>
						<FormControlLabel
							control={
								<Checkbox
									name="flat"
									checked={types.flat}
									onChange={handleTypes}
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
									checked={types.independenthouse}
									onChange={handleTypes}
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
									checked={types.guesthouse}
									onChange={handleTypes}
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
									checked={types.hostel}
									onChange={handleTypes}
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
									checked={types.pg}
									onChange={handleTypes}
								/>
							}
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
