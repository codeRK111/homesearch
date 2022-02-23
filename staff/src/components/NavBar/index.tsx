import { CircularProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { asyncLogout } from '../../API/auth';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AppDrawer from '../Drawer';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	})
);

const NavBar = () => {
	const classes = useStyles();
	const smallScreen = useMediaQuery('(max-width:600px)');
	const { user } = useTypedSelector((state) => state.auth);
	const { logOut } = useRepositoryAction(ResourceType.Auth);

	// State
	const [openDrawer, setOpenDrawer] = useState(false);
	const [sharePackage, setSharePackage] = useState(false);
	const [loading, setLoading] = useState(false);

	// Callbacks
	const manageDrawerState = (status: boolean) => () => {
		setOpenDrawer(status);
	};
	const manageSharePackage = (status: boolean) => () => {
		setSharePackage(status);
	};

	const onLogOut = async () => {
		try {
			setLoading(true);
			await asyncLogout();
			setLoading(false);
			logOut();
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" elevation={5}>
				<AppDrawer
					open={openDrawer}
					onClose={manageDrawerState(false)}
				/>

				<Toolbar>
					{user && (
						<IconButton
							edge="start"
							onClick={manageDrawerState(true)}
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
						>
							<MenuIcon />
						</IconButton>
					)}
					{user ? (
						<Link
							to="/"
							className={classes.title}
							style={{ color: '#ffffff', textDecoration: 'none' }}
						>
							<Typography variant="h6">Homesearch18</Typography>
							<Typography>
								{user.id === '615ac4b203177c2788a318e1'
									? 'Boss Priya'
									: user.name}
							</Typography>
						</Link>
					) : (
						<Typography variant="h6" className={classes.title}>
							Homesearch18
						</Typography>
					)}

					{user && (
						<Button
							color="inherit"
							onClick={onLogOut}
							disabled={loading}
							endIcon={
								loading ? (
									<CircularProgress
										size={20}
										color="secondary"
									/>
								) : (
									<></>
								)
							}
						>
							Logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
