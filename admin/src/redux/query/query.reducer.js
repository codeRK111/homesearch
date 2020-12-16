import { queryActionTypes } from './query.types';

const initialState = {
	// Initial Values
	queries: [],
	expertQueries: [],
	expertQueriesCount: 0,
	// Loading States

	getQueriesLoading: false,
	getExpertQueriesLoading: false,
	getExpertQueryDetailsLoading: false,
	updateExpertQueryDetailsLoading: false,
	addExpertQueryLoading: false,
	deleteQueryLoading: false,
	deleteExpertQueryLoading: false,

	// Errors
};

const propertyReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case queryActionTypes.TOGGLE_GET_QUERIES_LOADING:
			return {
				...state,
				getQueriesLoading: payload,
			};
		case queryActionTypes.TOGGLE_GET_EXPERT_QUERIES_LOADING:
			return {
				...state,
				getExpertQueriesLoading: payload,
			};
		case queryActionTypes.TOGGLE_GET_EXPERT_QUERY_DETAILS_LOADING:
			return {
				...state,
				getExpertQueryDetailsLoading: payload,
			};
		case queryActionTypes.TOGGLE_UPDATE_EXPERT_QUERY_DETAILS_LOADING:
			return {
				...state,
				updateExpertQueryDetailsLoading: payload,
			};
		case queryActionTypes.TOGGLE_ADD_EXPERT_QUERY_LOADING:
			return {
				...state,
				addExpertQueryLoading: payload,
			};
		case queryActionTypes.TOGGLE_DELETE_QUERY_LOADING:
			return {
				...state,
				deleteQueryLoading: payload,
			};
		case queryActionTypes.TOGGLE_DELETE_EXPERT_QUERY_LOADING:
			return {
				...state,
				deleteExpertQueryLoading: payload,
			};

		case queryActionTypes.SET_QUERIES:
			return {
				...state,
				queries: payload,
			};
		case queryActionTypes.SET_EXPERT_QUERIES:
			return {
				...state,
				expertQueries: payload.queries,
				expertQueriesCount: payload.count,
			};

		default:
			return state;
	}
};

export default propertyReducer;
