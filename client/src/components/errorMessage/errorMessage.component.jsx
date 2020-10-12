import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const ErrorMessage = ({ message, onClear }) => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			color="#ffffff"
			bgcolor="#c0392b"
			alignItems="center"
			pl="0.5rem"
			borderRadius="5px"
		>
			{message}
			<IconButton aria-label="delete" onClick={onClear}>
				<ClearIcon fontSize="small" style={{ color: '#ffffff' }} />
			</IconButton>
		</Box>
	);
};

export default ErrorMessage;
