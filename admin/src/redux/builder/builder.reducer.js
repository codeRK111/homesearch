import { builderActionTypes } from './builder.types';

const INITIAL_STATE = {
	addBuilderLoading: false,
	updateBuilderLoading: false,
	fetchBuildersLoading: false,
	fetchBuilderInfoLoading: false,
	builders: [],
};

const builderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case builderActionTypes.TOGGLE_ADD_BUILDER_LOADING:
			return {
				...state,
				addBuilderLoading: action.payload,
			};
		case builderActionTypes.TOGGLE_UPDATE_BUILDER_LOADING:
			return {
				...state,
				updateBuilderLoading: action.payload,
			};
		case builderActionTypes.TOGGLE_FETCH_BUILDERS_LOADING:
			return {
				...state,
				fetchBuildersLoading: action.payload,
			};
		case builderActionTypes.TOGGLE_FETCH_BUILDER_INFO_LOADING:
			return {
				...state,
				fetchBuilderInfoLoading: action.payload,
			};
		case builderActionTypes.SET_BUILDERS:
			return {
				...state,
				builders: action.payload,
			};

		default:
			return state;
	}
};

export default builderReducer;
