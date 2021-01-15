import './App.css';

import { Route, Switch } from 'react-router-dom';

import ActiveProperties from './pages/properties/properties.component';
import AddAdmin from './components/addAdmin/addAdmin.component';
import AddBuilderPage from './pages/addBuilder/addBuilder.component';
import AddCityPage from './pages/addCity/addCity.component';
import AddLocationPage from './pages/addLocation/addLocation.component';
import AddProjectAdvertisementLeads from './pages/addProjectAdvertisementLeads/addLeads.page';
import AddProjectPage from './pages/addProject/addProject.component';
import AddProperty from './pages/addProperty/addProperty.component';
import AddPropertyForSale from './pages/addPropertyForSale/addPropertyWrapper.component';
import AddStaff from './pages/projectAdvertisement/AddStaff.page';
import AddUser from './components/addUser/addUser.component';
import AdminPage from './pages/admins/admins.component';
import Authentication from './pages/authpage/authentication.component';
import BuilderPage from './pages/builders/builders.component';
import DashboardPage from './pages/dashboard/dashboatd.component';
import DeleteCityPage from './pages/deleteCity/deleteCity.component';
import DeleteLocationPage from './pages/deleteLocation/deleteLocation.component';
import Drawer from './components/drawer/drawer.component';
import EditAdmin from './components/editAdmin/editAdmin.component';
import EditBuilderPage from './pages/editBuilder/editBuilder.component';
import EditCityPage from './pages/editCity/editCity.component';
import EditExpertQuery from './pages/queries/expertQueriesEdit.component';
import EditLocationPage from './pages/editLocation/editLocation.component';
import EditProjectAdvertisement from './pages/projectAdvertisement/editProjectAdvertisement.page';
import EditProjectAdvertisementLeads from './pages/editProjectAdvertisementLead/editLeads.page';
import EditProjectPage from './pages/editProject/editProject.component';
import EditPropertyPage from './pages/editProperty/editProperty.component';
import EditPropertySalePage from './pages/editProperty/editPropertySale.component';
import EditUser from './components/editUser/editUser.component';
import ExpertQuery from './pages/queries/expertQueries.component';
import Feedback from './pages/feedback/feedback.component';
import HOC from './components/hoc/hoc.component';
import HomePage from './pages/home/home.component';
import KPIPage from './pages/kpi/index.page';
import LocationsPage from './pages/getLocations/getLocations.componet';
import LogIn from './pages/login/login.component';
import ManageTask from './pages/manageTask/manageTask.page';
import ProjectAdvertisement from './pages/projectAdvertisement/projectAdvertisement.page';
import ProjectPage from './pages/projects/projects.component';
import PropertySale from './pages/properties/propertiesSale.component';
import Protected from './components/protected/protected.component';
import Query from './pages/queries/queries.component';
import React from 'react';
import RequestsPage from './pages/requestPhotosPage/requestPhotos.page';
import TypeHOC from './components/hoc/hocForAdminTYpe.component';
import TypeProtected from './components/typeProtected/typeProtected.component';
import Users from './pages/users/users.component';
import ViewCitiesPage from './pages/getCities/getCities.componet';
import Workspace from './pages/workspace/workspace.page';

// components

