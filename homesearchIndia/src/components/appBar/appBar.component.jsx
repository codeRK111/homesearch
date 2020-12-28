import AppBar from '@material-ui/core/AppBar';
import AppDrawer from '../appDrawer/appDrawe.component';
import Box from '@material-ui/core/Box';
import Button from '../appBarButton/appBarButton.component';
import City from '../cityMenu/cityMenu.component';
import IconButton from '@material-ui/core/IconButton';
import Menu from '../menu/menu.component';
import MenuIcon from '@material-ui/icons/Menu';
import Protected from '../protected/protectedComponent.component';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from '../../redux/auth/auth.selectors';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles } from './appBar.styles';

// Custom components

// Styles

const Appbar = ({ isAuthenticated }) => {
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
	const redirectToPostProperty = (_) => history.push('/post-property');
	const redirectToLogIn = (_) => history.push('/login');
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
						<Typography
							variant="h6"
							onClick={goToHomePage}
							className={classes.titleWrapper}
						>
							Homesearch
							<span className={classes.lastWord}>India</span>
						</Typography>
						<City />
					</Box>

					{!matches && (
						<Button
							text="Post Property"
							onClick={redirectToPostProperty}
						/>
					)}
					{!matches &&
						(isAuthenticated ? (
							<Menu />
						) : (
							<Box ml="1rem">
								<Button
									text="Login / Signup"
									onClick={redirectToLogIn}
								/>
							</Box>
						))}
				</Toolbar>
			</AppBar>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthenticated,
});

const Test = connect(mapStateToProps)(Appbar);

const Hoc = (props) => {
	return <Protected component={Test} {...props} />;
};

export default Hoc;
