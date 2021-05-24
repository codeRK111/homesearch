import { Box } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import logoIcon from '../../../assets/icons/logo.svg';
import menuIcon from '../../../assets/icons/menu.svg';
import profile from '../../../assets/icons/profile.png';
import useGlovalStyles from '../../../common.style';
import useStyles from './nav.style';

const NavBar = () => {
	const classes = useStyles();
	const gClasses = useGlovalStyles();
	return (
		<Box className={classes.wrapper}>
			<div className={classes.logoWrapper}>
				<img src={logoIcon} alt="" className={classes.logo} />
				<span className={classes.logoTitle}>
					HOMESEARCH<span>18</span>.COM
				</span>
			</div>
			<div className={classes.rightSide}>
				<div className={clsx(classes.listButton, gClasses.smHide)}>
					List Property & Projects
				</div>
				<div className={clsx(classes.profileWrapper, gClasses.smHide)}>
					<img
						src={profile}
						alt="Profile"
						className={gClasses.smHide}
					/>
				</div>
				<div className={classes.profileWrapper}>
					<img
						src={menuIcon}
						alt="Menu"
						className={classes.menuIcon}
					/>
				</div>
			</div>
		</Box>
	);
};

export default NavBar;
