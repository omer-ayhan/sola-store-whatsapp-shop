import Image from "next/image";
import React from "react";
import sources from "sources";

export default function ProductGrid({ data, title, size, onClick }) {
	const gridSize = data.slice(0, 4).length;
	return (
		<div className="col-span-1 grid grid-cols-4 bg-white w-full rounded-2xl p-5 py-5 gap-5">
			<h1 className="col-span-4 text-gray-700 font-semibold uppercase">
				{title}
			</h1>
			{data.slice(0, 4).map((product, i) => (
				<div
					onClick={onClick}
					key={`${i}.!!`}
					className="relative col-span-2 w-full h-52 cursor-pointer rounded-lg overflow-hidden">
					{i + 1 === gridSize && (
						<div className="flex justify-center items-center absolute w-full h-full bg-overlay-color z-50">
							<p className="text-white text-3xl">+{size}</p>
						</div>
					)}
					<Image
						src={`${sources.imageMidSrc}${product.picture_1}`}
						layout="fill"
						objectFit="cover"
					/>
				</div>
			))}
		</div>
	);
}
