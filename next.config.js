/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");

module.exports = nextTranslate({
	i18n: {
		localeDetection: false,
		locales: ["en", "ru", "ar", "fr", "tr"],
		defaultLocale: "ru",

		domains: [
			{
				domain: "localhost:3000",
				defaultLocale: "ru",
				http: true,
			},
		],
	},
	images: {
		domains: ["solastore.com.tr", "yenisite.solastore.com.tr", "localhost"],
	},
});
