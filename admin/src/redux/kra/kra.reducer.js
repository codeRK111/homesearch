import { kraActionTypes } from './kra.types';

const initialState = {
	// Initial Values
	addProjectAdvertisementLoading: false,
	addProjectAdvertisementLeadLoading: false,
	fetchProjectAdvertisementsLoading: false,
	fetchMyTasksLoading: false,
	fetchProjectAdvertisementLeadsLoading: false,
	fetchProjectAdvertisementLeadsScheduleLoading: false,
	fetchProjectAdvertisementLeadDetailsLoading: false,
	updateProjectAdvertisementLeadDetailsLoading: false,
	fetchProjectAdvertisementDetailsLoading: false,
	updateProjectAdvertisementDetailsLoading: false,
	deleteProjectAdvertisementLoading: false,
	deleteProjectAdvertisementLeadLoading: false,

	// Errors
};

const kraReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case kraActionTypes.TOGGLE_ADD_PROJECT_ADVERTISEMENT_LOADING:
			return {
				...state,
				addProjectAdvertisementLoading: payload,
			};
		case kraActionTypes.TOGGLE_ADD_PROJECT_ADVERTISEMENT_LEAD_LOADING:
			return {
				...state,
				addProjectAdvertisementLeadLoading: payload,
			};
		case kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENTS_LOADING:
			return {
				...state,
				fetchProjectAdvertisementsLoading: payload,
			};
		case kraActionTypes.TOGGLE_FETCH_MY_TASKS_LOADING:
			return {
				...state,
				fetchMyTasks: payload,
			};
		case kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENT_LEADS_LOADING:
			return {
				...state,
				fetchProjectAdvertisementLeadsLoading: payload,
			};
		case kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENT_LEADS_SCHEDULE_LOADING:
			return {
				...state,
				fetchProjectAdvertisementLeadsScheduleLoading: payload,
			};
		case kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENT_LEAD_DETAILS_LOADING:
			return {
				...state,
				fetchProjectAdvertisementLeadDetailsLoading: payload,
			};
		case kraActionTypes.TOGGLE_UPDATE_PROJECT_ADVERTISEMENT_LEAD_DETAILS_LOADING:
			return {
				...state,
				updateProjectAdvertisementLeadDetailsLoading: payload,
			};
		case kraActionTypes.TOGGLE_FETCH_PROJECT_ADVERTISEMENT_DETAILS_LOADING:
			return {
				...state,
				fetchProjectAdvertisementDetailsLoading: payload,
			};
		case kraActionTypes.TOGGLE_UPDATE_PROJECT_ADVERTISEMENT_DETAILS_LOADING:
			return {
				...state,
				updateProjectAdvertisementDetailsLoading: payload,
			};
		case kraActionTypes.TOGGLE_DELETE_PROJECT_ADVERTISEMENT_LOADING:
			return {
				...state,
				deleteProjectAdvertisementLoading: payload,
			};
		case kraActionTypes.TOGGLE_DELETE_PROJECT_ADVERTISEMENT_LEAD_LOADING:
			return {
				...state,
				deleteProjectAdvertisementLeadLoading: payload,
			};

		default:
			return state;
	}
};

export default kraReducer;
