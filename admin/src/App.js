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
import ActiveProperties from './pages/properties/properties.component';
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
const ActivePropertiesWithDrawer = Drawer(ActiveProperties);

// import { Switch, Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

function App(props) {
	return (
		<div>
			<Switch>
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
					path="/addProperty"
					render={() => <AddPropertyWithDrawer {...props} />}
				/>
				<Route
					exact
					path="/activeProperties"
					render={() => <ActivePropertiesWithDrawer {...props} />}
				/>
			</Switch>
		</div>
	);
}

export default App;
