import {
	AlignCenter,
	Flex,
	JustifyCenter,
} from '../../components/flexContainer/flexContainer.component';
import { Avatar, Box, Button, Grid, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
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
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { parseDate } from '../../utils/render.utils';
import { selectUser } from '../../redux/auth/auth.selectors';
import useStyles from './profile.styles';

const ProfilePage = ({ user }) => {
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
									src={
										user.photo
											? `/profile/${user.photo}`
											: require('../../assets/dummy_user.png')
									}
									className={classes.avatar}
								/>
							</JustifyCenter>
						</Grid>
						<Grid item xs={12} md={7}>
							<Flex alignItems="center">
								<Typography
									className={[classes.title, classes.cBlack]}
								>
									{user.name ? user.name : 'Not available'}
								</Typography>
								<Button
									variant="contained"
									className={classes.button}
									size="small"
									onClick={redirectToProfileUpdatepage}
								>
									Update Profile
								</Button>
							</Flex>

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
										{user.email
											? user.email
											: 'Not provided'}
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
										{user.number ? (
											<span>
												{user.number}(
												{user.mobileStatus})
											</span>
										) : (
											'No mobile number'
										)}
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
									<Typography>
										{user.city
											? user.city.name
											: 'Not Provided'}
									</Typography>
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
									<Typography>
										{parseDate(user.createdAt)}
									</Typography>
								</AlignCenter>
							</Box>
							<Box mt="0.3rem" mb="0.3rem">
								<Link to="/post-property">Post Property</Link>
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

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(ProfilePage);
