import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

// const token = localStorage.getItem('JWT_CLIENT');

export const getBlogs = (cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/blog/user`, 2), {
				cancelToken: cancelToken.token,
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data.blogs);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};
export const getBlogDetails = (slug, cancelToken, setLoading) => {
	return new Promise((resolve, reject) => {
		setLoading(true);
		axios
			.get(apiUrl(`/blog/user/${slug}`, 2), {
				cancelToken: cancelToken.token,
			})
			.then((resp) => {
				setLoading(false);
				return resolve(resp.data.data);
			})
			.catch((error) => {
				setLoading(false);
				return reject(asyncError(error));
			});
	});
};
