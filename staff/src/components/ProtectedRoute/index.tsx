import { Redirect, Route, RouteProps } from 'react-router-dom';

import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
	component: React.ElementType;
	// any additional vars
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
	component: Component,
	path,
	...rest
}) => {
	const { user } = useTypedSelector((state) => state.auth);

	return (
		<Route
			path={path}
			{...rest}
			render={({ location, ...otherProps }) =>
				user ? (
					<Component {...rest} {...otherProps} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