// import Authenticated from './components/protected/protected.component';
// const HomePageWithDrawer = Drawer(HomePage);
const ManageTaskPageWithDrawer = Drawer(ManageTask);
const AddProjectAdvertisementLeadsPageWithDrawer = Drawer(
	AddProjectAdvertisementLeads
);
const EditProjectAdvertisementLeadsPageWithDrawer = Drawer(
	EditProjectAdvertisementLeads
);
const WorkspacePageWithDrawer = Drawer(Workspace);
const KPIPageWithDrawer = Drawer(KPIPage);
const QueriesPageWithDrawer = Drawer(Query);
const ProjectAdvertisementPageWithDrawer = Drawer(ProjectAdvertisement);
const EditProjectAdvertisementPageWithDrawer = Drawer(EditProjectAdvertisement);
const AddStaffPageWithDrawer = Drawer(AddStaff);
const RequestsPageWithDrawer = Drawer(RequestsPage);
const FeedbackPageWithDrawer = Drawer(Feedback);
const ExpertQueriesPageWithDrawer = Drawer(ExpertQuery);
const EditExpertQueryPageWithDrawer = Drawer(EditExpertQuery);
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
							component={HOC(LocationsPageWithDrawer, [
								{
									type: 'locationActions',
									value: 'view',
								},
							])}
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
					path="/photo-requests"
					render={() => (
						<Protected
							component={RequestsPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/feedbacks"
					render={() => (
						<Protected
							component={FeedbackPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/expert-queries"
					render={() => (
						<Protected
							component={ExpertQueriesPageWithDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/update-expert-query/:id"
					render={() => (
						<Protected
							component={HOC(EditExpertQueryPageWithDrawer, [
								{
									type: 'expertQueryActions',
									value: 'update',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/users"
					render={() => (
						<Protected
							component={HOC(UsersPageWithDrawer, [
								{
									type: 'userActions',
									value: 'view',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/users/add"
					render={() => (
						<Protected
							component={HOC(AddUsersPageWithDrawer, [
								{
									type: 'userActions',
									value: 'create',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/users/editUser/:id"
					render={() => (
						<Protected
							component={HOC(EditUsersPageWithDrawer, [
								{
									type: 'userActions',
									value: 'update',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/admins"
					render={() => (
						<Protected
							component={TypeProtected}
							baseComponent={AdminPageWithDrawer}
							type="super-admin"
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/admins/add"
					render={() => (
						<Protected
							component={TypeProtected}
							baseComponent={AddAdminPageWithDrawer}
							type="super-admin"
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/admins/editAdmin/:id"
					render={() => (
						<Protected
							component={TypeProtected}
							baseComponent={EditAdminsPageWithDrawer}
							type="super-admin"
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
							component={HOC(AddPropertyWithDrawer, [
								{
									type: 'propertyAccess',
									value: 'rent',
								},
								{
									type: 'propertyActions',
									value: 'create',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addProject"
					render={() => (
						<Protected
							component={HOC(AddProjectPageWithDrawer, [
								{
									type: 'propertyAccess',
									value: 'project',
								},
								{
									type: 'propertyActions',
									value: 'create',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addBuilder"
					render={() => (
						<Protected
							component={HOC(AddBuilderPageWithDrawer, [
								{
									type: 'builderActions',
									value: 'create',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addProperty/sale"
					render={() => (
						<Protected
							component={HOC(AddPropertyForSaleWithDrawer, [
								{
									type: 'propertyAccess',
									value: 'sale',
								},
								{
									type: 'propertyActions',
									value: 'create',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/all-properties/:status"
					render={() => (
						<Protected
							component={HOC(ActivePropertiesWithDrawer, [
								{
									type: 'propertyAccess',
									value: 'rent',
								},
								{
									type: 'propertyActions',
									value: 'view',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/builders/:status"
					render={() => (
						<Protected
							component={HOC(BuilderPageWithDrawer, [
								{
									type: 'builderActions',
									value: 'view',
								},
							])}
							{...props}
						/>
					)}
				/>

				<Route
					exact
					path="/projects/:status"
					render={() => (
						<Protected
							component={HOC(ProjectPageWithDrawer, [
								{
									type: 'propertyAccess',
									value: 'project',
								},
								{
									type: 'propertyActions',
									value: 'view',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/edit-projects/:id"
					render={() => (
						<Protected
							component={HOC(EditProjectPageWithDrawer, [
								{
									type: 'propertyAccess',
									value: 'project',
								},
								{
									type: 'propertyActions',
									value: 'update',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/edit-builder/:id"
					render={() => (
						<Protected
							component={HOC(EditBuilderPageWithDrawer, [
								{
									type: 'builderActions',
									value: 'update',
								},
							])}
						/>
					)}
				/>
				<Route
					exact
					path="/all-properties-sale/:status/:for"
					render={() => (
						<Protected
							component={HOC(PropertySalePageWithDrawer, [
								{
									type: 'propertyAccess',
									value: 'sale',
								},
								{
									type: 'propertyActions',
									value: 'view',
								},
							])}
							{...props}
						/>
					)}
				/>

				<Route
					exact
					path="/properties/editProperties/:id"
					render={() => (
						<Protected
							component={HOC(EditPropertyPageWithDrawer, [
								{
									type: 'propertyAccess',
									value: 'rent',
								},
								{
									type: 'propertyActions',
									value: 'update',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/properties/editPropertiesSale/:id"
					render={() => (
						<Protected
							component={HOC(EditPropertySalePageWithDrawer, [
								{
									type: 'propertyAccess',
									value: 'sale',
								},
								{
									type: 'propertyActions',
									value: 'update',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addCity"
					render={() => (
						<Protected
							component={HOC(AddCityPageWithDrawer, [
								{
									type: 'cityActions',
									value: 'create',
								},
							])}
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
								component={HOC(EditCityPageWithDrawer, [
									{
										type: 'cityActions',
										value: 'update',
									},
								])}
								{...props}
							/>
						) : (
							<Protected
								component={HOC(DeleteCityPageWithDrawer, [
									{
										type: 'cityActions',
										value: 'delete',
									},
								])}
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
								component={HOC(EditLocationPageWithDrawer, [
									{
										type: 'locationActions',
										value: 'update',
									},
								])}
								{...props}
							/>
						) : (
							<Protected
								component={HOC(DeleteLocationPageWithDrawer, [
									{
										type: 'locationActions',
										value: 'delete',
									},
								])}
								{...props}
							/>
						)
					}
				/>
				<Route
					path="/cities/:state"
					render={() => (
						<Protected
							component={HOC(ViewCitiesPageWithDrawer, [
								{
									type: 'cityActions',
									value: 'view',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/addLocation"
					render={() => (
						<Protected
							component={HOC(AddLocationPageWithDrawer, [
								{
									type: 'locationActions',
									value: 'create',
								},
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/workspace"
					render={() => (
						<Protected
							component={TypeHOC(WorkspacePageWithDrawer, [
								'staff',
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/manage-task/:id"
					render={() => (
						<Protected
							component={TypeHOC(ManageTaskPageWithDrawer, [
								'staff',
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/project-advertisement"
					render={() => (
						<Protected
							component={TypeHOC(
								ProjectAdvertisementPageWithDrawer,
								['super-admin', 'admin']
							)}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/edit-project-advertisement/:id"
					render={() => (
						<Protected
							component={TypeHOC(
								EditProjectAdvertisementPageWithDrawer,
								['super-admin', 'admin']
							)}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/project-advertisement/:action"
					render={(props) => (
						<Protected
							component={TypeHOC(AddStaffPageWithDrawer, [
								'super-admin',
								'admin',
							])}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/add-project-advertisement-leads"
					render={(props) => (
						<Protected
							component={TypeHOC(
								AddProjectAdvertisementLeadsPageWithDrawer,
								['staff']
							)}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/edit-project-advertisement-leads/:id"
					render={(props) => (
						<Protected
							component={TypeHOC(
								EditProjectAdvertisementLeadsPageWithDrawer,
								['staff']
							)}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/kpi/:type/:action/:details?"
					render={(props) => (
						<Protected
							component={TypeHOC(KPIPageWithDrawer, [
								'super-admin',
								'admin',
							])}
							{...props}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
