import React from "react";

export default function Page({ children, className }) {
	return (
		<div className={`relative w-full ${className ?? ""}`}>
			<div className="bg-background-color h-full w-full absolute -z-20" />
			<div className="bg-[url('/images/bg.png')] bg-repeat opacity-10 h-full w-full absolute -z-10" />
			{children}
		</div>
	);
}
