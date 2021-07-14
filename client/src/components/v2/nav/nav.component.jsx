import { AppBar, Box, Menu, MenuItem } from '@material-ui/core';

import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import logoIcon from '../../../assets/icons/logo.svg';
import profile from '../../../assets/icons/profile.png';
import { selectAuthenticated } from '../../../redux/auth/auth.selectors';
import { signOut } from '../../../redux/auth/auth.actions';
import { toggleLoginPopup } from '../../../redux/ui/ui.actions';
import useGlovalStyles from '../../../common.style';
import { useHistory } from 'react-router-dom';
import useStyles from './nav.style';

const NavBar = ({ isAuthenticated, toggleLoginPopup, signOut }) => {
	const classes = useStyles();
	const gClasses = useGlovalStyles();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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

	const onLogOut = () => {
		signOut();
		handleClose();
	};

	return (
		<AppBar color={'transparent'} position={'fixed'} elevation={0}>
			<Box className={classes.wrapper}>
				<div className={classes.logoWrapper}>
					<img src={logoIcon} alt="" className={classes.logo} />
					<span className={classes.logoTitle}>
						HOMESEARCH<span>18</span>.COM
					</span>
				</div>
				<div className={classes.rightSide}>
					<div
						className={clsx(classes.listButton, gClasses.smHide)}
						onClick={redirectToPostPage}
					>
						List Property & Projects
					</div>

					{!!isAuthenticated ? (
						<div>
							<Box
								className={clsx(
									classes.profileWrapper,
									gClasses.smHide
								)}
								aria-controls="customized-menu"
								aria-haspopup="true"
								onClick={handleClick}
							>
								<img
									src={profile}
									alt="Profile"
									className={gClasses.smHide}
								/>
							</Box>
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
								<MenuItem onClick={handleClose} disabled>
									My account
								</MenuItem>
								<MenuItem onClick={onLogOut}>Logout</MenuItem>
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
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
