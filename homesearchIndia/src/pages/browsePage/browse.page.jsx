import { Box, Grid, Paper } from '@material-ui/core';

import AppBar from '../../components/appBar/appBar.component';
import ErrorCard from '../../components/errorCard/errorCard.component';
import Footer from '../../components/footer/footer.component';
import Pagination from '@material-ui/lab/Pagination';
import ProjectApartment from '../../components/searchResultCardNewProjectApartment/searchResultCard.component';
import ProjectLand from '../../components/searchResultCardNewProjectLand/searchResultCard.component';
import React from 'react';
import RentApartment from '../../components/searchResultCardNewRentApartment/searchResultCard.component';
import RentHostel from '../../components/searchResultCardNewRentHostel/searchResultCard.component';
import ResaleApartment from '../../components/searchResultCardNew/searchResultCard.component';
import ResaleLand from '../../components/searchResultCardNewLand/searchResultCard.component';
import ResaleVilla from '../../components/searchResultCardNewIndHouse/searchResultCard.component';
import Skeleton from '../../components/searchCardSkeleton/searchCardSkeleton.component';
import TalkToOurExpert from '../../components/talkToExpert/talkToExpert.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import { searchProperties } from '../../redux/property/property.actions';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';
import { selectPropertyLoading } from '../../redux/property/property.selectors';
import { useHistory } from 'react-router-dom';
import useStyles from '../searchResultPage/searchResultPage.styles';

const SearchPage = ({
	currentTab,
	propertyLoading,
	searchProperties,
	...props
}) => {
	const history = useHistory();
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState(null);
	const [totalDos, setTotalDocs] = React.useState(0);
	const [data, setData] = React.useState([]);
	const [propertyItems, setPropertyItems] = React.useState([]);
	const handleChange = (event, value) => {
		const data = queryString.parse(props.location.search, {
			arrayFormat: 'comma',
		});
		data['p'] = value;
		const url = queryString.stringify(data);
		history.push(`/browse?${url}`);
	};

	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data.properties);
			setData(data.properties);
			setTotalDocs(data.count);
			setPropertyItems(data.propertyItems);
		} else {
			setAsyncError(data);
		}
	};

	const parsed = queryString.parse(props.location.search, {
		arrayFormat: 'comma',
	});

	React.useEffect(() => {
		const body = {
			for: parsed.f,
			city: parsed.c,
		};
		if (parsed.b) {
			body.price = parsed.b;
		}
		if (parsed.p) {
			body.page = Number(parsed.p);
		}

		if (parsed.l) {
			if (typeof parsed.l === 'string') {
				body.locations = [parsed.l];
			} else {
				body.locations = parsed.l;
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchProperties, parsed.p]);

	const filterTypes = (property) => {
		switch (property.type) {
			case 'flat':
				return <RentApartment property={property} />;
			case 'independenthouse':
				return <RentApartment property={property} />;
			case 'hostel':
			case 'pg':
				return <RentHostel property={property} />;

			default:
				break;
		}
	};
	const filterTypesSale = (property) => {
		switch (property.sale_type) {
			case 'flat':
				return <ResaleApartment property={property} />;

			case 'land':
				return <ResaleLand property={property} />;

			case 'independenthouse':
				return <ResaleVilla property={property} />;

			default:
				break;
		}
	};

	const filterTypesProject = (property) => {
		switch (property.projectType) {
			case 'flat':
			case 'independenthouse':
				return (
					<ProjectApartment
						property={property}
						propertyItems={propertyItems.filter(
							(c) => c.project === property.id
						)}
					/>
				);
			case 'land':
				return (
					<ProjectLand
						property={property}
						propertyItems={propertyItems.filter(
							(c) => c.project === property.id
						)}
					/>
				);

			// case 'land':
			// 	return <ResaleLand property={property} />;

			// case 'independenthouse':
			// 	return <ResaleVilla property={property} />;

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

	return (
		<Box>
			<AppBar />

			{/* {renderFilter()} */}
			<Box className={[classes.resultsWrapper, classes.l5].join(' ')}>
				<p>
					{' '}
					<b>{totalDos}</b> properties found for <b>{parsed.cn}</b>
				</p>

				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
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
						{!asyncError && data.length > 0 && (
							<Box mt="2rem">
								<Paper>
									<Box
										p="1rem"
										display="flex"
										justifyContent="center"
									>
										<Pagination
											count={Math.round(totalDos / 10)}
											color="primary"
											page={Number(parsed.p)}
											onChange={handleChange}
										/>
									</Box>
								</Paper>
							</Box>
						)}
					</Grid>

					<Grid item xs={12} md={4}>
						<Box className={classes.smLeft}>
							<Paper>
								<TalkToOurExpert />
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
