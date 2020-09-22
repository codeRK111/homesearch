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
import EditProjectPage from './pages/editProject/editProject.component';
// components
import Drawer from './components/drawer/drawer.component';
import Protected from './components/protected/protected.component';
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
const EditProjectPageWithDrawer = Drawer(EditProjectPage);

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
					render={() => (
						<Protected
							component={DashboardPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/locations/:state/:city?/"
					render={() => (
						<Protected
							component={LocationsPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route exact path="/" render={() => <LogIn />} />
				<Route
					exact
					path="/queries"
					render={() => (
						<Protected
							component={QueriesPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/users"
					render={() => (
						<Protected component={UsersPageWithDrawer} {...props} />
					)}
				/>
				<Route
					exact
					path="/users/add"
					render={() => (
						<Protected
							component={AddUsersPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/users/editUser/:id"
					render={() => (
						<Protected
							component={EditUsersPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/admins"
					render={() => (
						<Protected component={AdminPageWithDrawer} {...props} />
					)}
				/>
				<Route
					exact
					path="/admins/add"
					render={() => (
						<Protected
							component={AddAdminPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/admins/editAdmin/:id"
					render={() => (
						<Protected
							component={EditAdminsPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/authentication"
					render={() => (
						<Protected
							component={AuthenticationPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addProperty/rent"
					render={() => (
						<Protected
							component={AddPropertyWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addProject"
					render={() => (
						<Protected
							component={AddProjectPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addBuilder"
					render={() => (
						<Protected
							component={AddBuilderPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addProperty/sale"
					render={() => (
						<Protected
							component={AddPropertyForSaleWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/all-properties/:status"
					render={() => (
						<Protected
							component={ActivePropertiesWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/builders/:status"
					render={() => (
						<Protected
							component={BuilderPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/projects/:status"
					render={() => (
						<Protected
							component={ProjectPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/edit-projects/:id"
					render={() => (
						<Protected
							component={EditProjectPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/edit-builder/:id"
					render={() => (
						<Protected
							component={EditBuilderPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/all-properties-sale/:status/:for"
					render={() => (
						<Protected
							component={PropertySalePageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/properties/editProperties/:id"
					render={() => (
						<Protected
							component={EditPropertyPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/properties/editPropertiesSale/:id"
					render={() => (
						<Protected
							component={EditPropertySalePageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addCity"
					render={() => (
						<Protected
							component={AddCityPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/cities/:action/:id"
					render={(props) =>
						props.match.params.action === 'edit' ? (
							<Protected
								component={EditCityPageWithDrawer}
								{...props}
							/>
						) : (
							<Protected
								component={DeleteCityPageWithDrawer}
								{...props}
							/>
						)
					}
				/>
				<Route
					exact
					path="/locations/manage/:action/:id"
					render={(props) =>
						props.match.params.action === 'edit' ? (
							<Protected
								component={EditLocationPageWithDrawer}
								{...props}
							/>
						) : (
							<Protected
								component={DeleteLocationPageWithDrawer}
								{...props}
							/>
						)
					}
				/>
				<Route
					path="/cities/:state"
					render={() => (
						<Protected
							component={ViewCitiesPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addLocation"
					render={() => (
						<Protected
							component={AddLocationPageWithDrawer}
							{...props}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
