import { PropertyActionTypes } from './property.types';

const INITIAL_STATE = {
	furnishes: [],
	amenities: [],
	properties: [],
	loading: false,
};

const cityReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PropertyActionTypes.SET_FURNISHES:
			return {
				...state,
				furnishes: action.payload,
			};
		case PropertyActionTypes.SET_PROPERTIES:
			return {
				...state,
				properties: action.payload,
			};
		case PropertyActionTypes.SET_AMENITIES:
			return {
				...state,
				amenities: action.payload,
			};
		case PropertyActionTypes.TOGGLE_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};

export default cityReducer;
