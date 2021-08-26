import React, { useCallback } from 'react';

export const withAsync = (Component) => {
	const D = (props) => {
		const [loading, setLoading] = React.useState(false);
		const [error, setError] = React.useState(null);

		const handleLoading = useCallback((status) => {
			setLoading(status);
		}, []);
		const handleError = useCallback((error) => {
			setError(error);
		}, []);

		return (
			<>
				<Component
					loading={loading}
					setLoading={handleLoading}
					error={error}
					setError={handleError}
					{...props}
				/>
			</>
		);
	};
	return D;
};
