import { Box, Grid } from '@material-ui/core';

import ErrorCard from '../../components/errorCard/errorCard.component';
import { Link } from 'react-router-dom';
import ProjectApartment from './apartment.component';
import ProjectLand from './land.component';
import React from 'react';
import Skeleton from '../skeleton/similarProperties.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { searchProperties } from '../../redux/property/property.actions';
import { selectPropertyLoading } from '../../redux/property/property.selectors';

// Custom Components

const useStyles = makeStyles((theme) => ({
	title: {
		textAlign: 'center',
	},

	wrapper: {
		backgroundColor: theme.fontColorThree,
		padding: '2rem',
	},
	link: {
		color: theme.colorTwo,
		textDecoration: 'none',
		fontSize: '1.1rem',
	},
}));
const Row = ({ type, city, propertyLoading, searchProperties, exclude }) => {
	const classes = useStyles();
	const [noResults, setNoResults] = React.useState(false);
	const [asyncError, setAsyncError] = React.useState(null);
	const [totalDos, setTotalDocs] = React.useState(0);
	const [data, setData] = React.useState([]);
	const [propertyItems, setPropertyItems] = React.useState([]);

	const handleFetchCities = (status, data = null) => {
		if (status === 'success') {
			setAsyncError(null);
			console.log(data.properties);
			setData(data.properties);
			if (data.properties.length === 0) {
				setNoResults(true);
			} else {
				setNoResults(false);
			}
			setTotalDocs(data.count);
			setPropertyItems(data.propertyItems);
		} else {
			setAsyncError(data);
		}
	};

	React.useEffect(() => {
		const body = {
			for: 'project',
			city: city.id,
			type: [type],
			limit: 4,
		};

		searchProperties(handleFetchCities, body);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchProperties]);

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

	return (
		<div className={classes.wrapper}>
			<Box>
				{asyncError && <ErrorCard message={asyncError} />}
				{noResults && !propertyLoading && (
					<Box display="flex" justifyContent="center">
						<h4>No results found</h4>
					</Box>
				)}
				{propertyLoading ? (
					<Box>
						<Skeleton />
					</Box>
				) : (
					!asyncError && (
						<Box mt="1rem">
							<Grid container spacing={5}>
								{data
									.filter((b) => b.id !== exclude)
									.map((p) => filterTypesProject(p))}
							</Grid>
						</Box>
					)
				)}
			</Box>
			{totalDos > 3 ? (
				<Box mt="2rem" display="flex" justifyContent="center">
					<Link
						className={classes.link}
						to={`/browse?f=project&c=${
							city.id
						}&cn=${encodeURIComponent(city.name)}&t=${[type]}&p=1`}
						target="_blank"
					>
						View all &#8594;
					</Link>
				</Box>
			) : (
				''
			)}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	propertyLoading: selectPropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
	searchProperties: (callback, body) =>
		dispatch(searchProperties({ callback, body })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);
