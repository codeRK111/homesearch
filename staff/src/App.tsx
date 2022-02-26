import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import Wrapper from './Wrapper';

const App = () => {
	return (
		<Provider store={store}>
			<Wrapper />
		</Provider>
	);
};

export default App;
