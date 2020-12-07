import { queryActionTypes } from './query.types';

// Fetch

export const getQueries = (payload) => ({
	type: queryActionTypes.GET_QUERIES,
	payload,
});
export const deleteQuery = (payload) => ({
	type: queryActionTypes.DELETE_QUERY,
	payload,
});
export const setQueries = (payload) => ({
	type: queryActionTypes.SET_QUERIES,
	payload,
});

export const getQueriesLoading = (payload) => ({
	type: queryActionTypes.TOGGLE_GET_QUERIES_LOADING,
	payload,
});
export const deleteQueryLoading = (payload) => ({
	type: queryActionTypes.TOGGLE_DELETE_QUERY_LOADING,
	payload,
});
