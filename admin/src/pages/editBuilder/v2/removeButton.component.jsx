import React, { useRef } from 'react';

import CancelIcon from '@material-ui/icons/Cancel';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { removeBuilderPhoto } from '../../../utils/asyncBuilder';
import useStyles from './editBuilder.style';
import { withAsync } from '../../../hoc/withAsync';

const RemovePhotoButton = ({
	id,
	image,
	callback,
	setLoading,
	loading,
	setError,
}) => {
	const classes = useStyles();
	// Axios Cancel Token
	const cancelToken = useRef(null);
	const onRemove = async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			await removeBuilderPhoto(
				id,
				image,
				cancelToken.current,
				setLoading
			);
			setError(null);
			callback(image._id);
		} catch (error) {
			setError(error);
		}
	};
	return (
		<>
			{loading ? (
				<CircularProgress size={20} color="primary" />
			) : (
				<CancelIcon className={classes.cancelIcon} onClick={onRemove} />
			)}
		</>
	);
};

export default withAsync(RemovePhotoButton);
