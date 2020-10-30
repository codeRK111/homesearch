import { Box } from '@material-ui/core';
import React from 'react';

export const AlignCenter = ({ children, ...otherProps }) => {
	return (
		<Box display="flex" alignItems="center" {...otherProps}>
			{children}
		</Box>
	);
};

export const JustifyCenter = ({ children, ...otherProps }) => {
	return (
		<Box display="flex" justifyContent="center" {...otherProps}>
			{children}
		</Box>
	);
};

export const Center = ({ children, ...otherProps }) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			{...otherProps}
		>
			{children}
		</Box>
	);
};
