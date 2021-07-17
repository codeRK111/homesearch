import { useEffect, useState } from 'react';

import axios from 'axios';

const useAxios = ({
	url,
	method,
	body = null,
	options = null,
	dependencies = [],
}) => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');
	const [loading, setloading] = useState(true);

	useEffect(() => {
		const fetchData = () => {
			axios[method](url, body, options)
				.then((res) => {
					setResponse(res.data);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setloading(false);
				});
		};
		if (method === 'post') {
			if (body) {
				fetchData();
			}
		} else {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	return { response, error, loading };
};

export default useAxios;
