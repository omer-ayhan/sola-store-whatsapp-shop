/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"primary-green": "#008169",
				"secondary-green": "#21bb46",
				"background-color": "#e5ddd5",
			},
		},
	},
	plugins: [
		require("tailwind-bootstrap-grid")({
			containerMaxWidths: {
				sm: "540px",
				md: "720px",
				lg: "960px",
				xl: "1140px",
			},
		}),
	],
};