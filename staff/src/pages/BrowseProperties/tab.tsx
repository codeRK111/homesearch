import { Theme, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import queryString from 'query-string';
import { useHistory } from 'react-router';

function a11yProps(index: any) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

interface IScrollableTabsButtonAuto {
	value: number;
	setValue: (value: number) => void;
}

export default function ScrollableTabsButtonAuto({
	value,
	setValue,
}: IScrollableTabsButtonAuto) {
	const classes = useStyles();
	const history = useHistory();

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		const filter = queryString.stringify({ t: newValue });
		history.push(`/browse-properties?${filter}`);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example"
				>
					<Tab label="From Leads" {...a11yProps(0)} />
					<Tab label="From Sales Team" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
		</div>
	);
}
