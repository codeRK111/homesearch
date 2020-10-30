import { HashRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import MobileSearch from './pages/mobileSearch/mobileSearch.page';
import OTPPage from './pages/otp/otp.page';
import ProfilePage from './pages/profile/profile.page';
import PropertyDetailsPage from './pages/propertyDetails/propertyDetails.page';
import { Provider } from 'react-redux';
import React from 'react';
import SearchPage from './pages/search/search.page';
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
							render={() => <SearchPage />}
						/>
						<Route
							exact
							path="/property/:id/details"
							render={() => <PropertyDetailsPage />}
						/>
					</Switch>
				</HashRouter>
			</Provider>
		</div>
	);
}

export default App;
