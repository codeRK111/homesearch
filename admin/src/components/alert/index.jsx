import Alert from '@material-ui/lab/Alert';
import React from 'react';

const AlertMessage = ({ status, setStatus, message, type = 'success' }) => {
	return (
		<>
			{status && (
				<Alert onClose={() => setStatus(false)} severity={type}>
					{message}
				</Alert>
			)}
		</>
	);
};

export default AlertMessage;
