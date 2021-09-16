import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import AppDrawer from '../Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTypedSelector } from '../../hooks/useTypedSelector';

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
	const { user } = useTypedSelector((state) => state.auth);
	const { logOut } = useRepositoryAction(ResourceType.Auth);

	// State
	const [openDrawer, setOpenDrawer] = useState(false);

	// Callbacks
	const manageDrawerState = (status: boolean) => () => {
		setOpenDrawer(status);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
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
					<Typography variant="h6" className={classes.title}>
						Homesearch18
					</Typography>
					{user && (
						<Button color="inherit" onClick={logOut}>
							Logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
