import { HashRouter, Route, Switch } from 'react-router-dom';

import AddLeadPage from './pages/AddLead';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import NavBar from './components/NavBar';
import PrivateRoute from './components/ProtectedRoute';
import React from 'react';
import UpdateLeadPage from './pages/updateLead';
import ViewLeadsPage from './pages/ViewLeads';

const Router = () => {
	return (
		<HashRouter>
			<NavBar />
			<Switch>
				<PrivateRoute
					path={'/'}
					exact={true}
					component={HomePage}
				></PrivateRoute>
				<Route path={'/login'} component={LoginPage}></Route>
				<PrivateRoute
					path={'/add-lead'}
					component={AddLeadPage}
				></PrivateRoute>
				<PrivateRoute path={'/leads'} component={ViewLeadsPage}>
					{/* <ViewLeadsPage /> */}
				</PrivateRoute>
				<PrivateRoute path={'/lead/:id'} component={UpdateLeadPage}>
					{/* <ViewLeadsPage /> */}
				</PrivateRoute>
			</Switch>
		</HashRouter>
	);
};

export default Router;
