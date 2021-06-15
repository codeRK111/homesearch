import { Box, Grid, Paper, Typography } from '@material-ui/core';

import ErrorCard from '../../../components/errorCard/errorCard.component';
import Filter from './filter.component';
import Nav from '../../../components/v2/pageNav/nav.component';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import SearchCardRentFlat from '../../../components/v2/searchCard2/rent/flat.component';
import SearchCardSaleFlat from '../../../components/v2/searchCard2/sale/flat.component';
import SearchCardSaleIndependent from '../../../components/v2/searchCard2/sale/independent.component';
import Skeleton from '../../../components/searchCardSkeleton/searchCardSkeleton.component';
import { capitalizeFirstLetter } from '../../../utils/render.utils';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import { searchProperties } from '../../../redux/property/property.actions';
import { selectCurrentTab } from '../../../redux/actionTab/actionTab.selectors';
import { selectPropertyLoading } from '../../../redux/property/property.selectors';
import useGlobalStyles from '../../../common.style';
import { useHistory } from 'react-router-dom';
import useStyles from './searchPage.style';

const SearchPage = ({ propertyLoading, searchProperties, ...props }) => {
	const classes = useStyles();

	const history = useHistory();
	const globalClasses = useGlobalStyles();
	const [asyncError, setAsyncError] = React.useState(null);
	const [totalDos, setTotalDocs] = React.useState(0);
	const [page, setPage] = React.useState(1);
	const [data, setData] = React.useState([]);
	const [showNoResults, setShowNoResults] = React.useState(false);
	const [propertyItems, setPropertyItems] = React.useState([]);
	const parsed = queryString.parse(props.location.search, {
		arrayFormat: 'comma',
	});
	const [rentItems, setRentItems] = React.useState(
		Array.from({ length: 20 }, (_, i) => i + 1).map((c) => ({
			name: `${(c - 1) * 5}-${c * 5}K`,
			val: { min: (c - 1) * 5 * 1000, max: c * 5 * 1000 },
			checked: false,
		}))
	);

	const [otherItems, setOtherItems] = React.useState(
		Array.from({ length: 20 }, (_, i) => i + 1).map((c) => ({
			name: `${(c - 1) * 5}-${c === 20 ? 'Above' : `${c * 5}L`}`,
			val: {
				min: (c - 1) * 5 * 100000,
				max: c * 5 * (c === 20 ? 10000000 : 100000),
			},
			checked: false,
		}))
	);
	const [pFor, setPFor] = React.useState('rent');
	const [types, setTypes] = React.useState({
		flat: false,
		independenthouse: false,
		land: false,
		guesthouse: false,
		hostel: false,
		pg: false,
	});
	const [locations, setLocations] = React.useState([]);
	const [locationData, setLocationData] = React.useState([]);
	const [city, setCity] = React.useState({
		id: null,
		name: null,
	});

	const handleCity = (data) => setCity(data);

	const handleChangePage = (event, value) => {
		setPage(value);
		// onSearch();
	};
	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data.properties);
			if (data.properties.length === 0) {
				setShowNoResults(true);
			} else {
				setShowNoResults(false);
			}
			setData(data.properties);
			setTotalDocs(data.count);
			setPropertyItems(data.propertyItems);
		} else {
			setAsyncError(data);
		}
	};

	const filterTypes = (property) => {
		switch (property.type) {
			case 'flat':
				return <SearchCardRentFlat property={property} />;
			// case 'independenthouse':
			// 	return <RentApartment property={property} />;
			// case 'hostel':
			// case 'pg':
			// 	return <RentHostel property={property} />;

			default:
				break;
		}
	};
	const filterTypesSale = (property) => {
		switch (property.sale_type) {
			case 'flat':
				return <SearchCardSaleFlat property={property} />;
			case 'independenthouse':
				return <SearchCardSaleIndependent property={property} />;

			// case 'land':
			// 	return <ResaleLand property={property} />;

			// case 'independenthouse':
			// 	return <ResaleVilla property={property} />;

			default:
				break;
		}
	};

	// const filterTypesProject = (property) => {
	// 	switch (property.projectType) {
	// 		case 'flat':
	// 		case 'independenthouse':
	// 			return (
	// 				<ProjectApartment
	// 					property={property}
	// 					propertyItems={propertyItems.filter(
	// 						(c) => c.project === property.id
	// 					)}
	// 				/>
	// 			);
	// 		case 'land':
	// 			return (
	// 				<ProjectLand
	// 					property={property}
	// 					propertyItems={propertyItems.filter(
	// 						(c) => c.project === property.id
	// 					)}
	// 				/>
	// 			);

	// 		// case 'land':
	// 		// 	return <ResaleLand property={property} />;

	// 		// case 'independenthouse':
	// 		// 	return <ResaleVilla property={property} />;

	// 		default:
	// 			break;
	// 	}
	// };

	const renderProperties = (property) => {
		switch (property.for) {
			case 'rent':
				return filterTypes(property);
			case 'sale':
				return filterTypesSale(property);

			// default:
			// 	return filterTypesProject(property);
		}
	};

	React.useEffect(() => {
		setPFor(parsed.f);
		const body = {
			for: parsed.f,
			city: parsed.c,
			page,
		};
		if (locations.length > 0) {
			body.locations = locations;
		}
		handleCity({
			id: parsed.c,
			name: parsed.cn,
		});

		searchProperties(handleFetchCities, body);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchProperties, page, props.location.search, locations]);
	return (
		<div>
			<Nav />
			<div className={classes.wrapper}>
				<Box mb="1rem">
					<Filter
						city={city.id}
						existingLocations={locations}
						handleLocations={setLocations}
						setLocationData={setLocationData}
						pFor={pFor}
						types={types}
						setTypes={setTypes}
						pFor={pFor}
						rentItems={rentItems}
						setRentItems={setRentItems}
						otherItems={otherItems}
						setOtherItems={setOtherItems}
					/>
				</Box>
				<Grid container>
					<Grid items xs={12} md={8}>
						<Box
							p="1rem"
							className={clsx(
								globalClasses.justifySpaceBetween,
								globalClasses.alignCenter,
								globalClasses.smFlexColumn,
								globalClasses.smAlignCenter
							)}
						>
							<span>
								Home/ {capitalizeFirstLetter(parsed.f)}/{' '}
								{capitalizeFirstLetter(parsed.cn)}
							</span>
							<h3
								className={clsx(
									globalClasses.colorPrimary,
									globalClasses.noSpace,
									globalClasses.smTopMargin
								)}
							>
								{capitalizeFirstLetter(parsed.f)}s In{' '}
								{capitalizeFirstLetter(parsed.cn)}
							</h3>
						</Box>
						<Box>
							{showNoResults && (
								<Box mt="2rem">
									<Typography align="center">
										No results found
									</Typography>
								</Box>
							)}
							{asyncError && <ErrorCard message={asyncError} />}
							{propertyLoading ? (
								<Box>
									<Skeleton />
									<Box mt="1rem">
										<Skeleton />
									</Box>
								</Box>
							) : (
								!asyncError &&
								data.map((p) => (
									<Box mt="1rem" key={p.id}>
										{renderProperties(p)}
									</Box>
								))
							)}
						</Box>

						{/* {Array.from({ length: 3 }, (_, idx) => `${++idx}`).map(
							(c) => (
								<Box mt="1rem" key={c}>
									<SearchCard />
								</Box>
							)
						)} */}
					</Grid>
					<Grid items xs={12} md={4}></Grid>
				</Grid>
			</div>
		</div>
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
