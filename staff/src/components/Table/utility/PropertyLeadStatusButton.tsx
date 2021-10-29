import { CircularProgress, IconButton } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../../hooks/useAction';

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { updatePropertyLeadDetails } from '../../../API/lead';

interface IPropertyLeadStatusButton {
	id: string;
	initialStatus: boolean;
}

const PropertyLeadStatusButton: React.FC<IPropertyLeadStatusButton> = memo(
	({ id, initialStatus }) => {
		const [loading, setLoading] = useState(false);
		const [status, setStatus] = useState(initialStatus);
		const { setSnackbar } = useRepositoryAction(ResourceType.UI);

		const onClick = async () => {
			try {
				setLoading(true);
				const resp = await updatePropertyLeadDetails(id, {
					isPossessed: status ? false : true,
				});
				setStatus(resp.isPossessed);
				setLoading(false);
			} catch (error: any) {
				setLoading(false);
				setSnackbar({
					open: true,
					message: error.message,
					severity: 'error',
				});
			}
		};

		// useEffect(() => {
		// 	return () => {
		// 		setStatus(initialStatus);
		// 	};
		// }, [initialStatus]);
		return (
			<>
				{loading ? (
					<CircularProgress size={20} color="inherit" />
				) : (
					<IconButton onClick={onClick}>
						{status ? (
							<CheckCircleIcon color="primary" />
						) : (
							<CancelIcon />
						)}
					</IconButton>
				)}
			</>
		);
	}
);

export default PropertyLeadStatusButton;
