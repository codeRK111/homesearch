import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { asyncDownloadInvoice } from '../../API/payment';

interface Props {
	id: string;
}

const DownloadInvoiceButton: React.FC<Props> = ({ id }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [loading, setLoading] = useState(false);

	const onClick = async () => {
		try {
			setLoading(true);
			await asyncDownloadInvoice(id);
			setLoading(false);
			setSnackbar({
				open: true,
				message: 'Invoice sent successfully',
				severity: 'success',
			});
		} catch (error) {
			setLoading(false);
			setSnackbar({
				open: true,
				message: 'Unable to send invoice',
				severity: 'error',
			});
		}
	};
	return (
		<Button
			variant="contained"
			color="primary"
			disabled={loading}
			onClick={onClick}
		>
			{loading ? (
				<CircularProgress size={15} color="inherit" />
			) : (
				'Download'
			)}
		</Button>
	);
};

export default DownloadInvoiceButton;
