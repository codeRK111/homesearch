import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from './redux/store';

const ReduxWrapper = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};

export default ReduxWrapper;
