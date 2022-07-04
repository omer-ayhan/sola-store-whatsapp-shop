import { createContext, useReducer } from "react";

import initialState from "./store";
import reducer from "./reducer";

const StoreContext = createContext();

export default function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
}
