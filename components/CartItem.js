import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function CartItem() {
	return (
		<div className="grid grid-cols-6 mb-3">
			<div className="relative grid place-content-center">
				<Image src="/images/testImg.webp" width={60} height={80} />
			</div>
			<div className="col-span-3 p-2">
				<p className="uppercase">Sale</p>
				<p className="uppercase">Magro</p>
			</div>
			<div className="col-span-2 flex items-center">
				<button className="col-span-1 p-3 border-1 h-10 rounded-l-md">
					<FaMinus width={24} height={24} />
				</button>
				<p className="col-span-1 p-3 px-4 bg-primary-green h-10 grid place-content-center text-white">
					1
				</p>
				<button className="col-span-1 p-3 border-1 h-10 rounded-r-md">
					<FaPlus width={24} height={24} />
				</button>
			</div>
		</div>
	);
}
