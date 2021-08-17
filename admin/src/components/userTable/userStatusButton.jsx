import { CircularProgress, IconButton } from '@material-ui/core';
import React, { memo, useRef, useState } from 'react';

import ActiveIcon from '@material-ui/icons/CheckCircle';
import InactiveIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import { updateUser } from '../../utils/asyncUsers';

const UserStatusButton = memo(({ id, status, fetchUsers }) => {
	// Cancel Token
	const cancelToken = useRef(undefined);
	// Loading State
	const [loading, setLoading] = useState(false);

	// Error State
	const [error, setError] = useState(null);

	// Callbacks
	const onStatusChange = async () => {
		try {
			const data = {
				status: status === 'active' ? 'inactive' : 'active',
			};
			cancelToken.current = axios.CancelToken.source();
			await updateUser(id, data, cancelToken.current, setLoading);
			setError(null);
			fetchUsers();
		} catch (error) {
			setError(error);
		}
	};
	return error ? (
		<span style={{ color: 'red' }}>{error}</span>
	) : loading ? (
		<CircularProgress size={14} />
	) : (
		<IconButton
			edge="end"
			aria-label="delete"
			size="small"
			onClick={onStatusChange}
		>
			{status === 'active' ? (
				<ActiveIcon
					style={{
						color: 'green',
						fontSize: '1.2rem',
					}}
				/>
			) : (
				<InactiveIcon
					style={{
						color: 'red',
						fontSize: '1.2rem',
					}}
				/>
			)}
		</IconButton>
	);
});

export default UserStatusButton;
