import {
	Box,
	CircularProgress,
	FormControl,
	InputLabel,
} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { updateProjectSpeciality } from '../../utils/asyncFunctions';

export default function UpdateSpeciality({ data, handleClose, fetchData }) {
	const cancelToken = React.useRef(undefined);
	const [state, setState] = React.useState({
		name: '',
		description: '',
		status: '',
	});
	const [loader, setLoader] = React.useState(false);

	const onChange = (e) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	React.useEffect(() => {
		if (data) {
			setState(data);
		}
	}, [data]);

	const updateData = () => {
		cancelToken.current = axios.CancelToken.source();
		updateProjectSpeciality(state, cancelToken.current, setLoader)
			.then((resp) => {
				console.log({ resp });

				fetchData();
				handleClose();
			})
			.catch((err) => {
				console.log({ err });
			});
	};

	const buttonProps = {};
	if (loader) {
		buttonProps.endIcon = <CircularProgress size={20} />;
	}
	return (
		<div>
			<Dialog
				open={!!data}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="sm"
			>
				{data && (
					<>
						<DialogTitle id="form-dialog-title">
							Update {state.name}
						</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								name="name"
								label="Name"
								type="text"
								value={state.name}
								fullWidth
								onChange={onChange}
								variant="filled"
							/>
							<Box mt="1rem">
								<TextField
									margin="dense"
									name="description"
									label="Description"
									type="text"
									value={state.description}
									fullWidth
									onChange={onChange}
									variant="filled"
								/>
							</Box>
							<Box mt="1rem">
								<FormControl fullWidth>
									<InputLabel id="status">Status</InputLabel>
									<Select
										labelId="status"
										id="demo-simple-select"
										label="Status"
										name="status"
										value={state.status}
										onChange={onChange}
										fullWidth
										variant="filled"
									>
										<MenuItem value={'active'}>
											Active
										</MenuItem>
										<MenuItem value={'inactive'}>
											Inactive
										</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={handleClose}
								color="secondary"
								variant="contained"
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								onClick={updateData}
								color="primary"
								{...buttonProps}
							>
								Update
							</Button>
						</DialogActions>
					</>
				)}
			</Dialog>
		</div>
	);
}
