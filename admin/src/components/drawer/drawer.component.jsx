import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MainListItem from './listitem.component';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AppBar from '../appBar/appBar.component';

// import './home.styles.scss';

let drawerWidth = 290;

const useStyles = makeStyles((theme) => {
	console.log(theme);

	return {
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
		drawerPaper: {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			backgroundColor: '#34495e',
			color: '#ffffff',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		},
		appBarSpacer: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			height: '100vh',
			overflow: 'auto',
		},
		container: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(4),
		},
		paper: {
			padding: theme.spacing(2),
			display: 'flex',
			overflow: 'auto',
			flexDirection: 'column',
		},
		fixedHeight: {
			height: 240,
		},
		pointer: {
			cursor: 'pointer',
		},
	};
});

function DrawerComponent(Component) {
	const D = (props) => {
		const classes = useStyles();
		const history = useHistory();
		const [open, setOpen] = React.useState(true);
		const handleDrawerOpen = () => {
			setOpen(true);
		};
		const handleDrawerClose = () => {
			setOpen(false);
		};

		return (
			<div className={classes.root}>
				{/* <CssBaseline /> */}
				<AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
				<Drawer
					variant="permanent"
					classes={{
						paper: clsx(
							classes.drawerPaper,
							!open && classes.drawerPaperClose
						),
						// root: 'test',
					}}
					open={open}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon style={{ color: '#ffffff' }} />
						</IconButton>
					</div>
					<Divider />
					<List>
						<MainListItem />
					</List>
					{/* <Divider />
				<List>{secondaryListItems}</List> */}
				</Drawer>
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					<Component {...props} />
				</main>
			</div>
		);
	};

	return withRouter(D);
}

export default DrawerComponent;
