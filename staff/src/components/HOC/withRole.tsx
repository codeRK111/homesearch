import React from 'react';
import { Redirect } from 'react-router';
import { StaffType } from '../../model/staff.interface';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const withAccess = (
	Component: React.ElementType,
	access?: Array<StaffType>
): React.ElementType => {
	const D = (props: any) => {
		const { user } = useTypedSelector((state) => state.auth);

		const renderComp = (): JSX.Element => {
			if (!access) {
				return <Component {...props} />;
			} else if (access && access.includes(user?.type as StaffType)) {
				return <Component {...props} />;
			} else {
				return <Redirect to="/" />;
			}
		};

		return <>{renderComp()}</>;
	};
	return D;
};
