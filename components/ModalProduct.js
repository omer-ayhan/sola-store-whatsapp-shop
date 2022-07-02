import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FixedSizeList } from "react-window";
import sources from "sources";

export default function ModalProduct({ data, windowProps }) {
	return (
		<FixedSizeList
			height={windowProps.height}
			width={600}
			itemCount={data.length}
			itemSize={windowProps.height}>
			{({ key, index, style }) => {
				const product = data[index];
				return (
					<div key={`${key}..${index}`} style={style}>
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
							<p className="col-span-1 items-center text-center text-5xl self-center">
								<span className="text-3xl">$</span>42
							</p>
							<div className="col-span-1 flex justify-center items-center">
								<Image src="/images/placeholder.jpg" width={80} height={80} />
							</div>
							<div className="col-span-3 flex justify-center">
								<button className="bg-primary-green p-3 py-2 rounded-md text-sm text-white font-semibold">
									Add To Cart
								</button>
								{/* <div className="col-span-2 flex items-center">
									<button className="col-span-1 p-3 border-1 h-10 rounded-l-md">
										<FaMinus width={24} height={24} />
									</button>
									<p className="col-span-1 p-3 px-4 bg-primary-green h-10 grid place-content-center text-white">
										1
									</p>
									<button className="col-span-1 p-3 border-1 h-10 rounded-r-md">
										<FaPlus width={24} height={24} />
									</button>
								</div> */}
							</div>
						</div>
					</div>
				);
			}}
		</FixedSizeList>
	);
}
