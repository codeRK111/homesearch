import { queryActionTypes } from './query.types';

const initialState = {
	// Initial Values
	queries: [],
	// Loading States

	getQueriesLoading: false,
	deleteQueryLoading: false,

	// Errors
};

const propertyReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case queryActionTypes.TOGGLE_GET_QUERIES_LOADING:
			return {
				...state,
				getQueriesLoading: payload,
			};
		case queryActionTypes.TOGGLE_DELETE_QUERY_LOADING:
			return {
				...state,
				deleteQueryLoading: payload,
			};

		case queryActionTypes.SET_QUERIES:
			return {
				...state,
				queries: payload,
			};

		default:
			return state;
	}
};

export default propertyReducer;
