import './index.css';

import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './redux/store';

// import { PersistGate } from 'redux-persist/integration/react';






ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<CssBaseline />
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);
