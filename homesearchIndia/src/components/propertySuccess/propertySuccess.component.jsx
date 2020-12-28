import { Box, Button } from '@material-ui/core';

import React from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './propertySuccess.styles';

const Success = () => {
	const classes = useStyles();
	const history = useHistory();

	const redirectTo = (path) => (_) => history.push(path);
	return (
		<Box>
			<Box className={classes.paper}>
				<h3>
					Your property is under screening, it will be live very soon.
				</h3>
				<Box mt="1rem" display="flex">
					<Box mr="1rem" onClick={redirectTo('/')}>
						<Button variant="contained">Home</Button>
					</Box>
					<Box mr="1rem" onClick={redirectTo('/profile')}>
						<Button variant="contained">Profile</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Success;
