import React, { useCallback, useRef, useState } from 'react';

import ErrorBackdrop from '../../../components/v2/backdropMessage';
import axios from 'axios';
import { getBuilderDetails } from '../../../utils/asyncBuilder';
import useStyles from './builder.style';
import { withAsync } from '../../../hoc/withAsync';

const BuilderPage = ({
	loading,
	setLoading,
	error,
	setError,
	match: {
		params: { slug },
	},
}) => {
	// Style
	const classes = useStyles();

	// API Cancel Token
	const cancelBuilderToken = useRef();

	// Builder Data
	const [builder, setBuilder] = useState(null);

	// Fetch Builder
	const fetchBuilder = useCallback(async () => {
		try {
			cancelBuilderToken.current = axios.CancelToken.source();
			const resp = await getBuilderDetails(
				slug,
				cancelBuilderToken.current,
				setLoading
			);
			setError(null);
			setBuilder(resp);
		} catch (error) {
			setBuilder(null);
			setError(error);
		}
	}, [slug, setLoading, setError]);

	React.useEffect(() => {
		fetchBuilder();

		return () => {
			if (cancelBuilderToken.current) {
				cancelBuilderToken.current.cancel();
			}
		};
	}, [fetchBuilder]);
	return (
		<div className={classes.wrapper}>
			<h1>{slug}</h1>
			<ErrorBackdrop open={!!error} message={error} />
			{builder && <pre>{JSON.stringify(builder, null, 2)}</pre>}
		</div>
	);
};

export default withAsync(BuilderPage);
