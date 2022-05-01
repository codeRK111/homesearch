import axios, { AxiosError } from 'axios';

export enum V2EndPoint {
	Builder = '/builder',
	Payment = '/payment',
	Utility = '/utility',
	Property = '/property',
	SaveProperty = '/save-property',
	LikeProperty = '/like-property',
	Page = '/page',
	Query = '/query',
	Project = '/project',
	User = '/user',
	Admin = '/admin',
	City = '/city',
	Review = '/review',
	Join = '/join',
	Lead = '/lead',
	LeadStrategy = '/lead-strategy',
	Testimonial = '/testimonial',
	Staff = '/staff',
	Blog = '/blog',
	Package = '/package',
	GST = '/gst',
}
export enum V1EndPoint {
	City = '/cities',
	Admin = '/admins',
	Property = '/properties',
}

export const APIV1 = axios.create({
	baseURL: '/api/v1',
});

export const APIV2 = axios.create({
	baseURL: '/api/v2',
});

export const asyncError = (error: AxiosError): string => {
	let message = '';
	if (!!error.response) {
		message = error.response.data.message;
	} else {
		message = error.message;
	}
	return message;
};

APIV2.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		console.log({ response });
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		if (error.response.status === 401) {
			localStorage.removeItem('JWT_STAFF');
			window.location.href = `${window.location.origin}/workspace/#/login`;
			return Promise.reject(error);
		} else {
			return Promise.reject(error);
		}
	}
);
