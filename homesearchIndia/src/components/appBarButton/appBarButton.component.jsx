import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	button: {
		border: `1px solid ${theme.colorOne}`,
		padding: '7px 14px',
		color: theme.colorOne,
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: theme.colorOne,
			color: '#ffffff',
		},
	},
}));

const AppBarButton = ({ text, ...otherProps }) => {
	const classes = useStyles();
	return (
		<button className={classes.button} {...otherProps}>
			{text}
		</button>
	);
};

export default AppBarButton;
