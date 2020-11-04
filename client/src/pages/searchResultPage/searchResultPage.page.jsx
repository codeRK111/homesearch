// import React from 'react';
// import queryString from 'query-string';

// const SearchResultPahe = (props) => {
// const parsed = queryString.parse(props.location.search, {
// 	arrayFormat: 'comma',
// });
// console.log(parsed);
// 	return <div></div>;
// };

// export default SearchResultPahe;

import { Box, Grid, Paper, TextField } from '@material-ui/core';

import AppBar from '../../components/appBar/appBar.component';
import BedRoomFilter from '../../components/bedroomFilter/bedRoom.component';
import BudgetFilter from '../../components/budgetFilter/budgetFilter.component';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import Footer from '../../components/footer/footer.component';
import FurnishingFilter from '../../components/furnishingFilter/furnishing.component';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationFilter from '../../components/locationFilter/locationFilter.component';
import Pagination from '@material-ui/lab/Pagination';
import PropertyFilter from '../../components/propertyTypeFilter/propertyTypeFilder.component';
import React from 'react';
import RentApartment from '../../components/searchResultCardNewRentApartment/searchResultCard.component';
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import { searchProperties } from '../../redux/property/property.actions';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';
import { selectPropertyLoading } from '../../redux/property/property.selectors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './searchResultPage.styles';

// import RentIndHouse from '../../components/searchResultCardNewRentIndHouse/searchResultCard.component';










// import IndHouse from '../../components/searchResultCardNewIndHouse/searchResultCard.component';

// import ProjectApartment from '../../components/searchResultCardNewProjectApartment/searchResultCard.component';
// import ProjectLand from '../../components/searchResultCardNewProjectLand/searchResultCard.component';
// import ProjectVilla from '../../components/searchResultCardNewProjectVilla/searchResultCard.component';

// import RentHostel from '../../components/searchResultCardNewRentHostel/searchResultCard.component';

// import ResultCard from '../../components/searchResultCardNew/searchResultCard.component';
// import ResultLandSale from '../../components/searchResultCardNewLand/searchResultCard.component';

