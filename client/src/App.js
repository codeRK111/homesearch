import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
// Custom components
import LoginPage from './pages/login/login.page';
import SignUpForm from './pages/signup/signup.page';
import OTPPage from './pages/otp/otp.page';
import ProfilePage from './pages/profile/profile.page';
import HomePage from './pages/home/home.page';
import MobileSearch from './pages/mobileSearch/mobileSearch.page';
import SearchPage from './pages/search/search.page';

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
					</Switch>
				</HashRouter>
			</Provider>
		</div>
	);
}

export default App;
