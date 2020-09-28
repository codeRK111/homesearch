import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

// Custom components
import LoginPage from './pages/login/login.page';
import SignUpForm from './pages/signup/signup.page';

function App() {
	return (
		<div>
			<HashRouter>
				<Switch>
					<Route exact path="/login" render={() => <LoginPage />} />
					<Route exact path="/signup" render={() => <SignUpForm />} />
				</Switch>
			</HashRouter>
		</div>
	);
}

export default App;
