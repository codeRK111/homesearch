import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box } from '@material-ui/core';
import BuilderImages from './images.component';
import ChipHeadingChildren from '../../../components/chipHeading/chipHeadingChildren.component';
import LoaderBackdrop from '../../../components/backdrop';
import UpdateBuilderBasicDetails from './basicDetails.component';
import axios from 'axios';
import { getBuilderDetails } from '../../../utils/asyncBuilder';
import useStyles from './editBuilder.style';
import { withAsync } from '../../../hoc/withAsync';

const UpdateBuilderPage = ({
	loading,
	setLoading,
	error,
	setError,
	match: {
		params: { id },
	},
}) => {
	const classes = useStyles();

	// Axios Cancel Token
	const cancelToken = useRef(null);
	// Builder Data
	const [builder, setBuilder] = useState(null);

	// Fetch builder info
	const fetchBuilderInfo = useCallback(async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const resp = await getBuilderDetails(
				id,
				cancelToken.current,
				setLoading
			);
			setBuilder(resp);
			setError(null);
		} catch (error) {
			setBuilder(null);
			setError(error);
		}
	}, [id, setLoading, setError]);

	useEffect(() => {
		fetchBuilderInfo();

		return () => {
			if (cancelToken.current) {
				cancelToken.current.cancel();
			}
		};
	}, [fetchBuilderInfo]);

	return (
		<div className={classes.wrapper}>
			<LoaderBackdrop open={loading} />
			{error && <p className={classes.error}>{error}</p>}
			<h1>Update Builder</h1>
			<Box mb="2rem">
				<ChipHeadingChildren>
					<h2>Basic Details</h2>
				</ChipHeadingChildren>
			</Box>
			{builder ? <UpdateBuilderBasicDetails builder={builder} /> : null}
			<Box mb="2rem" mt="2rem">
				<ChipHeadingChildren>
					<h2>Logo & Images</h2>
				</ChipHeadingChildren>
			</Box>
			{builder ? <BuilderImages builder={builder} /> : null}
		</div>
	);
};

export default withAsync(UpdateBuilderPage);
