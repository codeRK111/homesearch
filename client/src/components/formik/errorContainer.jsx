import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';

import useGlobalStyles from '../../common.style';

const ErrorContainer = ({ errors, name, isSubmitting }) => {
	const gClasses = useGlobalStyles();
	const fieldRef = useRef(null);

	useEffect(() => {
		const firstError = Object.keys(errors)[0];
		console.log({
			isSubmitting,
			firstError,
			name,
		});
		if (isSubmitting && firstError === name) {
			fieldRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}, [errors, isSubmitting, name]);
	return (
		<Box ref={fieldRef}>
			{errors[name] && (
				<Typography className={gClasses.colorWarning} variant="caption">
					{errors[name]}
				</Typography>
			)}
		</Box>
	);
};

export default ErrorContainer;
