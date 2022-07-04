import useDetectOutside from "hooks/useDetectOutside";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
import Drawer from "react-drag-drawer";
import { FaArrowLeft } from "react-icons/fa";

export default function CustomModal({ show, onClose, children, title }) {
	const modalRef = useRef();

	useDetectOutside(modalRef, onClose);

	return (
		<Drawer open={show}>
			<div ref={modalRef} className="grid grid-cols-1 bg-white z-50 ">
				<div className="flex justify-between items-center bg-primary-green w-full py-3 px-4">
					<div className="flex items-center gap-3">
						<button
							onClick={onClose}
							className="p-3 border-2 border-[#80c0b4] rounded-md hover:border-white transition-colors duration-250 ease-in-out">
							<FaArrowLeft width={25} height={25} color="white" />
						</button>
						<p className="text-lg text-white">{title}</p>
					</div>
					<button
						onClick={onClose}
						className="p-3 py-2 border-2 text-white border-[#80c0b4] rounded-md hover:border-white transition-colors duration-250 ease-in-out">
						Cart{" "}
						<span className="px-2 mx-1 text-xs rounded-md bg-[#07a884]">6</span>
					</button>
				</div>
				<div className="bg-white w-full h-[870px] overflow-y-scroll">
					{children}
				</div>
			</div>
		</Drawer>
	);
}
