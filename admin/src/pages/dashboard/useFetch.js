import React from 'react';

const useFetch = (url, initialValue) => {
	const [response, setResponse] = React.useState(initialValue);
	const [error, setError] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	React.useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(url);
				const json = await res.json();
				setResponse(json.data);
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				setError(error);
			}
		};
		fetchData();
	}, [url]);
	return { response, error, isLoading };
};

export default useFetch;
