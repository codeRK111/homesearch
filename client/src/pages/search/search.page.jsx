import React from 'react';
import { Box, Paper, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';

// Custom Components
import AppBar from '../../components/appBar/appBar.component';
import BreadCumb from '../../components/breadcumb/breadCumb.component';
import ResultCard from '../../components/searchResultCard/searchResultCard.component';
import Footer from '../../components/footer/footer.component';
import PropertyFilter from '../../components/propertyTypeFilter/propertyTypeFilder.component';
import BudgetFilter from '../../components/budgetFilter/budgetFilter.component';
import FurnishingFilter from '../../components/furnishingFilter/furnishing.component';
import BedRoomFilter from '../../components/bedroomFilter/bedRoom.component';
import LegalFilter from '../../components/legalClearanceFilter/legalClearanceFilter.component';
import SearchResultLand from '../../components/searchResultCardLand/searchResultCardLand.component';

// Styles
import useStyles from './search.styles';

const SearchPage = () => {
	const classes = useStyles();
	return (
		<Box>
			<AppBar />
			<Box
				pt="2rem"
				display="flex"
				justifyContent="center"
				className={classes.l5}
			>
				<BreadCumb />
			</Box>
			<Box
				className={[classes.searchWrapper, classes.l5, classes.r5].join(
					' '
				)}
			>
				<p>You are looking in</p>
				<Paper className={classes.searchBoxWrapper} elevation={3}>
					<SearchIcon />
					<input
						type="text"
						className={classes.input}
						value="Patia"
					/>
				</Paper>
			</Box>
			<Box className={classes.l5} display="flex" justifyContent="center">
				<Box className={classes.gridWrapper}>
					<Grid container>
						<Grid
							item
							xs={6}
							md={2}
							className={classes.gridItemWrapper}
						>
							<PropertyFilter />
						</Grid>
						<Grid
							item
							xs={6}
							md={2}
							className={classes.gridItemWrapper}
						>
							<BudgetFilter />
						</Grid>
						<Grid
							item
							xs={6}
							md={2}
							className={classes.gridItemWrapper}
						>
							<FurnishingFilter />
						</Grid>
						<Grid
							item
							xs={6}
							md={2}
							className={classes.gridItemWrapper}
						>
							<BedRoomFilter />
						</Grid>
						<Grid
							item
							xs={6}
							md={2}
							className={classes.gridItemWrapper}
						>
							<LegalFilter />
						</Grid>
						<Grid
							item
							xs={6}
							md={2}
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
					<Grid item md={12}>
						{Array.from(Array(6).keys()).map((c) => (
							<Box mt={c && '2rem'} key={c}>
								{c === 1 ? (
									<SearchResultLand />
								) : (
									<ResultCard
										independent={c % 2 === 0 ? true : false}
									/>
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
				</Grid>
			</Box>
			<Box>
				<Footer />
			</Box>
		</Box>
	);
};

export default SearchPage;
