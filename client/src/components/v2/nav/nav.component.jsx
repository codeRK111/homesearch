import {
	AppBar,
	Avatar,
	Box,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from '@material-ui/core';
import { StaticPaths, getHostName } from '../../../utils/render.utils';
import {
	selectAuthenticated,
	selectUser,
} from '../../../redux/auth/auth.selectors';

import ClearIcon from '@material-ui/icons/Clear';
import Drawer from '../drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import logoIcon from '../../../assets/icons/logo.svg';
import { profile } from '../../../utils/statc';
import { signOut } from '../../../redux/auth/auth.actions';
import { toggleLoginPopup } from '../../../redux/ui/ui.actions';
import useGlovalStyles from '../../../common.style';
import { useHistory } from 'react-router-dom';
import useStyles from './nav.style';

const NavBar = ({ isAuthenticated, toggleLoginPopup, signOut, user }) => {
	const classes = useStyles();
	const gClasses = useGlovalStyles();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);
	// const [checked, setChecked] = React.useState(false);
	const [openDrawer, setOpenDrawer] = React.useState(false);
	const [topDrawer, setTopDrawer] = React.useState(false);

	const toggleTopDrawer = () => {
		setTopDrawer(!topDrawer);
	};

	const handleClickOpenDrawer = (event) => {
		setOpenDrawer(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleCloseDrawer = () => {
		setOpenDrawer(false);
	};
	const redirectToLogIn = (_) => {
		toggleLoginPopup(true);
	};

	const redirectToPostPage = () => {
		history.push('/v2/post-property');
	};
	const goToProfile = () => {
		history.push('/profile');
	};
	const goToTenantPackages = () => {
		history.push('/tenant-packages');
	};

	const onLogOut = () => {
		signOut();
		handleClose();
	};

	const renderLogo = {
		'homesearch18.com': (
			<span className={classes.logoTitle}>
				HOMESEARCH<span>18</span>.COM
			</span>
		),
		'homesearchindia.com': (
			<span className={classes.logoTitle}>
				HOMESEARCH<span>INDIA</span>.COM
			</span>
		),
		localhost: (
			<span className={classes.logoTitle}>
				HOMESEARCH<span>18</span>.COM
			</span>
		),
	};

	return (
		<div style={{ marginBottom: '3rem' }}>
			<AppBar color={'transparent'} elevation={0}>
				{isAuthenticated && (
					<div
						className={clsx(classes.min, topDrawer && classes.max)}
					>
						<Grid container justify="flex-end" spacing={3}>
							<Grid item xs={12} md={3}>
								<List>
									<ListItem button onClick={goToProfile}>
										<ListItemIcon>
											<PersonIcon
												className={gClasses.colorUtil}
											/>
										</ListItemIcon>
										<ListItemText primary={'Profile'} />
									</ListItem>
									<ListItem button onClick={onLogOut}>
										<ListItemIcon>
											<ExitToAppIcon
												className={gClasses.colorUtil}
											/>
										</ListItemIcon>
										<ListItemText primary={'Logout'} />
									</ListItem>
								</List>
							</Grid>
						</Grid>
					</div>
				)}
				<Drawer open={openDrawer} handleClose={handleCloseDrawer} />
				<Box className={classes.wrapper}>
					<div className={classes.logoWrapper}>
						<img src={logoIcon} alt="" className={classes.logo} />
						<Box ml="0.5rem">{renderLogo[getHostName()]}</Box>
					</div>
					<div className={classes.rightSide}>
						<Box
							mr="1rem"
							className={clsx(
								classes.listButton,
								gClasses.smHide
							)}
							onClick={goToTenantPackages}
						>
							Packages
						</Box>
						<div
							className={clsx(
								classes.listButton,
								gClasses.smHide
							)}
							onClick={redirectToPostPage}
						>
							List Property & Projects
						</div>
						<IconButton
							className={classes.smMenu}
							size="small"
							onClick={handleClickOpenDrawer}
						>
							<MenuIcon />
						</IconButton>

						{!!isAuthenticated ? (
							<div>
								{topDrawer ? (
									<IconButton
										onClick={toggleTopDrawer}
										className={classes.iconButton}
									>
										<ClearIcon />
									</IconButton>
								) : (
									<Box
										className={clsx(
											classes.profileWrapper,
											gClasses.smHide,
											gClasses.pointer
										)}
										aria-controls="customized-menu"
										aria-haspopup="true"
										onClick={toggleTopDrawer}
									>
										<Avatar
											src={
												user.photo
													? StaticPaths.profile(
															user.photo
													  )
													: profile
											}
										>
											{user.name[0].toUpperCase()}
										</Avatar>
										{/* <img
											src={
												user.photo
													? `/profile/${user.photo}`
													: profile
											}
											alt="Profile"
											className={gClasses.smHide}
										/> */}
									</Box>
								)}
								<Menu
									id="customized-menu"
									getContentAnchorEl={null}
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'center',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'center',
									}}
								>
									<MenuItem onClick={goToProfile}>
										Profile
									</MenuItem>

									<MenuItem onClick={onLogOut}>
										Logout
									</MenuItem>
								</Menu>
							</div>
						) : (
							<Box ml="1rem">
								<div
									className={clsx(
										classes.listButton,
										gClasses.smHide
									)}
									onClick={redirectToLogIn}
								>
									Sign In
								</div>
							</Box>
						)}
					</div>
				</Box>
			</AppBar>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
