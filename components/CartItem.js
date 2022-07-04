import Image from "next/image";
import React, { useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import { StoreContext } from "context/StoreProvider";
import sources from "sources";

export default function CartItem({ data }) {
	const { cartActions } = useContext(StoreContext);
	const { decrementQuantity, incrementQuantity } = cartActions;
	const {
		productID,
		pictureOneGuidName,
		price,
		oldPrice,
		productShortName,
		quantity,
		memberID,
	} = data;

	const handleIncreaseQuantity = () => {
		incrementQuantity({
			productId: productID,
			userId: memberID,
		});
	};

	const handleDecreaseQuantity = () => {
		decrementQuantity({
			productId: productID,
			userId: memberID,
		});
	};

	return (
		<div className="grid grid-cols-6 mb-3">
			<div className="relative grid place-content-center">
				<Image
					src={`${sources.imageMinSrc}${pictureOneGuidName}`}
					width={60}
					height={80}
				/>
			</div>
			<div className="col-span-3 p-2">
				<p className="uppercase font-semibold">{productShortName}</p>
				{oldPrice > 0 ? (
					<p className="uppercase">${oldPrice}</p>
				) : (
					<p className="uppercase">${price}</p>
				)}
			</div>
			<div className="col-span-2 flex items-center">
				<button
					onClick={handleDecreaseQuantity}
					className="col-span-1 p-3 border-1 h-10 rounded-l-md">
					<FaMinus width={24} height={24} />
				</button>
				<p className="col-span-1 p-3 px-4 bg-primary-green h-10 grid place-content-center text-white">
					{quantity}
				</p>
				<button
					onClick={handleIncreaseQuantity}
					className="col-span-1 p-3 border-1 h-10 rounded-r-md">
					<FaPlus width={24} height={24} />
				</button>
			</div>
		</div>
	);
}
