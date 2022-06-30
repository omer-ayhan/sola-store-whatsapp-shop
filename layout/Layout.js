import Navbar from "@components/Navbar";
import Image from "next/image";
import React from "react";

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}
