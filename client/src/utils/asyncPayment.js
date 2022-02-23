import axios from 'axios';
import FileDownload from 'js-file-download';
import { apiUrl, asyncError } from './render.utils';

export const downloadInvoice = async (id) => {
	try {
		const token = localStorage.getItem('JWT_CLIENT');

		const resp = await axios.get(
			apiUrl(`/payment/download-invoice/${id}`, 2),

			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				responseType: 'blob',
			}
		);
		FileDownload(resp.data, 'invoice.pdf');
	} catch (error) {
		throw new Error(asyncError(error));
	}
};
