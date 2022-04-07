import Box from '@mui/material/Box';
import React from 'react';

export const Center: React.FC = ({ children, ...otherProps }) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			{...otherProps}
		>
			{children}
		</Box>
	);
};
