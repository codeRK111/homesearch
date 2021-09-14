import React, {memo, useEffect, useRef, useState} from 'react';

import {CircularProgress} from '@material-ui/core';
import IOSSwitch from '../iosSwitch';
import axios from 'axios';
import useGlobalStyles from '../../common.style';
import {withAsync} from '../../hoc/withAsync';
import {updateLead} from "../../utils/asyncLead";

const LeadStatusSwitch = memo(
	({id, leadStatus, loading, setLoading, error, setError}) => {
		const globalStyle = useGlobalStyles();
		const cancelToken = useRef(null);
		const [status, setStatus] = useState(leadStatus);

		const handleChange = async (event) => {
			const {checked} = event.target;
			try {
				cancelToken.current = axios.CancelToken.source();
				const body = {
					status: checked ? 'active' : 'inactive'
				};
				const resp = await updateLead(
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
			setStatus(leadStatus);

			return () => {
				if (cancelToken.current) {
					cancelToken.current.cancel();
				}
			};
		}, [leadStatus]);

		const t = () => {
			if (error) {
				return <p className={globalStyle.errorColor}>{error}</p>;
			}
			if (loading) {
				return <CircularProgress size={15} color="inherit"/>;
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

export default withAsync(LeadStatusSwitch);
