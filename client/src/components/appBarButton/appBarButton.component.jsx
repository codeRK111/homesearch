import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	button: {
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		fontSize: '12px',
		borderRadius: '2px',
		padding: '7px 14px',
		border: 'none',
	},
}));

const AppBarButton = ({ text }) => {
	const classes = useStyles();
	return <button className={classes.button}>{text}</button>;
};

export default AppBarButton;
