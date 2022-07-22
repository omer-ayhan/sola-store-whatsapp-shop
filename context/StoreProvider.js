import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

import initialState from "./store";
import reducer from "./reducer";
import {
	SET_CART_NUM,
	SET_IS_SAFARI,
	SET_SALES_TEAM_DATA,
	SIGN_IN_USER,
} from "./types";
import { notify } from "@components/Toast";
import useCart from "hooks/useCart";

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { cartActions, isCartLoading } = useCart(dispatch, state.uid);

	const handleUser = async () => {
		try {
			const { data } = await axios.get("/api/auth/userCheck");
			dispatch({
				type: SIGN_IN_USER,
				payload: data,
			});
		} catch (error) {
			notify("error", error.response.data.message);
		}
	};

	const handleSalesTeam = async () => {
		const { data } = await axios.get("/api/payment/getSalesTeam");
		dispatch({
			type: SET_SALES_TEAM_DATA,
			payload: data,
		});
	};

	const checkSafari = () =>
		navigator.userAgent &&
		dispatch({
			type: SET_IS_SAFARI,
			payload: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
		});

	useEffect(() => {
		handleUser();
		handleSalesTeam();
		checkSafari();
	}, []);

	useEffect(() => {
		dispatch({
			type: SET_CART_NUM,
			payload: state.cartItems
				? state.cartItems.reduce((quantity, currQty) => {
						return quantity + currQty.quantity;
				  }, 0)
				: 0,
		});
	}, [state.cartItems]);

	return (
		<StoreContext.Provider
			value={{ state, dispatch, cartActions, isCartLoading }}>
			{children}
		</StoreContext.Provider>
	);
}
