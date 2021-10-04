import BDMLeadsPage from './bdm';
import GMLeadsPage from './gm';
import React from 'react';
import StaffLeadsPage from './staff';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const LeadsWrapper = () => {
	const { user } = useTypedSelector((state) => state.auth);

	const renderPage = (): JSX.Element => {
		if (!user) {
			return <h1>Invalid User</h1>;
		}

		switch (user.type) {
			case 'gm':
				return <GMLeadsPage />;
			case 'bdm':
				return <BDMLeadsPage />;

			default:
				return <StaffLeadsPage />;
		}
	};
	return <div>{renderPage()}</div>;
};

export default LeadsWrapper;
