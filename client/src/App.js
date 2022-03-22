import { Box } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import BackToTop from './components/backToTop';
import BottomNavigationComponent from './components/bottomNavigation';
import CreateQuery from './components/createQuery';
import Footer from './components/footer/footer.component';
import LogIn from './components/logInDialog/logInDialog.component';
import Protected from './components/protected/protected.component';
import ScrollToTop from './components/scrollToTop';
import { LoadingAnimationNormal } from './components/v2/loadingAnimation/index';
import PayPage from './pages/pay';
import HomePageNew from './pages/v2/homePage/home.page';
import { fetchUserProfile } from './redux/auth/auth.actions';
import { selectAuthenticated, selectUser } from './redux/auth/auth.selectors';
import { setSnackbar } from './redux/ui/ui.actions';
import { snackbarDetails } from './redux/ui/ui.selectors';
import { setLastActive } from './utils/asyncUser';

const PaymentPage = lazy(() =>
	import('./pages/testPayment/testPayment.component')
);

const NotFound = lazy(() => import('./pages/notFoundPage/notFound.page'));

// const HomePageNew = lazy(() => import('./pages/v2/homePage/home.page'));
const BuilderPage = lazy(() => import('./pages/v2/builderPage'));
const ChanelPartnerPage = lazy(() => import('./pages/v2/chanelPartner'));
const BrowseBuilderPage = lazy(() => import('./pages/v2/browseBuildersPage'));
const MySubscriptionsPage = lazy(() => import('./pages/v2/myPackages'));
const ManageProposalPage = lazy(() => import('./pages/proposal'));
const UpdateProfilePage = lazy(() => import('./pages/v2/updateProfile'));
const AgentPage = lazy(() => import('./pages/realtorDetailsv2'));
const MyQueriesPage = lazy(() => import('./pages/Queries'));
const NewsPage = lazy(() => import('./pages/news'));
const RealtorsPage = lazy(() => import('./pages/realtors'));
// const RealtorDetailsPage = lazy(() => import('./pages/realtorDetails'));
const NewsDetailsPage = lazy(() => import('./pages/newsDetails'));
const AboutUsPage = lazy(() => import('./pages/aboutUs'));
const TermsPage = lazy(() => import('./pages/terms'));
const PackageFeedbackPage = lazy(() => import('./pages/packageFeedback'));
const PrivacyPoliciesPage = lazy(() => import('./pages/privacy'));
const ContactUsPage = lazy(() => import('./pages/contact'));
const RefundPage = lazy(() => import('./pages/refund'));
const TenantPackagePage = lazy(() => import('./pages/tenantPackages'));
const TenantPackageConfirmationPage = lazy(() =>
	import('./pages/tenantPackages/confirmation')
);
const SearchPageNew = lazy(() => import('./pages/v2/searchPage/search.page'));
const PropertyDetailsPageNew = lazy(() =>
	import('./pages/v2/propertyDetails/propertyDetails.page')
);
const ProjectDetailsPageNew = lazy(() =>
	import('./pages/v2/projectDetailsPage/projectDetails.page')
);
const ProjectPropertyDetailsPage = lazy(() =>
	import('./pages/v2/projectPropertyDetails')
);
const ProfilePage = lazy(() =>
	import('./pages/v2/userProfile/userProfile.page')
);
const PostPropertyPageNew = lazy(() =>
	import('./pages/v2/postPage/postProperty.page')
);

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App({ authenticated, setSnackbar, snackbarDetails, fetchUser, user }) {
	const source = useRef(null);
	useEffect(() => {
		if (!authenticated) {
			const jwt = localStorage.getItem('JWT_CLIENT');
			if (jwt) {
				fetchUser(jwt, console.log);
			}
		} else {
			if (user) {
				source.current = axios.CancelToken.source();
				setLastActive(user.id, source.current);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authenticated, user]);

	useEffect(() => {
		return () => {
			if (source.current) {
				source.current.cancel('Component got unmounted');
			}
		};
	}, [source]);

	const handleClose = () => {
		console.log('object 2');
		setSnackbar({
			open: false,
		});
	};

	return (
		<Suspense fallback={<LoadingAnimationNormal />}>
			<Snackbar
				open={snackbarDetails.open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={snackbarDetails.severity}
				>
					{snackbarDetails.message}
				</Alert>
			</Snackbar>
			<LogIn />

			<BrowserRouter>
				<Box id="back-to-top-anchor" />
				<CreateQuery />
				<ScrollToTop>
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => <HomePageNew {...props} />}
						/>
						<Route
							exact
							path="/browse-builders"
							render={(props) => <BrowseBuilderPage {...props} />}
						/>

						<Route
							exact
							path="/tenant-packages"
							render={(props) => <TenantPackagePage {...props} />}
						/>
						<Route
							exact
							path="/manage-proposal/:id"
							render={(props) => (
								<ManageProposalPage {...props} />
							)}
						/>
						<Route
							exact
							path="/about-us"
							render={(props) => <AboutUsPage {...props} />}
						/>
						<Route
							exact
							path="/terms"
							render={(props) => <TermsPage {...props} />}
						/>
						<Route
							exact
							path="/privacy"
							render={(props) => (
								<PrivacyPoliciesPage {...props} />
							)}
						/>
						<Route
							exact
							path="/contact-us"
							render={(props) => <ContactUsPage {...props} />}
						/>
						<Route
							exact
							path="/refund"
							render={(props) => <RefundPage {...props} />}
						/>
						<Route
							exact
							path="/pay"
							render={(props) => <PayPage {...props} />}
						/>
						<Route
							exact
							path="/confirm-package/:packageName"
							render={(props) => (
								<TenantPackageConfirmationPage {...props} />
							)}
						/>
						<Route
							exact
							path="/realtors"
							render={(props) => <RealtorsPage {...props} />}
						/>
						<Route
							exact
							path="/update-profile/:iType"
							render={(props) => (
								<Protected
									component={UpdateProfilePage}
									{...props}
								/>
							)}
						/>
						<Route
							exact
							path="/my-packages"
							render={(props) => (
								<Protected
									component={MySubscriptionsPage}
									{...props}
								/>
							)}
						/>
						<Route
							exact
							path="/chanel-partner"
							render={(props) => (
								<Protected
									component={ChanelPartnerPage}
									{...props}
								/>
							)}
						/>
						<Route
							exact
							path="/my-queries"
							render={(props) => (
								<Protected
									component={MyQueriesPage}
									{...props}
								/>
							)}
						/>
						<Route
							exact
							path="/package-feedback/:id"
							render={(props) => (
								<Protected
									component={PackageFeedbackPage}
									{...props}
								/>
							)}
						/>
						<Route
							exact
							path="/realtors/:id"
							render={(props) => <AgentPage {...props} />}
						/>
						<Route
							exact
							path="/news"
							render={(props) => <NewsPage {...props} />}
						/>
						<Route
							exact
							path="/news/:slug"
							render={(props) => <NewsDetailsPage {...props} />}
						/>
						<Route
							exact
							path="/v2/property-details/:id"
							render={(props) => (
								<PropertyDetailsPageNew {...props} />
							)}
						/>
						<Route
							exact
							path="/project-details/:id"
							render={(props) => (
								<ProjectDetailsPageNew {...props} />
							)}
						/>
						<Route
							exact
							path="/v2/search"
							render={(props) => <SearchPageNew {...props} />}
						/>
						{/* <Route
							exact
							path="/v2/agent"
							render={(props) => <AgentPageNew {...props} />}
						/> */}
						<Route
							exact
							path="/v2/post-property"
							render={(props) => (
								<PostPropertyPageNew {...props} />
							)}
						/>
						{/* <Route
							exact
							path="/packages/:id"
							render={(props) => <PackagePage {...props} />}
						/> */}
						<Route
							exact
							path="/profile"
							render={(props) => (
								<Protected component={ProfilePage} {...props} />
							)}
						/>
						<Route
							exact
							path="/payment"
							render={(props) => <PaymentPage {...props} />}
						/>
						<Route
							exact
							path="/project-property/:id"
							render={(props) => (
								<ProjectPropertyDetailsPage {...props} />
							)}
						/>
						<Route
							exact
							path="/:slug"
							render={(props) => <BuilderPage {...props} />}
						/>
						<Route
							path="*"
							render={(props) => <NotFound {...props} />}
						/>
					</Switch>
				</ScrollToTop>
				<Footer />
				<BackToTop />

				<BottomNavigationComponent />
			</BrowserRouter>
		</Suspense>
	);
}

// export default App

const mapStateToProps = createStructuredSelector({
	authenticated: selectAuthenticated,
	user: selectUser,
	snackbarDetails,
});

const mapDispatchToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
	fetchUser: (token, callback) =>
		dispatch(fetchUserProfile({ token, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
