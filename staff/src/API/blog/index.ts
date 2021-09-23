import { APIV2, V2EndPoint, asyncError } from '../instance';
import { ListFilter, ServerResponse } from '../../model/apiResponse.interface';

import { AxiosResponse } from 'axios';
import { Blog } from './../../model/blog.interface';

export const asyncAddBlog = async (lead: any): Promise<Blog> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.post<any, AxiosResponse<ServerResponse<Blog>>>(
			`${V2EndPoint.Blog}`,
			lead,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const leadData = resp.data.data;

		return leadData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

type BlogList = {
	totalDocs: number;
	blogs: Blog[];
};

export const asyncFetchBlogs = async (
	filters: ListFilter
): Promise<BlogList> => {
	try {
		let url = `${V2EndPoint.Blog}`;
		const keysArr = Object.keys(filters);
		keysArr.forEach((c, i) => {
			url += `${i === 0 ? '?' : '&'}${c}=${filters[c]}`;
		});
		const token = localStorage.getItem('JWT_STAFF');
		console.log({ myToken: token });
		const resp = await APIV2.get<
			any,
			AxiosResponse<ServerResponse<BlogList>>
		>(
			`${url}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = resp.data.data;

		return data;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncFetchBlogDetails = async (id: string): Promise<Blog> => {
	try {
		let url = `${V2EndPoint.Blog}/${id}`;

		const token = localStorage.getItem('JWT_STAFF');
		console.log({ myToken: token });
		const resp = await APIV2.get<any, AxiosResponse<ServerResponse<Blog>>>(
			`${url}`,

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = resp.data.data;

		return data;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};

export const asyncUpdateBlog = async (id: string, lead: any): Promise<Blog> => {
	try {
		const token = localStorage.getItem('JWT_STAFF');
		const resp = await APIV2.patch<
			any,
			AxiosResponse<ServerResponse<Blog>>
		>(`${V2EndPoint.Blog}/${id}`, lead, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		const leadData = resp.data.data;

		return leadData;
	} catch (e: any) {
		throw new Error(asyncError(e));
	}
};
