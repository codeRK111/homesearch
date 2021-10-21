import axios from 'axios';
import { useEffect } from 'react';

type AxiosFetch = {
	url: string;
	onFetched: <T>(value: T) => void;
	onError: <T extends any>(value: T) => void;
	onCanceled: <T extends any>(value: T) => void;
};
export function useAxiosFetch({
	url,
	onFetched,
	onError,
	onCanceled,
}: AxiosFetch) {
	useEffect(() => {
		const source = axios.CancelToken.source();
		let isMounted = true;
		axios
			.get(url, { cancelToken: source.token })
			.then((res) => {
				if (isMounted) onFetched(res);
			})
			.catch((err) => {
				if (!isMounted) return; // comp already unmounted, nothing to do
				if (axios.isCancel(err)) onCanceled(err);
				else onError(err);
			});

		return () => {
			isMounted = false;
			source.cancel();
		};
	}, [url, onFetched, onError, onCanceled]);
}
