import Link from "next/link";
import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";

import { StoreContext } from "context/StoreProvider";
import Dropdown from "./Dropdown";
import useTranslation from "next-translate/useTranslation";
import useModal from "hooks/useModal";
import SearchModal from "./SearchModal";

export default function Navbar() {
	const { t } = useTranslation("common");
	const { open, openModal, closeModal } = useModal({
		search: false,
	});
	const { state } = useContext(StoreContext);

	return (
		<div className="fixed flex justify-around w-full h-10 bg-primary-green px-2 z-50">
			<SearchModal show={open.search} onClose={closeModal} />
			<div className="flex items-center">
				<button
					onClick={openModal}
					className="h-full px-4 col-span-1 border-x-1 border-x-[#2224261a] border-solid hover:bg-[#ffffff1c] transition-colors duration-300 ease-in-out">
					<FaSearch color="#fff" width={18} height={18} />
				</button>
				<Link href="/">
					<button className="px-4 text-sm text-white border-r-1 border-x-[#2224261a] border-solid h-full hover:bg-[#ffffff1c] transition-colors duration-300 ease-in-out">
						Sola Store
					</button>
				</Link>
			</div>
			<div className="flex">
				<Dropdown />
				<button className="hidden lg:flex items-center justify-center px-4 text-sm text-white border-r-1 border-x-[#2224261a] border-solid h-full hover:bg-[#ffffff1c] transition-colors duration-300 ease-in-out">
					{t("cart")}{" "}
					<span className="px-2 mx-1 text-xs rounded-md bg-[#07a884]">
						{state.cartsNum}
					</span>
				</button>
				<Link href="/cart">
					<button className="flex lg:hidden items-center justify-center px-4 text-sm text-white border-r-1 border-x-[#2224261a] border-solid h-full hover:bg-[#ffffff1c] transition-colors duration-300 ease-in-out">
						{t("cart")}{" "}
						<span className="px-2 mx-1 text-xs rounded-md bg-[#07a884]">
							{state.cartsNum}
						</span>
					</button>
				</Link>
			</div>
		</div>
	);
}
