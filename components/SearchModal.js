import React, { memo, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Drawer from "react-drag-drawer";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import Router from "next/router";

import { StoreContext } from "context/StoreProvider";
import useTranslation from "next-translate/useTranslation";
import { notify } from "./Toast";
import axios from "axios";
import ModalProduct from "./ModalProduct";
import Spinner from "./Spinner";

function SearchModal({ show, onClose }) {
	const { t } = useTranslation("common");
	const { state } = useContext(StoreContext);
	const inputRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState([]);
	const [windowProps, setWindowProps] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		setWindowProps({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, []);

	const handleSearch = async (e) => {
		e.preventDefault();
		const search = inputRef.current.value;
		if (!search) return notify("error", "Search is empty");
		setLoading(true);
		try {
			const { data } = await axios.post("/api/search", {
				text: search,
				lang: Router.locale,
			});

			setSearch(data);
		} catch (error) {
			notify("error", "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{show && (
				<div className="fixed top-0 left-0 w-full flex justify-between gap-2 items-center bg-primary-green py-2 px-4 z-20">
					<div className="flex items-center">
						<button
							onClick={onClose}
							className="grid place-content-center p-3 h-10 border-2 border-[#80c0b4] rounded-md hover:border-white transition-colors duration-250 ease-in-out">
							<FaArrowLeft width={25} height={25} color="white" />
						</button>
					</div>
					<form className="relative flex-1" onSubmit={handleSearch}>
						<div className="relative w-full">
							<input
								ref={inputRef}
								type="text"
								placeholder="Search Products"
								className="w-full h-10 px-3 rounded-md outline-none"
							/>
							<button
								type="submit"
								className="absolute right-0 p-3 h-10 bg-white rounded-md transition-colors duration-250 ease-in-out">
								<FaSearch width={25} height={25} color="gray" />
							</button>
						</div>
					</form>
				</div>
			)}
			<div className="z-10">
				<Drawer open={show} onRequestClose={onClose}>
					{loading ? (
						<Spinner />
					) : !!search.length ? (
						<div className="pt-14 relative grid grid-cols-1 bg-white z-50 h-screen">
							<div className="bg-white w-full">
								<ModalProduct windowProps={windowProps} data={search} />
							</div>
						</div>
					) : (
						<div className="pt-14 relative flex flex-col items-center bg-white z-50 w-screen h-screen">
							<div className="bg-white w-full">
								<h1 className="text-2xl font-medium text-center py-3 border-b-1 border-solid border-gray-300">
									Please enter a product
								</h1>
							</div>
							<button
								onClick={onClose}
								className="py-2 px-16 text-sm text-gray-500 rounded-sm m-2 border-1 border-1 hover:border-gray-600 hover:text-gray-600 transition-colors duration-200 ease-in-out">
								Close
							</button>
						</div>
					)}
				</Drawer>
			</div>
		</>
	);
}

export default memo(SearchModal);
