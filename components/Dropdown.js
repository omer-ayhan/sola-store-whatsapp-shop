import useDetectOutside from "hooks/useDetectOutside";
import useModal from "hooks/useModal";
import { flags } from "lib/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

export default function Dropdown() {
	const router = useRouter();
	const { open, closeModal, openModal } = useModal({
		dropdown: false,
	});
	const [flagImg, setFlagImg] = React.useState(flags[0].src);
	const dropdownRef = useRef();

	useDetectOutside(dropdownRef, function () {
		closeModal();
	});

	useEffect(() => {
		setFlagImg(flags.find((flag) => flag.lang === router.locale).src);
	}, [router.locale]);

	return (
		<div className="relative">
			<button
				onClick={openModal}
				className={`flex items-center gap-2 px-4  text-white uppercase border-x-1 border-x-[#2224261a] border-solid h-full hover:bg-[#ffffff1c] transition-colors duration-300 ease-in-out`}>
				<Image src={flagImg} width={24} height={24} />
				{router.locale}
			</button>
			<div
				ref={dropdownRef}
				className={`${
					open.dropdown ? "block" : "hidden"
				} bg-white absolute -bottom-15 left-0 w-28 rounded-b-md shadow-md flex flex-col justify-start z-50`}>
				{flags.map((flag, i) => (
					<Link
						href={router.asPath}
						locale={flag.lang}
						key={`${flag.lang}.!!_${i}`}>
						<a
							key={`${i}.._!${i}`}
							onClick={closeModal}
							className={`${
								flag.lang === router.locale ? "bg-gray-600/5 font-semibold" : ""
							} flex items-center cursor-pointer gap-2 w-full text-start uppercase px-3 py-1 hover:bg-gray-600/10 transition-colors duration-300 ease-in-out`}>
							<Image src={flag.src} width={22} height={22} /> {flag.lang}
						</a>
					</Link>
				))}
			</div>
		</div>
	);
}
