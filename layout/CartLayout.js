import React, { useContext } from "react";
import { FaBoxOpen, FaTrash, FaWhatsapp } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";

const PaymentModal = dynamic(() => import("@components/PaymentModal"));
import { StoreContext } from "context/StoreProvider";
import useModal from "hooks/useModal";
import CartItem from "@components/CartItem";
import WarningModal from "@components/WarningModal";
import Link from "next/link";

export default function CartLayout() {
	const { open, closeModal, openModal } = useModal({
		payment: false,
		warning: false,
	});
	const { t } = useTranslation("common");
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
				modalTitle={t("prompt.modalTitle")}
				warningTitle={t("prompt.warningTitle")}
				positiveText={t("prompt.positiveText")}
				negativeText={t("prompt.negativeText")}
				onPositiveClick={handlePositiveClick}
				onNegativeClick={handleNegativeClick}
			/>

			<div className="w-full flex flex-col pt-8 gap-3">
				<div className="flex-1 rounded-lg bg-white  p-3 py-1 shadow-md text-center">
					<p className="font-semibold">{t("cart")}</p>
				</div>
				{!!state.cartItems.length ? (
					<div className="flex-1 rounded-lg  bg-white p-2">
						{state.cartItems.map((cart, i) => (
							<CartItem key={`${i}.!.!${i}`} data={cart} />
						))}

						<div className="flex justify-between p-3 border-t-1">
							<p>{t("total")}:</p>
							<div className="flex w-16 items-center justify-between">
								<p>${totalPrice}</p>
								<button onClick={handleEmptyCart}>
									<FaTrash width={24} height={24} className="text-red-500" />
								</button>
							</div>
						</div>
					</div>
				) : (
					<div className="flex-1 flex flex-col items-center rounded-lg bg-white  p-3 py-2 shadow-md text-center">
						<FaBoxOpen size={50} className="text-primary-green" />
						<p className="font-semibold">{t("emptyCart")}</p>
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
				   p-3 py-2 shadow-md text-center transition-colors duration-250 ease-in-out`}>
					<FaWhatsapp width={20} height={20} color="white" />
					<p className="font-semibold text-white capitalize">{t("order")}</p>
				</button>
				<Link href="/">
					<a
						className={`lg:hidden flex-1 flex items-center justify-center gap-3 rounded-lg bg-secondary-green hover:bg-secondary-green-dark  p-3 py-2 shadow-md text-center transition-colors duration-250 ease-in-out`}>
						<IoMdReturnLeft size={20} color="white" />
						<p className="font-semibold text-white">
							{state.cartItems.length > 0
								? t("continueShopping")
								: t("backToHome")}
						</p>
					</a>
				</Link>
			</div>
		</>
	);
}
