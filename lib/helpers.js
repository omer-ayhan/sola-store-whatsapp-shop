import Cookies from "cookies";

export function saveCookie({ key, value, req, res }) {
	const cookies = new Cookies(req, res);
	cookies.set(key, JSON.stringify(value), {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: Date.now() + 1000 * 60 * 60 * 24 * 365,
		path: "/",
		sameSite: "strict",
	});
}
