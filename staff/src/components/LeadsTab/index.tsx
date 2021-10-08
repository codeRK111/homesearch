import Paper from '@material-ui/core/Paper';
import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TodayIcon from '@material-ui/icons/Today';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});

interface ILeadTab {
	setTimeInterval: (value: string) => void;
}

export default function LeadsTab({ setTimeInterval }: ILeadTab) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
		switch (newValue) {
			case 0:
				setTimeInterval('today');
				break;
			case 1:
				setTimeInterval('yesterday');
				break;
			case 2:
				setTimeInterval('lastWeek');
				break;
			case 3:
				setTimeInterval('lastMonth');
				break;

			default:
				break;
		}
	};

	return (
		<Paper className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Today" icon={<TodayIcon />} />
				<Tab label="Yesterday" icon={<TodayIcon />} />
				<Tab label="Last Week" icon={<TodayIcon />} />
				<Tab label="Last Month" icon={<TodayIcon />} />
			</Tabs>
		</Paper>
	);
}
