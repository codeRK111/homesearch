import { HashRouter, Route, Switch } from 'react-router-dom';

import DetailsPage from './pages/detailsPageNew/detailsPage.component';
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import MobileSearch from './pages/mobileSearch/mobileSearch.page';
import OTPPage from './pages/otp/otp.page';
import ProfilePage from './pages/profile/profile.page';
import ProjectDetailsPage from './pages/projectDetailsPage/detailsPage.page';
import PropertyDetailsPage from './pages/detailsPage/detailsPage.page';
import { Provider } from 'react-redux';
import React from 'react';
import SearchPage from './pages/searchResultPage/searchResultPage.page';
import SignUpForm from './pages/signup/signup.page';
import { store } from './redux/store';

function App() {
	return (
		<div>
			<Provider store={store}>
				<HashRouter>
					<Switch>
						<Route exact path="/" render={() => <HomePage />} />
						<Route
							exact
							path="/login"
							render={() => <LoginPage />}
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
							render={() => <ProfilePage />}
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
							path="/property/:id/details/:propertyFor/:type"
							render={(props) => (
								<PropertyDetailsPage {...props} />
							)}
						/>
						<Route
							exact
							path="/property-details/:id"
							render={(props) => <DetailsPage {...props} />}
						/>
						<Route
							exact
							path="/property/:id/project-details/:propertyFor/:type"
							render={(props) => (
								<ProjectDetailsPage {...props} />
							)}
						/>
					</Switch>
				</HashRouter>
			</Provider>
		</div>
	);
}

export default App;
