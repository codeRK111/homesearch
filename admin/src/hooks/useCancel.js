import { useEffect } from 'react';

export function useCancelAxios(cancelToken) {
	useEffect(() => {
		return () => {
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		};
	});
}
