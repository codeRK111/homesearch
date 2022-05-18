import { apiUrl, asyncError } from './render.utils';

import axios from 'axios';

export const asyncAddContact = async (contactData) => {
	try {
		const resp = await axios.post(apiUrl('/user-contact ', 2), contactData);
		return resp.data.data;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
export const asyncValidateContact = async (id, otp) => {
	try {
		const resp = await axios.get(
			apiUrl(`/user-contact/validate-otp/${id}/${otp}`, 2)
		);
		return resp.data.data;
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
