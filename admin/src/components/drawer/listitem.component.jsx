import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Divider from '@material-ui/core/Divider';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import LockIcon from '@material-ui/icons/Lock';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
	whiteColor: {
		color: '#ffffff',
	},
}));

const MainListItems = () => {
	const classes = useStyles();
	const history = useHistory();
	const onUsersClick = (route) => () => history.push(route);
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};
	const [openCity, setOpenCity] = React.useState(false);

	const handleCityClick = () => {
		setOpenCity(!openCity);
	};
	return (
		<div>
			<ListItem button onClick={onUsersClick('/dashboard')}>
				<ListItemIcon>
					<DashboardIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
			<ListItem button onClick={onUsersClick('/users')}>
				<ListItemIcon>
					<PeopleAltIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Users" />
			</ListItem>
			<Divider color="#fff" />
			<ListItem button onClick={onUsersClick('/admins')}>
				<ListItemIcon>
					<PeopleOutlineIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Admin / Staffs" />
			</ListItem>
			<Divider color="#fff" />
			<ListItem button onClick={onUsersClick('/authentication')}>
				<ListItemIcon>
					<LockIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Authentication" />
			</ListItem>
			<Divider color="#fff" />
			<ListItem button onClick={handleClick}>
				<ListItemIcon>
					<ApartmentIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Properties" />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/addProperty/rent')}
					>
						<ListItemIcon>
							<AddBoxIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add Property for rent" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/addProperty/sale')}
					>
						<ListItemIcon>
							<AddBoxIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add Property for sale" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/all-properties/active')}
					>
						<ListItemIcon>
							<ApartmentIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Active properties" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/all-properties/underScreening')}
					>
						<ListItemIcon>
							<ApartmentIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Under screening properties" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/all-properties/expired')}
					>
						<ListItemIcon>
							<ApartmentIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Expired properties" />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button onClick={handleCityClick}>
				<ListItemIcon>
					<LocationCityIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Cities And Locations" />
				{openCity ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={openCity} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/addCity')}
					>
						<ListItemIcon>
							<AddBoxIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add City" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/addLocation')}
					>
						<ListItemIcon>
							<AddBoxIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add Location" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/cities/Odisha')}
					>
						<ListItemIcon>
							<ApartmentIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="All Cities" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/locations/Odisha')}
					>
						<ListItemIcon>
							<ApartmentIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="All Locations" />
					</ListItem>
				</List>
			</Collapse>
		</div>
	);
};

export default MainListItems;
