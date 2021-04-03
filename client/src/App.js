import { HashRouter, Route, Switch } from 'react-router-dom';

import BrowsePage from './pages/browsePage/browse.page';
import DetailsPage from './pages/detailsPageNew/detailsPage.component';
import EditProperty from './pages/postPropertyDetailsPage/editWrapper.page';
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import MobileSearch from './pages/mobileSearch/mobileSearch.page';
import OTPPage from './pages/otp/otp.page';
import PostProperty from './pages/postProperty';
import PostPropertyDetailsPage from './pages/postPropertyDetailsPage';
import ProfilePage from './pages/profile/profile.page';
import ProfileUpdate from './pages/profile/profileUpdate.page';
import ProjectDetailsPage from './pages/projectDetails/index.component';
import ProjectProperty from './pages/projectDetails/projectPropertyWrapper.component';
import Protected from './components/protected/protected.component';
import { Provider } from 'react-redux';
import React from 'react';
import ResetPassword from './pages/resetPasswordPage/resetPassword.page';
import SearchPage from './pages/searchResultPage/searchResultPage.page';
import SignUpForm from './pages/signup/signup.page';
import ProjectPage from './pages/projectPage/project.page';
import BuilderPage from './pages/builderPage/builder.page';
import NotFound from './pages/notFoundPage/notFound.page';
import { store } from './redux/store';

function App() {
	return (
		<div>
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
		</div>
	);
}

// export default App

export default App;
