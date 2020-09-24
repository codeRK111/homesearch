import React from 'react';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Toolbar, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { logout } from '../../redux/user/user.actions';
import { selectIsAuthenticated } from '../../redux/user/user.selector';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

let drawerWidth = 310;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		backgroundColor: '#34495e',
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},

	appBarSpacer: theme.mixins.toolbar,

	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
}));

const Appbar = ({ isAuthenticated, logout, open, handleDrawerOpen }) => {
	const classes = useStyles();
	const history = useHistory();
	const logOut = () => {
		localStorage.removeItem('JWT');
		logout();
		history.push('/');
	};
	return (
		<AppBar
			position="absolute"
			className={clsx(classes.appBar, open && classes.appBarShift)}
			classes={{
				colorDefault: 'app-bar',
			}}
		>
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					className={clsx(
						classes.menuButton,
						open && classes.menuButtonHidden
					)}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					Homesearch18
				</Typography>
				{isAuthenticated && (
					<Button
						variant="contained"
						color="default"
						classes={{
							label: 'transform-none',
						}}
						onClick={logOut}
					>
						Logout
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectIsAuthenticated,
});

const mapActionToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapActionToProps)(Appbar);
