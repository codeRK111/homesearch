import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import { LoadingAnimationNormal } from './components/v2/loadingAnimation';
import LogIn from './components/logInDialog/logInDialog.component';
import MuiAlert from '@material-ui/lab/Alert';
import Protected from './components/protected/protected.component';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchUserProfile } from './redux/auth/auth.actions';
import { selectAuthenticated } from './redux/auth/auth.selectors';
import { setSnackbar } from './redux/ui/ui.actions';
import { snackbarDetails } from './redux/ui/ui.selectors';

const PaymentPage = lazy(() =>
	import('./pages/testPayment/testPayment.component')
);

const NotFound = lazy(() => import('./pages/notFoundPage/notFound.page'));
const PackagePage = lazy(() =>
	import('./pages/v2/PlanPage/planPage.component')
);
const HomePageNew = lazy(() => import('./pages/v2/homePage/home.page'));
const SearchPageNew = lazy(() => import('./pages/v2/searchPage/search.page'));
const PropertyDetailsPageNew = lazy(() =>
	import('./pages/v2/propertyDetails/propertyDetails.page')
);
const ProjectDetailsPageNew = lazy(() =>
	import('./pages/v2/projectDetailsPage/projectDetails.page')
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

function App({ authenticated, setSnackbar, snackbarDetails, fetchUser }) {
	React.useEffect(() => {
		if (!authenticated) {
			const jwt = localStorage.getItem('JWT_CLIENT');
			if (jwt) {
				fetchUser(jwt, console.log);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authenticated]);

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
			<HashRouter>
				{/* <SpeedDial /> */}
				<Switch>
					<Route
						exact
						path="/"
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
						path="/v2/project-details/:id"
						render={(props) => <ProjectDetailsPageNew {...props} />}
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
						render={(props) => <PostPropertyPageNew {...props} />}
					/>
					<Route
						exact
						path="/packages/:id"
						render={(props) => <PackagePage {...props} />}
					/>
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
	snackbarDetails,
});

const mapDispatchToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
	fetchUser: (token, callback) =>
		dispatch(fetchUserProfile({ token, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
