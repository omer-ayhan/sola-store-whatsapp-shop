import {
	SET_CART_DATA,
	SET_CART_NUM,
	SET_COMPLETED_CART,
	SET_IS_SAFARI,
	SET_SALES_TEAM_DATA,
	SIGN_IN_USER,
} from "./types";

const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_CART_DATA:
			return {
				...state,
				cartItems: payload,
			};
		case SIGN_IN_USER:
			return {
				...state,
				uid: payload,
			};
		case SET_CART_NUM:
			return {
				...state,
				cartsNum: payload,
			};
		case SET_COMPLETED_CART:
			return {
				...state,
				completedCart: payload,
			};
		case SET_SALES_TEAM_DATA:
			return {
				...state,
				salesTeamData: payload,
			};
		case SET_IS_SAFARI:
			return {
				...state,
				isSafari: payload,
			};
		default:
			return state;
	}
};

export default reducer;
