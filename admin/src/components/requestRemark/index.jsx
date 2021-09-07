import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import axios from 'axios';
import { updateJoinRequest } from '../../utils/asyncRequest';
import useStyles from './requestRemark.style';
import { withAsync } from '../../hoc/withAsync';

function SimpleDialog({
	onClose,
	open,
	id,
	onSuccess,
	loading,
	setLoading,
	error,
	setError,
}) {
	// Style
	const style = useStyles();

	// state
	const [remark, setRemark] = useState('');

	// Cancel Token
	const cancelToken = useRef(null);

	// Callbacks

	const onChange = ({ target: { value } }) => setRemark(value);

	const handleClose = () => {
		onClose();
	};

	const onRemark = async () => {
		if (!remark) return;
		try {
			cancelToken.current = axios.CancelToken.source();
			const resp = await updateJoinRequest(
				id,
				{ remark },
				cancelToken.current,
				setLoading
			);
			setError(null);
			onSuccess(resp.id, resp.remark);
			handleClose();
		} catch (error) {
			setError(error);
		}
		onSuccess(id, remark);
	};

	useEffect(() => {
		if (!open) {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		}
	}, [open]);

	const buttonProps = {};
	if (loading) {
		buttonProps.endIcon = <CircularProgress size={20} color="inherit" />;
	}

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
			fullWidth={true}
			maxWidth={'xs'}
		>
			<DialogTitle id="simple-dialog-title">Add Remark</DialogTitle>
			<div className={style.wrapper}>
				<TextField
					variant="filled"
					multiline
					rows={5}
					fullWidth
					placeholder="Remark"
					value={remark}
					onChange={onChange}
				/>
			</div>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<Box
				mt="1rem"
				mb="1rem"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<Button
					color="secondary"
					variant="contained"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					color="primary"
					variant="contained"
					onClick={onRemark}
					disabled={loading}
					{...buttonProps}
				>
					Submit
				</Button>
			</Box>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	id: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
};

const RequestRemarkDialog = ({ open, handleClose, id, onSuccess }) => {
	const AsyncSimpleDialog = withAsync(SimpleDialog);
	return (
		<div>
			<AsyncSimpleDialog
				open={open}
				onClose={handleClose}
				id={id}
				onSuccess={onSuccess}
			/>
		</div>
	);
};

RequestRemarkDialog.propTypes = {
	handleClose: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	id: PropTypes.bool.isRequired,
};

export default RequestRemarkDialog;
