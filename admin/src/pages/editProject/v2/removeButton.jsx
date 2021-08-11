import { Button, CircularProgress, Typography } from '@material-ui/core';
import React, { memo, useRef, useState } from 'react';

import axios from 'axios';
import { removeTower } from '../../../utils/asyncProject';
import useGlobalStyles from '../../../common.style';

const RemoveTowerButton = memo(({ towerId, projectId, fetchProject }) => {
	// Styles
	const gClasses = useGlobalStyles();

	// Cancel Token
	const cancelToken = useRef(undefined);

	// Loading State
	const [loading, setLoading] = useState(false);

	// Error State
	const [error, setError] = useState(null);

	// Callbacks
	const onRemoveTower = async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			await removeTower(
				projectId,
				towerId,
				cancelToken.current,
				setLoading
			);
			setError(null);
			fetchProject();
		} catch (error) {
			setError(error);
		}
	};

	const buttonProps = {};
	if (loading) {
		buttonProps.endIcon = <CircularProgress size={15} color="inherit" />;
	}
	return (
		<>
			{error ? (
				<Typography className={gClasses.errorColor}>{error}</Typography>
			) : (
				<Button
					size="small"
					color="secondary"
					onClick={onRemoveTower}
					disabled={loading}
					{...buttonProps}
				>
					Remove Tower
				</Button>
			)}
		</>
	);
});

export default RemoveTowerButton;
