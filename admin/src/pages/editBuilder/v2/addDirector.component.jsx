import { Box, CircularProgress, Typography } from '@material-ui/core';
import React, { useRef, useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { addDirector } from '../../../utils/asyncBuilder';
import axios from 'axios';
import useGlobalStyles from '../../../common.style';
import { withAsync } from '../../../hoc/withAsync';

function AddDirectorModal({
	open,
	handleClose,
	builderId,
	callback,
	loading,
	setLoading,
	error,
	setError,
}) {
	const cancelToken = useRef(null);
	const gClasses = useGlobalStyles();
	const [name, setName] = useState('');
	const [image, setImage] = useState(null);

	const onChange = (e) => setName(e.target.value);
	const onFileChange = (e) => {
		const { files } = e.target;
		setImage(files[0]);
	};

	const onAdd = async () => {
		try {
			const data = {
				name,
				image,
			};
			cancelToken.current = axios.CancelToken.source();
			const resp = await addDirector(
				builderId,
				data,
				cancelToken.current,
				setLoading
			);
			setError(null);
			callback(resp.directors);
			handleClose();
		} catch (error) {
			setError(error);
		}
	};

	const buttonProps = {};
	if (loading) {
		buttonProps.endIcon = <CircularProgress size={20} color="inherit" />;
	}
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add Director</DialogTitle>
				<Box>
					{error && (
						<Typography
							variant="caption"
							gutterBottom
							className={gClasses.errorColor}
						>
							{error}
						</Typography>
					)}
				</Box>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Director Name"
						type="text"
						fullWidth
						value={name}
						onChange={onChange}
					/>
				</DialogContent>
				<DialogContent>
					<p>Director Photo</p>
					<input type="file" onChange={onFileChange} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						onClick={onAdd}
						color="primary"
						disabled={loading}
						{...buttonProps}
					>
						Add Director
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withAsync(AddDirectorModal);
