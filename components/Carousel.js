import Image from "next/image";
import { useState } from "react";
import { Carousel, Tab } from "react-bootstrap";
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
		<div className="relative w-full h-full max-h-[550px]">
			<Image
				src={checkImage({
					source: sources.imageMaxSrc,
					img: product.pictures[imageKey].guidName,
				})}
				layout="fill"
				objectFit="cover"
				placeholder="blur"
				blurDataURL="/images/placeholder.jpg"
			/>
		</div>
	);
}
