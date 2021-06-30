import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { loginDialogStatus, snackbarDetails } from './redux/ui/ui.selectors';
import {
	selectAuthenticated,
	selectUserProfileLoading,
} from './redux/auth/auth.selectors';
import { setSnackbar, toggleLoginPopup } from './redux/ui/ui.actions';

import LogIn from './components/logInDialog/logInDialog.component';
import MuiAlert from '@material-ui/lab/Alert';
import Protected from './components/protected/protected.component';
import Snackbar from '@material-ui/core/Snackbar';
import SpeedDial from './components/speedDial/speedDial.component';
import SuspenseLoader from './components/initialLoader/initialLoader.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const BrowsePage = lazy(() => import('./pages/browsePage/browse.page'));
const PaymentPage = lazy(() =>
	import('./pages/testPayment/testPayment.component')
);
const DetailsPage = lazy(() =>
	import('./pages/detailsPageNew/detailsPage.component')
);
const EditProperty = lazy(() =>
	import('./pages/postPropertyDetailsPage/editWrapper.page')
);
const HomePage = lazy(() => import('./pages/home/home.page'));
const LoginPage = lazy(() => import('./pages/login/login.page'));
const MobileSearch = lazy(() =>
	import('./pages/mobileSearch/mobileSearch.page')
);
const OTPPage = lazy(() => import('./pages/otp/otp.page'));
const PostProperty = lazy(() => import('./pages/postProperty'));
const PostPropertyDetailsPage = lazy(() =>
	import('./pages/postPropertyDetailsPage')
);
const ProfilePage = lazy(() => import('./pages/profile/profile.page'));
const ProfileUpdate = lazy(() => import('./pages/profile/profileUpdate.page'));
const ProjectDetailsPage = lazy(() =>
	import('./pages/projectDetails/index.component')
);
const ProjectProperty = lazy(() =>
	import('./pages/projectDetails/projectPropertyWrapper.component')
);
const ResetPassword = lazy(() =>
	import('./pages/resetPasswordPage/resetPassword.page')
);
const SearchPage = lazy(() =>
	import('./pages/searchResultPage/searchResultPage.page')
);
const SignUpForm = lazy(() => import('./pages/signup/signup.page'));
const ProjectPage = lazy(() => import('./pages/projectPage/project.page'));
const BuilderPage = lazy(() => import('./pages/builderPage/builder.page'));
const NotFound = lazy(() => import('./pages/notFoundPage/notFound.page'));
const HomePageNew = lazy(() => import('./pages/v2/homePage/home.page'));
const SearchPageNew = lazy(() => import('./pages/v2/searchPage/search.page'));
const PropertyDetailsPageNew = lazy(() =>
	import('./pages/v2/propertyDetails/propertyDetails.page')
);
const ProjectDetailsPageNew = lazy(() =>
	import('./pages/v2/projectDetailsPage/projectDetails.page')
);
const AgentPageNew = lazy(() => import('./pages/v2/agentPage/agent.page'));
const PostPropertyPageNew = lazy(() =>
	import('./pages/v2/postPage/postProperty.page')
);

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App({
	toggleLoginPopup,
	open,
	authenticated,
	profileLoading,
	setSnackbar,
	snackbarDetails,
}) {
	const timer = React.useRef(undefined);
	// React.useEffect(() => {
	// 	if (!authenticated && !profileLoading && !open) {
	// 		timer.current = setTimeout(() => {
	// 			if (!authenticated && !profileLoading && !open) {
	// 				toggleLoginPopup(true);
	// 			}
	// 		}, 10000);
	// 	} else {
	// 		if (typeof timer.current !== undefined) {
	// 			window.clearTimeout(timer.current);
	// 			toggleLoginPopup(false);
	// 		}
	// 	}

	// 	// I will be deleted while component is unmounting.
	// }, [authenticated, profileLoading]);

	const handleClose = () => {
		setSnackbar({
			open: false,
		});
	};

	return (
		<Suspense fallback={<SuspenseLoader />}>
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
			<HashRouter>
				{/* <SpeedDial /> */}
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => <HomePage {...props} />}
					/>
					<Route
						exact
						path="/v2/home"
						render={(props) => <HomePageNew {...props} />}
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
						path="/v2/project-details"
						render={(props) => <ProjectDetailsPageNew {...props} />}
					/>
					<Route
						exact
						path="/v2/search"
						render={(props) => <SearchPageNew {...props} />}
					/>
					<Route
						exact
						path="/v2/agent"
						render={(props) => <AgentPageNew {...props} />}
					/>
					<Route
						exact
						path="/v2/post-property"
						render={(props) => <PostPropertyPageNew {...props} />}
					/>
					<Route
						exact
						path="/payment"
						render={(props) => <PaymentPage {...props} />}
					/>

					<Route
						exact
						path="/profile"
						render={(props) => (
							<Protected
								component={ProfilePage}
								{...props}
								redirect={true}
							/>
						)}
					/>
					<Route
						exact
						path="/update-profile"
						render={(props) => (
							<Protected
								component={ProfileUpdate}
								redirect
								{...props}
							/>
						)}
					/>
					<Route
						exact
						path="/m/search"
						render={() => <MobileSearch />}
					/>
					<Route
						exact
						path="/search-results"
						render={(props) => <SearchPage {...props} />}
					/>
					<Route
						exact
						path="/browse"
						render={(props) => <BrowsePage {...props} />}
					/>
					<Route
						exact
						path="/project/:id"
						render={(props) => <ProjectDetailsPage {...props} />}
					/>
					<Route
						exact
						path="/property-details/:id"
						render={(props) => <DetailsPage {...props} />}
					/>
					<Route
						exact
						path="/edit-property/:id"
						render={(props) => (
							<Protected component={EditProperty} {...props} />
						)}
					/>
					<Route
						exact
						path="/project-property/:id"
						render={(props) => <ProjectProperty {...props} />}
					/>
					<Route
						exact
						path="/post-property/:propertyForParam"
						render={(props) => (
							<Protected
								component={PostProperty}
								redirectTo="post-property"
								{...props}
							/>
						)}
					/>
					<Route
						exact
						path="/post-property-details/:pFor/:pType"
						render={(props) => (
							<Protected
								component={PostPropertyDetailsPage}
								{...props}
							/>
						)}
					/>
					<Route
						exact
						path="/builder/:slug"
						render={(props) => <BuilderPage {...props} />}
					/>
					<Route
						exact
						path="/:projectId"
						render={(props) => <ProjectPage {...props} />}
					/>
					<Route
						path="*"
						render={(props) => <NotFound {...props} />}
					/>
				</Switch>
			</HashRouter>
		</Suspense>
	);
}

// export default App

const mapStateToProps = createStructuredSelector({
	authenticated: selectAuthenticated,
	open: loginDialogStatus,
	profileLoading: selectUserProfileLoading,
	snackbarDetails,
});

const mapDispatchToProps = (dispatch) => ({
	toggleLoginPopup: (status) => dispatch(toggleLoginPopup(status)),
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
