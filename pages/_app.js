import { useEffect } from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import Script from "next/script";

import Layout from "layout/Layout";
import StoreProvider from "context/StoreProvider";
import { ANALYTICS_ID } from "lib/constants";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import ym, { YMInitializer } from "react-yandex-metrika";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	const handleRouteChange = (url) => {
		if (typeof window !== "undefined") {
			ym("hit", url);
			window.gtag("config", ANALYTICS_ID, {
				page_path: url,
			});
		}
	};

	const checkDeviceLang = () => {
		if (navigator?.userLanguage) {
			return router.push(router.asPath, router.asPath, {
				locale: navigator.userLanguage.split("-")[0],
			});
		} else if (navigator?.language) {
			return router.push(router.asPath, router.asPath, {
				locale: navigator.language.split("-")[0],
			});
		}
		return router.push(router.asPath, router.asPath, { locale: "en" });
	};

	useEffect(() => {
		checkDeviceLang();
	}, []);

	useEffect(() => {
		router.events.on("routeChangeComplete", handleRouteChange);
		router.events.on("routeChangeStart", (url) => {
			ym("hit", url);
		});
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
			router.events.off("routeChangeStart", (url) => {
				ym("hit", url);
			});
		};
	}, [router.events]);
	return (
		<>
			<Head>
				<title>Sola Store</title>
				<link
					rel="shortcut icon"
					href="/images/logo/favicon/apple-icon-72x72.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="57x57"
					href="/images/logo/favicon/apple-icon-57x57.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/images/logo/favicon/apple-icon-60x60.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="/images/logo/favicon/apple-icon-72x72.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/images/logo/favicon/apple-icon-76x76.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/images/logo/favicon/apple-icon-114x114.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/images/logo/favicon/apple-icon-120x120.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/images/logo/favicon/apple-icon-144x144.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/images/logo/favicon/apple-icon-152x152.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/images/logo/favicon/apple-icon-180x180.jpg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="192x192"
					href="/images/logo/favicon/android-icon-192x192.jpg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="32x32"
					href="/images/logo/favicon/favicon-32x32.jpg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="96x96"
					href="/images/logo/favicon/favicon-96x96.jpg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="16x16"
					href="/images/logo/favicon/favicon-16x16.jpg"
				/>
			</Head>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				draggable={false}
				pauseOnVisibilityChange
				closeOnClick
				pauseOnHover
			/>
			<QueryClientProvider client={queryClient}>
				<StoreProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</StoreProvider>
			</QueryClientProvider>
			<YMInitializer
				accounts={[89597922]}
				options={{
					accurateTrackBounce: true,
					webvisor: true,
					defer: true,
					clickmap: true,
					trackHash: true,
					trackLinks: true,
				}}
				version="2"
			/>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
			/>
			<Script>
				{`
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());

 gtag('config', '${ANALYTICS_ID}'); 
  `}
			</Script>
		</>
	);
}

export default MyApp;
