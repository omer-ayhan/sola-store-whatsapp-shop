import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";

import { StoreContext } from "context/StoreProvider";
import Link from "next/link";

export default function CartButton() {
	const { state } = useContext(StoreContext);
	return (
		<Link href="/cart">
			<a className="motion-safe:animate-bounce lg:hidden fixed bottom-5 right-5 rounded-full p-3 bg-secondary-green hover:bg-secondary-green-dark z-50 transition-colors duration-300 ease-in-out">
				{!!state.cartsNum && (
					<span className="absolute text-sm font-semibold rounded-full left-[5px] top-[5px] bg-white px-[6px] py-[1px]">
						{state.cartsNum}
					</span>
				)}

				<FaShoppingCart size={30} color="white" />
			</a>
		</Link>
	);
}
