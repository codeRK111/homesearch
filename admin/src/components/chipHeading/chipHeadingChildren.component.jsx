import { Chip } from '@material-ui/core';
import React from 'react';
import useStyles from './style';

const ChipHeadingChildren = ({ text, children }) => {
	const classes = useStyles();
	return (
		<div className={classes.wrapper}>
			<div className={classes.border}></div>
			<Chip variant="outlined" label={children} />
			<div className={classes.border}></div>
		</div>
	);
};

export default ChipHeadingChildren;
