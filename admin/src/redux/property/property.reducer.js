import { PropertyActionTypes } from './property.types';

const INITIAL_STATE = {
	furnishes: [],
	amenities: [],
	properties: [],
	loading: false,
	propertyDetailsLoading: false,
	updatePropertyLoading: false,
	addPropertySaleLoading: false,
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
		case PropertyActionTypes.PROPERTY_DETAILS_LOADING:
			return {
				...state,
				propertyDetailsLoading: action.payload,
			};
		case PropertyActionTypes.UPDATE_PROPERTY_LOADING:
			return {
				...state,
				updatePropertyLoading: action.payload,
			};
		case PropertyActionTypes.ADD_PROPERTY_SALE_LOADING:
			return {
				...state,
				addPropertySaleLoading: action.payload,
			};
		default:
			return state;
	}
};

export default cityReducer;