const SearchPage = ({
	currentTab,
	propertyLoading,
	searchProperties,
	...props
}) => {
	const classes = useStyles();
	const mobile = useMediaQuery('(max-width:600px)');
	const [open, setOpen] = React.useState(false);
	const [asyncError, setAsyncError] = React.useState(null);
	const [totalDos, setTotalDocs] = React.useState(0);
	const [data, setData] = React.useState([]);
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data.properties);
			setData(data.properties);
			setTotalDocs(data.count);
		} else {
			setAsyncError(data);
		}
	};
	const parsed = queryString.parse(props.location.search, {
		arrayFormat: 'comma',
	});
	console.log(parsed);

	React.useEffect(() => {
		const body = {
			for: parsed.f,
			city: parsed.c,
		};
		if (parsed.b) {
			body.rent = parsed.b;
		}
		if (parsed.l) {
			if (typeof parsed.l === 'string') {
				body.location = [parsed.l];
			} else {
				body.location = parsed.l;
			}
		}
		if (parsed.t) {
			if (typeof parsed.t === 'string') {
				body.type = [parsed.t];
			} else {
				body.type = parsed.t;
			}
		}
		searchProperties(handleFetchCities, body);
	}, [searchProperties]);
	const handleClick = () => {
		setOpen(!open);
	};

	const filterTypes = (property) => {
		switch (property.type) {
			case 'flat':
				return <RentApartment property={property} />;
			case 'independenthouse':
				return <RentApartment property={property} />;

			default:
				break;
		}
	};

	const renderProperties = (property) => {
		switch (property.for) {
			case 'rent':
				return filterTypes(property);

			default:
				break;
		}
	};

	const renderFilter = () => {
		return mobile ? (
			<Box>
				<ListItem button onClick={handleClick}>
					<ListItemIcon>
						<FilterListIcon />
					</ListItemIcon>
					<ListItemText primary="Filter" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<Box
						className={classes.l5}
						display="flex"
						justifyContent="center"
					>
						<Box className={classes.gridWrapper}>
							<Grid container>
								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<LocationFilter />
								</Grid>
								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<PropertyFilter />
								</Grid>
								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<BedRoomFilter />
								</Grid>
								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<BudgetFilter />
								</Grid>
								{currentTab === 'sale' && (
									<Grid
										item
										xs={6}
										md={2}
										className={classes.gridItemWrapper}
									>
										<FurnishingFilter />
									</Grid>
								)}

								<Grid
									item
									xs={6}
									md={1}
									className={classes.gridItemWrapper}
								>
									<Box
										position="relative"
										width="150px"
										height="100%"
									>
										<button className={classes.apply}>
											Apply
										</button>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Collapse>
			</Box>
		) : (
			<Box className={classes.l5} display="flex" justifyContent="center">
				<Box className={classes.gridWrapper}>
					<Grid container>
						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<LocationFilter />
						</Grid>
						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<PropertyFilter />
						</Grid>
						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<BedRoomFilter />
						</Grid>
						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<BudgetFilter />
						</Grid>
						{currentTab === 'sale' && (
							<Grid
								item
								xs={6}
								md={2}
								className={classes.gridItemWrapper}
							>
								<FurnishingFilter />
							</Grid>
						)}

						<Grid
							item
							xs={6}
							md={1}
							className={classes.gridItemWrapper}
						>
							<Box
								position="relative"
								width="150px"
								height="100%"
							>
								<button className={classes.apply}>Apply</button>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
		);
	};
	return (
		<Box>
			<AppBar />
			{renderFilter()}
			<Box className={[classes.resultsWrapper, classes.l5].join(' ')}>
				{data.length > 0 && (
					<p>
						{' '}
						<b>{data.length}</b> properties found for{' '}
						<b>{data[0].city.name}</b>
					</p>
				)}
				<Grid container spacing={3}>
					{propertyLoading ? (
						<Grid item xs={12} md={8}>
							<Skeleton height="10rem" width="100%" />
						</Grid>
					) : (
						<Grid item xs={12} md={8}>
							{data.map((p) => (
								<Box mt="1rem">{renderProperties(p)}</Box>
							))}
							{/* {currentTab === 'project' && <ProjectApartment />}
							<Box mt="1rem">
								{currentTab === 'project' && <ProjectVilla />}
							</Box>
							<Box mt="1rem">
								{currentTab === 'project' && <ProjectLand />}
							</Box> */}
							{/* {currentTab === 'rent' && <RentApartment />} */}
							{/* <Box mt="1rem">
								{currentTab === 'rent' && <RentIndHouse />}
							</Box>
							{currentTab === 'rent' && (
								<Box mt="1rem">
									<RentHostel independent={true} />
								</Box>
							)}
							{currentTab === 'sale' && (
								<Box mt="1rem">
									<ResultCard independent={true} />
								</Box>
							)}
							{currentTab === 'sale' && (
								<Box mt="1rem">
									<IndHouse />
								</Box>
							)}
							{currentTab === 'sale' && (
								<Box mt="1rem">
									<ResultLandSale />
								</Box>
							)} */}

							<Box mt="2rem">
								<Paper>
									<Box
										p="1rem"
										display="flex"
										justifyContent="center"
									>
										<Pagination
											count={totalDos / data.length}
											color="primary"
										/>
									</Box>
								</Paper>
							</Box>
						</Grid>
					)}

					<Grid item xs={12} md={4}>
						<Box className={classes.smLeft}>
							<Paper>
								<Box p="1rem">
									<h3 className={classes.center}>
										Request a call back
									</h3>
									<Box mt="2rem" mb="2rem">
										<TextField
											placeholder="Full Name"
											fullWidth
										/>
									</Box>
									<Box mt="2rem" mb="2rem">
										<TextField
											placeholder="Email"
											type="email"
											fullWidth
										/>
									</Box>
									<Box mt="2rem" mb="2rem">
										<TextField
											placeholder="Phone Number"
											type="number"
											fullWidth
										/>
									</Box>
									<Box
										mt="2rem"
										mb="2rem"
										position="relative"
										height="40px"
									>
										<button className={classes.button}>
											Talk To Our Expert
										</button>
									</Box>
								</Box>
							</Paper>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box>
				<Footer />
			</Box>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
	propertyLoading: selectPropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchProperties: (callback, body) =>
		dispatch(searchProperties({ callback, body })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
