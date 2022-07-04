import { StoreContext } from "context/StoreProvider";
import Image from "next/image";
import React, { useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FixedSizeList } from "react-window";
import sources from "sources";

export default function ModalProduct({ data, windowProps }) {
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

	return (
		<FixedSizeList
			height={windowProps.height}
			width={600}
			itemCount={data.length}
			itemSize={windowProps.height}>
			{({ index, style }) => {
				const product = data[index];
				const sizeNum = (product.sizes && product.sizes.split("-").length) || 0;
				const oldUnitPrice = product.oldPrice / sizeNum;
				// const originalDiscount = oldUnitPrice - product.singlePrice;
				const cartItem = state.cartItems.find(
					(cart) => cart.productID === Number(product.masterProductID)
				);

				return (
					<div
						key={`${product.masterProductID}..${product.masterProductID}`}
						style={style}>
						<div
							style={{
								height: `${windowProps.height - 150}px`,
							}}
							className="relative w-full">
							<Image
								src={`${sources.imageMaxSrc}${product.picture_1}`}
								layout="fill"
								objectFit="cover"
								placeholder="blur"
								blurDataURL="/images/placeholder.jpg"
							/>
						</div>
						<div className="p-2 grid grid-cols-3">
							<div className="col-span-1">
								<h1 className="text-2xl mb-1 font-semibold">
									{product.productFullName}
								</h1>
								<p className="text-xl">Sizes: {product.sizes}</p>
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
								<Image src="/images/placeholder.jpg" width={80} height={80} />
							</div>
							<div className="col-span-3 flex justify-center">
								{cartItem ? (
									<div className="col-span-2 flex items-center">
										<button
											onClick={() => handleDecrement(product.masterProductID)}
											className="col-span-1 p-3 border-1 h-10 rounded-l-md">
											<FaMinus width={24} height={24} />
										</button>
										<p className="col-span-1 p-3 px-4 bg-primary-green h-10 grid place-content-center text-white">
											{cartItem.quantity}
										</p>
										<button
											onClick={() => handleIncrement(product.masterProductID)}
											className="col-span-1 p-3 border-1 h-10 rounded-r-md">
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
										Add To Cart
									</button>
								)}
							</div>
						</div>
					</div>
				);
			}}
		</FixedSizeList>
	);
}
