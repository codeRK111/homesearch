import { feedbackActionTypes } from './feedback.types';

const initialState = {
	// Initial Values
	searchFeedbacks: [],
	searchFeedbacksCount: 0,
	// Loading States
	addFeedbackLoading: false,
	fetchFeedbackLoading: false,
	deleteFeedbackLoading: false,

	// Errors
};

const feedbackReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case feedbackActionTypes.TOGGLE_ADD_FEEDBACK_LOADING:
			return {
				...state,
				addFeedbackLoading: payload,
			};
		case feedbackActionTypes.TOGGLE_FETCH_FEEDBACK_LOADING:
			return {
				...state,
				fetchFeedbackLoading: payload,
			};
		case feedbackActionTypes.TOGGLE_DELETE_FEEDBACK_LOADING:
			return {
				...state,
				deleteFeedbackLoading: payload,
			};
		case feedbackActionTypes.SET_FEEDBACKS:
			return {
				...state,
				searchFeedbacks: payload.feedbacks,
				searchFeedbacksCount: payload.counts,
			};

		default:
			return state;
	}
};

export default feedbackReducer;
