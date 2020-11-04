import { Box, Paper } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import useStyles from './errorCard.styles';

const ErrorCard = ({ message }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.wrapper}>
			<Box>
				<Box className={classes.center}>
					<FontAwesomeIcon
						icon={faExclamationTriangle}
						className={classes.icon}
					/>
				</Box>
				<Box mt="1rem" className={classes.center}>
					<p className={[classes.center].join(',')}>{message}</p>
				</Box>
			</Box>
		</Paper>
	);
};

export default ErrorCard;
