import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import sources from "sources";

export default function CustomCarousel({ product }) {
	const [imageKey, setImageKey] = useState(0);

	const handlers = useSwipeable({
		onSwipedLeft: () => handleNext({ imageKey }),
		onSwipedRight: () => handlePrev({ imageKey }),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

	const productLength = product.pictures.length;

	const handleNext = ({ imageKey }) => {
		if (imageKey < productLength - 1) {
			setImageKey(imageKey + 1);
		} else {
			setImageKey(0);
		}
	};

	const handlePrev = ({ imageKey }) => {
		if (imageKey > 0) {
			setImageKey(imageKey - 1);
		} else {
			setImageKey(productLength - 1);
		}
	};

	const checkImage = ({ source, img }) =>
		product.picture_1 ? `${source}${img}` : "/images/placeholder.jpg";

	return (
		<div className="grid grid-cols-2 w-full h-full gap-1">
			<div className="relative w-full h-full">
				<Image
					className="col-span-1"
					src={checkImage({
						source: sources.imageMaxSrc,
						img: product.pictures[0]?.guidName,
					})}
					layout="fill"
					objectFit="cover"
					placeholder="blur"
					blurDataURL="/images/placeholder.jpg"
				/>
			</div>
			<div className="relative w-full h-full">
				<Image
					className="col-span-1"
					src={checkImage({
						source: sources.imageMaxSrc,
						img: product.pictures[2]?.guidName ?? product.pictures[1]?.guidName,
					})}
					layout="fill"
					objectFit="cover"
					placeholder="blur"
					blurDataURL="/images/placeholder.jpg"
				/>
			</div>
		</div>
	);
}
