import { Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/home';
import { LogInPage } from './pages/login';
import { NotFoundPage } from './pages/not-found';
import React from 'react';

export enum RoutePath {
	Home = '/',
	Login = '/log-in',
	OtherRoute = '*',
}

export const Router = () => {
	return (
		<Routes>
			<Route path={RoutePath.Home} element={<HomePage />} />
			<Route path={RoutePath.Login} element={<LogInPage />} />
			<Route path={RoutePath.OtherRoute} element={<NotFoundPage />} />
		</Routes>
	);
};
