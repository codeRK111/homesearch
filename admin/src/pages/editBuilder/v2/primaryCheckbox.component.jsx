import {
	Checkbox,
	CircularProgress,
	FormControlLabel,
} from '@material-ui/core';
import React, { useRef } from 'react';

import axios from 'axios';
import { mangePrimaryPhoto } from '../../../utils/asyncBuilder';
import { withAsync } from '../../../hoc/withAsync';

const PrimaryCheckBox = ({
	builderId,
	id,
	loading,
	primary,
	setLoading,
	setPhotos,
	setError,
}) => {
	const cancelToken = useRef(null);
	const handleChange = async (e) => {
		const { checked } = e.target;
		try {
			cancelToken.current = axios.CancelToken.source();
			const resp = await mangePrimaryPhoto(
				builderId,
				{ _id: id, checked },
				cancelToken.current,
				setLoading
			);
			setError(null);
			setPhotos(resp.photos);
		} catch (error) {
			setError(error);
		}
	};

	return (
		<>
			{loading ? (
				<CircularProgress size={30} color="inherit" />
			) : (
				<FormControlLabel
					control={
						<Checkbox
							checked={primary}
							onChange={handleChange}
							name="checkedA"
						/>
					}
					label="Front Image / Thumbnail"
				/>
			)}
		</>
	);
};

export default withAsync(PrimaryCheckBox);
