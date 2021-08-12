import { Button, CircularProgress, Typography } from '@material-ui/core';
import React, { memo, useRef, useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import { addPhase } from '../../../utils/asyncProject';
import axios from 'axios';
import useGlobalStyles from '../../../common.style';

const AddPhaseButton = memo(({ projectId, fetchProject }) => {
	// Styles
	const gClasses = useGlobalStyles();

	// Cancel Token
	const cancelToken = useRef(undefined);

	// Loading State
	const [loading, setLoading] = useState(false);

	// Error State
	const [error, setError] = useState(null);

	// Callbacks
	const onAddPhase = async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			await addPhase(projectId, cancelToken.current, setLoading);
			setError(null);
			fetchProject();
		} catch (error) {
			setError(error);
		}
	};

	const buttonProps = {};
	if (loading) {
		buttonProps.endIcon = <CircularProgress size={15} color="inherit" />;
	} else {
		buttonProps.endIcon = <AddIcon />;
	}
	return (
		<>
			{error ? (
				<Typography className={gClasses.errorColor}>{error}</Typography>
			) : (
				<Button
					size="large"
					variant="contained"
					onClick={onAddPhase}
					disabled={loading}
					endIcon={<AddIcon />}
					{...buttonProps}
				>
					Add Phase
				</Button>
			)}
		</>
	);
});

export default AddPhaseButton;
