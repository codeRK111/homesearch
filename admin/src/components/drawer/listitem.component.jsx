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
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectPropertyRent,
	selectPropertySale,
	selectLocation,
	selectProject,
	selectBuilder,
} from '../../redux/sidebar/sidebar.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {
	togglePropertyRent,
	togglePropertySale,
	toggleLocation,
	toggleProject,
	toggleBuilder,
} from '../../redux/sidebar/sidebar.actions';

const useStyles = makeStyles((theme) => ({
	nested: {
		paddingLeft: theme.spacing(4),
	},
	name: {
		paddingLeft: theme.spacing(2),
		fontWeight: 'bold',
		color: 'yellow',
		fontSize: '1.5rem',
	},
	whiteColor: {
		color: '#ffffff',
	},
}));

const MainListItems = ({
	propertyRentOpen,
	propertySaleOpen,
	locationOpen,
	togglePropertyRent,
	togglePropertySale,
	toggleLocation,
	selectProject,
	toggleProject,
	selectBuilder,
	toggleBuilder,
	selectCurrentUser,
}) => {
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
	const [openSaleProperty, setOpenSaleProperty] = React.useState(false);

	const handleSalePropertyClick = () => {
		setOpenSaleProperty(!openSaleProperty);
	};
	return (
		<div>
			<h3
				className={classes.name}
			>{`Hello ${selectCurrentUser.name}`}</h3>
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
			<ListItem button onClick={togglePropertyRent}>
				<ListItemIcon>
					<ApartmentIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Properties for rent" />
				{propertyRentOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={propertyRentOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/addProperty/rent')}
					>
						<ListItemIcon>
							<AddBoxIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add Property" />
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
			<ListItem button onClick={togglePropertySale}>
				<ListItemIcon>
					<ApartmentIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Properties for sale" />
				{propertySaleOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={propertySaleOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/addProperty/sale')}
					>
						<ListItemIcon>
							<AddBoxIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add Property" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick(
							'/all-properties-sale/active/sale'
						)}
					>
						<ListItemIcon>
							<ApartmentIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Active properties" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick(
							'/all-properties-sale/underScreening/sale'
						)}
					>
						<ListItemIcon>
							<ApartmentIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Under screening properties" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick(
							'/all-properties-sale/expired/sale'
						)}
					>
						<ListItemIcon>
							<ApartmentIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Expired properties" />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button onClick={toggleBuilder}>
				<ListItemIcon>
					<PeopleAltIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Builders" />
				{selectBuilder ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={selectBuilder} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/addBuilder')}
					>
						<ListItemIcon>
							<AddBoxIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add builder" />
					</ListItem>

					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/builders/active')}
					>
						<ListItemIcon>
							<PeopleAltIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Active builders" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/builders/inactive')}
					>
						<ListItemIcon>
							<PeopleAltIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Inactive builders" />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button onClick={toggleProject}>
				<ListItemIcon>
					<ApartmentIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Projects" />
				{selectProject ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={selectProject} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/addProject')}
					>
						<ListItemIcon>
							<AddBoxIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add Project" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/projects/active')}
					>
						<ListItemIcon>
							<PeopleAltIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Active projects" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/projects/inactive')}
					>
						<ListItemIcon>
							<PeopleAltIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Inactive projects" />
					</ListItem>
				</List>
			</Collapse>
			<ListItem button onClick={toggleLocation}>
				<ListItemIcon>
					<LocationCityIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Cities And Locations" />
				{locationOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={locationOpen} timeout="auto" unmountOnExit>
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

const mapStateToProps = createStructuredSelector({
	propertyRentOpen: selectPropertyRent,
	propertySaleOpen: selectPropertySale,
	locationOpen: selectLocation,
	selectProject: selectProject,
	selectBuilder,
	selectCurrentUser,
});

const dispatchStateToProps = (dispatch) => ({
	togglePropertyRent: () => dispatch(togglePropertyRent()),
	togglePropertySale: () => dispatch(togglePropertySale()),
	toggleLocation: () => dispatch(toggleLocation()),
	toggleProject: () => dispatch(toggleProject()),
	toggleBuilder: () => dispatch(toggleBuilder()),
});

export default connect(mapStateToProps, dispatchStateToProps)(MainListItems);
