import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	ACCOUNT_DELETED,
	EDIT_PROFILE_SUCCESS,
	EDIT_ADDRESS,
	GET_ADDRESS,
	SET_ADDRESS,
	SET_BILLING_ADDRESS,
	SET_SHIPPING_ADDRESS,
	EDIT_PROFILE_PIC,
	GET_STRIPE_ACCOUNT,
	GET_LISTINGS,
	DELETE_ADDRESS,
	UPDATE_BILLING_ADDRESS,
	UPDATE_SHIPPING_ADDRESS,
	POST_ITEM,
	EDIT_LISTING,
	DELETE_LISTING,
	GET_ORDER,
	CHOOSE_LISTING,
	LOADING,
	CHECKOUT_SUCCESS,
} from "../actions/types";

const initialState = {
	isLoading: true,
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	user: {
		listings: [],
		listing: {},
		billingaddress: {},
		shippingaddress: {},
		addresses: [], // if it's an array,
		orders: [],
		stripeseller: "",
		weight: "",
		height: "",
		gender: "",
	},
	order: [],
	addresses: [],
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		//For seller
		case GET_STRIPE_ACCOUNT:
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					stripeseller: payload,
				},
			};
		case EDIT_LISTING:
		case CHOOSE_LISTING:
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					listing: payload,
				},
			};

		case DELETE_LISTING:
		case GET_LISTINGS:
		case POST_ITEM:
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					listings: payload,
				},
			};

		//For buyer
		case UPDATE_BILLING_ADDRESS:
		case SET_BILLING_ADDRESS:
			return {
				...state,
				isLoading: false,

				user: {
					...state.user,
					billingaddress: payload,
				},
			};

		case UPDATE_SHIPPING_ADDRESS:
		case SET_SHIPPING_ADDRESS:
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					shippingaddress: payload,
				},
			};
		case EDIT_ADDRESS:
		case SET_ADDRESS:
		case DELETE_ADDRESS:
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					addresses: payload,
				},
			};
		case EDIT_PROFILE_PIC:
		case EDIT_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: payload,
			};

		case GET_ADDRESS:
			return {
				...state,
				isLoading: false,
				addresses: payload,
			};
		case CHECKOUT_SUCCESS:
			return {
				...state,
				isLoading: false,
				orderCurr: payload,
			};
		case USER_LOADED:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case AUTH_ERROR:
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOGOUT:
		case ACCOUNT_DELETED:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
			};

		case GET_ORDER:
			return {
				...state,
				isLoading: false,
				orders: payload,
			};
		case LOADING:
			return {
				...state,
				isLoading: true,
			};
		default:
			return state;
	}
}
