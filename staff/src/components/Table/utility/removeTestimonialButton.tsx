import { CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import { asyncDeleteTestimonial } from '../../../API/testimonial';

interface Props {
	id: string;
	onSuccess: (id: string) => void;
}

const RemoveTestimonialButton: React.FC<Props> = ({ id, onSuccess }) => {
	const [loading, setLoading] = useState(false);

	const deleteStrategy = async () => {
		try {
			setLoading(true);
			await asyncDeleteTestimonial(id);
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

export default RemoveTestimonialButton;
