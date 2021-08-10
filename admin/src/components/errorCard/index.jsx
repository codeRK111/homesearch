import { Box, Paper } from '@material-ui/core';
import React, { memo } from 'react';

import ErrorIcon from '@material-ui/icons/Error';
import useGlobalStyles from '../../common.style';
import useStyles from './errorCard.style';

const ErrorCard = memo(({ error }) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	return (
		<Paper className={classes.wrapper}>
			<Box className={gClasses.alignCenter}>
				<Box mr="1rem">
					<ErrorIcon className={gClasses.errorColor} />
				</Box>
				<p className={gClasses.errorColor}>{error}</p>
			</Box>
		</Paper>
	);
});

export default ErrorCard;
