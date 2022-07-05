import React, { useState } from "react";

export default function useModal(types) {
	const [open, setOpen] = useState(types);
	const typesArray = Object.keys(types);

	const closeModal = (target) => {
		if (typesArray.length === 1) {
			setOpen({
				...open,
				[typesArray[0]]: false,
			});
			return;
		}
		setOpen({
			...open,
			[target]: false,
		});
	};

	const openModal = (target) => {
		if (typesArray.length === 1) {
			setOpen({
				...open,
				[typesArray[0]]: true,
			});
			return;
		}
		setOpen({
			...open,
			[target]: true,
		});
	};

	return {
		open,
		closeModal,
		openModal,
	};
}
