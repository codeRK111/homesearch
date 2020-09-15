import { builderActionTypes } from './builder.types';

// fetch
export const fetchBuilders = (payload) => ({
	type: builderActionTypes.FETCH_BUILDERS_START,
	payload,
});
export const fetchBuilderInfo = (payload) => ({
	type: builderActionTypes.FETCH_BUILDER_INFO_START,
	payload,
});

// set
export const setBuilders = (payload) => ({
	type: builderActionTypes.SET_BUILDERS,
	payload,
});
// toggle loading
export const toggleAddBuilderLoading = (status) => ({
	type: builderActionTypes.TOGGLE_ADD_BUILDER_LOADING,
	payload: status,
});

export const toggleFetchBuildersLoading = (status) => ({
	type: builderActionTypes.TOGGLE_FETCH_BUILDERS_LOADING,
	payload: status,
});
export const toggleUpdateBuilderLoading = (status) => ({
	type: builderActionTypes.TOGGLE_UPDATE_BUILDER_LOADING,
	payload: status,
});
export const toggleFetchBuilderInfoLoading = (status) => ({
	type: builderActionTypes.TOGGLE_FETCH_BUILDER_INFO_LOADING,
	payload: status,
});

// manage resources
export const addBuilder = (payload) => ({
	type: builderActionTypes.ADD_BUILDER_START,
	payload,
});
export const updateBuilder = (payload) => ({
	type: builderActionTypes.UPDATE_BUILDER_START,
	payload,
});
