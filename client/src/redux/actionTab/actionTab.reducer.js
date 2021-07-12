import { actionTabActionTypes } from './actionTab.types';

const initialState = {
	// Initial Values
	currentTab: 'project',
	selectedCity: {
		id: null,
		name: null,
	},
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
		case actionTabActionTypes.SET_SELECTED_CITIES:
			return {
				...state,
				selectedCity: payload,
			};
		default:
			return state;
	}
};

export default actionTabReducer;
