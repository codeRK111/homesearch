import Box from '@material-ui/core/Box';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';

const ErrorMessage = ({ message, onClear }) => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			color="#ffffff"
			bgcolor="#c0392b"
			alignItems="center"
			p="0.5rem"
			borderRadius="5px"
		>
			{message}
			{onClear && (
				<IconButton aria-label="delete" onClick={onClear}>
					<ClearIcon fontSize="small" style={{ color: '#ffffff' }} />
				</IconButton>
			)}
		</Box>
	);
};

export default ErrorMessage;
