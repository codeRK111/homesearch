import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import LogIn from './pages/login/login.component';
import HomePage from './pages/home/home.component';
import Query from './pages/queries/queries.component';
import Users from './pages/users/users.component';
import AddUser from './components/addUser/addUser.component';
import EditUser from './components/editUser/editUser.component';
// components
import Drawer from './components/drawer/drawer.component';
// import Authenticated from './components/protected/protected.component';
// const HomePageWithDrawer = Drawer(HomePage);
const QueriesPageWithDrawer = Drawer(Query);
const UsersPageWithDrawer = Drawer(Users);
const AddUsersPageWithDrawer = Drawer(AddUser);
const EditUsersPageWithDrawer = Drawer(EditUser);

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
			</Switch>
		</div>
	);
}

export default App;
