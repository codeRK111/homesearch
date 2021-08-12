import { Chip } from '@material-ui/core';
import React from 'react';
import useStyles from './style';

const ChipHeading = ({ text, size = 'small' }) => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.border}></div>
			<Chip size={size} variant="outlined" label={text} />
			<div className={classes.border}></div>
		</div>
	);
};

export default ChipHeading;
