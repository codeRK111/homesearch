import React from 'react';
import { StaffType } from '../../model/staff.interface';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IRenderByRole {
	types: StaffType[];
}

const RenderByMultipleRole: React.FC<IRenderByRole> = ({ types, children }) => {
	const { user } = useTypedSelector((state) => state.auth);

	const renderChildren = (): JSX.Element | React.ReactNode => {
		if (user && types.includes(user.type)) {
			return children;
		} else {
			return <></>;
		}
	};
	return <>{user ? renderChildren() : <></>}</>;
};

export default RenderByMultipleRole;
