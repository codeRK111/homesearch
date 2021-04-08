import { Button as MButton } from '@material-ui/core';
import React from 'react';
import { withStyles } from '@material-ui/styles';

export const Button = withStyles({
	root: {
		backgroundColor: '#8e44ad',
	}, // a style rule
})(MButton);
