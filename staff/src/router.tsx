import { HashRouter, Route, Switch } from 'react-router-dom';

import AddBlogPage from './pages/AddBlog';
import AddLeadPage from './pages/AddLead';
import AddPropertyPage from './pages/AddProperty';
import BlogsPage from './pages/BlogList';
import HomePage from './pages/Home';
import LeadStrategyPage from './pages/LeadStrategy';
import LoginPage from './pages/Login';
import NavBar from './components/NavBar';
import PrivateRoute from './components/ProtectedRoute';
import React from 'react';
import UpdateBlogPage from './pages/UpdateBlog';
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
				<PrivateRoute
					path={'/add-property/:pType'}
					component={AddPropertyPage}
				>
					{/* <ViewLeadsPage /> */}
				</PrivateRoute>
				<PrivateRoute path={'/add-blog'} component={AddBlogPage}>
					{/* <ViewLeadsPage /> */}
				</PrivateRoute>
				<PrivateRoute path={'/blogs'} exact component={BlogsPage}>
					{/* <ViewLeadsPage /> */}
				</PrivateRoute>
				<PrivateRoute
					path={'/blogs/:id'}
					exact
					component={UpdateBlogPage}
				>
					{/* <ViewLeadsPage /> */}
				</PrivateRoute>
				<PrivateRoute
					path={'/lead-strategies'}
					exact
					component={LeadStrategyPage}
				/>
			</Switch>
		</HashRouter>
	);
};

export default Router;
