import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentTab } from '../../redux/actionTab/actionTab.actions';
import { selectCurrentTab } from '../../redux/actionTab/actionTab.selectors';

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

function DisabledTabs({ currentTab, setCurrentTab }) {
	const classes = useStyles();
	const labels = ['project', 'rent', 'sale'];

	const handleChange = (_, newValue) => {
		setCurrentTab(labels[newValue]);
	};

	return (
		<Paper elevation={3} className={classes.paper}>
			<Tabs
				value={labels.indexOf(currentTab)}
				onChange={handleChange}
				aria-label="disabled tabs example"
				variant="fullWidth"
				indicatorColor="primary"
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
					label="Live bidding"
					classes={{
						wrapper: classes.wrapper,
						selected: classes.selected,
					}}
				/>
			</Tabs>
		</Paper>
	);
}

const mapStateToProps = createStructuredSelector({
	currentTab: selectCurrentTab,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentTab: (tab) => dispatch(setCurrentTab(tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisabledTabs);
