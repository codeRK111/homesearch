import {
	selectBuilder,
	selectKPI,
	selectKRA,
	selectLocation,
	selectPackage,
	selectProject,
	selectPropertyRent,
	selectPropertySale,
} from '../../redux/sidebar/sidebar.selector';
import {
	toggleBuilder,
	toggleKPI,
	toggleKRA,
	toggleLocation,
	togglePackage,
	toggleProject,
	togglePropertyRent,
	togglePropertySale,
} from '../../redux/sidebar/sidebar.actions';

import AddBoxIcon from '@material-ui/icons/AddBox';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ChatIcon from '@material-ui/icons/Chat';
import Collapse from '@material-ui/core/Collapse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FeedbackIcon from '@material-ui/icons/Feedback';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LockIcon from '@material-ui/icons/Lock';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhoneIcon from '@material-ui/icons/Phone';
import React from 'react';
import RenderByAdminType from '../roleRender/renderByRole.component';
import RenderByRole from '../roleRender/roleRender.component';
import WorkIcon from '@material-ui/icons/Work';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { useHistory } from 'react-router-dom';

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
	selectKRA,
	toggleKRA,
	selectKPI,
	selectPackage,
	toggleKPI,
	togglePackage,
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

	// Add property Rent Node
	const AddPropertyRentNode = RenderByRole(
		<ListItem
			button
			className={classes.nested}
			onClick={onUsersClick('/addProperty/rent')}
		>
			<ListItemIcon>
				<AddBoxIcon style={{ color: green[500] }} />
			</ListItemIcon>
			<ListItemText primary="Add Property" />
		</ListItem>,
		[
			{
				type: 'propertyAccess',
				value: 'rent',
			},
			{
				type: 'propertyActions',
				value: 'create',
			},
		]
	);
	// Add property Sale Node
	const AddPropertySaleNode = RenderByRole(
		<ListItem
			button
			className={classes.nested}
			onClick={onUsersClick('/addProperty/sale')}
		>
			<ListItemIcon>
				<AddBoxIcon style={{ color: green[500] }} />
			</ListItemIcon>
			<ListItemText primary="Add Property" />
		</ListItem>,
		[
			{
				type: 'propertyAccess',
				value: 'sale',
			},
			{
				type: 'propertyActions',
				value: 'create',
			},
		]
	);
	// Add project Node
	const AddProjectNode = RenderByRole(
		<ListItem
			button
			className={classes.nested}
			onClick={onUsersClick('/addProject')}
		>
			<ListItemIcon>
				<AddBoxIcon style={{ color: green[500] }} />
			</ListItemIcon>
			<ListItemText primary="Add Project" />
		</ListItem>,
		[
			{
				type: 'propertyAccess',
				value: 'project',
			},
			{
				type: 'propertyActions',
				value: 'create',
			},
		]
	);
	// Add project Node
	const AddBuilderNode = RenderByRole(
		<ListItem
			button
			className={classes.nested}
			onClick={onUsersClick('/addBuilder')}
		>
			<ListItemIcon>
				<AddBoxIcon style={{ color: green[500] }} />
			</ListItemIcon>
			<ListItemText primary="Add builder" />
		</ListItem>,
		[
			{
				type: 'builderActions',
				value: 'create',
			},
		]
	);
	// Add City Node
	const AddCityNode = RenderByRole(
		<ListItem
			button
			className={classes.nested}
			onClick={onUsersClick('/addCity')}
		>
			<ListItemIcon>
				<AddBoxIcon style={{ color: green[500] }} />
			</ListItemIcon>
			<ListItemText primary="Add City" />
		</ListItem>,
		[
			{
				type: 'cityActions',
				value: 'create',
			},
		]
	);
	// Add City Node
	const AddLocationNode = RenderByRole(
		<ListItem
			button
			className={classes.nested}
			onClick={onUsersClick('/addLocation')}
		>
			<ListItemIcon>
				<AddBoxIcon style={{ color: green[500] }} />
			</ListItemIcon>
			<ListItemText primary="Add Location" />
		</ListItem>,
		[
			{
				type: 'locationActions',
				value: 'create',
			},
		]
	);
	// View City Node
	const ViewCityNode = RenderByRole(
		<ListItem
			button
			className={classes.nested}
			onClick={onUsersClick('/cities/Odisha')}
		>
			<ListItemIcon>
				<ApartmentIcon style={{ color: green[500] }} />
			</ListItemIcon>
			<ListItemText primary="All Cities" />
		</ListItem>,
		[
			{
				type: 'cityActions',
				value: 'view',
			},
		]
	);
	// View City Node
	const ViewLocationNode = RenderByRole(
		<ListItem
			button
			className={classes.nested}
			onClick={onUsersClick('/locations/Odisha')}
		>
			<ListItemIcon>
				<ApartmentIcon style={{ color: green[500] }} />
			</ListItemIcon>
			<ListItemText primary="All Locations" />
		</ListItem>,
		[
			{
				type: 'locationActions',
				value: 'view',
			},
		]
	);

	const ViewPermissionNode = (accessType, ...Node) => {
		return (
			<div>
				{Node.map((N, i) => {
					const Comp = RenderByRole(N, [
						{
							type: 'propertyAccess',
							value: accessType,
						},
						{
							type: 'propertyActions',
							value: 'view',
						},
					]);

					return <Comp key={i} />;
				})}
			</div>
		);
	};
	const BuilderViewPermissionNode = (...Node) => {
		return (
			<div>
				{Node.map((N, i) => {
					const Comp = RenderByRole(N, [
						{
							type: 'builderActions',
							value: 'view',
						},
					]);

					return <Comp key={i} />;
				})}
			</div>
		);
	};

	// Rent Label
	const PropertyForRentLabelNode = RenderByRole(
		<ListItem button onClick={togglePropertyRent}>
			<ListItemIcon>
				<ApartmentIcon color="secondary" />
			</ListItemIcon>
			<ListItemText primary="Properties for rent" />
			{propertyRentOpen ? <ExpandLess /> : <ExpandMore />}
		</ListItem>,
		[
			{
				type: 'propertyActions',
				value: 'create',
			},
			{
				type: 'propertyActions',
				value: 'view',
			},
		],
		null,
		true
	);
	// Expert Queries
	const ExpertQueriesLabelNode = RenderByRole(
		<ListItem button onClick={onUsersClick('/expert-queries')}>
			<ListItemIcon>
				<ChatIcon color="secondary" />
			</ListItemIcon>
			<ListItemText primary="Callback requests" />
		</ListItem>,
		[
			{
				type: 'expertQueryActions',
				value: 'create',
			},
			{
				type: 'expertQueryActions',
				value: 'view',
			},
		],
		null,
		true
	);

	// Sale label
	const PropertyForSaleLabelNode = RenderByRole(
		<ListItem button onClick={togglePropertySale}>
			<ListItemIcon>
				<ApartmentIcon color="secondary" />
			</ListItemIcon>
			<ListItemText primary="Properties for sale" />
			{propertySaleOpen ? <ExpandLess /> : <ExpandMore />}
		</ListItem>,
		[
			{
				type: 'propertyActions',
				value: 'create',
			},
			{
				type: 'propertyActions',
				value: 'view',
			},
		],
		null,
		true
	);
	// Project label
	const ProjectLabelNode = RenderByRole(
		<ListItem button onClick={toggleProject}>
			<ListItemIcon>
				<ApartmentIcon color="secondary" />
			</ListItemIcon>
			<ListItemText primary="Projects" />
			{selectProject ? <ExpandLess /> : <ExpandMore />}
		</ListItem>,
		[
			{
				type: 'propertyActions',
				value: 'create',
			},
			{
				type: 'propertyActions',
				value: 'view',
			},
		],
		null,
		true
	);
	// User label
	const UserLabelNode = RenderByRole(
		<ListItem button onClick={onUsersClick('/users')}>
			<ListItemIcon>
				<PeopleAltIcon color="secondary" />
			</ListItemIcon>
			<ListItemText primary="Users" />
		</ListItem>,
		[
			{
				type: 'userActions',
				value: 'create',
			},
			{
				type: 'userActions',
				value: 'view',
			},
		],
		null,
		true
	);
	// Builder label
	const BuilderLabelNode = RenderByRole(
		<ListItem button onClick={toggleBuilder}>
			<ListItemIcon>
				<PeopleAltIcon color="secondary" />
			</ListItemIcon>
			<ListItemText primary="Builders" />
			{selectBuilder ? <ExpandLess /> : <ExpandMore />}
		</ListItem>,
		[
			{
				type: 'builderActions',
				value: 'create',
			},
			{
				type: 'builderActions',
				value: 'view',
			},
		],
		null,
		true
	);
	// City & Location label
	const CityAndLocationHeadingNode = RenderByRole(
		<ListItem button onClick={toggleLocation}>
			<ListItemIcon>
				<LocationCityIcon color="secondary" />
			</ListItemIcon>
			<ListItemText primary="Cities And Locations" />
			{locationOpen ? <ExpandLess /> : <ExpandMore />}
		</ListItem>,
		[
			{
				type: 'cityActions',
				value: 'create',
			},
			{
				type: 'cityActions',
				value: 'view',
			},
			{
				type: 'locationActions',
				value: 'create',
			},
			{
				type: 'locationActions',
				value: 'view',
			},
		],
		null,
		true
	);

	const RentLabel = RenderByRole(<PropertyForRentLabelNode />, [
		{
			type: 'propertyAccess',
			value: 'rent',
		},
	]);
	const SaleLabel = RenderByRole(<PropertyForSaleLabelNode />, [
		{
			type: 'propertyAccess',
			value: 'sale',
		},
	]);
	const ProjectLabel = RenderByRole(<ProjectLabelNode />, [
		{
			type: 'propertyAccess',
			value: 'project',
		},
	]);

	const KRA = RenderByAdminType({
		'super-admin': (
			<div>
				<ListItem button onClick={toggleKRA}>
					<ListItemIcon>
						<WorkIcon color="secondary" />
					</ListItemIcon>
					<ListItemText primary="KRA" />
					{selectKRA ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={selectKRA} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick('/project-advertisement')}
						>
							<ListItemIcon>
								<PhoneIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Project Advertisement" />
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick('/property-advertisement')}
						>
							<ListItemIcon>
								<PhoneIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Property Advertisement" />
						</ListItem>
					</List>
				</Collapse>
			</div>
		),
		admin: (
			<div>
				<ListItem button onClick={toggleKRA}>
					<ListItemIcon>
						<WorkIcon color="secondary" />
					</ListItemIcon>
					<ListItemText primary="KRA" />
					{selectKRA ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={selectKRA} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick('/project-advertisement')}
						>
							<ListItemIcon>
								<PhoneIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Project Advertisement" />
						</ListItem>
					</List>
				</Collapse>
			</div>
		),
	});
	const KPI = RenderByAdminType({
		'super-admin': (
			<div>
				<ListItem button onClick={toggleKPI}>
					<ListItemIcon>
						<WorkIcon color="secondary" />
					</ListItemIcon>
					<ListItemText primary="KPI" />
					{selectKPI ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={selectKPI} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick(
								'/kpi/project-advertisement/overview'
							)}
						>
							<ListItemIcon>
								<PhoneIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Project Advertisement" />
						</ListItem>
					</List>
				</Collapse>
			</div>
		),
		admin: (
			<div>
				<ListItem button onClick={toggleKPI}>
					<ListItemIcon>
						<WorkIcon color="secondary" />
					</ListItemIcon>
					<ListItemText primary="KPI" />
					{selectKPI ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={selectKPI} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick('/kpi/project-advertisement')}
						>
							<ListItemIcon>
								<PhoneIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Project Advertisement" />
						</ListItem>
					</List>
				</Collapse>
			</div>
		),
	});

	const Workspace = RenderByAdminType({
		staff: (
			<ListItem button onClick={onUsersClick('/workspace')}>
				<ListItemIcon>
					<WorkIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Workspace" />
			</ListItem>
		),
	});
	return (
		<div>
			<h3
				className={classes.name}
			>{`Hello ${selectCurrentUser.name}`}</h3>
			<Workspace />
			<ListItem button onClick={onUsersClick('/dashboard')}>
				<ListItemIcon>
					<DashboardIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
			<UserLabelNode />
			<Divider color="#fff" />
			{selectCurrentUser.type === 'super-admin' && (
				<ListItem button onClick={onUsersClick('/admins')}>
					<ListItemIcon>
						<PeopleOutlineIcon color="secondary" />
					</ListItemIcon>
					<ListItemText primary="Admin / Staffs" />
				</ListItem>
			)}
			<Divider color="#fff" />
			<ListItem button onClick={onUsersClick('/authentication')}>
				<ListItemIcon>
					<LockIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Authentication" />
			</ListItem>
			<Divider color="#fff" />
			<RentLabel />
			<Collapse in={propertyRentOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<AddPropertyRentNode />
					{ViewPermissionNode(
						'rent',
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick('/all-properties/active')}
						>
							<ListItemIcon>
								<ApartmentIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Active properties" />
						</ListItem>,
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick(
								'/all-properties/underScreening'
							)}
						>
							<ListItemIcon>
								<ApartmentIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Under screening properties" />
						</ListItem>,
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick('/all-properties/expired')}
						>
							<ListItemIcon>
								<ApartmentIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Expired properties" />
						</ListItem>,
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick('/wh-queries/rent')}
						>
							<ListItemIcon>
								<ApartmentIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Whatsapp Queries" />
						</ListItem>
					)}
				</List>
			</Collapse>
			<SaleLabel />
			<Collapse in={propertySaleOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<AddPropertySaleNode />
					{ViewPermissionNode(
						'sale',
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
						</ListItem>,
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
						</ListItem>,
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
					)}
				</List>
			</Collapse>
			<BuilderLabelNode />
			<Collapse in={selectBuilder} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<AddBuilderNode />
					{BuilderViewPermissionNode(
						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick('/builders/active')}
						>
							<ListItemIcon>
								<PeopleAltIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Active builders" />
						</ListItem>,
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
					)}
				</List>
			</Collapse>
			<ProjectLabel />
			<Collapse in={selectProject} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<AddProjectNode />
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/add-project-v2')}
					>
						<ListItemIcon>
							<PeopleAltIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add Project v2" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/add-agent')}
					>
						<ListItemIcon>
							<PersonAddIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Add Agent" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/project-specialities')}
					>
						<ListItemIcon>
							<PeopleAltIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Project Specialities" />
					</ListItem>

					{ViewPermissionNode(
						'project',

						<ListItem
							button
							className={classes.nested}
							onClick={onUsersClick('/projects/active')}
						>
							<ListItemIcon>
								<PeopleAltIcon style={{ color: green[500] }} />
							</ListItemIcon>
							<ListItemText primary="Active projects" />
						</ListItem>,
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
					)}
				</List>
			</Collapse>
			<CityAndLocationHeadingNode />

			<Collapse in={locationOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<AddCityNode />
					<AddLocationNode />
					<ViewCityNode />
					<ViewLocationNode />
				</List>
			</Collapse>
			<ListItem button onClick={onUsersClick('/queries')}>
				<ListItemIcon>
					<ChatIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Property queries" />
			</ListItem>
			<ExpertQueriesLabelNode />
			<ListItem button onClick={onUsersClick('/feedbacks')}>
				<ListItemIcon>
					<FeedbackIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Search Feedbacks" />
			</ListItem>

			<ListItem button onClick={togglePackage}>
				<ListItemIcon>
					<MonetizationOnIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Packages" />
				{selectKRA ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={selectPackage} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/builder-packages')}
					>
						<ListItemIcon>
							<LocationCityIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Builder Packages" />
					</ListItem>
					<ListItem
						button
						className={classes.nested}
						onClick={onUsersClick('/property-packages')}
					>
						<ListItemIcon>
							<LocationCityIcon style={{ color: green[500] }} />
						</ListItemIcon>
						<ListItemText primary="Property Packages" />
					</ListItem>
				</List>
			</Collapse>
			{/* <ListItem button onClick={onUsersClick('/photo-requests')}>
				<ListItemIcon>
					<CameraAltIcon color="secondary" />
				</ListItemIcon>
				<ListItemText primary="Photo Requests" />
			</ListItem>
			<KRA />
			<KPI /> */}
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
	selectKRA,
	selectKPI,
	selectPackage,
});

const dispatchStateToProps = (dispatch) => ({
	togglePropertyRent: () => dispatch(togglePropertyRent()),
	togglePropertySale: () => dispatch(togglePropertySale()),
	toggleLocation: () => dispatch(toggleLocation()),
	toggleProject: () => dispatch(toggleProject()),
	toggleBuilder: () => dispatch(toggleBuilder()),
	toggleKRA: () => dispatch(toggleKRA()),
	toggleKPI: () => dispatch(toggleKPI()),
	togglePackage: () => dispatch(togglePackage()),
});

export default connect(mapStateToProps, dispatchStateToProps)(MainListItems);
