import { StoreContext } from "context/StoreProvider";
import React, { useContext } from "react";
import { FaBoxOpen, FaTrash, FaWhatsapp } from "react-icons/fa";
import CartItem from "./CartItem";

export default function CartLayout() {
	const { state } = useContext(StoreContext);

	return (
		<div className="w-full flex flex-col py-16 gap-3">
			<div className="flex-1 rounded-lg bg-white max-w-sm p-3 py-1 shadow-md text-center">
				<p className="font-semibold">Cart</p>
			</div>
			{!!state.cartItems.length ? (
				<div className="flex-1 rounded-lg max-w-sm bg-white p-2">
					{state.cartItems.map((cart, i) => (
						<CartItem key={`${i}.!.!${i}`} data={cart} />
					))}

					<div className="flex justify-between p-3 border-t-1">
						<p>Total:</p>
						<div className="flex w-14 items-center justify-between">
							<p>3</p>
							<button>
								<FaTrash width={24} height={24} className="text-red-500" />
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="flex-1 flex flex-col items-center rounded-lg bg-white max-w-sm p-3 py-2 shadow-md text-center">
					<FaBoxOpen size={50} className="text-primary-green" />
					<p className="font-semibold">Cart Empty</p>
				</div>
			)}
			<button className="flex-1 flex items-center justify-center gap-3 rounded-lg bg-secondary-green hover:bg-secondary-green-dark max-w-sm p-3 py-2 shadow-md text-center transition-colors duration-250 ease-in-out">
				<FaWhatsapp width={20} height={20} color="white" />
				<p className="font-semibold text-white">Give Order</p>
			</button>
		</div>
	);
}
