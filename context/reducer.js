import { SET_CART_DATA, SIGN_IN_USER } from "./types";

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
		default:
			return state;
	}
};

export default reducer;
