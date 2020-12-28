import { Box, Grid } from '@material-ui/core';
import {
	selectGetPropertyCountLoading,
	selectProjectCount,
	selectRentCount,
	selectSaleCount,
} from '../../redux/property/property.selectors';

import BusinessIcon from '@material-ui/icons/Business';
import Counter from '../propertyCounter/propertyCounter.component';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import React from 'react';
import Skeleton from '../skeleton/propertyCount.skeleton';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPropertyCount } from '../../redux/property/property.actions';
import { makeStyles } from '@material-ui/core/styles';
import { selectDefaultCity } from '../../redux/city/city.selectors';

// Custom Components

const useStyles = makeStyles((theme) => ({
	benifit: {
		color: theme.fontColor,
		textAlign: 'center',
	},
	title: {
		textAlign: 'center',
	},
	description: {
		textAlign: 'center',
		color: theme.fontColor,
		padding: '1rem',
	},
	link: {
		color: theme.colorTwo,
		textDecoration: 'none',
	},
	avatar: {
		width: '6rem',
		height: '6rem',
		backgroundColor: 'transparent',
		marginBottom: '0.5rem',
		boxShadow:
			'0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
	},
	icon: {
		fontSize: '3rem',
		color: theme.colorTwo,
		transition: '0.5s all ease-in-out',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(1.3)',
			color: theme.colorOne,
		},
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	benifitWrapper: {
		borderRight: '1px solid #cccccc',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			marginTop: '1rem',
		},
	},
}));

const Benifits = ({ defaultCity, loading, project, rent, sale, getCount }) => {
	const classes = useStyles();
	React.useEffect(() => {
		getCount(defaultCity.id, () => {});
	}, [defaultCity.id, getCount]);
	return (
		<Box>
			<h2 className={classes.title}>{defaultCity.name} Real Estate</h2>
			<p className={classes.description}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
				necessitatibus impedit voluptates minus sunt commodi
				consequuntur porro perferendis quasi ducimus assumenda
				molestiae, minima itaque iusto eveniet laboriosam pariatur
				corrupti? Sint, consequatur ex rerum, et omnis vitae ratione
				impedit provident quam voluptates dolorum, molestiae voluptatem
				asperiores? Illo quisquam maxime mollitia? Quidem repudiandae
				minus quos adipisci sed ad et eos aliquam ullam. Nihil
				accusantium, in ad voluptatem quod numquam voluptates commodi
				praesentium, atque alias impedit quia. Modi quibusdam ducimus ea
				repellat quod.
			</p>
			<Box mt="4rem">
				<Grid container spacing={0}>
					<Grid item xs={12} md={4}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							className={classes.benifitWrapper}
						>
							<EmojiTransportationIcon className={classes.icon} />

							<b>Project in {defaultCity.name}</b>
							<Box mt="2rem" width="100%">
								{loading && <Skeleton count={3} />}
								{!loading && project && (
									<Counter
										pFor="project"
										city={defaultCity}
										details={[
											{
												label: 'Apartment',
												value: project.apartment,
												type: 'flat',
											},
											{
												label: 'Independent House',
												value: project.villa,
												type: 'independenthouse',
											},
											{
												label: 'Land',
												value: project.land,
												type: 'land',
											},
										]}
									/>
								)}
							</Box>
							{/* <p className={classes.description}>
								Lorem ipsum dolor sit amet consectetur,
								adipisicing elit. Quae ut eum, nisi eveniet unde
							</p>
							<Box>
								<Link className={classes.link} to="/">
									View all &#8594;
								</Link>
							</Box> */}
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							className={classes.benifitWrapper}
						>
							<BusinessIcon className={classes.icon} />

							<b>Resale property in {defaultCity.name}</b>
							<Box mt="2rem" width="100%">
								{loading && <Skeleton count={3} />}
								{!loading && sale && (
									<Counter
										pFor="sale"
										city={defaultCity}
										details={[
											{
												label: 'Apartment',
												value: sale.apartment,
												type: 'flat',
											},
											{
												label: 'Independent House',
												value: sale.villa,
												type: 'independenthouse',
											},
											{
												label: 'Land',
												value: sale.land,
												type: 'land',
											},
										]}
									/>
								)}
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							className={classes.benifitWrapper}
						>
							<LocationCityIcon className={classes.icon} />

							<b>Rental property in {defaultCity.name}</b>
							<Box mt="2rem" width="100%">
								{loading && <Skeleton count={3} />}
								{!loading && rent && (
									<Counter
										pFor="rent"
										city={defaultCity}
										details={[
											{
												label: 'Apartment',
												value: rent.apartment,
												type: 'flat',
											},
											{
												label: 'Independent House',
												value: rent.villa,
												type: 'independenthouse',
											},
											{
												label: 'Hostel',
												value: rent.hostel,
												type: 'hostel',
											},
											{
												label: 'PG',
												value: rent.PG,
												type: 'pg',
											},
										]}
									/>
								)}
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	defaultCity: selectDefaultCity,
	loading: selectGetPropertyCountLoading,
	project: selectProjectCount,
	rent: selectRentCount,
	sale: selectSaleCount,
});

const mapDispatchToProps = (dispatch) => ({
	getCount: (id, callback) => dispatch(getPropertyCount({ id, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Benifits);
