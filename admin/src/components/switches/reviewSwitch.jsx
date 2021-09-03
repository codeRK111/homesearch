import React, { memo, useEffect, useRef, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import IOSSwitch from '../iosSwitch';
import axios from 'axios';
import { updateReview } from '../../utils/asyncReview';
import useGlobalStyles from '../../common.style';
import { withAsync } from '../../hoc/withAsync';

const StatusSwitch = memo(
	({ id, reviewStatus, loading, setLoading, error, setError }) => {
		const globalStyle = useGlobalStyles();
		const cancelToken = useRef(null);
		const [status, setStatus] = useState(reviewStatus);

		const handleChange = async (event) => {
			const { checked } = event.target;
			try {
				cancelToken.current = axios.CancelToken.source();
				const body = {
					status: checked ? 'active' : 'inactive',
				};
				const resp = await updateReview(
					id,
					body,
					cancelToken.current,
					setLoading
				);
				setStatus(resp.status);
				setError(null);
			} catch (_) {
				setError('Failed !!');
			}
		};

		useEffect(() => {
			setStatus(reviewStatus);

			return () => {
				if (cancelToken.current) {
					cancelToken.current.cancel();
				}
			};
		}, [reviewStatus]);

		const t = () => {
			if (error) {
				return <p className={globalStyle.errorColor}>{error}</p>;
			}
			if (loading) {
				return <CircularProgress size={15} color="inherit" />;
			} else {
				return (
					<IOSSwitch
						checked={status === 'active'}
						color="primary"
						size="small"
						onChange={handleChange}
					/>
				);
			}
		};

		return <>{t()}</>;
	}
);

export default withAsync(StatusSwitch);
