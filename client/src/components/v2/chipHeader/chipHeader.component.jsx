import { Box, Chip } from '@material-ui/core';

import React from 'react';
import useStyles from './plans.style';

export default function AlertDialogSlide({ title }) {
	const classes = useStyles();

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			mt="1rem"
		>
			<div className={classes.line}></div>
			<Chip label={title} variant="outlined" />
			<div className={classes.line}></div>
		</Box>
	);
}
