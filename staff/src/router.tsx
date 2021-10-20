import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from './hooks/useAction';

import AddBlogPage from './pages/AddBlog';
import AddLeadPage from './pages/AddLead';
import AddPropertyPage from './pages/AddProperty';
import BlogsPage from './pages/BlogList';
import BrowsePropertiesPage from './pages/BrowseProperties';
import HomePage from './pages/Home';
import LeadStrategyPage from './pages/LeadStrategy';
import Loader from './components/Loader';
import LoginPage from './pages/Login';
import ManageLeadPage from './pages/ManageLead';
import ManageLeadsPage from './pages/ManageProperty';
import ManagePaymentPage from './pages/ManagePayment';
import NavBar from './components/NavBar';
import PostedLeadsPage from './pages/PostedLeads';
import PrivateRoute from './components/ProtectedRoute';
import UpdateBlogPage from './pages/UpdateBlog';
import UpdateLeadPage from './pages/updateLead';
import { asyncFetchAdminInfo } from './API/auth';

const Router = () => {
	const { setUser } = useRepositoryAction(ResourceType.Auth);
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [loading, setLoading] = useState(true);

	const fetchInfo = useCallback(async () => {
		try {
			const info = await asyncFetchAdminInfo();
			setUser(info);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			let message = '';
			if (error.message === 'jwt expired') {
				message = 'Session Expired Plase Login';
			} else {
				message = error.message;
			}
			setSnackbar({
				open: true,
				message,
				severity: 'error',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchInfo();
	}, [fetchInfo]);

	return loading ? (
		<Loader open={loading} />
	) : (
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

				<PrivateRoute path={'/lead/:id'} component={UpdateLeadPage}>
					{/* <ViewLeadsPage /> */}
				</PrivateRoute>
				<PrivateRoute
					path={'/add-property/:pType'}
					component={AddPropertyPage}
				>
					{/* <ViewLeadsPage /> */}
				</PrivateRoute>
				<PrivateRoute
					path={'/manage-property/:pType'}
					component={ManageLeadsPage}
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
				></PrivateRoute>
				<PrivateRoute
					path={'/subscriptions'}
					exact
					component={ManagePaymentPage}
				>
					{/* <ViewLeadsPage /> */}
				</PrivateRoute>
				<PrivateRoute
					path={'/lead-strategies'}
					exact
					component={LeadStrategyPage}
				/>
				<PrivateRoute
					path={'/posted-leads'}
					exact
					component={PostedLeadsPage}
				/>
				<PrivateRoute
					path={'/manage-lead/:id'}
					exact
					component={ManageLeadPage}
				/>
				<PrivateRoute
					path={'/browse-properties'}
					exact
					component={BrowsePropertiesPage}
				/>
			</Switch>
		</HashRouter>
	);
};

export default Router;
