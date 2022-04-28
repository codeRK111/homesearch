import { Avatar, Box, IconButton } from '@material-ui/core';
import { StaticPaths, getBrandName } from '../../../utils/render.utils';
import {
	selectAuthenticated,
	selectUser,
} from '../../../redux/auth/auth.selectors';

import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockOpen from '@material-ui/icons/LockOpen';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PersonIcon from '@material-ui/icons/Person';
import PostAddIcon from '@material-ui/icons/PostAdd';
import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { profile } from '../../../utils/statc';
import { signOut } from '../../../redux/auth/auth.actions';
import { toggleLoginPopup } from '../../../redux/ui/ui.actions';
import useGlobalStyle from '../../../common.style';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	contentWrapper: {
		width: '60vw',
		padding: '1rem',
	},
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
}));

function TemporaryDrawer({
	open,
	handleClose,
	isAuthenticated,
	toggleLoginPopup,
	signOut,
	user,
}) {
	const classes = useStyles();
	const gClasses = useGlobalStyle();
	const history = useHistory();

	const redirectToLogIn = (_) => {
		handleClose();
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

	const goToTenantPackages = () => {
		history.push('/tenant-packages');
	};

	const toggleDrawer = (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		handleClose();
	};

	return (
		<div>
			<Drawer anchor={'right'} open={open} onClose={toggleDrawer}>
				<div className={classes.contentWrapper}>
					<Box
						className={clsx(
							gClasses.alignCenter,
							gClasses.smJustifyBetween
						)}
						mb="2rem"
					>
						<span>{getBrandName[window.location.hostname]}</span>
						<IconButton size="small" onClick={handleClose}>
							<CloseIcon className={gClasses.colorUtil} />
						</IconButton>
					</Box>
					{isAuthenticated && (
						<Box>
							<Box className={gClasses.flexCenter}>
								<Avatar
									alt="Remy Sharp"
									src={
										user.photo
											? StaticPaths.profile(user.photo)
											: profile
									}
									className={classes.large}
								/>
							</Box>
							<h3 className={gClasses.textCenter}>{user.name}</h3>
							<List>
								<ListItem button onClick={goToProfile}>
									<ListItemIcon>
										<PersonIcon
											className={gClasses.colorUtil}
										/>
									</ListItemIcon>
									<ListItemText primary={'Profile'} />
								</ListItem>
							</List>
							<Divider />
						</Box>
					)}

					<List>
						<ListItem button onClick={goToTenantPackages}>
							<ListItemIcon>
								<MonetizationOnIcon
									className={gClasses.colorUtil}
								/>
							</ListItemIcon>
							<ListItemText primary={'Packages'} />
						</ListItem>
						<ListItem button onClick={redirectToPostPage}>
							<ListItemIcon>
								<PostAddIcon className={gClasses.colorUtil} />
							</ListItemIcon>
							<ListItemText primary={'Post Property'} />
						</ListItem>
						<ListItem button>
							<ListItemIcon>
								<MonetizationOnIcon
									className={gClasses.colorUtil}
								/>
							</ListItemIcon>
							<ListItemText primary={'Property Valuation'} />
						</ListItem>
						{isAuthenticated ? (
							<ListItem button onClick={onLogOut}>
								<ListItemIcon>
									<ExitToAppIcon
										className={gClasses.colorUtil}
									/>
								</ListItemIcon>
								<ListItemText primary={'Logout'} />
							</ListItem>
						) : (
							<ListItem button onClick={redirectToLogIn}>
								<ListItemIcon>
									<LockOpen className={gClasses.colorUtil} />
								</ListItemIcon>
								<ListItemText primary={'Sign In'} />
							</ListItem>
						)}
					</List>
				</div>
			</Drawer>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
	user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);
