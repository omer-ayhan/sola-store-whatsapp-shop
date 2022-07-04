import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

import initialState from "./store";
import reducer from "./reducer";
import { SIGN_IN_USER } from "./types";
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

	useEffect(() => {
		handleUser();
	}, []);

	return (
		<StoreContext.Provider
			value={{ state, dispatch, cartActions, isCartLoading }}>
			{children}
		</StoreContext.Provider>
	);
}
