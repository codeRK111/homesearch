import { Box } from '@material-ui/core';
import React from 'react';
import logoIcon from '../../../assets/icons/logo.svg';
import menuIcon from '../../../assets/icons/menu.svg';
import profile from '../../../assets/icons/profile.png';
import useStyles from './nav.style';

const NavBar = () => {
	const classes = useStyles();
	return (
		<Box className={classes.wrapper}>
			<div className={classes.logoWrapper}>
				<img src={logoIcon} alt="" className={classes.logo} />
				<span className={classes.logoTitle}>
					HOMESEARCH<span>18</span>.COM
				</span>
			</div>
			<div className={classes.rightSide}>
				<div className={classes.listButton}>
					List Property & Projects
				</div>
				<div className={classes.profileWrapper}>
					<img src={profile} alt="Profile" />
				</div>
				<div className={classes.profileWrapper}>
					<img src={menuIcon} alt="Menu" />
				</div>
			</div>
		</Box>
	);
};

export default NavBar;
