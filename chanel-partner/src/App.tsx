import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Router } from './router';

function App() {
	return (
		<BrowserRouter>
			<CssBaseline />
			<Router />
		</BrowserRouter>
	);
}

export default App;
