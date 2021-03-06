import React, { memo, useContext } from "react";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FixedSizeList } from "react-window";

import { StoreContext } from "context/StoreProvider";
import useTranslation from "next-translate/useTranslation";
import CustomCarousel from "./CustomCarousel";

function ModalProduct({ data, windowProps }) {
	const { t } = useTranslation("common");
	const { cartActions, state } = useContext(StoreContext);
	const { addToCartAction, incrementQuantity, decrementQuantity } = cartActions;

	const handleAddToCart = (productId, productName) => {
		addToCartAction({
			userId: state.uid,
			productId,
			productName,
			quantity: 1,
		});
	};

	const handleDecrement = (productId) => {
		decrementQuantity({
			productId,
			userId: state.uid,
		});
	};

	const handleIncrement = (productId) => {
		incrementQuantity({
			productId,
			userId: state.uid,
		});
	};

	const chooseWidth = (width) => {
		if (width < 500) {
			return windowProps.width;
		} else if (width < 800) {
			return 500;
		}
		return 700;
	};

	return (
		<FixedSizeList
			className="no-scrollbar"
			height={windowProps.height}
			width={chooseWidth(windowProps.width)}
			itemCount={data.length}
			itemSize={windowProps.height + 20}>
			{({ index: i, style }) => {
				const product = data[i];
				const sizeNum = (product.sizes && product.sizes.split("-").length) || 0;
				const oldUnitPrice = product.oldPrice / sizeNum;
				const cartItem =
					!!state.cartItems.length &&
					state.cartItems.find(
						(cart) => cart.productID === Number(product.masterProductID)
					);

				return (
					<div
						key={`${i}..${i}`}
						style={style}
						className="flex flex-col justify-start">
						<div
							style={{
								height: `${windowProps.height - (state.isSafari ? 100 : 0)}px`,
							}}
							className="relative w-full">
							<CustomCarousel product={product} />
							<div className="absolute bottom-4 left-1/2 -translate-x-1/2">
								{cartItem ? (
									<div className="col-span-2 flex items-center">
										<button
											onClick={() => handleDecrement(product.masterProductID)}
											className="col-span-1 p-3 border-1 h-10 rounded-l-md bg-white">
											<FaMinus width={24} height={24} />
										</button>
										<p className="col-span-1 p-3 px-4 bg-primary-green h-10 grid place-content-center text-white">
											{cartItem.quantity}
										</p>
										<button
											onClick={() => handleIncrement(product.masterProductID)}
											className="col-span-1 p-3 border-1 h-10 rounded-r-md bg-white">
											<FaPlus width={24} height={24} />
										</button>
									</div>
								) : (
									<button
										onClick={() =>
											handleAddToCart(
												product.masterProductID,
												product.productShortName
											)
										}
										className="bg-primary-green p-3 py-2 rounded-md text-sm text-white font-semibold">
										{t("addToCart")}
									</button>
								)}
							</div>
						</div>
						<div className="p-2 grid grid-cols-3">
							<div className="col-span-1">
								<h1 className="w-full text-base mb-1 font-semibold">
									{product.productFullName}
								</h1>
								<p className="text-lg">
									{t("sizes")}: {product.sizes}
								</p>
							</div>
							<div className="col-span-1 ">
								{product.oldPrice > 0 && sizeNum ? (
									<>
										<h5 className="text-red-600 text-xl text-center">
											<del className="text-danger fw-bold">
												${oldUnitPrice * sizeNum} USD
											</del>
										</h5>
										<p className=" items-center text-center text-5xl self-center">
											<span className="text-3xl">$</span>
											{product.singlePrice * sizeNum}
										</p>
									</>
								) : (
									<p className="col-span-1 items-center text-center text-5xl self-center">
										<span className="text-3xl">$</span>
										{product.singlePrice * sizeNum}
									</p>
								)}
							</div>
							<div className="col-span-1 flex justify-center items-center">
								<Image src="/images/placeholder.jpg" width={70} height={70} />
							</div>
						</div>
					</div>
				);
			}}
		</FixedSizeList>
	);
}

export default memo(ModalProduct);
