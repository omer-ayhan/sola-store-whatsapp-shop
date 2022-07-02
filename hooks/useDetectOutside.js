import { useEffect } from "react";

export default function useDetectOutside(ref, func) {
	const handleClickOutside = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			return func();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}
