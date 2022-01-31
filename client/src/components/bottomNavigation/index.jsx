import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PostAddIcon from '@material-ui/icons/PostAdd';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	appBar: {
		top: 'auto',
		bottom: 0,
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
}));

const paths = ['/', '/tenant-packages', '/v2/post-property', '/realtors'];

export default function BottomNavigationComponent() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const history = useHistory();

	return (
		<AppBar position="fixed" color="transparent" className={classes.appBar}>
			<BottomNavigation
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
					console.log({ newValue });
					history.push(paths[newValue]);
				}}
				showLabels
				className={classes.root}
			>
				<BottomNavigationAction label="Home" icon={<HomeIcon />} />
				<BottomNavigationAction
					label="Packages"
					icon={<MonetizationOnIcon />}
				/>
				<BottomNavigationAction
					label="Property"
					icon={<PostAddIcon />}
				/>
				<BottomNavigationAction
					label="Realtors"
					icon={<PeopleAltIcon />}
				/>
			</BottomNavigation>
		</AppBar>
	);
}
