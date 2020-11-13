import {
	AlignCenter,
	Flex,
	JustifyCenter,
} from '../../components/flexContainer/flexContainer.component';
import { Avatar, Box, Button, Grid, Typography } from '@material-ui/core';
import {
	faCalendarAlt,
	faCheck,
	faCity,
	faEnvelopeOpen,
} from '@fortawesome/free-solid-svg-icons';

import AppBar from '../../components/appBar/appBar.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../components/footer/footer.component';
import React from 'react';
import Tab from './tab.component';
import { useHistory } from 'react-router-dom';
import useStyles from './profile.styles';

const ProfilePage = () => {
	const classes = useStyles();
	const history = useHistory();

	const redirectToProfileUpdatepage = (_) => history.push('/update-profile');
	return (
		<Box>
			<AppBar />
			<Box mt="5rem" display="flex" width="100%" justifyContent="center">
				<Box className={classes.wrapper}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<JustifyCenter>
								<Avatar
									alt="User"
									src={require('../../assets/dummy_user.png')}
									className={classes.avatar}
								/>
							</JustifyCenter>
						</Grid>
						<Grid item xs={12} md={7}>
							<Flex alignItems="center">
								<Typography
									className={[classes.title, classes.cBlack]}
								>
									Prateek Gandhi
								</Typography>
								<Button
									variant="contained"
									className={classes.button}
									size="small"
									onClick={redirectToProfileUpdatepage}
								>
									Edit Profile
								</Button>
							</Flex>
							<JustifyCenter mt="1rem" mb="1rem">
								<Grid container>
									<Grid item xs={12} md={4}>
										<Flex>
											<Box mr="0.3rem">
												<b className={classes.cBlack}>
													5
												</b>
											</Box>
											<Typography>Properties</Typography>
										</Flex>
									</Grid>
									<Grid item xs={12} md={4}>
										<Flex>
											<Box mr="0.3rem">
												<b className={classes.cBlack}>
													15
												</b>
											</Box>
											<Typography>Queries</Typography>
										</Flex>
									</Grid>
									<Grid item xs={12} md={4}>
										<Flex>
											<Box mr="0.3rem">
												<b className={classes.cBlack}>
													15
												</b>
											</Box>
											<Typography>
												Queries Received
											</Typography>
										</Flex>
									</Grid>
								</Grid>
							</JustifyCenter>
							<Box mt="0.3rem" mb="0.3rem">
								<AlignCenter>
									<Box mr="0.5rem">
										<FontAwesomeIcon
											icon={faEnvelopeOpen}
											className={[
												classes.cGreen,
												classes.icon,
											].join(' ')}
										/>
									</Box>
									<Typography>
										rakeshchandrra@gmail.com
									</Typography>
								</AlignCenter>
							</Box>
							<Box mt="0.3rem" mb="0.3rem">
								<AlignCenter>
									<Box mr="0.5rem">
										<FontAwesomeIcon
											icon={faCheck}
											className={[
												classes.cGreen,
												classes.icon,
											].join(' ')}
										/>
									</Box>
									<Typography>
										9873345956 (private)
									</Typography>
								</AlignCenter>
							</Box>
							<Box mt="0.3rem" mb="0.3rem">
								<AlignCenter>
									<Box mr="0.5rem">
										<FontAwesomeIcon
											icon={faCity}
											className={[
												classes.cGreen,
												classes.icon,
											].join(' ')}
										/>
									</Box>
									<Typography>Bhubaneswar</Typography>
								</AlignCenter>
							</Box>

							<Box mt="0.3rem" mb="0.3rem">
								<AlignCenter>
									<Box mr="0.5rem">
										<FontAwesomeIcon
											icon={faCalendarAlt}
											className={[
												classes.cGreen,
												classes.icon,
											].join(' ')}
										/>
									</Box>
									<Typography>2nd Nov 2020</Typography>
								</AlignCenter>
							</Box>
						</Grid>
					</Grid>

					<Box mt="2rem">
						<Tab />
					</Box>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
};

export default ProfilePage;
