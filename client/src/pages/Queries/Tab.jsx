import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		borderBottom: '1px solid #cccccc',
	},
	wrapper: {
		fontSize: '1rem',
		fontWeight: 600,
		letterSpacing: 2,
	},
});

export default function CenteredTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
			>
				<Tab label={'Tenant'} classes={{ wrapper: classes.wrapper }} />
				<Tab label="Realtors" classes={{ wrapper: classes.wrapper }} />
			</Tabs>
		</div>
	);
}
