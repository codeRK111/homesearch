import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';
import { ResourceType, useRepositoryAction } from './hooks/useAction';
import { useTypedSelector } from './hooks/useTypedSelector';
import Router from './router';

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Wrapper = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);

	const {
		snackbar: { open, message, severity },
	} = useTypedSelector((state) => state.ui);

	const handleClose = () => {
		setSnackbar({
			open: false,
			severity: 'success',
			message: '',
		});
	};
	return (
		<div>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity}>
					{message}
				</Alert>
			</Snackbar>
			<Router />
		</div>
	);
};

export default Wrapper;
