import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
// Custom components
import LoginPage from './pages/login/login.page';
import SignUpForm from './pages/signup/signup.page';
import OTPPage from './pages/otp/otp.page';

function App() {
	return (
		<div>
			<Provider store={store}>
				<HashRouter>
					<Switch>
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
					</Switch>
				</HashRouter>
			</Provider>
		</div>
	);
}

export default App;
