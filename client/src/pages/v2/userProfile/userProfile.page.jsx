import {
	Avatar,
	Box,
	Button,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import { capitalizeFirstLetter, parseDate } from '../../../utils/render.utils';

import CreateIcon from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import Nav from '../../../components/v2/pageNav/nav.component';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import React from 'react';
import UpdateProfile from './updateProfile.component';
import badgeIcon from '../../../assets/icons/badge.svg';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../../redux/auth/auth.selectors';
import useGlobalStyles from '../../../common.style';
import useStyles from './userProfile.style';

const defaultImage =
	'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=100&w=100';

const AgentPage = ({ user }) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	const [updateProfileOpen, setUpdateProfileOpen] = React.useState(false);

	const handleUpdateProfileClickOpen = () => {
		setUpdateProfileOpen(true);
	};

	const handleUpdateProfileClose = () => {
		setUpdateProfileOpen(false);
	};
	return (
		<div>
			<Nav />
			<UpdateProfile
				open={updateProfileOpen}
				handleClose={handleUpdateProfileClose}
				user={user}
			/>
			<div className={classes.wrapper}>
				<Box>
					<span className={globalClasses.smXsText}>
						Home/ Profile / {user.name}
					</span>
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
								</div>
								<Box
									className={clsx(globalClasses.alignCenter)}
								>
									<h1 className={globalClasses.colorPrimary}>
										{user.name}
									</h1>
								</Box>
								<Box
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
								</Box>
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
							</Grid>

							<Grid item xs={false} md={1}></Grid>
						</Grid>
					</Box>
				</div>
			</div>
			<Box className={classes.pagePadding}>
				<Box
					className={clsx(
						globalClasses.alignCenter,
						globalClasses.justifySpaceBetween
					)}
				>
					<h2>Properties Posted By Sumitra</h2>
					<Link
						className={clsx(
							globalClasses.colorPrimary,
							globalClasses.bold,
							globalClasses.smText
						)}
					>
						MANAGE PROFILE
					</Link>
				</Box>
			</Box>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	user: selectUser,
});

export default connect(mapStateToProps)(AgentPage);
