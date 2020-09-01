import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import PeopleIcon from '@material-ui/icons/People';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ApartmentIcon from '@material-ui/icons/Apartment';
import useFetch from './useFetch';
import Backdrop from '@material-ui/core/Backdrop';
import BusinessIcon from '@material-ui/icons/Business';
import DomainDisabledIcon from '@material-ui/icons/DomainDisabled';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const useStyle = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	textCenter: {
		textAlign: 'center',
	},
	largeFont: {
		fontSize: '2.5rem',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const initialState = {
	admins: '',
	users: '',
	cities: '',
	locations: '',
	activeProperties: '',
	underScreeningProperties: '',
	expiredProperties: '',
};

const Dashboard = () => {
	const classes = useStyle();
	const { response, error, isLoading } = useFetch(
		'/api/v1/admin/features/get-resources-count',
		initialState
	);

	return (
		<Box m={'2rem'}>
			<Backdrop className={classes.backdrop} open={isLoading}>
				Loading..
			</Backdrop>
			<h3 className={classes.textCenter}>Welcome to Homesearch18</h3>
			<p>{error}</p>
			<Box mt="3rem">
				<Grid container spacing={3}>
					<Grid item xs={12} md={4} lg={3}>
						<Card className={classes.root}>
							<Box p="0.5rem" display="flex">
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									width={'30%'}
								>
									<PeopleIcon
										color="primary"
										fontSize="large"
									/>
								</Box>
								<Box width={'70%'}>
									<Box
										className={[
											classes.textCenter,
											classes.largeFont,
										].join(' ')}
									>
										{response.users}
									</Box>
									<Box
										className={[
											classes.textCenter,
											'font-secondary',
										].join(' ')}
									>
										Users
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Card className={classes.root}>
							<Box p="0.5rem" display="flex">
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									width={'30%'}
								>
									<SupervisorAccountIcon
										color="primary"
										fontSize="large"
									/>
								</Box>
								<Box width={'70%'}>
									<Box
										className={[
											classes.textCenter,
											classes.largeFont,
										].join(' ')}
									>
										{response.admins}
									</Box>
									<Box
										className={[
											classes.textCenter,
											'font-secondary',
										].join(' ')}
									>
										Admin / Staffs
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Card className={classes.root}>
							<Box p="0.5rem" display="flex">
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									width={'30%'}
								>
									<ApartmentIcon
										color="primary"
										fontSize="large"
									/>
								</Box>
								<Box width={'70%'}>
									<Box
										className={[
											classes.textCenter,
											classes.largeFont,
										].join(' ')}
									>
										{response.activeProperties}
									</Box>
									<Box
										className={[
											classes.textCenter,
											'font-secondary',
										].join(' ')}
									>
										Active Properties
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Card className={classes.root}>
							<Box p="0.5rem" display="flex">
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									width={'30%'}
								>
									<BusinessIcon
										color="primary"
										fontSize="large"
									/>
								</Box>
								<Box width={'70%'}>
									<Box
										className={[
											classes.textCenter,
											classes.largeFont,
										].join(' ')}
									>
										{response.underScreeningProperties}
									</Box>
									<Box
										className={[
											classes.textCenter,
											'font-secondary',
										].join(' ')}
									>
										Properties under screening
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Card className={classes.root}>
							<Box p="0.5rem" display="flex">
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									width={'30%'}
								>
									<DomainDisabledIcon
										color="primary"
										fontSize="large"
									/>
								</Box>
								<Box width={'70%'}>
									<Box
										className={[
											classes.textCenter,
											classes.largeFont,
										].join(' ')}
									>
										{response.expiredProperties}
									</Box>
									<Box
										className={[
											classes.textCenter,
											'font-secondary',
										].join(' ')}
									>
										Expired Properties
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Card className={classes.root}>
							<Box p="0.5rem" display="flex">
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									width={'30%'}
								>
									<EmojiTransportationIcon
										color="primary"
										fontSize="large"
									/>
								</Box>
								<Box width={'70%'}>
									<Box
										className={[
											classes.textCenter,
											classes.largeFont,
										].join(' ')}
									>
										{response.cities}
									</Box>
									<Box
										className={[
											classes.textCenter,
											'font-secondary',
										].join(' ')}
									>
										Cities
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Card className={classes.root}>
							<Box p="0.5rem" display="flex">
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									width={'30%'}
								>
									<LocationCityIcon
										color="primary"
										fontSize="large"
									/>
								</Box>
								<Box width={'70%'}>
									<Box
										className={[
											classes.textCenter,
											classes.largeFont,
										].join(' ')}
									>
										{response.locations}
									</Box>
									<Box
										className={[
											classes.textCenter,
											'font-secondary',
										].join(' ')}
									>
										Locations
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Card className={classes.root}>
							<Box p="0.5rem" display="flex">
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
									width={'30%'}
								>
									<HomeWorkIcon
										color="primary"
										fontSize="large"
									/>
								</Box>
								<Box width={'70%'}>
									<Box
										className={[
											classes.textCenter,
											classes.largeFont,
										].join(' ')}
									>
										0
									</Box>
									<Box
										className={[
											classes.textCenter,
											'font-secondary',
										].join(' ')}
									>
										Projects
									</Box>
								</Box>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Dashboard;
