import { kpiActionTypes } from './kpi.types';

const initialState = {
	// Initial Values
	fetchAllLeadsLoading: false,

	// Errors
};

const kpiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case kpiActionTypes.FETCH_ALL_LEADS_LOADING:
			return {
				...state,
				fetchAllLeadsLoading: payload,
			};

		default:
			return state;
	}
};

export default kpiReducer;
