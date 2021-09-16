import { Provider } from 'react-redux';
import React from 'react';
import Wrapper from './Wrapper';
import { store } from './redux';

const App = () => {
	return (
		<Provider store={store}>
			<Wrapper />
		</Provider>
	);
};

export default App;
