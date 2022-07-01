import React, { useState } from "react";

export default function useModal() {
	const [open, setOpen] = useState(false);

	const closeModal = () => setOpen(false);
	const openModal = () => setOpen(true);

	return {
		open,
		closeModal,
		openModal,
	};
}
