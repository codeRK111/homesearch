import { Button, CircularProgress, Typography } from '@material-ui/core';
import React, { memo, useRef, useState } from 'react';

import { addTower } from '../../../utils/asyncProject';
import axios from 'axios';
import useGlobalStyles from '../../../common.style';

const AddTower = memo(({ project, phase, fetchProject }) => {
	// Styles
	const gClasses = useGlobalStyles();

	// Cancel Token
	const cancelToken = useRef(undefined);

	// Loading State
	const [loading, setLoading] = useState(false);

	// Error State
	const [error, setError] = useState(null);

	// Data

	// Callbacks
	const onAddTower = async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const data = {
				name: `Tower - ${project.towerNames.length + 1}`,
				floorPlan: null,
				phase,
				status: 'active',
			};
			await addTower(project.id, data, cancelToken.current, setLoading);
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
					color="primary"
					onClick={onAddTower}
					disabled={loading || !phase}
					{...buttonProps}
				>
					Add Tower
				</Button>
			)}
		</>
	);
});

export default AddTower;
