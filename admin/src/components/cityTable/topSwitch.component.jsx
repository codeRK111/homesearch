import { CircularProgress, Switch } from '@material-ui/core';
import React, { memo, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { updateCity } from '../../utils/asyncCity';
import useGlobalStyles from '../../common.style';
import { withAsync } from '../../hoc/withAsync';

const CityTopSwitch = memo(
	({ id, top, loading, setLoading, error, setError }) => {
		const globalStyle = useGlobalStyles();
		const cancelToken = useRef(null);
		const [status, setStatus] = useState(top);

		const handleChange = async (event) => {
			const { checked } = event.target;
			try {
				cancelToken.current = axios.CancelToken.source();
				const body = {
					top: checked,
				};
				const resp = await updateCity(
					id,
					body,
					cancelToken.current,
					setLoading
				);
				setStatus(resp.top);
				setError(null);
			} catch (_) {
				setError('Failed !!');
			}
		};

		useEffect(() => {
			setStatus(top);

			return () => {
				if (cancelToken.current) {
					cancelToken.current.cancel();
				}
			};
		}, [top]);

		const t = () => {
			if (error) {
				return <p className={globalStyle.errorColor}>{error}</p>;
			}
			if (loading) {
				return <CircularProgress size={15} color="inherit" />;
			} else {
				return (
					<Switch
						checked={status}
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

export default withAsync(CityTopSwitch);
