import { CircularProgress, Switch } from '@material-ui/core';
import React, { memo, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { updateCity } from '../../utils/asyncCity';
import useGlobalStyles from '../../common.style';
import useStyles from './cityTable.style';
import { withAsync } from '../../hoc/withAsync';

const StatusSwitch = memo(
	({ id, cityStatus, loading, setLoading, error, setError }) => {
		const style = useStyles();
		const globalStyle = useGlobalStyles();
		const cancelToken = useRef(null);
		const [status, setStatus] = useState(cityStatus);

		const handleChange = async (event) => {
			const { checked } = event.target;
			try {
				cancelToken.current = axios.CancelToken.source();
				const body = {
					status: checked ? 'active' : 'inactive',
				};
				const resp = await updateCity(
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
			setStatus(cityStatus);

			return () => {
				if (cancelToken.current) {
					cancelToken.current.cancel();
				}
			};
		}, [cityStatus]);

		const t = () => {
			if (error) {
				return <p className={globalStyle.errorColor}>{error}</p>;
			}
			if (loading) {
				return <CircularProgress size={15} color="inherit" />;
			} else {
				return (
					<Switch
						checked={status === 'active'}
						color="primary"
						size="small"
						onChange={handleChange}
						classes={{
							switchBase: style.switchBase,
						}}
					/>
				);
			}
		};

		return <>{t()}</>;
	}
);

export default withAsync(StatusSwitch);
