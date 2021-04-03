import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import useStyles from './notFound.style';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';

const NotFoundPage = () => {
	const classes = useStyles();
	const history = useHistory();

	const onHomeClick = () => {
		history.push('/');
	};
	return (
		<Box>
			<Box display="flex" justifyContent="center">
				<h1 className={classes.title}>404</h1>
			</Box>
			<Box className={classes.bgImage}></Box>
			<Box display="flex" justifyContent="center">
				<h3 className={classes.subtitle}>Look like you're lost</h3>
			</Box>
			<Box display="flex" justifyContent="center">
				<p>the page you are looking for not avaible!</p>
			</Box>
			<Box display="flex" justifyContent="center">
				<IconButton onClick={onHomeClick}>
					<HomeIcon fontSize="large" color="primary" />
				</IconButton>
			</Box>
		</Box>
	);
};

export default NotFoundPage;
