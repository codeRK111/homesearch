import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import { asyncDeleteLeadStrategy } from '../../../API/leadStrategy';

interface Props {
	id: string;
	onSuccess: (id: string) => void;
}

const RemoveStrategyButton: React.FC<Props> = ({ id, onSuccess }) => {
	const [loading, setLoading] = useState(false);

	const deleteStrategy = async () => {
		try {
			setLoading(true);
			await asyncDeleteLeadStrategy(id);
			setLoading(false);
			onSuccess(id);
		} catch (error) {
			setLoading(false);
		}
	};
	return (
		<Tooltip title="Delete">
			<IconButton disabled={loading} onClick={deleteStrategy}>
				{loading ? (
					<CircularProgress size={20} color="inherit" />
				) : (
					<DeleteIcon color="secondary" />
				)}
			</IconButton>
		</Tooltip>
	);
};

export default RemoveStrategyButton;
