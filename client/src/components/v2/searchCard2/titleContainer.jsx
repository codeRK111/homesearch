import { Box, Typography } from '@material-ui/core';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	titleWrapper: {
		display: 'inline-flex',
		flexDirection: 'column',
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: 'bolder',
		// textShadow: '0px 0.1px, 0.1px 0px, 0.1px 0.1px',
	},
	desc: {
		fontSize: '0.8rem',
		color: 'gray',
		textAlign: 'center',
	},
}));

const TitleContainer = ({ title, desc, ...otherProps }) => {
	const {
		titleWrapper,
		title: titleClass,
		desc: descClassName,
	} = useStyles();
	return (
		<Box className={titleWrapper} {...otherProps}>
			<Typography className={titleClass}>{title}</Typography>
			<Typography className={descClassName}>{desc}</Typography>
		</Box>
	);
};

export default TitleContainer;
