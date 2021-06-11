import { AppBar, Box } from '@material-ui/core';

import Hamburger from '../hamburger/hamburger.component';
import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import logoIcon from '../../../assets/icons/logo.svg';
import profile from '../../../assets/icons/profile.png';
import { selectAuthenticated } from '../../../redux/auth/auth.selectors';
import { toggleLoginPopup } from '../../../redux/ui/ui.actions';
import useGlovalStyles from '../../../common.style';
import { useHistory } from 'react-router-dom';
import useStyles from './nav.style';

const NavBar = ({ isAuthenticated, toggleLoginPopup }) => {
	const classes = useStyles();
	const gClasses = useGlovalStyles();
	const history = useHistory();
	const redirectToLogIn = (_) => {
		toggleLoginPopup(true);
	};

	const redirectToPostPage = () => {
		history.push('/v2/post-property');
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
					{!!isAuthenticated && (
						<>
							<div
								className={clsx(
									classes.profileWrapper,
									gClasses.smHide
								)}
							>
								<img
									src={profile}
									alt="Profile"
									className={gClasses.smHide}
								/>
							</div>
							<Box className={classes.profileWrapper}>
								<Hamburger />
							</Box>
						</>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
