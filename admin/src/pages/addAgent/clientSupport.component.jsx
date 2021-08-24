import { Chip, CircularProgress } from '@material-ui/core';
import React, { useRef, useState } from 'react';

import axios from 'axios';
import { removeAgent } from '../../utils/asyncProject';
import useStyles from './addAgent.style';

const ClientSupportChip = ({ projectId, admin, fetchExisting }) => {
	const cancelToken = useRef(null);
	const [loading, setLoading] = useState(false);
	const classes = useStyles();
	const onDelete = async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			await removeAgent(
				projectId,
				admin.id,
				cancelToken.current,
				setLoading
			);

			fetchExisting();
		} catch (error) {}
	};

	const chipProps = {};
	if (loading) {
		chipProps.deleteIcon = <CircularProgress size={15} color="inherit" />;
	}

	return (
		<Chip
			label={admin.name}
			onDelete={onDelete}
			className={classes.chip}
			disabled={loading}
			{...chipProps}
		/>
	);
};

export default ClientSupportChip;
