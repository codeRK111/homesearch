import { useEffect, useState } from 'react';

import { asyncError } from '../utils/render.utils';
import axios from 'axios';

const useAxios = (url, config) => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');
	const [loading, setloading] = useState(true);

	useEffect(() => {
		// Declare Axios cancel token
		const source = axios.CancelToken.source();

		// Define the axios call
		const callAxios = async () => {
			// Begin with a clean state

			try {
				setloading(true);
				const apiResponse = await axios(url, {
					...config,
					cancelToken: source.token,
				});
				setloading(false);
				setResponse(apiResponse.data);
				setError('');
			} catch (err) {
				setloading(false);
				// Two options on error:
				// 1. If error is an axios cancel, simply return and move on
				// 2. For all other errors, assume async failure and dispatch failure action
				if (axios.isCancel(err)) {
					console.log('Canceled request.');
					return;
				}
				setError(asyncError(err));
			}
		};

		// Invoke the defined axios call
		callAxios();

		// On unmount, cancel the request
		return () => {
			source.cancel('Operation canceled.');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return { response, error, loading };
};

export default useAxios;
