import React from 'react';
import { Box, Paper, Grid, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

// Custom Components
import AppBar from '../../components/appBar/appBar.component';
import ResultCard from '../../components/searchResultCardNew/searchResultCard.component';
import Footer from '../../components/footer/footer.component';
import PropertyFilter from '../../components/propertyTypeFilter/propertyTypeFilder.component';
import BudgetFilter from '../../components/budgetFilter/budgetFilter.component';
import FurnishingFilter from '../../components/furnishingFilter/furnishing.component';
import BedRoomFilter from '../../components/bedroomFilter/bedRoom.component';
import LocationFilter from '../../components/locationFilter/locationFilter.component';
import SearchResultLand from '../../components/searchResultCardLand/searchResultCardLand.component';
import RentFlat from '../../components/searchResultCardRentFlat/searchResultCardLand.component';
import RentHostel from '../../components/searchResultCardRentHostel/searchResultCardLand.component';

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
					<Grid item md={8}>
						{currentTab === 'rent' && <RentFlat />}
						<Box mt="1rem">
							{currentTab === 'rent' && <RentHostel />}
						</Box>
						{currentTab === 'sale' &&
							Array.from(Array(6).keys()).map((c) => (
								<Box mt={c && '2rem'} key={c}>
									{c === 1 ? (
										<SearchResultLand />
									) : (
										<ResultCard independent={false} />
									)}
								</Box>
							))}
						<Box mt="2rem">
							<Paper>
								<Box
									p="1rem"
									display="flex"
									justifyContent="center"
								>
									<Pagination count={10} color="primary" />
								</Box>
							</Paper>
						</Box>
					</Grid>
					<Grid item md={4}>
						<Box pl="1rem">
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
