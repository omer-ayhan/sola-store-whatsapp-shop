import React, { memo, useContext, useEffect, useRef, useState } from "react";
import Drawer from "react-drag-drawer";
import {
	FaArrowLeft,
	FaCheckCircle,
	FaRegCreditCard,
	FaTimesCircle,
} from "react-icons/fa";
import { Formik } from "formik";

import { Input } from "./Input";
import { StoreContext } from "context/StoreProvider";
import useDetectOutside from "hooks/useDetectOutside";
import { paymentModel } from "lib/yupmodels";
import { notify } from "./Toast";
import axios from "axios";
import { SET_CART_DATA, SET_COMPLETED_CART } from "context/types";
import Image from "next/image";
import sources from "sources";
import Spinner from "./Spinner";

function PaymentModal({ show, onClose }) {
	const { state, cartActions, dispatch } = useContext(StoreContext);
	const { cartRefetch } = cartActions;
	const [currentSeller, setCurrentSeller] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState(null);
	const modalRef = useRef();

	useDetectOutside(modalRef, onModalClose);

	function onModalClose() {
		onClose();
		setCurrentSeller(null);
		setPaymentStatus(null);
	}

	const handleSeller = (seller) => setCurrentSeller(seller);

	const handlePaymentStatus = () => {
		switch (paymentStatus) {
			case "success":
				return (
					<div className="grid place-items-center gap-2">
						<FaCheckCircle size={80} className="text-primary-green" />
						<p className="text-3xl font-semibold text-primary-green capitalize">
							Successfully Paid
						</p>
					</div>
				);
			case "fail":
				return (
					<div className="grid place-items-center gap-2">
						<FaTimesCircle size={80} className="text-red-600" />
						<p className="text-3xl font-semibold text-red-600 capitalize">
							Failed to Pay
						</p>
					</div>
				);
			default:
				return (
					<>
						<div className="grid grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center mb-4">
							{state.salesTeamData.map((team, index) => (
								<button
									className={
										team.id === currentSeller?.id
											? "border-2 border-solid border-red-600"
											: ""
									}
									onClick={() => handleSeller(team)}>
									<Image
										key={`${index}-.-${team.id}`}
										className="rounded-full"
										src={
											team.id === sources.DEF_SELLER
												? team.pictureGuidName
												: `${sources.saleTeam}${team.pictureGuidName}`
										}
										width={110}
										height={110}
										objectFit="contain"
									/>
									<p className="capitalize font-semibold">{team.name}</p>
								</button>
							))}
						</div>
						<Formik
							initialValues={paymentModel.initials}
							validationSchema={paymentModel.schema}
							onSubmit={handlePaymentSubmit}>
							{({
								values,
								touched,
								errors,
								handleChange,
								handleBlur,
								handleSubmit,
							}) => (
								<form
									className="grid grid-cols-1 gap-4"
									onSubmit={handleSubmit}>
									<Input
										id="name"
										name="name"
										type="text"
										label="Name"
										required
										values={values.name}
										touched={touched.name}
										errors={errors.name}
										handleChange={handleChange}
										handleBlur={handleBlur}
									/>
									<Input
										id="tel"
										name="tel"
										type="tel"
										label="Phone Number"
										required
										values={values.tel}
										touched={touched.tel}
										errors={errors.tel}
										handleChange={handleChange}
										handleBlur={handleBlur}
									/>

									<button
										type="submit"
										className="flex justify-center items-center gap-2 text-sm sm:text-base lg:text-lg bg-secondary-green hover:bg-secondary-green-dark text-white p-3 px-4 rounded-lg font-semibold transition-colors duration-300 ease-in-out capitalize">
										{isLoading ? (
											<Spinner />
										) : (
											<>
												<FaRegCreditCard size={25} /> Pay with current account
											</>
										)}
									</button>
								</form>
							)}
						</Formik>
					</>
				);
		}
	};

	const handlePaymentSubmit = async (values, { resetForm }) => {
		const { name, tel } = values;
		if (state.cartItems.length === 0) {
			onClose();
			notify("error", "Cart is empty");
			return;
		}
		if (!currentSeller?.id) {
			notify("error", "Please select a seller");
			return;
		}
		setIsLoading(true);
		try {
			const { data } = await axios.post("/api/payment/addOrderVisitor", {
				buyerName: name,
				buyerPhone: tel.toString(),
				salesRepresantID: currentSeller.id,
				visitorGuidID: state.uid,
				os: "Desktop",
				paymentType: "Order",
				isCompleted: true,
				coupon: "string",
			});

			dispatch({
				type: SET_COMPLETED_CART,
				payload: {
					orderID: data,
				},
			});

			resetForm();

			cartRefetch();
			setPaymentStatus("success");
		} catch (error) {
			setPaymentStatus("fail");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Drawer open={show}>
			<div ref={modalRef} className="grid grid-cols-1 bg-white z-50">
				<div className="flex justify-between items-center h-16 bg-primary-green w-full py-2 px-4">
					<div className="flex items-center gap-3">
						<button
							onClick={onModalClose}
							className="p-3 py-2 border-2 border-[#80c0b4] rounded-md hover:border-white transition-colors duration-250 ease-in-out">
							<FaArrowLeft width={25} height={25} color="white" />
						</button>
						<p className="text-lg text-white capitalize">
							Pay with current account
						</p>
					</div>
				</div>
				<div className="bg-white w-full p-6 py-8">
					{handlePaymentStatus()}
					{/* <>
						<div className="grid grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center mb-4">
							{state.salesTeamData.map((team, index) => (
								<button
									className={
										team.id === currentSeller?.id
											? "border-2 border-solid border-red-600"
											: ""
									}
									onClick={() => handleSeller(team)}>
									<Image
										key={`${index}-.-${team.id}`}
										className="rounded-full"
										src={
											team.id === sources.DEF_SELLER
												? team.pictureGuidName
												: `${sources.saleTeam}${team.pictureGuidName}`
										}
										width={110}
										height={110}
										objectFit="contain"
									/>
									<p className="capitalize font-semibold">{team.name}</p>
								</button>
							))}
						</div>
						<Formik
							initialValues={paymentModel.initials}
							validationSchema={paymentModel.schema}
							onSubmit={handlePaymentSubmit}>
							{({
								values,
								touched,
								errors,
								handleChange,
								handleBlur,
								handleSubmit,
							}) => (
								<form
									className="grid grid-cols-1 gap-4"
									onSubmit={handleSubmit}>
									<Input
										id="name"
										name="name"
										type="text"
										label="Name"
										required
										values={values.name}
										touched={touched.name}
										errors={errors.name}
										handleChange={handleChange}
										handleBlur={handleBlur}
									/>
									<Input
										id="tel"
										name="tel"
										type="tel"
										label="Phone Number"
										required
										values={values.tel}
										touched={touched.tel}
										errors={errors.tel}
										handleChange={handleChange}
										handleBlur={handleBlur}
									/>

									<button
										type="submit"
										className="flex justify-center items-center gap-2 text-sm sm:text-base lg:text-lg bg-secondary-green hover:bg-secondary-green-dark text-white p-3 px-4 rounded-lg font-semibold transition-colors duration-300 ease-in-out capitalize">
										{isLoading ? (
											<Spinner />
										) : (
											<>
												<FaRegCreditCard size={25} /> Pay with current account
											</>
										)}
									</button>
								</form>
							)}
						</Formik>
					</> */}
				</div>
			</div>
		</Drawer>
	);
}

export default memo(PaymentModal);
