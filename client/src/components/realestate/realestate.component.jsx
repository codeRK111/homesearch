import { Avatar, Box, Button, Card, CardHeader, Grid } from '@material-ui/core';
import {
	selectGetPropertyCountLoading,
	selectProjectCount,
	selectRentCount,
	selectSaleCount,
} from '../../redux/property/property.selectors';

import BusinessIcon from '@material-ui/icons/Business';
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
		backgroundColor: '#8e44ad',
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
	fullHeight: {
		height: '100%',
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
			<Box mt="4rem" p="1rem">
				<Grid container spacing={3}>
					<Grid item xs={12} md={4}>
						<Card className={classes.fullHeight} elevation={1}>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<EmojiTransportationIcon
									className={classes.icon}
								/>
								<b>Project in {defaultCity.name}</b>
								<Box mt="2rem" width="100%">
									{loading && <Skeleton count={3} />}
									{!loading && project && (
										<div>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														A
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="Apartment"
												subheader={`${project.apartment} properties`}
											/>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														I
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="Independent House"
												subheader={`${project.villa} properties`}
											/>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														L
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="Land"
												subheader={`${project.land} properties`}
											/>
										</div>
									)}
								</Box>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card className={classes.fullHeight}>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<BusinessIcon className={classes.icon} />
								<b>Resale property in {defaultCity.name}</b>
								<Box mt="2rem" width="100%">
									{loading && <Skeleton count={3} />}
									{!loading && sale && (
										<div>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														A
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="Apartment"
												subheader={`${sale.apartment} properties`}
											/>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														I
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="Independent House"
												subheader={`${sale.villa} properties`}
											/>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														L
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="Land"
												subheader={`${sale.land} properties`}
											/>
										</div>
									)}
								</Box>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card className={classes.fullHeight}>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<LocationCityIcon className={classes.icon} />
								<b>Rental property in {defaultCity.name}</b>
								<Box mt="2rem" width="100%">
									{loading && <Skeleton count={3} />}
									{!loading && rent && (
										<div>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														A
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="Apartment"
												subheader={`${rent.apartment} properties`}
											/>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														I
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="Independent House"
												subheader={`${rent.villa} properties`}
											/>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														H
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="Hostel"
												subheader={`${rent.hostel} properties`}
											/>
											<CardHeader
												avatar={
													<Avatar
														aria-label="recipe"
														className={
															classes.avatar
														}
													>
														P
													</Avatar>
												}
												action={
													<Button size="small">
														View All
													</Button>
												}
												title="PG"
												subheader={`${rent.PG} properties`}
											/>
										</div>
									)}
								</Box>
							</Box>
						</Card>
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
