import { default as StaffLeadsPage, default as StaffStrategies } from './staff';

import GMStrategies from './gm';
import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const StrategyWrapper = () => {
	const { user } = useTypedSelector((state) => state.auth);

	const renderPage = (): JSX.Element => {
		if (!user) {
			return <h1>Invalid User</h1>;
		}

		switch (user.type) {
			case 'gm':
				return <GMStrategies />;
			case 'leadStrategist':
				return <StaffStrategies />;

			default:
				return <StaffLeadsPage />;
		}
	};
	return <div>{renderPage()}</div>;
};

export default StrategyWrapper;
