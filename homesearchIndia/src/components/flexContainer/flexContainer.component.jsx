import { Box } from '@material-ui/core';
import React from 'react';

export const Flex = ({ children, ...otherProps }) => {
	return (
		<Box display="flex" width="100%" {...otherProps}>
			{children}
		</Box>
	);
};

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

export const JustifyBetween = ({ children, ...otherProps }) => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			width="100%"
			{...otherProps}
		>
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
