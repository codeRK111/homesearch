import { propertyActionTypes } from './property.types';

const initialState = {
	// Initial Values
	// Loading States
	searchPropertyLoading: false,
	getPropertyDetailsLoading: false,
	getPropertyResourcesLoading: false,
	postPropertyLoading: false,
	updatePropertyLoading: false,
	getMyPropertiesLoading: false,
	queryOnPropertyLoading: false,
	getQueriesLoading: false,
	furnishes: [],
	amenities: [],
	myQueries: [],
	queriesReceived: [],
	// Errors
};

const propertyReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case propertyActionTypes.TOGGLE_SEARCH_PROPERTY_LOADING:
			return {
				...state,
				searchPropertyLoading: payload,
			};
		case propertyActionTypes.TOGGLE_GET_PROPERTY_DETAILS_LOADING:
			return {
				...state,
				getPropertyDetailsLoading: payload,
			};
		case propertyActionTypes.TOGGLE_GET_PROPERTY_RESOURCES_LOADING:
			return {
				...state,
				getPropertyResourcesLoading: payload,
			};
		case propertyActionTypes.TOGGLE_POST_PROPERTY_LOADING:
			return {
				...state,
				postPropertyLoading: payload,
			};
		case propertyActionTypes.TOGGLE_UPDATE_PROPERTY_LOADING:
			return {
				...state,
				updatePropertyLoading: payload,
			};
		case propertyActionTypes.TOGGLE_MY_PROPERTIES_LOADING:
			return {
				...state,
				getMyPropertiesLoading: payload,
			};
		case propertyActionTypes.TOGGLE_QUERY_ON_PROPERTY_LOADING:
			return {
				...state,
				queryOnPropertyLoading: payload,
			};
		case propertyActionTypes.TOGGLE_GET_QUERIES_LOADING:
			return {
				...state,
				getQueriesLoading: payload,
			};
		case propertyActionTypes.SET_PROPERTY_RESOURCES:
			return {
				...state,
				furnishes: payload.furnishes,
				amenities: payload.amenities,
			};
		case propertyActionTypes.SET_MY_QUERIES:
			return {
				...state,
				myQueries: payload,
			};
		case propertyActionTypes.SET_QUERIES_RECEIVED:
			return {
				...state,
				queriesReceived: payload,
			};

		default:
			return state;
	}
};

export default propertyReducer;
