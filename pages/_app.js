import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "layout/Layout";
import StoreProvider from "context/StoreProvider";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
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
		</>
	);
}

export default MyApp;
