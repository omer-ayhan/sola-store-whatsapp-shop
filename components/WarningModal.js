import React, { memo, useRef } from "react";
import Drawer from "react-drag-drawer";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

import useDetectOutside from "hooks/useDetectOutside";

function PaymentModal({
	show,
	onClose,
	modalTitle,
	warningTitle,
	onPositiveClick,
	onNegativeClick,
	positiveText,
	negativeText,
}) {
	const modalRef = useRef();

	useDetectOutside(modalRef, onModalClose);

	function onModalClose() {
		onClose();
	}

	return (
		<Drawer open={show}>
			<div ref={modalRef} className="grid grid-cols-1 bg-white z-50">
				<div className="flex justify-between items-center h-16 bg-primary-green w-full py-2 px-4">
					<div className="flex items-center gap-3">
						<button
							onClick={onClose}
							className="p-3 py-2 border-2 border-[#80c0b4] rounded-md hover:border-white transition-colors duration-250 ease-in-out">
							<FaArrowLeft width={25} height={25} color="white" />
						</button>
						<p className="text-lg text-white capitalize">{modalTitle}</p>
					</div>
				</div>
				<div className="bg-white w-full p-6 py-8 text-orange-500 grid place-items-center max-w-sm gap-3">
					<FaExclamationTriangle size={80} />
					<p className="text-lg font-semibold text-center">{warningTitle}</p>
					<div className="grid grid-cols-2 gap-4">
						<button
							onClick={onPositiveClick}
							className="bg-white text-lg px-7 py-2 border-2 border-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ease-in-out">
							{positiveText}
						</button>
						<button
							onClick={onNegativeClick}
							className="bg-white text-lg px-7 py-2 border-2 border-primary-green text-primary-green rounded-md hover:bg-primary-green hover:text-white transition-colors duration-300 ease-in-out">
							{negativeText}
						</button>
					</div>
				</div>
			</div>
		</Drawer>
	);
}

export default memo(PaymentModal);
