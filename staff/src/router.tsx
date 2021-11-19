import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from './hooks/useAction';

import HomePage from './pages/Home';
import Loader from './components/Loader';
import { LoadingAnimationNormal } from './components/LoadingAnimation';
import NavBar from './components/NavBar';
import PrivateRoute from './components/ProtectedRoute';
import { asyncFetchAdminInfo } from './API/auth';

// import UpdateBlogPage from './pages/UpdateBlog';
// import UpdateLeadPage from './pages/updateLead';

// import LeadStrategyPage from './pages/LeadStrategy';

// import LoginPage from './pages/Login';
// import ManageLeadPage from './pages/ManageLead';
// import ManageLeadsPage from './pages/ManageProperty';
// import ManagePaymentPage from './pages/ManagePayment';

// import PostedLeadsPage from './pages/PostedLeads';

// import AddBlogPage from './pages/AddBlog';
// import AddLeadPage from './pages/AddLead';
// import AddPropertyPage from './pages/AddProperty';
// import BlogsPage from './pages/BlogList';
// import BrowsePropertiesPage from './pages/BrowseProperties';

const AddBlogPage = lazy(() => import('./pages/AddBlog'));
const PropertyLeadsDetailsPage = lazy(
	() => import('./pages/PropertyLeadDetails')
);
const PaymentLinksPage = lazy(() => import('./pages/PaymentLinks'));
const AddSubscriptionPage = lazy(() => import('./pages/AddSubscription'));
const AddPropertyLeadPage = lazy(() => import('./pages/AddPropertyLead'));
const PaymentLinkPage = lazy(() => import('./pages/PaymentLink'));
const AddLeadPage = lazy(() => import('./pages/AddLead'));
const AddPropertyPage = lazy(() => import('./pages/AddProperty'));
const BlogsPage = lazy(() => import('./pages/BlogList'));
const BrowsePropertiesPage = lazy(() => import('./pages/BrowseProperties/v2'));
const LeadStrategyPage = lazy(() => import('./pages/LeadStrategy'));
const LoginPage = lazy(() => import('./pages/Login'));
const ManageLeadPage = lazy(() => import('./pages/ManageLead'));
const ManageLeadsPage = lazy(() => import('./pages/ManageProperty'));
const ManagePaymentPage = lazy(() => import('./pages/ManagePayment'));
const PostedLeadsPage = lazy(() => import('./pages/PostedLeads'));
const UpdateBlogPage = lazy(() => import('./pages/UpdateBlog'));
const UpdateLeadPage = lazy(() => import('./pages/updateLead'));
const PostFromLeadPage = lazy(() => import('./pages/PostFromLead'));

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
			<Suspense fallback={<LoadingAnimationNormal />}>
				<Switch>
					<PrivateRoute
						path={'/'}
						exact={true}
						component={HomePage}
					/>
					<Route path={'/login'} component={LoginPage} />
					<Route
						path={'/add-property-lead'}
						component={AddPropertyLeadPage}
					/>
					<Route
						path={'/payment-links'}
						component={PaymentLinksPage}
					/>
					<PrivateRoute path={'/add-lead'} component={AddLeadPage} />
					<PrivateRoute
						path={'/add-subscription'}
						component={AddSubscriptionPage}
					/>
					<PrivateRoute
						path={'/payment-link'}
						component={PaymentLinkPage}
					/>
					<PrivateRoute
						path={'/lead/:id'}
						component={UpdateLeadPage}
					/>
					<PrivateRoute
						path={'/add-property/:pType'}
						component={AddPropertyPage}
					/>
					<PrivateRoute
						path={'/manage-property/:pType'}
						component={ManageLeadsPage}
					/>
					<PrivateRoute path={'/add-blog'} component={AddBlogPage} />
					<PrivateRoute path={'/blogs'} exact component={BlogsPage} />
					<PrivateRoute
						path={'/blogs/:id'}
						exact
						component={UpdateBlogPage}
					/>
					<PrivateRoute
						path={'/subscriptions'}
						exact
						component={ManagePaymentPage}
					/>
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
					<PrivateRoute
						path={'/property-leads/:id'}
						exact
						component={PropertyLeadsDetailsPage}
					/>
					<PrivateRoute
						path={'/post-from-leads/:id'}
						exact
						component={PostFromLeadPage}
					/>
				</Switch>
			</Suspense>
		</HashRouter>
	);
};

export default Router;
