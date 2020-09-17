import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import LogIn from './pages/login/login.component';
import HomePage from './pages/home/home.component';
import Query from './pages/queries/queries.component';
import Users from './pages/users/users.component';
import AddUser from './components/addUser/addUser.component';
import EditUser from './components/editUser/editUser.component';
import EditAdmin from './components/editAdmin/editAdmin.component';
import AddAdmin from './components/addAdmin/addAdmin.component';
import AdminPage from './pages/admins/admins.component';
import Authentication from './pages/authpage/authentication.component';
import AddProperty from './pages/addProperty/addProperty.component';
import AddPropertyForSale from './pages/addPropertyForSale/addPropertyWrapper.component';
import ActiveProperties from './pages/properties/properties.component';
import EditPropertyPage from './pages/editProperty/editProperty.component';
import AddCityPage from './pages/addCity/addCity.component';
import ViewCitiesPage from './pages/getCities/getCities.componet';
import AddLocationPage from './pages/addLocation/addLocation.component';
import LocationsPage from './pages/getLocations/getLocations.componet';
import EditCityPage from './pages/editCity/editCity.component';
import DeleteCityPage from './pages/deleteCity/deleteCity.component';
import EditLocationPage from './pages/editLocation/editLocation.component';
import DeleteLocationPage from './pages/deleteLocation/deleteLocation.component';
import DashboardPage from './pages/dashboard/dashboatd.component';
import PropertySale from './pages/properties/propertiesSale.component';
import EditPropertySalePage from './pages/editProperty/editPropertySale.component';
import AddProjectPage from './pages/addProject/addProject.component';
import AddBuilderPage from './pages/addBuilder/addBuilder.component';
import BuilderPage from './pages/builders/builders.component';
import ProjectPage from './pages/projects/projects.component';
import EditBuilderPage from './pages/editBuilder/editBuilder.component';
// components
import Drawer from './components/drawer/drawer.component';
// import Authenticated from './components/protected/protected.component';
// const HomePageWithDrawer = Drawer(HomePage);
const QueriesPageWithDrawer = Drawer(Query);
const UsersPageWithDrawer = Drawer(Users);
const AddUsersPageWithDrawer = Drawer(AddUser);
const EditUsersPageWithDrawer = Drawer(EditUser);
const EditAdminsPageWithDrawer = Drawer(EditAdmin);
const AdminPageWithDrawer = Drawer(AdminPage);
const AddAdminPageWithDrawer = Drawer(AddAdmin);
const AuthenticationPageWithDrawer = Drawer(Authentication);
const AddPropertyWithDrawer = Drawer(AddProperty);
const AddPropertyForSaleWithDrawer = Drawer(AddPropertyForSale);
const ActivePropertiesWithDrawer = Drawer(ActiveProperties);
const EditPropertyPageWithDrawer = Drawer(EditPropertyPage);
const AddCityPageWithDrawer = Drawer(AddCityPage);
const ViewCitiesPageWithDrawer = Drawer(ViewCitiesPage);
const AddLocationPageWithDrawer = Drawer(AddLocationPage);
const LocationsPageWithDrawer = Drawer(LocationsPage);
const EditCityPageWithDrawer = Drawer(EditCityPage);
const DeleteCityPageWithDrawer = Drawer(DeleteCityPage);
const EditLocationPageWithDrawer = Drawer(EditLocationPage);
const DeleteLocationPageWithDrawer = Drawer(DeleteLocationPage);
const DashboardPageWithDrawer = Drawer(DashboardPage);
const PropertySalePageWithDrawer = Drawer(PropertySale);
const EditPropertySalePageWithDrawer = Drawer(EditPropertySalePage);
const AddProjectPageWithDrawer = Drawer(AddProjectPage);
const AddBuilderPageWithDrawer = Drawer(AddBuilderPage);
const BuilderPageWithDrawer = Drawer(BuilderPage);
const ProjectPageWithDrawer = Drawer(ProjectPage);
const EditBuilderPageWithDrawer = Drawer(EditBuilderPage);

// import { Switch, Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

function App(props) {
	return (
		<div>
			<Switch>
				<Route
					exact
					path="/dashboard"
					render={() => <DashboardPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/locations/:state/:city?/"
					render={() => <LocationsPageWithDrawer {...props} />}
				/>
				<Route exact path="/" render={() => <LogIn />} />
				<Route exact path="/dashboard" render={() => <HomePage />} />
				<Route
					exact
					path="/queries"
					render={() => <QueriesPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/users"
					render={() => <UsersPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/users/add"
					render={() => <AddUsersPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/users/editUser/:id"
					render={() => <EditUsersPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/admins"
					render={() => <AdminPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/admins/add"
					render={() => <AddAdminPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/admins/editAdmin/:id"
					render={() => <EditAdminsPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/authentication"
					render={() => <AuthenticationPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/addProperty/rent"
					render={() => <AddPropertyWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/addProject"
					render={() => <AddProjectPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/addBuilder"
					render={() => <AddBuilderPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/addProperty/sale"
					render={() => <AddPropertyForSaleWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/all-properties/:status"
					render={() => <ActivePropertiesWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/builders/:status"
					render={() => <BuilderPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/projects/:status"
					render={() => <ProjectPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/edit-builder/:id"
					render={() => <EditBuilderPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/all-properties-sale/:status/:for"
					render={() => <PropertySalePageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/properties/editProperties/:id"
					render={() => <EditPropertyPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/properties/editPropertiesSale/:id"
					render={() => <EditPropertySalePageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/addCity"
					render={() => <AddCityPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/cities/:action/:id"
					render={(props) =>
						props.match.params.action === 'edit' ? (
							<EditCityPageWithDrawer {...props} />
						) : (
							<DeleteCityPageWithDrawer {...props} />
						)
					}
				/>
				<Route
					exact
					path="/locations/manage/:action/:id"
					render={(props) =>
						props.match.params.action === 'edit' ? (
							<EditLocationPageWithDrawer {...props} />
						) : (
							<DeleteLocationPageWithDrawer {...props} />
						)
					}
				/>
				<Route
					path="/cities/:state"
					render={() => <ViewCitiesPageWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/addLocation"
					render={() => <AddLocationPageWithDrawer {...props} />}
				/>
			</Switch>
		</div>
	);
}

export default App;
