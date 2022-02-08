import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

export const asyncGetTestimonials = async (filters) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');
		let url = `/testimonial`;
		let a = Object.keys(filters);
		let b = '';
		a.forEach((c, i) => {
			if (i === 0) {
				b += '?';
			}
			b += `${c}=${filters[c]}`;
			if (i !== a.length - 1) {
				b += '&';
			}
		});
		const resp = await axios.get(
			apiUrl(`${url}${b}`, 2),

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return resp.data.data;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
