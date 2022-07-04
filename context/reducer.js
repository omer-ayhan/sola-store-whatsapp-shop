export const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case ADD_TO_CART:
			return {
				...state,
				cartItems: payload,
			};

		default:
			return state;
	}
};
