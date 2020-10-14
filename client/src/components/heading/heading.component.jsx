import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		display: 'flex',
		width: '100%',
		margin: '1rem 0',
		flexDirection: 'column',
		alignItems: 'center',
	},
	bar: {
		width: '4rem',
		height: '5px',
		backgroundColor: theme.colorOne,
		borderRadius: '3px',
	},
	title: {
		fontWeight: 'bold',
		fontSize: '1.5rem',
		marginBottom: '1rem',
	},
}));

const Heading = ({ title }) => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<span className={classes.title}>{title}</span>
			<div className={classes.bar}></div>
		</div>
	);
};

export default Heading;
