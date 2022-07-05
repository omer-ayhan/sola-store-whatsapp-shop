import React, { useContext } from "react";
import { FaBoxOpen, FaTrash, FaWhatsapp } from "react-icons/fa";
import dynamic from "next/dynamic";

const PaymentModal = dynamic(() => import("@components/PaymentModal"));
import { StoreContext } from "context/StoreProvider";
import useModal from "hooks/useModal";
import CartItem from "@components/CartItem";
import WarningModal from "@components/WarningModal";

export default function CartLayout() {
	const { open, closeModal, openModal } = useModal({
		payment: false,
		warning: false,
	});
	const { state, cartActions } = useContext(StoreContext);
	const { emptyCart } = cartActions;
	const isCartEmpty = state.cartItems.length === 0;

	const totalPrice =
		state.cartItems.length > 0 &&
		state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

	const handleEmptyCart = () => openModal("warning");

	const handlePayment = () => openModal("payment");

	const handlePositiveClick = () => {
		emptyCart(state.cartItems);
		closeModal("warning");
	};
	const handleNegativeClick = () => closeModal("warning");

	return (
		<>
			<PaymentModal show={open.payment} onClose={() => closeModal("payment")} />
			<WarningModal
				show={open.warning}
				onClose={() => closeModal("warning")}
				modalTitle="Are you sure?"
				warningTitle="Are you sure you want to delete all items in your cart?"
				positiveText="Yes"
				negativeText="No"
				onPositiveClick={handlePositiveClick}
				onNegativeClick={handleNegativeClick}
			/>

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
							<div className="flex w-16 items-center justify-between">
								<p>${totalPrice}</p>
								<button onClick={handleEmptyCart}>
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
				<button
					onClick={handlePayment}
					disabled={isCartEmpty}
					className={`flex-1 flex items-center justify-center gap-3 rounded-lg
				${
					isCartEmpty
						? "bg-gray-300"
						: "bg-secondary-green hover:bg-secondary-green-dark"
				}
				  max-w-sm p-3 py-2 shadow-md text-center transition-colors duration-250 ease-in-out`}>
					<FaWhatsapp width={20} height={20} color="white" />
					<p className="font-semibold text-white">Give Order</p>
				</button>
			</div>
		</>
	);
}
