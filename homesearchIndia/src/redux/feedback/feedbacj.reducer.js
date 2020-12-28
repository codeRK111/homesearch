import { feedbackActionTypes } from './feedback.types';

const initialState = {
	// Initial Values
	// Loading States
	addFeedbackLoading: false,

	// Errors
};

const feedbackReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case feedbackActionTypes.TOGGLE_ADD_FEEDBACK_LOADING:
			return {
				...state,
				addFeedbackLoading: payload,
			};

		default:
			return state;
	}
};

export default feedbackReducer;
