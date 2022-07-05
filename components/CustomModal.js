import React, { memo, useContext, useRef } from "react";
import Link from "next/link";
import Drawer from "react-drag-drawer";
import { FaArrowLeft } from "react-icons/fa";

import { StoreContext } from "context/StoreProvider";
import useDetectOutside from "hooks/useDetectOutside";

function CustomModal({ show, onClose, children, title }) {
	const { state } = useContext(StoreContext);
	const modalRef = useRef();

	useDetectOutside(modalRef, onClose);

	return (
		<Drawer open={show}>
			<div ref={modalRef} className="grid grid-cols-1 bg-white z-50 h-screen">
				<div className="flex justify-between items-center bg-primary-green w-full py-2 px-4">
					<div className="flex items-center gap-3">
						<button
							onClick={onClose}
							className="p-3 py-2 border-2 border-[#80c0b4] rounded-md hover:border-white transition-colors duration-250 ease-in-out">
							<FaArrowLeft width={25} height={25} color="white" />
						</button>
						<p className="text-lg text-white">{title}</p>
					</div>
					<button
						onClick={onClose}
						className="hidden lg:block p-3 py-1 border-2 text-white border-[#80c0b4] rounded-md hover:border-white transition-colors duration-250 ease-in-out">
						Cart{" "}
						<span className="px-2 mx-1 text-xs rounded-md bg-[#07a884]">
							{state.cartsNum}
						</span>
					</button>
					<Link href="/cart">
						<button
							onClick={onClose}
							className="lg:hidden p-3 py-1 border-2 text-white border-[#80c0b4] rounded-md hover:border-white transition-colors duration-250 ease-in-out">
							Cart{" "}
							<span className="px-2 mx-1 text-xs rounded-md bg-[#07a884]">
								{state.cartsNum}
							</span>
						</button>
					</Link>
				</div>
				<div className="bg-white w-full">{children}</div>
			</div>
		</Drawer>
	);
}

export default memo(CustomModal);
