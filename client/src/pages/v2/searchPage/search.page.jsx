import { Box, Grid, Typography } from '@material-ui/core';
import {
	setCurrentTab,
	setSelectedCity,
} from '../../../redux/actionTab/actionTab.actions';

import ErrorCard from '../../../components/errorCard/errorCard.component';
import Filter from './filter.component';
import Nav from '../../../components/v2/pageNav/nav.component';
import React from 'react';
import SearchCardProjectFlat from '../../../components/v2/searchCard2/project/flat.component';
import SearchCardProjectLand from '../../../components/v2/searchCard2/project/land.component';
import SearchCardRentFlat from '../../../components/v2/searchCard2/rent/flat-v2.component';
import SearchCardRentHostel from '../../../components/v2/searchCard2/rent/hostel.component';
import SearchCardSaleFlat from '../../../components/v2/searchCard2/sale/flat.component';
import SearchCardSaleLand from '../../../components/v2/searchCard2/sale/land.component';
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
import useStyles from './searchPage.style';

const SearchPage = ({
	propertyLoading,
	searchProperties,
	setCurrentTab,
	setSelectedCity,
	...props
}) => {
	const classes = useStyles();

	const globalClasses = useGlobalStyles();
	const [asyncError, setAsyncError] = React.useState(null);
	// const [totalDos, setTotalDocs] = React.useState(0);
	const [page, setPage] = React.useState(1);
	const [initial, setInitial] = React.useState(1);
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
			// setTotalDocs(data.count);
			setPropertyItems(data.propertyItems);
		} else {
			setAsyncError(data);
		}
	};

	const type = Object.keys(types).filter(function (c) {
		if (types[c]) {
			return true;
		} else {
			return false;
		}
	});

	const filterTypes = (property) => {
		switch (property.type) {
			case 'flat':
			case 'independenthouse':
				return <SearchCardRentFlat property={property} />;
			// case 'independenthouse':
			// 	return <RentApartment property={property} />;
			case 'hostel':
			case 'pg':
				return <SearchCardRentHostel property={property} />;

			default:
				break;
		}
	};
	const filterTypesSale = (property) => {
		switch (property.sale_type) {
			case 'flat':
			case 'independenthouse':
				return <SearchCardSaleFlat property={property} />;

			case 'land':
				return <SearchCardSaleLand property={property} />;

			// case 'independenthouse':
			// 	return <ResaleVilla property={property} />;

			default:
				break;
		}
	};

	const filterTypesProject = (property) => {
		switch (property.projectType) {
			case 'flat':
			case 'independenthouse':
				return (
					<SearchCardProjectFlat
						property={property}
						propertyItems={propertyItems.filter(
							(c) => c.project === property.id
						)}
					/>
				);
			case 'land':
				return (
					<SearchCardProjectLand
						property={property}
						propertyItems={propertyItems.filter(
							(c) => c.project === property.id
						)}
					/>
				);

			default:
				break;
		}
	};

	const renderProperties = (property) => {
		switch (property.for) {
			case 'rent':
				return filterTypes(property);
			case 'sale':
				return filterTypesSale(property);

			default:
				return filterTypesProject(property);
		}
	};

	React.useEffect(() => {
		setPFor(parsed.f);
		setCurrentTab(parsed.f);
		setSelectedCity({
			id: parsed.c,
			name: parsed.cn,
		});
		const body = {
			for: parsed.f,
			city: parsed.c,
			page,
		};
		if (type.length > 0) {
			body.type = type;
		}
		if (locations.length > 0) {
			body.locations = locations;
		}

		if (parsed.t && initial === 1) {
			if (typeof parsed.t === 'string') {
				body.type = [parsed.t];
			} else {
				body.type = parsed.t;
			}

			body.type.forEach((c) => {
				setTypes((prevState) => ({
					...prevState,
					[c]: true,
				}));
			});
			setInitial(initial + 1);
		}

		handleCity({
			id: parsed.c,
			name: parsed.cn,
		});
		let budgetList;
		if (parsed.f === 'rent') {
			budgetList = rentItems.filter((c) => c.checked).map((b) => b.val);
		} else {
			budgetList = otherItems.filter((c) => c.checked).map((b) => b.val);
		}
		if (budgetList.length > 0) {
			body.budgetList = budgetList;
		}

		searchProperties(handleFetchCities, body);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		searchProperties,
		page,
		props.location.search,
		locations,
		type.length,
		rentItems,
		otherItems,
	]);
	return (
		<div>
			<Nav />

			<div className={classes.wrapper}>
				<Box mb="1rem">
					<Box
						p="1rem"
						className={clsx(
							globalClasses.justifySpaceBetween,
							globalClasses.alignCenter,
							globalClasses.smFlexColumn,
							globalClasses.smAlignCenter,
							globalClasses.borderBox
						)}
					>
						<span>
							Home/ {capitalizeFirstLetter(parsed.f)}/{' '}
							{capitalizeFirstLetter(parsed.cn)}
						</span>
					</Box>
				</Box>
				<Box className={classes.filterParent}>
					<Filter
						city={city.id}
						existingLocations={locations}
						handleLocations={setLocations}
						setLocationData={setLocationData}
						pFor={pFor}
						types={types}
						setTypes={setTypes}
						rentItems={rentItems}
						setRentItems={setRentItems}
						otherItems={otherItems}
						setOtherItems={setOtherItems}
					/>
				</Box>
				<Grid container spacing={0}>
					<Grid items xs={12} md={8}>
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
	setCurrentTab: (tab) => dispatch(setCurrentTab(tab)),
	setSelectedCity: (tab) => dispatch(setSelectedCity(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
