import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import { addProjectSpeciality } from '../../utils/asyncFunctions';
import axios from 'axios';
import { useCancelAxios } from '../../hooks/useCancel';
import useGlobalStyles from '../../common.style';

const AddSpeciality = ({ toggleLoader, fetchData }) => {
	const cancelToken = React.useRef(undefined);
	const gClasses = useGlobalStyles();
	useCancelAxios(cancelToken.current);
	const [state, setState] = useState({
		name: '',
		description: '',
	});

	const onChange = (e) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		cancelToken.current = axios.CancelToken.source();
		addProjectSpeciality(state, cancelToken.current, toggleLoader)
			.then((resp) => {
				console.log(resp);
				fetchData();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<h3>Add Speciality</h3>
			<form autoComplete="off" onSubmit={onSubmit}>
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<TextField
							id="filled-basic"
							label="Speciality Name"
							variant="filled"
							name="name"
							value={state.name}
							fullWidth
							onChange={onChange}
							required
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id="filled-basic"
							label="Description (Optional)"
							variant="filled"
							name="description"
							value={state.description}
							onChange={onChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<Button
							variant="contained"
							type="submit"
							size="large"
							className={gClasses.buttonFullHeight}
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default AddSpeciality;
