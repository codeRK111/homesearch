import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';

// Custom components
import AppDrawer from '../appDrawer/appDrawe.component';
import Button from '../appBarButton/appBarButton.component';
import Menu from '../menu/menu.component';
import City from '../cityDropdown/cityDropdown.component';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: '4rem',
	},
	menuButton: {
		marginRight: theme.spacing(1),
	},
	title: {
		flexGrow: 1,
		fontWeight: 'bold',
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'space-between',
		},
	},
	lastWord: {
		color: theme.colorOne,
		fontWeight: 'bold',
	},
}));

const Appbar = () => {
	const classes = useStyles();
	const matches = useMediaQuery('(max-width:600px)');
	const [open, setOpen] = React.useState(false);
	const handleDrawer = (status) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setOpen(status);
	};
	return (
		<div className={classes.root}>
			<AppDrawer open={open} handleDrawer={handleDrawer(false)} />
			<AppBar position="fixed" color="default" elevation={0}>
				<Toolbar variant="regular">
					{matches && (
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
							onClick={handleDrawer(true)}
						>
							<MenuIcon />
						</IconButton>
					)}

					<Box className={classes.title}>
						<Typography variant="h6">
							Homesearch
							<span className={classes.lastWord}>18</span>
						</Typography>
						<City />
					</Box>

					{!matches && <Button text="Post Property" />}
					{!matches && <Menu />}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Appbar;
