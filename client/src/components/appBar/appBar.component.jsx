import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

// Custom components
import AppDrawer from '../appDrawer/appDrawe.component';
import Button from '../appBarButton/appBarButton.component';
import Menu from '../menu/menu.component';
import City from '../cityMenu/cityMenu.component';

// Styles
import { useStyles } from './appBar.styles';

const Appbar = () => {
	const classes = useStyles();
	const history = useHistory();
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
	const goToHomePage = (_) => history.push('/');
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
						<Typography variant="h6" onClick={goToHomePage}>
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
