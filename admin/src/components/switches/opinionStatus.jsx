import React, { memo, useEffect, useRef, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import IOSSwitch from '../iosSwitch';
import axios from 'axios';
import { updateSurvay } from '../../utils/asyncProject';
import useGlobalStyles from '../../common.style';
import { withAsync } from '../../hoc/withAsync';

const OpinionStatusSwitch = memo(
	({ id, opinionStatus, loading, setLoading, error, setError }) => {
		const globalStyle = useGlobalStyles();
		const cancelToken = useRef(null);
		const [status, setStatus] = useState(opinionStatus);

		const handleChange = async (event) => {
			const { checked } = event.target;
			try {
				cancelToken.current = axios.CancelToken.source();
				const body = {
					status: checked ? 'active' : 'inactive',
				};
				const resp = await updateSurvay(
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
			setStatus(opinionStatus);

			return () => {
				if (cancelToken.current) {
					cancelToken.current.cancel();
				}
			};
		}, [opinionStatus]);

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

export default withAsync(OpinionStatusSwitch);
