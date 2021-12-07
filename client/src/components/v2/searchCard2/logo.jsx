import { Box } from '@material-ui/core';
import React from 'react';
import { logo } from '../../../utils/statc';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	imgWrapper: {
		display: 'inline-flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',

		'& img': {
			width: '100%',
			height: 'auto',
			maxWidth: 35,
		},
		'& span': {
			fontSize: '0.7rem',
			marginTop: '0.5rem',
			fontWeight: '600',
			color: theme.primaryHeadingColor,
		},
	},
}));

const LogoWithText = ({ text, ...otherProps }) => {
	const { imgWrapper } = useStyles();
	return (
		<Box className={imgWrapper} {...otherProps}>
			<img src={logo} alt="Logo" />
			<span>{text}</span>
		</Box>
	);
};

export default LogoWithText;
