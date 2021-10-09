import ForwardIcon from '@material-ui/icons/Forward';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

interface ILeadTab {
	action: number;
	setAction: (value: number) => void;
}

export default function ManageLeadsTab({ setAction, action }: ILeadTab) {
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setAction(newValue);
	};

	return (
		<>
			<Tabs
				value={action}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				scrollButtons="desktop"
				variant="fullWidth"
			>
				<Tab label="Forward" icon={<ForwardIcon />} />
				<Tab label="Close" icon={<ThumbUpIcon />} />
			</Tabs>
		</>
	);
}
