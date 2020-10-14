import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	button: {
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		fontSize: '14px',
		borderRadius: '2px',
		padding: '0 20px 0 20px',
		border: 'none',
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		height: '100%',
	},
}));

const SearchButton = ({ text }) => {
	const classes = useStyles();
	return <div className={classes.button}>{text}</div>;
};

export default SearchButton;
