import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Protected from './components/protected/protected.component';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SuspenseLoader from './components/suspenseLoader/susPenseLoader.component';
const BrowsePage = lazy(() => import('./pages/browsePage/browse.page'));
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

function App() {
	return (
		<Suspense fallback={<SuspenseLoader />}>
			<Provider store={store}>
				<HashRouter>
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => <HomePage {...props} />}
						/>
						<Route
							exact
							path="/login"
							render={() => <LoginPage />}
						/>
						<Route
							exact
							path="/reset-password"
							render={() => <ResetPassword />}
						/>
						<Route
							exact
							path="/signup"
							render={() => <SignUpForm />}
						/>
						<Route
							exact
							path="/otp/:number"
							render={() => <OTPPage />}
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
							render={(props) => (
								<ProjectDetailsPage {...props} />
							)}
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
								<Protected
									component={EditProperty}
									{...props}
								/>
							)}
						/>
						<Route
							exact
							path="/project-property/:id"
							render={(props) => <ProjectProperty {...props} />}
						/>
						<Route
							exact
							path="/post-property"
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
			</Provider>
		</Suspense>
	);
}

// export default App

export default App;
