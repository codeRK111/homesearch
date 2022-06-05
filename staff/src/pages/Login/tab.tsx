import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

interface ILoginTab {
	value: number;
	setValue: (val: number) => void;
}

export const LoginTab: React.FC<ILoginTab> = ({ value, setValue }) => {
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Tabs
			value={value}
			indicatorColor="primary"
			textColor="primary"
			onChange={handleChange}
			aria-label="disabled tabs example"
		>
			<Tab label="Staff" />
			<Tab label="CP" />
		</Tabs>
	);
};
