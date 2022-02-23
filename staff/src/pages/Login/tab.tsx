import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';

export const LoginTab = () => {
	const [value, setValue] = React.useState(0);

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
