import React from 'react';
import { Box, Paper, Grid, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

// Custom Components
import AppBar from '../../components/appBar/appBar.component';
import ResultCard from '../../components/searchResultCardNew/searchResultCard.component';
import IndHouse from '../../components/searchResultCardNewIndHouse/searchResultCard.component';
import ResultLandSale from '../../components/searchResultCardNewLand/searchResultCard.component';
import Footer from '../../components/footer/footer.component';
import PropertyFilter from '../../components/propertyTypeFilter/propertyTypeFilder.component';
import BudgetFilter from '../../components/budgetFilter/budgetFilter.component';
import FurnishingFilter from '../../components/furnishingFilter/furnishing.component';
import BedRoomFilter from '../../components/bedroomFilter/bedRoom.component';
import LocationFilter from '../../components/locationFilter/locationFilter.component';

// Rent
import RentApartment from '../../components/searchResultCardNewRentApartment/searchResultCard.component';
import RentIndHouse from '../../components/searchResultCardNewRentIndHouse/searchResultCard.component';
import RentHostel from '../../components/searchResultCardNewRentHostel/searchResultCard.component';

// Project
// import ProjectApartment from '../../components/searchResultCardNewProjectApartment/searchResultCard.component';

// Styles
import useStyles from './search.styles';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';

const SearchPage = ({ currentTab }) => {
	const classes = useStyles();
	return (
		<Box>
			<AppBar />

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
			<Box className={[classes.resultsWrapper, classes.l5].join(' ')}>
				<p>
					{' '}
					<b>283</b> properties found for <b>Bhubaneswar</b>{' '}
				</p>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
						{currentTab === 'rent' && <RentApartment />}
						<Box mt="1rem">
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
						)}

						<Box mt="2rem">
							<Paper>
								<Box
									p="1rem"
									display="flex"
									justifyContent="center"
								>
									<Pagination count={5} color="primary" />
								</Box>
							</Paper>
						</Box>
					</Grid>
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
});

export default connect(mapStateToProps, null)(SearchPage);
