import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
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
