import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		textTransform: 'none',
		fontWeight: 'bold',
	},
	indicator: {
		backgroundColor: theme.colorOne,
	},
	selected: {
		color: theme.colorOne,
	},
	paper: {
		backgroundColor: '#000000',
		color: '#ffffff',
	},
}));

export default function DisabledTabs() {
	const [value, setValue] = React.useState(2);
	const classes = useStyles();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Paper elevation={3} className={classes.paper}>
			<Tabs
				value={value}
				indicatorColor="primary"
				onChange={handleChange}
				aria-label="disabled tabs example"
				classes={{
					indicator: classes.indicator,
				}}
			>
				<Tab
					label="Project"
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
				/>
				<Tab
					label="Rent"
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
				/>
				<Tab
					label="Resale"
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
				/>
				<Tab
					disabled
					label="Live bidding (Coming soon)"
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
				/>
			</Tabs>
		</Paper>
	);
}
