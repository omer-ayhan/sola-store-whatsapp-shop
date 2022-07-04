import axios from "axios";
import { createContext, useLayoutEffect, useReducer } from "react";

import initialState from "./store";
import reducer from "./reducer";
import { SIGN_IN_USER } from "./types";
import { notify } from "@components/Toast";

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleUser = async () => {
		try {
			const { data } = await axios.get("/api/auth/createUserId");
			dispatch({
				type: SIGN_IN_USER,
				payload: data,
			});
		} catch (error) {
			notify("error", error.response.data.message);
		}
	};

	useLayoutEffect(() => {
		handleUser();
	}, []);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
}
