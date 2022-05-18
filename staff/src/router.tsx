import { default as CPHomePage, default as HomePage } from './pages/Home';
import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from './hooks/useAction';

import Loader from './components/Loader';
import { LoadingAnimationNormal } from './components/LoadingAnimation';
import NavBar from './components/NavBar';
import PrivateRoute from './components/ProtectedRoute';
import { asyncFetchAdminInfo } from './API/auth';

const AddBlogPage = lazy(() => import('./pages/AddBlog'));
const UserQueriesPage = lazy(() => import('./pages/ManageUserQueries'));
const PropertyLeadsDetailsPage = lazy(
	() => import('./pages/PropertyLeadDetails')
);
const PaymentLinksPage = lazy(() => import('./pages/PaymentLinks'));
const ManagePackagesPage = lazy(() => import('./pages/ManagePackage/index'));
const UpdatePackagePage = lazy(
	() => import('./pages/ManagePackage/updatePackage')
);
const AddSubscriptionPage = lazy(() => import('./pages/AddSubscription'));
const CreateInvoicePage = lazy(() => import('./pages/CreateInvoicePage'));
const ManageCityPage = lazy(() => import('./pages/ManageCity'));
const AddProjectPage = lazy(() => import('./pages/AddProject'));
const SharePackageLinkPage = lazy(() => import('./pages/SharePackageLink'));
const AddPropertyLeadPage = lazy(() => import('./pages/AddPropertyLead'));
const PaymentLinkPage = lazy(() => import('./pages/PaymentLink'));
const AddLeadPage = lazy(() => import('./pages/AddLead'));
const AddPropertyPage = lazy(() => import('./pages/AddProperty'));
const BlogsPage = lazy(() => import('./pages/BlogList'));
const BrowsePropertiesPage = lazy(() => import('./pages/BrowseProperties/v2'));
const LeadStrategyPage = lazy(() => import('./pages/LeadStrategy'));
const TestimonialPage = lazy(() => import('./pages/Testimonial'));
const LoginPage = lazy(() => import('./pages/Login'));
const ManageLeadPage = lazy(() => import('./pages/ManageLead'));
const ManageLeadsPage = lazy(() => import('./pages/ManageProperty'));
const ManagePaymentPage = lazy(() => import('./pages/ManagePayment'));
const PostedLeadsPage = lazy(() => import('./pages/PostedLeads'));
const UpdateBlogPage = lazy(() => import('./pages/UpdateBlog'));
const PostFromLeadPage = lazy(() => import('./pages/PostFromLead'));
const VerifyPaymentPage = lazy(() => import('./pages/VerifyPayment'));
const ManageTragetPage = lazy(() => import('./pages/MnageTraget'));
const MyDealsPage = lazy(() => import('./pages/MyDeals'));
const ManageGSTPage = lazy(() => import('./pages/ManageGST'));

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
					<PrivateRoute
						path={'/cp'}
						exact={true}
						component={CPHomePage}
					/>
					<PrivateRoute
						path={'/user-contact'}
						exact={true}
						component={UserQueriesPage}
					/>
					<PrivateRoute
						path={'/manage-city'}
						exact={true}
						component={ManageCityPage}
					/>
					<PrivateRoute
						path={'/create-invoice'}
						exact={true}
						component={CreateInvoicePage}
					/>
					<PrivateRoute
						path={'/manage-gst'}
						exact={true}
						component={ManageGSTPage}
					/>
					<PrivateRoute
						path={'/add-project'}
						exact={true}
						component={AddProjectPage}
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
						path={'/testimonials'}
						exact
						component={TestimonialPage}
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
						path={'/manage-target'}
						exact
						component={ManageTragetPage}
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
					<PrivateRoute
						path={'/verify-payment'}
						exact
						component={VerifyPaymentPage}
					/>
					<PrivateRoute
						path={'/manage-packages'}
						exact
						component={ManagePackagesPage}
					/>
					<PrivateRoute
						path={'/update-package/:id'}
						exact
						component={UpdatePackagePage}
					/>
					<PrivateRoute
						path={'/share-package-link'}
						exact
						component={SharePackageLinkPage}
					/>
					<PrivateRoute
						path={'/my-deals'}
						exact
						component={MyDealsPage}
					/>
				</Switch>
			</Suspense>
		</HashRouter>
	);
};

export default Router;
