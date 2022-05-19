import { CircularProgress, IconButton } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../../hooks/useAction';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { asyncDownloadInvoiceFromDB } from '../../../API/payment';

interface IDownloadInvoice {
	id: string;
}

const DownloadInvoice: React.FC<IDownloadInvoice> = memo(({ id }) => {
	const [loading, setLoading] = useState(false);

	const { setSnackbar } = useRepositoryAction(ResourceType.UI);

	const onClick = async () => {
		try {
			setLoading(true);
			await asyncDownloadInvoiceFromDB(id);
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
					<CloudDownloadIcon />
				</IconButton>
			)}
		</>
	);
});

export default DownloadInvoice;
