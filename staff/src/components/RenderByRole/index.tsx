import React from 'react';
import { StaffType } from '../../model/staff.interface';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface IRenderByRole {
	type: StaffType;
}

const RenderByRole: React.FC<IRenderByRole> = ({ type, children }) => {
	const { user } = useTypedSelector((state) => state.auth);

	const renderChildren = (): JSX.Element | React.ReactNode => {
		if (user && user.type === type) {
			return children;
		} else {
			return <></>;
		}
	};
	return <>{user ? renderChildren() : <></>}</>;
};

export default RenderByRole;
