import {
	Avatar,
	Box,
	Button,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import { apiUrl, capitalizeFirstLetter } from '../../../utils/render.utils';

import CreateIcon from '@material-ui/icons/Create';
import LikedProperties from '../../../components/v2/likeProperties';
import MailIcon from '@material-ui/icons/Mail';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MyProperties from '../../../components/v2/myProperties';
import Nav from '../../../components/v2/pageNav/nav.component';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import React from 'react';
import SavedProperties from '../../../components/v2/savedProperties';
import UpdateProfile from './updateProfile.component';
import axios from 'axios';
import badgeIcon from '../../../assets/icons/badge.svg';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../redux/auth/auth.selectors';
import useGlobalStyles from '../../../common.style';
import { useHistory } from 'react-router-dom';
import useStyles from './userProfile.style';

const defaultImage =
	'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100';

const AgentPage = ({ user }) => {
	const history = useHistory();
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const [updateProfileOpen, setUpdateProfileOpen] = React.useState(false);

	let cancelToken = React.useRef(undefined);
	const [count, setCount] = React.useState({
		postPropertyCount: 0,
		savedPropertyCount: 0,
		likedPropertyCount: 0,
	});

	const handleClick = (event) => {
		history.push('/my-queries');
	};
	const goToManagePackages = (event) => {
		history.push('/my-packages');
	};
	const goToChanelPartner = (event) => {
		history.push('/chanel-partner');
	};

	const handleUpdateProfileClickOpen = () => {
		setUpdateProfileOpen(true);
	};

	const handleUpdateProfileClose = () => {
		setUpdateProfileOpen(false);
	};

	React.useEffect(() => {
		(async () => {
			try {
				cancelToken.current = axios.CancelToken.source();
				const token = localStorage.getItem('JWT_CLIENT');
				const {
					data: { data },
				} = await axios.get(
					apiUrl('/page/user/profile', 2),

					{
						cancelToken: cancelToken.current.token,
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setCount(data);
			} catch (error) {
				setCount({
					postPropertyCount: 0,
					savedPropertyCount: 0,
					likedPropertyCount: 0,
				});
			}
		})();
	}, []);

	return (
		<div>
			<Nav />
			<UpdateProfile
				open={updateProfileOpen}
				handleClose={handleUpdateProfileClose}
				user={user}
			/>
			<div className={classes.wrapper}>
				<Box className={globalClasses.justifySpaceBetween}>
					<span className={globalClasses.smXsText}>
						Home/ Profile / {user.name}
					</span>
					<IconButton onClick={handleClick}>
						<NotificationsIcon color="primary" />
					</IconButton>
				</Box>
			</div>
			<div className={classes.profileWrapper}>
				<div className={classes.overlay}>
					<Box className={classes.heroWrapper}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={2}>
								<Box className={globalClasses.justifyCenter}>
									<div className={classes.avatarWrapper}>
										<Avatar
											variant="square"
											alt="Remy Sharp"
											src={
												user.photo
													? `/profile/${user.photo}`
													: defaultImage
											}
											className={classes.avatar}
										/>
										<img
											src={badgeIcon}
											alt="Badge"
											className={classes.commentIcon}
										/>
									</div>
								</Box>
							</Grid>
							<Grid item xs={12} md={5}>
								<div
									className={clsx(
										globalClasses.alignCenter,
										globalClasses.justifySpaceBetween
									)}
								>
									<div className={classes.ownerType}>
										{capitalizeFirstLetter(user.role)}
									</div>
									<Button
										onClick={handleUpdateProfileClickOpen}
										size="small"
										startIcon={<CreateIcon />}
									>
										Update Profile
									</Button>
									<Button
										onClick={goToManagePackages}
										size="small"
										startIcon={<MonetizationOnIcon />}
									>
										My Packages
									</Button>
									<Button
										onClick={goToChanelPartner}
										size="small"
										startIcon={<PersonAddIcon />}
									>
										Become a CP
									</Button>
								</div>
								<Box
									className={clsx(globalClasses.alignCenter)}
								>
									<h1 className={globalClasses.colorPrimary}>
										{user.name}
									</h1>
								</Box>
								{/* <Box
									className={clsx(globalClasses.alignCenter)}
								>
									<span
										className={globalClasses.colorPrimary}
									>
										Banglore, India
									</span>
									<Box ml="2rem">
										<span
											className={clsx(
												globalClasses.bold,
												globalClasses.colorPrimary
											)}
										>
											ID : R04913231c
										</span>
									</Box>
								</Box> */}
								<List component="nav">
									<ListItem dense>
										<ListItemIcon>
											<MailIcon
												className={classes.iconColor}
											/>
										</ListItemIcon>
										<ListItemText primary={user.email} />
									</ListItem>
									<ListItem dense>
										<ListItemIcon>
											<PhoneAndroidIcon
												className={classes.iconColor}
											/>
										</ListItemIcon>
										<ListItemText primary={user.number} />
									</ListItem>
								</List>
								<Box
									className={clsx(globalClasses.alignCenter)}
									mt="1rem"
								>
									<Box className={classes.numberWrapper}>
										<h1 className={globalClasses.colorUtil}>
											{count.postPropertyCount}
										</h1>
										<span
											className={clsx(
												globalClasses.smText,
												globalClasses.bold,
												globalClasses.textCenter
											)}
										>
											Property Posted
										</span>
									</Box>
									<Box
										className={classes.numberWrapper}
										ml="2rem"
									>
										<h1 className={globalClasses.colorUtil}>
											{count.savedPropertyCount}
										</h1>
										<span
											className={clsx(
												globalClasses.smText,
												globalClasses.bold,
												globalClasses.textCenter
											)}
										>
											Property Saved
										</span>
									</Box>
									<Box
										className={classes.numberWrapper}
										ml="2rem"
									>
										<h1 className={globalClasses.colorUtil}>
											{count.likedPropertyCount}
										</h1>
										<span
											className={clsx(
												globalClasses.smText,
												globalClasses.bold,
												globalClasses.textCenter
											)}
										>
											Property Liked
										</span>
									</Box>
								</Box>
								<Box
									className={clsx(
										globalClasses.alignCenter,
										globalClasses.smFlexColumn
									)}
									mt="2rem"
								>
									<Box className={globalClasses.alignCenter}>
										<Box
											className={classes.numberHiglight}
											mr="1rem"
										>
											<h1>
												{count.postPropertyActiveCount}
											</h1>
										</Box>
										<span
											className={clsx(
												globalClasses.smText,
												globalClasses.bold
											)}
										>
											Active Properties
										</span>
									</Box>
									<Box
										className={clsx(
											classes.keyNumberSpacer,
											globalClasses.alignCenter
										)}
									>
										<Box
											className={classes.numberHiglight}
											mr="1rem"
										>
											<h1>
												{
													count.postPropertyUnderScreeningCount
												}
											</h1>
										</Box>
										<span
											className={clsx(
												globalClasses.smText,
												globalClasses.bold
											)}
										>
											Underscreening Properties
										</span>
									</Box>
									<Box
										className={clsx(
											classes.keyNumberSpacer,
											globalClasses.alignCenter
										)}
										ml="2rem"
									>
										<Box
											className={classes.numberHiglight}
											mr="1rem"
										>
											<h1>
												{count.postPropertyExpiredCount}
											</h1>
										</Box>
										<span
											className={clsx(
												globalClasses.smText,
												globalClasses.bold
											)}
										>
											Expired Property
										</span>
									</Box>
								</Box>
							</Grid>

							<Grid item xs={false} md={1}></Grid>
						</Grid>
					</Box>
				</div>
			</div>
			<Box className={globalClasses.smHide}>
				<MyProperties title={`Properties posted by ${user.name}`} />
			</Box>
			<Box className={globalClasses.smHide}>
				<SavedProperties title={`Saved Properties`} />
			</Box>
			<Box className={globalClasses.smHide}>
				<LikedProperties title={`Liked Properties`} />
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(AgentPage);
