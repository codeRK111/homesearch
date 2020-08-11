import { UserActionTypes } from './users.types';

const INITIAL_STATE = {
	users: [],
	selectedUser: null,
	loading: false,
	addUserLoading: false,
	error: null,
	addError: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SET_ALL_USERS:
			return {
				...state,
				error: null,
				users: action.payload,
			};
		case UserActionTypes.ADD_USER_SUCCESS:
			return {
				...state,
				addError: null,
			};
		case UserActionTypes.SET_SELECTED_USER:
			return {
				...state,
				error: null,
				selectedUser: action.payload,
			};
		case UserActionTypes.SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case UserActionTypes.SET_ADD_ERROR:
			return {
				...state,
				addError: action.payload,
			};
		case UserActionTypes.TOGGLE_LOADING:
			return {
				...state,
				loading: !state.loading,
			};
		case UserActionTypes.TOGGLE_ADD_USER_LOADING:
			return {
				...state,
				addUserLoading: !state.addUserLoading,
			};
		default:
			return state;
	}
};

export default userReducer;
