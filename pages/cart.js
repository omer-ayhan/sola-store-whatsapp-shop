import CartLayout from "layout/CartLayout";
import Page from "@components/Page";
import React from "react";

export default function cart() {
	return (
		<Page className="h-screen">
			<div className="px-4">
				<CartLayout />
			</div>
		</Page>
	);
}
