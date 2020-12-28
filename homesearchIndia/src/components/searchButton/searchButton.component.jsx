import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	button: {
		backgroundColor: theme.colorOne,
		color: '#ffffff',
		fontSize: '14px',
		borderRadius: '2px',
		padding: '0 30px 0 30px',
		border: 'none',
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		height: '100%',
		fontWeight: 'bold',
		justifyContent: 'center',
	},
}));

const SearchButton = ({ text, onClick }) => {
	const classes = useStyles();
	return (
		<div className={classes.button} onClick={onClick}>
			{text}
		</div>
	);
};

export default SearchButton;
