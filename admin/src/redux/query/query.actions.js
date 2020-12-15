import { queryActionTypes } from './query.types';

// Fetch

export const getQueries = (payload) => ({
	type: queryActionTypes.GET_QUERIES,
	payload,
});
export const getExpertQueries = (payload) => ({
	type: queryActionTypes.GET_EXPERT_QUERIES,
	payload,
});
export const deleteQuery = (payload) => ({
	type: queryActionTypes.DELETE_QUERY,
	payload,
});
export const deleteExpertQuery = (payload) => ({
	type: queryActionTypes.DELETE_EXPERT_QUERY,
	payload,
});
export const setQueries = (payload) => ({
	type: queryActionTypes.SET_QUERIES,
	payload,
});
export const setExpertQueries = (payload) => ({
	type: queryActionTypes.SET_EXPERT_QUERIES,
	payload,
});

export const getQueriesLoading = (payload) => ({
	type: queryActionTypes.TOGGLE_GET_QUERIES_LOADING,
	payload,
});
export const getExpertQueriesLoading = (payload) => ({
	type: queryActionTypes.TOGGLE_GET_EXPERT_QUERIES_LOADING,
	payload,
});
export const deleteQueryLoading = (payload) => ({
	type: queryActionTypes.TOGGLE_DELETE_QUERY_LOADING,
	payload,
});
export const deleteExpertQueryLoading = (payload) => ({
	type: queryActionTypes.TOGGLE_DELETE_EXPERT_QUERY_LOADING,
	payload,
});
