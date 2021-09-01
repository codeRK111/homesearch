/* eslint-disable no-use-before-define */

import React, { useCallback, useEffect, useRef, useState } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { getAllStates } from '../../utils/asyncCity';
import { withAsync } from '../../hoc/withAsync';

const StateNames = ({
	value,
	setValue,
	loading,
	setLoading,
	error,
	setError,
}) => {
	const [states, setStates] = useState([]);
	const cancelToken = useRef(null);

	const fetchState = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const resp = await getAllStates(cancelToken.current, setLoading);
			setStates(resp);
			setError(null);
		} catch (error) {
			setError(error);
		}
	}, [setLoading, setError]);

	useEffect(() => {
		fetchState();

		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchState]);

	return (
		<Autocomplete
			value={value}
			onChange={(_, newValue) => {
				setValue(newValue);
			}}
			id="combo-box-demo"
			options={states}
			getOptionLabel={(option) => option}
			renderInput={(params) => (
				<TextField
					{...params}
					error={!!error}
					helperText={error ? error : ''}
					label="States"
					variant="filled"
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	);
};

export default withAsync(StateNames);
