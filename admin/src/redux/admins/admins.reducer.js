import { AdminActionTypes } from './admins.types';

const INITIAL_STATE = {
	admins: [],
	admins_error: null,
	admins_loading: false,
	admin_update_error: null,
	admin_update_loading: false,
	admin_add_error: null,
	admin_add_loading: false,
	fetch_my_staffs_loading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AdminActionTypes.SET_ALL_ADMINS:
			return {
				...state,
				admins_error: null,
				admins: action.payload,
			};

		case AdminActionTypes.SET_ALL_ADMINS_ERROR:
			return {
				...state,
				admins_error: action.payload,
			};
		case AdminActionTypes.SET_UPDATE_ADMIN_ERROR:
			return {
				...state,
				admin_update_error: action.payload,
			};
		case AdminActionTypes.SET_ADD_ADMIN_ERROR:
			return {
				...state,
				admin_add_error: action.payload,
			};
		case AdminActionTypes.RESET_ADD_ADMIN_ERROR:
			return {
				...state,
				admin_add_error: null,
			};

		case AdminActionTypes.TOGGLE_ALL_ADMINS_LOADING:
			return {
				...state,
				admins_loading: !state.admins_loading,
			};
		case AdminActionTypes.TOGGLE_UPDATE_ADMIN_LOADING:
			return {
				...state,
				admin_update_loading: !state.admin_update_loading,
			};
		case AdminActionTypes.TOGGLE_ADD_ADMIN_LOADING:
			return {
				...state,
				admin_add_loading: !state.admin_add_loading,
			};
		case AdminActionTypes.TOGGLE_FETCH_MY_STAFFS_LOADING:
			return {
				...state,
				fetch_my_staffs_loading: action.payload,
			};

		default:
			return state;
	}
};

export default userReducer;
