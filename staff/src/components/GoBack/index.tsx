import { Box, IconButton } from '@material-ui/core';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React from 'react';
import { useHistory } from 'react-router-dom';

const GoBack = () => {
	const history = useHistory();

	const onGoBack = () => {
		history.goBack();
	};
	return (
		<IconButton size="small" onClick={onGoBack}>
			<Box display="flex" alignItems="center">
				<ArrowBackIosIcon fontSize="small" />
				Back
			</Box>
		</IconButton>
	);
};

export default GoBack;
