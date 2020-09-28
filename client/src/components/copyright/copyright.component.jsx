import React from 'react';
import Typography from '@material-ui/core/Typography';

const CopyRight = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			Homesearch18 &nbsp;
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
};

export default CopyRight;
