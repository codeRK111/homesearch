import { Box } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import logoIcon from '../../../assets/icons/logo.svg';
import menuIcon from '../../../assets/icons/menu.svg';
import profile from '../../../assets/icons/profile.png';
import searchIcon from '../../../assets/search.svg';
import useGlobalStyles from '../../../common.style';
import useStyles from './nav.style';

const NavBar = () => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	return (
		<Box className={classes.wrapper}>
			<div className={classes.logoWrapper}>
				<img src={logoIcon} alt="" className={classes.logo} />
				<span className={classes.logoTitle}>
					HOMESEARCH<span>18</span>.COM
				</span>
			</div>
			<div className={clsx(classes.logoWrapper, globalClasses.smHide)}>
				<Box
					className={clsx(
						globalClasses.colorSecondary,
						globalClasses.bold
					)}
				>
					Project{' '}
				</Box>
				<Box
					ml="1rem"
					className={clsx(
						globalClasses.colorPrimary,
						globalClasses.bold
					)}
				>
					Resale{' '}
				</Box>
				<Box
					ml="1rem"
					className={clsx(
						globalClasses.colorPrimary,
						globalClasses.bold
					)}
				>
					Rent{' '}
				</Box>
				<Box ml="2rem" pl="1rem" className={classes.searchWrapper}>
					<div className={classes.selectedLocation}>
						<span>Bhubaneswar</span>
						<Box ml="1rem">
							<span>X</span>
						</Box>
					</div>
					<Box ml="1rem">
						<div className={classes.selectedLocation}>
							<span>Patia</span>
							<Box ml="1rem">
								<span>X</span>
							</Box>
						</div>
					</Box>
				</Box>
				<Box ml="1rem">
					<img
						src={searchIcon}
						alt="Search"
						className={classes.searchLogo}
					/>
				</Box>
			</div>
			<div className={classes.rightSide}>
				<div className={clsx(classes.listButton, globalClasses.smHide)}>
					List Property & Projects
				</div>
				<div className={classes.profileWrapper}>
					<img src={profile} alt="Profile" />
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
