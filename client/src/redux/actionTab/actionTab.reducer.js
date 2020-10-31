import { actionTabActionTypes } from './actionTab.types';

const initialState = {
	// Initial Values
	currentTab: 'rent',
	// Loading States
	// Errors
};

const actionTabReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTabActionTypes.SET_CURRENT_TAB:
			return {
				...state,
				currentTab: payload,
			};
		default:
			return state;
	}
};

export default actionTabReducer;
