export interface ServerResponse<T> {
		status: 'success' | 'fail';
		token?: string;
		data: T
}